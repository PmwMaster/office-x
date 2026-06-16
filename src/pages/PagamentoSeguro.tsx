import { useState } from 'react';
import { CreditCard, Copy, ShieldCheck } from 'lucide-react';
import { HybridCartSidebar, PaymentMethodToggle } from '../components/ui/HybridCartSidebar';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../stores/cartStore';

export function PagamentoSeguro() {
  const [method, setMethod] = useState<'credit' | 'pix'>('credit');
  const invoiceItems = useCartStore((s) => s.getInvoiceItems());
  const total = useCartStore((s) => s.getTotal());

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-gutter items-start">
        <section className="space-y-12">
          <div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-4">
              PAGAMENTO SEGURO
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Finalize sua aquisição de alta performance. Suas informações são protegidas por criptografia de nível
              militar.
            </p>
          </div>

          <PaymentMethodToggle active={method} onChange={setMethod} />

          {method === 'credit' ? (
            <CreditCardForm />
          ) : (
            <PixForm />
          )}

          <div className="flex items-center gap-4 text-on-surface-variant">
            <ShieldCheck size={20} className="text-primary-fixed" />
            <p className="text-label-sm tracking-widest">
              TRANSAÇÃO CRIPTOGRAFADA POR OFFICE-X QUANTUM SHIELD
            </p>
          </div>
        </section>

        <HybridCartSidebar items={invoiceItems} total={total} />
      </div>
    </Layout>
  );
}

function CreditCardForm() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="flex flex-col gap-2">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">
            NOME NO CARTÃO
          </label>
          <input
            className="bg-[#050505] border-b border-white/20 p-4 text-primary font-semibold font-mono input-focus-gradient transition-all placeholder:text-white/10 focus:outline-none"
            placeholder="JOÃO D. ARCHITECT"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">
            NÚMERO DO CARTÃO
          </label>
          <div className="relative">
            <input
              className="w-full bg-[#050505] border-b border-white/20 p-4 text-primary font-semibold font-mono input-focus-gradient transition-all placeholder:text-white/10 focus:outline-none"
              placeholder="0000 0000 0000 0000"
              type="text"
            />
            <CreditCard
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter">
        <div className="flex flex-col gap-2">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">VALIDADE</label>
          <input
            className="bg-[#050505] border-b border-white/20 p-4 text-primary font-semibold font-mono input-focus-gradient transition-all placeholder:text-white/10 focus:outline-none"
            placeholder="MM/YY"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">CVV</label>
          <input
            className="bg-[#050505] border-b border-white/20 p-4 text-primary font-semibold font-mono input-focus-gradient transition-all placeholder:text-white/10 focus:outline-none"
            placeholder="000"
            type="text"
          />
        </div>
        <div className="hidden md:flex flex-col gap-2">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">
            PARCELAMENTO
          </label>
          <select className="bg-[#050505] border-b border-white/20 p-4 text-primary font-mono text-body-md input-focus-gradient appearance-none cursor-pointer focus:outline-none">
            <option>1x À VISTA (SEM JUROS)</option>
            <option>3x R$ 1.450,00</option>
            <option>6x R$ 725,00</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function PixForm() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-8 flex flex-col items-center text-center gap-6 rounded-xl">
        <div className="bg-white p-4 rounded-xl">
          <div className="w-48 h-48 bg-[#0d0d0d] flex items-center justify-center border-2 border-primary-fixed">
            <span className="text-primary-fixed text-8xl font-mono">QR</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-headline-md font-semibold text-primary">ESCANEIE O QR CODE</p>
          <p className="text-body-md text-on-surface-variant">O pagamento é processado instantaneamente.</p>
        </div>
        <div className="w-full flex flex-col gap-2 text-left">
          <label className="text-label-sm text-on-surface-variant uppercase tracking-widest font-mono">
            PIX COPIA E COLA
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-[#050505] border border-white/10 p-3 text-on-surface-variant text-label-md font-mono rounded truncate"
              readOnly
              value="00020126580014BR.GOV.BCB.PIX0136d3f82..."
            />
            <button className="bg-surface-container-high p-3 rounded hover:bg-white/10 transition-colors">
              <Copy size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
