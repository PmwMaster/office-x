import { memo } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { GlassCard } from '../ui';
import type { Product } from '../../data/products';

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { items, add, increase, decrease } = useCartStore();
  const inCart = items.find((i) => i.product.id === product.id);
  const price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <GlassCard className="p-5 hover:border-primary/30 transition-all group flex flex-col">
      <div className="aspect-square bg-white/[0.02] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <span className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity select-none">🎧</span>
      </div>
      <h3 className="font-semibold text-white text-sm mb-1">{product.name}</h3>
      <p className="text-[11px] text-white/40 font-mono mb-4 line-clamp-2">{product.specs}</p>
      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="font-bold text-primary text-lg">{price}</span>
        {inCart ? (
          <div className="flex items-center gap-2">
            <button onClick={() => decrease(product.id)} className="w-7 h-7 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 text-sm"><Minus size={12} /></button>
            <span className="text-xs font-bold font-mono text-white">{inCart.quantity}</span>
            <button onClick={() => increase(product.id)} className="w-7 h-7 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 text-sm"><Plus size={12} /></button>
          </div>
        ) : (
          <button onClick={() => add(product)} className="flex items-center gap-1 text-xs font-semibold uppercase text-primary hover:text-white transition-colors">
            <ShoppingCart size={14} /> Add
          </button>
        )}
      </div>
    </GlassCard>
  );
});
