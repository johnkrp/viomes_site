import { Link } from "react-router-dom";

const CategoriesShowcaseSection = () => {
  type CategoryCard = {
    title: string;
    description: string;
    image: string;
    href: string;
  };

  const categories: CategoryCard[] = [
    {
      title: "Flowerpots collection",
      description: "Σχεδιασμένες για εσωτερικούς και εξωτερικούς χώρους.",
      image: "https://viomes.gr/images/homepage/categories/planters.png",
      href: "/products?category=Γλάστρες",
    },
    {
      title: "Home collection",
      description:
        "Λειτουργικά και ποιοτικά είδη για το σπίτι με ιδιαίτερο design.",
      image: "https://viomes.gr/images/homepage/categories/home_collection.png",
      href: "/products?category=Είδη%20Σπιτιού",
    },
    {
      title: "Professional collection",
      description:
        "Ανθεκτικές λύσεις για επαγγελματική χρήση, για ολους τους χώρους.",
      image: "https://viomes.gr/images/homepage/categories/professional.png",
      href: "/products?category=Επαγγελματικός%20Εξοπλισμός",
    },
  ] as const;

  // Responsive staggered offsets: smaller on mobile, increase with screen size
  const offsets = [
    "top-0",
    "top-4 sm:top-8 md:top-12 lg:top-16",
    "top-2 sm:top-4 md:top-6 lg:top-8",
  ];

  return (
    <section
      className="bg-[hsl(var(--viomes-bg))]"
      style={{
        paddingTop: "clamp(3rem, 4.8vw, 7rem)",
        paddingBottom: "clamp(3rem, 5.2vw, 8rem)",
      }}
      id="categories"
    >
      <div
        className="w-full"
        style={{
          paddingLeft: "clamp(1rem, 2vw, 3.5rem)",
          paddingRight: "clamp(1rem, 100vw, 32rem)",
        }}
      >
        <div className="mx-auto w-full">
          {/* Desktop stage with fixed aspect ratio - hidden on small screens */}
          <div className="hidden lg:block">
            <div className="mx-auto w-full max-w-[1900px] overflow-visible aspect-[16/7]">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex gap-4 xl:gap-8">
                  {categories.slice(0, 3).map((card, idx) => {
                    const verticalOffsets = ["0px", "45px", "-35px"];

                    return (
                      <Link
                        key={card.title}
                        to={card.href}
                        className="group relative flex-1 transition-all duration-300"
                        style={{
                          animationDelay: `${idx * 120}ms`,
                          transform: `translateY(${verticalOffsets[idx]})`,
                        }}
                      >
                        <div className="viomes-animate-card h-full flex flex-col overflow-hidden bg-[hsl(var(--accent))] text-[hsl(var(--viomes-light))] transition-shadow duration-300 ease-out group-hover:shadow-lg">
                          {/* Image: 2/3 of card height */}
                          <div className="h-2/3 overflow-hidden bg-[hsl(var(--viomes-bg))]">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          {/* Text: 1/3 of card height */}
                          <div
                            className="h-1/3 flex flex-col justify-between px-6 pt-6 pb-3"
                            style={{ containerType: "inline-size" }}
                          >
                            <h3
                              className="font-heading font-medium leading-tight transition-opacity duration-300 group-hover:opacity-100 opacity-95"
                              style={{
                                fontSize: "clamp(1.15rem, 7.9cqw, 4.95rem)",
                              }}
                            >
                              {card.title}
                            </h3>

                            <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:-translate-y-4">
                              <p
                                className="max-w-md leading-relaxed text-[hsl(var(--viomes-light))]/85"
                                style={{
                                  fontSize: "clamp(0.72rem, 3.4cqw, 1.2rem)",
                                }}
                              >
                                {card.description}
                              </p>
                              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[hsl(var(--viomes-light))] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Περισσότερα
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / tablet fallback: stacked cards (kept for small screens) */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 md:flex-row md:items-start">
              {categories.map((card, idx) => (
                <Link
                  key={card.title}
                  to={card.href}
                  className={`group relative flex-1 transition-all duration-300 ${offsets[idx]}`}
                >
                  <div
                    className={`viomes-animate-card flex min-h-[280px] flex-col overflow-hidden sm:min-h-[360px] md:min-h-[420px] lg:min-h-[520px] text-[hsl(var(--viomes-light))] transition-all duration-300 ease-out group-hover:shadow-lg bg-[hsl(var(--accent))]`}
                    style={{ animationDelay: `${idx * 120}ms` }}
                  >
                    <div className="h-[55%] overflow-hidden bg-[hsl(var(--viomes-bg))] sm:h-[60%]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex h-[45%] flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-7 sm:h-[40%]">
                      <div className="space-y-2 sm:space-y-3">
                        <h3
                          className="font-heading font-medium leading-tight transition-opacity duration-300 group-hover:opacity-100 opacity-95"
                          style={{
                            fontSize: "var(--type-category-mobile-title)",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="max-w-md leading-relaxed text-[hsl(var(--viomes-light))]/80 transition-opacity duration-300 group-hover:text-[hsl(var(--viomes-light))]/95"
                          style={{
                            fontSize: "var(--type-category-mobile-copy)",
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-[hsl(var(--viomes-light))] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Περισσότερα
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcaseSection;
