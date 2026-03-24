import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Award,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pb-10 pt-20">
      <div className="container mx-auto px-4">
        <section className="mb-14 rounded-2xl border border-border/60 bg-background/35 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/70">
                Newsletter
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Μείνετε ενημερωμένοι για νέες σειρές και δράσεις βιωσιμότητας
              </h3>
              <p className="mt-3 text-sm text-secondary-foreground/80 sm:text-base">
                Εγγραφείτε για να λαμβάνετε πρώτοι νέα για προϊόντα, συνεργασίες και
                καινοτομίες της VIOMES.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input
                placeholder="Email address"
                className="bg-background/60 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
              <Button size="icon" className="shrink-0 bg-accent hover:bg-accent/90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/viomes-logo.png"
                alt="VIOMES Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Κορυφαίος κατασκευαστής πλαστικών προϊόντων στην Ελλάδα από το
              1978. Ποιότητα, καινοτομία και βιωσιμότητα σε κάθε μας προϊόν.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/ANARTISISVIOMES"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/viomes.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/viomes-sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Προϊόντα</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  Όλα τα Προϊόντα
                </Link>
              </li>
              <li>
                <Link
                  to="/products/eidi-spitioy"
                  className="hover:text-accent transition-colors"
                >
                  Είδη Σπιτιού
                </Link>
              </li>
              <li>
                <Link
                  to="/products/glastres"
                  className="hover:text-accent transition-colors"
                >
                  Γλάστρες
                </Link>
              </li>
              <li>
                <Link
                  to="/products/epaggelmatikos-eksoplismos"
                  className="hover:text-accent transition-colors"
                >
                  Επαγγελματικός Εξοπλισμός
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Πληροφορίες</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="transition-colors hover:text-accent">
                  Η Εταιρεία
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="transition-colors hover:text-accent"
                >
                  Βιώσιμη Ανάπτυξη
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-accent">
                  Επικοινωνία
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-bold">Επικοινωνία</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span>19ο Χλμ. Λ. Αθηνών - Μαρκοπούλου</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span>Τ.Κ.: 19002 - Παιανία</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span>+30 210 6646231-2</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span>info@viomes.gr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <div className="text-center text-xs text-muted-foreground md:text-left">
            <p>
              © {new Date().getFullYear()} VIOMES S.A. All rights reserved. |{" "}
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </p>
            <p className="mt-2">
              Developed by <span className="font-bold">VIOMES</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="http://www.viomes.gr/images/espa/WE_VENTURE_ABROAD_GR.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-white"
            >
              WE VENTURE ABROAD (ΕΣΠΑ)
            </a>
            <a
              href="https://viomes.gr/images/espa/POIOTIKOS-WEB-VIOMES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-white"
            >
              Ποιοτικός Εκσυγχρονισμός (PDF)
            </a>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground/80">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                ISO 9001
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground/80">
                <Award className="h-3.5 w-3.5 text-accent" />
                Quality
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
