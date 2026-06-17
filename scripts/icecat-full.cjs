const fs = require('fs');
const https = require('https');

const AUTH = 'Basic ' + Buffer.from('pmwmaster:Manga@14').toString('base64');
const OUT_DIR = 'public/images/products';
const CATALOG_OUT = 'src/data/icecat-catalog.ts';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: AUTH }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location.startsWith('http') ? res.headers.location : 'https://images.icecat.biz' + res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('timeout', () => reject(new Error('timeout'))).on('error', reject);
  });
}

async function main() {
  const xml = fs.readFileSync('scripts/icecat-index.xml', 'utf8');
  const ids = [...xml.matchAll(/Product_ID="(\d+)"/g)].map(m => m[1]);
  const names = [...xml.matchAll(/Model_Name="([^"]*)"/g)].map(m => m[1]);
  const pics = [...xml.matchAll(/HighPic="([^"]*)"/g)].map(m => m[1]);
  const updated = [...xml.matchAll(/Updated="([^"]*)"/g)].map(m => m[1]);

  const keywords = ['keyboard','mouse','headset','headphone','monitor','microphone','gaming','mechanical','wireless','oled'];

  const all = [];
  for (let i = 0; i < Math.min(ids.length, names.length); i++) {
    const name = names[i], pic = pics[i];
    if (keywords.some(k => name.toLowerCase().includes(k)) && pic.includes('http') && !pic.includes('noimage')) {
      all.push({ id: ids[i], name, pic, updated: updated[i] || '' });
    }
  }

  // Deduplicate by name similarity
  const seen = new Set();
  const unique = all.filter(p => {
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`Unique products: ${unique.length}`);

  // Take top 40
  const top = unique.slice(0, 40);
  const catalog = [];
  let downloaded = 0;

  for (const p of top) {
    try {
      // Download image
      const imgUrl = p.pic;
      const imgData = await fetch(imgUrl);
      const ext = imgUrl.split('.').pop().split('?')[0] || 'jpg';
      const filename = `icecat-${p.id}.${ext}`;
      fs.writeFileSync(`${OUT_DIR}/${filename}`, imgData);
      downloaded++;
      
      // Get category from name
      let cat = 'peripherals';
      const n = p.name.toLowerCase();
      if (n.includes('keyboard')) cat = 'keyboards';
      else if (n.includes('mouse')) cat = 'mice';
      else if (n.includes('monitor') || n.includes('display')) cat = 'monitors';
      else if (n.includes('headset') || n.includes('headphone')) cat = 'audio';
      else if (n.includes('microphone')) cat = 'audio';

      catalog.push({
        id: `ic-${p.id}`,
        name: p.name,
        price: 0,
        type: 'sale',
        specs: cat.toUpperCase(),
        image: `/images/products/${filename}`,
        imageAlt: p.name,
        category: cat,
        icecatId: p.id,
      });

      console.log(`${downloaded}/${catalog.length}: ${p.name.substring(0, 60)}`);
    } catch (e) {
      console.log(`  SKIP ${p.name}: ${e.message}`);
    }
  }

  const ts = `// Auto-generated from Icecat - ${new Date().toISOString()}\nexport const ICECAT_PRODUCTS = ${JSON.stringify(catalog, null, 2)};\nexport default ICECAT_PRODUCTS;\n`;
  fs.writeFileSync(CATALOG_OUT, ts);
  console.log(`\nDone: ${catalog.length} products, ${downloaded} images`);
}

main().catch(console.error);
