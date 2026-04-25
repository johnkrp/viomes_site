import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";

const heroImages = [
  //"https://viomes.gr/images/hero/9.png",
  "https://viomes.gr/images/hero/3500x1750_1.png",
  "https://viomes.gr/images/hero/3500x1750_2.png",
  "https://viomes.gr/images/hero/1920x600_1.png",
  "https://viomes.gr/images/hero/1920x600_2.png",
  "https://viomes.gr/images/hero/scrolling_banners_1_with_text.png",
  "https://viomes.gr/images/hero/scrolling_banners_4_with_text.png",
  //"https://viomes.gr/images/hero/scrolling_banner_6_no_text.png",
  //"https://viomes.gr/images/hero/scrolling_banner_3_no_text.png",
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

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
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
          {heroImages.map((heroImage, index) => (
            <div key={heroImage} className="relative h-full w-full flex-none">
              <img
                src={heroImage}
                alt="Viomes Factory & Products"
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

        <div className="sr-only">
          <p>Hero carousel image {currentImageIndex + 1}</p>
        </div>

        <div className="absolute bottom-4 right-4 z-20 rounded-md border border-white/25 bg-black/25 px-3 py-2 text-white/90 shadow-lg shadow-black/20 backdrop-blur-md sm:bottom-6 sm:right-6">
          <div className="flex items-center gap-3">
            <span className="min-w-[3rem] text-[11px] font-semibold tracking-[0.22em] text-white/80">
              {String(currentImageIndex + 1).padStart(2, "0")} /{" "}
              {String(heroImages.length).padStart(2, "0")}
            </span>

            <div
              className="flex items-center gap-1.5"
              aria-label="Hero carousel progress"
            >
              {heroImages.map((heroImage, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <button
                    key={`${heroImage}-progress-dot`}
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
      </section>

      {/* Category Showcase */}
      <CategoriesShowcaseSection />

      {/* Top Products */}
      <TopProductsSection />

      {/* Sustainability */}
      <SustainabilitySection />

      {/* News / Blog Section */}
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
    </div>
  );
};

export default Home;
