const hashColor = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360} 38% 54%)`;
};

const normalizeColorKey = (value: string) =>
  (value || "")
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const colorMap: Record<string, string> = {
  "ΓΚΡΙ ΜΠΕΖ": "#a89b85",
  "ΜΠΛΕ ΑΙΓΑΙΟΥ": "#3c6f9f",
  "ΜΠΛΕ ΜΑΡΙΝ": "#3f5f8a",
  "ΠΡΑΣΙΝΟ ΕΛΙΑΣ": "#6b7345",
  "ΜΩΒ ΣΚΟΥΡΟ": "#6a4a78",
  "ΡΟΖ ΣΚΟΥΡΟ": "#b46478",
  "ΚΑΦΕ ΣΚΟΥΡΟ": "#5e4636",
  "ΚΕΡΑΣΙ": "#b3262d",
  "ΚΟΚΚΙΝΟ": "#b3262d",
  "ΜΑΥΡΟ": "#2f2a28",
  "ΛΕΥΚΟ": "#f1ede3",
  "ΓΚΡΙ": "#7a746d",
  "ΠΡΑΣΙΝΟ": "#67744f",
  "ΜΠΛΕ": "#56708b",
  "ΣΙΕΛ": "#79a8be",
  "ΚΑΦΕ": "#6f5949",
  "ΚΡΕΜ": "#d5c6aa",
  "ΤΙΤΑΝΙΟ": "#8f8f93",
  "ΠΟΡΤΟΚΑΛΙ": "#c7753a",
  "ΚΙΤΡΙΝΟ": "#d4a646",
  "ΡΟΖ": "#c99295",
  "ΜΠΟΡΝΤΩ": "#70333f",
  "ΜΩΒ": "#7e5ca9",
  "ΛΑΒΑ": "#4f5257",
  "ΜΑΡΜΑΡΙ": "#d4d1c7",
  "ΙΝΟΧ": "#9aa0a6",
  WHITE: "#f1ede3",
  BLACK: "#2f2a28",
  GREY: "#7a746d",
  GRAY: "#7a746d",
  GREEN: "#67744f",
  RED: "#b3262d",
  BLUE: "#56708b",
  BEIGE: "#baa88e",
  BROWN: "#6f5949",
  CREAM: "#e5d9c2",
  TITANIO: "#8f8f93",
  KPEM: "#d5c6aa",
  MAYPO: "#2f2a28",
  KOKKINO: "#b3262d",
  MAPMAPI: "#d4d1c7",
  MABI: "#3f5f8a",
  KPOKI: "#d4a646",
  SMOKE: "#8b8d8f",
  CITRINE: "#c9b458",
  TRANSPARENT: "#e9e6df",
  "ΔΙΑΦΑΝΟ": "#e9e6df",
};

const orderedColorKeys = Object.keys(colorMap).sort((a, b) => b.length - a.length);

const resolveSingleColor = (raw: string) => {
  const normalized = normalizeColorKey(raw);
  const match = orderedColorKeys.find((key) => normalized.includes(key));
  return match ? colorMap[match] : hashColor(raw);
};

const isNoiseToken = (token: string) => {
  const normalized = normalizeColorKey(token);
  return (
    normalized === "" ||
    normalized === "MIX" ||
    normalized === "CUSTOM" ||
    normalized === "GR" ||
    normalized === "EN" ||
    normalized === "GR/EN"
  );
};

const splitMixedColorTokens = (raw: string) =>
  (raw || "")
    .split("/")
    .map((token) => token.trim())
    .filter((token) => !isNoiseToken(token));

export const matchesColorSelection = (variantColor: string, selectedColor: string) => {
  const selectedNorm = normalizeColorKey(selectedColor);
  if (!selectedNorm) return false;

  const variantNorm = normalizeColorKey(variantColor);
  if (variantNorm === selectedNorm) return true;

  const variantTokens = splitMixedColorTokens(variantColor).map(normalizeColorKey);
  const selectedTokens = splitMixedColorTokens(selectedColor).map(normalizeColorKey);

  if (variantTokens.includes(selectedNorm)) return true;
  if (selectedTokens.length > 0 && selectedTokens.every((token) => variantTokens.includes(token))) {
    return true;
  }

  return false;
};

export const resolveColor = (raw: string) => resolveSingleColor(raw);

export const resolveSwatchBackground = (raw: string) => {
  const tokens = splitMixedColorTokens(raw);
  if (tokens.length <= 1) {
    return resolveSingleColor(raw);
  }

  const colors = tokens.map((token) => resolveSingleColor(token));
  if (colors.length === 2) {
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 50%, ${colors[1]} 50%, ${colors[1]} 100%)`;
  }

  return `linear-gradient(135deg, ${colors.join(", ")})`;
};
