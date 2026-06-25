import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button, GlassCard } from '../components/ui';
import { useCartStore } from '../stores/cartStore';
import { Footer } from '../components/layout/Footer';

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function Comprar() {
  const [done, setDone] = useState(false);
  const { items, remove, increase, decrease, clear, totalPrice, totalItems } = useCartStore();

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16 space-y-3">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/70 font-mono">Comprar</p>
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">Seu carrinho</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto">
              <ShoppingCart size={24} className="text-text-tertiary" />
            </div>
            <p className="text-[17px] text-text-secondary">Seu carrinho está vazio.</p>
            <Link to="/especificacoes" className="text-[15px] text-primary hover:text-primary/70 transition-colors">
              Ver catálogo →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map(({ product, quantity }) => (
                <GlassCard key={product.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-xl flex-shrink-0">🎧</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-text">{product.name}</h3>
                    <p className="text-[12px] text-text-tertiary font-mono truncate">{product.specs}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrease(product.id)} className="w-6 h-6 rounded-full bg-white/5 text-text-tertiary hover:bg-white/10 text-xs transition-colors">−</button>
                    <span className="text-[13px] font-semibold font-mono w-4 text-center">{quantity}</span>
                    <button onClick={() => increase(product.id)} className="w-6 h-6 rounded-full bg-white/5 text-text-tertiary hover:bg-white/10 text-xs transition-colors">+</button>
                  </div>
                  <span className="text-[15px] font-semibold text-text w-24 text-right">{fmt(product.price * quantity)}</span>
                  <button onClick={() => remove(product.id)} className="text-text-tertiary hover:text-red-400 transition-colors ml-1"><Trash2 size={14} /></button>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="p-6 h-fit lg:sticky lg:top-20 space-y-5">
              <h3 className="text-[17px] font-semibold text-text">Resumo</h3>
              <div className="space-y-2 text-[14px]">
                <div className="flex justify-between"><span className="text-text-secondary">{totalItems()} {totalItems() === 1 ? 'item' : 'itens'}</span><span className="text-text">{fmt(totalPrice())}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Frete</span><span className="text-primary font-medium">Grátis</span></div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <span className="text-[15px] font-semibold text-text">Total</span>
                <span className="text-[24px] font-bold text-text tracking-tight">{fmt(totalPrice())}</span>
              </div>
              <Button className="w-full" onClick={() => setDone(true)}>Finalizar compra</Button>
            </GlassCard>
          </div>
        )}
      </section>

      {done && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setDone(false)}>
          <GlassCard className="max-w-sm w-full p-8 text-center space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto"><span className="text-2xl">✓</span></div>
            <h3 className="text-[20px] font-bold text-text">Pedido confirmado</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">{totalItems()} {totalItems() === 1 ? 'item' : 'itens'} · {fmt(totalPrice())}</p>
            <Button className="w-full" onClick={() => { clear(); setDone(false); }}>Ok</Button>
          </GlassCard>
        </div>
      )}

      <Footer />
    </div>
  );
}
