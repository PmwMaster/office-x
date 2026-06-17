// Product images served locally from /public/images/products/
// 17 real manufacturer images + local SVG placeholders
// Run: node scripts/download-images.mjs to refresh real images

const local = (name: string) => `/images/products/${name}`;

const IMG: Record<string, string> = {
  // ===== REAL PRODUCT IMAGES (17) - downloaded from manufacturer CDNs =====
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

  // ===== UNIFIED PLACEHOLDER (local SVG) =====
  'logitech-gpx2':              local('placeholder.svg'),
  'logitech-gpx2-dex':          local('placeholder.svg'),
  'wooting-80he':              local('placeholder.svg'),
  'wooting-60he':              local('placeholder.svg'),
  'corsair-k70-pro-tkl':       local('placeholder.svg'),
  'lamzu-maya-x':              local('placeholder.svg'),
  'pulsar-x2v2':               local('placeholder.svg'),
  'pulsar-x3':                 local('placeholder.svg'),
  'wlmouse-beast-x-max':       local('placeholder.svg'),
  'endgame-op1-8k':            local('placeholder.svg'),
  'samsung-odyssey-g8-oled':   local('placeholder.svg'),
  'fiio-ka17':                 local('placeholder.svg'),
  'default':                   local('placeholder.svg'),
};

export default IMG;
