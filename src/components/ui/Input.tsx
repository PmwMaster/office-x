import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    if (variant === 'search') {
      return (
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            ref={ref}
            className={`w-full bg-surface-container-lowest border border-white/5 rounded-xl pl-10 pr-4 py-3 text-on-surface placeholder:text-white/20 focus:outline-none focus:border-primary-fixed/30 transition-colors ${className}`}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={`w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-on-surface placeholder:text-white/20 focus:outline-none focus:border-primary-fixed/30 transition-colors ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
