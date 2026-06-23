import { ProductCard } from './ProductCard';
import type { Product } from '../../data/products';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <p className="text-center py-24 text-text-tertiary">Nenhum produto.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
