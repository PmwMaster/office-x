import { HERO_SCROLL_STEPS } from '../../constants';

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {HERO_SCROLL_STEPS.map((step) => (
        <button
          key={step.part}
          className="flex items-center gap-3 group"
          aria-label={step.label}
        >
          <span className="text-[10px] font-mono text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity uppercase text-right w-20">
            {step.label}
          </span>
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              progress >= step.progress ? 'bg-primary-fixed scale-125 shadow-glow' : 'bg-white/10'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
