import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { ProductGrid } from '../components/product/ProductGrid';
import { CATALOG } from '../data/headset-catalog';
import { Footer } from '../components/layout/Footer';

const COLORS = [
  { name: 'Obsidian', file: 'carbon.png', hex: '#1a1a1a' },
  { name: 'Glacial', file: 'azul.png', hex: '#3b82f6' },
  { name: 'Lunar', file: 'branco.png', hex: '#e5e5e5' },
  { name: 'Nébula', file: 'rosa.png', hex: '#ec4899' },
];

export function Especificacoes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames: HTMLImageElement[] = [];
    let loaded = 0;

    COLORS.forEach((c) => {
      const img = new Image();
      img.onload = () => { loaded++; };
      img.src = `/corfone/${c.file}`;
      frames.push(img);
    });

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCover = (img: HTMLImageElement, opacity: number) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;

      const scale = Math.min(w / iw, h / ih) * 0.95;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    let current = 0;
    let target = 0;
    let rafId = 0;

    const loop = () => {
      const diff = target - current;
      current += diff * 0.06;

      if (loaded >= COLORS.length) {
        ctx.clearRect(0, 0, w, h);

        const t = ((current % COLORS.length) + COLORS.length) % COLORS.length;
        const floorIdx = Math.floor(t);
        const ceilIdx = (floorIdx + 1) % COLORS.length;
        const alpha = t - floorIdx;

        const a = frames[floorIdx];
        const b = frames[ceilIdx];
        if (a) drawCover(a, 1 - alpha);
        if (b && alpha > 0.001) drawCover(b, alpha);
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);

    let colorStep = 0;
    const advance = () => {
      colorStep++;
      target = colorStep;
    };

    const interval = setInterval(advance, 3500);
    advance();
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-text pt-20">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 space-y-3">
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-text leading-tight">
            Escolha o que melhor
            <br />
            <span className="text-text-secondary">combine com você</span>
          </h1>
        </div>

        <Link to="/produto/vortex-pulse-overdrive" className="block relative mb-12 flex flex-col items-center justify-center py-12 group cursor-pointer">
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[12vw] font-black text-white/[0.06] tracking-[-0.04em] leading-none transition-colors duration-500 group-hover:text-white/[0.10]">
              VORTEX<br />PULSE
            </span>
          </span>
          <canvas
            ref={canvasRef}
            className="relative z-10 w-full max-w-3xl aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]"
            style={{
              filter: 'drop-shadow(0 0 80px rgba(175,82,222,0.2))',
            }}
          />
        </Link>

        <ProductGrid products={CATALOG} />
      </section>

      <Footer />
    </div>
  );
}
