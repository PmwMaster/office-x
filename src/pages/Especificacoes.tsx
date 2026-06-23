import { ProductGrid } from '../components/product/ProductGrid';
import { GlassCard } from '../components/ui';
import { CATALOG } from '../data/headset-catalog';

export function Especificacoes() {
  return (
    <div className="min-h-screen bg-black text-text pt-20">
      {/* Specs */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16 space-y-3">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Especificações</p>
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">
            Engenharia de
            <br />
            <span className="text-text-secondary">precisão milimétrica.</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {[
            { label: 'Driver', value: '100mm', sub: 'Planar Magnético' },
            { label: 'Resposta', value: '5Hz–50kHz', sub: 'Ultra-wide' },
            { label: 'Impedância', value: '32Ω', sub: 'Alta sensibilidade' },
            { label: 'Peso', value: '380g', sub: 'Fibra de carbono' },
            { label: 'THD', value: '<0.02%', sub: 'Distorção inaudível' },
            { label: 'Conectividade', value: '4.4mm + XLR', sub: 'Balanceado' },
          ].map((s) => (
            <GlassCard key={s.label} className="p-6 space-y-1">
              <p className="text-[11px] font-mono text-text-tertiary uppercase tracking-widest">{s.label}</p>
              <p className="text-[28px] font-bold text-text tracking-tight">{s.value}</p>
              <p className="text-[13px] text-text-secondary">{s.sub}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-border">
        <div className="mb-16 space-y-3">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Catálogo</p>
          <h2 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">Escolha o seu.</h2>
        </div>
        <ProductGrid products={CATALOG} />
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="text-[11px] text-text-tertiary font-mono tracking-widest uppercase">Office‑X Audio · 2026</p>
      </footer>
    </div>
  );
}
