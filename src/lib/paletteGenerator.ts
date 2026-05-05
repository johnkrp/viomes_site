/**
 * Palette Generator Utilities
 * Adapted from color_pallete/code.js
 * Generates harmonious 6-color palettes from a base hex color
 */

export function hexToHsl(hex: string): [number, number, number] {
  const safeHex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(safeHex)) {
    return [0, 0, 0];
  }

  let r = parseInt(safeHex.slice(0, 2), 16) / 255;
  let g = parseInt(safeHex.slice(2, 4), 16) / 255;
  let b = parseInt(safeHex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      default:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(
      (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255,
    );

  const r = f(0);
  const g = f(8);
  const b = f(4);

  return (
    "#" +
    (r < 16 ? "0" : "") +
    r.toString(16) +
    (g < 16 ? "0" : "") +
    g.toString(16) +
    (b < 16 ? "0" : "") +
    b.toString(16)
  );
}

export type HarmonyMode =
  | "analogous"
  | "complementary"
  | "triadic"
  | "split"
  | "tetradic"
  | "mono";

export interface HarmonyDefinition {
  name: string;
  desc: string;
  fn: (hsl: [number, number, number]) => [number, number, number][];
}

export const HARMONIES: Record<HarmonyMode, HarmonyDefinition> = {
  analogous: {
    name: "Analogous",
    desc: "Colors that sit next to each other on the wheel. They share a common hue, creating a calm, unified look.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h + 22, s * 0.9, Math.min(l + 8, 88)],
      [h - 22, s * 0.9, Math.max(l - 6, 12)],
      [h + 12, s * 0.5, Math.min(l + 28, 90)],
      [h + 8, s * 0.3, Math.min(l + 44, 94)],
      [h - 8, s * 0.8, Math.max(l - 28, 8)],
    ],
  },
  complementary: {
    name: "Complementary",
    desc: "Two colors directly across from each other on the wheel. High contrast, vibrant tension.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h + 180, s, l],
      [h + 180, s * 0.7, Math.min(l + 15, 88)],
      [h, s * 0.6, Math.min(l + 30, 90)],
      [h + 180, s * 0.3, Math.min(l + 40, 94)],
      [h, s * 0.8, Math.max(l - 28, 8)],
    ],
  },
  triadic: {
    name: "Triadic",
    desc: "Three colors equally spaced around the wheel (120° apart). Rich and vibrant while staying balanced.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h + 120, s, l],
      [h + 240, s, l],
      [h + 120, s * 0.55, Math.min(l + 20, 88)],
      [h + 240, s * 0.4, Math.min(l + 38, 94)],
      [h, s * 0.7, Math.max(l - 25, 8)],
    ],
  },
  split: {
    name: "Split Complementary",
    desc: "Like complementary, but instead of one opposite color you use the two flanking it.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h + 150, s, l],
      [h + 210, s, l],
      [h + 150, s * 0.5, Math.min(l + 20, 88)],
      [h + 210, s * 0.4, Math.min(l + 38, 94)],
      [h, s * 0.7, Math.max(l - 25, 8)],
    ],
  },
  tetradic: {
    name: "Tetradic",
    desc: "Four colors forming a rectangle on the wheel. Maximum color variety.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h + 90, s, l],
      [h + 180, s, l],
      [h + 270, s, l],
      [h, s * 0.4, Math.min(l + 42, 94)],
      [h + 180, s * 0.6, Math.max(l - 25, 8)],
    ],
  },
  mono: {
    name: "Monochromatic",
    desc: "All colors share the same hue — only lightness and saturation change. Ultra-cohesive and elegant.",
    fn: ([h, s, l]) => [
      [h, s, l],
      [h, s * 0.85, Math.min(l + 18, 88)],
      [h, s * 0.65, Math.min(l + 34, 92)],
      [h, s * 1.1, Math.max(l - 16, 8)],
      [h, s * 0.4, Math.min(l + 50, 95)],
      [h, s * 0.9, Math.max(l - 32, 5)],
    ],
  },
};

export interface GeneratedPalette {
  hexes: string[];
  roles: string[];
}

export function generatePalette(
  baseHex: string,
  harmonyMode: HarmonyMode,
): GeneratedPalette {
  const hsl = hexToHsl(baseHex);
  const harmonyDef = HARMONIES[harmonyMode];
  const hslPalette = harmonyDef.fn(hsl);
  const hexes = hslPalette.map(([h, s, l]) => hslToHex(h, s, l));

  return {
    hexes,
    roles: ["Primary", "Secondary", "Accent", "Neutral", "Light", "Dark"],
  };
}

/**
 * Format HSL array to CSS HSL string
 */
function formatHslVar(hsl: [number, number, number]): string {
  const [h, s, l] = hsl;
  return `${h} ${s}% ${l}%`;
}

/**
 * Convert hex palette to CSS variable assignments
 * Maps the 6-color palette to site tokens
 */
export function paletteToColorTokens(
  palette: GeneratedPalette,
): Record<string, string> {
  const [p0, p1, p2, p3, p4, p5] = palette.hexes;

  // Calculate header/footer specific colors
  const [h0, s0, l0] = hexToHsl(p0); // Primary
  const [h4, s4, l4] = hexToHsl(p4); // Light/background

  // Use primary color for header background, but slightly darker for better contrast
  const headerBg = [h0, s0, Math.max(l0 - 20, 20)] as [number, number, number];
  // Use light background for header text
  const headerText = [h4, s4, Math.min(l4 + 40, 95)] as [
    number,
    number,
    number,
  ];
  // Use a medium tone for hover (between bg and text)
  const headerHover = [h0, s0, Math.min(l0 + 15, 65)] as [
    number,
    number,
    number,
  ];

  return {
    // Primary palette
    "--primary": formatHslVar(hexToHsl(p0)),
    "--secondary": formatHslVar(hexToHsl(p1)),
    "--accent": formatHslVar(hexToHsl(p2)),
    "--foreground": formatHslVar(hexToHsl(p3)),
    "--background": formatHslVar(hexToHsl(p4)),
    "--border": formatHslVar(hexToHsl(p5)),

    // Derived/supporting
    "--card": formatHslVar(hexToHsl(p4)),
    "--popover": formatHslVar(hexToHsl(p4)),
    "--muted": formatHslVar(hexToHsl(p4)),
    "--input": formatHslVar(hexToHsl(p5)),
    "--ring": formatHslVar(hexToHsl(p0)),

    // Charts
    "--chart-1": formatHslVar(hexToHsl(p0)),
    "--chart-2": formatHslVar(hexToHsl(p1)),
    "--chart-3": formatHslVar(hexToHsl(p2)),
    "--chart-4": formatHslVar(hexToHsl(p5)),
    "--chart-5": formatHslVar(hexToHsl(p3)),

    // Header/Footer specific colors (dynamic based on primary palette)
    "--header-bg": formatHslVar(headerBg),
    "--header-text": formatHslVar(headerText),
    "--header-hover": formatHslVar(headerHover),
  };
}
