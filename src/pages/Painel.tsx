import { MainLayout } from '../components/layout/MainLayout';
import { GlassCard } from '../components/ui';
import { usePurchaseHistory } from '../hooks';
import { Package, CheckCircle, Clock } from 'lucide-react';
import { DASHBOARD_PROGRESS } from '../mock/data';

export function Painel() {
  const { history, loading } = usePurchaseHistory();

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-4">MEU PAINEL</h1>

      <section className="mb-16">
        <h2 className="text-headline-lg font-semibold text-primary mb-6">Acompanhar Pedido #X-902</h2>
        <GlassCard className="p-6 rounded-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {DASHBOARD_PROGRESS.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.active ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-white/5 text-on-surface-variant'}`}>
                  {step.active ? <CheckCircle size={16} /> : <Clock size={16} />}
                </div>
                <span className={`text-label-sm font-mono ${step.active ? 'text-primary' : 'text-on-surface-variant'}`}>{step.label}</span>
                {i < DASHBOARD_PROGRESS.length - 1 && <div className={`w-8 h-0.5 ${step.active && DASHBOARD_PROGRESS[i + 1]?.active ? 'bg-primary-fixed' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section>
        <h2 className="text-headline-lg font-semibold text-primary mb-6">Histórico de Compras</h2>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card p-6 h-20 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((h) => (
              <GlassCard key={h.id} className="p-4 flex items-center gap-4 rounded-2xl" hover={false}>
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                  <Package size={18} className={h.iconColor} />
                </div>
                <div className="flex-1">
                  <h3 className="text-headline-md font-semibold text-primary">{h.item}</h3>
                  <p className="text-label-sm text-on-surface-variant">{h.itemSub}</p>
                </div>
                <span className="text-label-sm text-on-surface-variant font-mono">{h.date}</span>
                <span className="text-label-sm text-primary-fixed font-mono">{h.id}</span>
                <span className="text-label-sm text-primary font-mono">{h.status}</span>
                <span className="text-headline-md font-bold text-primary-fixed">
                  {h.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </GlassCard>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
