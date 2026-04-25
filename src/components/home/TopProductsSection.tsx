import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { topProducts } from "./homeData";

const isFigmaCaptureMode =
  typeof window !== "undefined" &&
  window.location.hash.includes("figmacapture=");

const TopProductsSection = () => {
  const accentByBadge: Record<string, string> = {
    Recycled: "#4A7C59",
    "Heavy-Duty": "#7F8A80",
    New: "#B0894F",
  };

  const descriptionByTitle: Record<string, string> = {
    "Κάδος Αποθήκευσης":
      "Στιβαρός σχεδιασμός για οργανωμένη αποθήκευση σε επαγγελματικούς και οικιακούς χώρους.",
    "Γλάστρα Urban":
      "Μοντέρνα φόρμα με αντοχή σε εξωτερικές συνθήκες, ιδανική για σύγχρονες πράσινες συνθέσεις.",
    "Σετ Ειδών Σπιτιού":
      "Καθημερινά αντικείμενα με εργονομία και ανθεκτικότητα, σχεδιασμένα για υψηλή συχνότητα χρήσης.",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slideDurationMs = 6000;
  const transitionDurationMs = 800;

  const goToSlide = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (index < 0 || index >= topProducts.length) return;
      if (isTransitioning || index === currentIndex) return;

      setDirection(dir || (index > currentIndex ? "next" : "prev"));
      setIsTransitioning(true);

      window.setTimeout(() => {
        setCurrentIndex(index);
        window.setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, transitionDurationMs / 2);
    },
    [currentIndex, isTransitioning],
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % topProducts.length;
    goToSlide(nextIndex, "next");
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + topProducts.length) % topProducts.length;
    goToSlide(prevIndex, "prev");
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isFigmaCaptureMode) {
      return;
    }

    if (isPaused) return;

    const autoTimer = window.setInterval(() => {
      goNext();
    }, slideDurationMs);

    return () => {
      window.clearInterval(autoTimer);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 60) return;
    if (diff > 0) goNext();
    else goPrev();
  };

  const currentProduct = topProducts[currentIndex];
  const currentAccent = accentByBadge[currentProduct.badge] ?? "#4A7C59";

  return (
    <section
      className="mt-14 bg-background pt-10 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-14"
      id="top-products"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto w-full max-w-[1320px]">
          <div
            className="relative min-h-[700px] overflow-hidden py-1 sm:min-h-[760px] sm:py-2 lg:min-h-[680px] xl:min-h-[740px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${currentAccent}2b 0%, transparent 70%)`,
              }}
            />

            <div className="grid h-full gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-10">
              <div className="relative flex min-h-[330px] flex-col justify-center pb-20 sm:min-h-[420px] sm:pb-24 lg:min-h-full lg:pb-28">
                <div
                  className={`transition-all duration-700 ease-out ${
                    isTransitioning
                      ? direction === "next"
                        ? "translate-y-3 opacity-0"
                        : "-translate-y-3 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  <div className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(topProducts.length).padStart(2, "0")}
                  </div>

                  <h4 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                    {currentProduct.title}
                  </h4>

                  <p
                    className="mt-3 inline-flex py-1 text-xs font-bold uppercase tracking-[0.18em]"
                    style={{
                      color: currentAccent,
                    }}
                  >
                    {currentProduct.featuredItems.join(" • ")}
                  </p>

                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/75 sm:text-base">
                    {descriptionByTitle[currentProduct.title] ??
                      "Ανακαλύψτε τη νέα συλλογή προϊόντων VIOMES με έμφαση στην αντοχή, τη χρηστικότητα και τον σύγχρονο σχεδιασμό."}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted/60 text-foreground transition hover:bg-muted"
                    aria-label="Προηγούμενο προϊόν"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted/60 text-foreground transition hover:bg-muted"
                    aria-label="Επόμενο προϊόν"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to={currentProduct.href}
                    className="ml-2 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground transition hover:bg-accent/90 sm:text-sm"
                  >
                    Δείτε Προϊόν
                  </Link>
                </div>
              </div>

              <Link
                to={currentProduct.href}
                className={`group relative block h-[330px] overflow-hidden bg-muted transition-all duration-700 ease-out sm:h-[420px] lg:h-full ${
                  isTransitioning
                    ? direction === "next"
                      ? "translate-x-2 scale-[1.02] opacity-0"
                      : "-translate-x-2 scale-[1.02] opacity-0"
                    : "translate-x-0 scale-100 opacity-100"
                }`}
              >
                <img
                  key={`${currentProduct.title}-${currentIndex}`}
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${currentAccent}30 0%, transparent 55%)`,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2"
                  style={{ borderColor: `${currentAccent}cc` }}
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2"
                  style={{ borderColor: `${currentAccent}cc` }}
                />
              </Link>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-3">
              {topProducts.map((product, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={`top-product-progress-${product.title}`}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="text-left"
                    aria-label={`Μετάβαση στο ${product.title}`}
                  >
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/15">
                      <div
                        className={`h-full w-full rounded-full transition-colors duration-300 ${isActive ? "bg-accent" : "bg-foreground/30"}`}
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium text-foreground/70 sm:text-sm">
                      {product.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProductsSection;
