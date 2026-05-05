import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesShowcaseSection = () => {
  type CategoryTile = {
    title: string;
    description: string;
    image: string;
    href: string;
  };

  const categories: CategoryTile[] = [
    {
      title: "Μπάνιο",
      description: "Πρακτικές λύσεις οργάνωσης για καθημερινή χρήση.",
      image: "https://viomes.gr/images/hero/categories/ΜΠΑΝΙΟ.png",
      href: "/products?category=Μπάνιο",
    },
    {
      title: "Κουζίνα",
      description: "Ανθεκτικά είδη κουζίνας και αποθήκευσης.",
      image: "https://viomes.gr/images/hero/categories/ΚΟΥΖΙΝΑ_2.png",
      href: "/products?category=Κουζίνα",
    },
    {
      title: "Κήπος",
      description: "Γλάστρες και λύσεις για εσωτερικούς ή εξωτερικούς χώρους.",
      image: "https://viomes.gr/images/hero/categories/ΚΗΠΟΣ.png",
      href: "/products?category=Κήπος",
    },
    {
      title: "Καθαριότητα",
      description: "Εξοπλισμός για οικιακή και επαγγελματική φροντίδα.",
      image: "https://viomes.gr/images/hero/categories/ΚΑΘΑΡΙΟΤΗΤΑ_1.png",
      href: "/products?category=Καθαριότητα",
    },
  ] as const;

  return (
    <section
      className="mt-16 scroll-mt-24 bg-background pt-12 sm:mt-20 sm:pt-14 lg:mt-0 lg:h-[100svh] lg:pt-0"
      id="categories"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-4 sm:mb-4 lg:mb-4">
            <h2 className="font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-6xl">
              Κατηγορίες
            </h2>
          </div>

          <div className="mb-4 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between lg:mb-4">
            <p className="max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Ανακαλύψτε λύσεις για κάθε χώρο, από το σπίτι και τον κήπο μέχρι
              επαγγελματικές εφαρμογές, με έμφαση στην αντοχή και τον σύγχρονο
              σχεδιασμό.
            </p>
            <Link
              to="/products"
              className="inline-flex h-12 items-center gap-2 border border-foreground bg-foreground px-6 text-sm font-semibold tracking-[0.06em] text-background transition-colors hover:bg-background hover:text-foreground"
            >
              Δείτε όλα
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-0 md:grid-cols-6 md:auto-rows-[14rem] lg:h-[calc(100svh-15rem)] lg:grid-rows-2 lg:auto-rows-fr">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                to={category.href}
                className={`group relative min-h-[14rem] overflow-hidden border border-border/70 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[16rem] md:min-h-0 ${
                  index === 0
                    ? "md:col-span-4 md:row-span-1"
                    : index === 1
                      ? "md:col-span-2 md:row-span-1"
                      : index === 2
                        ? "md:col-span-2 md:row-span-1"
                        : index === 3
                          ? "md:col-span-4 md:row-span-1"
                          : "md:col-span-3 md:row-span-1"
                }`}
                aria-label={category.title}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/66 via-black/16 to-black/0" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6 lg:p-7">
                  <div className="max-w-[82%]">
                    <h3 className="font-heading text-3xl font-medium leading-tight opacity-90 transition-opacity duration-300 sm:text-4xl lg:text-4xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 opacity-90 transition-[max-height,opacity] duration-300 sm:text-base md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100">
                      {category.description}
                    </p>
                  </div>

                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 bg-white/12 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcaseSection;
