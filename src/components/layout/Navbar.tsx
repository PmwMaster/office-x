import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

const links = [
  { to: '/', label: 'Visão Geral' },
  { to: '/especificacoes', label: 'Catálogo' },
  { to: '/comparar', label: 'Comparar' },
];

export function Navbar() {
  const total = useCartStore((s) => s.totalItems());
  const { user, session, signOut } = useAuthStore();
  const isLoggedIn = !!session;
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-border">
      <nav className="flex justify-between items-center px-6 h-28">
        <Link to="/" className="flex items-center select-none">
          <img src="/vortex-logo.png" alt="VORTEX" className="h-24 w-auto" />
        </Link>

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

        <div className="flex items-center gap-2">
          {/* Account */}
          <div ref={menuRef} className="relative">
            {isLoggedIn ? (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <User size={18} className="text-text-secondary" />
              </button>
            ) : (
              <Link to="/login" className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
                <User size={18} className="text-text-secondary" />
              </Link>
            )}

            {menuOpen && isLoggedIn && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/[0.06]">
                  <p className="text-[13px] font-medium text-text truncate">{user.email}</p>
                  <p className="text-[11px] text-text-tertiary font-mono mt-0.5">Conta VORTEX</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-colors text-left"
                  >
                    <LogOut size={14} />
                    Sair da conta
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/comprar" className="relative p-2 -mr-2 rounded-full hover:bg-white/5 transition-colors">
            <ShoppingCart size={18} className="text-text-secondary" />
            {total > 0 && (
              <span className="absolute top-0 right-0 w-[18px] h-[18px] bg-primary text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                {total}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
