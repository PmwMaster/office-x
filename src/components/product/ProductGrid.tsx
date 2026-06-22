import { ProductCard } from './ProductCard';
import type { Product } from '../../data/products';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-center py-20 text-white/30">Nenhum produto encontrado.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
