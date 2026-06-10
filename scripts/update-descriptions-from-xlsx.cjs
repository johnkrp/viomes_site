const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.join(__dirname, 'catalog-data', 'source', 'Περιγραφές GUSTO.xlsx');
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'products-grouped.json');
const backupPath = jsonPath + '.bak';

if (!fs.existsSync(excelPath)) {
  console.error('Excel source not found:', excelPath);
  process.exit(1);
}
if (!fs.existsSync(jsonPath)) {
  console.error('Products JSON not found:', jsonPath);
  process.exit(1);
}

const wb = xlsx.readFile(excelPath, {cellDates:true});
// prefer sheet named FINAL or first sheet
const sheetName = wb.SheetNames.find(n => /final/i.test(n)) || wb.SheetNames[0];
const sh = wb.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sh, {header:1, defval:''});

// find header row (first row that contains 'Κωδ' or 'Κωδ.Είδους')
let headerRowIndex = -1;
for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  if (!r) continue;
  for (const c of r) {
    if (typeof c === 'string' && c.toLowerCase().includes('κωδ')) {
      headerRowIndex = i;
      break;
    }
  }
  if (headerRowIndex !== -1) break;
}
if (headerRowIndex === -1) {
  console.error('Header row not found in Excel');
  process.exit(1);
}

const header = rows[headerRowIndex].map(c => String(c || '').trim());
const findHeader = (names) => header.findIndex(h => h && names.some(n => h.toLowerCase().includes(n)));
const codeCol = findHeader(['κωδ','code']);
const analyCol = findHeader(['αναλυτική περιγραφή gr','αναλυτική περιγραφή','αναλυτική']);
const analyEnCol = findHeader(['αναλυτική περιγραφή en','analytical description en','english']);
const techCol = findHeader(['τεχνικά χαρακτηριστικά','technical details','τεχνικά']);
const techEnCol = findHeader(['technical details']);
const careCol = findHeader(['οδηγίες χρήσης','οδηγίες χρήσης & φροντίδας','use & care','οδηγίες']);
const careEnCol = findHeader(['use & care','use & care instructions','care']);

const mapping = {};
for (let i = headerRowIndex + 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r || r.length === 0) continue;
  const code = String((r[codeCol] || '')).trim();
  if (!code) continue;
  const analy = String(r[analyCol] || '').trim();
  const analy_en = String(r[analyEnCol] || '').trim();
  const tech = String(r[techCol] || '').trim();
  const tech_en = String(r[techEnCol] || '').trim();
  const care = String(r[careCol] || '').trim();
  const care_en = String(r[careEnCol] || '').trim();
  mapping[code] = { analy, analy_en, tech, tech_en, care, care_en };
}

const productsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
fs.writeFileSync(backupPath, JSON.stringify(productsJson, null, 2), 'utf8');

let updatedCount = 0;
for (const product of productsJson.products || []) {
  for (const size of product.sizes || []) {
    for (const variant of size.variants || []) {
      const code = String(variant.code || '').trim();
      if (mapping[code]) {
        const entry = mapping[code];
        let changed = false;
        if (entry.analy && entry.analy !== variant.excel_ar) { variant.excel_ar = entry.analy; changed = true; }
        if (entry.analy_en && entry.analy_en !== variant.excel_en) { variant.excel_en = entry.analy_en; changed = true; }
        if (entry.tech && entry.tech !== variant.excel_tech_gr) { variant.excel_tech_gr = entry.tech; changed = true; }
        if (entry.tech_en && entry.tech_en !== variant.excel_tech_en) { variant.excel_tech_en = entry.tech_en; changed = true; }
        if (entry.care && entry.care !== variant.excel_care_gr) { variant.excel_care_gr = entry.care; changed = true; }
        if (entry.care_en && entry.care_en !== variant.excel_care_en) { variant.excel_care_en = entry.care_en; changed = true; }
        if (changed) updatedCount++;
      }
    }
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(productsJson, null, 2), 'utf8');
console.log('Done. Updated entries:', updatedCount);
console.log('Backup saved to', backupPath);
