import { type ReactNode } from 'react';

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
