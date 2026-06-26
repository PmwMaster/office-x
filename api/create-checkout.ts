import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? '';

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { items, customerEmail, customerName, paymentMethod } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    const discountMultiplier = paymentMethod === 'pix' ? 0.95 : 1;

    const lineItems = items.map((item: { name: string; price: number; quantity: number; image: string }) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100 * discountMultiplier),
      },
      quantity: item.quantity,
    }));

    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card'];

    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/comprar?cancelado=true`,
      customer_email: customerEmail || undefined,
      metadata: {
        customer_name: customerName || '',
        payment_method: paymentMethod || 'card',
      },
      line_items: lineItems,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || error?.toString() || 'Falha ao processar checkout' });
  }
}
