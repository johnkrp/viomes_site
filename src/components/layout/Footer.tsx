import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-header-footer bg-background text-footer pb-4 pt-5">
      {/* Full-bleed divider — kept outside the centered container so it spans the viewport */}
      <div className="footer-divider w-full border-t pb-4" />
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 ">
        <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="no-link-underline flex items-center gap-2">
              <img
                src="/images/viomes-logo.png"
                alt="VIOMES Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-3 text-lg font-bold">ΠΡΟΪΟΝΤΑ</h4>
            <ul className="flex flex-col gap-2 text-sm text-footer ">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  Είδη σπιτιού
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Κήπος"
                  className="hover:text-accent transition-colors"
                >
                  Γλάστρες
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Καθαριότητα"
                  className="hover:text-accent transition-colors"
                >
                  Επαγγελματικός Εξοπλισμός
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="mx-auto w-full sm:max-w-[14rem]">
            <h4 className="mb-3 text-center text-lg font-bold">ΠΛΗΡΟΦΟΡΙΕΣ</h4>
            <ul className="grid grid-cols-1 gap-x-3 gap-y-2 text-sm text-footer sm:grid-cols-2 sm:justify-items-center">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-accent"
                >
                  Ποιοι είμαστε
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Υπηρεσίες
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="transition-colors hover:text-accent"
                >
                  Βιωσιμότητα
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Κατάλογοι
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Πιστοποιήσεις
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="transition-colors hover:text-accent"
                >
                  Νέα
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Καριέρα
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Whistleblowing
                </Link>
              </li>
            </ul>
          </div>

          {/* Find Us */}
          <div className="mx-auto w-full sm:max-w-[14rem]">
            <h4 className="mb-3 text-center text-lg font-bold">Βρείτε μας</h4>
            <ul className="grid grid-cols-1 gap-x-3 gap-y-2 text-sm text-footer sm:grid-cols-2 sm:justify-items-center">
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-accent"
                >
                  Επικοινωνία
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/ANARTISISVIOMES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Facebook
                </a>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Showroom
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/viomes.sa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-accent">
                  Σημεία πώλησης
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/viomes-sa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="text-center text-xs text-footer md:text-left lg:col-span-3">
            <p>
              © {new Date().getFullYear()} VIOMES S.A. All rights reserved. |{" "}
              <a
                href="#"
                className="transition-colors hover:text-[hsl(var(--viomes-light))]"
              >
                Privacy Policy
              </a>{" "}
              |{" "}
              <a
                href="#"
                className="transition-colors hover:text-[hsl(var(--viomes-light))]"
              >
                Cookie Policy
              </a>
            </p>
            <p className="mt-2">
              Developed by <span className="font-bold">VIOMES</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end lg:col-span-1">
            <a
              href="http://www.viomes.gr/images/espa/WE_VENTURE_ABROAD_GR.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-footer transition-colors hover:text-[hsl(var(--viomes-light))]"
            >
              WE VENTURE ABROAD (ΕΣΠΑ)
            </a>
            <a
              href="https://viomes.gr/images/espa/POIOTIKOS-WEB-VIOMES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-footer transition-colors hover:text-[hsl(var(--viomes-light))]"
            >
              Ποιοτικός Εκσυγχρονισμός (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
