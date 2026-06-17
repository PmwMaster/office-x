import { useState, useMemo } from 'react';
import { Calendar, CalendarCheck, Check, X } from 'lucide-react';
import type { RentalItem } from '../types';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../stores/cartStore';
import { useRentals } from '../services';

function todayStr(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function LocacaoEquipamentos() {
  const { rentals, loading } = useRentals();
  const addRental = useCartStore((s) => s.addRental);
  const removeRental = useCartStore((s) => s.removeRental);
  const cartRentals = useCartStore((s) => s.rentals);

  const [pickupDate, setPickupDate] = useState(todayStr());
  const [returnDate, setReturnDate] = useState(addDays(todayStr(), 7));
  const [searched, setSearched] = useState(false);

  const isInCart = (id: string) => !!cartRentals.find((r) => r.item.id === id);

  const available = useMemo(() => {
    if (!searched) return rentals;
    return rentals.filter((r) => r.status === 'available');
  }, [rentals, searched]);

  const days = useMemo(() => {
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);
    return Math.max(1, Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
  }, [pickupDate, returnDate]);

  return (
    <Layout>
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-secondary-container/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 right-10 w-[300px] h-[300px] bg-primary-fixed/5 rounded-full blur-[100px] -z-10" />

      <header className="mb-16">
        <h1 className="text-display-lg font-bold text-primary mb-2">GESTÃO DE TEMPO</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Locação de periféricos de alta performance para profissionais que não aceitam menos que a perfeição.
        </p>
      </header>

      {/* Date Picker Panel */}
      <GlassCard padding="lg" className="mb-16">
        <div className="flex flex-col md:flex-row items-end gap-gutter">
          <div className="flex-1 w-full">
            <label className="block text-label-sm text-on-surface-variant mb-4 uppercase tracking-widest">
              Data de Retirada
            </label>
            <div className="relative group">
              <Calendar
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary-container transition-colors"
              />
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={todayStr()}
                className="w-full bg-surface-container-lowest border-b border-white/10 text-on-surface text-headline-md py-4 pl-14 focus:outline-none focus:border-secondary-container transition-all"
              />
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-label-sm text-on-surface-variant mb-4 uppercase tracking-widest">
              Data de Devolução
            </label>
            <div className="relative group">
              <CalendarCheck
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary-container transition-colors"
              />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate}
                className="w-full bg-surface-container-lowest border-b border-white/10 text-on-surface text-headline-md py-4 pl-14 focus:outline-none focus:border-secondary-container transition-all"
              />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Button
              variant="secondary"
              onClick={() => setSearched(true)}
              className="w-full md:w-auto py-4 px-12 border-secondary-container text-secondary-container hover:brightness-110 transition-all"
              style={{ boxShadow: '0 0 30px rgba(157,0,255,0.2)' }}
            >
              BUSCAR DISPONIBILIDADE
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Equipment List */}
      <section className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-headline-md text-primary uppercase tracking-widest">Resultados Disponíveis</h2>
          <span className="text-label-sm text-on-surface-variant">
            MOSTRANDO {String(available.length).padStart(2, '0')} EQUIPAMENTOS
          </span>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <GlassCard key={i} className="animate-pulse h-[160px]">
                <div className="flex gap-8">
                  <div className="w-48 h-32 bg-white/5 rounded" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-white/5 rounded w-1/2" />
                    <div className="h-4 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : available.length === 0 ? (
          <p className="text-on-surface-variant text-body-lg text-center py-20">
            Nenhum equipamento disponível para o período selecionado.
          </p>
        ) : (
          available.map((equipment) => (
            <RentalCard
              key={equipment.id}
              equipment={equipment}
              days={days}
              isInCart={isInCart(equipment.id)}
              onReserve={() => {
                if (isInCart(equipment.id)) {
                  removeRental(equipment.id);
                } else {
                  addRental(equipment, pickupDate, returnDate);
                }
              }}
            />
          ))
        )}
      </section>
    </Layout>
  );
}

function RentalCard({
  equipment,
  days,
  isInCart,
  onReserve,
}: {
  equipment: RentalItem;
  days: number;
  isInCart: boolean;
  onReserve: () => void;
}) {
  const isAvailable = equipment.status === 'available';

  return (
    <GlassCard className="group flex flex-col md:flex-row items-center p-6 gap-8 hover:bg-white/[0.05] transition-all duration-500">
      <div className="w-full md:w-48 h-32 overflow-hidden shrink-0 relative">
        <img
          src={equipment.image}
          alt={equipment.imageAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <div>
          <h3 className="text-headline-md text-primary mb-2">{equipment.name}</h3>
          <div className="flex items-center gap-3">
            {isAvailable ? (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] px-3 py-1 rounded-sm font-mono bg-green-500/10 text-green-400 border border-green-500/20">
                <Check size={12} />
                DISPONÍVEL
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] px-3 py-1 rounded-sm font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                <X size={12} />
                EM USO
              </span>
            )}
            <span className="text-label-sm text-on-surface-variant">{equipment.specs}</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end w-full md:w-auto gap-4">
          <div className="text-right">
            <span className="text-label-md text-on-surface-variant">VALOR</span>
            <div className="text-headline-lg text-primary tracking-tighter">
              R$ {equipment.pricePerDay.toLocaleString('pt-BR')}{' '}
              <span className="text-label-sm text-on-surface-variant">/ DIA</span>
            </div>
            {days > 1 && (
              <p className="text-label-sm text-on-surface-variant mt-1">
                {days} dias · Total: R$ {(equipment.pricePerDay * days).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            )}
          </div>

          {isAvailable ? (
            <Button
              variant={isInCart ? 'secondary' : 'secondary'}
              onClick={onReserve}
              className={`px-8 py-3 text-label-md uppercase tracking-widest ${
                isInCart
                  ? 'border-primary-fixed text-primary-fixed'
                  : 'border-white/10 hover:border-primary-fixed'
              }`}
            >
              {isInCart ? (
                <>
                  <Check size={16} className="inline mr-2" />
                  RESERVADO
                </>
              ) : (
                'Reservar Período'
              )}
            </Button>
          ) : (
            <button
              disabled
              className="px-8 py-3 bg-white/5 border border-white/5 cursor-not-allowed text-label-md text-on-surface-variant uppercase tracking-widest"
            >
              Indisponível
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
