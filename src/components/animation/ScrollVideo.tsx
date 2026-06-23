import { useRef, useEffect, useState } from 'react';

interface ScrollVideoProps {
  src: string;
  children?: React.ReactNode;
}

export function ScrollVideo({ src, children }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const loop = () => {
      const diff = targetFrame.current - currentFrame.current;
      if (Math.abs(diff) < 0.001) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      currentFrame.current += diff * 0.08;
      const video = videoRef.current;
      if (video && video.duration > 0) {
        video.currentTime = currentFrame.current * video.duration;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalH = rect.height;
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = totalH - viewH;
      if (maxScroll <= 0) { targetFrame.current = 1; return; }
      targetFrame.current = Math.min(1, Math.max(0, scrolled / maxScroll));

      const fadeStart = totalH * 0.85;
      if (scrolled > fadeStart) {
        setOpacity(Math.max(0, 1 - (scrolled - fadeStart) / (totalH - fadeStart)));
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLoaded = () => {
    const video = videoRef.current;
    if (video) { video.pause(); video.currentTime = 0; }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ opacity, background: '#000' }}>
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ imageRendering: 'auto', willChange: 'transform' }}
          muted playsInline preload="auto"
          onLoadedData={handleLoaded}
        />
        {/* Edge blend — identical to #000 background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        {children && (
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
            {children}
          </div>
        )}
      </div>
      <div style={{ height: '400vh' }} />
    </div>
  );
}
