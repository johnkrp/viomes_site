const fs = require("fs");
const path = require("path");
const dataPath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "additional-images.json",
);
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const names = [
  "viomes_basin_ora_01.jpg",
  "viomes_basin_ora_02.jpg",
  "viomes_basin_ora_03.jpg",
  "viomes_basin_oval.jpg",
  "viomes_basin_round_01.jpg",
  "viomes_basin_round_02.jpg",
  "viomes_basin_round_03.jpg",
  "viomes_basin_round_04.jpg",
  "viomes_basin_square_01.jpg",
  "viomes_basin_square_02.jpg",
  "viomes_basin_square_03.jpg",
];
const res = {};
for (const n of names) {
  res[n] = [];
  for (const [k, arr] of Object.entries(data)) {
    for (const url of arr) {
      if (url.includes(n)) {
        res[n].push(k);
        break;
      }
    }
  }
  if (res[n].length === 0) delete res[n];
}
console.log(JSON.stringify(res, null, 2));
