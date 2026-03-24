import { Link } from "react-router-dom";

import { topProducts } from "./homeData";

const TopProductsSection = () => {
  return (
    <section
      className="mt-14 bg-background pt-10 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-14"
      id="top-products"
    >
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1800px]">
          <div className="mb-10 flex items-end justify-between gap-4 sm:mb-12">
            <h3 className="font-heading text-5xl font-medium leading-none text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Νέες Αφίξεις
            </h3>
            <Link
              to="/products"
              className="pb-3 text-xs font-medium uppercase tracking-wide text-foreground underline-offset-4 transition hover:underline sm:text-sm"
            >
              Δείτε Όλα
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-12">
            {topProducts.map((product, index) => (
              <Link
                key={`simple-top-product-${index}`}
                to={product.href}
                className="group block text-foreground"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/60 lg:aspect-[1.24/1]">
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground sm:text-xs">
                    Βιώσιμο
                  </span>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-4 lg:pt-5">
                  <h4 className="text-[1.75rem] font-medium leading-tight text-foreground sm:text-[2rem] lg:text-[2.2rem]">
                    {product.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProductsSection;
