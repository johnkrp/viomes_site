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
import catalogData from "@/data/products-grouped.json";
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
const siteCategories = [
  "Είδη Σπιτιού",
  "Γλάστρες",
  "Επαγγελματικός Εξοπλισμός",
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

const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const resolveSiteCategories = (product: GroupedProduct) => {
  const familyText = product.family_indicator || product.group_root || "";
  const text = normalizeGreek(`${product.title} ${product.id} ${familyText}`);
  const categories = new Set<string>();

  const homeKeywords = [
    "showroom",
    "kiklos",
    "deco",
    "cubo",
    "basic bin",
    "waste container",
    "pedal bin",
    "wc equipment",
    "equipment for clothes",
    "storage box",
    "nova box",
    "cleaning equipment",
    "bucket",
    "wringer",
    "dust pan",
    "kitchen collection",
    "fresco",
    "food container",
    "ora basin",
    "basin",
    "dish drainer",
    "kitchen equipment",
    "household article",
    "garden furniture",
    "καδος",
    "λεκαν",
    "κουβα",
    "κουτι",
    "αποθηκευ",
    "πιατοθηκ",
    "κουζιν",
    "wc",
  ];

  if (homeKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Είδη Σπιτιού");
  }

  const planterKeywords = [
    "γλαστ",
    "πιατο γλαστ",
    "ζαρντιν",
    "κασπω",
    "φυτο",
    "orchid flowerpot",
    "lily flowerpot",
    "terracotta flowerpot",
    "terracotta round",
    "terracotta flowerbowl",
    "terracotta plate",
    "terracotta small jardiniere",
    "terracotta big jardiniere",
    "greenhouse flowerpot",
    "linea flowerpot",
    "linea round",
    "linea square",
    "linea mosaic",
    "linea jardiniere",
    "vita",
    "lotus",
    "iris",
    "innova",
    "cilindro",
    "gea",
    "plant",
    "planter",
    "pot",
    "campana",
    "sydney",
    "rondo",
  ];

  if (planterKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Γλάστρες");
  }

  const professionalKeywords = [
    "ho.re.ca",
    "horeca",
    "βιομηχαν",
    "επαγγελματ",
    "kiklos collection",
    "deco bin",
    "cubo bin",
    "basic bin",
    "waste container",
    "pedal bin",
    "wc equipment",
    "toilet brush",
    "καδος",
    "πενταλ",
    "τουαλετ",
    "stand",
    "κονταρι",
    "παρκετεζ",
  ];

  if (professionalKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Επαγγελματικός Εξοπλισμός");
  }

  if (categories.size === 0) {
    categories.add("Είδη Σπιτιού");
  }

  return Array.from(categories);
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevant");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromQuery && siteCategories.includes(categoryFromQuery)
      ? [categoryFromQuery]
      : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    if (!categoryFromQuery) return;
    if (!siteCategories.includes(categoryFromQuery)) return;
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
    const query = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const codes = allCodes(product);
      const colors = allColors(product);
      const categories = resolveSiteCategories(product);

      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        codes.some((code) => code.toLowerCase().includes(query));

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

  const toggleValue = (
    value: string,
    selectedValues: string[],
    setter: (value: string[]) => void,
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
    <div className="pt-32 pb-20 bg-background min-h-screen">
      <section className="container mx-auto px-6">
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

        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Προϊόντα
        </h1>
        <p className="mt-4 max-w-3xl text-foreground/70 leading-relaxed">
          Μία κάρτα ανά οικογένεια προϊόντος. Επιλέξτε προϊόν για να δείτε όλα
          τα διαθέσιμα μεγέθη και χρώματα.
        </p>
      </section>

      <section className="container mx-auto px-6 mt-14 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8 xl:gap-10">
        <aside className="lg:sticky lg:top-44 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-1 h-fit">
          <div className="bg-transparent rounded-xl p-0 sm:p-0 space-y-3">
            <div className="rounded-sm border border-border/70 bg-background/20">
              <div className="px-4 py-3 text-sm font-medium text-foreground border-b border-border/50">
                Κατηγορίες
              </div>
              <div className="px-4 py-3 space-y-2">
                {siteCategories.map((category) => (
                  <label
                    key={category}
                    htmlFor={`category-${category}`}
                    className="flex items-center gap-2.5 text-sm text-foreground/80 cursor-pointer"
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

            <FilterGroup
              title="Χρώματα"
              options={colorOptions}
              selected={selectedColors}
              onToggle={(value) =>
                toggleValue(value, selectedColors, setSelectedColors)
              }
              renderOption={(option) => (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ background: resolveSwatchBackground(option) }}
                  />
                  <span className="truncate">{option}</span>
                </span>
              )}
            />

            <div className="pt-1">
              <Button
                variant="outline"
                className="w-full rounded-sm border-border"
                onClick={clearFilters}
              >
                Καθαρισμός φίλτρων
              </Button>
            </div>
          </div>
        </aside>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_14rem] gap-3 mb-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product, index) => {
              const colors = allColors(product);
              const cardKey = `${product.id}-${product.family_indicator || product.group_root || ""}-${product.title}-${index}`;

              return (
                <Link
                  key={cardKey}
                  to={`/products/${product.id}`}
                  className={cn("group block transition-all duration-300")}
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-md border border-border bg-background/70 p-4">
                    <img
                      src={product.representative_image}
                      alt={product.title}
                      className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="px-1 pt-4">
                    <h3 className="text-xl leading-tight font-medium text-foreground min-h-14">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/60">
                      {product.sizes_count} μεγέθη • {product.variants_count}{" "}
                      χρώματα
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 min-h-5">
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

type FilterGroupProps = {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  renderOption?: (option: string) => React.ReactNode;
};

const FilterGroup = ({
  title,
  options,
  selected,
  onToggle,
  renderOption,
}: FilterGroupProps) => {
  return (
    <details
      className="rounded-sm border border-border/70 bg-background/20"
      open
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
        {title}
        <ChevronDown className="h-4 w-4 text-foreground/60" />
      </summary>

      <div className="px-4 pb-3 pt-2 max-h-56 overflow-auto space-y-2 border-t border-border/50">
        {options.map((option) => {
          const id = `${title}-${option}`;
          return (
            <label
              key={id}
              htmlFor={id}
              className="flex items-center gap-2.5 text-sm text-foreground/80 cursor-pointer"
            >
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
                className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              {renderOption ? (
                renderOption(option)
              ) : (
                <span className="truncate">{option}</span>
              )}
            </label>
          );
        })}
      </div>
    </details>
  );
};

export default Products;
