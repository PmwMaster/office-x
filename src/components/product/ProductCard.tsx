import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { GlassCard } from '../ui';
import type { Product } from '../../data/products';
import { hasProductDetail } from './ProductDetailModal';

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { items, add, increase, decrease } = useCartStore();
  const inCart = items.find((i) => i.product.id === product.id);
  const hasDetails = hasProductDetail(product.id);

  const p = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const content = (
    <>
      <div className="aspect-[4/3] bg-gradient-to-br from-surface to-black flex items-center justify-center relative overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-[15px] font-semibold text-text">{product.name}</h3>
        <p className="text-[12px] text-text-tertiary font-mono leading-relaxed line-clamp-2">{product.specs}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[17px] font-semibold text-text">{p(product.price)}</span>
          {inCart ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => decrease(product.id)} className="w-7 h-7 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-xs transition-colors">−</button>
              <span className="text-[13px] font-semibold font-mono text-text w-4 text-center">{inCart.quantity}</span>
              <button onClick={() => increase(product.id)} className="w-7 h-7 rounded-full bg-white/5 text-text-secondary hover:bg-white/10 text-xs transition-colors">+</button>
            </div>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); add(product); }} className="text-[13px] font-medium text-primary hover:text-primary/70 transition-colors">
              Adicionar
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (hasDetails) {
    return (
      <Link to={`/produto/${product.id}`} className="block">
        <GlassCard className="group overflow-hidden cursor-pointer">
          {content}
        </GlassCard>
      </Link>
    );
  }

  return (
    <GlassCard className="group overflow-hidden">
      {content}
    </GlassCard>
  );
});