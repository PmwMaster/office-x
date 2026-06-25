import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VortexRibbon } from '../layout/VortexRibbon';

export function CoreSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.playbackRate = 0.8;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black pt-12">
      <VortexRibbon />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative w-full overflow-hidden" style={{ minHeight: '50vh' }}>
          <video
            ref={videoRef}
            src="/core-earphones.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black pointer-events-none" />
        </div>

        <div className="flex items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24">
          <div className="space-y-6 max-w-md">
            <div className="space-y-1">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/90 font-mono">
                CORE ULTRA
              </p>
              <p className="text-[15px] font-medium tracking-[0.15em] uppercase text-text-tertiary font-mono">
                Earphones
              </p>
            </div>

            <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
              O ápice do áudio portátil. <span className="text-white/40">Sem fios.</span>
            </h2>

            <p className="text-[15px] leading-relaxed text-white/70">
              Cancelamento de ruído híbrido de 45dB. Dual-Driver Coaxial. Latência zero. Projetado para desaparecer nos seus ouvidos e dominar o seu setup.
            </p>

            <p className="text-[13px] leading-relaxed text-white/50">
              Fast Charge USB-C, carregamento sem fio Qi e LED dinâmico customizável via app. Até 40 horas de autonomia.
            </p>

            <div className="flex gap-3 pt-2">
              <Link to="/produto/vortex-core-ultra" className="inline-flex items-center rounded-full text-[13px] font-medium px-5 py-2.5 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]">
                Especificações
              </Link>
              <Link to="/comprar" className="inline-flex items-center rounded-full text-[13px] font-medium px-5 py-2.5 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 active:scale-[0.97] backdrop-blur-md">
                Comprar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
