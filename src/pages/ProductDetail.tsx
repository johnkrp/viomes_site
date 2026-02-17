import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import catalogData from "@/data/products-grouped.json";
import oraLeftPhoto from "@/data/ora-left-placeholder.svg";
import oraRightPhoto from "@/data/ora-page87-right.jpg";
import { resolveSwatchBackground } from "@/lib/colorSwatch";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const products = (catalogData as { products: GroupedProduct[] }).products;

const parseVariantSpecs = (description: string) => {
  const text = description || "";
  const litersMatch = text.match(/(\d+(?:[.,]\d+)?)\s*lt/i);
  const dimensionsMatch = text.match(/([dDØΦ]?\s*[\d.,]+\s*x\s*[hH]?[\d.,]+(?:\s*x\s*[hH]?[\d.,]+)?)/i);
  const packageMatch = text.match(/(\d+\s*\/\s*\d+)/);

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
    packageInfo: packageMatch ? packageMatch[1].replace(/\s+/g, "") : "-",
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const product = useMemo(() => products.find((entry) => entry.id === id), [id]);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

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

  const isOraFamily = product.title.toLowerCase().includes("ora");

  const sizeRows = product.sizes.map((size) => {
    const preview = size.variants[0];
    const specs = parseVariantSpecs(preview?.description || "");

    return {
      sizeCode: size.size_code || size.size_label,
      dimensions: specs.dimensions,
      liters: specs.liters,
      packageInfo: specs.packageInfo,
    };
  });

  return (
    <div className="pt-24 pb-10 min-h-screen bg-background">
      <div className={cn(isOraFamily ? "mx-auto w-full max-w-none px-2 md:px-4 xl:px-6" : "container mx-auto px-6")}>
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

        {isOraFamily ? (
          <section className="mx-auto w-full grid grid-cols-1 xl:grid-cols-[minmax(640px,1.2fr)_minmax(520px,1fr)_380px] gap-8 xl:gap-12 items-start">
            <div className="hidden xl:block pt-2">
              <div className="bg-white/45 p-4 xl:p-5 h-[840px]">
                <img
                  src={oraLeftPhoto}
                  alt="ORA λεκάνες παρουσίασης"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-8 xl:pt-10">
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-end gap-6">
                  <img
                    src={selectedVariant?.image_url || product.representative_image}
                    alt={product.title}
                    className="h-[130px] w-[170px] object-contain mix-blend-multiply"
                  />
                  <div className="pb-1">
                    <h1 className="text-[46px] leading-none font-semibold text-foreground/95">ORA Round Basin</h1>
                    <p className="mt-2 text-[31px] leading-tight text-foreground/85">ORA λεκάνη στρογγυλή</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-1">
                  {selectedSize?.variants.map((variant, index) => (
                    <button
                      key={`${variant.code}-${variant.color}`}
                      type="button"
                      onClick={() => setSelectedColorIndex(index)}
                      className={cn(
                        "h-11 min-w-11 px-2.5 border text-[17px] leading-none transition-all",
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

              <div className="mt-5 bg-[#d7d7da] px-8 xl:px-10 py-5 xl:py-6">
                <table className="w-full text-[21px] text-foreground/85">
                  <thead>
                    <tr className="text-[16px] italic text-foreground/75">
                      <th className="text-left font-medium pb-2">article code</th>
                      <th className="text-left font-medium pb-2">dimensions</th>
                      <th className="text-left font-medium pb-2">liter</th>
                      <th className="text-left font-medium pb-2">pack</th>
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

              <div className="mt-4 text-[20px] leading-tight text-foreground/85">
                Επιλεγμένος κωδικός: <span className="font-semibold">{selectedVariant?.code || "-"}</span>
              </div>

              <p className="mt-5 text-[21px] leading-[1.35] text-foreground/70 max-w-[980px]">
                Λεκάνες στρογγυλές ORA με καινοτόμο σχεδιασμό για γενική χρήση. Με ένδειξη χωρητικότητας.
                <br />
                Round ORA basins with innovative design for general use. With capacity indication.
              </p>
            </div>

            <div className="pt-4 xl:pt-0">
              <img src={oraRightPhoto} alt="ORA λεκάνη σε χρήση" className="w-full h-[840px] object-cover" />
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="rounded-md border border-border bg-background/70 p-8">
              <img
                src={selectedVariant?.image_url || product.representative_image}
                alt={product.title}
                className="w-full h-[420px] object-contain mix-blend-multiply"
              />
            </div>

            <div>
              <h1 className="text-4xl font-black tracking-tight mb-4">{product.title}</h1>

              <p className="text-foreground/80 leading-relaxed">
                {selectedVariant?.description || "Δεν υπάρχει περιγραφή παραλλαγής."}
              </p>

              {product.sizes.length > 1 ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70 mb-3">
                    Επιλογή μεγέθους
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={size.size_label}
                        type="button"
                        onClick={() => onSelectSize(index)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition-colors",
                          safeSizeIndex === index
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent border-border hover:border-accent",
                        )}
                      >
                        {size.size_code || size.size_label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70 mb-3">
                  Επιλογή χρώματος
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSize?.variants.map((variant, index) => (
                    <button
                      key={`${variant.code}-${variant.color}`}
                      type="button"
                      onClick={() => setSelectedColorIndex(index)}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-all",
                        safeColorIndex === index ? "border-primary scale-105" : "border-border",
                      )}
                      style={{ background: resolveSwatchBackground(variant.color) }}
                      title={`${variant.color} (${variant.code})`}
                      aria-label={`${variant.color} (${variant.code})`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-md border border-border p-4 bg-card">
                <p className="text-sm text-muted-foreground">Επιλεγμένος κωδικός</p>
                <p className="text-lg font-semibold">{selectedVariant?.code}</p>
                <p className="mt-2 text-sm text-muted-foreground">Χρώμα: {selectedVariant?.color || "-"}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
