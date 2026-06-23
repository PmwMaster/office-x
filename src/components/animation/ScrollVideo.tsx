import { useRef, useEffect } from 'react';

export function ScrollVideo({ src, children }: { src: string; children?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!video || !sticky || !container) return;

    let duration = 0;
    let ticking = false;

    video.addEventListener('loadedmetadata', () => {
      duration = video.duration;
      video.pause();
      video.currentTime = 0;
    }, { once: true });

    const update = () => {
      if (duration === 0) { ticking = false; return; }
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const maxScroll = rect.height - viewH;
      const scrolled = Math.max(0, -rect.top);
      const progress = maxScroll <= 0 ? 1 : Math.min(1, scrolled / maxScroll);
      video.currentTime = progress * duration;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden" style={{ background: '#000' }}>
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          muted playsInline preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        {children && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            {children}
          </div>
        )}
      </div>
      <div style={{ height: '300vh' }} />
    </div>
  );
}
