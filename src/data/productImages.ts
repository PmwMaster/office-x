// Real product images from verified working CDNs
// Mix of: manufacturer CDN + LoremFlickr (real Flickr photos by keyword)

const flickr = (keyword: string) =>
  `https://loremflickr.com/600/400/${encodeURIComponent(keyword)}?random=1`;

const IMG = {
  // ===== KEYBOARDS =====
  'wooting-80he':              flickr('mechanical-keyboard,gaming'),
  'wooting-60he':              flickr('mechanical-keyboard'),
  'asus-azoth-extreme':        flickr('gaming-keyboard,rgb'),
  'keychron-q1-pro':           flickr('mechanical-keyboard,aluminum'),
  'keychron-v1-max':           flickr('keychron-keyboard'),
  'nuphy-air75-he':            flickr('low-profile-keyboard'),
  'corsair-k70-pro-tkl':       flickr('corsair-gaming-keyboard'),

  // ===== MICE (Logitech verified + flickr) =====
  'logitech-gpx2':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery/gallery-1-black.png',
  'logitech-gpx2-dex':
    'https://resource.logitech.com/w_692,c_lfill,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2-dex/gallery/gallery-1-black.png',
  'razer-dav3-pro':            flickr('razer-gaming-mouse'),
  'razer-viper-v3-pro':        flickr('gaming-mouse,wireless'),
  'lamzu-maya-x':              flickr('gaming-mouse,lightweight'),
  'pulsar-x2v2':               flickr('gaming-mouse,white'),
  'pulsar-x3':                 flickr('ergonomic-gaming-mouse'),
  'wlmouse-beast-x-max':       flickr('magnesium-gaming-mouse'),
  'endgame-op1-8k':            flickr('wired-gaming-mouse'),
  'finalmouse-ulx':            flickr('ultralight-gaming-mouse'),

  // ===== MONITORS (RTINGS verified + flickr) =====
  'asus-pg32ucdm':
    'https://i.rtings.com/assets/products/g33RcXth/asus-rog-swift-oled-pg32ucdm/design-medium.jpg',
  'samsung-odyssey-g8-oled':   flickr('samsung-oled-monitor'),
  'lg-32gs95ue':               flickr('lg-ultragear-monitor'),
  'benq-pd3225u':              flickr('benq-designer-monitor'),

  // ===== AUDIO (Amazon verified + flickr) =====
  'beyerdynamic-dt900px':      flickr('beyerdynamic-headphones'),
  'beyerdynamic-dt700px':      flickr('studio-headphones'),
  'sennheiser-hd660s2':        flickr('sennheiser-headphones'),
  'audio-technica-m50x':       flickr('audio-technica-headphones'),
  'audeze-maxwell':            flickr('planar-magnetic-headphones'),
  'fiio-ka17':                 flickr('dac-amplifier'),
  'shure-sm7b':
    'https://m.media-amazon.com/images/I/61l87ZX08LL._AC_SL1500_.jpg',
  'moondrop-blessing3':        flickr('iem-earphones'),

  // ===== FALLBACK =====
  'default':
    'https://placehold.co/600x400/0D0D0D/CCFF00?text=OFFICE-X&font=JetBrains+Mono',
} as const;

export default IMG;
