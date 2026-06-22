import { useState, useMemo } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ProductGrid } from '../components/product';
import { Input } from '../components/ui';
import { useProducts } from '../hooks';
import { HEADSET_CATEGORIES } from '../data/headset-catalog';

export function Loja() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    let p = products;
    if (category !== 'all') p = p.filter((pr) => pr.category === category);
    if (search) {
      const q = search.toLowerCase();
      p = p.filter((pr) => pr.name.toLowerCase().includes(q) || pr.specs.toLowerCase().includes(q));
    }
    return p;
  }, [products, category, search]);

  return (
    <MainLayout>
      <section className="mb-12">
        <h1 className="text-display-md font-black text-primary mb-8">CATÁLOGO</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            variant="search"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-on-surface text-label-md focus:outline-none focus:border-primary-fixed/30"
          >
            <option value="all">Todas as categorias</option>
            {HEADSET_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </section>
      <ProductGrid products={filtered} loading={loading} />
    </MainLayout>
  );
}
