import { Hero } from '../components/hero/Hero';
import { CoreSection } from '../components/hero/CoreSection';

export function Home() {
  return (
    <div className="min-h-screen bg-black text-text">
      <Hero />
      <CoreSection />
    </div>
  );
}
