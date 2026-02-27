import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { topProducts } from "./homeData";

const desktopCategoryImageLayouts = [
  "top-[4vh] left-[2%] h-[58vh] w-[72%]",
  "top-[10vh] left-[22%] h-[62vh] w-[74%]",
  "top-[16vh] left-[8%] h-[56vh] w-[68%]",
];

const TopProductsSection = () => {
  const [categoryRevealProgress, setCategoryRevealProgress] = useState<number[]>(
    () => topProducts.map(() => 0),
  );
  const categoryTriggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number | null = null;

    const updateCategoryProgress = () => {
      const revealDistance = window.innerHeight * 0.85;
      const next = topProducts.map((_, index) => {
        const trigger = categoryTriggerRefs.current[index];
        if (!trigger) {
          return 0;
        }

        const rect = trigger.getBoundingClientRect();
        const firstItemLead = index === 0 ? window.innerHeight * 0.18 : 0;
        const progress = (revealDistance + firstItemLead - rect.top) / revealDistance;
        return Math.max(0, Math.min(1, progress));
      });

      setCategoryRevealProgress(next);
      rafId = null;
    };

    const scheduleUpdate = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(updateCategoryProgress);
    };

    updateCategoryProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const activeCategoryIndex = categoryRevealProgress.reduce((active, progress, index) => {
    if (progress > 0.45) {
      return index;
    }

    return active;
  }, 0);

  return (
    <section className="bg-background pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-28" id="top-products">
      <div className="px-4 sm:px-6 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:hidden">
            <div className="px-1">
              <h3 className="font-heading text-2xl font-black leading-tight text-foreground">
                Κορυφαία Προϊόντα
              </h3>
            </div>
            {topProducts.map((cat, i) => (
              <Link
                key={`mobile-top-product-${i}`}
                to={cat.href}
                className="group block w-full text-foreground"
              >
                <div className="relative h-[18rem] overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pt-4">
                  <span className="mb-1 block text-xs text-foreground/70">Κορυφαίο Προϊόν</span>
                  <h4 className="mb-1 font-heading text-lg font-bold text-foreground">
                    {cat.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div className="sticky top-[12vh] flex h-[78vh] min-h-[42rem] items-center p-2">
              <div>
                <h3 className="font-heading text-4xl font-black leading-tight text-foreground">
                  Κορυφαία Προϊόντα
                </h3>
                <p className="mt-3 text-xl font-medium text-foreground/75">
                  {topProducts[activeCategoryIndex].title}
                </p>
                <Link
                  to={topProducts[activeCategoryIndex].href}
                  className="mt-6 inline-flex text-sm font-semibold text-accent transition hover:text-accent/80"
                >
                  Δείτε προϊόν
                </Link>
              </div>
            </div>

            <div className="relative">
              <Link
                to={topProducts[activeCategoryIndex].href}
                className="group sticky top-[10vh] block h-[84vh]"
              >
                <div className="relative h-full overflow-visible">
                  {topProducts.map((cat, i) => {
                    const progress = categoryRevealProgress[i];
                    const translatePercent = (1 - progress) * 120;
                    const layoutClass =
                      desktopCategoryImageLayouts[i % desktopCategoryImageLayouts.length];

                    return (
                      <img
                        key={`desktop-scatter-layer-${i}`}
                        src={cat.image}
                        alt={cat.title}
                        className={`absolute object-cover transition-transform duration-200 ease-linear group-hover:scale-[1.02] ${layoutClass}`}
                        style={{
                          transform: `translateY(${translatePercent}%)`,
                          opacity: progress <= 0.02 ? 0 : 1,
                          zIndex: i + 1,
                        }}
                      />
                    );
                  })}
                </div>
              </Link>

              <div className="pointer-events-none pt-[26vh]">
                {topProducts.map((cat, i) => (
                  <div
                    key={`desktop-category-trigger-${i}`}
                    ref={(element) => {
                      categoryTriggerRefs.current[i] = element;
                    }}
                    className="h-[100vh]"
                    aria-hidden="true"
                  >
                    <span className="sr-only">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProductsSection;
