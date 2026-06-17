const fs = require('fs');
const https = require('https');

const AUTH = 'Basic ' + Buffer.from('pmwmaster:Manga@14').toString('base64');
const OUT_DIR = 'public/images/products';
const CATALOG_OUT = 'src/data/icecat-catalog.ts';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: AUTH }, timeout: 20000 }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { if (res.statusCode >= 400) reject(new Error('HTTP ' + res.statusCode)); else resolve(data); });
      res.on('error', reject);
    }).on('timeout', () => reject(new Error('timeout'))).on('error', reject);
  });
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 15000 }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('timeout', () => reject(new Error('timeout'))).on('error', reject);
  });
}

const PRODUCTS = [
  { brand: 'LG', mpn: '27GN650-B', cat: 'monitors' },
  { brand: 'LG', mpn: '34WP550-B', cat: 'monitors' },
  { brand: 'LG', mpn: '32UN880-B', cat: 'monitors' },
  { brand: 'Dell', mpn: 'U2723QE', cat: 'monitors' },
  { brand: 'Dell', mpn: 'AW2524H', cat: 'monitors' },
  { brand: 'Dell', mpn: 'S2721DGF', cat: 'monitors' },
  { brand: 'Samsung', mpn: 'LF24G35TFULXZD', cat: 'monitors' },
  { brand: 'Samsung', mpn: 'LC32G75TQSNXZA', cat: 'monitors' },
  { brand: 'Samsung', mpn: 'LS27B800PXNXZA', cat: 'monitors' },
  { brand: 'ASUS', mpn: '90LM06H1-B011B0', cat: 'monitors' },
  { brand: 'ASUS', mpn: '90LM0810-B011B0', cat: 'monitors' },
  { brand: 'ASUS', mpn: '90LM06Q0-B013B0', cat: 'monitors' },
  { brand: 'BenQ', mpn: '9H.LJELE.Q81', cat: 'monitors' },
  { brand: 'AOC', mpn: '24G2/BK', cat: 'monitors' },
  { brand: 'Gigabyte', mpn: 'M27Q-SA', cat: 'monitors' },
  { brand: 'Logitech', mpn: '920-009292', cat: 'keyboards' },
  { brand: 'Logitech', mpn: '920-012134', cat: 'keyboards' },
  { brand: 'Logitech', mpn: '920-009495', cat: 'keyboards' },
  { brand: 'Razer', mpn: 'RZ03-03390100-R3U1', cat: 'keyboards' },
  { brand: 'Razer', mpn: 'RZ03-04690200-R3U1', cat: 'keyboards' },
  { brand: 'Corsair', mpn: 'CH-9109410-NA', cat: 'keyboards' },
  { brand: 'Corsair', mpn: 'CH-91A4110-NA', cat: 'keyboards' },
  { brand: 'HyperX', mpn: 'HX-KB7RDX-US', cat: 'keyboards' },
  { brand: 'SteelSeries', mpn: '64734', cat: 'keyboards' },
  { brand: 'Keychron', mpn: 'K2-A1', cat: 'keyboards' },
  { brand: 'Redragon', mpn: 'K552-RGB', cat: 'keyboards' },
  { brand: 'ASUS', mpn: '90MP0310-BKUA00', cat: 'keyboards' },
  { brand: 'Logitech', mpn: '910-006557', cat: 'mice' },
  { brand: 'Logitech', mpn: '910-006178', cat: 'mice' },
  { brand: 'Logitech', mpn: '910-006628', cat: 'mice' },
  { brand: 'Razer', mpn: 'RZ01-04630100-R3U1', cat: 'mice' },
  { brand: 'Razer', mpn: 'RZ01-04620100-R3U1', cat: 'mice' },
  { brand: 'Razer', mpn: 'RZ01-04910100-R3U1', cat: 'mice' },
  { brand: 'Corsair', mpn: 'CH-9315411-NA', cat: 'mice' },
  { brand: 'HyperX', mpn: '6N0A7AA', cat: 'mice' },
  { brand: 'SteelSeries', mpn: '62593', cat: 'mice' },
  { brand: 'BenQ', mpn: '9H.N3CBB.A2E', cat: 'mice' },
  { brand: 'Glorious', mpn: 'GLO-MS-OW-MW', cat: 'mice' },
  { brand: 'Redragon', mpn: 'M711', cat: 'mice' },
  { brand: 'HyperX', mpn: 'HHSC2X-BA-RD/G', cat: 'audio' },
  { brand: 'HyperX', mpn: 'HX-HSCAS-BL/WW', cat: 'audio' },
  { brand: 'Logitech', mpn: '981-001262', cat: 'audio' },
  { brand: 'Logitech', mpn: '981-001049', cat: 'audio' },
  { brand: 'Razer', mpn: 'RZ04-04530100-R3U1', cat: 'audio' },
  { brand: 'Razer', mpn: 'RZ04-03750100-R3U1', cat: 'audio' },
  { brand: 'Corsair', mpn: 'CA-9011235-NA', cat: 'audio' },
  { brand: 'SteelSeries', mpn: '61553', cat: 'audio' },
  { brand: 'Sony', mpn: 'WH1000XM5B.CE7', cat: 'audio' },
  { brand: 'Audio-Technica', mpn: 'ATH-M50XBT2', cat: 'audio' },
  { brand: 'Sennheiser', mpn: '508944', cat: 'audio' },
];

async function main() {
  // Remove old icecat images
  fs.readdirSync(OUT_DIR).filter(f => f.startsWith('icecat-')).forEach(f => fs.unlinkSync(`${OUT_DIR}/${f}`));
  if (fs.existsSync(CATALOG_OUT)) fs.unlinkSync(CATALOG_OUT);

  const catalog = [];
  let ok = 0, fail = 0;

  for (const p of PRODUCTS) {
    const url = `https://live.icecat.biz/api/?shopname=pmwmaster&lang=pt&Brand=${encodeURIComponent(p.brand)}&ProductCode=${encodeURIComponent(p.mpn)}`;
    try {
      process.stdout.write(`${p.brand} ${p.mpn}... `);
      const json = await fetch(url);
      const data = JSON.parse(json);
      if (data.msg !== 'OK' || !data.data) { console.log(`SKIP`); fail++; continue; }

      const info = data.data.GeneralInfo || {};
      const img = data.data.Image || {};
      const highPic = img.HighPic || '';
      const title = info.Title || `${p.brand} ${p.mpn}`;

      // Download image
      let localImg = '/images/products/placeholder.svg';
      if (highPic) {
        try {
          const imgData = await downloadImage(highPic);
          const ext = highPic.split('.').pop().split('?')[0] || 'jpg';
          const safeName = p.mpn.replace(/[^a-zA-Z0-9]/g, '-');
          const filename = `icecat-${safeName}.${ext}`;
          fs.writeFileSync(`${OUT_DIR}/${filename}`, imgData);
          localImg = `/images/products/${filename}`;
        } catch { /* keep placeholder */ }
      }

      // Extract specs summary from FeaturesGroups
      const featGroups = data.data.FeaturesGroups || [];
      const specs = [];
      for (const g of featGroups) {
        for (const f of (g.Features || [])) {
          if (f.PresentationValue) specs.push(`${f.Feature.Name}: ${f.PresentationValue}`);
          if (specs.length >= 6) break;
        }
        if (specs.length >= 6) break;
      }
      const specsStr = specs.join(' | ') || p.mpn;

      const id = `ic-${p.brand.toLowerCase()}-${p.mpn.replace(/[^a-zA-Z0-9]/g, '-')}`;
      catalog.push({
        id, name: title, price: 0, type: 'sale',
        specs: specsStr.substring(0, 200),
        image: localImg, imageAlt: title, category: p.cat,
        brand: p.brand, mpn: p.mpn,
      });

      ok++;
      console.log(`OK [${ok}]`);
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 300));
  }

  const ts = `// Icecat catalog - ${new Date().toISOString()}\n// ${ok} products, ${fail} failed\n\nexport const ICECAT_PRODUCTS = ${JSON.stringify(catalog, null, 2)};\nexport default ICECAT_PRODUCTS;\n`;
  fs.writeFileSync(CATALOG_OUT, ts);
  console.log(`\nDone: ${ok} OK, ${fail} failed`);
}

main().catch(console.error);
