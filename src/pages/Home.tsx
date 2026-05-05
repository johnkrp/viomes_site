import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import BrandVerdiaSection from "@/components/home/BrandVerdiaSection";
import CategoriesShowcaseSection from "@/components/home/CategoriesShowcaseSection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TopProductsSection from "@/components/home/TopProductsSection";

const heroImage = "https://viomes.gr/images/hero_section/hero_1.jpg";

const heroComposition = {
  canvas: "relative h-[100svh] w-full overflow-hidden bg-background text-foreground",
  content: "absolute inset-0 pt-20 sm:pt-24 lg:pt-28",
  textBlock: "absolute left-[4%] top-[50%] z-10 w-[35%] -translate-y-1/2",
  eyebrow: "mb-5 text-[clamp(0.65rem,0.72vw,0.82rem)] font-semibold uppercase tracking-[0.28em] text-muted-foreground",
  heading:
    "max-w-[8.5ch] font-heading text-[clamp(4.2rem,8vw,9.4rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-primary",
  description:
    "mt-8 max-w-[34rem] text-[clamp(1rem,1.08vw,1.35rem)] leading-relaxed text-muted-foreground",
  cta: "mt-8 rounded-full px-9 py-6 text-xs font-semibold uppercase tracking-[0.18em]",
  imageFrame: "absolute right-[3%] top-[50%] h-[74%] w-[58%] -translate-y-1/2 overflow-hidden bg-primary/5 shadow-sm",
  image: "h-full w-full object-cover object-center",
  accentFrame: "absolute left-[38%] top-[20%] hidden h-[22%] w-[18%] border border-primary/15 lg:block",
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
      <section className="relative min-h-[100svh] overflow-hidden bg-background pt-24 text-foreground sm:pt-28 lg:pt-32">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-[1640px] items-center gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:px-8 xl:px-10">
          <div className="relative z-10 flex flex-col items-start lg:pb-8">
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

          <div className="relative min-h-[440px] lg:min-h-[680px]">
            <div className="absolute -left-[4%] top-[5%] hidden h-[34%] w-[32%] border border-primary/15 lg:block" />
            <div className="relative ml-auto h-full w-full overflow-hidden bg-primary/5 shadow-sm">
              <img
                src={heroImage}
                alt="VIOMES προϊόντα σε σύγχρονη σύνθεση"
                className={heroComposition.image}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        <div className="grid h-full grid-rows-[auto_1fr_auto] px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:hidden">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              VIOMES S.A.
            </p>
            <h1 className="max-w-[8.5ch] font-heading text-[clamp(3.6rem,16vw,6.2rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-primary">
              Προϊόντα για κάθε χώρο
            </h1>
          </div>

          <div className="my-6 min-h-0 overflow-hidden bg-primary/5 shadow-sm">
            <img
              src={heroImage}
              alt="VIOMES προϊόντα σε σύγχρονη σύνθεση"
              className="h-full w-full object-cover object-center"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ελληνικός σχεδιασμός και παραγωγή για το σπίτι, τον κήπο και τον επαγγελματικό εξοπλισμό.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em]">
              <Link to="/products">Δείτε προϊόντα</Link>
            </Button>
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
