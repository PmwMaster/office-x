// Script: download real product images to public/images/products/
// Run: node scripts/download-images.mjs

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images', 'products');

// Map of product key -> CDN URL (verified working, from manufacturer sites)
const IMAGES = {
  'shure-sm7b':             'https://m.media-amazon.com/images/I/61l87ZX08LL._AC_SL1500_.jpg',
  'asus-pg32ucdm':          'https://i.rtings.com/assets/products/g33RcXth/asus-rog-swift-oled-pg32ucdm/design-medium.jpg',
  'keychron-q1-pro':        'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-Q1-Pro-red.jpg',
  'audeze-maxwell':         'https://cdn.shopify.com/s/files/1/3013/1908/files/ADZ_Maxwell2_GalleryPS_noicons_010826.png',
  'razer-viper-v3-pro':     'https://assets2.razerzone.com/images/pnx.assets/24970f67be4ba9644e28720377d91cfb/razer-viper-v3-pro-1200x630.webp',
  'razer-dav3-pro':         'https://assets2.razerzone.com/images/pnx.assets/a0427959a82f1f5d1c27c2463008e5a8/razer-deathadder-v3-og.jpg',
  'nuphy-air75-he':         'https://cdn.shopify.com/s/files/1/0268/7297/1373/files/170_4x_8c42d0a8-d6c2-4c96-9fb1-68ecb1000268.png',
  'finalmouse-ulx':         'https://finalmouse.com/cdn/shop/files/clicks.png',
  'beyerdynamic-dt900px':   'https://api.beyerdynamic.de/media/catalog/product/b/e/beyerdynamic-dt-900-pro-x-perspective_transparent.png',
  'sennheiser-hd660s2':     'https://us.sennheiser-hearing.com/cdn/shop/files/Sennheiser_HD_660_S_2_Open_Back_Audiophile_Headphones_Main_Image.jpg',
  'lg-32gs95ue':            'https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/a20f4e18-225e-45e3-a2d4-8997f04b3fe1/32GS95UE-B_gallery_01_5000x5000',
  'audio-technica-m50x':    'https://www.audio-technica.com/media/catalog/product/cache/c673bc7fec8808a80d23918742b3f339/a/t/ath-m50x_01a.png',
  'benq-pd3225u':           'https://image.benq.com/is/image/benqco/pd3200u-right45-1?$ResponsivePreset$',
  'moondrop-blessing3':     'https://cdn.prod.website-files.com/627128d862c9a44234848dda/6440b2b621093331fce44fc9_B3.jpg',
  'asus-azoth-extreme':     'https://dlcdnwebimgs.asus.com/gain/36C55451-FF60-40AE-A455-21DFC4AD23D5/w1000/h732',
  'keychron-v1-max':        'https://www.keychron.com/cdn/shop/files/V1-Max-Iconic-Features.jpg',
  'beyerdynamic-dt700px':   'https://api.beyerdynamic.de/media/catalog/product/d/t/dt-700-pro-x-beyerdynamic-perspective_transparent_2_1.png',
};

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

let ok = 0, fail = 0;
for (const [key, url] of Object.entries(IMAGES)) {
  try {
    const ext = url.split('?')[0].split('.').pop()?.split('/').pop() || 'jpg';
    const filename = `${key}.${ext.replace(/[^a-z]/g, '')}`;
    const outPath = join(OUT, filename);

    console.log(`Downloading ${key}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    console.log(`  OK -> ${(buf.length / 1024).toFixed(1)}KB -> images/products/${filename}`);
    ok++;
  } catch (e) {
    console.error(`  FAIL ${key}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} OK, ${fail} failed`);
