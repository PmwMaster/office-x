import type { HTMLAttributes, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function GlassCard({ children, className = '', hover = true, padding = 'md', ...props }: GlassCardProps) {
  const pads: Record<string, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`glass-surface light-leak-border rounded-xl ${pads[padding]} ${hover ? 'hover:bg-white/[0.05] transition-all duration-500' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
