const USE_TEST_PACKSHOTS = import.meta.env.VITE_USE_TEST_PACKSHOTS === "true";

const TEST_PACKSHOT_DIR = "/images/packshot-test";
const TEST_PACKSHOT_FILES = [
  "1020-73.jpg",
  "1030-73.jpg",
  "1031-73.jpg",
  "1032-73.jpg",
  "1150-50.jpg",
  "140-02.jpg",
  "140-02_1.jpg",
  "185.6-97.jpg",
  "185.6-97_01.jpg",
  "239-03.jpg",
  "285.6-97.jpg",
  "300-58.jpg",
  "301-02.jpg",
  "572.6-96.jpg",
  "592.6-96.jpg",
  "62-66.jpg",
  "62-76.jpg",
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

export const isTestPackshotModeEnabled = () => USE_TEST_PACKSHOTS;

export const resolveTestPackshotByCode = (code: string | undefined | null) => {
  if (!USE_TEST_PACKSHOTS || !code) return null;
  return packshotMap.get(normalizeKey(code)) ?? null;
};

export const resolveTestPackshotFromImageUrl = (
  imageUrl: string | undefined | null,
) => {
  if (!USE_TEST_PACKSHOTS || !imageUrl) return null;

  const rawFileName = imageUrl.split("?")[0].split("/").pop();
  if (!rawFileName) return null;

  return packshotMap.get(normalizeKey(rawFileName)) ?? null;
};
