import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import BrandVerdiaSection from "@/components/home/BrandVerdiaSection";
import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";

const heroImage = "https://viomes.gr/images/hero_section/hero_1.jpg";

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

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[100svh] overflow-hidden bg-background pt-28 text-foreground sm:pt-32 lg:pt-36">
        <div className="mx-auto grid min-h-[calc(100svh-8rem)] w-full max-w-[1480px] items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-16 xl:px-20">
          <div className="relative z-10 flex flex-col items-start lg:pb-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              VIOMES S.A.
            </p>
            <h1 className="max-w-[9ch] font-heading text-[clamp(4.2rem,8.4vw,9.5rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-primary">
              Προϊόντα για κάθε χώρο
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Ελληνικός σχεδιασμός και παραγωγή για το σπίτι, τον κήπο και τον επαγγελματικό εξοπλισμό.
            </p>
            <Button asChild variant="outline" className="mt-8 rounded-full px-9 py-6 text-xs font-semibold uppercase tracking-[0.18em]">
              <Link to="/products">Δείτε προϊόντα</Link>
            </Button>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <div className="absolute -left-[10%] top-[8%] hidden h-[38%] w-[42%] border border-primary/15 lg:block" />
            <div className="relative ml-auto w-full max-w-[760px] overflow-hidden bg-primary/5 shadow-sm lg:w-[88%]">
              <img
                src={heroImage}
                alt="VIOMES προϊόντα σε σύγχρονη σύνθεση"
                className="aspect-[0.92/1] w-full object-cover object-center sm:aspect-[1.1/1] lg:aspect-[0.86/1]"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-[7%] left-[5%] hidden w-[48%] bg-primary px-8 py-7 text-primary-foreground shadow-xl lg:block">
              <h2 className="font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em]">
                Made in Greece
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
                Λύσεις καθημερινής χρήσης με έμφαση στην αντοχή, τη λειτουργικότητα και την αισθητική.
              </p>
              <Button asChild variant="link" className="mt-3 h-auto px-0 text-primary-foreground underline underline-offset-4">
                <Link to="/about">Μάθετε περισσότερα</Link>
              </Button>
            </div>
          </div>
        </div>

        <a
          href="#categories"
          onClick={scrollToCategories}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-primary/70 transition hover:text-primary"
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
