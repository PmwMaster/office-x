import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../data/products';
import { hasProductDetail } from './ProductDetailModal';

const CATEGORY_LABELS: Record<string, string> = {
  'vortex-core-pro': 'OVER-EAR · LAB',
  'vortex-core-ultra': 'OVER-EAR · LAB',
  'vortex-apex-prime': 'OVER-EAR · APEX',
  'vortex-pulse-wraith': 'SPORT · PULSE',
  'vortex-pulse-overdrive': 'SPORT · PULSE',
  'vortex-lab-shield': 'ACESSÓRIO · LAB',
};

export const ProductCard = memo(function ProductCard({ product, side }: { product: Product; side: 'left' | 'right' }) {
  const { items, add, increase, decrease } = useCartStore();
  const navigate = useNavigate();
  const inCart = items.find((i) => i.product.id === product.id);
  const hasDetails = hasProductDetail(product.id);
  const category = CATEGORY_LABELS[product.id] ?? '';

  const p = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const goDetail = () => { if (hasDetails) navigate(`/produto/${product.id}`); };

  const imageBlock = (
    <div
      onClick={goDetail}
      className={`relative aspect-[4/3] md:aspect-auto md:h-full bg-gradient-to-br from-[#0a0a0a] via-[#111] to-black flex items-center justify-center overflow-hidden group-hover:from-[#0d0d0d] group-hover:via-[#151515] group-hover:to-black transition-colors duration-700 min-h-[280px] md:min-h-0 ${hasDetails ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(195,244,0,0.04),transparent)]" />
      <img
        src={product.image}
        alt={product.imageAlt}
        className="relative w-full h-full object-contain p-8 md:p-12 transition-all duration-700 group-hover:scale-105 pointer-events-none"
        loading="lazy"
      />
    </div>
  );

  const infoBlock = (
    <div className="flex flex-col justify-center p-6 md:p-10 space-y-3 md:space-y-4">
      {category && (
        <span className="text-[10px] font-mono text-primary/70 uppercase tracking-[0.25em]">{category}</span>
      )}
      <h3
        onClick={goDetail}
        className={`text-[clamp(20px,2.5vw,28px)] font-bold text-white tracking-[-0.02em] leading-tight ${hasDetails ? 'cursor-pointer hover:text-primary/80 transition-colors' : ''}`}
      >
        {product.name}
      </h3>
      <p className="text-[13px] md:text-[14px] text-text-secondary font-mono leading-relaxed max-w-md">
        {product.specs}
      </p>
      <div className="flex items-center gap-6 pt-4">
        <span className="text-[clamp(20px,2.2vw,26px)] font-bold text-white tracking-tight">
          {p(product.price)}
        </span>
        <span className="text-[11px] text-text-tertiary hidden sm:inline">em até 12x sem juros</span>
      </div>
      <div className="pt-2 flex items-center gap-3">
        {inCart ? (
          <>
            <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); decrease(product.id); }}
                className="w-7 h-7 rounded-full bg-white/10 text-text-secondary hover:bg-white/20 text-sm transition-colors"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="text-[14px] font-semibold font-mono text-white w-5 text-center select-none">{inCart.quantity}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); increase(product.id); }}
                className="w-7 h-7 rounded-full bg-white/10 text-text-secondary hover:bg-white/20 text-sm transition-colors"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
            {hasDetails && (
              <button
                type="button"
                onClick={goDetail}
                className="text-[12px] font-medium text-text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-primary/50"
              >
                Saiba mais
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); add(product); }}
              className="inline-flex items-center gap-2 rounded-full text-[14px] font-medium px-6 py-2.5 bg-white text-black hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
            >
              Adicionar
            </button>
            {hasDetails && (
              <button
                type="button"
                onClick={goDetail}
                className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-medium px-5 py-2.5 border border-white/[0.10] text-text-secondary hover:text-text hover:border-white/[0.20] transition-all duration-300 active:scale-[0.97]"
              >
                Saiba mais
                <span className="text-[11px]">→</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="group relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#080808] hover:border-white/[0.12] transition-all duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[320px]">
        {side === 'left' ? (
          <>
            {imageBlock}
            {infoBlock}
          </>
        ) : (
          <>
            <div className="hidden md:block">{infoBlock}</div>
            {imageBlock}
            <div className="block md:hidden">{infoBlock}</div>
          </>
        )}
      </div>
    </div>
  );
});
