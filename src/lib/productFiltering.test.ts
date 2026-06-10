import type { GroupedProduct } from "@/lib/catalogTypes";
import { filterProducts } from "@/lib/productFiltering";
import { describe, expect, it } from "vitest";

const buildProduct = (
  overrides: Partial<GroupedProduct> & { id: string; title: string },
): GroupedProduct => ({
  id: overrides.id,
  title: overrides.title,
  category: overrides.category,
  subcategory: overrides.subcategory,
  representative_image: overrides.representative_image || "/img.jpg",
  sizes: overrides.sizes || [
    {
      size_label: "S",
      size_code: "S",
      colors_count: 1,
      variants: [
        {
          code: `${overrides.id}-001`,
          color: "ΜΠΕΖ",
          description: "Variant",
          image_url: "/img.jpg",
        },
      ],
    },
  ],
  sizes_count: overrides.sizes_count ?? (overrides.sizes?.length || 1),
  variants_count:
    overrides.variants_count ??
    (
      overrides.sizes || [
        {
          size_label: "S",
          size_code: "S",
          colors_count: 1,
          variants: [
            {
              code: `${overrides.id}-001`,
              color: "ΜΠΕΖ",
              description: "Variant",
              image_url: "/img.jpg",
            },
          ],
        },
      ]
    ).reduce((sum, size) => sum + size.variants.length, 0),
});

describe("productFiltering", () => {
  const products: GroupedProduct[] = [
    buildProduct({
      id: "kitchen-1",
      title: "Κάδος Κουζίνας",
      category: "Κουζίνα",
      subcategory: "Κάδοι απορριμμάτων",
      variants_count: 3,
      sizes_count: 2,
      sizes: [
        {
          size_label: "S",
          size_code: "S",
          colors_count: 1,
          variants: [
            {
              code: "K-001",
              color: "ΜΠΕΖ",
              description: "Κάδος",
              image_url: "/k1.jpg",
            },
            {
              code: "K-002",
              color: "Γκρι",
              description: "Κάδος",
              image_url: "/k2.jpg",
            },
          ],
        },
        {
          size_label: "M",
          size_code: "M",
          colors_count: 1,
          variants: [
            {
              code: "K-003",
              color: "ΜΠΕΖ",
              description: "Κάδος",
              image_url: "/k3.jpg",
            },
          ],
        },
      ],
    }),
    buildProduct({
      id: "bath-1",
      title: "Λεκάνη Μπάνιου",
      category: "Μπάνιο",
      subcategory: "Λεκάνες",
      variants_count: 1,
      sizes_count: 1,
      sizes: [
        {
          size_label: "L",
          size_code: "L",
          colors_count: 1,
          variants: [
            {
              code: "B-001",
              color: "Λευκό",
              description: "Λεκάνη",
              image_url: "/b1.jpg",
            },
          ],
        },
      ],
    }),
  ];

  it("matches Greek search text independent of accents/case", () => {
    const result = filterProducts({
      products,
      searchTerm: "καδος",
      selectedCategories: [],
      selectedColors: [],
      selectedSubcategories: [],
      sortMode: "relevant",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("kitchen-1");
  });

  it("filters by category, color and subcategory together", () => {
    const result = filterProducts({
      products,
      searchTerm: "",
      selectedCategories: ["Κουζίνα"],
      selectedColors: ["ΜΠΕΖ"],
      selectedSubcategories: ["Κάδοι απορριμμάτων"],
      sortMode: "relevant",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("kitchen-1");
  });

  it("sorts by variants and sizes descending", () => {
    const byVariants = filterProducts({
      products,
      searchTerm: "",
      selectedCategories: [],
      selectedColors: [],
      selectedSubcategories: [],
      sortMode: "variants-desc",
    });

    const bySizes = filterProducts({
      products,
      searchTerm: "",
      selectedCategories: [],
      selectedColors: [],
      selectedSubcategories: [],
      sortMode: "sizes-desc",
    });

    expect(byVariants[0].id).toBe("kitchen-1");
    expect(bySizes[0].id).toBe("kitchen-1");
  });
});
