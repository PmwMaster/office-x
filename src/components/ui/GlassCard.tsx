import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl transition-all duration-300 ${
        hover ? 'hover:border-white/10 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
