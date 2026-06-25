import { Link } from 'react-router-dom';
import { Film, Headphones } from 'lucide-react';

const footerLinks = {
  produtos: [
    { to: '/produto/vortex-core-pro', label: 'CORE PRO' },
    { to: '/produto/vortex-core-ultra', label: 'CORE ULTRA' },
    { to: '/especificacoes', label: 'Series One' },
  ],
  navegar: [
    { to: '/', label: 'Visão Geral' },
    { to: '/especificacoes', label: 'Catálogo' },
    { to: '/comprar', label: 'Comprar' },
  ],
  suporte: [
    { to: '/especificacoes', label: 'Especificações' },
    { to: '/comprar', label: 'Garantia Vitalícia' },
    { to: '/', label: 'Contato' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 select-none">
              <img src="/vortex-logo.png" alt="VORTEX" className="h-8 w-auto" />
            </Link>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Engenharia acústica de precisão. Drivers planares magnéticos, ANC híbrido e design minimalista para quem exige o impossível do som.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.2em] font-mono">Produtos</p>
            <ul className="space-y-2">
              {footerLinks.produtos.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13px] text-text-secondary hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.2em] font-mono">Navegar</p>
            <ul className="space-y-2">
              {footerLinks.navegar.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13px] text-text-secondary hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.2em] font-mono">Suporte</p>
            <ul className="space-y-2">
              {footerLinks.suporte.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[13px] text-text-secondary hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 pt-3">
              <a href="#" className="text-text-tertiary hover:text-primary transition-colors" aria-label="YouTube">
                <Film size={18} />
              </a>
              <a href="#" className="text-text-tertiary hover:text-primary transition-colors" aria-label="Audio">
                <Headphones size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-tertiary font-mono tracking-widest uppercase">
            VORTEX Audio Labs · 2026
          </p>
          <p className="text-[10px] text-text-tertiary font-mono">
            Garantia Vitalícia · Frete Grátis Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
