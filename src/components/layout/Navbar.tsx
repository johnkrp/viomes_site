import {
  baseTextSizes,
  navLinks,
  plainTextSizeKeys,
  sizeOptions,
  titleSizeKeys,
  typographyOptions,
} from "@/components/layout/navbar/constants";
import DesktopNav from "@/components/layout/navbar/DesktopNav";
import MobileMenu from "@/components/layout/navbar/MobileMenu";
import SettingsMenu from "@/components/layout/navbar/SettingsMenu";
import SocialLinks from "@/components/layout/navbar/SocialLinks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("viomes_language") || "el",
  );
  const [paletteBaseColor, setPaletteBaseColor] = useState<string>(() => {
    try {
      return localStorage.getItem("viomes_palette_base_color") || "#807244";
    } catch {
      return "#807244";
    }
  });
  const [typography, setTypography] = useState<string>(
    () => localStorage.getItem("viomes_typography") || "manrope-poppins",
  );
  const [titleSize, setTitleSize] = useState<string>(
    () => localStorage.getItem("viomes_title_size") || "xl",
  );
  const [plainTextSize, setPlainTextSize] = useState<string>(
    () => localStorage.getItem("viomes_plain_text_size") || "sm",
  );
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isSettingsOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      const isNearTop = currentScrollY < 24;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasMeaningfulDelta =
        Math.abs(currentScrollY - lastScrollY.current) > 4;

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
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSettingsOpen) {
      setIsHeaderVisible(true);
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    try {
      localStorage.setItem("viomes_language", language);
      window.dispatchEvent(
        new CustomEvent("viomes-language-change", { detail: language }),
      );
    } catch {
      /* ignore */
    }
  }, [language]);

  useEffect(() => {
    const selectedTypography =
      typographyOptions.find((option) => option.code === typography) ??
      typographyOptions[0];

    document.documentElement.style.setProperty(
      "--font-sans",
      selectedTypography.sans,
    );
    document.documentElement.style.setProperty(
      "--font-heading",
      selectedTypography.heading,
    );

    try {
      localStorage.setItem("viomes_typography", selectedTypography.code);
    } catch {
      /* ignore */
    }
  }, [typography]);

  useEffect(() => {
    const selectedTitleSize =
      sizeOptions.find((option) => option.code === titleSize) ?? sizeOptions[1];
    const selectedPlainTextSize =
      sizeOptions.find((option) => option.code === plainTextSize) ??
      sizeOptions[1];

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const getViewportTextScale = () => {
      if (typeof window === "undefined") {
        return 1;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthScale = clamp(
        0.9 + ((width - 375) / (1440 - 375)) * 0.18,
        0.9,
        1.08,
      );
      const heightScale = clamp(
        0.96 + ((height - 700) / (1080 - 700)) * 0.06,
        0.96,
        1.02,
      );

      return widthScale * heightScale;
    };

    const toScaledRem = (value: string, scale: number) => {
      const rem = Number.parseFloat(value.replace("rem", ""));
      return `${(rem * scale).toFixed(4).replace(/\.?0+$/, "")}rem`;
    };

    const applyResponsiveTextSizes = () => {
      const viewportScale = getViewportTextScale();
      const plainScale = selectedPlainTextSize.scale * viewportScale;
      const titleScale = selectedTitleSize.scale * viewportScale;

      plainTextSizeKeys.forEach((cssVar) => {
        const baseValue = baseTextSizes[cssVar];
        document.documentElement.style.setProperty(
          cssVar,
          toScaledRem(baseValue, plainScale),
        );
      });

      titleSizeKeys.forEach((cssVar) => {
        const baseValue = baseTextSizes[cssVar];
        document.documentElement.style.setProperty(
          cssVar,
          toScaledRem(baseValue, titleScale),
        );
      });
    };

    applyResponsiveTextSizes();

    const handleResize = () => {
      applyResponsiveTextSizes();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    try {
      localStorage.setItem("viomes_title_size", selectedTitleSize.code);
      localStorage.setItem(
        "viomes_plain_text_size",
        selectedPlainTextSize.code,
      );
    } catch {
      /* ignore */
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [titleSize, plainTextSize]);

  return (
    <header
      className={cn(
        "site-header-footer fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHeaderVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-secondary/90 backdrop-blur-sm border-b border-border"
          : "bg-background/95 backdrop-blur-sm border-b border-border/60",
      )}
    >
      <div className="relative h-full bg-transparent px-8 py-2 sm:px-10 lg:px-12 lg:flex lg:items-center lg:justify-between lg:py-2.5 lg:gap-6 w-full">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/viomes-logo.png"
              alt="VIOMES Logo"
              className="h-8 w-auto md:h-10"
            />
          </Link>
        </div>

        {/* Left-center: Main subjects */}
        <div className="flex justify-start items-center flex-1 pl-20">
          <DesktopNav
            pathname={location.pathname}
            links={navLinks.slice(0, 2)}
            showDropdowns={false}
            variant="primary"
          />
        </div>

        {/* Right-center: Lesser subjects + search */}
        <div className="flex justify-center items-center gap-4 flex-1">
          <DesktopNav
            pathname={location.pathname}
            links={navLinks.slice(2)}
            variant="secondary"
          />
        </div>

        {/* Right: Social links + settings */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Αναζήτηση"
              className="text-foreground/70 hover:text-accent no-accent-bg"
            >
              <Search className="w-5 h-5" />
            </Button>
            <SocialLinks />
            <div className="hidden lg:flex items-center gap-2">
              <SettingsMenu
                isOpen={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                language={language}
                onLanguageChange={setLanguage}
                typography={typography}
                onTypographyChange={setTypography}
                titleSize={titleSize}
                onTitleSizeChange={setTitleSize}
                plainTextSize={plainTextSize}
                onPlainTextSizeChange={setPlainTextSize}
                paletteBaseColor={paletteBaseColor}
                onPaletteBaseColorChange={setPaletteBaseColor}
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 sm:right-4 lg:hidden"
            onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
            aria-label={isMobileMenuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={location.pathname}
        language={language}
        onLanguageChange={setLanguage}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
