import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import { HeadsetScrollAnimation } from '../animation';
import { COLORS } from '../../constants';

export function Hero() {
  return (
    <HeadsetScrollAnimation>
      <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <HeroContent />
        <HeroProduct />
      </div>
    </HeadsetScrollAnimation>
  );
}

function HeroContent() {
  return (
    <div className="mb-12 mt-24 space-y-6">
      <span className="text-label-sm text-primary-fixed font-mono uppercase tracking-[0.3em] border border-primary-fixed/20 rounded-full px-4 py-1.5">
        Coleção 2026
      </span>
      <h1 className="text-display-lg text-primary leading-none">
        ÁUDIO QUE VOCÊ
        <br />
        <span className="text-on-surface">SENTE NA PELE</span>
      </h1>
      <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
        Headsets premium com drivers planar magnéticos de 100mm. Projetados para gamers, criadores e audiófilos que exigem o impossível.
      </p>
      <HeroCTA />
      <HeroStats />
    </div>
  );
}

function HeroProduct() {
  return (
    <div className="relative w-full max-w-[600px] aspect-square">
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${COLORS.primary}40, transparent 70%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 border border-white/10 rounded-full flex flex-col items-center justify-center backdrop-blur-sm gap-2">
          <span className="text-7xl">🎧</span>
          <span className="text-display-md font-black text-primary">OFFICE-X</span>
          <span className="text-label-md text-on-surface-variant font-mono">SERIES ONE</span>
        </div>
      </div>
    </div>
  );
}

function HeroCTA() {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
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
    <div className="flex gap-12 justify-center flex-wrap mt-12 pt-8 border-t border-white/5">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-primary-fixed" />
        <span className="text-label-sm text-on-surface-variant">4.9 / 500+ reviews</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield size={16} className="text-primary-fixed" />
        <span className="text-label-sm text-on-surface-variant">2 anos de garantia</span>
      </div>
      <div className="flex items-center gap-2">
        <Truck size={16} className="text-primary-fixed" />
        <span className="text-label-sm text-on-surface-variant">Frete grátis Brasil</span>
      </div>
    </div>
  );
}
