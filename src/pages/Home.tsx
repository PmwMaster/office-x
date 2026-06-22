import { useState } from 'react';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { Hero } from '../components/hero/Hero';
import { Navbar } from '../components/layout/Navbar';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button, GlassCard } from '../components/ui';
import { useCartStore } from '../stores/cartStore';
import { CATALOG } from '../data/headset-catalog';

export function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { items, remove, increase, decrease, clear, totalPrice, totalItems } = useCartStore();

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: CATÁLOGO */}
      <section id="catalogo" className="max-w-[1440px] mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-4">Catálogo</h2>
          <p className="text-white/40 max-w-md mx-auto">
            Selecionamos os melhores headsets do mundo. Do planar magnético ao dinâmico de referência.
          </p>
        </div>
        <ProductGrid products={CATALOG} />
      </section>

      {/* SECTION 3: COMPRAR */}
      <section id="comprar" className="max-w-[1440px] mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-4">Seu Carrinho</h2>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={40} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 mb-2">Seu carrinho está vazio.</p>
            <button
              onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-primary hover:text-white transition-colors"
            >
              Ver catálogo ↑
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map(({ product, quantity }) => (
                <GlassCard key={product.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] flex items-center justify-center text-2xl">🎧</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                    <p className="text-[11px] text-white/30 font-mono truncate">{product.specs}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrease(product.id)} className="w-6 h-6 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 text-xs"><Minus size={10} /></button>
                    <span className="text-xs font-bold font-mono w-4 text-center">{quantity}</span>
                    <button onClick={() => increase(product.id)} className="w-6 h-6 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 text-xs"><Plus size={10} /></button>
                  </div>
                  <span className="text-sm font-bold text-primary w-24 text-right">
                    {(product.price * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <button onClick={() => remove(product.id)} className="text-white/10 hover:text-red-400 transition-colors ml-2">
                    <Trash2 size={14} />
                  </button>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6 h-fit sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6">Resumo</h3>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between"><span className="text-white/40">Itens</span><span className="text-white">{totalItems()}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Frete</span><span className="text-primary">GRÁTIS</span></div>
              </div>
              <div className="border-t border-white/5 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-xl font-black text-primary">
                    {totalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setCheckoutOpen(true)}>Finalizar Compra</Button>
            </GlassCard>
          </div>
        )}
      </section>

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setCheckoutOpen(false)}>
          <GlassCard className="max-w-md w-full p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <span className="text-5xl mb-4 block">✅</span>
            <h3 className="text-xl font-black text-white mb-2">Pedido Confirmado</h3>
            <p className="text-white/40 text-sm mb-6">
              Seu pedido de {totalItems()} {totalItems() === 1 ? 'item' : 'itens'} no valor de{' '}
              {totalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} foi registrado.
            </p>
            <Button className="w-full" onClick={() => { clear(); setCheckoutOpen(false); }}>
              Ok
            </Button>
          </GlassCard>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-[11px] text-white/20 font-mono uppercase tracking-widest">OFFICE-X Audio &copy; 2026</p>
      </footer>
    </div>
  );
}
