/**
 * Maps product color codes to color tag image filenames
 * Uses the last two digits of product code to find matching color tag image
 *
 * Single colors: "01", "02", etc.
 * Combination colors: "01_96" (White + Lava), "0258" (Black + Titanium), etc.
 */
export const COLOR_TAG_MAP: Record<string, string> = {
  // Single colors
  "01": "01_White.png",
  "02": "02_Black.png",
  "03": "03_Terracotta.png",
  "04": "04_Beige Ivory.png",
  "05": "05_Red.png",
  "06": "06_Light Grey.png",
  "07": "07_Pink.png",
  "08": "08_Light Blue.png",
  "09": "09_Tile Brown.png",
  "10": "10_Sky Blue.png",
  "11": "11_Cherry.png",
  "12": "12_Chartreuse.png",
  "13": "13_Bronze.png",
  "14": "14_Bordeaux.png",
  "143": "143_Dark Olive.png",
  "145": "145_Graphite.png",
  "15": "15_Cyan.png",
  "16": "16_Purple.png",
  "17": "17_Rose.png",
  "18": "18_Midnight Blue.png",
  "19": "19_Orange.png",
  "200": "200_Inox.png",
  "20": "20_Yellow.png",
  "21": "21_Violet.png",
  "22": "22_Deep Purple.png",
  "23": "23_Green.png",
  "24": "24_Deep Azure.png",
  "25": "25_Anthracite.png",
  "26": "26_Taupe.png",
  "27": "27_Olive Green.png",
  "28": "28_Azure.png",
  "29": "29_Lavender.png",
  "300": "300_Wood.png",
  "30": "30_Greige.png",
  "310": "310_Beton.png",
  "31": "31_Clear White.png",
  "320": "320_Linen.png",
  "32": "32_Light Green.png",
  "330": "330_Planet.png",
  "33": "33_Navy Blue.png",
  "340": "340_Daisy.png",
  "34": "34_Tirquoise.png",
  "350": "350_Camera.jpg",
  "138": "138_Petrol.png",
  "189": "189_Mustard.png",
  "111": "111_Aubergine.png",
  "184": "184_Moss.png",
  "139": "139_Indigo.png",
  "163": "163_Cloud.png",
  "173": "173_Baby blue.png",
  "35": "35_Blue.png",
  "36": "36_Dark Green.png",
  "37": "37_Silver.png",
  "38": "38_Ocean Blue.png",
  "39": "39_Blue Purple.png",
  "40": "40_Dark Brown.png",
  "41": "41_Camel.png",
  "42": "42_Ciel.png",
  "43": "43_Cypress.png",
  "44": "44_Blue Black.png",
  "450": "450_Camera.png",
  "45": "45_Clear Yellow.png",
  "46": "46_Clear Orange.png",
  "47": "47_Clear Green.png",
  "48": "48_Clear Blue.png",
  "49": "49_Clear Violet.png",
  "50": "50_Grey Beige.png",
  "51": "51_Silver Perle.png",
  "52": "52_Blue Marine.png",
  "53": "53_Ecru.png",
  "55": "55_Dark Cypress.png",
  "56": "56_Sand Beige.png",
  "57": "57_Maya Blue.png",
  "58": "58_Titanium Grey.png",
  "59": "59_Amethyst.png",
  "60": "60_Granite.png",
  "62": "62_Aegean Blue.png",
  "63": "63_Gool Grey.png",
  "64": "64_Cinnamon.png",
  "65": "65_Pebble Grey.png",
  "66": "66_Grey.png",
  "67": "67_Maron.png",
  "68": "68_Fuchsia.png",
  "69": "69_Deep Grey.png",
  "70": "70_Sky Pastel.png",
  "71": "71_Lila Pastel.png",
  "72": "72_Mint Pastel.png",
  "73": "73_Pearl Blue.png",
  "74": "74_Grey Pastel.png",
  "75": "75_Veraman.png",
  "76": "76_Dusty Pink.png",
  "77": "77_Ivory.png",
  "78": "78_Cream.png",
  "79": "79_Ash Grey.png",
  "80": "80_Εlephant Grey.png",
  "81": "81_Ochra.png",
  "82": "82_Desert Pink.png",
  "83": "83_Mauve.png",
  "84": "84_Basil.png",
  "87": "87_Sugar White.png",
  "88": "88_Lime.png",
  "89": "89_Mango.png",
  "90": "90_Marble White.png",
  "91": "91_Pilos.png",
  "92": "92_Onyx.png",
  "93": "93_Smoke.png",
  "94": "94_Maoni.png",
  "95": "95_Citrine.png",
  "96": "96_Lava.png",
  "97": "97_Petra.png",
  "98": "98_Agate.png",

  // Combination colors (two-color variants)
  "01_96": "01_96_WIHTE_LAVA.png",
  "01_97": "01_97_WHITE_PETRA.png",
  "0258": "0258_BLACK_TITANIUM_GREY.png",
  "02_05": "02_05_BLACK_RED.png",
  "02_11": "02_11_BLACK_CHERRY.png",
  "02_20": "02_20_BLACK_YELLOW.png",
  "02_35": "02_35_BLACK_BLUE.png",
  "02_36": "02_36_BLACK_DARK_GREEN.png",
  "02_58": "02_58_BLACK_TITANIUM.png",
  "02_62": "02_62_BLACK_AEGEAN_BLUE.png",
  "02_84": "02_84_BLACK_BASIL.png",
  "02_89": "02_89_BLACK_MANGO.png",
  "02_96": "02_96_BLACK_LAVA.png",
  "0502": "0502_RED_BLACK.png",
  "1102": "1102_CHERRY_BLACK.png",
  "1150": "1150_CHERRY_GREY_BEIGE.png",
  "2002": "2002_YELLOW_BLACK.png",
  "3502": "3502_BLUE_BLACK.png",
  "3602": "3602_DARK_GREEN_BLACK.png",
  "50_11": "50_11_BEIGE_CHERRY.png",
  "50_62": "50_62_GREY_BEIGE_AEGEAN_BLUE.png",
  "50_84": "50_84_GREY_BEIGE_BASIL.png",
  "50_89": "50_89_GREY_BEIGE_MANGO.png",
  "5802": "5802_TITANIUM_GREY_BLACK.png",
  "58_02": "58_02_TITANIUM_BLACK.png",
  "6202": "6202_BLUE_AEGEAN_BLACK.png",
  "6250": "6250_BLUE_AEGEAN_GREY_BEIGE.png",
  "8402": "8402_BASIL_BLACK.png",
  "8450": "8450_BASIL_GREY_BEIGE.png",
  "8902": "8902_MANGO_BLACK.png",
  "8950": "8950_MANGO_GREY_BEIGE.png",
  "9601": "9601_LAVA_WHITE.png",
  "9602": "9602_LAVA_BLACK.png",
  "9701": "9701_PETRA_WHITE.png",
  "9730": "9730_PETRA_GREIGE.png",
  "50_119": "50_119_GREY_BEIGE_ORANG.jpg",
  "50_140": "50_140_GREY_BEIGE_BROWN.jpg",
  "30_97": "30_97_GREIGE_PETRA.png",
};

const COLOR_TAGS_DIR = "/images/NEW COLOR TAGS 2023";

/**
 * Extract color code(s) from product code
 * Handles single colors: "360-78" → "78"
 * Handles combination colors: "1373.1-02/11" → "02/11"
 * @example "360-78" → "78"
 * @example "1373.1-02/11" → "02/11"
 * @example "300-143" → "143"
 */
export const extractColorCode = (productCode: string): string | null => {
  // Match color code(s) after hyphen: "02", "02/11", "02_11", etc.
  const match = productCode.match(/-([0-9/_]+)(?:[^\d]|$)/);
  return match?.[1] ?? null;
};

/**
 * Get color tag image URL for a product code
 * Tries combination colors first (02/11 → 02_11), then falls back to single color
 */
export const resolveColorTagImage = (
  productCode: string | undefined | null,
): string | null => {
  if (!productCode) return null;

  const colorCode = extractColorCode(productCode);
  if (!colorCode) return null;

  // Try combinations first (convert slash to underscore)
  const combinationCode = colorCode.replace("/", "_");
  let fileName = COLOR_TAG_MAP[combinationCode];
  if (fileName) return `${COLOR_TAGS_DIR}/${fileName}`;

  // Try as-is (for codes with underscore already)
  fileName = COLOR_TAG_MAP[colorCode];
  if (fileName) return `${COLOR_TAGS_DIR}/${fileName}`;

  // Try individual color codes (02/11 → try 02, then 11)
  const codes = colorCode.split(/[/_]/);
  for (const code of codes) {
    fileName = COLOR_TAG_MAP[code];
    if (fileName) return `${COLOR_TAGS_DIR}/${fileName}`;
  }

  return null;
};
