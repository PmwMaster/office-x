import { useRef, useEffect } from 'react';

export function ScrollFrames({
  frameCount,
  framePath,
  children,
}: {
  frameCount: number;
  framePath: (i: number) => string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
      };
      img.src = framePath(i);
      frames.push(img);
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentFrame = 0;
    let targetFrame = 0;
    let rafId = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCover = (img: HTMLImageElement, opacity: number) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;

      const scale = Math.max(w / iw, h / ih) * 1.05;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = w * 0.5 - dw * 0.3;
      const dy = (h - dh) / 2;

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (loaded === 0) return;

      const floorIdx = Math.floor(currentFrame);
      const ceilIdx = Math.min(frameCount - 1, floorIdx + 1);
      const alpha = currentFrame - floorIdx;

      const a = frames[floorIdx];
      if (!a) return;

      drawCover(a, 1);
      if (alpha > 0.001) {
        const b = frames[ceilIdx];
        if (b) drawCover(b, alpha);
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.7;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(loop);

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const maxScroll = rect.height - viewH;
      const scrolled = Math.max(0, -rect.top);
      targetFrame =
        maxScroll <= 0
          ? frameCount - 1
          : Math.min(frameCount - 1, (scrolled / maxScroll) * (frameCount - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, [frameCount, framePath]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '240vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            filter: 'brightness(1.3)',
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
        {children && (
          <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
