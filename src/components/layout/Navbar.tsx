import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Προϊόντα", en: "Products", href: "/products" },
  { name: "Η Εταιρεία", en: "About", href: "/about" },
  { name: "Επικοινωνία", en: "Contact", href: "/contact" },
];

const languages = [
  { code: "el", label: "Ελληνικά" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const typographyOptions = [
  {
    code: "manrope",
    label: "Manrope",
    sans: '"Manrope", sans-serif',
    heading: '"Manrope", sans-serif',
  },
  {
    code: "inter",
    label: "Inter",
    sans: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
  },
  {
    code: "ibm-plex-sans",
    label: "IBM Plex Sans",
    sans: '"IBM Plex Sans", sans-serif',
    heading: '"IBM Plex Sans", sans-serif',
  },
  {
    code: "source-serif-4",
    label: "Source Serif 4",
    sans: '"Source Serif 4", serif',
    heading: '"Source Serif 4", serif',
  },
  {
    code: "nunito-sans",
    label: "Nunito Sans",
    sans: '"Nunito Sans", sans-serif',
    heading: '"Nunito Sans", sans-serif',
  },
  {
    code: "rubik",
    label: "Rubik",
    sans: '"Rubik", sans-serif',
    heading: '"Rubik", sans-serif',
  },
  {
    code: "poppins",
    label: "Poppins",
    sans: '"Poppins", sans-serif',
    heading: '"Poppins", sans-serif',
  },
  {
    code: "space-grotesk",
    label: "Space Grotesk",
    sans: '"Space Grotesk", sans-serif',
    heading: '"Space Grotesk", sans-serif',
  },
  {
    code: "lora",
    label: "Lora",
    sans: '"Lora", serif',
    heading: '"Lora", serif',
  },
  {
    code: "merriweather",
    label: "Merriweather",
    sans: '"Merriweather", serif',
    heading: '"Merriweather", serif',
  },
  {
    code: "playfair-display",
    label: "Playfair Display",
    sans: '"Playfair Display", serif',
    heading: '"Playfair Display", serif',
  },
  {
    code: "ibm-plex-serif",
    label: "IBM Plex Serif",
    sans: '"IBM Plex Serif", serif',
    heading: '"IBM Plex Serif", serif',
  },
];

const flagClassByLanguage: Record<string, string> = {
  el: "fi fi-gr",
  en: "fi fi-gb",
  fr: "fi fi-fr",
  de: "fi fi-de",
};

const getFlagClass = (code: string) =>
  flagClassByLanguage[code] ?? flagClassByLanguage.en;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("viomes_language") || "el",
  );
  const [typography, setTypography] = useState<string>(
    () => localStorage.getItem("viomes_typography") || "manrope",
  );
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY < 24;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasMeaningfulDelta = Math.abs(currentScrollY - lastScrollY.current) > 4;

      setIsScrolled(currentScrollY > 20);

      if (isNearTop) {
        setIsHeaderVisible(true);
      } else if (hasMeaningfulDelta && isScrollingUp) {
        setIsHeaderVisible(true);
      } else if (hasMeaningfulDelta && isScrollingDown) {
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    try {
      localStorage.setItem("viomes_language", language);
    } catch {
      /* ignore */
    }
  }, [language]);

  useEffect(() => {
    const selectedTypography =
      typographyOptions.find((option) => option.code === typography) ?? typographyOptions[0];

    document.documentElement.style.setProperty("--font-sans", selectedTypography.sans);
    document.documentElement.style.setProperty("--font-heading", selectedTypography.heading);

    try {
      localStorage.setItem("viomes_typography", selectedTypography.code);
    } catch {
      /* ignore */
    }
  }, [typography]);

  const selectedLanguage =
    languages.find((selected) => selected.code === language) ?? languages[0];
  const selectedTypography =
    typographyOptions.find((selected) => selected.code === typography) ?? typographyOptions[0];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHeaderVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-secondary/90 backdrop-blur-sm border-b border-border"
          : "bg-background/95 backdrop-blur-sm border-b border-border/60",
      )}
    >
      <div className="container mx-auto h-full px-6 py-3 relative bg-transparent lg:grid lg:grid-cols-3 lg:items-center lg:py-4">
        <div className="hidden lg:flex items-center gap-4 lg:justify-start lg:pl-0 lg:-ml-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.2l-.4 2.9h-1.8v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.5 18H6.2V10.5h2.3V18zM7.3 9.4a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6zM18 18h-2.3v-3.4c0-.8-.3-1.4-1-1.4-.5 0-.9.3-1.1.6-.1.2-.1.5-.1.8V18H11.2V10.5h2.2v1h.1c.3-.5.9-1.1 1.9-1.1 1.4 0 2.5.9 2.5 3V18z" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col items-center lg:col-span-1 lg:justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/viomes-logo.png" alt="VIOMES Logo" className="h-12 w-auto md:h-14" />
          </Link>
          <nav className="mt-2 hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-lg font-semibold hover:text-accent transition-colors",
                  location.pathname === link.href ? "text-accent" : "text-foreground/70",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:justify-end lg:pr-6">
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm transition hover:bg-background/45">
                <span className="hidden sm:inline">Font</span>
                <span>{selectedTypography.label}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={typography} onValueChange={setTypography}>
                  {typographyOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.code} value={option.code}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm transition hover:bg-background/45">
                <span className="mr-2 inline-flex w-5 h-4">
                  <span
                    className={cn(getFlagClass(selectedLanguage.code), "h-4 w-5 rounded-[2px]")}
                    aria-hidden
                  />
                </span>
                <span className="hidden sm:inline">{selectedLanguage.label}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                  {languages.map((languageOption) => (
                    <DropdownMenuRadioItem key={languageOption.code} value={languageOption.code}>
                      <span className="mr-2 inline-flex w-5 h-4">
                        <span
                          className={cn(getFlagClass(languageOption.code), "h-4 w-5 rounded-[2px]")}
                          aria-hidden
                        />
                      </span>
                      {languageOption.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-3 lg:hidden"
            onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background animate-in fade-in slide-in-from-top-4 lg:hidden">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xl font-semibold border-b border-border pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <label className="sr-only">Language</label>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {languages.map((languageOption) => (
                  <option key={languageOption.code} value={languageOption.code}>
                    {languageOption.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="sr-only">Typography</label>
              <select
                value={typography}
                onChange={(event) => setTypography(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {typographyOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
