import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const sustainabilityPoints = [
  "100% Ανακυκλώσιμα Υλικά",
  "Εξοικονόμηση Ενέργειας",
  "Μηδενικά Απόβλητα",
  "Πιστοποίηση ISO 14001",
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

        <div className="bg-accent/10 pb-24 sm:pb-28 lg:pb-34">
          <div className="mx-auto grid w-full max-w-[1700px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-14">
            <div className="h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[560px]">
              <img
                src="/images/circular-economy.jpg"
                alt="Βιωσιμότητα στην παραγωγή της VIOMES"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">
                Βιωσιμότητα και Κυκλική Οικονομία
              </h2>
              <p className="mt-7 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Στη VIOMES ενσωματώνουμε ανακυκλωμένες πρώτες ύλες και σχεδιάζουμε
                προϊόντα με μεγάλη διάρκεια ζωής, ώστε να μειώνουμε το περιβαλλοντικό
                αποτύπωμα σε κάθε στάδιο παραγωγής.
              </p>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Επενδύουμε σε πιο αποδοτικές διαδικασίες, υπεύθυνη χρήση ενέργειας
                και σταθερή βελτίωση, με στόχο μια παραγωγή που σέβεται το περιβάλλον
                και τις ανάγκες των επόμενων γενεών.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {sustainabilityPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-base sm:text-lg">{point}</span>
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
