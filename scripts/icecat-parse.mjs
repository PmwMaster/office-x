const fs = require('fs');
const xml = fs.readFileSync('scripts/icecat-index.xml', 'utf8');

const fileRegex = /<file\s[^>]*?Product_ID="(\d+)"[^>]*?Model_Name="([^"]*)"[^>]*?HighPic="([^"]*)"[^>]*?Catid="(\d+)"/g;
const matches = [...xml.matchAll(fileRegex)];

console.log('Total files:', matches.length);

const keywords = ['keyboard','mouse','headset','headphone','monitor','microphone','gaming','mechanical','wireless','oled','switch','keycap'];
const found = [];

for (const m of matches) {
  const id = m[1], name = m[2], highPic = m[3], catid = m[4];
  if (keywords.some(k => name.toLowerCase().includes(k))) {
    if (!highPic.includes('noimage') && highPic.includes('http')) {
      found.push({ id, name, highPic, catid });
    }
  }
}

console.log('Relevant with images:', found.length);
found.slice(0, 20).forEach(p => console.log(p.id, '| cat', p.catid, '|', p.name));
