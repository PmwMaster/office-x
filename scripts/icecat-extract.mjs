// Script: extract Icecat products to JSON catalog
// Run: node scripts/icecat-extract.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUTH = 'Basic ' + Buffer.from('pmwmaster:Manga@14').toString('base64');
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'products');
const CATALOG_OUT = join(__dirname, '..', 'src', 'data', 'icecat-catalog.ts');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: AUTH }, timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('timeout', () => { reject(new Error('timeout')); }).on('error', reject);
  });
}

async function main() {
  // 1. Parse index to find product IDs in relevant categories
  const indexXml = readFileSync(join(__dirname, 'icecat-index.xml'), 'utf8');
  const fileMatches = [...indexXml.matchAll(/<file[^>]*Product_ID="(\d+)"[^>]*Model_Name="([^"]*)"[^>]*HighPic="([^"]*)"[^>]*Catid="(\d+)"[^>]*/g)];
  
  const keywords = ['keyboard','mouse','headset','headphone','monitor','microphone','gaming','mechanical','wireless','oled','switch','keycap'];
  const products = [];
  const seen = new Set();
  
  for (const m of fileMatches) {
    const id = m[1], name = m[2], highPic = m[3], catid = m[4];
    if (seen.has(id)) continue;
    const matchesKeyword = keywords.some(k => name.toLowerCase().includes(k));
    if (!matchesKeyword) continue;
    if (highPic.includes('noimage') || !highPic.includes('http')) continue;
    seen.add(id);
    products.push({ id, name, highPic, catid });
  }
  
  console.log(`Found ${products.length} products with images`);
  
  // 2. Download full XML for top products (up to 50)
  const top = products.slice(0, 50);
  const catalog = [];
  let downloaded = 0;
  
  for (const p of top) {
    try {
      const xmlUrl = `https://data.icecat.biz/export/freexml.int/EN/${p.id}.xml`;
      const xml = await fetch(xmlUrl);
      
      // Extract specs
      const descMatch = xml.match(/<ProductDescription[^>]*LongDesc="([^"]*)"/);
      const shortDescMatch = xml.match(/<SummaryDescription[^>]*LongDesc="([^"]*)"/);
      const description = descMatch?.[1] || shortDescMatch?.[1] || '';
      
      // Extract category name
      const catMatch = xml.match(/<Category[^>]*Name="([^"]*)"/);
      const category = catMatch?.[1] || '';
      
      // Extract brand
      const brandMatch = xml.match(/<Supplier[^>]*Name="([^"]*)"/);
      const brand = brandMatch?.[1] || '';
      
      // Extract EAN
      const eanMatch = xml.match(/<EAN_UPC[^>]*Value="(\d+)"/);
      const ean = eanMatch?.[1] || '';
      
      // Extract product images
      const imgMatches = [...xml.matchAll(/<ProductPicture[^>]*Pic="([^"]*)"[^>]*PicWidth="(\d+)"[^>]*PicHeight="(\d+)"/g)];
      const images = imgMatches.map(m => ({ url: m[1], width: parseInt(m[2]), height: parseInt(m[3]) }));
      
      // Download main image
      let localImg = '';
      if (p.highPic && images.length === 0) {
        const imgUrl = p.highPic;
        try {
          const imgData = await fetch(imgUrl.startsWith('http') ? imgUrl : 'https://images.icecat.biz' + imgUrl);
          const ext = imgUrl.split('.').pop().split('?')[0].replace(/[^a-z]/g, '') || 'jpg';
          const filename = `icecat-${p.id}.${ext}`;
          writeFileSync(join(OUT_DIR, filename), Buffer.from(imgData, 'binary'));
          localImg = `/images/products/${filename}`;
          downloaded++;
        } catch {}
      }
      
      catalog.push({
        id: `ic-${p.id}`,
        name: p.name,
        brand,
        category,
        description: description.substring(0, 500),
        specs: { brand, category, ean },
        price: 0,
        image: localImg || p.highPic,
        imageAlt: p.name,
        icecatId: p.id,
      });
      
      console.log(`  ${downloaded}/${catalog.length}: ${p.name} (${brand})`);
    } catch (e) {
      console.log(`  SKIP ${p.name}: ${e.message}`);
    }
  }
  
  // 3. Write catalog
  const ts = `// Auto-generated from Icecat - ${new Date().toISOString()}\n// Run: node scripts/icecat-extract.mjs\n\nexport const ICECAT_PRODUCTS = ${JSON.stringify(catalog, null, 2)};\n`;
  writeFileSync(CATALOG_OUT, ts);
  console.log(`\nDone: ${catalog.length} products, ${downloaded} images downloaded`);
}

main().catch(console.error);
