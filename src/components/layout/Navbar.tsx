import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const links = [
  { to: '/', label: 'Visão Geral' },
  { to: '/especificacoes', label: 'Especificações' },
  { to: '/comprar', label: 'Comprar' },
];

export function Navbar() {
  const total = useCartStore((s) => s.totalItems());
  const loc = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 h-14">
        <Link to="/" className="text-[17px] font-semibold tracking-tight text-text select-none">Office‑X</Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[12px] font-mono uppercase tracking-wider transition-colors ${loc.pathname === l.to ? 'text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/comprar" className="relative p-2 -mr-2 rounded-full hover:bg-white/5 transition-colors">
          <ShoppingCart size={18} className="text-text-secondary" />
          {total > 0 && (
            <span className="absolute top-0 right-0 w-[18px] h-[18px] bg-primary text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              {total}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
