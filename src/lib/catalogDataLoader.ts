import type { GroupedProduct } from "@/lib/catalogTypes";
import {
  familyGroupingRules,
  type SizesGroup,
} from "@/lib/familyGroupingRules";

type CatalogProductsResponse = {
  products: GroupedProduct[];
};

type AdditionalImagesResponse = Record<string, string[]>;

let catalogProductsPromise: Promise<GroupedProduct[]> | null = null;
let additionalImagesPromise: Promise<AdditionalImagesResponse> | null = null;

type ProductSplitRule = {
  suffix: string;
  sizeCodes: string[];
  title?: string;
  subcategory?: string;
};

// Convert external family grouping rules to internal format
// This adapts the manual grouping rules to the existing split logic
const buildProductSplitRules = (): Record<string, ProductSplitRule[]> => {
  const rules: Record<string, ProductSplitRule[]> = {};

  for (const [groupRoot, rule] of Object.entries(familyGroupingRules)) {
    if (rule.type === "split" && rule.splits) {
      rules[groupRoot] = rule.splits.map((group: SizesGroup) => ({
        suffix: group.groupName,
        sizeCodes: group.sizeCodes,
        title: group.title,
        subcategory: group.subcategory,
      }));
    }
  }

  return rules;
};

const withBaseUrl = (relativePath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${relativePath.replace(/^\//, "")}`;
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as T;
};

const fetchWithFallbacks = async <T>(paths: string[]): Promise<T> => {
  let lastError: unknown;

  for (const path of paths) {
    try {
      return await fetchJson<T>(path);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch JSON from all fallback paths");
};

const splitGroupedProduct = (product: GroupedProduct): GroupedProduct[] => {
  const productSplitRules = buildProductSplitRules();
  const rules = productSplitRules[product.id];
  if (!rules || rules.length === 0) return [product];

  const sizesByCode = new Map(
    product.sizes.map((size) => [String(size.size_code), size]),
  );

  const splitProducts: GroupedProduct[] = rules
    .map((rule) => {
      const selectedSizes = rule.sizeCodes
        .map((sizeCode) => sizesByCode.get(sizeCode))
        .filter((size): size is GroupedProduct["sizes"][number] =>
          Boolean(size),
        );

      if (selectedSizes.length === 0) return null;

      const representativeImage =
        selectedSizes
          .flatMap((size) => size.variants)
          .map((variant) => variant.image_url)
          .find(Boolean) || product.representative_image;

      const variantsCount = selectedSizes.reduce(
        (sum, size) => sum + size.variants.length,
        0,
      );

      return {
        ...product,
        id: rule.suffix,
        family_indicator: rule.suffix,
        subcategory: rule.subcategory || product.subcategory,
        title: rule.title || product.title,
        representative_image: representativeImage,
        sizes: selectedSizes,
        sizes_count: selectedSizes.length,
        variants_count: variantsCount,
      };
    })
    .filter((entry): entry is GroupedProduct => Boolean(entry));

  if (splitProducts.length === 0) return [product];
  return splitProducts;
};

const normalizeGroupedProducts = (products: GroupedProduct[]) =>
  products.flatMap((product) => splitGroupedProduct(product));

export const loadCatalogProducts = async (): Promise<GroupedProduct[]> => {
  if (!catalogProductsPromise) {
    catalogProductsPromise = fetchWithFallbacks<CatalogProductsResponse>([
      withBaseUrl("data/products-grouped.json"),
      "/data/products-grouped.json",
    ])
      .then((payload) => normalizeGroupedProducts(payload.products ?? []))
      .catch(async () => {
        const module = await import("@/data/products-grouped.json");
        const fallbackProducts =
          (module.default?.products as GroupedProduct[] | undefined) ?? [];
        return normalizeGroupedProducts(fallbackProducts);
      });
  }

  return catalogProductsPromise;
};

export const loadAdditionalImages =
  async (): Promise<AdditionalImagesResponse> => {
    if (!additionalImagesPromise) {
      additionalImagesPromise = fetchWithFallbacks<AdditionalImagesResponse>([
        withBaseUrl("data/additional-images.json"),
        "/data/additional-images.json",
      ]).catch(async () => {
        const module = await import("@/data/additional-images.json");
        return (module.default as AdditionalImagesResponse) ?? {};
      });
    }

    return additionalImagesPromise;
  };
