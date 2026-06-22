import type { Product } from './products';

const img = (n: string) => `/images/products/${n}.svg`;

export const CATALOG: Product[] = [
  { id: 'h1', name: 'Series One',      price: 2990, specs: 'Planar Magnético 100mm — 5Hz-50kHz — 32Ω',     image: img('placeholder'), imageAlt: 'OFFICE-X Series One.' },
  { id: 'h2', name: 'Series One Pro',   price: 4990, specs: 'Planar Magnético 100mm — Carbono — 25Ω — 380g', image: img('placeholder'), imageAlt: 'OFFICE-X Series One Pro.' },
  { id: 'h3', name: 'Audeze Maxwell',   price: 2490, specs: 'Planar 90mm Wireless — 80h — Dolby Atmos',      image: img('placeholder'), imageAlt: 'Audeze Maxwell.' },
  { id: 'h4', name: 'Sennheiser 660S2', price: 2490, specs: 'Dinâmico 42mm Aberto — 8Hz-51kHz — 150Ω',      image: img('placeholder'), imageAlt: 'Sennheiser HD 660S2.' },
  { id: 'h5', name: 'Beyerdynamic 900', price: 1890, specs: 'STELLAR.45 Aberto — 5Hz-40kHz — 48Ω',          image: img('placeholder'), imageAlt: 'Beyerdynamic DT 900 Pro X.' },
  { id: 'h6', name: 'Focal Clear MG',   price: 8990, specs: 'Dinâmico 40mm Magnésio — 5Hz-28kHz — 55Ω',     image: img('placeholder'), imageAlt: 'Focal Clear MG.' },
  { id: 'h7', name: 'HIFIMAN Sundara',  price: 1990, specs: 'Planar Magnético — 6Hz-75kHz — 37Ω',           image: img('placeholder'), imageAlt: 'HIFIMAN Sundara.' },
  { id: 'h8', name: 'Shure SM7B',       price: 2690, specs: 'Microfone Dinâmico Cardioide — Broadcast — XLR', image: img('placeholder'), imageAlt: 'Shure SM7B.' },
];
