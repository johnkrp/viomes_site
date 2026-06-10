const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'graphify-out', 'converted', 'Περιγραφές GUSTO_0bd919ee.md');
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'products-grouped.json');

if (!fs.existsSync(mdPath)) {
  console.error('Markdown not found:', mdPath);
  process.exit(1);
}
if (!fs.existsSync(jsonPath)) {
  console.error('JSON not found:', jsonPath);
  process.exit(1);
}

const md = fs.readFileSync(mdPath, 'utf8');
const lines = md.split(/\r?\n/);

let headerLineIndex = -1;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('|') && line.toLowerCase().includes('κωδ')) {
    headerLineIndex = i;
    break;
  }
}
if (headerLineIndex === -1) {
  console.error('Header not found');
  process.exit(1);
}

const headerCols = lines[headerLineIndex].split('|').map(c=>c.trim());
const findHeader = (names) => headerCols.findIndex(c=>c && names.some(n=>c.toLowerCase().includes(n)));
const codeCol = findHeader(['κωδ','code']);
const tableStart = headerLineIndex + 2;

const mappingCodes = [];
console.log('Header line index:', headerLineIndex);
console.log('Table starts at line:', tableStart);
for (let i = tableStart; i < Math.min(lines.length, tableStart + 20); i++){
  const raw = lines[i];
  const line = raw.trim();
  console.log(i+1, 'startsWithPipe?', raw.startsWith('|'), 'trimStartsWithPipe?', line.startsWith('|'));
  // show a short preview
  console.log('  preview:', line.slice(0,200));
}

  for (let i = tableStart; i < lines.length; i++){
    const line = lines[i].trim();
    if (!line.startsWith('|')) continue;
    let cols = line.split('|').map(c=>c.trim());
    const expected = headerCols.length;
    if (cols.length > expected) {
      const lastIdx = expected - 1;
      const merged = cols.slice(lastIdx).join('|');
      cols = cols.slice(0, lastIdx).concat(merged);
    }
    while (cols.length < expected) cols.push('');
    if (cols.length <= codeCol) continue;
    const codeRaw = cols[codeCol] || '';
    const code = codeRaw.trim();
    if (code) mappingCodes.push(code);
}

const productsJson = JSON.parse(fs.readFileSync(jsonPath,'utf8'));
const variantCodes = new Set();
for (const p of productsJson.products || []){
  for (const s of p.sizes||[]) for (const v of s.variants||[]) if (v.code) variantCodes.add(String(v.code).trim());
}

const present = [];
const missing = [];
for (const c of mappingCodes){
  if (variantCodes.has(c)) present.push(c); else missing.push(c);
}

console.log('Mapping rows parsed:', mappingCodes.length);
console.log('Unique variant codes in JSON:', variantCodes.size);
console.log('Mapped codes present in JSON:', present.length);
console.log('Mapped codes missing from JSON:', missing.length);
if (missing.length>0){
  console.log('First 50 missing codes:');
  console.log(missing.slice(0,50).join(', '));
}

// sample a mapping row print
if (mappingCodes.length>0){
  const sample = mappingCodes[0];
  console.log('\nSample parsed code (first):', sample);
}

// show a couple of JSON variant examples
let count=0;
console.log('\nSample JSON variant codes (first 20):');
for (const c of Array.from(variantCodes).slice(0,20)){
  console.log('-', c);
  if (++count>=20) break;
}
