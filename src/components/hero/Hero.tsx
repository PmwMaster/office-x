import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import { ScrollVideo } from '../animation';

export function Hero() {
  return (
    <section className="relative">
      <ScrollVideo src="/fonesite.mp4">
        <div className="text-center px-6 select-none">
          <span className="text-label-sm text-primary border border-primary/20 rounded-full px-4 py-1.5 font-mono uppercase tracking-[0.3em] mb-6 inline-block">
            Coleção Series One
          </span>
          <h1 className="text-[clamp(40px,8vw,80px)] font-black text-on-surface leading-none mb-4">
            OFFICE-X
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-8">
            O fone definitivo. Drivers planar magnéticos de 100mm. Som que você não escuta — você sente.
          </p>
          <HeroCTA />
          <HeroStats />
        </div>
      </ScrollVideo>
    </section>
  );
}

function HeroCTA() {
  return (
    <div className="flex gap-4 justify-center flex-wrap pointer-events-auto">
      <Link to="/loja">
        <Button size="lg">
          Explorar Coleção
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </Link>
      <Link to="/servicos">
        <Button variant="ghost" size="lg">
          Serviços Técnicos
        </Button>
      </Link>
    </div>
  );
}

function HeroStats() {
  return (
    <div className="flex gap-12 justify-center flex-wrap mt-12 pt-8 border-t border-white/5 pointer-events-auto">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-primary" />
        <span className="text-label-sm text-on-surface-variant">4.9 / 500+ reviews</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield size={16} className="text-primary" />
        <span className="text-label-sm text-on-surface-variant">2 anos de garantia</span>
      </div>
      <div className="flex items-center gap-2">
        <Truck size={16} className="text-primary" />
        <span className="text-label-sm text-on-surface-variant">Frete grátis Brasil</span>
      </div>
    </div>
  );
}
