const USE_TEST_PACKSHOTS = import.meta.env.VITE_USE_TEST_PACKSHOTS === "true";

const TEST_PACKSHOT_DIR = "/images/packshot-test";
const TEST_PACKSHOT_FILES = [
  "1020-73.jpg",
  "1032-73.jpg",
  "1032-73_01.jpg",
  "1030-73.jpg",
  "1031-73.jpg",
  "1150-50.jpg",
  "1150-50_01.JPG",
  "140-02.jpg",
  "140-02_01.JPG",
  "140-02_1.jpg",
  "185.6-97.jpg",
  "185.6-97_01.jpg",
  "239-03.jpg",
  "285.6-97.jpg",
  "300-58.jpg",
  "300-58_01.JPG",
  "300-58_02.JPG",
  "300-58_03.JPG",
  "301-02.jpg",
  "572.6-96.jpg",
  "592.6-96.jpg",
  "592.6-96_01.JPG",
  "62-66.jpg",
  "62-76.jpg",
  "62-76_01.jpg",
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
