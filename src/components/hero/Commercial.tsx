import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Commercial() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

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
    <section ref={sectionRef} className="bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center px-6 md:px-8 lg:px-12 py-8 lg:py-12 order-2 lg:order-1">
          <div className="space-y-5 max-w-md">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-primary/90 font-mono">
              Vortex Pulse
            </p>
            <h2 className="text-[clamp(40px,6vw,72px)] font-bold leading-[0.92] tracking-[-0.03em] text-white">
              OverDrive
            </h2>
            <p className="text-[17px] leading-relaxed text-white/70">
              Ritmo implacável. Engenharia indestrutível para o topo da sua performance.
            </p>
            <div className="flex gap-3 pt-2">
              <Link to="/especificacoes" className="inline-flex items-center rounded-full text-[13px] font-medium px-5 py-2.5 bg-primary text-white hover:bg-primary-dim transition-all duration-300 active:scale-[0.97]">
                Especificações
              </Link>
              <Link to="/comprar" className="inline-flex items-center rounded-full text-[13px] font-medium px-5 py-2.5 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 active:scale-[0.97] backdrop-blur-md">
                Comprar
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden order-1 lg:order-2" style={{ minHeight: '60vh' }}>
          <video
            ref={videoRef}
            src="/comercial.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
