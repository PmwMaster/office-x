import { CreditCard, QrCode, ShieldCheck, Banknote, Landmark } from 'lucide-react';
import type { InvoiceItem } from '../../types';
import { Button } from './Button';

interface HybridCartSidebarProps {
  items: InvoiceItem[];
  total: number;
}

export function HybridCartSidebar({ items, total }: HybridCartSidebarProps) {
  return (
    <aside className="sticky top-32 glass-surface rounded-2xl p-8 flex flex-col gap-8 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-fixed/5 rounded-full blur-[80px]" />

      <div>
        <h2 className="text-headline-md font-semibold text-primary uppercase tracking-tighter mb-6">
          RESUMO DA FATURA
        </h2>
        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-start group">
              <div className="flex flex-col">
                <span className="text-label-md text-primary uppercase">{item.label}</span>
                <span className="text-label-sm text-on-surface-variant">{item.description}</span>
              </div>
              <span className="text-label-md text-primary">
                R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[4px] bg-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-fixed/40 to-transparent" />
      </div>

      <div className="py-4">
        <span className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">
          TOTAL GERAL
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-black text-headline-md text-primary-fixed">R$</span>
          <span className="font-black text-5xl md:text-6xl text-primary-fixed tracking-tighter">
            {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <Button variant="primary" className="w-full py-6 text-headline-md font-black tracking-widest hover:scale-[1.02]">
        FINALIZAR
      </Button>

      <div className="flex justify-center gap-4 opacity-30 grayscale contrast-125">
        <Banknote size={24} />
        <Landmark size={24} />
        <ShieldCheck size={24} />
      </div>
    </aside>
  );
}

export function PaymentMethodToggle({
  active,
  onChange,
}: {
  active: 'credit' | 'pix';
  onChange: (method: 'credit' | 'pix') => void;
}) {
  return (
    <div className="flex gap-4 p-1 bg-surface-container-high w-fit rounded-lg">
      <button
        onClick={() => onChange('credit')}
        className={`px-6 py-3 text-label-md uppercase rounded transition-all duration-300 ${
          active === 'credit'
            ? 'bg-primary-fixed text-on-primary-fixed'
            : 'text-on-surface-variant hover:bg-white/5'
        }`}
      >
        <CreditCard size={18} className="inline mr-2" />
        CARTÃO DE CRÉDITO
      </button>
      <button
        onClick={() => onChange('pix')}
        className={`px-6 py-3 text-label-md uppercase rounded transition-all duration-300 ${
          active === 'pix'
            ? 'bg-primary-fixed text-on-primary-fixed'
            : 'text-on-surface-variant hover:bg-white/5'
        }`}
      >
        <QrCode size={18} className="inline mr-2" />
        PIX INSTANTÂNEO
      </button>
    </div>
  );
}
