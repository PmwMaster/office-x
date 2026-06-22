import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores';
import { Button } from '../ui';
import type { ProductItem } from '../../types';
import { memo } from 'react';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const addProduct = useCartStore((s) => s.addProduct);
  const cartProducts = useCartStore((s) => s.products);
  const increaseQty = useCartStore((s) => s.increaseProductQty);
  const decreaseQty = useCartStore((s) => s.decreaseProductQty);

  const inCart = cartProducts.find((p) => p.product.id === product.id);
  const price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="glass-card p-4 hover:border-primary-fixed/30 transition-all cursor-pointer group rounded-2xl flex flex-col">
      <div className="relative w-full aspect-[3/2] bg-surface-container-lowest rounded-xl overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
          {product.category.toUpperCase()}
        </div>
      </div>

      <h3 className="text-headline-md font-semibold text-primary mb-1">{product.name}</h3>
      <p className="text-label-sm text-on-surface-variant font-mono mb-4 line-clamp-2">{product.specs}</p>

      <div className="mt-auto pt-3 border-t border-white/5">
        <span className="text-headline-lg font-bold text-primary-fixed">{price}</span>

        {inCart ? (
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => decreaseQty(product.id)}
              className="w-8 h-8 bg-white/5 rounded-lg text-on-surface-variant hover:bg-white/10 transition-colors text-sm"
            >
              -
            </button>
            <span className="text-label-md font-bold font-mono text-primary">{inCart.quantity}</span>
            <button
              onClick={() => increaseQty(product.id)}
              className="w-8 h-8 bg-white/5 rounded-lg text-on-surface-variant hover:bg-white/10 transition-colors text-sm"
            >
              +
            </button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="w-full mt-3"
            onClick={() => addProduct(product)}
          >
            <ShoppingCart size={14} className="mr-2" />
            Adicionar
          </Button>
        )}
      </div>
    </div>
  );
});
