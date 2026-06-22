import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Wrench, Calendar } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button, GlassCard } from '../components/ui';
import { useCartStore } from '../stores';

export function Carrinho() {
  const { products, services, rentals, removeProduct, increaseProductQty, decreaseProductQty, removeService, removeRental, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const isEmpty = products.length === 0 && services.length === 0 && rentals.length === 0;

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-12">CARRINHO</h1>

      {isEmpty ? (
        <div className="text-center py-20">
          <ShoppingCart size={48} className="text-on-surface-variant/30 mx-auto mb-4" />
          <p className="text-body-lg text-on-surface-variant mb-4">Seu carrinho está vazio.</p>
          <Link to="/loja"><Button>Explorar Produtos</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {products.map((entry) => (
              <GlassCard key={entry.product.id} className="p-4 flex gap-4 rounded-2xl">
                <img src={entry.product.image} alt={entry.product.imageAlt} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="text-headline-md font-semibold text-primary">{entry.product.name}</h3>
                  <p className="text-label-sm text-on-surface-variant font-mono">{entry.product.specs}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseProductQty(entry.product.id)} className="w-7 h-7 bg-white/5 rounded-lg text-on-surface-variant hover:bg-white/10 text-sm">-</button>
                    <span className="text-label-md font-bold text-primary">{entry.quantity}</span>
                    <button onClick={() => increaseProductQty(entry.product.id)} className="w-7 h-7 bg-white/5 rounded-lg text-on-surface-variant hover:bg-white/10 text-sm">+</button>
                    <span className="ml-auto text-headline-md font-bold text-primary-fixed">
                      {(entry.product.price * entry.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeProduct(entry.product.id)} className="text-on-surface-variant/30 hover:text-error transition-colors">
                  <Trash2 size={16} />
                </button>
              </GlassCard>
            ))}

            {services.map((s) => (
              <GlassCard key={s.id} className="p-4 flex items-center gap-4 rounded-2xl">
                <Wrench size={20} className="text-primary-fixed" />
                <div className="flex-1">
                  <h3 className="text-headline-md font-semibold text-primary">{s.name}</h3>
                  <p className="text-label-sm text-on-surface-variant">{s.description}</p>
                </div>
                <span className="text-headline-md font-bold text-primary-fixed">
                  {s.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button onClick={() => removeService(s.id)} className="text-on-surface-variant/30 hover:text-error transition-colors">
                  <Trash2 size={16} />
                </button>
              </GlassCard>
            ))}

            {rentals.map((re) => (
              <GlassCard key={re.item.id} className="p-4 flex items-center gap-4 rounded-2xl">
                <Calendar size={20} className="text-secondary" />
                <div className="flex-1">
                  <h3 className="text-headline-md font-semibold text-primary">{re.item.name}</h3>
                  <p className="text-label-sm text-on-surface-variant font-mono">{re.item.specs}</p>
                </div>
                <span className="text-headline-md font-bold text-primary-fixed">
                  {re.item.pricePerDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/dia
                </span>
                <button onClick={() => removeRental(re.item.id)} className="text-on-surface-variant/30 hover:text-error transition-colors">
                  <Trash2 size={16} />
                </button>
              </GlassCard>
            ))}
          </div>

          <div>
            <GlassCard className="p-6 rounded-2xl sticky top-28">
              <h3 className="text-headline-lg font-semibold text-primary mb-6">Resumo</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-label-md">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-primary">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                <div className="flex justify-between text-label-md">
                  <span className="text-on-surface-variant">Frete</span>
                  <span className="text-primary-fixed">GRÁTIS</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-headline-md font-semibold text-primary">Total</span>
                  <span className="text-headline-lg font-black text-primary-fixed">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
              <Link to="/pagamento">
                <Button className="w-full">Finalizar Compra</Button>
              </Link>
            </GlassCard>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
