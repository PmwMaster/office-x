import { useScrollProgress } from './useScrollProgress';
import { HEADPHONE_PARTS } from '../../constants';

export function HeadsetExplodedView() {
  const { ref, progress } = useScrollProgress();

  const part = HEADPHONE_PARTS[Math.min(Math.floor(progress * HEADPHONE_PARTS.length), HEADPHONE_PARTS.length - 1)];

  return (
    <div ref={ref} className="relative w-full max-w-[800px] mx-auto">
      <div className="sticky top-32 flex flex-col items-center gap-8 pb-screen">
        {/* Central silhouette - placeholder for 3D model */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--part-color),transparent_70%)] opacity-20 rounded-full"
            style={{ '--part-color': part.color } as React.CSSProperties}
          />
          <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-display-md font-black text-primary font-mono">OFFICE-X</span>
          </div>

          {/* Part highlight */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-surface/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 text-center transition-all duration-500"
          >
            <span className="text-label-sm text-primary font-mono uppercase">{part.id}</span>
            <h3 className="text-headline-md font-semibold text-primary mt-1">{part.label}</h3>
            <p className="text-label-sm text-on-surface-variant mt-1 max-w-[240px]">{part.description}</p>
          </div>
        </div>

        {/* Part list */}
        <div className="flex gap-4 flex-wrap justify-center">
          {HEADPHONE_PARTS.map((p) => (
            <div
              key={p.id}
              className={`px-4 py-2 rounded-full border text-label-sm font-mono uppercase transition-all duration-300 ${
                p.id === part.id
                  ? 'border-primary-fixed/50 text-primary bg-primary-fixed/5'
                  : 'border-white/5 text-on-surface-variant'
              }`}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div style={{ height: `${HEADPHONE_PARTS.length * 100}vh` }} />
    </div>
  );
}
