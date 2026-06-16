import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children: ReactNode;
  loading?: boolean;
}

export function Button({ variant = 'secondary', children, className = '', loading, disabled, ...props }: ButtonProps) {
  const base = 'font-medium uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-primary-fixed text-on-primary-fixed font-bold py-4 px-8 rounded-lg hover:brightness-110 neon-glow text-sm',
    secondary: 'bg-transparent border border-white/10 hover:border-primary-fixed text-primary py-3 px-8 rounded-sm',
    ghost: 'text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 py-2 px-4 rounded-sm',
    danger: 'bg-error text-on-error font-bold py-4 px-8 rounded-sm hover:brightness-110',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'CARREGANDO...' : children}
    </button>
  );
}
