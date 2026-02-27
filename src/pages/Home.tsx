import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import { type TouchEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";

const heroImages = [
  "/images/AND_6099.JPG",
  "/images/DSC_3421.JPG",
  "/images/hero-new-01.png",
  "/images/V-517.JPG",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleHeroTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    const touch = event.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleHeroTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= minSwipeDistance) {
      if (deltaX > 0) {
        goToPreviousImage();
      } else {
        goToNextImage();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background pt-20 lg:h-screen lg:pt-0">
        <div className="relative z-10 flex h-full w-full flex-col justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12 lg:py-0">
          <div className="text-foreground">
            <span className="mb-6 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground animate-slide-up">
              Est. 1978 | EU Manufacturing
            </span>
            <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-foreground animate-slide-up [animation-delay:100ms] sm:text-5xl lg:text-7xl">
              Πλαστικά Προϊόντα Υψηλής Ποιότητας.
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-foreground/70 animate-slide-up [animation-delay:200ms] sm:text-lg lg:mb-10">
              Κορυφαίες λύσεις για το σπίτι και τη βιομηχανία. Σχεδιάζουμε και
              παράγουμε στην Ελλάδα με σεβασμό στο περιβάλλον.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Link to="/products">
                <Button
                  size="lg"
                  className="group h-11 rounded-full bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90 sm:h-12 sm:px-8 sm:text-lg"
                >
                  Προϊόντα
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-2 border-accent bg-background px-6 text-base font-semibold text-accent hover:bg-accent/5 sm:h-12 sm:px-8 sm:text-lg"
              >
                Ζητήστε Προσφορά
              </Button>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <div className="overflow-hidden rounded-lg bg-muted">
              <button
                type="button"
                onClick={() => setIsHeroLightboxOpen(true)}
                onTouchStart={handleHeroTouchStart}
                onTouchEnd={handleHeroTouchEnd}
                className="group relative h-[240px] w-full cursor-zoom-in sm:h-[300px]"
                aria-label="Μεγέθυνση εικόνας hero"
              >
                <img
                  key={`mobile-hero-${currentImageIndex}`}
                  src={heroImages[currentImageIndex]}
                  alt="Viomes Factory & Products"
                  className="h-full w-full object-cover"
                  style={{ animation: "fadeInScale 0.8s ease-in-out forwards" }}
                />
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background">
                  <Expand className="h-3.5 w-3.5" />
                  Zoom
                </span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPreviousImage}
                className="inline-flex h-6 w-6 items-center justify-center text-foreground/45 transition hover:text-foreground/75"
                aria-label="Προηγούμενη εικόνα"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-3">
                {heroImages.map((_, index) => {
                  const isActive = index === currentImageIndex;
                  return (
                    <button
                      key={`mobile-hero-selector-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        isActive
                          ? "w-2.5 bg-foreground/70"
                          : "w-2.5 bg-foreground/30 hover:bg-foreground/50"
                      }`}
                      aria-label={`Εικόνα ${index + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goToNextImage}
                className="inline-flex h-6 w-6 items-center justify-center text-foreground/45 transition hover:text-foreground/75"
                aria-label="Επόμενη εικόνα"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-20 bottom-12 hidden w-1/2 flex-col lg:flex">
          <div className="min-h-0 flex-1 overflow-hidden rounded-bl-[5px] bg-muted">
            <button
              type="button"
              onClick={() => setIsHeroLightboxOpen(true)}
              className="group relative h-full w-full cursor-zoom-in"
              aria-label="Μεγέθυνση εικόνας hero"
            >
              <img
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt="Viomes Factory & Products"
                className="h-full w-full animate-fade-in object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                style={{ animation: "fadeInScale 0.8s ease-in-out forwards" }}
              />
              <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background opacity-0 transition group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" />
                Zoom
              </span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goToPreviousImage}
              className="inline-flex h-6 w-6 items-center justify-center text-foreground/45 transition hover:text-foreground/75"
              aria-label="Προηγούμενη εικόνα"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-3">
              {heroImages.map((_, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <button
                    key={`hero-selector-${index}`}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive
                        ? "w-2.5 bg-foreground/70"
                        : "w-2.5 bg-foreground/30 hover:bg-foreground/50"
                    }`}
                    aria-label={`Εικόνα ${index + 1}`}
                    aria-current={isActive ? "true" : "false"}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={goToNextImage}
              className="inline-flex h-6 w-6 items-center justify-center text-foreground/45 transition hover:text-foreground/75"
              aria-label="Επόμενη εικόνα"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <CategoriesShowcaseSection />

      {/* Top Products */}
      <TopProductsSection />

      {/* Sustainability */}
      <SustainabilitySection />

      {/* News / Blog Section */}
      <section className="bg-primary py-14 text-primary-foreground sm:py-16 lg:py-24" id="news">
        <div className="px-4 sm:px-6 lg:px-20">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
                Νέα & Άρθρα
              </h2>
              <p className="text-primary-foreground/80">Τελευταίες ειδήσεις από την VIOMES</p>
            </div>
            <Button variant="link" className="font-bold text-primary-foreground">
              Δείτε όλα
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Νέα γραμμή παραγωγής με χαμηλότερο αποτύπωμα",
                date: "2026-02-01",
                excerpt:
                  "Εγκαταστήσαμε μια νέα γραμμή παραγωγής που μειώνει την κατανάλωση ενέργειας.",
                image:
                  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Συνεργασία με διεθνή εταίρο",
                date: "2026-01-15",
                excerpt: "Νέα συνεργασία για επέκταση σε ευρωπαϊκές αγορές.",
                image:
                  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Οδηγός για την ανακύκλωση πλαστικών προϊόντων",
                date: "2025-12-20",
                excerpt: "Συμβουλές για σωστή διαχείριση και ανακύκλωση προϊόντων στο σπίτι.",
                image:
                  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
              },
            ].map((post, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-xl border bg-background text-foreground transition-all hover:shadow-md"
              >
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <p className="mb-2 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <h3 className="mb-2 text-lg font-bold">{post.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Button variant="link" className="p-0 font-semibold text-accent">
                    Διαβάστε περισσότερα →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isHeroLightboxOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={() => setIsHeroLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Μεγέθυνση εικόνας hero"
        >
          <button
            type="button"
            onClick={() => setIsHeroLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-background/10 p-2 text-background hover:bg-background/20"
            aria-label="Κλείσιμο"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={heroImages[currentImageIndex]}
            alt="Μεγεθυμένη εικόνα hero"
            className="max-h-[92vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
