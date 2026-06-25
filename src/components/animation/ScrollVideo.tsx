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
    let lastSeek = -1;
    let rafId = 0;

    const onLoaded = () => {
      duration = video.duration;
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', onLoaded, { once: true });

    const loop = () => {
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.5;
      if (duration > 0 && video.readyState >= 2) {
        const seek = currentFrame * duration;
        if (Math.abs(seek - lastSeek) > 0.03) {
          video.currentTime = seek;
          lastSeek = seek;
        }
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
    <div ref={containerRef} className="relative" style={{ height: '240vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-1/2 h-[105%] w-[105%] max-w-none object-cover"
          style={{ filter: 'brightness(1.3)', willChange: 'transform' }}
          muted playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
        {children && (
          <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
