const fs = require("fs");
const path = require("path");
const filePath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "additional-images.json",
);
const backupPath = filePath + ".bak";
if (!fs.existsSync(filePath)) {
  console.error("file not found", filePath);
  process.exit(1);
}
fs.copyFileSync(filePath, backupPath);
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
// Mapping: which keys should use which new filenames
const map = {};
const oraKeys = ["360-01", "360-27", "360-58", "360-73", "360-76", "360-78"];
const oraUrls = [
  "https://viomes.gr/images/catalogue_photos/viomes_basin_ora_01.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_ora_02.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_ora_03.jpg",
];
oraKeys.forEach((k) => (map[k] = oraUrls));
const ovalKeys = [
  "114-14",
  "114-33",
  "114-50",
  "114-66",
  "115-14",
  "115-33",
  "115-50",
  "115-66",
];
const ovalUrls = [
  "https://viomes.gr/images/catalogue_photos/viomes_basin_oval.jpg",
];
ovalKeys.forEach((k) => (map[k] = ovalUrls));
const roundKeys = [
  "60-14",
  "60-50",
  "60-66",
  "60-76",
  "60-84",
  "61-14",
  "61-50",
  "61-66",
  "61-76",
  "61-84",
  "62-14",
  "62-50",
  "62-66",
  "62-76",
  "62-84",
  "63-14",
  "63-50",
  "63-66",
  "63-76",
  "63-84",
  "64-14",
  "64-50",
  "64-66",
  "64-76",
  "64-84",
];
const roundUrls = [
  "https://viomes.gr/images/catalogue_photos/viomes_basin_round_01.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_round_02.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_round_03.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_round_04.jpg",
];
roundKeys.forEach((k) => (map[k] = roundUrls));
const squareKeys = [
  "111-14",
  "111-33",
  "111-50",
  "111-66",
  "112-14",
  "112-33",
  "112-50",
  "112-66",
  "113-14",
  "113-33",
  "113-50",
  "113-66",
];
const squareUrls = [
  "https://viomes.gr/images/catalogue_photos/viomes_basin_square_01.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_square_02.jpg",
  "https://viomes.gr/images/catalogue_photos/viomes_basin_square_03.jpg",
];
squareKeys.forEach((k) => (map[k] = squareUrls));
// Apply updates
let changed = 0;
for (const [k, urls] of Object.entries(map)) {
  if (data[k]) {
    const equal =
      Array.isArray(data[k]) &&
      data[k].length === urls.length &&
      data[k].every((v, i) => v === urls[i]);
    if (!equal) {
      data[k] = urls.slice();
      changed++;
    }
  } else {
    // key missing: add it
    data[k] = urls.slice();
    changed++;
  }
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
console.log("Backup saved to", backupPath);
console.log("Updated keys count:", changed);
