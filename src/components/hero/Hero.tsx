import { ArrowDown } from 'lucide-react';
import { ScrollVideo } from '../animation/ScrollVideo';

export function Hero() {
  return (
    <section className="relative">
      <ScrollVideo src="/fonesite.mp4">
        <div className="text-center px-6 select-none">
          <span className="text-[11px] text-primary/80 border border-primary/20 rounded-full px-4 py-1.5 font-mono uppercase tracking-[0.3em] mb-8 inline-block">
            Coleção Series One
          </span>
          <h1 className="text-[clamp(36px,8vw,72px)] font-black text-white leading-[0.95] mb-6">
            O fone<br />definitivo
          </h1>
          <p className="text-base text-white/40 max-w-sm mx-auto mb-10">
            Drivers planar magnéticos de 100mm. Som que você não escuta — você sente.
          </p>
          <button
            onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-primary transition-colors pointer-events-auto"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Explorar</span>
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </div>
      </ScrollVideo>
    </section>
  );
}
