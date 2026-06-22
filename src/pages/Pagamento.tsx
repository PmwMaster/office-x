import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, ShieldCheck } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button, Input, GlassCard } from '../components/ui';
import { useCartStore } from '../stores';
import type { PaymentMethod } from '../types';

export function Pagamento() {
  const [method, setMethod] = useState<PaymentMethod>('credit');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const total = useCartStore((s) => s.getTotalPrice());
  const clearAll = useCartStore((s) => s.clearAll);

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearAll();
    setProcessing(false);
    navigate('/meu-painel');
  };

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-12">PAGAMENTO</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => setMethod('credit')}
              className={`flex-1 p-4 rounded-xl border transition-all ${method === 'credit' ? 'border-primary-fixed/50 bg-primary-fixed/5' : 'border-white/5 bg-surface/30'}`}
            >
              <CreditCard size={24} className={method === 'credit' ? 'text-primary-fixed' : 'text-on-surface-variant'} />
              <span className="block mt-2 text-label-md font-semibold">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => setMethod('pix')}
              className={`flex-1 p-4 rounded-xl border transition-all ${method === 'pix' ? 'border-primary-fixed/50 bg-primary-fixed/5' : 'border-white/5 bg-surface/30'}`}
            >
              <QrCode size={24} className={method === 'pix' ? 'text-primary-fixed' : 'text-on-surface-variant'} />
              <span className="block mt-2 text-label-md font-semibold">PIX</span>
            </button>
          </div>

          {method === 'credit' ? (
            <GlassCard className="p-6 rounded-2xl space-y-4">
              <Input placeholder="Número do cartão" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Validade (MM/AA)" />
                <Input placeholder="CVV" />
              </div>
              <Input placeholder="Nome no cartão" />
            </GlassCard>
          ) : (
            <GlassCard className="p-6 rounded-2xl text-center">
              <QrCode size={120} className="text-primary-fixed mx-auto mb-4" />
              <p className="text-body-lg text-on-surface-variant">Escaneie o QR Code com seu app de pagamento</p>
              <p className="text-label-sm text-primary-fixed font-mono mt-2">5% de desconto no PIX</p>
            </GlassCard>
          )}
        </div>

        <div>
          <GlassCard className="p-6 rounded-2xl sticky top-28">
            <h3 className="text-headline-lg font-semibold text-primary mb-6">Resumo</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-label-md">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              {method === 'pix' && (
                <div className="flex justify-between text-label-md">
                  <span className="text-primary-fixed">Desconto PIX (5%)</span>
                  <span className="text-primary-fixed">-{(total * 0.05).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
              <div className="flex justify-between text-label-md">
                <span className="text-on-surface-variant">Frete</span>
                <span className="text-primary-fixed">GRÁTIS</span>
              </div>
            </div>
            <div className="border-t border-white/5 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-headline-md font-semibold text-primary">Total</span>
                <span className="text-headline-lg font-black text-primary-fixed">
                  {(method === 'pix' ? total * 0.95 : total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
            <Button className="w-full" onClick={handlePay} disabled={processing}>
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck size={18} />
                  Pagar Agora
                </span>
              )}
            </Button>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
}
