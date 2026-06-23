import { useRef, useEffect } from 'react';

export function ScrollVideo({ src, children }: { src: string; children?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let duration = 0;
    let currentFrame = 0;
    let targetFrame = 0;
    let rafId = 0;

    const onLoaded = () => {
      duration = video.duration;
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', onLoaded, { once: true });

    const loop = () => {
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.1;
      if (duration > 0 && video.readyState >= 2) {
        video.currentTime = currentFrame * duration;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const maxScroll = rect.height - viewH;
      const scrolled = Math.max(0, -rect.top);
      targetFrame = maxScroll <= 0 ? 1 : Math.min(1, scrolled / maxScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          muted playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
        {children && (
          <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
