import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Expand,
  X,
} from "lucide-react";
import { type TouchEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const heroImages = [
  "/images/AND_6099.JPG",
  "/images/DSC_3421.JPG",
  "/images/hero-new-01.png",
  "/images/V-517.JPG",
];

const categories = [
  {
    title: "Είδη Σπιτιού",
    en: "Home Items",
    image: "/images/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/eidi-spitioy",
  },
  {
    title: "Γλάστρες",
    en: "Planters",
    image: "/images/AND_6053.JPG",
    href: "/products/glastres",
  },
  {
    title: "Επαγγελματικός Εξοπλισμός",
    en: "Professional Equipment",
    image: "/images/ΚΑΔΟΙ.JPG",
    href: "/products/epaggelmatikos-eksoplismos",
  },
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

    // Only trigger carousel navigation for clear horizontal gestures.
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
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background pt-20 lg:h-screen lg:pt-0">
        <div className="relative z-10 flex h-full w-full flex-col justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12 lg:py-0">
          <div className="text-foreground">
            <span className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-bold rounded-full mb-6 tracking-wider uppercase animate-slide-up">
              Est. 1978 | EU Manufacturing
            </span>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-7xl mb-6 animate-slide-up [animation-delay:100ms]">
              Πλαστικά Προϊόντα Υψηλής Ποιότητας.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-foreground/70 sm:text-lg mb-8 lg:mb-10 animate-slide-up [animation-delay:200ms]">
              Κορυφαίες λύσεις για το σπίτι και τη βιομηχανία. Σχεδιάζουμε και
              παράγουμε στην Ελλάδα με σεβασμό στο περιβάλλον.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Link to="/products">
                <Button
                  size="lg"
                  className="group h-11 rounded-full bg-accent px-6 text-base text-white hover:bg-accent/90 sm:h-12 sm:px-8 sm:text-lg"
                >
                  Προϊόντα
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-2 border-accent bg-white px-6 text-base font-semibold text-accent hover:bg-accent/5 sm:h-12 sm:px-8 sm:text-lg"
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
                  style={{
                    animation: `fadeInScale 0.8s ease-in-out forwards`,
                  }}
                />
                <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
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

        {/* Image - Right Side with controls underneath */}
        <div className="hidden lg:flex absolute right-0 top-20 bottom-12 w-1/2 flex-col">
          <div className="min-h-0 flex-1 overflow-hidden bg-muted rounded-bl-[5px]">
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
                className="h-full w-full object-cover animate-fade-in transition-all duration-1000 ease-in-out group-hover:scale-105"
                style={{
                  animation: `fadeInScale 0.8s ease-in-out forwards`,
                }}
              />
              <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
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

      {/* Category Tiles */}
      <section className="bg-background py-14 sm:py-16 lg:py-24" id="products">
        <div className="px-4 sm:px-6 lg:px-20">
          <div>
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:hidden">
              {categories.map((cat, i) => (
                <Link
                  key={`mobile-category-${i}`}
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
                    <span className="mb-1 block text-xs text-foreground/70">
                      {cat.en}
                    </span>
                    <h4 className="mb-1 text-xl font-bold text-foreground font-heading">
                      {cat.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="mx-auto hidden w-full max-w-7xl md:block"
            >
              <CarouselContent className="ml-0 sm:ml-2 lg:ml-5">
                {categories.map((cat, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-3 sm:pl-4 lg:pl-5 md:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      to={cat.href}
                      className="group block w-full text-foreground"
                    >
                      <div className="relative h-[18rem] overflow-hidden rounded-lg shadow-sm sm:h-[22rem] lg:h-[30rem]">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-1 pt-4">
                        <span className="text-xs text-foreground/70 block mb-1">
                          {cat.en}
                        </span>
                        <h4 className="font-heading font-bold text-xl text-foreground mb-1">
                          {cat.title}
                        </h4>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Sustainability Section (swapped sides) */}
      <section className="relative overflow-hidden bg-background py-14 text-foreground sm:py-16 lg:py-24">
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 sm:px-6 lg:flex-row lg:gap-10 lg:px-12">
          {/* Image on the left for large screens */}
          <div className="mb-8 w-full shrink-0 lg:mb-0 lg:w-[54%]">
            <div className="relative h-56 w-full overflow-hidden rounded-xl shadow-lg sm:h-72 lg:h-[400px]">
              <img
                src="/images/circular-economy.jpg"
                alt="Sustainability"
                className="w-full h-full object-cover"
                style={{ opacity: 0.9 }}
              />
              <div className="absolute inset-0 bg-secondary opacity-10" />
            </div>
          </div>
          {/* Text on the right */}
          <div className="w-full max-w-none lg:w-[46%]">
            <h2 className="mb-5 text-3xl font-black sm:text-4xl">Βιωσιμότητα & Ευθύνη</h2>
            <p className="mb-7 text-base leading-relaxed text-foreground/70 sm:text-lg">
              Στην VIOMES, η παραγωγή μας ευθυγραμμίζεται με τις αρχές της
              κυκλικής οικονομίας. Χρησιμοποιούμε ανακυκλωμένα υλικά και
              βελτιστοποιούμε τις διαδικασίες μας για την ελαχιστοποίηση του
              περιβαλλοντικού αποτυπώματος.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">100% Ανακυκλώσιμα Υλικά</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Εξοικονόμηση Ενέργειας</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Μηδενικά Απόβλητα</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6" />
                <span className="font-medium">Πιστοποίηση ISO 14001</span>
              </div>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-12 font-bold uppercase tracking-widest text-xs shadow-sm">
              Μάθετε περισσότερα
            </Button>
          </div>
        </div>
      </section>

      {/* News / Blog Section */}
      <section className="bg-primary py-14 text-primary-foreground sm:py-16 lg:py-24" id="news">
        <div className="px-4 sm:px-6 lg:px-20">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">
                Νέα & Άρθρα
              </h2>
              <p className="text-primary-foreground/80">
                Τελευταίες ειδήσεις από την VIOMES
              </p>
            </div>
            <Button variant="link" className="text-primary-foreground font-bold">
              Δείτε όλα
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/** Sample posts rendered; replace with CMS data when available */}
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
                excerpt:
                  "Συμβουλές για σωστή διαχείριση και ανακύκλωση προϊόντων στο σπίτι.",
                image:
                  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
              },
            ].map((post, i) => (
              <article
                key={i}
                className="group border rounded-xl overflow-hidden bg-background text-foreground hover:shadow-md transition-all"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="text-accent font-semibold p-0"
                  >
                    Διαβάστε περισσότερα →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Removed Featured Products and duplicate Sustainability section per request */}

      {isHeroLightboxOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={() => setIsHeroLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Μεγέθυνση εικόνας hero"
        >
          <button
            type="button"
            onClick={() => setIsHeroLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
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


