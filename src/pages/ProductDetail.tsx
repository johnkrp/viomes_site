import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import additionalImagesData from "@/data/additional-images.json";
import catalogData from "@/data/products-grouped.json";
import { resolveSwatchBackground } from "@/lib/colorSwatch";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Expand, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Variant = {
  code: string;
  description: string;
  color: string;
  image_url: string;
  pack?: string;
  excel_ar?: string;
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

const products = (catalogData as { products: GroupedProduct[] }).products;
const additionalImagesByCode = additionalImagesData as Record<string, string[]>;
const isValidImageUrl = (url: string | undefined | null) =>
  Boolean(url && url.trim() && !url.includes("viomes_.jpg"));

const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const resolvePrimaryCategory = (product: GroupedProduct) => {
  const familyText = product.family_indicator || product.group_root || "";
  const text = normalizeGreek(`${product.title} ${product.id} ${familyText}`);

  const planterKeywords = [
    "γλαστ",
    "πιατο γλαστ",
    "ζαρντιν",
    "κασπω",
    "φυτο",
    "flowerpot",
    "planter",
    "pot",
    "vita",
    "lotus",
    "iris",
    "innova",
    "cilindro",
    "gea",
    "campana",
    "sydney",
    "rondo",
  ];

  if (planterKeywords.some((keyword) => text.includes(keyword))) {
    return "Γλάστρες";
  }

  const professionalKeywords = [
    "ho.re.ca",
    "horeca",
    "βιομηχαν",
    "επαγγελματ",
    "pedal bin",
    "waste container",
    "toilet brush",
    "πενταλ",
    "τουαλετ",
  ];

  if (professionalKeywords.some((keyword) => text.includes(keyword))) {
    return "Επαγγελματικός Εξοπλισμός";
  }

  return "Είδη Σπιτιού";
};

const parseSpecsFromText = (text: string) => {
  const normalized = (text || "").toLowerCase();
  const litersMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(?:lt|l)\b/i);
  const boxDimensionsMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)(?:\s*h)?/i,
  );
  const dimensionsMatch =
    normalized.match(/d\s*([0-9]+(?:[.,][0-9]+)?)\s*x\s*([0-9]+(?:[.,][0-9]+)?)\s*h?/i) ??
    normalized.match(/ø\s*([0-9]+(?:[.,][0-9]+)?)\s*x\s*h?\s*([0-9]+(?:[.,][0-9]+)?)/i);

  const liters = litersMatch ? litersMatch[1].replace(",", ".") : null;
  const explicitDiameter = dimensionsMatch ? dimensionsMatch[1].replace(",", ".") : null;
  const explicitHeight = dimensionsMatch ? dimensionsMatch[2].replace(",", ".") : null;

  const boxWidth = boxDimensionsMatch ? boxDimensionsMatch[1].replace(",", ".") : null;
  const boxDepth = boxDimensionsMatch ? boxDimensionsMatch[2].replace(",", ".") : null;
  const boxHeight = boxDimensionsMatch ? boxDimensionsMatch[3].replace(",", ".") : null;

  // Some records encode round products as 8x16x16h; normalize those to Ø8 x H16.
  const looksLikeRoundDuplicate = !explicitDiameter && boxWidth && boxDepth && boxHeight && boxDepth === boxHeight;

  return {
    liters,
    width: looksLikeRoundDuplicate ? null : boxWidth,
    depth: looksLikeRoundDuplicate ? null : boxDepth,
    boxHeight: looksLikeRoundDuplicate ? null : boxHeight,
    diameter: explicitDiameter || (looksLikeRoundDuplicate ? boxWidth : null),
    height: explicitHeight || (looksLikeRoundDuplicate ? boxDepth : null),
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => products.find((entry) => entry.id === id), [id]);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-semibold">Το προϊόν δεν βρέθηκε</h1>
            <p className="mt-2 text-muted-foreground">
              Η επιλεγμένη οικογένεια προϊόντων δεν υπάρχει στον κατάλογο.
            </p>
            <Link to="/products" className="mt-6 inline-block">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Επιστροφή στα προϊόντα
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const safeSizeIndex = Math.min(selectedSizeIndex, Math.max(product.sizes.length - 1, 0));
  const selectedSize = product.sizes[safeSizeIndex];

  const safeColorIndex = Math.min(selectedColorIndex, Math.max((selectedSize?.variants?.length || 1) - 1, 0));
  const selectedVariant = selectedSize?.variants?.[safeColorIndex] || selectedSize?.variants?.[0];
  const packshotImage = selectedVariant?.image_url || product.representative_image;
  const primaryCategory = useMemo(() => resolvePrimaryCategory(product), [product]);

  const additionalImages = useMemo(() => {
    const selectedCodeImages = selectedVariant?.code ? additionalImagesByCode[selectedVariant.code] || [] : [];
    const validSelected = selectedCodeImages.filter(isValidImageUrl);
    if (validSelected.length > 0) return validSelected;

    const familyImages = new Set<string>();
    product.sizes.forEach((size) => {
      size.variants.forEach((variant) => {
        (additionalImagesByCode[variant.code] || []).filter(isValidImageUrl).forEach((url) => familyImages.add(url));
      });
    });
    return Array.from(familyImages);
  }, [product.sizes, selectedVariant?.code]);

  const sizeSpecs = useMemo(
    () =>
      product.sizes.map((size) => {
        const bestVariantForSpecs =
          size.variants.find((variant) => {
            const specs = parseSpecsFromText(variant.description || "");
            return specs.liters || specs.diameter || specs.height;
          }) || size.variants[0];

        return {
          specs: parseSpecsFromText(bestVariantForSpecs?.description || ""),
        };
      }),
    [product.sizes],
  );

  const onSelectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedColorIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#d9d8d8] pt-36 pb-14">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-7 lg:px-10">
        <section className="grid items-start gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Breadcrumb className="mb-8 text-sm text-foreground/75">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Αρχική</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Προϊόντα</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/products?category=${encodeURIComponent(primaryCategory)}`}>
                    {primaryCategory}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="rounded-2xl bg-transparent p-2 md:p-4">
              <button
                type="button"
                onClick={() => {
                  setLightboxImage(packshotImage);
                  setIsLightboxOpen(true);
                }}
                className="group relative block w-full cursor-zoom-in"
                aria-label="Προβολή packshot"
              >
                <img
                  src={packshotImage}
                  alt={`${product.title} packshot`}
                  className="h-[320px] w-full object-contain mix-blend-multiply md:h-[520px]"
                />
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                  Zoom
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="font-heading text-4xl font-semibold leading-[1.15] text-foreground md:text-6xl">
                {product.title}
              </h1>
            </div>

            <div>
              <p className="max-w-[56ch] text-lg leading-relaxed text-foreground/85 md:text-xl">
                {selectedVariant?.excel_ar || selectedVariant?.description || "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Selected code</p>
              <p className="mt-2 font-mono text-lg text-foreground">{selectedVariant?.code || "-"}</p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-foreground/85">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => {
                  const active = index === safeSizeIndex;
                  const specs = sizeSpecs[index]?.specs;
                  const specsLabel = specs?.width && specs?.depth && specs?.boxHeight
                    ? [specs?.liters ? `${specs.liters}L` : null, `W${specs.width}cm`, `D${specs.depth}cm`, `H${specs.boxHeight}cm`]
                        .filter(Boolean)
                        .join(" · ")
                    : [specs?.liters ? `${specs.liters}L` : null, specs?.diameter ? `Ø${specs.diameter}cm` : null, specs?.height ? `H${specs.height}cm` : null]
                        .filter(Boolean)
                        .join(" · ");
                  return (
                    <button
                      key={`${size.size_code}-${index}`}
                      type="button"
                      onClick={() => onSelectSize(index)}
                      className={cn(
                        "rounded-2xl border px-4 py-2.5 text-left transition",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/25 bg-white/70 text-foreground hover:border-foreground/55",
                      )}
                    >
                      {specsLabel ? (
                        <p className={cn("text-xs", active ? "text-background/85" : "text-foreground/70")}>{specsLabel}</p>
                      ) : (
                        <p className={cn("text-xs", active ? "text-background/85" : "text-foreground/70")}>Επιλογή μεγέθους</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-foreground/85">Select color</p>
              <div className="flex flex-wrap items-center gap-2">
                {selectedSize?.variants.map((variant, index) => (
                  <button
                    key={`${variant.code}-${variant.color}`}
                    type="button"
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition",
                      safeColorIndex === index
                        ? "scale-110 border-foreground shadow-[0_0_0_3px_rgba(255,255,255,0.75)]"
                        : "border-white/80 hover:scale-105",
                    )}
                    style={{ background: resolveSwatchBackground(variant.color) }}
                    title={`${variant.color} (${variant.code})`}
                    aria-label={`${variant.color} (${variant.code})`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {additionalImages.length > 0 ? (
          <section className="mt-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {additionalImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setLightboxImage(image);
                    setIsLightboxOpen(true);
                  }}
                  className="group overflow-hidden rounded-xl border border-foreground/15 bg-white/50"
                  aria-label={`Επιπλέον εικόνα ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Additional ${index + 1}`}
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Μεγέθυνση εικόνας προϊόντος"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Κλείσιμο"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={lightboxImage || packshotImage}
            alt="Μεγεθυμένη εικόνα προϊόντος"
            className="max-h-[92vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
