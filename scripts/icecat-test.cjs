const fs = require('fs');
const xml = fs.readFileSync('scripts/icecat-index.xml', 'utf8');

const ids = [...xml.matchAll(/Product_ID="(\d+)"/g)].map(m => m[1]);
const names = [...xml.matchAll(/Model_Name="([^"]*)"/g)].map(m => m[1]);
const pics = [...xml.matchAll(/HighPic="([^"]*)"/g)].map(m => m[1]);
const cats = [...xml.matchAll(/Catid="(\d+)"/g)].map(m => m[1]);

console.log(`Total: ${ids.length} ids, ${names.length} names, ${pics.length} pics, ${cats.length} cats`);

const keywords = ['keyboard','mouse','headset','headphone','monitor','microphone','gaming','mechanical','wireless','oled','switch','keycap'];

const count = Math.min(ids.length, names.length, pics.length, cats.length);
const found = [];
for (let i = 0; i < count; i++) {
  const name = names[i];
  const pic = pics[i];
  if (keywords.some(k => name.toLowerCase().includes(k)) && pic.includes('http') && !pic.includes('noimage')) {
    found.push({ id: ids[i], name, pic, cat: cats[i] });
  }
}

console.log(`\nRelevant with real images: ${found.length}`);
found.slice(0, 25).forEach(p => console.log(`[${p.cat}] ${p.name}`));
