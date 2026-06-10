import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandVerdiaSection from "@/components/home/BrandVerdiaSection";
import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";

const heroImage = "https://viomes.gr/images/homepage/hero/soft_close.png";
const heroBannerImage = "https://viomes.gr/images/homepage/hero/linea.png";
const heroStageSize = {
  width: "min(100vw, calc(100svh * 16 / 9))",
  height: "min(100svh, calc(100vw * 9 / 16))",
};

const heroComposition = {
  canvas:
    "relative w-full overflow-hidden bg-[hsl(var(--viomes-bg))] text-[hsl(var(--viomes-dark))]",
  desktopLayer: "relative mx-auto hidden lg:block",
  desktopStage: "relative h-full w-full overflow-hidden",
  panel:
    "absolute inset-[2.2%] overflow-hidden border border-black/10 bg-[hsl(var(--viomes-bg))]",
  metaRow:
    "absolute left-[3.2%] right-[3.2%] top-[4.8%] z-20 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--viomes-dark))]/80",
  textBlock: "absolute left-[4.2%] top-[55%] z-20 w-[35%] -translate-y-1/2",
  heading:
    "max-w-[11ch] leading-[0.9] tracking-[-0.03em] text-[hsl(var(--viomes-dark))]",
  cta: "mt-[5%] h-12 rounded-full border-[hsl(var(--viomes-dark))]/45 bg-transparent px-9 text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--viomes-dark))] hover:bg-[hsl(var(--viomes-dark))] hover:text-[hsl(var(--viomes-bg))]",
  imageFrame:
    "absolute right-[1%] top-[8.5%] h-[87%] w-[56%] overflow-hidden bg-[hsl(var(--viomes-bg))]",
  image: "h-full w-full object-cover object-center",
  mobileLayer:
    "grid h-[100svh] grid-rows-[auto_1fr_auto] gap-5 bg-[hsl(var(--viomes-bg))] px-5 pb-12 pt-24 sm:px-8 sm:pt-28 lg:hidden",
  mobileEyebrow:
    "mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--viomes-dark))]/75",
  mobileHeading:
    "max-w-[10.5ch] leading-[0.88] tracking-[-0.03em] text-[hsl(var(--viomes-dark))]",
  mobileDescription:
    "max-w-md text-base leading-relaxed text-[hsl(var(--viomes-dark))]/85 sm:text-lg",
  mobileCta:
    "mt-6 h-11 rounded-full border-[hsl(var(--viomes-dark))]/45 bg-transparent px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--viomes-dark))] hover:bg-[hsl(var(--viomes-dark))] hover:text-[hsl(var(--viomes-bg))]",
  mobileImageFrame:
    "mx-auto min-h-0 w-full overflow-hidden bg-[hsl(var(--viomes-bg))]",
  bannerWrap: "px-4 sm:px-6 lg:px-8 xl:px-10 pb-12 sm:pb-16 lg:pb-24",
  bannerCard:
    "mx-auto grid w-full max-w-[1700px] overflow-hidden bg-[hsl(var(--viomes-bg))] text-[hsl(var(--viomes-primary))] shadow-[0_20px_50px_rgba(76,67,38,0.08)] lg:grid-cols-[0.92fr_1.08fr]",
  bannerText:
    "flex flex-col justify-center gap-4 px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16",
  bannerKicker:
    "text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--viomes-primary))]/70",
  bannerTitle:
    "max-w-[10ch] leading-[0.92] tracking-[-0.04em] text-[hsl(var(--viomes-primary))]",
  bannerCopy:
    "max-w-md text-base leading-relaxed text-[hsl(var(--viomes-primary))]/80 sm:text-lg",
  bannerImageWrap:
    "relative min-h-[230px] overflow-hidden bg-[hsl(var(--viomes-bg))] sm:min-h-[320px] lg:min-h-0",
  bannerImage: "h-full w-full object-cover object-center",
};

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

function CarouselStage({
  heroImage,
  heroComposition,
  heroBannerImage,
}: {
  heroImage: string;
  heroComposition: any;
  heroBannerImage: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((s) => (s + 1) % 2), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={heroComposition.desktopStage}>
      <div
        aria-hidden={active !== 0}
        className={`absolute inset-0 transition-all duration-600 ease-artevasi ${
          active === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className={heroComposition.textBlock}>
          <h1
            className={heroComposition.heading}
            style={{ fontSize: "var(--type-hero-heading)" }}
          >
            Προϊόντα για
            <br />
            <span className="text-[hsl(var(--viomes-accent))]">
              <i>
                <b>κάθε</b>
              </i>
            </span>{" "}
            χώρο
          </h1>
          <Button asChild variant="outline" className={heroComposition.cta}>
            <Link to="/products">Δείτε προϊόντα</Link>
          </Button>
        </div>

        <div className={heroComposition.imageFrame}>
          <img
            src={heroImage}
            alt="VIOMES προϊόντα σε σύγχρονη σύνθεση"
            className={heroComposition.image}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div
        aria-hidden={active !== 1}
        className={`absolute inset-0 transition-all duration-600 ease-artevasi ${
          active === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className={heroComposition.desktopStage}>
          <div className={heroComposition.textBlock}>
            <h1
              className={heroComposition.heading}
              style={{ fontSize: "var(--type-hero-banner-title)" }}
            >
              Slow & Steady
            </h1>
            <Button asChild variant="outline" className={heroComposition.cta}>
              <Link to="/products?category=Μπάνιο">Δείτε προϊόντα</Link>
            </Button>
          </div>

          <div className={heroComposition.imageFrame}>
            <img
              src={heroBannerImage}
              alt="Bathroom products banner"
              className={heroComposition.image}
              decoding="async"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const scrollToCategories = (event: React.MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <div className="flex flex-col">
      <section className={heroComposition.canvas}>
        <div className={heroComposition.desktopLayer} style={heroStageSize}>
          {/* Desktop carousel: swaps between hero and secondary banner */}
          <CarouselStage
            heroImage={heroImage}
            heroComposition={heroComposition}
            heroBannerImage={heroBannerImage}
          />
        </div>

        <div className={heroComposition.mobileLayer}>
          <div>
            <h1
              className={heroComposition.mobileHeading}
              style={{ fontSize: "var(--type-hero-mobile-heading)" }}
            >
              Προϊόντα για
              <br />
              <span className="text-[hsl(var(--viomes-accent))]">
                κάθε
              </span>{" "}
              χώρο
            </h1>
          </div>

          <div className={heroComposition.mobileImageFrame}>
            <img
              src={heroImage}
              alt="VIOMES προϊόντα σε σύγχρονη σύνθεση"
              className={heroComposition.image}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div>
            <p className={heroComposition.mobileDescription}>
              Ελληνικός σχεδιασμός και παραγωγή για το σπίτι, τον κήπο και τον
              επαγγελματικό εξοπλισμό.
            </p>
            <Button
              asChild
              variant="outline"
              className={heroComposition.mobileCta}
            >
              <Link to="/products">Δείτε προϊόντα</Link>
            </Button>
          </div>
        </div>

        <div className={`${heroComposition.bannerWrap} lg:hidden`}>
          <Link
            to="/products?category=Μπάνιο"
            className={heroComposition.bannerCard}
          >
            <div className={heroComposition.bannerText}>
              <h2 className={heroComposition.bannerTitle}>Slow & Steady</h2>
            </div>

            <div className={heroComposition.bannerImageWrap}>
              <img
                src={heroBannerImage}
                alt="Bathroom products banner"
                className={heroComposition.bannerImage}
                decoding="async"
                loading="eager"
              />
            </div>
          </Link>
        </div>

        <a
          href="#categories"
          onClick={scrollToCategories}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[hsl(var(--viomes-primary))]/70 transition hover:text-[hsl(var(--viomes-primary))]"
        >
          <ChevronDown />
        </a>
      </section>

      <CategoriesShowcaseSection />

      <BrandVerdiaSection />

      <section
        className="bg-[hsl(var(--viomes-bg))] py-14 text-foreground"
        id="news"
      >
        <div className="px-4 sm:px-6 lg:px-20">
          <h2 className="text-3xl sm:text-4xl">Νέα & Άρθρα</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((post) => (
              <article key={post.title} className="border bg-background">
                <img src={post.image} alt={post.title} />
                <div className="p-6">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Button variant="link">Διαβάστε περισσότερα</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
