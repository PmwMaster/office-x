import { PackageCheck, AlertTriangle, Plus, CheckCircle } from 'lucide-react';
import type { ServiceOrder } from '../types';
import { KANBAN_COLUMNS } from '../mock/data';
import { AdminLayout } from '../components/layout/AdminLayout';
import { useServiceOrders } from '../hooks';
import { GlassCard } from '../components/ui';

function computeKPI(orders: ServiceOrder[]) {
  const openOrders = orders.filter((o) => o.status !== 'done').length;
  const delayedOrders = orders.filter((o) => o.status === 'waiting_parts').length;
  const completedOrders = orders.filter((o) => o.status === 'done').length;
  const openOrdersChange = orders.length > 0 ? Math.round((openOrders / orders.length) * 100) : 0;
  return { openOrders, openOrdersChange, delayedOrders, completedOrders };
}

export function Admin() {
  const { orders, loading } = useServiceOrders();
  const kpi = computeKPI(orders);

  return (
    <AdminLayout>
      <h1 className="text-display-md font-black text-primary mb-12">ADMIN • KANBAN</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
        <KPICard label="O.S. Abertas" value={kpi.openOrders} change={`+${kpi.openOrdersChange}%`} icon={PackageCheck} />
        <KPICard label="O.S. Atrasadas" value={kpi.delayedOrders} change="Crítico" icon={AlertTriangle} error />
        <KPICard label="O.S. Concluídas" value={kpi.completedOrders} change="Unidades" icon={CheckCircle} />
      </section>

      {loading ? (
        <div className="text-center py-16 text-on-surface-variant">Carregando...</div>
      ) : (
        <div className="overflow-x-auto pb-8">
          <div className="flex gap-gutter min-w-max">
            {KANBAN_COLUMNS.map((col) => (
              <KanbanColumn key={col.id} title={col.label} color={col.color} orders={orders.filter((o) => o.status === col.id)} />
            ))}
          </div>
        </div>
      )}

      <button className="fixed bottom-12 right-12 w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed shadow-2xl hover:scale-110 transition-transform z-50">
        <Plus size={32} />
      </button>
    </AdminLayout>
  );
}

function KPICard({ label, value, change, icon: Icon, error }: { label: string; value: number; change: string; icon: typeof PackageCheck; error?: boolean }) {
  return (
    <GlassCard className={`p-6 rounded-2xl ${error ? 'border-error/20' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-label-sm text-on-surface-variant uppercase font-mono">{label}</span>
        <Icon size={20} className={error ? 'text-error' : 'text-primary-fixed'} />
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-display-lg font-bold text-primary">{value}</h2>
        <span className={`text-label-md font-bold font-mono ${error ? 'text-error' : 'text-primary-fixed-dim'}`}>{change}</span>
      </div>
    </GlassCard>
  );
}

const STATUS_ICONS: Record<string, string> = {
  normal: 'bg-white/10 text-on-surface-variant',
  urgent: 'bg-error-container/30 text-error',
  warranty: 'bg-secondary-container/20 text-secondary',
};

function KanbanColumn({ title, color, orders }: { title: string; color: string; orders: ServiceOrder[] }) {
  return (
    <div className="min-w-[320px] max-w-[320px]">
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className={`w-2 h-2 ${color} rounded-full`} />
        <h3 className="text-label-md font-medium text-primary uppercase font-mono">{title}</h3>
        <span className="bg-white/5 text-on-surface-variant text-[10px] px-2 py-0.5 rounded font-mono ml-auto">{orders.length}</span>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <GlassCard key={order.id} className="p-4 rounded-2xl" hover={false}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-label-sm text-primary-fixed-dim font-mono">{order.id}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${STATUS_ICONS[order.priority] ?? ''}`}>
                {order.priority}
              </span>
            </div>
            <h4 className="font-semibold text-primary text-sm mb-1">{order.title}</h4>
            <p className="text-[11px] text-on-surface-variant mb-3">{order.description}</p>
            {order.progress !== undefined && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: `${order.progress}%` }} />
                </div>
                <span className="text-[10px] text-secondary font-mono">{order.progress}%</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono font-bold">{order.technician}</span>
              <span className="text-[10px] text-on-surface-variant font-mono">{order.createdAt}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
