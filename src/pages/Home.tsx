import { Hero } from '../components/hero';
import { MainLayout } from '../components/layout/MainLayout';
import { HeadsetExplodedView } from '../components/animation';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function Home() {
  return (
    <MainLayout>
      <Hero />
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-display-md font-black text-primary mb-4">ENGENHARIA EM DETALHES</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Role para explorar cada componente do headset. Cada peça projetada com precisão milimétrica para a experiência sonora definitiva.
          </p>
        </div>
        <HeadsetExplodedView />
      </section>
      <section className="py-24 text-center">
        <h2 className="text-display-md font-black text-primary mb-8">PRONTO PARA ELEVAR SEU ÁUDIO?</h2>
        <Link to="/loja">
          <Button size="lg">Ver Catálogo Completo</Button>
        </Link>
      </section>
    </MainLayout>
  );
}
