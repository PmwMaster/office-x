import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

export function Navbar() {
  const total = useCartStore((s) => s.totalItems());

  const handleCartClick = () => {
    setTimeout(() => {
      document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5">
      <nav className="flex justify-between items-center w-full px-8 py-4 mx-auto max-w-[1440px] h-16">
        <span className="text-xl font-black tracking-tighter text-primary">OFFICE-X</span>
        <button onClick={handleCartClick} className="relative" aria-label="Carrinho">
          <ShoppingCart size={22} className="text-on-surface-variant hover:text-primary transition-colors" />
          {total > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-on-primary-fixed text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
              {total}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
