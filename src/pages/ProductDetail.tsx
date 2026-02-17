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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const product = useMemo(
    () => products.find((entry) => entry.id === id),
    [id],
  );

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-md border border-border bg-card p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-semibold">Product not found</h1>
            <p className="mt-2 text-muted-foreground">
              The selected product family does not exist in the grouped catalog.
            </p>
            <Link to="/products" className="inline-block mt-6">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const safeSizeIndex = Math.min(selectedSizeIndex, Math.max(product.sizes.length - 1, 0));
  const selectedSize = product.sizes[safeSizeIndex];

  const safeColorIndex = Math.min(
    selectedColorIndex,
    Math.max((selectedSize?.variants?.length || 1) - 1, 0),
  );
  const selectedVariant = selectedSize?.variants?.[safeColorIndex] || selectedSize?.variants?.[0];

  const onSelectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedColorIndex(0);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <Breadcrumb className="mb-8 text-sm text-foreground/70">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
              {selectedVariant?.description || "No variant description available."}
            </p>

            {product.sizes.length > 1 ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70 mb-3">
                  Select size
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
                Select color
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
              <p className="text-sm text-muted-foreground">Selected code</p>
              <p className="text-lg font-semibold">{selectedVariant?.code}</p>
              <p className="mt-2 text-sm text-muted-foreground">Color: {selectedVariant?.color || "-"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
