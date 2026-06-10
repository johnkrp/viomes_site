const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'graphify-out', 'converted', 'Περιγραφές GUSTO_0bd919ee.md');
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'products-grouped.json');
const backupPath = jsonPath + '.bak';

if (!fs.existsSync(mdPath)) {
  console.error('Markdown source not found:', mdPath);
  process.exit(1);
}
if (!fs.existsSync(jsonPath)) {
  console.error('Products JSON not found:', jsonPath);
  process.exit(1);
}

const md = fs.readFileSync(mdPath, 'utf8');
const lines = md.split(/\r?\n/);

// locate the table header line (first line that starts with "|  |" and contains Κωδ.Είδους)
let headerLineIndex = -1;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('|') && line.includes('Κωδ.Είδους')) {
    headerLineIndex = i;
    break;
  }
}
if (headerLineIndex === -1) {
  console.error('Table header with Κωδ.Είδους not found in md file');
  process.exit(1);
}

const headerCols = lines[headerLineIndex].split('|').map((c) => c.trim());
// helper to find a header by several possible names
const findHeader = (names) => {
  const idx = headerCols.findIndex((c) => {
    if (!c) return false;
    const low = c.toLowerCase();
    return names.some((n) => low.includes(n.toLowerCase()));
  });
  return idx;
};

const codeCol = findHeader(['κωδ', 'code', 'κωδ.είδους', 'κωδ.ειδους']);
const analyCol = findHeader(['αναλυτική περιγραφή gr', 'αναλυτική περιγραφή', 'analytical description', 'αναλυτική']);
const analyEnCol = findHeader(['αναλυτική περιγραφή en', 'αναλυτική περιγραφή eng', 'analytical description en', 'analytical description']);
const techCol = findHeader(['τεχνικά χαρακτηριστικά', 'technical details', 'τεχνικά']);
const techEnCol = findHeader(['technical details']);
const careCol = findHeader(['οδηγίες χρήσης', 'οδηγίες χρήσης & φροντίδας', 'οδηγίες χρήσης & φροντίδας', 'use & care', 'use & care instructions']);
const careEnCol = findHeader(['use & care', 'use & care instructions', 'use & care instructions', 'use & care instructions']);

if (codeCol === -1) {
  console.error('Could not find Κωδ.Είδους column in header');
  process.exit(1);
}
if (analyCol === -1) {
  console.warn('Warning: Αναλυτική Περιγραφή GR column not found; analytic column will be skipped');
}

const tableStart = headerLineIndex + 2; // skip separator line after header

  const mapping = {}; // code -> {analy, analy_en, tech, tech_en, care}
  let i = tableStart;
  while (i < lines.length) {
    let raw = lines[i];
    if (!raw.startsWith('|')) { i++; continue; }
    let cols = raw.split('|').map((c) => c.trim());
    // if a row split produced more columns than the header, merge extras into the last expected column
    const expected = headerCols.length;
    if (cols.length > expected) {
      const lastIdx = expected - 1;
      const merged = cols.slice(lastIdx).join('|');
      cols = cols.slice(0, lastIdx).concat(merged);
    }
    // ensure cols length at least expected
    while (cols.length < expected) cols.push('');
    // choose the column to append continuations to (heuristic: longest initial cell)
    const lengths = cols.map(c => (c || '').length);
    let appendIdx = lengths.indexOf(Math.max(...lengths));
    // if appendIdx is 0 (empty leading), move to first non-empty after codeCol
    if (appendIdx <= 0) {
      appendIdx = cols.findIndex((c, idx) => idx > codeCol && c && c.length > 0);
      if (appendIdx === -1) appendIdx = codeCol; // fallback
    }

    // collect continuation lines until next row starts with '|'
    let j = i + 1;
    for (; j < lines.length; j++) {
      const nxt = lines[j];
      if (nxt.startsWith('|')) break;
      // append this continuation to chosen column
      cols[appendIdx] = (cols[appendIdx] || '') + '\n' + nxt.trim();
    }

    // guard
    if (cols.length <= codeCol) { i = j; continue; }
    const code = cols[codeCol] || '';
    if (!code) { i = j; continue; }
    const analy = analyCol !== -1 ? (cols[analyCol] || '').trim() : '';
    const analy_en = analyEnCol !== -1 ? (cols[analyEnCol] || '').trim() : '';
    const tech = techCol !== -1 ? (cols[techCol] || '').trim() : '';
    const tech_en = techEnCol !== -1 ? (cols[techEnCol] || '').trim() : '';
    const care = careCol !== -1 ? (cols[careCol] || '').trim() : '';
    const care_en = careEnCol !== -1 ? (cols[careEnCol] || '').trim() : '';
    mapping[code] = { analy, analy_en, tech, tech_en, care, care_en };

    i = j;
  }

const productsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
// backup
fs.writeFileSync(backupPath, JSON.stringify(productsJson, null, 2), 'utf8');

let updatedCount = 0;
for (const product of productsJson.products || []) {
  for (const size of product.sizes || []) {
    for (const variant of size.variants || []) {
      const code = variant.code;
      if (mapping[code]) {
        const entry = mapping[code];
        if (entry) {
          let changed = false;
          if (entry.analy && entry.analy !== variant.excel_ar) {
            variant.excel_ar = entry.analy;
            changed = true;
          }
          if (entry.analy_en) {
            if (variant.excel_en !== entry.analy_en) {
              variant.excel_en = entry.analy_en;
              changed = true;
            }
          }
          if (entry.tech) {
            if (variant.excel_tech_gr !== entry.tech) {
              variant.excel_tech_gr = entry.tech;
              changed = true;
            }
          }
          if (entry.tech_en) {
            if (variant.excel_tech_en !== entry.tech_en) {
              variant.excel_tech_en = entry.tech_en;
              changed = true;
            }
          }
          if (entry.care) {
            if (variant.excel_care_gr !== entry.care) {
              variant.excel_care_gr = entry.care;
              changed = true;
            }
          }
          if (entry.care_en) {
            if (variant.excel_care_en !== entry.care_en) {
              variant.excel_care_en = entry.care_en;
              changed = true;
            }
          }
          if (changed) updatedCount++;
        }
      }
    }
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(productsJson, null, 2), 'utf8');
console.log('Done. Updated entries:', updatedCount);
console.log('Backup saved to', backupPath);
