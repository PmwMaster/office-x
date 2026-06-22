import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = variant === 'primary'
    ? 'bg-primary text-on-primary-fixed hover:bg-primary/80'
    : 'text-on-surface-variant hover:text-primary hover:bg-white/5';
  return (
    <button className={`rounded-xl font-semibold uppercase tracking-wide text-sm px-6 py-3 transition-all duration-200 active:scale-95 ${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
