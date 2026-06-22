import type { ProductItem } from '../types';

const local = (name: string) => `/images/products/${name}.svg`;

export const HEADSET_PRODUCTS: ProductItem[] = [
  {
    id: 'hs-001', name: 'OFFICE-X Series One', price: 2990.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO 100MM - 5Hz-50kHz - 32Ω - 420g',
    image: local('placeholder'),
    imageAlt: 'OFFICE-X Series One - Fone planar magnético premium preto e roxo.',
    category: 'headsets',
  },
  {
    id: 'hs-002', name: 'OFFICE-X Series One Pro', price: 4990.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO 100MM - 4Hz-65kHz - 25Ω - 380g - CARBONO',
    image: local('placeholder'),
    imageAlt: 'OFFICE-X Series One Pro - Edição fibra de carbono.',
    category: 'headsets',
  },
  {
    id: 'hs-003', name: 'Audeze Maxwell', price: 2490.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO 90MM - WIRELESS - 80H BATERIA - DOLBY ATMOS',
    image: local('placeholder'),
    imageAlt: 'Audeze Maxwell wireless planar magnetic headset.',
    category: 'headsets',
  },
  {
    id: 'hs-004', name: 'Audeze LCD-5', price: 24990.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO 90MM - 5Hz-50kHz - 14Ω - MAGNÉSIO/CARBONO',
    image: local('placeholder'),
    imageAlt: 'Audeze LCD-5 flagship planar magnetic headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-005', name: 'Sennheiser HD 820', price: 12990.00, type: 'sale',
    specs: 'DINÂMICO 56MM - FECHADO - 12Hz-43.8kHz - 300Ω - VIDRO GORILLA',
    image: local('placeholder'),
    imageAlt: 'Sennheiser HD 820 closed-back audiophile headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-006', name: 'Sennheiser HD 660S2', price: 2490.00, type: 'sale',
    specs: 'DINÂMICO 42MM - ABERTO - 8Hz-51kHz - 150Ω - REFERÊNCIA',
    image: local('placeholder'),
    imageAlt: 'Sennheiser HD 660S2 open-back reference headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-007', name: 'Beyerdynamic DT 900 Pro X', price: 1890.00, type: 'sale',
    specs: 'STELLAR.45 45MM - ABERTO - 5Hz-40kHz - 48Ω - STUDIO',
    image: local('placeholder'),
    imageAlt: 'Beyerdynamic DT 900 Pro X studio open-back headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-008', name: 'Beyerdynamic DT 700 Pro X', price: 1690.00, type: 'sale',
    specs: 'STELLAR.45 45MM - FECHADO - 5Hz-40kHz - 48Ω - STUDIO',
    image: local('placeholder'),
    imageAlt: 'Beyerdynamic DT 700 Pro X closed-back studio headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-009', name: 'Focal Utopia 2022', price: 29990.00, type: 'sale',
    specs: 'DINÂMICO 40MM - BERÍLIO PURO - ABERTO - 5Hz-50kHz - 80Ω',
    image: local('placeholder'),
    imageAlt: 'Focal Utopia 2022 flagship beryllium headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-010', name: 'Focal Clear MG', price: 8990.00, type: 'sale',
    specs: 'DINÂMICO 40MM - MAGNÉSIO - ABERTO - 5Hz-28kHz - 55Ω',
    image: local('placeholder'),
    imageAlt: 'Focal Clear MG magnesium driver headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-011', name: 'HIFIMAN Arya Organic', price: 7990.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO - ABERTO - 8Hz-65kHz - 16Ω - WOOD RING',
    image: local('placeholder'),
    imageAlt: 'HIFIMAN Arya Organic planar magnetic headphones.',
    category: 'headsets',
  },
  {
    id: 'hs-012', name: 'HIFIMAN Sundara', price: 1990.00, type: 'sale',
    specs: 'PLANAR MAGNÉTICO - ABERTO - 6Hz-75kHz - 37Ω - 372g',
    image: local('placeholder'),
    imageAlt: 'HIFIMAN Sundara planar magnetic headphones.',
    category: 'headsets',
  },

  // Ear Pads
  {
    id: 'ep-001', name: 'Almofadas Veludo Premium', price: 290.00, type: 'sale',
    specs: 'VELUDO - ESPUMA VISCOELÁSTICA - COMPATÍVEL SERIES ONE',
    image: local('placeholder'),
    imageAlt: 'Almofadas de veludo premium para headset.',
    category: 'earpads',
  },
  {
    id: 'ep-002', name: 'Almofadas Couro Sintético', price: 250.00, type: 'sale',
    specs: 'COURO SINTÉTICO - ESPUMA MEMORY - ISOLAMENTO PASSIVO',
    image: local('placeholder'),
    imageAlt: 'Almofadas de couro sintético para isolamento.',
    category: 'earpads',
  },
  {
    id: 'ep-003', name: 'Almofadas Cooling Gel', price: 350.00, type: 'sale',
    specs: 'TECIDO TRANSPIRÁVEL - GEL TÉRMICO - PARA SESSÕES LONGAS',
    image: local('placeholder'),
    imageAlt: 'Almofadas com gel térmico refrescante.',
    category: 'earpads',
  },

  // Cables
  {
    id: 'cb-001', name: 'Cabo Balanceado 4.4mm', price: 490.00, type: 'sale',
    specs: '4.4MM PENTACONN - OCC COBRE - 1.5M - PARATRANÇADO',
    image: local('placeholder'),
    imageAlt: 'Cabo balanceado 4.4mm de cobre OCC.',
    category: 'cables',
  },
  {
    id: 'cb-002', name: 'Cabo Balanceado XLR', price: 590.00, type: 'sale',
    specs: 'XLR 4-PIN - PRATA BANHADA - 2M - TRANÇADO À MÃO',
    image: local('placeholder'),
    imageAlt: 'Cabo balanceado XLR banhado a prata.',
    category: 'cables',
  },
  {
    id: 'cb-003', name: 'Cabo USB-C para DAC', price: 290.00, type: 'sale',
    specs: 'USB-C - 1.2M - OCC COBRE - BLINDAGEM DUPLA',
    image: local('placeholder'),
    imageAlt: 'Cabo USB-C de cobre OCC para DAC.',
    category: 'cables',
  },

  // Amps / DACs
  {
    id: 'am-001', name: 'OFFICE-X Amp One', price: 3990.00, type: 'sale',
    specs: 'DAC/AMP - ES9039PRO - BALANCEADO - 6.35MM + 4.4MM + XLR',
    image: local('placeholder'),
    imageAlt: 'OFFICE-X Amp One DAC/amplificador premium.',
    category: 'amps',
  },
  {
    id: 'am-002', name: 'FiiO KA17', price: 690.00, type: 'sale',
    specs: 'DAC/AMP USB-C - ES9069Q - BAL 4.4MM - PORTÁTIL',
    image: local('placeholder'),
    imageAlt: 'FiiO KA17 DAC/AMP portátil.',
    category: 'amps',
  },
  {
    id: 'am-003', name: 'iFi Audio Zen DAC V2', price: 1290.00, type: 'sale',
    specs: 'DAC/AMP - BURR-BROWN - MQA - BAL 4.4MM - POWER MATCH',
    image: local('placeholder'),
    imageAlt: 'iFi Audio Zen DAC V2.',
    category: 'amps',
  },

  // Microphones
  {
    id: 'mc-001', name: 'Shure SM7B', price: 2690.00, type: 'sale',
    specs: 'DINÂMICO CARDIOIDE - BROADCAST - XLR - FILTRO POP',
    image: local('placeholder'),
    imageAlt: 'Shure SM7B broadcast microphone.',
    category: 'microphones',
  },
  {
    id: 'mc-002', name: 'Shure MV7', price: 1690.00, type: 'sale',
    specs: 'DINÂMICO CARDIOIDE - USB + XLR - PODCAST - SHUREPLUS MOTIV',
    image: local('placeholder'),
    imageAlt: 'Shure MV7 hybrid USB/XLR microphone.',
    category: 'microphones',
  },

  // Accessories
  {
    id: 'ac-001', name: 'Suporte de Headset OFFICE-X', price: 490.00, type: 'sale',
    specs: 'ALUMÍNIO CNC - BASE DE CARVALHO - BASE ANTIDERRAPANTE',
    image: local('placeholder'),
    imageAlt: 'Suporte de headset em alumínio e carvalho.',
    category: 'accessories',
  },
  {
    id: 'ac-002', name: 'Case de Transporte Rígido', price: 790.00, type: 'sale',
    specs: 'ALUMÍNIO - ESPUMA CUSTOM - FECHO COMBINAÇÃO - À PROVA D\'ÁGUA',
    image: local('placeholder'),
    imageAlt: 'Case rígido de transporte para headset.',
    category: 'accessories',
  },
];

export const HEADSET_CATEGORIES = [
  { id: 'headsets', label: 'HEADPHONES' },
  { id: 'earpads', label: 'ALMOFADAS' },
  { id: 'cables', label: 'CABOS' },
  { id: 'amps', label: 'AMPS/DACS' },
  { id: 'microphones', label: 'MICROFONES' },
  { id: 'accessories', label: 'ACESSÓRIOS' },
] as const;
