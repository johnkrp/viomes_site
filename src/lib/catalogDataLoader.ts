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
  const response = await fetch(url);
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

  const splitProducts = rules
    .map<GroupedProduct | null>((rule) => {
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
      } as GroupedProduct;
    })
    .filter((entry): entry is GroupedProduct => entry !== null);

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
      .catch((error) => {
        console.warn("Unable to load catalog products", error);
        return [];
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
      ]).catch((error) => {
        console.warn("Unable to load additional images", error);
        return {};
      });
    }

    return additionalImagesPromise;
  };
