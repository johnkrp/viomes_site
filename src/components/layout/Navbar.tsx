import {
  PALETTE_DEFAULT_VERSION,
  backgroundColorOptions,
  baseTextSizes,
  plainTextSizeKeys,
  sizeOptions,
  textSecondaryColorOptions,
  titleSizeKeys,
  typographyOptions,
} from "@/components/layout/navbar/constants";
import DesktopNav from "@/components/layout/navbar/DesktopNav";
import MobileMenu from "@/components/layout/navbar/MobileMenu";
import SettingsMenu from "@/components/layout/navbar/SettingsMenu";
import SocialLinks from "@/components/layout/navbar/SocialLinks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hexToHsl = (hex: string) => {
  const safeHex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(safeHex)) {
    return { h: 0, s: 0, l: 0 };
  }

  const r = Number.parseInt(safeHex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(safeHex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(safeHex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      default:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("viomes_language") || "el",
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(() => {
    try {
      const savedVersion = localStorage.getItem("viomes_palette_version");
      if (savedVersion !== PALETTE_DEFAULT_VERSION) {
        return "sand";
      }
      return localStorage.getItem("viomes_background_color") || "sand";
    } catch {
      return "sand";
    }
  });
  const [textSecondaryColor, setTextSecondaryColor] = useState<string>(() => {
    try {
      const savedVersion = localStorage.getItem("viomes_palette_version");
      if (savedVersion !== PALETTE_DEFAULT_VERSION) {
        return "viomes-red";
      }
      return (
        localStorage.getItem("viomes_text_secondary_color") || "viomes-red"
      );
    } catch {
      return "viomes-red";
    }
  });
  const [customBackgroundHex, setCustomBackgroundHex] = useState<string>(
    () => localStorage.getItem("viomes_custom_background_hex") || "#ded8cf",
  );
  const [customTextHex, setCustomTextHex] = useState<string>(
    () => localStorage.getItem("viomes_custom_text_hex") || "#6f3a3a",
  );
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
    let selectedBackground =
      backgroundColorOptions.find(
        (option) => option.code === backgroundColor,
      ) ?? backgroundColorOptions[0];

    if (selectedBackground.code === "custom") {
      const { h, s, l } = hexToHsl(customBackgroundHex);
      selectedBackground = {
        ...selectedBackground,
        background: `${h} ${s}% ${clamp(l, 78, 97)}%`,
        card: `${h} ${s}% ${clamp(l + 4, 82, 99)}%`,
        popover: `${h} ${s}% ${clamp(l + 4, 82, 99)}%`,
        muted: `${h} ${clamp(s - 2, 8, 28)}% ${clamp(l - 8, 64, 90)}%`,
        border: `${h} ${clamp(s - 4, 6, 24)}% ${clamp(l - 16, 54, 84)}%`,
        input: `${h} ${clamp(s - 3, 6, 24)}% ${clamp(l - 12, 58, 86)}%`,
        sidebar: `${h} ${clamp(s - 1, 8, 28)}% ${clamp(l - 4, 70, 92)}%`,
        sidebarAccent: `${h} ${clamp(s - 2, 8, 26)}% ${clamp(l - 10, 62, 88)}%`,
        sidebarBorder: `${h} ${clamp(s - 4, 6, 24)}% ${clamp(l - 18, 52, 82)}%`,
      };
    }

    document.documentElement.style.setProperty(
      "--background",
      selectedBackground.background,
    );
    document.documentElement.style.setProperty(
      "--card",
      selectedBackground.card,
    );
    document.documentElement.style.setProperty(
      "--popover",
      selectedBackground.popover,
    );
    document.documentElement.style.setProperty(
      "--muted",
      selectedBackground.muted,
    );
    document.documentElement.style.setProperty(
      "--border",
      selectedBackground.border,
    );
    document.documentElement.style.setProperty(
      "--input",
      selectedBackground.input,
    );
    document.documentElement.style.setProperty(
      "--sidebar",
      selectedBackground.sidebar,
    );
    document.documentElement.style.setProperty(
      "--sidebar-accent",
      selectedBackground.sidebarAccent,
    );
    document.documentElement.style.setProperty(
      "--sidebar-border",
      selectedBackground.sidebarBorder,
    );
    document.documentElement.style.setProperty(
      "--chart-2",
      selectedBackground.muted,
    );
    document.documentElement.style.setProperty(
      "--chart-4",
      selectedBackground.border,
    );

    try {
      localStorage.setItem("viomes_background_color", selectedBackground.code);
      localStorage.setItem("viomes_custom_background_hex", customBackgroundHex);
      localStorage.setItem("viomes_palette_version", PALETTE_DEFAULT_VERSION);
    } catch {
      /* ignore */
    }
  }, [backgroundColor, customBackgroundHex]);

  useEffect(() => {
    let selectedTextSecondary =
      textSecondaryColorOptions.find(
        (option) => option.code === textSecondaryColor,
      ) ?? textSecondaryColorOptions[0];

    if (selectedTextSecondary.code === "custom") {
      const { h, s, l } = hexToHsl(customTextHex);
      selectedTextSecondary = {
        ...selectedTextSecondary,
        foreground: `${h} ${clamp(s, 10, 80)}% ${clamp(l, 14, 42)}%`,
        primary: `${h} ${clamp(s, 20, 85)}% ${clamp(l + 16, 28, 60)}%`,
        secondary: `${h} ${clamp(s - 10, 8, 24)}% 84%`,
        mutedForeground: `${h} ${clamp(s - 8, 8, 40)}% ${clamp(l + 12, 28, 52)}%`,
        ring: `${h} ${clamp(s, 20, 85)}% ${clamp(l + 16, 28, 60)}%`,
        sidebarForeground: `${h} ${clamp(s, 10, 70)}% ${clamp(l + 4, 18, 44)}%`,
      };
    }

    document.documentElement.style.setProperty(
      "--foreground",
      selectedTextSecondary.foreground,
    );
    document.documentElement.style.setProperty(
      "--card-foreground",
      selectedTextSecondary.foreground,
    );
    document.documentElement.style.setProperty(
      "--popover-foreground",
      selectedTextSecondary.foreground,
    );
    document.documentElement.style.setProperty(
      "--primary",
      selectedTextSecondary.primary,
    );
    document.documentElement.style.setProperty(
      "--accent",
      selectedTextSecondary.primary,
    );
    document.documentElement.style.setProperty(
      "--secondary",
      selectedTextSecondary.secondary,
    );
    document.documentElement.style.setProperty(
      "--secondary-foreground",
      selectedTextSecondary.foreground,
    );
    document.documentElement.style.setProperty(
      "--muted-foreground",
      selectedTextSecondary.mutedForeground,
    );
    document.documentElement.style.setProperty(
      "--ring",
      selectedTextSecondary.ring,
    );
    document.documentElement.style.setProperty(
      "--sidebar-foreground",
      selectedTextSecondary.sidebarForeground,
    );
    document.documentElement.style.setProperty(
      "--sidebar-primary",
      selectedTextSecondary.primary,
    );
    document.documentElement.style.setProperty(
      "--sidebar-ring",
      selectedTextSecondary.ring,
    );
    document.documentElement.style.setProperty(
      "--chart-1",
      selectedTextSecondary.primary,
    );
    document.documentElement.style.setProperty(
      "--chart-3",
      selectedTextSecondary.foreground,
    );
    document.documentElement.style.setProperty(
      "--chart-5",
      selectedTextSecondary.primary,
    );

    try {
      localStorage.setItem(
        "viomes_text_secondary_color",
        selectedTextSecondary.code,
      );
      localStorage.setItem("viomes_custom_text_hex", customTextHex);
      localStorage.setItem("viomes_palette_version", PALETTE_DEFAULT_VERSION);
    } catch {
      /* ignore */
    }
  }, [textSecondaryColor, customTextHex]);

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

    const toScaledRem = (value: string, scale: number) => {
      const rem = Number.parseFloat(value.replace("rem", ""));
      return `${(rem * scale).toFixed(4).replace(/\.?0+$/, "")}rem`;
    };

    plainTextSizeKeys.forEach((cssVar) => {
      const baseValue = baseTextSizes[cssVar];
      document.documentElement.style.setProperty(
        cssVar,
        toScaledRem(baseValue, selectedPlainTextSize.scale),
      );
    });

    titleSizeKeys.forEach((cssVar) => {
      const baseValue = baseTextSizes[cssVar];
      document.documentElement.style.setProperty(
        cssVar,
        toScaledRem(baseValue, selectedTitleSize.scale),
      );
    });

    try {
      localStorage.setItem("viomes_title_size", selectedTitleSize.code);
      localStorage.setItem(
        "viomes_plain_text_size",
        selectedPlainTextSize.code,
      );
    } catch {
      /* ignore */
    }
  }, [titleSize, plainTextSize]);

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
      <div className="relative h-full bg-transparent px-4 py-3 sm:px-6 lg:container lg:mx-auto lg:grid lg:grid-cols-3 lg:items-center lg:py-4">
        <SocialLinks />

        <div className="flex flex-col items-center lg:col-span-1 lg:justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/viomes-logo.png"
              alt="VIOMES Logo"
              className="h-12 w-auto md:h-14"
            />
          </Link>
          <DesktopNav pathname={location.pathname} />
        </div>

        <div className="flex items-center gap-4 lg:justify-end lg:pr-6">
          <div className="hidden lg:flex items-center gap-1.5">
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
              backgroundColor={backgroundColor}
              onBackgroundColorChange={setBackgroundColor}
              textSecondaryColor={textSecondaryColor}
              onTextSecondaryColorChange={setTextSecondaryColor}
              customBackgroundHex={customBackgroundHex}
              onCustomBackgroundHexChange={setCustomBackgroundHex}
              customTextHex={customTextHex}
              onCustomTextHexChange={setCustomTextHex}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 sm:right-4 lg:hidden"
            onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
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
