const brandImages = {
  main: "https://viomes.gr/images/brand_section/gusto_main.png",
  secondary: "https://viomes.gr/images/brand_section/gusto_secondary.png",
  logo: "https://viomes.gr/images/brand_section/verdia_logo.png",
  signature: "https://viomes.gr/images/brand_section/viomes_signature.png",
};

const BrandVerdiaSection = () => {
  return (
    <section
      className="bg-primary text-primary-foreground"
      aria-label="VERDIA GUSTO collection"
    >
      <div className="hidden overflow-hidden lg:block">
        <div className="mx-auto w-full max-w-[2000px]">
          <div className="relative aspect-[4.08/1] w-full min-h-[260px] overflow-hidden">
            <div className="absolute left-[0.5%] top-[8%] h-[80%] w-[40%] overflow-hidden">
              <img
                src={brandImages.main}
                alt="GUSTO collection tableware"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="absolute left-[-5.5%] top-1/2 -translate-y-1/2 -rotate-90 text-[clamp(2.4rem,4.3vw,5rem)] font-bold leading-none tracking-[0.08em] text-white">
              GUSTO
            </div>

            <img
              src={brandImages.logo}
              alt="VERDIA made by design"
              className="absolute left-[52%] top-[63%] h-auto w-[17.5%] -translate-x-1/2 -translate-y-1/2"
              loading="lazy"
              decoding="async"
            />

            <p className="absolute left-[65%] top-[8%] w-[25%] text-[clamp(2rem,2.8vw,3.6rem)] font-medium leading-[1.05] tracking-tight text-white">
              <span className="block whitespace-nowrap">Προϊόντα με σύγχρονη</span>
              <span className="block whitespace-nowrap">αισθητική</span>
            </p>

            <img
              src={brandImages.signature}
              alt="Designed and manufactured by VIOMES"
              className="absolute left-[63%] top-[72%] h-auto w-[12.5%]"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute right-[0.5%] top-[25%] h-[66%] w-[22%] overflow-hidden">
              <img
                src={brandImages.secondary}
                alt="GUSTO plate detail"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="grid gap-6 bg-[#817642] px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
            <div className="relative overflow-hidden">
              <img
                src={brandImages.main}
                alt="GUSTO collection tableware"
                className="aspect-[1.55/1] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-4xl font-bold leading-none tracking-[0.08em] text-white sm:text-5xl">
                GUSTO
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 sm:items-center">
              <img
                src={brandImages.logo}
                alt="VERDIA made by design"
                className="h-auto w-56 max-w-full sm:w-64"
                loading="lazy"
                decoding="async"
              />
              <p className="max-w-sm text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-center sm:text-4xl">
                Προϊόντα με σύγχρονη αισθητική
              </p>
              <img
                src={brandImages.signature}
                alt="Designed and manufactured by VIOMES"
                className="h-auto w-36 sm:w-40"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <img
            src={brandImages.secondary}
            alt="GUSTO plate detail"
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
