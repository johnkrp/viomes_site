import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { MouseEvent, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";

const heroSlides = [
  {
    title: "Κάδος Cubo",
    description: "Μοντέρνος & για κάθε χώρο!",
    cta: "Ανακαλύψτε τον",
    href: "/products/1890",
    image: "https://viomes.gr/images/hero/3500x1750_1.png",
  },
  {
    title: "Linea",
    description: "Διαχρονική ζαρντινιέρα με κυκλαδίτικο αέρα!",
    cta: "Ανακαλύψτε τη",
    href: "/products/2780",
    image: "https://viomes.gr/images/hero/3500x1750_2.png",
  },
];

const latestNews = [
  {
    title: "Νέα γραμμή παραγωγής με χαμηλότερο αποτύπωμα",
    date: "2026-02-01",
    category: "Παραγωγή",
    excerpt:
      "Εγκαταστήσαμε μια νέα γραμμή παραγωγής που μειώνει σημαντικά την κατανάλωση ενέργειας.",
    image: "/images/AND_6099.JPG",
  },
  {
    title: "Συνεργασία με διεθνή εταίρο",
    date: "2026-01-15",
    category: "Εξαγωγές",
    excerpt:
      "Νέα συνεργασία για επέκταση σε ευρωπαϊκές αγορές με έμφαση στη βιωσιμότητα.",
    image: "/images/DSC_3421.JPG",
  },
  {
    title: "Οδηγός για την ανακύκλωση πλαστικών προϊόντων",
    date: "2025-12-20",
    category: "Βιωσιμότητα",
    excerpt:
      "Πρακτικές συμβουλές για σωστή διαχείριση και ανακύκλωση προϊόντων στο σπίτι.",
    image: "/images/circular-economy.jpg",
  },
];

// Section-relative geometry (all values are % of the brand section canvas).
// Example: main from 5% to 40% means left edge at 5% and right edge at 40%.
const brandSectionGeometry = {
  main: { from: 1, to: 50, top: 1 },
  center: {
    logo: { left: 50, top: 50, width: 14 },
    text: { left: 58, top: 8, width: 20 },
    designedBy: { left: 66, top: 74, width: 10 },
  },
  secondary: { from: 76, to: 95, top: 15 },
};

// Crop tuning only (no frame position offsets here).
const brandSectionCrop = {
  main: { focalX: 46, focalY: 52, zoom: 1.04 },
  secondary: { focalX: 52, focalY: 48, zoom: 1.03 },
};

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [brandImageRatios, setBrandImageRatios] = useState<{
    main: string;
    secondary: string;
  }>({
    main: "4 / 3",
    secondary: "3 / 4",
  });

  const handleBrandImageLoad =
    (key: "main" | "secondary") =>
    (event: SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      if (!naturalWidth || !naturalHeight) return;

      setBrandImageRatios((prev) => ({
        ...prev,
        [key]: `${naturalWidth} / ${naturalHeight}`,
      }));
    };

  const scrollToCategories = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const categoriesSection = document.getElementById("categories");
    if (!categoriesSection) return;

    const sectionRect = categoriesSection.getBoundingClientRect();
    const viewportCenterOffset = (window.innerHeight - sectionRect.height) / 2;
    const targetOffset = Math.max(24, viewportCenterOffset);
    const startY = window.scrollY;
    const targetY = Math.max(0, startY + sectionRect.top - targetOffset);

    const distance = targetY - startY;
    const duration = 900;
    const swing = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * swing(progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[100svh] overflow-hidden bg-[#f0ede7]">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translate3d(-${currentImageIndex * 100}%, 0, 0)`,
          }}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.image} className="relative h-full w-full flex-none">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{
                  animation:
                    index === currentImageIndex
                      ? "fadeInScale 0.8s ease-in-out forwards"
                      : undefined,
                }}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/10 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 z-20 flex h-full items-center px-4 pt-24 sm:px-8 md:pt-28 lg:px-20 lg:pt-24">
          <div className="w-full max-w-[31rem] bg-[#f3f4f0]/70 p-3 text-[#45443f] backdrop-blur-[2px] transition-colors duration-500 sm:p-4 lg:max-w-[34rem]">
            <div className="bg-[#f7f8f4]/92 px-6 py-7 shadow-lg shadow-black/10 backdrop-blur-md sm:px-7 sm:py-8 lg:px-9 lg:py-9">
              <h1 className="font-heading text-4xl font-semibold leading-[1.03] tracking-normal sm:text-5xl lg:text-6xl">
                {heroSlides[currentImageIndex].title}
              </h1>
              <p className="mt-5 max-w-[26rem] text-base leading-relaxed text-[#62625d] sm:text-xl">
                {heroSlides[currentImageIndex].description}
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-8 h-12 rounded-none border-[#45443f]/35 bg-transparent px-7 text-base font-medium text-[#5c5b56] shadow-none hover:bg-[#45443f] hover:text-white sm:h-[3.25rem] sm:px-8 sm:text-lg"
              >
                <Link to={heroSlides[currentImageIndex].href}>
                  {heroSlides[currentImageIndex].cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="sr-only">
          <p>Hero carousel image {currentImageIndex + 1}</p>
        </div>

        <div className="absolute bottom-4 right-4 z-20 border border-white/25 bg-black/25 px-3 py-2 text-white/90 shadow-lg shadow-black/20 backdrop-blur-md sm:bottom-6 sm:right-6">
          <div
            className="absolute overflow-hidden rounded-[2px] bg-[#8a7440]/20"
            style={{
              left: `${brandSectionGeometry.secondary.from}%`,
              width: `${brandSectionGeometry.secondary.to - brandSectionGeometry.secondary.from}%`,
              top: `${brandSectionGeometry.secondary.top}%`,
              aspectRatio: brandImageRatios.secondary,
            }}
          >
            <img
              src="https://viomes.gr/images/brand_section/gusto_secondary.png"
              alt="Secondary collection visual"
              className="h-full w-full object-cover"
              onLoad={handleBrandImageLoad("secondary")}
              style={{
                objectPosition: `${brandSectionCrop.secondary.focalX}% ${brandSectionCrop.secondary.focalY}%`,
                transform: `scale(${brandSectionCrop.secondary.zoom})`,
                transformOrigin: "center",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-[3rem] text-[11px] font-semibold tracking-[0.22em] text-white/80">
              {String(currentImageIndex + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </span>

            <div
              className="flex items-center gap-1.5"
              aria-label="Hero carousel progress"
            >
              {heroSlides.map((slide, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <button
                    key={`${slide.image}-progress-dot`}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to hero image ${index + 1}`}
                    aria-current={isActive ? "true" : "false"}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <a
          href="#categories"
          onClick={scrollToCategories}
          className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 border border-white/20 bg-black/30 px-3 py-2 text-white/90 shadow-md shadow-black/10 backdrop-blur-[2px] transition hover:bg-black/40 hover:text-white sm:bottom-8"
          aria-label="Μετάβαση στις κατηγορίες"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.26em]">
            Scroll
          </span>
          <span className="relative h-7 w-px overflow-hidden bg-white/30">
            <span className="absolute left-0 top-0 h-3.5 w-px animate-scroll-cue bg-white" />
          </span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </section>

      {/* Category Showcase */}
      <CategoriesShowcaseSection />

      {/* Brand Section */}
      <section className="bg-primary py-6 text-primary-foreground sm:py-8 lg:py-10">
        <div className="px-4 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-[1600px]">
            <div className="relative h-[320px] sm:h-[360px] lg:h-[300px]">
              <div
                className="absolute overflow-hidden rounded-[2px] bg-[#8a7440]/20"
                style={{
                  left: `${brandSectionGeometry.main.from}%`,
                  width: `${brandSectionGeometry.main.to - brandSectionGeometry.main.from}%`,
                  top: `${brandSectionGeometry.main.top}%`,
                  aspectRatio: brandImageRatios.main,
                }}
              >
                <img
                  src="https://viomes.gr/images/brand_section/gusto_main.png"
                  alt="GUSTO main visual"
                  className="h-full w-full object-cover"
                  onLoad={handleBrandImageLoad("main")}
                  style={{
                    objectPosition: `${brandSectionCrop.main.focalX}% ${brandSectionCrop.main.focalY}%`,
                    transform: `scale(${brandSectionCrop.main.zoom})`,
                    transformOrigin: "center",
                  }}
                />
              </div>

              <img
                src="https://viomes.gr/images/brand_section/verdia_logo.png"
                alt="VERDIA logo"
                className="absolute h-auto"
                style={{
                  left: `${brandSectionGeometry.center.logo.left}%`,
                  top: `${brandSectionGeometry.center.logo.top}%`,
                  width: `${brandSectionGeometry.center.logo.width}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              <p
                className="absolute text-right text-2xl leading-[0.95] tracking-tight sm:text-3xl lg:text-[3.2rem] xl:text-[4rem]"
                style={{
                  left: `${brandSectionGeometry.center.text.left}%`,
                  top: `${brandSectionGeometry.center.text.top}%`,
                  width: `${brandSectionGeometry.center.text.width}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                Προϊόντα με σύγχρονη αισθητική
              </p>

              <img
                src="https://viomes.gr/images/brand_section/viomes_signature.png"
                alt="Designed and manufactured by VIOMES"
                className="absolute h-auto"
                style={{
                  left: `${brandSectionGeometry.center.designedBy.left}%`,
                  top: `${brandSectionGeometry.center.designedBy.top}%`,
                  width: `${brandSectionGeometry.center.designedBy.width}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              <div
                className="absolute overflow-hidden rounded-[2px] bg-[#8a7440]/20"
                style={{
                  left: `${brandSectionGeometry.secondary.from}%`,
                  width: `${brandSectionGeometry.secondary.to - brandSectionGeometry.secondary.from}%`,
                  top: `${brandSectionGeometry.secondary.top}%`,
                  aspectRatio: brandImageRatios.secondary,
                }}
              >
                <img
                  src="https://viomes.gr/images/brand_section/gusto_secondary.png"
                  alt="Secondary collection visual"
                  className="h-full w-full object-cover"
                  onLoad={handleBrandImageLoad("secondary")}
                  style={{
                    objectPosition: `${brandSectionCrop.secondary.focalX}% ${brandSectionCrop.secondary.focalY}%`,
                    transform: `scale(${brandSectionCrop.secondary.zoom})`,
                    transformOrigin: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <TopProductsSection />

      {/* Latest News & Articles */}
      <section
        className="bg-primary py-14 text-primary-foreground sm:py-16 lg:py-24"
        id="news"
      >
        <div className="px-4 sm:px-6 lg:px-20">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
                Νέα & Άρθρα
              </h2>
              <p className="text-primary-foreground/80">
                Τελευταίες ειδήσεις από την VIOMES
              </p>
            </div>
            <Button
              variant="link"
              className="font-bold text-primary-foreground"
            >
              Δείτε όλα
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-xl border bg-background text-foreground transition-all hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("el-GR")} •{" "}
                    {post.category}
                  </p>
                  <h3 className="mb-2 text-lg font-bold">{post.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="group/readmore p-0 font-semibold text-accent"
                  >
                    <span className="inline-flex items-center">
                      Διαβάστε περισσότερα
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/readmore:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <SustainabilitySection />
    </div>
  );
};

export default Home;
