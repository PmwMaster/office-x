export const COLORS = {
  background: '#0D0D0D',
  surface: 'rgba(255,255,255,0.03)',
  primary: '#CCFF00',
  'primary-fixed': '#CCFF00',
  'primary-fixed-dim': 'rgba(204,255,0,0.6)',
  'on-primary-fixed': '#0D0D0D',
  secondary: '#9D00FF',
  'secondary-fixed': '#9D00FF',
  'secondary-container': 'rgba(157,0,255,0.15)',
  'on-surface': '#FFFFFF',
  'on-surface-variant': 'rgba(255,255,255,0.6)',
  'surface-container-lowest': 'rgba(255,255,255,0.02)',
  'surface-container-high': 'rgba(255,255,255,0.08)',
  error: '#FF4444',
  'error-container': 'rgba(255,68,68,0.15)',
} as const;

export const SPACING = {
  'margin-desktop': '2rem',
  'margin-mobile': '1rem',
  gutter: '1.5rem',
  'section-gap': '4rem',
} as const;

export const RADIUS = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export const SHADOWS = {
  glass: '0 8px 32px rgba(0,0,0,0.4)',
  glow: '0 0 24px rgba(204,255,0,0.15)',
  elevated: '0 16px 48px rgba(0,0,0,0.6)',
} as const;

export const ANIMATIONS = {
  'fade-in': 'animate-in fade-in duration-500',
  'slide-up': 'animate-in fade-in slide-in-from-bottom-4 duration-500',
  'scale-in': 'animate-in fade-in zoom-in-95 duration-300',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
} as const;

export const TYPOGRAPHY = {
  'display-lg': 'text-5xl font-black tracking-tighter',
  'display-md': 'text-3xl font-black tracking-tight',
  'headline-lg': 'text-2xl font-bold tracking-tight',
  'headline-md': 'text-sm font-semibold tracking-wide',
  'body-lg': 'text-base leading-relaxed',
  'label-md': 'text-xs font-medium tracking-wider',
  'label-sm': 'text-[10px] font-medium tracking-widest',
} as const;

export const HEADPHONE_PARTS = [
  { id: 'earcushions', label: 'Almofadas', color: '#CCFF00', description: 'Espuma viscoelástica com revestimento de veludo' },
  { id: 'earcups', label: 'Conchas', color: '#9D00FF', description: 'Alumínio CNC anodizado com isolamento acústico' },
  { id: 'drivers', label: 'Drivers', color: '#FF6600', description: 'Planar magnético 100mm com ímãs de neodímio' },
  { id: 'headband', label: 'Arco', color: '#00CCFF', description: 'Aço spring com suspensão auto-ajustável' },
  { id: 'microphone', label: 'Microfone', color: '#FF0066', description: 'Condensador cardioide com filtro pop integrado' },
] as const;

export const HERO_SCROLL_STEPS = [
  { progress: 0, part: 'full', label: 'Visão Geral' },
  { progress: 0.25, part: 'earcushions', label: 'Almofadas' },
  { progress: 0.5, part: 'earcups', label: 'Conchas' },
  { progress: 0.75, part: 'drivers', label: 'Drivers' },
  { progress: 1, part: 'headband', label: 'Estrutura' },
] as const;
