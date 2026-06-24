import type { ReactNode, HTMLAttributes } from 'react';

export function GlassCard({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-surface/50 backdrop-blur-2xl border border-border rounded-3xl ${className}`} {...props}>
      {children}
    </div>
  );
}
