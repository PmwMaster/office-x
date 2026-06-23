import { ScrollVideo } from '../animation/ScrollVideo';

export function Hero() {
  return (
    <section id="visao-geral" className="relative">
      <ScrollVideo src="/fonesite.mp4">
        <div className="space-y-8 max-w-2xl">
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/80 font-mono">
            Series One
          </p>
          <h1 className="text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
            Escute
            <br />
            <span className="text-text-secondary">o invisível.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-text-secondary max-w-lg">
            Drivers planar magnéticos de 100mm com resposta de 5Hz a 50kHz.
            Projetado para quem exige o impossível do som.
          </p>
        </div>
      </ScrollVideo>
    </section>
  );
}
