import { MainLayout } from '../components/layout/MainLayout';
import { GlassCard, Button } from '../components/ui';
import { useServices } from '../hooks';
import { useCartStore } from '../stores';
import { Wrench, Paintbrush, Package } from 'lucide-react';
import type { ServiceItem } from '../types';

const ICON_MAP: Record<string, typeof Wrench> = {
  maintenance: Wrench,
  customization: Paintbrush,
  assembly: Package,
};

export function Servicos() {
  const { services, loading } = useServices();
  const addService = useCartStore((s) => s.addService);

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-12">SERVIÇOS TÉCNICOS</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6 h-64 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onAdd={() => addService(service)} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

function ServiceCard({ service, onAdd }: { service: ServiceItem; onAdd: () => void }) {
  const Icon = ICON_MAP[service.category] ?? Wrench;
  const price = service.price === 0 ? 'GRÁTIS' : service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <GlassCard className="p-6 flex flex-col rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
          <Icon size={20} className="text-primary-fixed" />
        </div>
        <span className="text-headline-md font-bold text-primary-fixed">{price}</span>
      </div>
      <h3 className="text-headline-md font-semibold text-primary mb-2">{service.name}</h3>
      <p className="text-label-sm text-on-surface-variant mb-4 flex-1">{service.description}</p>
      <div className="space-y-1 mb-4">
        {service.details.map((d, i) => (
          <p key={i} className="text-[11px] text-on-surface-variant/70">{d}</p>
        ))}
      </div>
      <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={onAdd}>
        Contratar
      </Button>
    </GlassCard>
  );
}
