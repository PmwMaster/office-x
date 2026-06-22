import { MainLayout } from '../components/layout/MainLayout';
import { GlassCard } from '../components/ui';
import { useBrands } from '../hooks';
import { ExternalLink } from 'lucide-react';
import { memo } from 'react';

export function Marcas() {
  const { brands, loading } = useBrands();
  const featured = brands.filter((b) => b.featured);
  const others = brands.filter((b) => !b.featured);

  return (
    <MainLayout>
      <h1 className="text-display-md font-black text-primary mb-4">MARCAS PARCEIRAS</h1>
      <p className="text-body-lg text-on-surface-variant mb-12">Trabalhamos com as melhores marcas do mundo em áudio e periféricos premium.</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card h-32 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <section className="mb-16">
            <h2 className="text-headline-lg font-semibold text-primary mb-6">DESTAQUES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {featured.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-headline-lg font-semibold text-primary mb-6">TODAS AS MARCAS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
              {others.map((brand) => (
                <BrandMini key={brand.id} brand={brand} />
              ))}
            </div>
          </section>
        </>
      )}
    </MainLayout>
  );
}

const BrandCard = memo(function BrandCard({ brand }: { brand: typeof import('../types').Brand.prototype }) {
  return (
    <GlassCard className="p-6 rounded-2xl">
      <img src={brand.logo} alt={brand.name} className="h-10 mb-4 object-contain" />
      <h3 className="text-headline-md font-semibold text-primary mb-2">{brand.name}</h3>
      <p className="text-label-sm text-on-surface-variant mb-4 line-clamp-3">{brand.description}</p>
      <span className="text-[10px] text-primary-fixed font-mono uppercase">{brand.category}</span>
    </GlassCard>
  );
});

const BrandMini = memo(function BrandMini({ brand }: { brand: typeof import('../types').Brand.prototype }) {
  return (
    <GlassCard className="p-4 flex flex-col items-center text-center rounded-2xl">
      <img src={brand.logo} alt={brand.name} className="h-8 mb-3 object-contain" />
      <span className="text-label-sm text-on-surface-variant font-mono">{brand.name}</span>
      <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary-fixed/60 hover:text-primary-fixed mt-1 flex items-center gap-1">
        <ExternalLink size={10} /> Site
      </a>
    </GlassCard>
  );
});
