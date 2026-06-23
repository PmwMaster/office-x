import { LoopVideo } from '../animation/LoopVideo';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Texto — esquerda */}
        <div className="space-y-8 pt-20 lg:pt-0">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/80 font-mono">
            Series One
          </p>
          <h1 className="text-[clamp(40px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
            Escute
            <br />
            <span className="text-text-secondary">o invisível.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-secondary max-w-md">
            Drivers planar magnéticos de 100mm com resposta de 5Hz a 50kHz.
            Projetado para quem exige o impossível do som.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/especificacoes" className="inline-flex items-center justify-center rounded-full text-[15px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]">
              Ver Especificações
            </Link>
            <Link to="/comprar" className="inline-flex items-center justify-center rounded-full text-[15px] font-medium px-7 py-3 bg-white/[0.06] text-text hover:bg-white/[0.10] transition-all duration-300 active:scale-[0.97]">
              Comprar
            </Link>
          </div>
        </div>

        {/* Vídeo — direita */}
        <div className="aspect-square lg:aspect-[3/4] w-full max-w-[500px] mx-auto rounded-3xl overflow-hidden bg-surface">
          <LoopVideo src="/fonesite.mp4" />
        </div>
      </div>
    </section>
  );
}
