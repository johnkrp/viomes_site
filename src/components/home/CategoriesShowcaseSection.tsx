import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesShowcaseSection = () => {
  type CategoryTile = {
    title: string;
    image: string;
    href: string;
    featured?: boolean;
  };

  const categories: CategoryTile[] = [
    {
      title: "Μπάνιο",
      image: "https://viomes.gr/images/hero/categories/ΜΠΑΝΙΟ.png",
      href: "/products/eidi-spitioy",
      featured: true,
    },
    {
      title: "Κουζίνα",
      image: "https://viomes.gr/images/hero/categories/ΚΟΥΖΙΝΑ_2.png",
      href: "/products/eidi-spitioy",
    },
    {
      title: "Κήπος",
      image: "https://viomes.gr/images/hero/categories/ΚΗΠΟΣ.png",
      href: "/products/glastres",
    },
    {
      title: "Καθαριότητα",
      image: "https://viomes.gr/images/hero/categories/ΚΑΘΑΡΙΟΤΗΤΑ_1.png",
      href: "/products/epaggelmatikos-eksoplismos",
    },
    {
      title: "Κάδοι",
      image: "https://viomes.gr/images/hero/categories/ΚΑΔΟΙ_2.png",
      href: "/products/epaggelmatikos-eksoplismos",
    },
  ] as const;

  const getTileClasses = (featured?: boolean) =>
    featured
      ? "lg:col-span-4 lg:row-span-2 min-h-[36rem]"
      : "lg:col-span-4 min-h-[19rem]";

  return (
    <section
      className="mt-16 bg-background pt-12 sm:mt-20 sm:pt-14 lg:mt-24 lg:pt-16"
      id="categories"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
            <h2 className="mt-3 font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-6xl">
              Κατηγορίες
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${getTileClasses(category.featured)}`}
                aria-label={category.title}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/12 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6 lg:p-7">
                  <div className="max-w-[78%]">
                    <h3 className="font-heading text-3xl font-medium leading-tight sm:text-4xl lg:text-4xl">
                      {category.title}
                    </h3>
                  </div>

                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
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
