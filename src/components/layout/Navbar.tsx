import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

interface NavLink {
  path: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { path: '/loja', label: 'LOJA' },
  { path: '/servicos', label: 'SERVIÇOS' },
  { path: '/equipamentos', label: 'EQUIPAMENTOS' },
  { path: '/marcas', label: 'MARCAS' },
  { path: '/admin', label: 'ADMIN' },
];

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/30 backdrop-blur-xl border-b border-white/10">
      <nav className="flex justify-between items-center w-full px-margin-desktop py-4 mx-auto max-w-[1440px] h-20">
        <Link
          to="/"
          className="text-headline-lg font-black tracking-tighter text-primary"
        >
          OFFICE-X
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-headline-md font-semibold tracking-tight transition-colors ${
                isActive(link.path)
                  ? 'text-primary-fixed border-b-2 border-primary-fixed pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Search size={24} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
          <Link to="/carrinho" className="relative" aria-label="Carrinho">
            <ShoppingCart size={24} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="text-label-md uppercase text-on-surface-variant hover:text-primary transition-all duration-300 active:scale-95">
            ENTRAR
          </button>
        </div>
      </nav>
    </header>
  );
}
