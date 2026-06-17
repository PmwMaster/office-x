import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingCart, Wrench, Package, CalendarRange } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../stores/cartStore';

export function Carrinho() {
  const {
    products,
    services,
    rentals,
    removeProduct,
    increaseProductQty,
    decreaseProductQty,
    removeService,
    removeRental,
    clearCart,
    getTotalItems,
    getSubtotal,
  } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  if (totalItems === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <ShoppingCart size={64} className="text-on-surface-variant/30" />
          <h2 className="text-headline-lg font-semibold text-primary">Carrinho Vazio</h2>
          <p className="text-body-lg text-on-surface-variant">Seu carrinho de itens de alta performance está vazio.</p>
          <Link to="/loja">
            <Button variant="primary">EXPLORAR LOJA</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-display-lg font-bold text-primary mb-2">CARRINHO</h1>
          <p className="text-body-lg text-on-surface-variant">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={clearCart}>
            <Trash2 size={16} className="inline mr-2" />
            LIMPAR
          </Button>
          <Link to="/pagamento">
            <Button variant="primary" className="text-sm">
              FINALIZAR COMPRA
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 space-y-8">
          {/* PRODUCTS */}
          {products.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Package size={20} className="text-primary-fixed" />
                <h2 className="text-headline-md font-semibold text-primary uppercase tracking-widest">
                  Produtos / Peças
                </h2>
              </div>
              <div className="space-y-4">
                {products.map(({ item, quantity }) => (
                  <GlassCard key={item.id} className="flex items-center gap-6">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-md font-semibold text-primary">{item.name}</h3>
                      <p className="text-label-sm text-on-surface-variant">{item.specs}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-surface-container-high rounded-lg p-1">
                      <button
                        onClick={() => decreaseProductQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary-fixed transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-label-md text-primary font-bold font-mono min-w-[24px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increaseProductQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary-fixed transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-body-md font-bold text-primary-fixed">
                        R$ {(item.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-label-sm text-on-surface-variant">
                        {quantity}x R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* SERVICES */}
          {services.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Wrench size={20} className="text-secondary-container" />
                <h2 className="text-headline-md font-semibold text-primary uppercase tracking-widest">
                  Serviços Técnicos
                </h2>
              </div>
              <div className="space-y-4">
                {services.map(({ item }) => (
                  <GlassCard key={item.id} className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-secondary-container/10 rounded-lg flex items-center justify-center shrink-0 border border-secondary-container/20">
                      <Wrench size={32} className="text-secondary-container" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-md font-semibold text-primary">{item.name}</h3>
                      <p className="text-label-sm text-on-surface-variant">{item.description}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-body-md font-bold text-primary-fixed">
                        {item.price === 0
                          ? 'GRATUITO'
                          : `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeService(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* RENTALS */}
          {rentals.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CalendarRange size={20} className="text-secondary-container" />
                <h2 className="text-headline-md font-semibold text-primary uppercase tracking-widest">
                  Locação de Equipamentos
                </h2>
              </div>
              <div className="space-y-4">
                {rentals.map(({ item, pickupDate, returnDate }) => {
                  const pickup = new Date(pickupDate);
                  const ret = new Date(returnDate);
                  const days = Math.max(1, Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
                  return (
                    <GlassCard key={item.id} className="flex items-center gap-6">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body-md font-semibold text-primary">{item.name}</h3>
                        <p className="text-label-sm text-on-surface-variant">{item.specs}</p>
                        <p className="text-label-sm text-on-surface-variant mt-1">
                          {new Intl.DateTimeFormat('pt-BR').format(pickup)} → {new Intl.DateTimeFormat('pt-BR').format(ret)} · {days} {days === 1 ? 'dia' : 'dias'}
                        </p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-body-md font-bold text-primary-fixed">
                          R$ {(item.pricePerDay * days).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-label-sm text-on-surface-variant">
                          R$ {item.pricePerDay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/dia
                        </p>
                      </div>
                      <button
                        onClick={() => removeRental(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </GlassCard>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-surface sticky top-32 rounded-xl p-8 flex flex-col gap-6">
            <h3 className="text-headline-md font-semibold text-primary uppercase tracking-tighter">RESUMO</h3>

            {products.length > 0 && (
              <div className="space-y-2">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">Produtos</span>
                {products.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between text-body-md">
                    <span className="text-on-surface-variant truncate mr-4">{item.name} x{quantity}</span>
                    <span className="text-primary font-mono">
                      R$ {(item.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {services.length > 0 && (
              <div className="space-y-2">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">Serviços</span>
                {services.map(({ item }) => (
                  <div key={item.id} className="flex justify-between text-body-md">
                    <span className="text-on-surface-variant truncate mr-4">{item.name}</span>
                    <span className="text-primary font-mono">
                      {item.price === 0
                        ? 'Grátis'
                        : `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {rentals.length > 0 && (
              <div className="space-y-2">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">Locação</span>
                {rentals.map(({ item, pickupDate, returnDate }) => {
                  const pickup = new Date(pickupDate);
                  const ret = new Date(returnDate);
                  const days = Math.max(1, Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
                  return (
                    <div key={item.id} className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant truncate mr-4">{item.name} ({days}d)</span>
                      <span className="text-primary font-mono">
                        R$ {(item.pricePerDay * days).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="h-[2px] bg-gradient-to-r from-transparent via-primary-fixed/40 to-transparent" />

            <div className="flex justify-between items-baseline">
              <span className="text-label-md text-on-surface-variant uppercase tracking-widest">TOTAL</span>
              <span className="text-headline-md font-black text-primary-fixed">
                R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <Link to="/pagamento">
              <Button variant="primary" className="w-full py-6 text-headline-md font-black tracking-widest hover:scale-[1.02] neon-glow">
                IR PARA PAGAMENTO
              </Button>
            </Link>

            <Link to="/loja" className="flex items-center justify-center gap-2 text-label-md text-on-surface-variant hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              CONTINUAR COMPRANDO
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
