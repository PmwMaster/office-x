import { Hero } from '../components/hero/Hero';
import { CoreSection } from '../components/hero/CoreSection';
import { Commercial } from '../components/hero/Commercial';
import { VortexRibbon } from '../components/layout/VortexRibbon';
import { Footer } from '../components/layout/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-black text-text">
      <CoreSection />
      <VortexRibbon />
      <Commercial />
      <VortexRibbon />
      <Hero />
      <Footer />
    </div>
  );
}
