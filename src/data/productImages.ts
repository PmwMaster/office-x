// Real product images from VERIFIED manufacturer CDNs
// Sources: Shopify CDN, Logitech CDN, Razer CDN, RTINGS CDN, Amazon CDN
// All URLs verified working Jun 2026

const U = (n: string) =>
  `https://placehold.co/600x400/0A0A0A/CCFF00?text=${encodeURIComponent(n)}&font=JetBrains+Mono`;

const IMG: Record<string, string> = {
  // ===== VERIFIED MANUFACTURER IMAGES =====
  'logitech-gpx2':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery/gallery-1-black.png',
  'logitech-gpx2-dex':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2-dex/gallery/gallery-1-black.png',
  'shure-sm7b':
    'https://m.media-amazon.com/images/I/61l87ZX08LL._AC_SL1500_.jpg',
  'asus-pg32ucdm':
    'https://i.rtings.com/assets/products/g33RcXth/asus-rog-swift-oled-pg32ucdm/design-medium.jpg',
  'keychron-q1-pro':
    'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-Q1-Pro-QMK-VIA-wireless-custom-mechanical-keyboard-knob-75-percent-layout-full-aluminum-white-frame-for-Mac-Windows-Linux-with-RGB-backlight-hot-swappable-K-Pro-switch-red.jpg',
  'audeze-maxwell':
    'https://cdn.shopify.com/s/files/1/3013/1908/files/ADZ_Maxwell2_GalleryPS_noicons_010826.png',
  'razer-viper-v3-pro':
    'https://assets2.razerzone.com/images/pnx.assets/24970f67be4ba9644e28720377d91cfb/razer-viper-v3-pro-1200x630.webp',

  // ===== PLACEHOLDERS (upload real images to Supabase Storage) =====
  'wooting-80he':              U('Wooting 80HE'),
  'wooting-60he':              U('Wooting 60HE+'),
  'asus-azoth-extreme':        U('ASUS ROG Azoth Extreme'),
  'keychron-v1-max':           U('Keychron V1 Max'),
  'nuphy-air75-he':            U('NuPhy Air75 HE'),
  'corsair-k70-pro-tkl':       U('Corsair K70 Pro TKL'),

  'razer-dav3-pro':            U('Razer DeathAdder V3 Pro'),
  'lamzu-maya-x':              U('Lamzu Maya X'),
  'pulsar-x2v2':               U('Pulsar X2V2 Mini'),
  'pulsar-x3':                 U('Pulsar X3'),
  'wlmouse-beast-x-max':       U('WLmouse Beast X Max'),
  'endgame-op1-8k':            U('Endgame Gear OP1 8K'),
  'finalmouse-ulx':            U('Finalmouse UltralightX'),

  'samsung-odyssey-g8-oled':   U('Samsung Odyssey G8 OLED'),
  'lg-32gs95ue':               U('LG 32GS95UE'),
  'benq-pd3225u':              U('BenQ PD3225U'),

  'beyerdynamic-dt900px':      U('Beyerdynamic DT 900 Pro X'),
  'beyerdynamic-dt700px':      U('Beyerdynamic DT 700 Pro X'),
  'sennheiser-hd660s2':        U('Sennheiser HD 660S2'),
  'audio-technica-m50x':       U('Audio-Technica ATH-M50x'),
  'fiio-ka17':                 U('FiiO KA17'),
  'moondrop-blessing3':        U('Moondrop Blessing 3'),

  'default':                   'https://placehold.co/600x400/0A0A0A/CCFF00?text=OFFICE-X&font=JetBrains+Mono',
};

export default IMG;
