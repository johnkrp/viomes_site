import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PackshotVariantSelector } from "@/components/ui/PackshotVariantSelector";
import {
  loadAdditionalImages,
  loadCatalogProducts,
} from "@/lib/catalogDataLoader";
import type { GroupedProduct } from "@/lib/catalogTypes";
import { resolveColorTitle, resolveSwatchBackground } from "@/lib/colorSwatch";
import { resolveColorTagImage } from "@/lib/colorTags";
import { resolvePrimaryCategory } from "@/lib/productCategories";
import {
  resolveTestPackshotByCode,
  resolveTestPackshotFromImageUrl,
  resolveTestPackshotVariants,
  resolveTestPackshotVariantsFromImageUrl,
} from "@/lib/testPackshotOverrides";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Expand, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const isValidImageUrl = (url: string | undefined | null) =>
  Boolean(url && url.trim() && !url.includes("viomes_.jpg"));

const isAdditionalImageUrl = (url: string | undefined | null) =>
  Boolean(
    isValidImageUrl(url) &&
    !url?.includes("/packshot_photos/") &&
    !url?.includes("/packshot-test/"),
  );

const parseSpecsFromText = (text: string) => {
  const normalized = (text || "").toLowerCase();
  const litersMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(?:lt|l)\b/i);
  const boxDimensionsMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)(?:\s*h)?/i,
  );
  const twoDimensionsMatch = !boxDimensionsMatch
    ? normalized.match(
        /(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)(?:\s*(?:cm|χιλ|mm)\b|\b)/i,
      )
    : null;
  const dimensionsMatch =
    normalized.match(
      /(?:^|[^a-z0-9])d\s*([0-9]+(?:[.,][0-9]+)?)\s*x\s*([0-9]+(?:[.,][0-9]+)?)\s*h?/i,
    ) ??
    normalized.match(
      /ø\s*([0-9]+(?:[.,][0-9]+)?)\s*x\s*h?\s*([0-9]+(?:[.,][0-9]+)?)/i,
    );

  const liters = litersMatch ? litersMatch[1].replace(",", ".") : null;
  const explicitDiameter = dimensionsMatch
    ? dimensionsMatch[1].replace(",", ".")
    : null;
  const explicitHeight = dimensionsMatch
    ? dimensionsMatch[2].replace(",", ".")
    : null;

  const boxWidth = boxDimensionsMatch
    ? boxDimensionsMatch[1].replace(",", ".")
    : null;
  const boxDepth = boxDimensionsMatch
    ? boxDimensionsMatch[2].replace(",", ".")
    : null;
  const boxHeight = boxDimensionsMatch
    ? boxDimensionsMatch[3].replace(",", ".")
    : null;

  // If diameter syntax exists, avoid falling back to width-height parsing.
  const effectiveTwoDimensionsMatch = explicitDiameter
    ? null
    : twoDimensionsMatch;
  const twoDimWidth = effectiveTwoDimensionsMatch
    ? effectiveTwoDimensionsMatch[1].replace(",", ".")
    : null;
  const twoDimHeight = effectiveTwoDimensionsMatch
    ? effectiveTwoDimensionsMatch[2].replace(",", ".")
    : null;

  // Some records encode round products as 8x16x16h; normalize those to Ø8 x H16.
  const looksLikeRoundDuplicate =
    !explicitDiameter &&
    boxWidth &&
    boxDepth &&
    boxHeight &&
    boxDepth === boxHeight;

  return {
    liters,
    width: looksLikeRoundDuplicate ? null : boxWidth || twoDimWidth,
    depth: looksLikeRoundDuplicate ? null : boxDepth,
    boxHeight: looksLikeRoundDuplicate ? null : boxHeight,
    diameter: explicitDiameter || (looksLikeRoundDuplicate ? boxWidth : null),
    height:
      explicitHeight || (looksLikeRoundDuplicate ? boxDepth : twoDimHeight),
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [additionalImagesByCode, setAdditionalImagesByCode] = useState<
    Record<string, string[]>
  >({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataLoadError, setDataLoadError] = useState<string | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedPackshotVariant, setSelectedPackshotVariant] = useState<
    string | null
  >(null);
  const [language, setLanguage] = useState<"el" | "en">(() => {
    if (typeof window === "undefined") return "el";
    return localStorage.getItem("viomes_language") === "en" ? "en" : "el";
  });

  // IMPORTANT: All hooks must be called in the same order every render
  // This must happen BEFORE any conditional early returns

  const product = useMemo(() => {
    if (!products.length) return undefined;
    console.log(
      "[ProductDetail] Looking for product ID:",
      id,
      "in",
      products.length,
      "products",
    );
    console.log("[ProductDetail] First product sample:", products[0]);
    const found = products.find((entry) => entry.id === id);
    console.log(
      "[ProductDetail] Product found:",
      found ? "YES" : "NO",
      found?.title,
    );
    return found;
  }, [id, products]);

  const safeSizeIndex = Math.min(
    Math.max(product?.sizes.length ? selectedSizeIndex : 0, 0),
    Math.max(product?.sizes.length ? product.sizes.length - 1 : 0, 0),
  );

  const selectedSize = product?.sizes?.[safeSizeIndex];

  const sortedVariants = useMemo(() => {
    if (!selectedSize?.variants) return [];
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return [...selectedSize.variants].sort((a, b) =>
      collator.compare(a.code || "", b.code || ""),
    );
  }, [selectedSize]);

  const safeColorIndex = Math.min(
    selectedColorIndex,
    Math.max((sortedVariants.length || 1) - 1, 0),
  );

  const selectedVariant = sortedVariants[safeColorIndex] || sortedVariants[0];

  const packshotVariants = useMemo(() => {
    if (!product || !selectedVariant?.code) return [];
    return (
      resolveTestPackshotVariants(selectedVariant.code) ||
      resolveTestPackshotVariantsFromImageUrl(selectedVariant.image_url) ||
      []
    );
  }, [product, selectedVariant]);

  const packshotImage = useMemo(() => {
    if (!product) return "";
    // Use selected variant if available, otherwise fall back to primary
    if (
      selectedPackshotVariant &&
      packshotVariants.includes(selectedPackshotVariant)
    ) {
      return selectedPackshotVariant;
    }
    return (
      resolveTestPackshotByCode(selectedVariant?.code) ||
      resolveTestPackshotFromImageUrl(selectedVariant?.image_url) ||
      selectedVariant?.image_url ||
      resolveTestPackshotFromImageUrl(product.representative_image) ||
      product.representative_image ||
      ""
    );
  }, [product, selectedVariant, selectedPackshotVariant, packshotVariants]);

  const isTestPackshot = packshotImage.includes("/images/packshot-test/");

  const primaryCategory = useMemo(
    () => (product ? resolvePrimaryCategory(product) : ""),
    [product],
  );

  const additionalImages = useMemo(() => {
    if (!product) return [];

    const selectedCodeImages = selectedVariant?.code
      ? additionalImagesByCode[selectedVariant.code] || []
      : [];
    const validSelected = selectedCodeImages.filter(isAdditionalImageUrl);
    if (validSelected.length > 0) return validSelected;

    const familyImages = new Set<string>();

    product.sizes.forEach((size) => {
      size.variants.forEach((variant) => {
        (additionalImagesByCode[variant.code] || [])
          .filter(isAdditionalImageUrl)
          .forEach((url) => familyImages.add(url));
      });
    });

    return Array.from(familyImages);
  }, [product, additionalImagesByCode, selectedVariant?.code]);

  const sizeSpecs = useMemo(() => {
    if (!product) return [];
    return product.sizes.map((size) => {
      if (size.specs?.has_specs) {
        return {
          specs: {
            liters: size.specs.liters || null,
            width: size.specs.width || null,
            depth: size.specs.depth || null,
            boxHeight: size.specs.box_height || null,
            diameter: size.specs.diameter || null,
            height: size.specs.height || null,
          },
        };
      }

      const bestVariantForSpecs =
        size.variants.find((variant) => {
          const specs = parseSpecsFromText(variant.description || "");
          return specs.liters || specs.diameter || specs.height;
        }) || size.variants[0];

      return {
        specs: parseSpecsFromText(bestVariantForSpecs?.description || ""),
      };
    });
  }, [product]);

  // All effect hooks must also be called consistently
  useEffect(() => {
    const handleLanguageChange = () => {
      const next =
        localStorage.getItem("viomes_language") === "en" ? "en" : "el";
      setLanguage(next);
    };

    window.addEventListener("viomes-language-change", handleLanguageChange);
    return () =>
      window.removeEventListener(
        "viomes-language-change",
        handleLanguageChange,
      );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        console.log("[ProductDetail] Loading data for ID:", id);
        setIsDataLoading(true);
        setDataLoadError(null);

        const [catalogProducts, additionalImages] = await Promise.all([
          loadCatalogProducts(),
          loadAdditionalImages(),
        ]);

        console.log(
          "[ProductDetail] Data loaded. Products:",
          catalogProducts.length,
          "Additional images keys:",
          Object.keys(additionalImages).length,
        );

        if (!isMounted) return;

        setProducts(catalogProducts);
        setAdditionalImagesByCode(additionalImages);
      } catch (error) {
        console.error("[ProductDetail] Data loading failed:", error);
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

  // NOW do conditional early returns for rendering
  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm text-muted-foreground">
            Φόρτωση προϊόντος...
          </div>
        </div>
      </div>
    );
  }

  if (dataLoadError) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm text-destructive">
            {dataLoadError}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-semibold">
              Το προϊόν δεν βρέθηκε
            </h1>
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

  const onSelectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedColorIndex(0);
  };

  return (
    <div className="min-h-screen bg-background pb-12 pt-32 md:pb-14 md:pt-36 lg:pt-40">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-7 lg:px-10">
        <section className="grid items-start gap-6 md:gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
          <div>
            <Breadcrumb className="mb-8 text-xs text-foreground/75">
              <BreadcrumbList className="flex-wrap gap-y-1">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Αρχική</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/products">Προϊόντα</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/products?category=${encodeURIComponent(primaryCategory)}`}
                    >
                      {primaryCategory}
                    </Link>
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
                  style={
                    isTestPackshot
                      ? {
                          WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 56%, transparent 88%)",
                          maskImage:
                            "radial-gradient(ellipse at center, black 56%, transparent 88%)",
                        }
                      : undefined
                  }
                  className={cn(
                    "mx-auto h-[260px] w-full object-contain sm:h-[320px] md:h-[460px] lg:h-[520px]",
                    isTestPackshot ? "mix-blend-darken" : "mix-blend-multiply",
                  )}
                  loading="lazy"
                  decoding="async"
                />
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                  Zoom
                </span>
              </button>
            </div>

            {/* Packshot Variant Selector */}
            {packshotVariants.length > 0 && (
              <div className="mt-6 border-t border-border pt-6">
                <PackshotVariantSelector
                  variants={packshotVariants}
                  currentVariant={
                    selectedPackshotVariant || packshotVariants[0]
                  }
                  onVariantChange={setSelectedPackshotVariant}
                  thumbnailSize="md"
                />
              </div>
            )}
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <h1 className="font-heading text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
            </div>

            <div>
              <p className="max-w-[56ch] text-base leading-relaxed text-foreground/85 md:text-lg">
                {selectedVariant?.excel_ar ||
                  selectedVariant?.description ||
                  "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                Selected code
              </p>
              <p className="mt-2 font-mono text-base text-foreground">
                {selectedVariant?.code || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground/85">
                Select size
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.sizes.map((size, index) => {
                  const active = index === safeSizeIndex;
                  const specs = sizeSpecs[index]?.specs;
                  const hasDiameter = Boolean(specs?.diameter);
                  const hasBox3D = Boolean(
                    specs?.width && specs?.depth && specs?.boxHeight,
                  );
                  const hasWidthHeightOnly = Boolean(
                    specs?.width &&
                    !specs?.depth &&
                    (specs?.height || specs?.boxHeight),
                  );
                  const specsLabel = hasDiameter
                    ? [
                        specs?.liters ? `${specs.liters}L` : null,
                        specs?.diameter ? `Ø${specs.diameter}cm` : null,
                        specs?.height ? `H${specs.height}cm` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")
                    : hasBox3D
                      ? [
                          specs?.liters ? `${specs.liters}L` : null,
                          `W${specs.width}cm`,
                          `D${specs.depth}cm`,
                          `H${specs.boxHeight}cm`,
                        ]
                          .filter(Boolean)
                          .join(" · ")
                      : hasWidthHeightOnly
                        ? [
                            specs?.liters ? `${specs.liters}L` : null,
                            `W${specs.width}cm`,
                            `H${specs.height || specs.boxHeight}cm`,
                          ]
                            .filter(Boolean)
                            .join(" · ")
                        : [
                            specs?.liters ? `${specs.liters}L` : null,
                            specs?.diameter ? `Ø${specs.diameter}cm` : null,
                            specs?.height ? `H${specs.height}cm` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ");
                  return (
                    <button
                      key={`${size.size_code}-${index}`}
                      type="button"
                      onClick={() => onSelectSize(index)}
                      className={cn(
                        "flex h-11 w-full items-center justify-center rounded-xl border px-3 py-2 text-center transition",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/25 bg-white/70 text-foreground hover:border-foreground/55",
                      )}
                    >
                      {specsLabel ? (
                        <p
                          className={cn(
                            "truncate text-[11px]",
                            active
                              ? "text-background/85"
                              : "text-foreground/70",
                          )}
                        >
                          {specsLabel}
                        </p>
                      ) : (
                        <p
                          className={cn(
                            "text-[11px]",
                            active
                              ? "text-background/85"
                              : "text-foreground/70",
                          )}
                        >
                          Επιλογή μεγέθους
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground/85">
                Select color
              </p>

              {(() => {
                // Separate single and combination colors
                const singleColors = sortedVariants.filter(
                  (v) => !/[/_]/.test(v.code),
                );
                const combinationColors = sortedVariants.filter((v) =>
                  /[/_]/.test(v.code),
                );

                return (
                  <div className="flex flex-col gap-4">
                    {/* Single colors */}
                    {singleColors.length > 0 && (
                      <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                        {singleColors.map((variant, index) => {
                          const colorTitle = resolveColorTitle(
                            variant.color,
                            language,
                          );
                          const colorTagImage = resolveColorTagImage(
                            variant.code,
                          );
                          const variantIndex = sortedVariants.indexOf(variant);
                          return (
                            <div
                              key={`${variant.code}-${variant.color}`}
                              className="flex max-w-[2.6rem] flex-col items-center gap-0.5"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedColorIndex(variantIndex)
                                }
                                className="overflow-hidden rounded transition hover:scale-105"
                                title={`${colorTitle} (${variant.code})`}
                                aria-label={`${colorTitle} (${variant.code})`}
                              >
                                {colorTagImage ? (
                                  <img
                                    src={colorTagImage}
                                    alt={colorTitle}
                                    className="h-[2.6rem] w-[2.6rem] object-contain"
                                  />
                                ) : (
                                  <div
                                    className="h-[2.6rem] w-[2.6rem] rounded-full"
                                    style={{
                                      background: resolveSwatchBackground(
                                        variant.color,
                                      ),
                                    }}
                                  />
                                )}
                              </button>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "h-[1.5px] rounded-full bg-foreground/75 transition-opacity",
                                  safeColorIndex === variantIndex
                                    ? "w-5 opacity-100"
                                    : "w-0 opacity-0",
                                )}
                              />
                              <span
                                className={cn(
                                  "max-w-20 truncate text-center text-[10px] leading-tight",
                                  safeColorIndex === variantIndex
                                    ? "text-foreground/85"
                                    : "text-foreground/60",
                                )}
                                title={variant.color}
                              >
                                {colorTitle}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Combination colors */}
                    {combinationColors.length > 0 && (
                      <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                        {combinationColors.map((variant) => {
                          const colorTitle = resolveColorTitle(
                            variant.color,
                            language,
                          );
                          const colorTagImage = resolveColorTagImage(
                            variant.code,
                          );
                          const variantIndex = sortedVariants.indexOf(variant);
                          return (
                            <div
                              key={`${variant.code}-${variant.color}`}
                              className="flex max-w-[2.6rem] flex-col items-center gap-0.5"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedColorIndex(variantIndex)
                                }
                                className="overflow-hidden rounded transition hover:scale-105"
                                title={`${colorTitle} (${variant.code})`}
                                aria-label={`${colorTitle} (${variant.code})`}
                              >
                                {colorTagImage ? (
                                  <img
                                    src={colorTagImage}
                                    alt={colorTitle}
                                    className="h-[2.6rem] w-[2.6rem] object-contain"
                                  />
                                ) : (
                                  <div
                                    className="h-[2.6rem] w-[2.6rem] rounded-full"
                                    style={{
                                      background: resolveSwatchBackground(
                                        variant.color,
                                      ),
                                    }}
                                  />
                                )}
                              </button>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "h-[1.5px] rounded-full bg-foreground/75 transition-opacity",
                                  safeColorIndex === variantIndex
                                    ? "w-5 opacity-100"
                                    : "w-0 opacity-0",
                                )}
                              />
                              <span
                                className={cn(
                                  "max-w-20 truncate text-center text-[10px] leading-tight hidden",
                                  safeColorIndex === variantIndex
                                    ? "text-foreground/85"
                                    : "text-foreground/60",
                                )}
                                title={variant.color}
                              >
                                {colorTitle}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {additionalImages.length > 0 ? (
          <section className="mt-8 md:mt-10">
            <div
              className={cn(
                "mx-auto gap-3",
                additionalImages.length === 1 &&
                  "grid max-w-md grid-cols-1 justify-items-center",
                additionalImages.length === 2 &&
                  "grid max-w-3xl grid-cols-2 justify-items-center",
                additionalImages.length === 3 &&
                  "grid max-w-5xl grid-cols-3 justify-items-center",
                additionalImages.length >= 4 &&
                  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {additionalImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setLightboxImage(image);
                    setIsLightboxOpen(true);
                  }}
                  className="group flex items-center justify-center overflow-hidden rounded-xl border border-foreground/15 bg-white/50"
                  aria-label={`Επιπλέον εικόνα ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Additional ${index + 1}`}
                    className="h-48 w-full object-cover object-center transition duration-300 group-hover:scale-105 sm:h-60 lg:h-72"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
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
