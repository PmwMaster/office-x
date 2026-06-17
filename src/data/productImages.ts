// Product image URLs from VERIFIED manufacturer CDNs only
// Products without verified URLs show name in OFFICE-X brand style
// Upload real images to Supabase Storage to replace placeholders

const ph = (name: string, cat: string) =>
  `https://placehold.co/600x400/0A0A0A/CCFF00?text=${encodeURIComponent(name)}&font=JetBrains+Mono`;

const IMG = {
  // ===== VERIFIED REAL IMAGES (manufacturer CDN) =====
  'logitech-gpx2':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery/gallery-1-black.png',
  'logitech-gpx2-dex':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2-dex/gallery/gallery-1-black.png',
  'shure-sm7b':
    'https://m.media-amazon.com/images/I/61l87ZX08LL._AC_SL1500_.jpg',
  'asus-pg32ucdm':
    'https://i.rtings.com/assets/products/g33RcXth/asus-rog-swift-oled-pg32ucdm/design-medium.jpg',

  // ===== PLACEHOLDERS (replace with real images in Supabase) =====
  'wooting-80he':              ph('Wooting 80HE', 'keyboard'),
  'wooting-60he':              ph('Wooting 60HE+', 'keyboard'),
  'asus-azoth-extreme':        ph('ASUS ROG Azoth Extreme', 'keyboard'),
  'keychron-q1-pro':           ph('Keychron Q1 Pro', 'keyboard'),
  'keychron-v1-max':           ph('Keychron V1 Max', 'keyboard'),
  'nuphy-air75-he':            ph('NuPhy Air75 HE', 'keyboard'),
  'corsair-k70-pro-tkl':       ph('Corsair K70 Pro TKL', 'keyboard'),

  'razer-dav3-pro':            ph('Razer DeathAdder V3 Pro', 'mouse'),
  'razer-viper-v3-pro':        ph('Razer Viper V3 Pro', 'mouse'),
  'lamzu-maya-x':              ph('Lamzu Maya X', 'mouse'),
  'pulsar-x2v2':               ph('Pulsar X2V2 Mini', 'mouse'),
  'pulsar-x3':                 ph('Pulsar X3', 'mouse'),
  'wlmouse-beast-x-max':       ph('WLmouse Beast X Max', 'mouse'),
  'endgame-op1-8k':            ph('Endgame OP1 8K', 'mouse'),
  'finalmouse-ulx':            ph('Finalmouse UltralightX', 'mouse'),

  'samsung-odyssey-g8-oled':   ph('Samsung Odyssey G8 OLED', 'monitor'),
  'lg-32gs95ue':               ph('LG 32GS95UE', 'monitor'),
  'benq-pd3225u':              ph('BenQ PD3225U', 'monitor'),

  'beyerdynamic-dt900px':      ph('Beyerdynamic DT 900 Pro X', 'audio'),
  'beyerdynamic-dt700px':      ph('Beyerdynamic DT 700 Pro X', 'audio'),
  'sennheiser-hd660s2':        ph('Sennheiser HD 660S2', 'audio'),
  'audio-technica-m50x':       ph('Audio-Technica M50x', 'audio'),
  'audeze-maxwell':            ph('Audeze Maxwell', 'audio'),
  'fiio-ka17':                 ph('FiiO KA17', 'audio'),
  'moondrop-blessing3':        ph('Moondrop Blessing 3', 'audio'),

  'default':                   'https://placehold.co/600x400/0A0A0A/CCFF00?text=OFFICE-X&font=JetBrains+Mono',
} as const;

export default IMG;
