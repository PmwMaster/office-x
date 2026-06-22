import { PackageCheck, AlertTriangle, Plus, PackageSearch, CheckCircle } from 'lucide-react';
import type { ServiceOrder, OSPriority } from '../types';
import { KANBAN_COLUMNS } from '../mock/data';
import { Layout } from '../components/layout/Layout';
import { useServiceOrders } from '../services';

function computeKPI(orders: ServiceOrder[]) {
  const openOrders = orders.filter(o => o.status !== 'done').length;
  const delayedOrders = orders.filter(o => o.status === 'waiting_parts' || o.status === 'triage').length;
  const completedOrders = orders.filter(o => o.status === 'done').length;
  const openOrdersChange = orders.length > 0 ? Math.round((openOrders / orders.length) * 100) : 0;
  return { openOrders, openOrdersChange, delayedOrders, completedOrders };
}

const STATUS_PRIORITY: Record<string, number> = { triage: 0, waiting_parts: 1, modding_bench: 2, done: 3 };
const PRIORITY_SORT: Record<OSPriority, number> = { urgent: 0, warranty: 1, normal: 2 };

export function AdminKanban() {
  const { orders, loading } = useServiceOrders();
  const sorted = [...orders].sort((a, b) => {
    const s = (STATUS_PRIORITY[a.status] ?? 9) - (STATUS_PRIORITY[b.status] ?? 9);
    if (s !== 0) return s;
    return (PRIORITY_SORT[a.priority] ?? 9) - (PRIORITY_SORT[b.priority] ?? 9);
  });
  const kpi = computeKPI(orders);
  return (
    <Layout>
      {/* KPI Header */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
        <KPICard
          label="O.S. Abertas"
          value={kpi.openOrders}
          change={`+${kpi.openOrdersChange}%`}
          changeColor="text-primary-fixed-dim"
          barColor="bg-primary-fixed"
          barWidth="w-2/3"
          icon={PackageCheck}
          iconColor="text-primary-fixed"
        />
        <KPICard
          label="O.S. Atrasadas"
          value={kpi.delayedOrders}
          change="Crítico"
          changeColor="text-error"
          barColor="bg-error"
          barWidth="w-1/4"
          icon={AlertTriangle}
          iconColor="text-error"
          border
        />
        <KPICard
          label="O.S. Concluídas"
          value={kpi.completedOrders}
          change="Unidades"
          changeColor="text-on-surface-variant"
          barColor="bg-secondary-container"
          barWidth="w-4/5"
          icon={CheckCircle}
          iconColor="text-secondary"
        />
      </section>

      {/* Kanban Board */}
      {loading ? (
        <div className="text-center py-16 text-on-surface-variant text-body-lg">
          Carregando Kanban...
        </div>
      ) : (
      <div className="overflow-x-auto pb-8 -mx-margin-desktop px-margin-desktop">
        <div className="flex gap-gutter min-w-max">
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              title={col.label}
              count={col.count}
              color={col.color}
              orders={sorted.filter((o) => o.status === col.id)}
            />
          ))}
        </div>
      </div>
      )}

      {/* FAB */}
      <button className="fixed bottom-12 right-12 w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed shadow-2xl hover:scale-110 active:scale-95 transition-transform z-50">
        <Plus size={32} />
      </button>
    </Layout>
  );
}

function KPICard({
  label,
  value,
  change,
  changeColor,
  barColor,
  barWidth,
  icon: Icon,
  iconColor,
  border = false,
}: {
  label: string;
  value: number;
  change: string;
  changeColor: string;
  barColor: string;
  barWidth: string;
  icon: typeof PackageCheck;
  iconColor: string;
  border?: boolean;
}) {
  return (
    <div
      className={`glass-card p-6 flex flex-col gap-2 relative overflow-hidden group rounded-xl ${
        border ? 'border-error/20' : ''
      }`}
    >
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={120} className={iconColor} />
      </div>
      <span className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] font-mono">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <h2 className="text-display-lg font-bold text-primary">{value}</h2>
        <span className={`text-label-md font-bold font-mono ${changeColor}`}>{change}</span>
      </div>
      <div className="w-full h-1 bg-white/5 mt-2 overflow-hidden rounded-full">
        <div className={`h-full ${barColor} ${barWidth}`} />
      </div>
    </div>
  );
}

const STATUS_ICONS = {
  normal: 'bg-white/10',
  urgent: 'bg-error-container/30',
  warranty: 'bg-secondary-container/20',
};

const STATUS_DOTS = {
  normal: 'bg-on-surface-variant',
  urgent: 'bg-error',
  warranty: 'bg-secondary',
} as const;

const STATUS_LABELS = {
  normal: 'Normal',
  urgent: 'Urgente',
  warranty: 'Garantia',
} as const;

function KanbanColumn({ title, count, color, orders }: { title: string; count: number; color: string; orders: ServiceOrder[] }) {
  return (
    <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${color} rounded-full`} />
          <h3 className="text-label-md font-medium text-primary uppercase font-mono">{title}</h3>
        </div>
        <span className="bg-white/5 text-on-surface-variant text-[10px] px-2 py-0.5 rounded text-label-sm font-mono">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <KanbanCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function KanbanCard({ order }: { order: ServiceOrder }) {
  return (
    <div className="glass-card p-4 hover:border-primary-fixed/40 transition-all cursor-pointer rounded-xl">
      <div className="flex justify-between items-start mb-3">
        <span className="text-label-sm text-primary-fixed-dim font-mono">{order.id}</span>
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${STATUS_ICONS[order.priority]}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[order.priority]}`} />
          <span
            className={`text-[10px] text-label-sm font-mono uppercase ${
              order.priority === 'urgent' ? 'text-error' : order.priority === 'warranty' ? 'text-secondary' : 'text-on-surface-variant'
            }`}
          >
            {STATUS_LABELS[order.priority]}
          </span>
        </div>
      </div>
      <h4 className="font-semibold text-[16px] text-primary mb-1">{order.title}</h4>
      <p className="text-on-surface-variant text-[13px] leading-tight mb-4">{order.description}</p>

      {order.tracking && (
        <div className="bg-error-container/10 p-2 rounded flex items-center gap-2 border border-error/20 mb-4">
          <PackageSearch size={14} className="text-error" />
          <span className="text-[10px] text-error-container font-mono font-medium uppercase">
            RASTREAMENTO: {order.tracking}
          </span>
        </div>
      )}

      {order.progress !== undefined && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: `${order.progress}%` }} />
          </div>
          <span className="text-[10px] text-secondary font-mono font-medium">{order.progress}%</span>
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-white/5">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-surface-container-high border border-background flex items-center justify-center overflow-hidden">
            <span className="text-[10px] font-bold font-mono">{order.technician}</span>
          </div>
        </div>
        <span
          className={`text-[10px] font-mono font-medium ${
            order.priority === 'urgent' && order.status !== 'done' ? 'text-error' : 'text-on-surface-variant'
          }`}
        >
          {order.createdAt}
        </span>
      </div>
    </div>
  );
}
