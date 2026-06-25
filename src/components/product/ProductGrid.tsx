import { ProductCard } from './ProductCard';
import type { Product } from '../../data/products';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <p className="text-center py-24 text-text-tertiary">Nenhum produto.</p>;
  return (
    <div className="space-y-5">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} side={i % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  );
}
