import { Leaf, Recycle, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const sustainabilityHighlights = [
  {
    title: "Ανακυκλωμένες Πρώτες Ύλες",
    description:
      "Ενσωματώνουμε υψηλό ποσοστό ανακυκλωμένου υλικού σε βασικές σειρές.",
    stat: "έως 65% recycled content",
    Icon: Recycle,
  },
  {
    title: "Αποδοτική Παραγωγή",
    description:
      "Βελτιστοποιούμε τις γραμμές παραγωγής για λιγότερη ενέργεια ανά τεμάχιο.",
    stat: "-28% κατανάλωση ενέργειας",
    Icon: Zap,
  },
  {
    title: "Σχεδιασμός Με Διάρκεια",
    description:
      "Προϊόντα μεγάλης αντοχής που μειώνουν την ανάγκη για συχνή αντικατάσταση.",
    stat: "ISO 14001 πιστοποιημένη μονάδα",
    Icon: Leaf,
  },
];

const SustainabilitySection = () => {
  return (
    <section className="text-foreground" id="sustainability">
      <div className="relative pt-24 sm:pt-28 lg:pt-34">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 sm:h-28 lg:h-34"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background)) 0, hsl(var(--background)) 50%, hsl(var(--accent) / 0.1) 50%, hsl(var(--accent) / 0.1) 100%)",
          }}
        />

        <div className="relative overflow-hidden bg-accent/10 pb-24 sm:pb-28 lg:pb-34">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.16) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="mx-auto grid w-full max-w-[1700px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-14">
            <div className="h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[560px]">
              <img
                src="https://viomes.gr/images/hero/circular-economy.jpg"
                alt="Βιωσιμότητα στην παραγωγή της VIOMES"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">
                Βιωσιμότητα και Κυκλική Οικονομία
              </h2>
              <p className="mt-7 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Στη VIOMES ενσωματώνουμε ανακυκλωμένες πρώτες ύλες και
                σχεδιάζουμε προϊόντα με μεγάλη διάρκεια ζωής, ώστε να μειώνουμε
                το περιβαλλοντικό αποτύπωμα σε κάθε στάδιο παραγωγής.
              </p>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Επενδύουμε σε πιο αποδοτικές διαδικασίες, υπεύθυνη χρήση
                ενέργειας και σταθερή βελτίωση, με στόχο μια παραγωγή που
                σέβεται το περιβάλλον και τις ανάγκες των επόμενων γενεών.
              </p>

              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                {sustainabilityHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/70 bg-background/65 p-4 backdrop-blur-sm"
                  >
                    <item.Icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-3 text-base font-semibold leading-tight sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                      {item.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent/90">
                      {item.stat}
                    </p>
                  </div>
                ))}
              </div>

              <Button className="mt-8 h-12 rounded-full bg-accent px-8 text-xs font-bold uppercase tracking-widest text-accent-foreground hover:bg-accent/90">
                ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
