import { useRef, useEffect } from 'react';

interface ScrollVideoProps {
  src: string;
  children?: React.ReactNode;
}

export function ScrollVideo({ src, children }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frame = useRef({ current: 0, target: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const sticky = stickyRef.current;
    const container = containerRef.current;
    if (!video || !sticky || !container) return;

    let videoDuration = 0;

    const onLoaded = () => {
      videoDuration = video.duration;
      video.pause();
    };
    video.addEventListener('loadeddata', onLoaded);

    const tick = () => {
      const f = frame.current;
      const diff = f.target - f.current;
      f.current += diff * 0.12;
      if (videoDuration > 0) {
        video.currentTime = f.current * videoDuration;
      }
      sticky.style.opacity = String(1);
      raf.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalH = rect.height;
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = totalH - viewH;
      frame.current.target = maxScroll <= 0 ? 1 : Math.min(1, scrolled / maxScroll);
    };

    raf.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadeddata', onLoaded);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#000' }}
      >
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-contain"
          muted playsInline preload="auto"
        />
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
