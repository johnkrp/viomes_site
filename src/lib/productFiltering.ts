import type { GroupedProduct } from "@/lib/catalogTypes";
import { matchesColorSelection } from "@/lib/colorSwatch";
import type { SiteCategory } from "@/lib/productCategories";
import { resolveSiteCategories } from "@/lib/productCategories";

export type SortMode =
  | "relevant"
  | "title-asc"
  | "variants-desc"
  | "sizes-desc";

const normalizeExcelColor = (value: string) => {
  const normalized = (value || "").trim();
  if (!normalized) return "";
  if (normalized.toLowerCase() === "nan") return "";
  return normalized;
};

const allColors = (product: GroupedProduct) => {
  const set = new Set<string>();
  product.sizes.forEach((size) => {
    size.variants.forEach((variant) => {
      const color = normalizeExcelColor(variant.color);
      if (color) set.add(color);
    });
  });
  return Array.from(set);
};

const allCodes = (product: GroupedProduct) => {
  const set = new Set<string>();
  product.sizes.forEach((size) => {
    size.variants.forEach((variant) => set.add(variant.code));
  });
  return Array.from(set);
};

export const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const normalizeSearchText = (value: string) =>
  normalizeGreek(value)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

type FilterProductsInput = {
  products: GroupedProduct[];
  searchTerm: string;
  selectedCategories: SiteCategory[];
  selectedColors: string[];
  selectedSubcategories: string[];
  sortMode: SortMode;
};

export const filterProducts = ({
  products,
  searchTerm,
  selectedCategories,
  selectedColors,
  selectedSubcategories,
  sortMode,
}: FilterProductsInput) => {
  const query = normalizeSearchText(searchTerm);

  const filtered = products.filter((product) => {
    const codes = allCodes(product);
    const colors = allColors(product);
    const categories = resolveSiteCategories(product);

    const matchesQuery =
      !query ||
      normalizeSearchText(product.title).includes(query) ||
      normalizeSearchText(product.id).includes(query) ||
      codes.some((code) => normalizeSearchText(code).includes(query));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((selected) => categories.includes(selected));

    const matchesColor =
      selectedColors.length === 0 ||
      colors.some((familyColor) =>
        selectedColors.some((selectedColor) =>
          matchesColorSelection(familyColor, selectedColor),
        ),
      );

    const matchesSubcategory =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategory || "");

    return (
      matchesQuery && matchesCategory && matchesColor && matchesSubcategory
    );
  });

  if (sortMode === "title-asc") {
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortMode === "variants-desc") {
    return [...filtered].sort((a, b) => b.variants_count - a.variants_count);
  }

  if (sortMode === "sizes-desc") {
    return [...filtered].sort((a, b) => b.sizes_count - a.sizes_count);
  }

  return filtered;
};
