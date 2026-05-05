import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";
import BrandVerdiaSection from "@/components/home/BrandVerdiaSection";

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

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex h-full items-center px-4 pt-24 sm:px-8 md:pt-28 lg:px-20 lg:pt-24">
          <div className="w-full max-w-[31rem] bg-[#f3f4f0]/70 p-3 text-[#45443f] backdrop-blur-[2px] sm:p-4 lg:max-w-[34rem]">
            <div className="bg-[#f7f8f4]/92 px-6 py-7 shadow-lg sm:px-7 sm:py-8 lg:px-9 lg:py-9">
              <h1 className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl">
                {heroSlides[currentImageIndex].title}
              </h1>
              <p className="mt-5 text-base text-[#62625d] sm:text-xl">
                {heroSlides[currentImageIndex].description}
              </p>
              <Button asChild variant="outline" className="mt-8">
                <Link to={heroSlides[currentImageIndex].href}>
                  {heroSlides[currentImageIndex].cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <a
          href="#categories"
          onClick={scrollToCategories}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white"
        >
          <ChevronDown />
        </a>
      </section>

      <CategoriesShowcaseSection />

      <BrandVerdiaSection />

      <TopProductsSection />

      <section className="bg-primary py-14 text-primary-foreground" id="news">
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

      <SustainabilitySection />
    </div>
  );
};

export default Home;
