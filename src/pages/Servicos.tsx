import { useState } from 'react';
import { Wrench, Paintbrush, Cpu, Check, ShoppingCart } from 'lucide-react';
import type { ServiceItem } from '../types';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../stores/cartStore';
import { useServices } from '../services';

const CATEGORY_ICONS: Record<string, typeof Wrench> = {
  maintenance: Wrench,
  customization: Paintbrush,
  assembly: Cpu,
};

const SERVICE_CATEGORIES = [
  { id: 'all', label: 'TODOS' },
  { id: 'maintenance', label: 'MANUTENÇÃO' },
  { id: 'customization', label: 'CUSTOMIZAÇÃO' },
  { id: 'assembly', label: 'MONTAGEM' },
] as const;

export function Servicos() {
  const [activeCategory, setActiveCategory] = useState('all');
  const addService = useCartStore((s) => s.addService);
  const removeService = useCartStore((s) => s.removeService);
  const cartServices = useCartStore((s) => s.services);
  const { services, loading } = useServices();

  const filtered = services.filter((s) =>
    activeCategory === 'all' ? true : s.category === activeCategory,
  );

  return (
    <Layout>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-fixed/5 rounded-full blur-[100px] -z-10" />

      <header className="mb-16">
        <h1 className="text-display-lg font-bold text-primary mb-2">SERVIÇOS TÉCNICOS</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Manutenção, customização e montagem de periféricos de alta performance por especialistas certificados.
        </p>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-4 p-1 mb-12 flex-wrap">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 text-label-md uppercase rounded-lg transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'text-on-surface-variant hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 3 }).map((_, i) => (
            <GlassCard key={i} className="animate-pulse h-[320px]">
              <div className="w-14 h-14 bg-white/5 rounded-xl mb-6" />
              <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
              <div className="h-4 bg-white/5 rounded w-full mb-4" />
              <div className="h-4 bg-white/5 rounded w-1/2 mb-8" />
              <div className="h-12 bg-white/5 rounded" />
            </GlassCard>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filtered.map((service) => {
          const isInCart = !!cartServices.find((s) => s.item.id === service.id);
          return (
            <ServiceCard
              key={service.id}
              service={service}
              isInCart={isInCart}
              onToggle={() => isInCart ? removeService(service.id) : addService(service)}
            />
          );
        })}
      </div>
      )}
    </Layout>
  );
}

function ServiceCard({
  service,
  isInCart,
  onToggle,
}: {
  service: ServiceItem;
  isInCart: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = CATEGORY_ICONS[service.category] || Wrench;

  const categoryLabels: Record<string, string> = {
    maintenance: 'MANUTENÇÃO',
    customization: 'CUSTOMIZAÇÃO',
    assembly: 'MONTAGEM',
  };

  return (
    <GlassCard className="flex flex-col h-full group">
      <div className="w-14 h-14 bg-secondary-container/10 rounded-xl flex items-center justify-center mb-6 border border-secondary-container/20 group-hover:border-secondary-container/40 transition-all">
        <Icon size={28} className="text-secondary-container" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-headline-md font-semibold text-primary">{service.name}</h3>
          <span className="text-[10px] status-pill">
            {categoryLabels[service.category]}
          </span>
        </div>

        <p className="text-body-md text-on-surface-variant mb-4">{service.description}</p>

        {expanded && (
          <ul className="mb-6 space-y-2 p-4 bg-surface-container-lowest rounded-lg border border-white/5">
            {service.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-label-md text-on-surface-variant">
                <Check size={14} className="text-primary-fixed mt-0.5 shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-label-sm text-secondary-container hover:text-secondary-fixed transition-colors mb-6"
        >
          {expanded ? 'OCULTAR DETALHES' : 'VER DETALHES'}
        </button>

        <p className="text-headline-md font-bold text-primary-fixed mb-6 font-black tracking-tight">
          {service.price === 0
            ? 'GRATUITO'
            : `R$ ${service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </p>
      </div>

      <Button
        variant={isInCart ? 'secondary' : 'primary'}
        onClick={onToggle}
        className={`w-full text-sm tracking-widest ${isInCart ? 'border-primary-fixed text-primary-fixed' : ''}`}
      >
        {isInCart ? (
          <>
            <Check size={16} className="inline mr-2" />
            ADICIONADO
          </>
        ) : (
          <>
            <ShoppingCart size={16} className="inline mr-2" />
            CONTRATAR SERVIÇO
          </>
        )}
      </Button>
    </GlassCard>
  );
}
