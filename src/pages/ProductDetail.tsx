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
import {
  AlertCircle,
  ArrowLeft,
  Droplets,
  Expand,
  MoveHorizontal,
  MoveVertical,
  Orbit,
  X,
} from "lucide-react";
import { type ComponentType, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

type DimensionHighlight = {
  key: string;
  label: string;
  value: string;
  Icon: ComponentType<{ className?: string }>;
};

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
  const [selectedMainImage, setSelectedMainImage] = useState<string | null>(
    null,
  );
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
    const found =
      products.find((entry) => entry.id === id) ||
      products.find((entry) => (id ? entry.id.startsWith(`${id}-`) : false));
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

  const galleryImages = useMemo(() => {
    const deduped = new Set<string>();
    if (packshotImage) deduped.add(packshotImage);
    additionalImages.forEach((image) => {
      if (image) deduped.add(image);
    });
    return Array.from(deduped);
  }, [packshotImage, additionalImages]);

  const mainImage = selectedMainImage || packshotImage;

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
    if (!galleryImages.length) {
      setSelectedMainImage(null);
      return;
    }

    setSelectedMainImage((current) => {
      if (current && galleryImages.includes(current)) return current;
      return galleryImages[0];
    });
  }, [galleryImages]);

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

  // If there was an error loading data, still show the error page as before
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
    // While data is loading, show a compact inline loader instead of a full-page
    // loading screen. If loading finished and still no product, show the
    // existing "not found" message.
    if (isDataLoading) {
      return (
        <div className="container mx-auto max-w-3xl px-6 py-6">
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm text-muted-foreground">
            Φόρτωση προϊόντος...
          </div>
        </div>
      );
    }

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

  const selectedSizeSpecs = sizeSpecs[safeSizeIndex]?.specs;

  const dimensionHighlights = [
    selectedSizeSpecs?.liters
      ? {
          key: "liters",
          label: "Λίτρα",
          value: `${selectedSizeSpecs.liters} L`,
          Icon: Droplets,
        }
      : null,
    selectedSizeSpecs?.diameter
      ? {
          key: "diameter",
          label: "Διάμετρος",
          value: `${selectedSizeSpecs.diameter} cm`,
          Icon: Orbit,
        }
      : selectedSizeSpecs?.width
        ? {
            key: "width",
            label: "Πλάτος",
            value: `${selectedSizeSpecs.width} cm`,
            Icon: MoveHorizontal,
          }
        : null,
    selectedSizeSpecs?.depth
      ? {
          key: "depth",
          label: "Βάθος",
          value: `${selectedSizeSpecs.depth} cm`,
          Icon: MoveHorizontal,
        }
      : null,
    selectedSizeSpecs?.height || selectedSizeSpecs?.boxHeight
      ? {
          key: "height",
          label: "Ύψος",
          value: `${selectedSizeSpecs.height || selectedSizeSpecs.boxHeight} cm`,
          Icon: MoveVertical,
        }
      : null,
  ].filter((item): item is DimensionHighlight => item !== null);

  const getSizeOptionLabel = (index: number) => {
    const size = product.sizes[index];
    const specs = sizeSpecs[index]?.specs;

    if (specs?.liters) return `${specs.liters}L`;
    if (specs?.width) return `${specs.width} cm`;
    if (specs?.diameter) return `${specs.diameter} cm`;
    return size.size_code || size.size_label || `Μέγεθος ${index + 1}`;
  };

  const getSizeSortValue = (index: number) => {
    const specs = sizeSpecs[index]?.specs;
    const liters = specs?.liters ? Number.parseFloat(specs.liters) : NaN;
    if (Number.isFinite(liters)) return liters;

    const width = specs?.width ? Number.parseFloat(specs.width) : NaN;
    if (Number.isFinite(width)) return width;

    const diameter = specs?.diameter ? Number.parseFloat(specs.diameter) : NaN;
    if (Number.isFinite(diameter)) return diameter;

    return Number.POSITIVE_INFINITY;
  };

  const sortedSizeOptions = product.sizes
    .map((_, index) => ({
      index,
      label: getSizeOptionLabel(index),
      sortValue: getSizeSortValue(index),
    }))
    .sort((a, b) => {
      if (a.sortValue !== b.sortValue) return a.sortValue - b.sortValue;
      return a.label.localeCompare(b.label, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

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
                {product.subcategory ? (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link
                          to={`/products?category=${encodeURIComponent(
                            primaryCategory,
                          )}&subcategory=${encodeURIComponent(product.subcategory)}`}
                        >
                          {product.subcategory}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                ) : null}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="rounded-2xl bg-transparent p-2 md:p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_5.75rem] items-start gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setLightboxImage(mainImage);
                    setIsLightboxOpen(true);
                  }}
                  className="group relative block w-full cursor-zoom-in"
                  aria-label="Προβολή κύριας εικόνας"
                >
                  <img
                    src={mainImage}
                    alt={`${product.title} image`}
                    style={
                      mainImage === packshotImage && isTestPackshot
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
                      mainImage === packshotImage && isTestPackshot
                        ? "mix-blend-darken"
                        : "mix-blend-multiply",
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                    Zoom
                  </span>
                </button>

                <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto pr-0.5">
                  {galleryImages.map((image, index) => {
                    const isActive = image === mainImage;
                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedMainImage(image)}
                        className={cn(
                          "overflow-hidden border bg-white/70 transition",
                          isActive
                            ? "border-foreground shadow-sm"
                            : "border-foreground/15 hover:border-foreground/45",
                        )}
                        aria-label={`Εικόνα ${index + 1}`}
                        aria-current={isActive ? "true" : "false"}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-[5rem] w-[5rem] object-cover md:h-[5.75rem] md:w-[5.75rem]"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
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
              <p className="mt-2 text-sm font-normal tracking-[0.01em] text-foreground/38 md:text-base">
                Κωδικός: {selectedVariant?.code || "-"}
              </p>
            </div>

            <div>
              <p className="max-w-[6] text-base leading-relaxed text-foreground/85 md:text-lg">
                {selectedVariant?.excel_ar ||
                  selectedVariant?.description ||
                  "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-bold text-foreground/85">
                Μέγεθος:
              </p>
              <Select
                value={String(safeSizeIndex)}
                onValueChange={(value) => onSelectSize(Number(value))}
              >
                <SelectTrigger className="h-9 w-full max-w-[75px] border-foreground/25 bg-white/70 text-left text-xs text-foreground sm:text-sm">
                  <SelectValue placeholder="Επιλογή λίτρων" />
                </SelectTrigger>
                <SelectContent>
                  {sortedSizeOptions.map((option) => (
                    <SelectItem
                      key={`size-option-${option.index}`}
                      value={String(option.index)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {dimensionHighlights.length > 0 ? (
                <div className="mt-4 border-y border-foreground/18 bg-foreground/[0.02] py-4">
                  <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                    {dimensionHighlights.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-2.5 text-foreground/80"
                      >
                        <item.Icon className="h-4 w-4 shrink-0 text-foreground/55" />
                        <span className="text-xs">{item.label}:</span>
                        <span className="text-sm font-medium text-foreground/90">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-xs text-foreground/55">
                  Δεν υπάρχουν διαθέσιμες διαστάσεις για αυτό το μέγεθος.
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-[11px] font-bold text-foreground/85">
                Επιλογή χρώματος
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
                              className="flex max-w-[2.6rem] flex-col items-center"
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
                              className="flex max-w-[2.6rem] flex-col items-center"
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
