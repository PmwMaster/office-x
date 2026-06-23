import type { ReactNode } from 'react';

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface/50 backdrop-blur-2xl border border-border rounded-3xl ${className}`}>
      {children}
    </div>
  );
}
