import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed/80',
  secondary: 'border border-primary-fixed/30 text-primary hover:bg-primary-fixed/10',
  ghost: 'text-on-surface-variant hover:text-primary hover:bg-white/5',
  danger: 'bg-error/15 text-error hover:bg-error/25',
};

const sizes = {
  sm: 'px-3 py-1.5 text-label-sm',
  md: 'px-6 py-3 text-label-md',
  lg: 'px-8 py-4 text-body-lg',
};

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl font-semibold uppercase tracking-wide transition-all duration-200 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
