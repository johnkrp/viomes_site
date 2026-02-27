import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Hash, Mail, MapPin, Phone, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Διεύθυνση",
    value: "19ο Χλμ. Λ. Αθηνών - Μαρκοπούλου",
  },
  {
    icon: Hash,
    title: "Τ.Κ.",
    value: "19002 - Παιανία",
  },
  {
    icon: Phone,
    title: "Τηλέφωνο",
    value: "+30 210 6646231-2",
  },
  {
    icon: Phone,
    title: "Fax",
    value: "+30 210 6645472",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@viomes.gr",
    href: "mailto:info@viomes.gr",
  },
] as const;

const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d100698.77347601067!2d23.813316354617445!3d37.93424591633793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3097c94e0fe0d276!2sVIOMES%20SA!5e0!3m2!1sen!2sgr!4v1584552447301!5m2!1sen!2sgr";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-36">
      <section className="container mx-auto px-4 sm:px-6">
        <div className="p-1 sm:p-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Επικοινωνία
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Είμαστε στη διάθεσή σας για πληροφορίες σχετικά με τα προϊόντα και τις συνεργασίες
            της VIOMES.
          </p>
        </div>
      </section>

      <section className="container mx-auto mt-8 px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">Στοιχεία επικοινωνίας</h2>
            <div className="mt-5 space-y-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground hover:text-accent sm:text-base">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground sm:text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl">
            <iframe
              src={mapUrl}
              title="VIOMES map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 sm:h-[460px]"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Φόρμα επικοινωνίας</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας.
          </p>
          <form className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input placeholder="Ονοματεπώνυμο" className="h-11" />
            <Input placeholder="Εταιρεία" className="h-11" />
            <Input placeholder="Email" type="email" className="h-11" />
            <Input placeholder="Τηλέφωνο" className="h-11" />
            <div className="md:col-span-2">
              <Textarea placeholder="Μήνυμα" className="min-h-[120px]" />
            </div>
            <div className="md:col-span-2">
              <Button type="button" className="h-11 px-6">
                Αποστολή
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;

