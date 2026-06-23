import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

export function Navbar() {
  const total = useCartStore((s) => s.totalItems());

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
      <nav className="flex justify-between items-center max-w-5xl mx-auto px-6 h-14">
        <span className="text-[17px] font-semibold tracking-tight text-text select-none">Office‑X</span>
        <button
          onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
          className="relative p-2 -mr-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <ShoppingCart size={18} className="text-text-secondary" />
          {total > 0 && (
            <span className="absolute top-0 right-0 w-[18px] h-[18px] bg-primary text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              {total}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
