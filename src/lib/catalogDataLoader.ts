import type { GroupedProduct } from "@/lib/catalogTypes";

type CatalogProductsResponse = {
  products: GroupedProduct[];
};

type AdditionalImagesResponse = Record<string, string[]>;

let catalogProductsPromise: Promise<GroupedProduct[]> | null = null;
let additionalImagesPromise: Promise<AdditionalImagesResponse> | null = null;

const withBaseUrl = (relativePath: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${relativePath.replace(/^\//, "")}`;
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { cache: "force-cache" });
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

export const loadCatalogProducts = async (): Promise<GroupedProduct[]> => {
  if (!catalogProductsPromise) {
    catalogProductsPromise = fetchWithFallbacks<CatalogProductsResponse>([
      withBaseUrl("data/products-grouped.json"),
      "/data/products-grouped.json",
    ])
      .then((payload) => payload.products ?? [])
      .catch(async () => {
        const module = await import("@/data/products-grouped.json");
        return (module.default?.products as GroupedProduct[] | undefined) ?? [];
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
