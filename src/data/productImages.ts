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

  // ===== BRANDED PLACEHOLDERS (local SVG with product name) =====
  'logitech-gpx2':              local('logitech-gpx2.svg'),
  'logitech-gpx2-dex':          local('logitech-gpx2-dex.svg'),
  'wooting-80he':              local('wooting-80he.svg'),
  'wooting-60he':              local('wooting-60he.svg'),
  'corsair-k70-pro-tkl':       local('corsair-k70-pro-tkl.svg'),
  'lamzu-maya-x':              local('lamzu-maya-x.svg'),
  'pulsar-x2v2':               local('pulsar-x2v2.svg'),
  'pulsar-x3':                 local('pulsar-x3.svg'),
  'wlmouse-beast-x-max':       local('wlmouse-beast-x-max.svg'),
  'endgame-op1-8k':            local('endgame-op1-8k.svg'),
  'samsung-odyssey-g8-oled':   local('samsung-odyssey-g8-oled.svg'),
  'fiio-ka17':                 local('fiio-ka17.svg'),
  'default':                   local('placeholder.svg'),
};

export default IMG;
