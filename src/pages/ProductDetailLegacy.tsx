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
import { AlertCircle, ArrowLeft, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

const parseVariantSpecs = (description: string) => {
  const text = description || "";
  const litersMatch = text.match(/(\d+(?:[.,]\d+)?)\s*lt/i);
  const dimensionsMatch = text.match(/([dDØΦ]?\s*[\d.,]+\s*x\s*[hH]?[\d.,]+(?:\s*x\s*[hH]?[\d.,]+)?)/i);
  const formattedDimensions = dimensionsMatch
    ? dimensionsMatch[1]
        .replace(/[dD]/g, "Ø ")
        .replace(/[Φφ]/g, "Ø ")
        .replace(/[hH]/g, "H ")
        .replace(/\s*x\s*/gi, " x ")
        .replace(/\s+/g, " ")
        .trim()
    : "-";

  return {
    liters: litersMatch ? litersMatch[1].replace(",", ".") : "-",
    dimensions: formattedDimensions,
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const product = useMemo(() => products.find((entry) => entry.id === id), [id]);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-md border border-border bg-card p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-semibold">Το προϊόν δεν βρέθηκε</h1>
            <p className="mt-2 text-muted-foreground">
              Η επιλεγμένη οικογένεια προϊόντων δεν υπάρχει στον κατάλογο.
            </p>
            <Link to="/products" className="inline-block mt-6">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
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

  const onSelectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedColorIndex(0);
  };

  const rightCarouselImages = useMemo(() => {
    const bySelectedCode = selectedVariant?.code ? additionalImagesByCode[selectedVariant.code] : undefined;
    if (bySelectedCode && bySelectedCode.length > 0) {
      return bySelectedCode.filter(isValidImageUrl);
    }

    const familyFallback = new Set<string>();
    product.sizes.forEach((size) => {
      size.variants.forEach((variant) => {
        const entries = additionalImagesByCode[variant.code] || [];
        entries.filter(isValidImageUrl).forEach((url) => familyFallback.add(url));
      });
    });
    return Array.from(familyFallback);
  }, [product.sizes, selectedVariant?.code]);

  useEffect(() => {
    setCarouselIndex(0);
    setIsCarouselPaused(false);
  }, [selectedVariant?.code]);

  useEffect(() => {
    if (rightCarouselImages.length <= 1 || isCarouselPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % rightCarouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselPaused, rightCarouselImages]);

  const sizeRows = product.sizes.map((size) => {
    const preview = size.variants[0];
    const specs = parseVariantSpecs(preview?.description || "");

    return {
      sizeCode: size.size_code || size.size_label,
      dimensions: specs.dimensions,
      liters: specs.liters,
      packageInfo: preview?.pack || "-",
    };
  });

  const currentRightImage =
    rightCarouselImages.length > 0
      ? rightCarouselImages[carouselIndex % rightCarouselImages.length]
      : selectedVariant?.image_url || product.representative_image;

  return (
    <div className="pt-24 pb-10 min-h-screen bg-background">
      <div className="mx-auto w-full max-w-none px-2 md:px-4 xl:px-6">
        <Breadcrumb className="mb-8 text-sm text-foreground/70">
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
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mx-auto w-full grid grid-cols-1 xl:grid-cols-[260px_minmax(520px,1fr)_460px] gap-6 xl:gap-8 items-start">
          <div className="hidden xl:block pt-8">
            <div className="bg-white/45 p-5 xl:p-6 h-[300px]">
              <img
                src={selectedVariant?.image_url || product.representative_image}
                alt={`${product.title} packshot`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <div className="pt-8 xl:pt-8">
              <div className="flex items-end justify-between gap-6">
                <div className="pb-1">
                  <h1 className="text-[44px] leading-none font-semibold text-foreground/95">{product.title}</h1>
                  <p className="mt-2 text-[20px] leading-tight text-foreground/85">{selectedVariant?.description || "-"}</p>
                </div>

              <div className="flex flex-wrap items-center justify-end gap-1">
                {selectedSize?.variants.map((variant, index) => (
                  <button
                    key={`${variant.code}-${variant.color}`}
                    type="button"
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      "h-10 min-w-10 px-2.5 border text-[15px] leading-none transition-all",
                      safeColorIndex === index
                        ? "border-foreground/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]"
                        : "border-transparent hover:border-foreground/30",
                    )}
                    style={{
                      background: resolveSwatchBackground(variant.color),
                      color: "rgba(255,255,255,0.95)",
                    }}
                    title={`${variant.color} (${variant.code})`}
                    aria-label={`${variant.color} (${variant.code})`}
                  >
                    {variant.code.split("-").pop()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 bg-[#d7d7da] px-7 xl:px-8 py-4 xl:py-5">
              <table className="w-full text-[14px] text-foreground/85">
                <thead>
                  <tr className="text-[16px] italic text-foreground/75">
                    <th className="text-left font-medium pb-2">article code</th>
                    <th className="text-left font-medium pb-2">dimensions</th>
                    <th className="text-left font-medium pb-2">liter</th>
                    <th className="text-left font-medium pb-2">
                      <img
                        src="https://viomes.gr/images/colors/BOX.png"
                        alt="pack"
                        className="h-4 w-auto"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeRows.map((row, index) => (
                    <tr
                      key={`${row.sizeCode}-${index}`}
                      className={cn("border-t border-foreground/5", safeSizeIndex === index ? "bg-white/20" : "bg-transparent")}
                      onClick={() => onSelectSize(index)}
                    >
                      <td className="py-2 cursor-pointer">{row.sizeCode}</td>
                      <td className="py-2 cursor-pointer">{row.dimensions}</td>
                      <td className="py-2 cursor-pointer">{row.liters}</td>
                      <td className="py-2 cursor-pointer">{row.packageInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[18px] leading-tight text-foreground/85">
              Επιλεγμένος κωδικός: <span className="font-semibold">{selectedVariant?.code || "-"}</span>
            </div>
            {selectedVariant?.excel_ar ? (
              <p className="mt-2 text-[18px] leading-tight text-foreground/70">{selectedVariant.excel_ar}</p>
            ) : null}
          </div>

          <div className="pt-4 xl:pt-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCarouselPaused(true);
                  setIsLightboxOpen(true);
                }}
                className="w-full cursor-zoom-in"
                aria-label="Προβολή εικόνας"
              >
                <img
                  key={carouselIndex}
                  src={currentRightImage}
                  alt="Επιπλέον φωτογραφία προϊόντος"
                  className="w-full h-[820px] object-cover transition-all duration-1000 ease-in-out hover:scale-105 animate-fade-in"
                  style={{ animation: "fadeInScale 0.8s ease-in-out forwards" }}
                />
              </button>

              {rightCarouselImages.length > 1 ? (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {rightCarouselImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCarouselIndex(index)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-all",
                        index === carouselIndex ? "bg-white scale-110" : "bg-white/55",
                      )}
                      aria-label={`Μετάβαση στην εικόνα ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Μεγέθυνση εικόνας προϊόντος"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 text-white p-2 hover:bg-white/20"
            aria-label="Κλείσιμο"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={currentRightImage}
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
