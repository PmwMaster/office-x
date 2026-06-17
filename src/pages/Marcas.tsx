import { ExternalLink } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Layout } from '../components/layout/Layout';
import { useBrands } from '../services';

export function Marcas() {
  const { brands, loading } = useBrands();

  const featured = brands.filter((b) => b.featured);
  const others = brands.filter((b) => !b.featured);

  return (
    <Layout>
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-secondary-container/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 right-10 w-[300px] h-[300px] bg-primary-fixed/5 rounded-full blur-[100px] -z-10" />

      <header className="mb-16">
        <h1 className="text-display-lg font-bold text-primary mb-2">MARCAS</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Trabalhamos com as marcas mais prestigiadas do mundo em periféricos de alta performance, áudio profissional e hardware entusiasta.
        </p>
      </header>

      {loading ? (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i} className="animate-pulse h-[220px]">
                <div className="w-24 h-24 bg-white/5 rounded-xl mb-4 mx-auto" />
                <div className="h-6 bg-white/5 rounded w-1/2 mx-auto mb-3" />
                <div className="h-4 bg-white/5 rounded w-3/4 mx-auto" />
              </GlassCard>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Featured Brands */}
          <section className="mb-20">
            <h2 className="text-headline-md text-primary uppercase tracking-widest mb-8">
              Destaques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {featured.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </section>

          {/* All Brands Grid */}
          <section>
            <h2 className="text-headline-md text-primary uppercase tracking-widest mb-8">
              Todas as Marcas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
              {others.map((brand) => (
                <BrandCard key={brand.id} brand={brand} compact />
              ))}
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

function BrandCard({ brand, compact }: { brand: typeof import('../types').Brand extends infer T ? T : never; compact?: boolean }) {
  return (
    <GlassCard className={`group flex flex-col items-center text-center ${compact ? 'p-6' : 'p-8'} hover:bg-white/[0.06] transition-all duration-500`}>
      <div className="w-24 h-24 flex items-center justify-center mb-6 rounded-xl bg-surface-container-lowest border border-white/5 group-hover:border-white/10 transition-all">
        <img
          src={brand.logo}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          className="max-w-[80px] max-h-[80px] object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/products/placeholder.svg';
          }}
        />
      </div>

      <h3 className="text-headline-md font-semibold text-primary mb-2">{brand.name}</h3>
      <span className="text-label-sm text-primary-fixed mb-4 font-mono tracking-widest uppercase">
        {brand.category}
      </span>
      {!compact && (
        <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
          {brand.description}
        </p>
      )}
      <a
        href={brand.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-label-sm text-on-surface-variant hover:text-primary-fixed transition-colors mt-auto"
      >
        <ExternalLink size={14} />
        {brand.website.replace('https://www.', '').replace('https://', '')}
      </a>
    </GlassCard>
  );
}
