const USE_TEST_PACKSHOTS = import.meta.env.VITE_USE_TEST_PACKSHOTS === "true";

const TEST_PACKSHOT_DIR = "/images/packshot-test";
const TEST_PACKSHOT_FILES = [
  "1020-111.jpg",
  "1020-111_01.jpg",
  "1020-138_01.jpg",
  "1020-163.jpg",
  "1020-163_01.jpg",
  "1020-173.jpg",
  "1020-173_01.jpg",
  "1020-184.jpg",
  "1020-184_01.jpg",
  "1020-189_01.jpg",
  "1020-50.jpg",
  "1020-50_01.jpg",
  "1020-73.jpg",
  "1020-76.jpg",
  "1020-76_01.jpg",
  "1020_189.jpg",
  "1030-73.jpg",
  "1031-111.jpg",
  "1031-111_01.jpg",
  "1031-138.jpg",
  "1031-138_01.jpg",
  "1031-163.jpg",
  "1031-163_01.jpg",
  "1031-173.jpg",
  "1031-173_01.jpg",
  "1031-184.jpg",
  "1031-184_01.jpg",
  "1031-189.jpg",
  "1031-189_01.jpg",
  "1031-50.jpg",
  "1031-50_01.jpg",
  "1031-73.jpg",
  "1031-76.jpg",
  "1031-76_01.jpg",
  "1032-111.jpg",
  "1032-111_01.jpg",
  "1032-138.jpg",
  "1032-138_01.jpg",
  "1032-163.jpg",
  "1032-163_01.jpg",
  "1032-173.jpg",
  "1032-173_01.jpg",
  "1032-184.jpg",
  "1032-184_01.jpg",
  "1032-189.jpg",
  "1032-189_01.jpg",
  "1032-50.jpg",
  "1032-50_01.jpg",
  "1032-73.jpg",
  "1032-73_01.jpg",
  "1032-76.jpg",
  "1032-76_01.jpg",
  "1150-50.jpg",
  "1150-50_01.JPG",
  "140-02.jpg",
  "140-02_01.JPG",
  "140-02_02.jpg",
  "140-02_03.jpg",
  "140-02_04.jpg",
  "140-02_05.jpg",
  "140-155.jpg",
  "140-155_01.jpg",
  "140-155_02.jpg",
  "140-50.jpg",
  "140-50_01.jpg",
  "140-50_02.jpg",
  "140-58.jpg",
  "140-58_01.jpg",
  "140-58_02.jpg",
  "185.6-97.jpg",
  "185.6-97_01.jpg",
  "239-03.jpg",
  "239-03_01.jpg",
  "239-03_02.jpg",
  "239-25.jpg",
  "239-25_01.jpg",
  "239-26.jpg",
  "239-26_01.jpg",
  "239-56.jpg",
  "239-56_01.jpg",
  "239-58.jpg",
  "239-58_01.jpg",
  "285.6-97.jpg",
  "300-02.jpg",
  "300-02_01.jpg",
  "300-02_02.jpg",
  "300-05.jpg",
  "300-05_01.jpg",
  "300-05_02.jpg",
  "300-37.jpg",
  "300-37_01.jpg",
  "300-37_02.jpg",
  "300-50.jpg",
  "300-50_01.jpg",
  "300-50_02.jpg",
  "300-58.jpg",
  "300-58_01.JPG",
  "300-58_02.JPG",
  "300-58_03.JPG",
  "300-58_04.jpg",
  "300-58_05.jpg",
  "300-58_06.jpg",
  "300-62.jpg",
  "300-62_01.jpg",
  "300-62_02.jpg",
  "301-02.jpg",
  "572.6-96.jpg",
  "592.6-96.jpg",
  "592.6-96_01.JPG",
  "62-14.jpg",
  "62-14_01.jpg",
  "62-14_02.jpg",
  "62-50.jpg",
  "62-50_01.jpg",
  "62-50_02.jpg",
  "62-66.jpg",
  "62-66_01.jpg",
  "62-66_02.jpg",
  "62-66_03.jpg",
  "62-76.jpg",
  "62-76_01.jpg",
  "62-76_02.jpg",
  "62-76_03.jpg",
  "62-76_04.jpg",
  "62-84.jpg",
  "62-84_01.jpg",
  "62-84_02.jpg",
  "860.2-53.jpg",
  "861.5-94.jpg",
] as const;

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/^viomes[_-]?/, "")
    .replace(/\.jpg$/i, "")
    .replace(/_\d+$/, "")
    .replace(/_/g, ".");

/**
 * Build map from product code to array of image URLs (all variants)
 */
const buildTestPackshotVariantMap = () => {
  const variantMap = new Map<string, string[]>();

  TEST_PACKSHOT_FILES.forEach((fileName) => {
    const baseCode = normalizeKey(fileName);
    const imageUrl = `${TEST_PACKSHOT_DIR}/${fileName}`;

    if (!variantMap.has(baseCode)) {
      variantMap.set(baseCode, []);
    }
    variantMap.get(baseCode)!.push(imageUrl);
  });

  return variantMap;
};

/**
 * Legacy map for backward compatibility (returns first/primary image only)
 */
const buildTestPackshotMap = () => {
  const map = new Map<string, string>();

  TEST_PACKSHOT_FILES.forEach((fileName) => {
    const key = normalizeKey(fileName);
    if (!map.has(key)) {
      map.set(key, `${TEST_PACKSHOT_DIR}/${fileName}`);
    }
  });

  return map;
};

const packshotMap = buildTestPackshotMap();
const variantMap = buildTestPackshotVariantMap();

export const isTestPackshotModeEnabled = () => USE_TEST_PACKSHOTS;

/**
 * Get all variant images for a product code
 */
export const resolveTestPackshotVariants = (
  code: string | undefined | null,
): string[] => {
  if (!USE_TEST_PACKSHOTS || !code) return [];
  return variantMap.get(normalizeKey(code)) ?? [];
};

/**
 * Get primary (first) image for a product code
 */
export const resolveTestPackshotByCode = (code: string | undefined | null) => {
  if (!USE_TEST_PACKSHOTS || !code) return null;
  const variants = variantMap.get(normalizeKey(code));
  return variants?.[0] ?? null;
};

/**
 * Get all variants from image URL
 */
export const resolveTestPackshotVariantsFromImageUrl = (
  imageUrl: string | undefined | null,
): string[] => {
  if (!USE_TEST_PACKSHOTS || !imageUrl) return [];

  const rawFileName = imageUrl.split("?")[0].split("/").pop();
  if (!rawFileName) return [];

  const baseCode = normalizeKey(rawFileName);
  return variantMap.get(baseCode) ?? [];
};

/**
 * Legacy: Get primary image from URL
 */
export const resolveTestPackshotFromImageUrl = (
  imageUrl: string | undefined | null,
) => {
  if (!USE_TEST_PACKSHOTS || !imageUrl) return null;

  const rawFileName = imageUrl.split("?")[0].split("/").pop();
  if (!rawFileName) return null;

  return packshotMap.get(normalizeKey(rawFileName)) ?? null;
};
