import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  variant?: 'default' | 'search';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, className = '', variant = 'default', ...props }, ref) => {
    if (variant === 'search') {
      return (
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`bg-transparent border-none focus:ring-0 text-label-md text-on-surface w-32 uppercase placeholder:text-white/20 ${icon ? 'pl-10' : ''} ${className}`}
            {...props}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-mono text-label-sm tracking-widest uppercase text-on-surface-variant">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary-fixed transition-colors">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#050505] border-b border-white/20 py-4 text-primary font-semibold font-mono input-focus-gradient transition-all placeholder:text-white/10 focus:outline-none ${icon ? 'pl-14' : 'px-4'} ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
