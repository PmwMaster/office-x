import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, X } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

interface NavLink {
  path: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { path: '/loja', label: 'HEADPHONES' },
  { path: '/servicos', label: 'SERVIÇOS' },
  { path: '/marcas', label: 'MARCAS' },
  { path: '/admin', label: 'ADMIN' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  const totalItems = useCartStore((s) => s.getTotalItems());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/loja?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

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
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-32 lg:w-48 bg-surface-container-lowest border-b border-white/10 text-on-surface text-label-md px-4 py-2 focus:outline-none focus:border-primary-fixed transition-all placeholder:text-white/20"
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchTerm(''); }}>
                <X size={20} className="text-on-surface-variant hover:text-primary transition-colors" />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} aria-label="Buscar">
              <Search size={24} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            </button>
          )}

          <Link to="/carrinho" className="relative" aria-label="Carrinho">
            <ShoppingCart size={24} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-label-md uppercase text-primary-fixed hover:text-primary transition-all duration-300 active:scale-95"
              >
                <User size={18} />
                <span className="hidden lg:inline truncate max-w-[100px]">
                  {user.name || user.email?.split('@')[0]}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 glass-surface rounded-lg border border-white/5 py-2 min-w-[180px] shadow-lg">
                  <Link
                    to="/meu-painel"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-label-md text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors"
                  >
                    Meu Painel
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-label-md text-on-surface-variant hover:text-error hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-label-md uppercase text-on-surface-variant hover:text-primary transition-all duration-300 active:scale-95"
            >
              ENTRAR
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
