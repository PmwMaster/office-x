import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AuthLayout({ children, title = 'OFFICE-X' }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="text-display-lg font-black text-primary mb-12">
        {title}
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
