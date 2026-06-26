import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const results: Record<string, unknown> = {};

  results.SUPABASE_URL = process.env.SUPABASE_URL ? 'set' : 'MISSING';
  results.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ? 'set' : 'MISSING';
  results.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ? 'set (' + process.env.STRIPE_SECRET_KEY!.slice(0, 10) + '...)' : 'MISSING';

  try {
    const supabaseUrl = process.env.SUPABASE_URL ?? '';
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data } = await supabase.auth.getSession();
    results.supabaseInit = 'OK';
  } catch (e: any) {
    results.supabaseInit = 'FAIL: ' + e.message;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
    const session = await stripe.checkout.sessions.list({ limit: 1 });
    results.stripeInit = `OK (${session.data.length} sessions)`;
  } catch (e: any) {
    results.stripeInit = 'FAIL: ' + e.message;
  }

  return res.status(200).json(results);
}
