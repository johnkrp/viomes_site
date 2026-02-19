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
import {
  PROFESSIONAL_SUBCATEGORIES,
  resolveSiteCategories,
} from "@/lib/productCategories";
import { resolveSwatchBackground } from "@/lib/colorSwatch";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type Variant = {
  code: string;
  description: string;
  color: string;
  image_url: string;
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

const professionalProducts = products.filter((product) =>
  resolveSiteCategories(product).includes("Επαγγελματικός Εξοπλισμός"),
);

const previewProducts = professionalProducts.slice(0, 6);
const totalVariants = professionalProducts.reduce(
  (sum, product) => sum + product.variants_count,
  0,
);
const totalSizes = professionalProducts.reduce(
  (sum, product) => sum + product.sizes_count,
  0,
);

const getFamilyColors = (product: GroupedProduct) => {
  const unique = new Set<string>();
  product.sizes.forEach((size) => {
    size.variants.forEach((variant) => {
      const color = (variant.color || "").trim();
      if (color && color.toLowerCase() !== "nan") unique.add(color);
    });
  });
  return Array.from(unique);
};

const CategoryProfessional = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d7dbde] via-[#e7eaed] to-[#f4f6f7] pt-32 pb-16">
      <section className="relative overflow-hidden">
        <img
          src="/images/ΚΑΔΟΙ.JPG"
          alt="Επαγγελματικός Εξοπλισμός"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b2229]/80 via-[#1b2229]/50 to-[#1b2229]/10" />
        <div className="relative container mx-auto px-6 py-14 md:py-20">
          <Breadcrumb className="text-sm text-white/80">
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
                <BreadcrumbPage>Επαγγελματικός Εξοπλισμός</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Line
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
            Επαγγελματικός Εξοπλισμός
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Λύσεις υψηλής αντοχής για επαγγελματικούς χώρους με καθαρές φόρμες,
            εργονομία και σταθερή απόδοση στην καθημερινή χρήση.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-white">
            <StatInline label="Οικογένειες" value={`${professionalProducts.length}`} />
            <StatInline label="Μεγέθη" value={`${totalSizes}`} />
            <StatInline label="Κωδικοί" value={`${totalVariants}`} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-black text-[#1f2730] md:text-4xl">
              Κατηγορίες Επαγγελματικού Εξοπλισμού
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base">
              Βασικές ομάδες προϊόντων για επαγγελματικά περιβάλλοντα όπου η
              αξιοπιστία και η πρακτικότητα είναι προτεραιότητα.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-2 border-l border-black/15 pl-5 sm:gap-y-3 md:pl-7">
            {PROFESSIONAL_SUBCATEGORIES.map((subcategory) => (
              <p
                key={subcategory}
                className="text-sm font-medium leading-relaxed text-[#313942] md:text-base"
              >
                {subcategory}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <img
            src="/images/AND_6099.JPG"
            alt="Επαγγελματικές εφαρμογές"
            className="h-64 w-full object-cover md:h-[23rem]"
          />
          <div className="flex h-64 flex-col justify-end bg-[#c9d0d6] px-6 py-6 md:h-[23rem] md:px-8">
            <p className="text-sm leading-relaxed text-[#273038] md:text-base">
              Κάδοι, εξοπλισμός τουαλέτας και σκεύη καθαρισμού σχεδιασμένα για
              έντονη χρήση, εύκολη συντήρηση και επαγγελματική εικόνα.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black text-[#1f2730] md:text-4xl">
            Επιλεγμένες Οικογένειες
          </h2>
          <Link
            to={`/products?category=${encodeURIComponent("Επαγγελματικός Εξοπλισμός")}`}
            className="text-sm font-semibold text-foreground/75 hover:text-foreground"
          >
            Δείτε όλα
          </Link>
        </div>

        <div className="space-y-6">
          {previewProducts.map((product, index) => {
            const colors = getFamilyColors(product).slice(0, 10);
            const isReversed = index % 2 === 1;

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={cn(
                  "group grid gap-5 border-t border-black/15 py-5 md:grid-cols-2 md:gap-10",
                  isReversed && "md:[&>div:first-child]:order-2",
                )}
              >
                <div className="h-52 overflow-hidden md:h-64">
                  <img
                    src={product.representative_image}
                    alt={product.title}
                    className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold leading-tight text-[#1f2730] md:text-3xl">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 md:text-base">
                    {product.sizes_count} μεγέθη • {product.variants_count}{" "}
                    χρώματα/κωδικοί
                  </p>
                  <div className="mt-4 flex items-center gap-1.5">
                    {colors.map((color) => (
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

        <div className="mt-10 flex justify-center">
          <Link
            to={`/products?category=${encodeURIComponent("Επαγγελματικός Εξοπλισμός")}`}
          >
            <Button className="h-12 rounded-full px-7 text-sm font-semibold">
              Όλος ο Επαγγελματικός Εξοπλισμός
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

type StatInlineProps = {
  label: string;
  value: string;
};

const StatInline = ({ label, value }: StatInlineProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-black md:text-4xl">{value}</span>
    <span className="text-xs uppercase tracking-[0.14em] text-white/80">
      {label}
    </span>
  </div>
);

export default CategoryProfessional;
