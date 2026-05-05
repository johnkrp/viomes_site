import { useEffect, useState } from "react";

const brandImages = {
  gustoMain: "https://viomes.gr/images/brand_section/gusto_main.png",
  gustoSecondary: "https://viomes.gr/images/brand_section/gusto_secondary.png",
  verdiaLogo: "https://viomes.gr/images/brand_section/verdia_logo.png",
  kiklosLogo: "https://viomes.gr/images/brand_section/kiklos_logo.png",
  viomesSignature: "https://viomes.gr/images/brand_section/viomes_signature.png",
  cuboSet: "https://viomes.gr/images/brand_section/cubo_set.jpg",
  cuboCherry: "https://viomes.gr/images/brand_section/cubo_cherry.jpg",
  cuboBlack: "https://viomes.gr/images/brand_section/cubo_black.jpg",
};

const brandSlides = [
  { label: "VERDIA", shortLabel: "V" },
  { label: "KIKLOS", shortLabel: "K" },
] as const;

const brandLockup = {
  desktopLogo: "h-auto w-[20%]",
  desktopSignature: "h-auto w-[12%]",
  mobileLogo: "h-auto w-56 max-w-full sm:w-64",
  mobileSignature: "h-auto w-36 sm:w-40",
};

const desktopBaseCanvas =
  "absolute inset-0 aspect-[4.08/1] w-full min-h-[260px] overflow-hidden transition-opacity duration-1000 ease-out";

const desktopVerdia = {
  mainImage: "absolute left-[3%] top-[8%] h-[80%] w-[38%] overflow-hidden",
  gustoWordmark:
    "absolute left-[-2%] top-1/2 -translate-y-1/2 -rotate-90 text-[clamp(2.4rem,4.05vw,4.8rem)] font-bold leading-none tracking-[0.08em] text-white",
  logo: "absolute left-[52%] top-[60%] -translate-x-1/2 -translate-y-1/2",
  headline:
    "absolute left-[65%] top-[8%] w-[24%] text-[clamp(2rem,2.55vw,3.35rem)] font-medium leading-[1.04] tracking-tight text-white",
  signature: "absolute left-[64%] top-[72%]",
  secondaryImage: "absolute right-[2%] top-[22%] h-[66%] w-[21%] overflow-hidden",
};

const desktopKiklos = {
  cuboSet: "absolute left-[1.35%] top-[8%] h-[80%] w-[24%] overflow-hidden",
  cuboWordmark:
    "absolute left-[15%] top-[19%] text-[clamp(2rem,3.25vw,4.1rem)] font-bold leading-none tracking-[0.03em] text-white",
  logo: "absolute left-[41%] top-[42%] -translate-x-1/2 -translate-y-1/2",
  signature: "absolute left-[31%] top-[74%]",
  cuboCherry: "absolute left-[60.5%] top-[16%] h-[68%] w-[21%] overflow-hidden",
  cuboBlack: "absolute right-[1.35%] top-[6%] h-[82%] w-[18%] overflow-hidden",
};

const BrandCarouselControls = ({
  activeSlide,
  onSelectSlide,
  className = "",
}: {
  activeSlide: number;
  onSelectSlide: (index: number) => void;
  className?: string;
}) => (
  <div
    className={`z-40 flex items-center gap-2 border border-white/20 bg-black/20 px-3 py-2 text-white shadow-lg shadow-black/10 backdrop-blur-sm ${className}`}
    aria-label="Brand carousel controls"
  >
    {brandSlides.map((slide, index) => {
      const isActive = activeSlide === index;

      return (
        <button
          key={slide.label}
          type="button"
          onClick={() => onSelectSlide(index)}
          className={`group flex items-center gap-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
            isActive ? "text-white" : "text-white/55 hover:text-white"
          }`}
          aria-label={`Show ${slide.label} brand slide`}
          aria-current={isActive ? "true" : "false"}
        >
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              isActive ? "w-6 bg-white" : "w-1.5 bg-white/40 group-hover:bg-white/75"
            }`}
          />
          <span className="hidden xl:inline">{slide.label}</span>
          <span className="xl:hidden">{slide.shortLabel}</span>
        </button>
      );
    })}
  </div>
);

const BrandVerdiaSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % brandSlides.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-primary text-primary-foreground"
      aria-label="Brand collection carousel"
    >
      <div className="hidden overflow-hidden lg:block">
        <div className="relative aspect-[4.08/1] w-full min-h-[260px] overflow-hidden bg-primary">
          <div
            className={`${desktopBaseCanvas} bg-[#817642] ${
              activeSlide === 0 ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={activeSlide !== 0}
          >
            <div className={desktopVerdia.mainImage}>
              <img
                src={brandImages.gustoMain}
                alt="GUSTO collection tableware"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={desktopVerdia.gustoWordmark}>GUSTO</div>

            <img
              src={brandImages.verdiaLogo}
              alt="VERDIA made by design"
              className={`${desktopVerdia.logo} ${brandLockup.desktopLogo}`}
              loading="lazy"
              decoding="async"
            />

            <p className={desktopVerdia.headline}>
              <span className="block whitespace-nowrap">Προϊόντα με</span>
              <span className="block whitespace-nowrap">σύγχρονη</span>
              <span className="block whitespace-nowrap">αισθητική</span>
            </p>

            <img
              src={brandImages.viomesSignature}
              alt="Designed and manufactured by VIOMES"
              className={`${desktopVerdia.signature} ${brandLockup.desktopSignature}`}
              loading="lazy"
              decoding="async"
            />

            <div className={desktopVerdia.secondaryImage}>
              <img
                src={brandImages.gustoSecondary}
                alt="GUSTO plate detail"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div
            className={`${desktopBaseCanvas} bg-[#5b3b3f] ${
              activeSlide === 1 ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={activeSlide !== 1}
          >
            <div className={desktopKiklos.cuboSet}>
              <img
                src={brandImages.cuboSet}
                alt="CUBO recycling bins in color"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={desktopKiklos.cuboWordmark}>CUBO</div>

            <img
              src={brandImages.kiklosLogo}
              alt="kiklos"
              className={`${desktopKiklos.logo} ${brandLockup.desktopLogo}`}
              loading="lazy"
              decoding="async"
            />

            <img
              src={brandImages.viomesSignature}
              alt="Designed and manufactured by VIOMES"
              className={`${desktopKiklos.signature} ${brandLockup.desktopSignature}`}
              loading="lazy"
              decoding="async"
            />

            <div className={desktopKiklos.cuboCherry}>
              <img
                src={brandImages.cuboCherry}
                alt="Cherry CUBO recycling bin"
                className="h-full w-full object-cover object-left"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={desktopKiklos.cuboBlack}>
              <img
                src={brandImages.cuboBlack}
                alt="Black CUBO recycling bin"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <BrandCarouselControls
            activeSlide={activeSlide}
            onSelectSlide={setActiveSlide}
            className="absolute bottom-[7%] right-[3%]"
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="grid gap-6 bg-[#817642] px-5 py-8 sm:px-8 sm:py-10">
          <div className="flex justify-end">
            <BrandCarouselControls
              activeSlide={activeSlide}
              onSelectSlide={setActiveSlide}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
            <div className="relative overflow-hidden">
              <img
                src={activeSlide === 0 ? brandImages.gustoMain : brandImages.cuboSet}
                alt={activeSlide === 0 ? "GUSTO collection tableware" : "CUBO recycling bins in color"}
                className="aspect-[1.55/1] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-4xl font-bold leading-none tracking-[0.08em] text-white sm:text-5xl">
                {activeSlide === 0 ? "GUSTO" : "CUBO"}
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 sm:items-center">
              <img
                src={activeSlide === 0 ? brandImages.verdiaLogo : brandImages.kiklosLogo}
                alt={activeSlide === 0 ? "VERDIA made by design" : "kiklos"}
                className={brandLockup.mobileLogo}
                loading="lazy"
                decoding="async"
              />
              <p className="max-w-sm text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-center sm:text-4xl">
                {activeSlide === 0 ? "Προϊόντα με σύγχρονη αισθητική" : "Σχεδιασμός για καθαρότερους χώρους"}
              </p>
              <img
                src={brandImages.viomesSignature}
                alt="Designed and manufactured by VIOMES"
                className={brandLockup.mobileSignature}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <img
            src={activeSlide === 0 ? brandImages.gustoSecondary : brandImages.cuboBlack}
            alt={activeSlide === 0 ? "GUSTO plate detail" : "Black CUBO recycling bin"}
            className="aspect-[1.7/1] w-full object-cover sm:hidden"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandVerdiaSection;
