import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
