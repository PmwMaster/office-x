import { useScrollProgress } from './useScrollProgress';
import { ScrollProgress } from './ScrollProgress';
import { type ReactNode } from 'react';

interface HeadsetScrollAnimationProps {
  children: ReactNode;
  hideProgress?: boolean;
}

export function HeadsetScrollAnimation({ children, hideProgress }: HeadsetScrollAnimationProps) {
  const { ref, progress } = useScrollProgress();

  return (
    <div ref={ref} className="relative">
      {/* Sticky container for the headset visualization */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {children}
      </div>
      {!hideProgress && <ScrollProgress progress={progress} />}
    </div>
  );
}
