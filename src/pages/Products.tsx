import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/check-box";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  loadAdditionalImages,
  loadCatalogProducts,
} from "@/lib/catalogDataLoader";
import type { GroupedProduct } from "@/lib/catalogTypes";
import {
  matchesColorSelection,
  resolveSwatchBackground,
} from "@/lib/colorSwatch";
import {
  KITCHEN_SUBCATEGORIES,
  resolveSiteCategories,
  siteCategories,
  type SiteCategory,
} from "@/lib/productCategories";
import {
  resolveTestPackshotByCode,
  resolveTestPackshotFromImageUrl,
} from "@/lib/testPackshotOverrides";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type SortMode = "relevant" | "title-asc" | "variants-desc" | "sizes-desc";

const detectGrayBackground = (img: HTMLImageElement): boolean => {
  if (!img.complete) return false;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let grayCount = 0;
    let whiteCount = 0;
    const sampleSize = Math.min(1000, data.length / 4);

    for (
      let i = 0;
      i < data.length;
      i += Math.floor(data.length / sampleSize / 4) * 4
    ) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 128) continue; // Skip transparent pixels

      const isGray =
        Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;
      const isWhite = r > 240 && g > 240 && b > 240;

      if (isGray && r < 240) grayCount++;
      if (isWhite) whiteCount++;
    }

    return grayCount > whiteCount;
  } catch {
    return false;
  }
};

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
      const colorFromExcelColumnI = normalizeExcelColor(variant.color);
      if (colorFromExcelColumnI) set.add(colorFromExcelColumnI);
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

const isValidImageUrl = (url: string | undefined | null) =>
  Boolean(url && url.trim() && !url.includes("viomes_.jpg"));

const resolveHoverImage = (
  product: GroupedProduct,
  additionalImagesByCode: Record<string, string[]>,
) => {
  const seen = new Set<string>();
  const images: string[] = [];

  product.sizes.forEach((size) => {
    size.variants.forEach((variant) => {
      const additional = additionalImagesByCode[variant.code] || [];
      additional.filter(isValidImageUrl).forEach((url) => {
        const normalized = url.trim();
        if (!normalized || seen.has(normalized)) return;
        seen.add(normalized);
        images.push(normalized);
      });
    });
  });

  return (
    images.find((url) => url !== product.representative_image) ||
    images[1] ||
    null
  );
};

const resolveProductCardImage = (product: GroupedProduct) => {
  const fromRepresentative = resolveTestPackshotFromImageUrl(
    product.representative_image,
  );
  if (fromRepresentative) return fromRepresentative;

  for (const size of product.sizes) {
    for (const variant of size.variants) {
      const fromCode = resolveTestPackshotByCode(variant.code);
      if (fromCode) return fromCode;
    }
  }

  return product.representative_image;
};

const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizeSearchText = (value: string) =>
  normalizeGreek(value)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const isSiteCategory = (value: string): value is SiteCategory =>
  (siteCategories as readonly string[]).includes(value);

const KITCHEN_CATEGORY: SiteCategory = "Κουζίνα";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");
  const subcategoryFromQuery = searchParams.get("subcategory");
  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [additionalImagesByCode, setAdditionalImagesByCode] = useState<
    Record<string, string[]>
  >({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataLoadError, setDataLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevant");
  const [selectedCategories, setSelectedCategories] = useState<SiteCategory[]>(
    categoryFromQuery && isSiteCategory(categoryFromQuery)
      ? [categoryFromQuery]
      : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryFromQuery &&
      KITCHEN_SUBCATEGORIES.includes(
        subcategoryFromQuery as (typeof KITCHEN_SUBCATEGORIES)[number],
      )
      ? [subcategoryFromQuery]
      : [],
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [grayBackgroundImages, setGrayBackgroundImages] = useState<Set<string>>(
    new Set(),
  );

  const hasKitchenSelected = selectedCategories.includes(KITCHEN_CATEGORY);

  useEffect(() => {
    if (!categoryFromQuery) return;
    if (!isSiteCategory(categoryFromQuery)) return;
    setSelectedCategories([categoryFromQuery]);
  }, [categoryFromQuery]);

  useEffect(() => {
    if (!subcategoryFromQuery) return;
    if (
      !KITCHEN_SUBCATEGORIES.includes(
        subcategoryFromQuery as (typeof KITCHEN_SUBCATEGORIES)[number],
      )
    ) {
      return;
    }
    setSelectedSubcategories([subcategoryFromQuery]);
  }, [subcategoryFromQuery]);

  useEffect(() => {
    if (hasKitchenSelected) return;
    if (selectedSubcategories.length === 0) return;
    setSelectedSubcategories([]);
  }, [hasKitchenSelected, selectedSubcategories.length]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsDataLoading(true);
        setDataLoadError(null);

        const [catalogProducts, additionalImages] = await Promise.all([
          loadCatalogProducts(),
          loadAdditionalImages(),
        ]);

        if (!isMounted) return;

        setProducts(catalogProducts);
        setAdditionalImagesByCode(additionalImages);
      } catch (error) {
        if (!isMounted) return;
        setDataLoadError("Αδυναμία φόρτωσης καταλόγου προϊόντων.");
        setProducts([]);
        setAdditionalImagesByCode({});
      } finally {
        if (isMounted) {
          setIsDataLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const colorOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products.flatMap((product) =>
            product.sizes.flatMap((size) =>
              size.variants
                .map((variant) => normalizeExcelColor(variant.color))
                .filter(Boolean),
            ),
          ),
        ),
      ).sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
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
  }, [
    products,
    searchTerm,
    selectedCategories,
    selectedColors,
    selectedSubcategories,
    sortMode,
  ]);

  const toggleValue = <T extends string>(
    value: T,
    selectedValues: T[],
    setter: (value: T[]) => void,
  ) => {
    if (selectedValues.includes(value)) {
      setter(selectedValues.filter((entry) => entry !== value));
      return;
    }
    setter([...selectedValues, value]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSubcategories([]);
    setSearchTerm("");
    setSortMode("relevant");
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-32 md:pt-36 lg:pb-20">
      <section className="container mx-auto px-4 sm:px-6">
        <Breadcrumb className="mb-6 text-sm text-foreground/70">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Αρχική</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Προϊόντα</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Προϊόντα
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-foreground/70 sm:mt-4">
          Μία κάρτα ανά οικογένεια προϊόντος. Επιλέξτε προϊόν για να δείτε όλα
          τα διαθέσιμα μεγέθη και χρώματα.
        </p>
      </section>

      <section className="container mx-auto mt-8 grid grid-cols-1 gap-6 px-4 sm:mt-10 sm:px-6 lg:grid-cols-[15rem_1fr] lg:gap-8 xl:grid-cols-[16rem_1fr] xl:gap-10">
        <aside className="h-fit lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-1 lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">
                  Κατηγορίες
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((prev) => !prev)}
                  className="text-xl leading-none text-foreground/80 hover:text-foreground"
                  aria-label={
                    isCategoriesOpen
                      ? "Απόκρυψη κατηγοριών"
                      : "Εμφάνιση κατηγοριών"
                  }
                >
                  {isCategoriesOpen ? "-" : "+"}
                </button>
              </div>
              <div className="mt-4 border-t border-border/80" />
              <div
                className={cn(
                  "mt-4 space-y-2",
                  isCategoriesOpen ? "block" : "hidden",
                )}
              >
                {siteCategories.map((category) => (
                  <label
                    key={category}
                    htmlFor={`category-${category}`}
                    className="flex items-center gap-2.5 text-sm text-foreground/85 cursor-pointer"
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() =>
                        toggleValue(
                          category,
                          selectedCategories,
                          setSelectedCategories,
                        )
                      }
                      className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasKitchenSelected ? (
              <TextFilterGroup
                title="Υποκατηγορίες κουζίνας"
                options={KITCHEN_SUBCATEGORIES as unknown as string[]}
                selected={selectedSubcategories}
                open={isSubcategoriesOpen}
                onToggleOpen={() => setIsSubcategoriesOpen((prev) => !prev)}
                onToggle={(value) =>
                  toggleValue(
                    value,
                    selectedSubcategories,
                    setSelectedSubcategories,
                  )
                }
              />
            ) : null}

            <ColorFilterGroup
              title="Χρώματα"
              options={colorOptions}
              selected={selectedColors}
              open={isColorsOpen}
              onToggleOpen={() => setIsColorsOpen((prev) => !prev)}
              onToggle={(value) =>
                toggleValue(value, selectedColors, setSelectedColors)
              }
            />

            <div className="pt-1">
              <Button
                variant="outline"
                className="mt-4 w-full rounded-sm border-border bg-transparent"
                onClick={clearFilters}
              >
                Καθαρισμός φίλτρων
              </Button>
            </div>
          </div>
        </aside>

        <main>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_12rem] md:grid-cols-[1fr_14rem]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Αναζήτηση οικογενειών ή κωδικών"
                className="h-11 pl-10 bg-card border-border"
              />
            </div>

            <Select
              value={sortMode}
              onValueChange={(value) => setSortMode(value as SortMode)}
            >
              <SelectTrigger className="h-11 bg-card border-border">
                <SelectValue placeholder="Ταξινόμηση" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Σχετικά</SelectItem>
                <SelectItem value="title-asc">Τίτλος (Α-Ω)</SelectItem>
                <SelectItem value="variants-desc">
                  Περισσότερα χρώματα/κωδικοί
                </SelectItem>
                <SelectItem value="sizes-desc">Περισσότερα μεγέθη</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-5 text-sm text-foreground/70">
            {isDataLoading ? (
              <span>Φόρτωση προϊόντων...</span>
            ) : dataLoadError ? (
              <span className="text-destructive">{dataLoadError}</span>
            ) : (
              <>
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                οικογένειες προϊόντων
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const colors = allColors(product);
              const cardKey = `${product.id}-${product.family_indicator || product.group_root || ""}-${product.title}-${index}`;
              const hoverImage = resolveHoverImage(
                product,
                additionalImagesByCode,
              );
              const cardImage = resolveProductCardImage(product);

              return (
                <Link
                  key={cardKey}
                  to={`/products/${product.id}`}
                  className={cn("group block transition-all duration-300")}
                >
                  <div className="relative aspect-[4/3] overflow-hidden p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:p-1.5 lg:p-2 bg-background">
                    <img
                      src={cardImage}
                      alt={product.title}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        if (detectGrayBackground(img)) {
                          setGrayBackgroundImages(
                            (prev) => new Set([...prev, cardImage]),
                          );
                        }
                      }}
                      className={cn(
                        "absolute inset-0 h-full w-full object-contain transition duration-500",
                        grayBackgroundImages.has(cardImage)
                          ? "mix-blend-luminosity"
                          : "mix-blend-multiply",
                        hoverImage
                          ? "opacity-100 group-hover:scale-[1.03] group-hover:opacity-0"
                          : "opacity-100 group-hover:scale-[1.03]",
                      )}
                      loading="lazy"
                      decoding="async"
                    />
                    {hoverImage ? (
                      <img
                        src={hoverImage}
                        alt={`${product.title} alternate view`}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>

                  <div className="px-0.5 pt-3">
                    <h3 className="min-h-12 text-base font-medium leading-tight text-foreground sm:min-h-14 sm:text-lg">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/65 sm:text-sm">
                      {product.sizes_count} μεγέθη • {colors.length} χρώματα
                    </p>

                    <div className="mt-3 flex min-h-5 items-center gap-1.5">
                      {colors.slice(0, 10).map((color) => (
                        <span
                          key={`${product.id}-${color}`}
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          style={{ background: resolveSwatchBackground(color) }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </section>
    </div>
  );
};

type ColorFilterGroupProps = {
  title: string;
  options: string[];
  selected: string[];
  open: boolean;
  onToggleOpen: () => void;
  onToggle: (value: string) => void;
};

type TextFilterGroupProps = {
  title: string;
  options: string[];
  selected: string[];
  open: boolean;
  onToggleOpen: () => void;
  onToggle: (value: string) => void;
};

const TextFilterGroup = ({
  title,
  options,
  selected,
  open,
  onToggleOpen,
  onToggle,
}: TextFilterGroupProps) => {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <button
          type="button"
          onClick={onToggleOpen}
          className="text-xl leading-none text-foreground/80 hover:text-foreground"
          aria-label={open ? `Απόκρυψη ${title}` : `Εμφάνιση ${title}`}
        >
          {open ? "-" : "+"}
        </button>
      </div>
      <div className="mt-4 border-t border-border/80" />
      <div className={cn("mt-4 space-y-2", open ? "block" : "hidden")}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={`${title}-${option}`}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "flex w-full items-center justify-between rounded-sm border px-3 py-2 text-left text-sm transition",
                isSelected
                  ? "border-foreground bg-foreground/5 text-foreground"
                  : "border-border text-foreground/75 hover:border-foreground/30 hover:text-foreground",
              )}
              aria-pressed={isSelected}
            >
              <span className="truncate">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ColorFilterGroup = ({
  title,
  options,
  selected,
  open,
  onToggleOpen,
  onToggle,
}: ColorFilterGroupProps) => {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <button
          type="button"
          onClick={onToggleOpen}
          className="text-xl leading-none text-foreground/80 hover:text-foreground"
          aria-label={open ? `Απόκρυψη ${title}` : `Εμφάνιση ${title}`}
        >
          {open ? "-" : "+"}
        </button>
      </div>
      <div className="mt-4 border-t border-border/80" />
      <div
        className={cn(
          "relative mt-4 max-h-56 overflow-y-auto pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="grid grid-cols-1 gap-2">
          {options.map((option) => {
            const id = `${title}-${option}`;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggle(option)}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-sm text-left text-sm text-foreground/85 transition",
                  selected.includes(option)
                    ? "text-foreground"
                    : "text-foreground/75 hover:text-foreground",
                )}
                title={option}
                aria-label={option}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full border transition",
                    selected.includes(option)
                      ? "border-foreground ring-2 ring-foreground/30"
                      : "border-black/15 hover:border-foreground/45",
                  )}
                  style={{ background: resolveSwatchBackground(option) }}
                />
                <span className="truncate">{option}</span>
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-background/90 p-1 text-foreground/45 shadow-sm">
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Products;
