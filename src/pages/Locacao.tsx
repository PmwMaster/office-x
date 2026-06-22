import { MainLayout } from '../components/layout/MainLayout';
import { GlassCard, Button } from '../components/ui';
import { useRentals } from '../hooks';
import { useCartStore } from '../stores';
import type { RentalItem } from '../types';

export function Locacao() {
  const { rentals, loading } = useRentals();
  const addRental = useCartStore((s) => s.addRental);

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-12">LOCAÇÃO DE EQUIPAMENTOS</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6 h-56 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {rentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} onAdd={() => addRental({ item: rental, pickupDate: '', returnDate: '' })} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

function RentalCard({ rental, onAdd }: { rental: RentalItem; onAdd: () => void }) {
  const price = rental.pricePerDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <GlassCard className="p-6 flex flex-col rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <span className="text-label-sm text-primary-fixed font-mono uppercase">{rental.category}</span>
        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${rental.status === 'available' ? 'bg-primary-fixed/10 text-primary' : 'bg-error/10 text-error'}`}>
          {rental.status === 'available' ? 'Disponível' : 'Em uso'}
        </span>
      </div>
      <h3 className="text-headline-md font-semibold text-primary mb-2">{rental.name}</h3>
      <p className="text-label-sm text-on-surface-variant mb-4 font-mono flex-1">{rental.specs}</p>
      <div className="pt-3 border-t border-white/5">
        <span className="text-headline-lg font-bold text-primary-fixed">{price}</span>
        <span className="text-label-sm text-on-surface-variant"> /dia</span>
        <Button variant="secondary" size="sm" className="w-full mt-3" disabled={rental.status !== 'available'} onClick={onAdd}>
          {rental.status === 'available' ? 'Reservar' : 'Indisponível'}
        </Button>
      </div>
    </GlassCard>
  );
}
