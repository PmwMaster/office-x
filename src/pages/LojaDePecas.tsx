import { useState } from 'react';
import {
  Bolt, Palette, FlaskConical, Cog, Scale, Cable, Check, Minus, Plus,
  Keyboard, Mouse, Monitor, Headphones,
} from 'lucide-react';
import type { ProductItem } from '../types';
import { CATEGORIES } from '../mock/data';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../stores/cartStore';
import { useProducts } from '../services';

const SPEC_ICONS: Record<string, typeof Bolt> = {
  switches: Bolt,
  keycaps: Palette,
  lubricants: FlaskConical,
  plates: Cog,
  stabilizers: Scale,
  cables: Cable,
  keyboards: Keyboard,
  mice: Mouse,
  monitors: Monitor,
  audio: Headphones,
};

export function LojaDePecas() {
  const [priceRange, setPriceRange] = useState(6000);
  const [activeCategory, setActiveCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const { products, loading } = useProducts();

  const filtered = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-gutter">
        <aside className="w-full md:w-80 shrink-0">
          <GlassCard padding="lg" hover={false} className="sticky top-32">
            <h3 className="text-headline-md font-semibold text-primary mb-8">CATEGORIAS</h3>
            <div className="flex flex-col gap-3 mb-10 max-h-[400px] overflow-y-auto pr-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-6 py-3 rounded-full border transition-all text-label-md uppercase font-medium ${
                  activeCategory === 'all'
                    ? 'border-primary-fixed bg-primary-fixed/10 text-primary-fixed'
                    : 'border-white/10 hover:border-white/30 text-on-surface-variant'
                }`}
              >
                TODOS
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-6 py-3 rounded-full border transition-all text-label-md uppercase font-medium ${
                    activeCategory === cat.id
                      ? 'border-primary-fixed bg-primary-fixed/10 text-primary-fixed'
                      : 'border-white/10 hover:border-white/30 text-on-surface-variant'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-label-md text-on-surface-variant uppercase">PREÇO</span>
                <span className="text-label-sm text-primary-fixed">R$ {priceRange}+</span>
              </div>
              <input
                type="range"
                min={0}
                max={6000}
                step={10}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary-fixed"
              />
            </div>
            <div>
              <h4 className="text-label-md text-on-surface-variant uppercase mb-4">ESTOQUE</h4>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className="w-5 h-5 rounded-sm border border-white/20 group-hover:border-primary-fixed transition-colors flex items-center justify-center"
                >
                  {inStockOnly && <Check size={16} className="text-primary-fixed" />}
                </div>
                <span className="text-body-md text-on-surface-variant">Disponível</span>
              </label>
            </div>
          </GlassCard>
        </aside>

        <section className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {Array.from({ length: 6 }).map((_, i) => (
                <GlassCard key={i} className="animate-pulse h-[480px]">
                  <div className="h-64 bg-white/5 rounded-lg mb-6" />
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-white/5 rounded w-1/2 mb-6" />
                  <div className="h-8 bg-white/5 rounded w-1/3 mb-8" />
                  <div className="h-12 bg-white/5 rounded" />
                </GlassCard>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-on-surface-variant text-body-lg text-center py-20">
                  Nenhum produto encontrado.
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}

function ProductCard({ product, index }: { product: ProductItem; index: number }) {
  const addProduct = useCartStore((s) => s.addProduct);
  const products = useCartStore((s) => s.products);
  const increaseQty = useCartStore((s) => s.increaseProductQty);
  const decreaseQty = useCartStore((s) => s.decreaseProductQty);

  const cartEntry = products.find((p) => p.item.id === product.id);
  const inCart = cartEntry !== undefined;
  const quantity = cartEntry?.quantity ?? 0;

  const SpecIcon = SPEC_ICONS[product.category] || Bolt;

  const isEquipment = ['keyboards', 'mice', 'monitors', 'audio'].includes(product.category);

  return (
    <GlassCard className="group flex flex-col h-full">
      <div className={`relative ${isEquipment ? 'h-48' : 'h-64'} mb-6 flex items-center justify-center overflow-hidden`}>
        <img
          alt={product.imageAlt}
          src={product.image}
          loading="lazy"
          decoding="async"
          className={`${isEquipment ? 'w-full h-full' : 'w-48 h-48'} object-cover rounded-lg`}
        />
        {!isEquipment && (
          <div className="absolute inset-0 filter drop-shadow-[0_20px_50px_rgba(204,255,0,0.15)] group-hover:scale-110 transition-transform duration-700 floating-animation pointer-events-none" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-headline-md font-semibold text-primary mb-2 font-bold leading-tight">
          {product.name}
        </h3>
        <p className="text-label-sm text-on-secondary-fixed-variant mb-4 flex items-center gap-2">
          <SpecIcon size={14} />
          {product.specs}
        </p>
        <p className="text-headline-md font-bold text-primary-fixed mb-6 font-black tracking-tight">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      {inCart ? (
        <div className="flex items-center justify-between bg-primary-fixed/10 border border-primary-fixed/30 rounded-lg p-1">
          <button
            onClick={() => decreaseQty(product.id)}
            className="w-10 h-10 flex items-center justify-center text-primary-fixed hover:bg-primary-fixed/20 rounded transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="text-label-md text-primary-fixed font-bold font-mono">{quantity}</span>
          <button
            onClick={() => increaseQty(product.id)}
            className="w-10 h-10 flex items-center justify-center text-primary-fixed hover:bg-primary-fixed/20 rounded transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <Button
          variant="primary"
          className="w-full text-sm tracking-widest"
          onClick={() => addProduct(product)}
        >
          ADICIONAR AO CARRINHO
        </Button>
      )}
    </GlassCard>
  );
}
