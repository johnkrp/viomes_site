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
// Size selector replaced by inline buttons; removed Select import
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
  ChevronDown,
  Diameter,
  Droplets,
  Expand,
  type LucideIcon,
  MoveHorizontal,
  MoveVertical,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

type DimensionHighlight = {
  key: string;
  label: string;
  value: string;
  Icon: LucideIcon;
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

type ParsedSpecs = ReturnType<typeof parseSpecsFromText>;

const EMPTY_SPECS: ParsedSpecs = {
  liters: null,
  width: null,
  depth: null,
  boxHeight: null,
  diameter: null,
  height: null,
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [morePanelHeight, setMorePanelHeight] = useState(0);
  const morePanelContentRef = useRef<HTMLDivElement | null>(null);
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
    return (
      products.find((entry) => entry.id === id) ||
      products.find((entry) => (id ? entry.id.startsWith(`${id}-`) : false))
    );
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
  const [mainImageAspect, setMainImageAspect] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    // reset stored aspect when main image source changes
    setMainImageAspect(undefined);
  }, [mainImage]);

  const sizeSpecs = useMemo<Array<{ specs: ParsedSpecs }>>(() => {
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
          return (
            specs.liters ||
            specs.diameter ||
            specs.width ||
            specs.depth ||
            specs.height ||
            specs.boxHeight
          );
        }) || size.variants[0];

      return {
        specs: parseSpecsFromText(bestVariantForSpecs?.description || ""),
      };
    });
  }, [product]);

  const familyRows = useMemo(() => {
    if (!product)
      return [] as Array<{
        family: string;
        dims: string;
        liters: string | number | null | string;
        boxInfo: string | number | null | string;
        length: string;
        width: string;
        diameter: string;
        height: string;
        pcs1: string;
        pcs2: string;
        pallet: string;
      }>;

    const map = new Map<
      string,
      {
        family: string;
        dims: string;
        liters: string;
        boxInfo: string;
        length: string;
        width: string;
        diameter: string;
        height: string;
        pcs1: string;
        pcs2: string;
        pallet: string;
      }
    >();

    product.sizes.forEach((size, sIdx) => {
      size.variants.forEach((variant) => {
        const code = variant.code || "-";
        const family = code.split("-")[0] || code;

        if (map.has(family)) return;

        const specs = parseSpecsFromText(variant.description || "");
        const fallback = sizeSpecs[sIdx]?.specs ?? EMPTY_SPECS;

        const liters = specs.liters || fallback.liters || "-";

        const length = specs.width || fallback.width || "-";
        const width = specs.depth || fallback.depth || "-";
        const diameter = specs.diameter || fallback.diameter || "-";
        const height =
          specs.height ||
          fallback.height ||
          specs.boxHeight ||
          fallback.boxHeight ||
          "-";

        const dims =
          diameter && diameter !== "-"
            ? `Ø ${diameter} x H ${height}`
            : length !== "-"
              ? `${length} x ${width} x ${height}`
              : "-";

        const boxInfo = fallback.boxHeight || specs.boxHeight || "-";

        // parse pack field for pcs per package and pallet info if available
        const rawPack = (variant as any).pack || "";
        let pcs1 = "-";
        let pcs2 = "-";
        let pallet = "-";
        if (rawPack) {
          // common formats: "3/18/216" or "10" or "3 x 18"
          const parts = rawPack.split(/[^0-9]+/).filter(Boolean);
          if (parts.length === 1) pcs1 = parts[0];
          if (parts.length === 2) {
            pcs1 = parts[0];
            pcs2 = parts[1];
          }
          if (parts.length >= 3) {
            pcs1 = parts[0];
            pcs2 = parts[1];
            pallet = parts[2];
          }
        }

        map.set(family, {
          family,
          dims,
          liters,
          boxInfo,
          length,
          width,
          diameter,
          height,
          pcs1,
          pcs2,
          pallet,
        });
      });
    });

    return Array.from(map.values()).sort((a, b) => {
      const na = Number.parseInt(a.family, 10);
      const nb = Number.parseInt(b.family, 10);
      if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
      return a.family.localeCompare(b.family, undefined, { numeric: true });
    });
  }, [product, sizeSpecs]);

  const hasRoundDimensions = familyRows.some((row) => row.diameter !== "-");
  const useRectangularTable = !hasRoundDimensions;
  const hasLitersColumn = familyRows.some((row) => row.liters !== "-");

  const fmtValue = (val: string | number | null | undefined) => {
    if (val === null || typeof val === "undefined" || val === "-") return "—";
    const s = String(val);
    // use comma decimal separator to match examples
    return s.includes(".") ? s.replace(".", ",") : s;
  };

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
        setIsDataLoading(true);
        setDataLoadError(null);

        const [catalogProducts, additionalImages] = await Promise.all([
          loadCatalogProducts(),
          loadAdditionalImages(),
        ]);

        if (!isMounted) return;

        setProducts(catalogProducts);
        setAdditionalImagesByCode(additionalImages);
      } catch {
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

  useEffect(() => {
    const contentEl = morePanelContentRef.current;
    if (!contentEl) return;

    const updateHeight = () => {
      setMorePanelHeight(contentEl.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(contentEl);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [
    isMoreOpen,
    selectedVariant?.code,
    selectedVariant?.excel_ar,
    selectedVariant?.excel_tech_gr,
    selectedVariant?.excel_care_gr,
  ]);

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

  const selectedSizeSpecs = sizeSpecs[safeSizeIndex]?.specs ?? EMPTY_SPECS;

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
          Icon: Diameter,
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
    // Prefer physical diameter first, then width or depth (length),
    // then fallback to liters if present, then size codes/labels.
    if (specs?.diameter) return `d${specs.diameter}`;
    if (specs?.width) return `${specs.width} cm`;
    if (specs?.depth) return `${specs.depth} cm`;
    if (specs?.liters) return `${specs.liters}L`;
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

  // Split an array into two rows: first gets ceil(n/2), second gets rest
  const splitTwoRows = <T,>(arr: T[]) => {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)] as [T[], T[]];
  };

  return (
    <div className="min-h-screen bg-background pb-12 pt-32 md:pb-14 md:pt-36 lg:pt-40">
      <div className="mx-auto w-full max-w-[1400px] sm:px-6 md:px-7 lg:px-10">
        <Breadcrumb className="mb-8 text-xs text-accent">
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

        <section className="grid items-start gap-6 md:gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
          <div>
            <div className="rounded-2xl bg-transparent p-2 md:p-4">
              <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-start gap-3 md:gap-4">
                <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto pr-0.5">
                  {galleryImages.map((image, index) => {
                    const isActive = image === mainImage;
                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedMainImage(image)}
                        className={cn(
                          "overflow-hidden border bg-background/70 transition",
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

                <button
                  type="button"
                  onClick={() => {
                    setLightboxImage(mainImage);
                    setIsLightboxOpen(true);
                  }}
                  className="group relative block w-full cursor-zoom-in"
                  style={
                    mainImageAspect
                      ? { aspectRatio: mainImageAspect }
                      : undefined
                  }
                  aria-label="Προβολή κύριας εικόνας"
                >
                  <img
                    src={mainImage}
                    alt={`${product.title} image`}
                    onLoad={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img?.naturalWidth && img?.naturalHeight) {
                        setMainImageAspect(
                          `${img.naturalWidth}/${img.naturalHeight}`,
                        );
                      }
                    }}
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
                      "mx-auto w-full h-full object-contain",
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

          <div className="space-y-6 md:space-y-4">
            <div>
              <h1 className="font-heading text-3xl font-medium leading-[1.15] text-accent sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-3 text-sm font-normal tracking-[0.01em] text-accent md:text-base">
                SKU {selectedVariant?.code || "-"}
              </p>
            </div>

            {/* Description moved below color selection for layout change */}

            <div className="border-t-2 border-border/50 pt-1 md:pt-2 mt-0">
              <p className="mb-4 text-base font-medium text-accent">
                Επιλογή μεγέθους
              </p>

              <div
                role="listbox"
                aria-label="Επιλογή μεγέθους"
                className="mb-4"
              >
                {(() => {
                  const [row1, row2] = splitTwoRows(sortedSizeOptions);
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                        {row1.map((option) => {
                          const isActive = option.index === safeSizeIndex;
                          return (
                            <button
                              key={`size-option-${option.index}`}
                              type="button"
                              onClick={() => onSelectSize(option.index)}
                              aria-pressed={isActive}
                              className={cn(
                                "h-9 w-14 font-medium flex items-center justify-center text-sm border transition",
                                isActive
                                  ? "bg-foreground text-white border-foreground"
                                  : "bg-background/70 border-foreground/25 hover:border-foreground/45",
                              )}
                              title={`Επιλογή ${option.label}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-4">
                        {row2.map((option) => {
                          const isActive = option.index === safeSizeIndex;
                          return (
                            <button
                              key={`size-option-${option.index}`}
                              type="button"
                              onClick={() => onSelectSize(option.index)}
                              aria-pressed={isActive}
                              className={cn(
                                "h-9 w-14 font-medium flex items-center justify-center text-sm border transition",
                                isActive
                                  ? "bg-foreground text-white border-foreground"
                                  : "bg-background/70 border-foreground/25 hover:border-foreground/45",
                              )}
                              title={`Επιλογή ${option.label}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="border-t-2 border-border/50 pt-6 md:pt-2">
                <p className="mb-4 text-base font-medium text-accent">
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
                      {singleColors.length > 0 &&
                        (() => {
                          const [r1, r2] = splitTwoRows(singleColors);
                          return (
                            <>
                              <div className="flex items-end gap-2 sm:gap-3 mb-2">
                                {r1.map((variant) => {
                                  const colorTitle = resolveColorTitle(
                                    variant.color,
                                    language,
                                  );
                                  const colorTagImage = resolveColorTagImage(
                                    variant.code,
                                  );
                                  const variantIndex =
                                    sortedVariants.indexOf(variant);
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
                                        className="overflow-hidden transition hover:scale-105"
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
                                              background:
                                                resolveSwatchBackground(
                                                  variant.color,
                                                ),
                                            }}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex items-end gap-2 sm:gap-3">
                                {r2.map((variant) => {
                                  const colorTitle = resolveColorTitle(
                                    variant.color,
                                    language,
                                  );
                                  const colorTagImage = resolveColorTagImage(
                                    variant.code,
                                  );
                                  const variantIndex =
                                    sortedVariants.indexOf(variant);
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
                                        className="overflow-hidden transition hover:scale-105"
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
                                              background:
                                                resolveSwatchBackground(
                                                  variant.color,
                                                ),
                                            }}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          );
                        })()}

                      {/* Combination colors */}
                      {combinationColors.length > 0 &&
                        (() => {
                          const [r1, r2] = splitTwoRows(combinationColors);
                          return (
                            <>
                              <div className="flex items-end gap-2 sm:gap-3 mb-2">
                                {r1.map((variant) => {
                                  const colorTitle = resolveColorTitle(
                                    variant.color,
                                    language,
                                  );
                                  const colorTagImage = resolveColorTagImage(
                                    variant.code,
                                  );
                                  const variantIndex =
                                    sortedVariants.indexOf(variant);
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
                                        className="overflow-hidden transition hover:scale-105"
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
                                              background:
                                                resolveSwatchBackground(
                                                  variant.color,
                                                ),
                                            }}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex items-end gap-2 sm:gap-3">
                                {r2.map((variant) => {
                                  const colorTitle = resolveColorTitle(
                                    variant.color,
                                    language,
                                  );
                                  const colorTagImage = resolveColorTagImage(
                                    variant.code,
                                  );
                                  const variantIndex =
                                    sortedVariants.indexOf(variant);
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
                                        className="overflow-hidden transition hover:scale-105"
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
                                              background:
                                                resolveSwatchBackground(
                                                  variant.color,
                                                ),
                                            }}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          );
                        })()}
                    </div>
                  );
                })()}
              </div>

              <div className="border-t-2 border-border/50 pt-6 md:pt-2 mt-6">
                <p className="mt-1 max-w-[6] whitespace-pre-line leading-relaxed text-accent md:text-base text-justify">
                  {selectedVariant?.excel_ar ||
                    selectedVariant?.description ||
                    "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
                </p>
              </div>
            </div>
          </div>

          {/* Full-width divider row that spans both columns; table aligned to right column */}
          <div className="col-span-full mt-0 border-t-2 border-border/60">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-7 lg:px-10">
              <div className="grid xl:grid-cols-[1.1fr_0.9fr]">
                <div />
                <div className="pt-6 md:pt-8">
                  <div className="overflow-x-auto border-border bg-background">
                    <table className="w-full table-auto text-base bg-transparent">
                      <thead className="text-accent">
                        <tr>
                          <th className="px-3 py-1 text-center font-semibold">
                            <div className="flex flex-col items-center gap-1">
                              <img
                                src="/images/proposal_1_soft_minimal_bold/01_kodikos_hash.svg"
                                alt="Κωδικός"
                                className="h-6 w-6"
                              />
                              <span className="mt-1 mb-3 text-sm italic font-semibold">symbol</span>
                              <span className="mt-1 text-sm font-semibold text-accent italic">
                              
                              </span>
                            </div>
                          </th>

                          {useRectangularTable ? (
                            <>
                              <th className="px-3 py-1 text-center font-semibold">
                                <div className="flex flex-col items-center gap-0">
                                  <img
                                    src="/images/proposal_1_soft_minimal_bold/03_mikos_dimension_line.svg"
                                    alt="Μήκος"
                                    className="h-7 w-7"
                                  />
                                  <span className="mt-1 text-sm italic font-semibold">
                                    Μήκος
                                  </span>
                                  <span className="mt-0 text-sm italic text-accent">
                                    cm
                                  </span>
                                </div>
                              </th>

                              <th className="px-3 py-1 text-center font-semibold">
                                <div className="flex flex-col items-center gap-0">
                                  <img
                                    src="/images/proposal_1_soft_minimal_bold/04_platos_rounded_rect_arrow.svg"
                                    alt="Πλάτος"
                                    className="h-7 w-7"
                                  />
                                  <span className="mt-1 text-sm italic font-semibold">
                                    Πλάτος
                                  </span>
                                  <span className="mt-0 text-sm text-accent italic">
                                    cm
                                  </span>
                                </div>
                              </th>

                              <th className="px-3 py-1 text-center font-semibold">
                                <div className="flex flex-col items-center gap-0">
                                  <img
                                    src="/images/proposal_1_soft_minimal_bold/05_ypsos_dotted_gauge.svg"
                                    alt="Ύψος"
                                    className="h-7 w-7"
                                  />
                                  <span className="mt-1 text-sm italic font-semibold">
                                    Ύψος
                                  </span>
                                  <span className="mt-0 text-sm text-accent italic">
                                    cm
                                  </span>
                                </div>
                              </th>
                            </>
                          ) : (
                            <>
                              <th className="px-3 py-1 text-center font-semibold">
                                <div className="flex flex-col items-center gap-0">
                                  <img
                                    src="/images/proposal_1_soft_minimal_bold/02_diametros_slash_circle.svg"
                                    alt="Διάμετρος"
                                    className="h-7 w-7"
                                  />
                                  <span className="mt-1 text-sm italic font-semibold">
                                    Διάμ.
                                  </span>
                                  <span className="mt-0 text-sm text-accent italic">
                                    cm
                                  </span>
                                </div>
                              </th>

                              <th className="px-4 py-2 text-center font-semibold">
                                <div className="flex flex-col items-center gap-0">
                                  <img
                                    src="/images/proposal_1_soft_minimal_bold/05_ypsos_dotted_gauge.svg"
                                    alt="Ύψος"
                                    className="h-7 w-7"
                                  />
                                  <span className="mt-1 text-sm italic font-semibold">
                                    Ύψος
                                  </span>
                                  <span className="mt-0 text-sm text-accent italic">
                                    cm
                                  </span>
                                </div>
                              </th>
                            </>
                          )}

                          {hasLitersColumn ? (
                            <th className="px-3 py-1 text-center font-semibold">
                              <div className="flex flex-col items-center gap-0">
                                <img
                                  src="/images/proposal_1_soft_minimal_bold/06_litra_drop.svg"
                                  alt="Λίτρα"
                                  className="h-7 w-7"
                                />
                                <span className="mt-1 text-sm italic font-semibold">
                                  Λίτρα
                                </span>
                                <span className="mt-0 text-sm text-accent italic">
                                  L
                                </span>
                              </div>
                            </th>
                          ) : null}

                          <th className="px-3 py-1 text-center font-semibold">
                            <div className="flex flex-col items-center gap-0">
                              <img
                                src="/images/proposal_1_soft_minimal_bold/07_syskevasia_cube.svg"
                                alt="Συσκευασία"
                                className="h-7 w-7"
                              />
                              <span className="mt-1 text-sm font-semibold italic">Συσκ.</span>
                              <span className="mt-0 text-sm font-semibold text-accent italic">
                                τεμ.
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {familyRows.map((row) => (
                          <tr
                            key={row.family}
                            className={cn(
                              "text-accent",
                              "bg-transparent",
                              "font-normal",
                            )}
                          >
                            <td className="px-3 py-1 text-center">
                              {row.family}
                            </td>
                            {useRectangularTable ? (
                              <>
                                <td className="px-3 py-1 text-center">
                                  {fmtValue(row.length)}
                                </td>
                                <td className="px-3 py-1 text-center">
                                  {fmtValue(row.width)}
                                </td>
                                <td className="px-3 py-1 text-center">
                                  {fmtValue(row.height)}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-3 py-1 text-center">
                                  {fmtValue(row.diameter)}
                                </td>
                                <td className="px-3 py-1 text-center">
                                  {fmtValue(row.height)}
                                </td>
                              </>
                            )}
                            {hasLitersColumn ? (
                              <td className="px-3 py-1 text-center">
                                {fmtValue(row.liters)}
                              </td>
                            ) : null}
                            <td className="px-3 py-1 text-center">
                              {fmtValue(row.pcs1)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 w-full border-t-2 border-border/50 pt-4 text-accent md:pt-3">
                    <button
                      type="button"
                      onClick={() => setIsMoreOpen((current) => !current)}
                      className="flex items-center gap-2 text-left text-base transition hover:opacity-80"
                      aria-expanded={isMoreOpen}
                    >
                      <span className="font-medium">Περισσότερα</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-300 ease-out motion-reduce:transition-none",
                          isMoreOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className="overflow-x-visible overflow-y-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
                      style={{ height: isMoreOpen ? `${morePanelHeight}px` : "0px" }}
                      aria-hidden={!isMoreOpen}
                    >
                      <div ref={morePanelContentRef} className="pt-4">
                        <div className="relative lg:ml-[-2rem] xl:ml-[-4rem] lg:w-[650px] xl:w-[700px]">
                          <div className="grid gap-4 lg:grid-cols-3">
                            <div className="bg-background/40">
                              <h3 className="text-sm font-semibold text-accent">
                                Αναλυτική Περιγραφή GR
                              </h3>
                              <p className="mt-1 whitespace-pre-line text-sm font-normal leading-relaxed text-accent">
                                {selectedVariant?.excel_ar ||
                                  selectedVariant?.description ||
                                  "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
                              </p>
                            </div>

                            <div className="bg-background/40">
                              <h3 className="text-sm font-semibold text-accent">
                                Τεχνικά Χαρακτηριστικά
                              </h3>
                              <p className="mt-1 whitespace-pre-line text-sm font-normal leading-relaxed text-accent">
                                {selectedVariant?.excel_tech_gr ||
                                  selectedVariant?.description ||
                                  "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
                              </p>
                            </div>

                            <div className="bg-background/40">
                              <h3 className="text-sm font-semibold text-accent">
                                Οδηγίες Χρήσης &amp; Φροντίδας
                              </h3>
                              <p className="mt-1 whitespace-pre-line text-sm font-normal leading-relaxed text-accent">
                                {selectedVariant?.excel_care_gr ||
                                  selectedVariant?.description ||
                                  "Δεν υπάρχει περιγραφή για την τρέχουσα παραλλαγή."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
