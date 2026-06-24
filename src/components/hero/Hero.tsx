import { ScrollVideo } from '../animation/ScrollVideo';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section id="visao-geral" className="relative pb-16">
      <ScrollVideo src="/fonesite.mp4">
        <div className="max-w-xl space-y-8 lg:-translate-x-8">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/90 font-mono">
            Series One
          </p>
          <h1 className="text-[clamp(48px,7vw,88px)] font-bold leading-[0.92] tracking-[-0.03em] text-white">
            Escute
            <br />
            <span className="text-white/60">o invisível.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-white/70 max-w-md">
            Drivers planar magnéticos de 100mm. Resposta de 5Hz a 50kHz.
            Projetado para quem exige o impossível do som.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/especificacoes" className="inline-flex items-center rounded-full text-[15px] font-medium px-7 py-3 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]">
              Ver Especificações
            </Link>
            <Link to="/comprar" className="inline-flex items-center rounded-full text-[15px] font-medium px-7 py-3 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 active:scale-[0.97] backdrop-blur-md">
              Comprar
            </Link>
          </div>
        </div>
      </ScrollVideo>
    </section>
  );
}
