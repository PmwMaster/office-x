import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { path: '/privacidade', label: 'PRIVACIDADE' },
  { path: '/termos', label: 'TERMOS' },
] as const;

const FOOTER_EXTERNAL = [
  { href: 'https://discord.gg/officex', label: 'DISCORD' },
  { href: 'https://instagram.com/officex', label: 'INSTAGRAM' },
];

export function Footer() {
  return (
    <footer className="w-full py-section-gap bg-surface-container-lowest border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-gutter max-w-[1440px] mx-auto">
        <div className="text-headline-md font-semibold font-bold text-primary mb-8 md:mb-0">
          OFFICE-X
        </div>
        <div className="flex gap-12 mb-8 md:mb-0">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-label-md uppercase text-on-surface-variant hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
          {FOOTER_EXTERNAL.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-md uppercase text-on-surface-variant hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-label-md uppercase text-on-surface-variant text-center md:text-right">
          &copy; 2024 OFFICE-X PERIPHERALS. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}
