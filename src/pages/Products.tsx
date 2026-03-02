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
import additionalImagesData from "@/data/additional-images.json";
import catalogData from "@/data/products-grouped.json";
import {
  resolveSiteCategories,
  siteCategories,
  type SiteCategory,
} from "@/lib/productCategories";
import {
  matchesColorSelection,
  resolveSwatchBackground,
} from "@/lib/colorSwatch";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Variant = {
  code: string;
  description: string;
  color: string;
  image_url: string;
  stock?: number | null;
};

type SizeGroup = {
  size_label: string;
  size_code: string;
  variants: Variant[];
  colors_count: number;
};

type GroupedProduct = {
  id: string;
  family_indicator?: string;
  group_root?: string;
  title: string;
  representative_image: string;
  sizes: SizeGroup[];
  sizes_count: number;
  variants_count: number;
};

type SortMode = "relevant" | "title-asc" | "variants-desc" | "sizes-desc";

const products = (catalogData as { products: GroupedProduct[] }).products;
const additionalImagesByCode = additionalImagesData as Record<string, string[]>;
const tileAtmospheres = [
  "radial-gradient(circle at 18% 18%, hsl(var(--background) / 0.72) 0%, hsl(var(--background) / 0) 46%), linear-gradient(145deg, hsl(var(--muted) / 0.7) 0%, hsl(var(--secondary) / 0.52) 45%, hsl(var(--background) / 0.92) 100%)",
  "radial-gradient(circle at 78% 20%, hsl(var(--accent) / 0.28) 0%, hsl(var(--accent) / 0) 52%), linear-gradient(150deg, hsl(var(--card) / 0.72) 0%, hsl(var(--muted) / 0.6) 44%, hsl(var(--background) / 0.94) 100%)",
  "radial-gradient(circle at 24% 80%, hsl(var(--background) / 0.56) 0%, hsl(var(--background) / 0) 44%), linear-gradient(140deg, hsl(var(--secondary) / 0.55) 0%, hsl(var(--muted) / 0.64) 42%, hsl(var(--card) / 0.88) 100%)",
  "radial-gradient(circle at 82% 74%, hsl(var(--accent) / 0.22) 0%, hsl(var(--accent) / 0) 50%), linear-gradient(138deg, hsl(var(--muted) / 0.58) 0%, hsl(var(--card) / 0.62) 40%, hsl(var(--background) / 0.9) 100%)",
];

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

const resolveHoverImage = (product: GroupedProduct) => {
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

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevant");
  const [selectedCategories, setSelectedCategories] = useState<SiteCategory[]>(
    categoryFromQuery && isSiteCategory(categoryFromQuery)
      ? [categoryFromQuery]
      : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);

  useEffect(() => {
    if (!categoryFromQuery) return;
    if (!isSiteCategory(categoryFromQuery)) return;
    setSelectedCategories([categoryFromQuery]);
  }, [categoryFromQuery]);

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
    [],
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

      return matchesQuery && matchesCategory && matchesColor;
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
  }, [searchTerm, selectedCategories, selectedColors, sortMode]);

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
                <h2 className="text-sm font-medium text-foreground">Κατηγορίες</h2>
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((prev) => !prev)}
                  className="text-xl leading-none text-foreground/80 hover:text-foreground"
                  aria-label={isCategoriesOpen ? "Απόκρυψη κατηγοριών" : "Εμφάνιση κατηγοριών"}
                >
                  {isCategoriesOpen ? "-" : "+"}
                </button>
              </div>
              <div className="mt-4 border-t border-border/80" />
              <div className={cn("mt-4 space-y-2", isCategoriesOpen ? "block" : "hidden")}>
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
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            οικογένειες προϊόντων
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const colors = allColors(product);
              const cardKey = `${product.id}-${product.family_indicator || product.group_root || ""}-${product.title}-${index}`;
              const tileAtmosphere =
                tileAtmospheres[index % tileAtmospheres.length];
              const hoverImage = resolveHoverImage(product);

              return (
                <Link
                  key={cardKey}
                  to={`/products/${product.id}`}
                  className={cn("group block transition-all duration-300")}
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:p-1.5 lg:p-2"
                    style={{ backgroundImage: tileAtmosphere }}
                  >
                    <img
                      src={product.representative_image}
                      alt={product.title}
                      className={cn(
                        "absolute inset-0 h-full w-full object-contain mix-blend-multiply transition duration-500",
                        hoverImage
                          ? "opacity-100 group-hover:scale-[1.03] group-hover:opacity-0"
                          : "opacity-100 group-hover:scale-[1.03]",
                      )}
                      loading="lazy"
                    />
                    {hoverImage ? (
                      <img
                        src={hoverImage}
                        alt={`${product.title} alternate view`}
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                        loading="lazy"
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
