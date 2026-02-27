import { ArrowRight, Leaf, Recycle, ShieldCheck, Users, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sustainabilityAreas = [
  {
    title: "Περιβάλλον",
    description:
      "Κάνουμε συνειδητές επιλογές σε όλη την παραγωγική μας αλυσίδα, με στόχο τη μείωση του περιβαλλοντικού αποτυπώματος και τη λειτουργία με σεβασμό προς το περιβάλλον.",
    image: "https://viomes.gr/images/shutterstock/environment.jpg",
    icon: Leaf,
  },
  {
    title: "Κυκλική Οικονομία - Ανακύκλωση",
    description:
      "Η κυκλική οικονομία αποτελεί κεντρικό άξονα της στρατηγικής μας. Επενδύουμε σε πρακτικές που επαναχρησιμοποιούν πόρους και μειώνουν τα απόβλητα.",
    image: "https://viomes.gr/images/shutterstock/circular-economy.jpg",
    icon: Recycle,
  },
  {
    title: "Οι άνθρωποί μας",
    description:
      "Η δύναμή μας είναι οι άνθρωποί μας. Η αφοσίωση, η δημιουργικότητα και η τεχνογνωσία τους αποτελούν το θεμέλιο της εξέλιξης της VIOMES.",
    image: "https://viomes.gr/images/main_static/menu_photos/our_people1.jpg",
    icon: Users,
  },
  {
    title: "Υγεία και Ασφάλεια",
    description:
      "Χτίζουμε ένα περιβάλλον όπου η Υγεία και η Ασφάλεια έρχονται πρώτες, με πρότυπες συνθήκες εργασίας και υπεύθυνες διαδικασίες σε κάθε στάδιο λειτουργίας.",
    image: "https://viomes.gr/images/main_static/menu_photos/health_and_safety1.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Κοινωνικές δράσεις",
    description:
      "Στεκόμαστε δίπλα στην κοινωνία με δράσεις που ενισχύουν την αλληλεγγύη, τη συνεργασία και την ουσιαστική προσφορά στις τοπικές κοινότητες.",
    image:
      "https://viomes.gr/images/shutterstock/close-up-people-volunteer-teamwork-putting-finger-star-shapehands-togetherstack-handsunity-teamwork-world-environment-day.jpg",
    icon: Handshake,
  },
];

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-36">
      <section className="container mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl">
          <img
            src="https://viomes.gr/images/shutterstock/sustainability.jpg"
            alt="Βιώσιμη Ανάπτυξη"
            className="h-[220px] w-full object-cover sm:h-[300px] lg:h-[360px]"
          />
        </div>

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Βιώσιμη Ανάπτυξη
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 sm:text-lg">
            Στη VIOMES έχουμε ενσωματώσει τις αρχές της βιώσιμης ανάπτυξης σε όλες
            μας τις λειτουργίες και στρατηγικές, αναγνωρίζοντας ότι μόνο έτσι
            μπορούμε να διασφαλίσουμε τη συνεχή εξέλιξή μας σε έναν κόσμο που
            αλλάζει με ταχύτητα.
          </p>
        </div>
      </section>

      <section className="container mx-auto mt-12 px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-10">
          {sustainabilityAreas.map((area) => (
            <article
              key={area.title}
              className="grid grid-cols-1 gap-5 md:grid-cols-5 md:items-center"
            >
              <img
                src={area.image}
                alt={area.title}
                className="h-52 w-full rounded-lg object-cover sm:h-60 md:col-span-2"
                loading="lazy"
              />
              <div className="md:col-span-3">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <area.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">{area.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
                  {area.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/contact">
            <Button className="h-11 rounded-full px-7 text-sm font-semibold sm:h-12 sm:px-9 sm:text-base">
              Επικοινωνήστε μαζί μας
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;

