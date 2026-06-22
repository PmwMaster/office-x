import { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollVideoProps {
  src: string;
  totalFrames?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ScrollVideo({ src, totalFrames = 120, className = '', children }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight;
    const scrollStart = rect.top;
    const totalScroll = rect.height - viewH;
    if (totalScroll <= 0) { setProgress(1); return; }
    const scrolled = Math.max(0, -scrollStart);
    const p = Math.min(1, scrolled / totalScroll);
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded || video.readyState < 2) return;
    const frame = Math.floor(progress * totalFrames);
    if (video.duration > 0) {
      video.currentTime = (frame / totalFrames) * video.duration;
    }
  }, [progress, totalFrames, loaded]);

  const handleLoaded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setLoaded(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedData={handleLoaded}
        />
        {/* Purple overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        {children && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {children}
          </div>
        )}
      </div>
      {/* Scrollable area */}
      <div style={{ height: '400vh' }} />
    </div>
  );
}
