// Product images - served locally from /public/images/products/
// 16 real manufacturer images + category placeholders
// Run: node scripts/download-images.mjs to refresh

const local = (name: string) => `/images/products/${name}`;

const IMG: Record<string, string> = {
  // ===== REAL PRODUCT IMAGES (16) =====
  'shure-sm7b':             local('shure-sm7b.jpg'),
  'asus-pg32ucdm':          local('asus-pg32ucdm.jpg'),
  'keychron-q1-pro':        local('keychron-q1-pro.jpg'),
  'audeze-maxwell':         local('audeze-maxwell.png'),
  'razer-viper-v3-pro':     local('razer-viper-v3-pro.webp'),
  'razer-dav3-pro':         local('razer-dav3-pro.jpg'),
  'nuphy-air75-he':         local('nuphy-air75-he.png'),
  'finalmouse-ulx':         local('finalmouse-ulx.png'),
  'beyerdynamic-dt900px':   local('beyerdynamic-dt900px.png'),
  'sennheiser-hd660s2':     local('sennheiser-hd660s2.jpg'),
  'lg-32gs95ue':            local('lg-32gs95ue.jpg'),
  'audio-technica-m50x':    local('audio-technica-m50x.png'),
  'benq-pd3225u':           local('benq-pd3225u.jpg'),
  'moondrop-blessing3':     local('moondrop-blessing3.jpg'),
  'asus-azoth-extreme':     local('asus-azoth-extreme.jpg'),
  'keychron-v1-max':        local('keychron-v1-max.jpg'),
  'beyerdynamic-dt700px':   local('beyerdynamic-dt700px.png'),

  // ===== PLACEHOLDERS (dummyimage.com - upload to Supabase Storage later) =====
  'logitech-gpx2':              `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Logitech Superlight 2')}`,
  'logitech-gpx2-dex':          `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Logitech Superlight 2 Dex')}`,
  'wooting-80he':              `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Wooting 80HE')}`,
  'wooting-60he':              `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Wooting 60HE+')}`,
  'corsair-k70-pro-tkl':       `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Corsair K70 Pro TKL')}`,
  'lamzu-maya-x':              `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Lamzu Maya X')}`,
  'pulsar-x2v2':               `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Pulsar X2V2')}`,
  'pulsar-x3':                 `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Pulsar X3')}`,
  'wlmouse-beast-x-max':       `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('WLmouse Beast X')}`,
  'endgame-op1-8k':            `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Endgame OP1 8K')}`,
  'samsung-odyssey-g8-oled':   `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('Samsung Odyssey G8')}`,
  'fiio-ka17':                 `https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=${encodeURIComponent('FiiO KA17')}`,
  'default':                   'https://dummyimage.com/600x400/0a0a0a/ccff00.png&text=OFFICE-X',
};

export default IMG;
