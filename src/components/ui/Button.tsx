import type { ReactNode } from 'react';

export function Button({ children, onClick, className = '', variant = 'primary' }: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const base = 'inline-flex items-center justify-center rounded-full text-[15px] font-medium px-7 py-3 transition-all duration-300 active:scale-[0.97]';
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-dim',
    secondary: 'bg-white/[0.06] text-text hover:bg-white/[0.10]',
    ghost: 'text-primary hover:bg-primary/10',
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
