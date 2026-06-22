import { Hero } from '../components/hero';
import { MainLayout } from '../components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Full-width hero without main padding */}
      <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5">
        <nav className="flex justify-between items-center w-full px-margin-desktop py-4 mx-auto max-w-[1440px] h-20">
          <Link to="/" className="text-headline-lg font-black tracking-tighter text-primary">OFFICE-X</Link>
          <div className="flex items-center gap-6">
            <Link to="/loja" className="text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors">LOJA</Link>
            <Link to="/carrinho" className="text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors">CARRINHO</Link>
          </div>
        </nav>
      </header>

      <Hero />

      <MainLayout>
        <section className="py-24 text-center">
          <h2 className="text-display-md font-black text-primary mb-8">PRONTO PARA ELEVAR SEU ÁUDIO?</h2>
          <Link to="/loja">
            <Button size="lg">Ver Catálogo Completo</Button>
          </Link>
        </section>
      </MainLayout>
    </div>
  );
}
