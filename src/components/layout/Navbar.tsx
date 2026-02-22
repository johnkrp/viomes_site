import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

const PALETTE_DEFAULT_VERSION = "classic-2026-02";

type BackgroundColorOption = {
  code: string;
  label: string;
  background: string;
  card: string;
  popover: string;
  muted: string;
  border: string;
  input: string;
  sidebar: string;
  sidebarAccent: string;
  sidebarBorder: string;
};

type TextSecondaryColorOption = {
  code: string;
  label: string;
  foreground: string;
  primary: string;
  secondary: string;
  mutedForeground: string;
  ring: string;
  sidebarForeground: string;
};

const backgroundColorOptions = [
  {
    code: "sand",
    label: "Sand",
    background: "33 17% 90%",
    card: "33 17% 94%",
    popover: "33 17% 94%",
    muted: "33 17% 80%",
    border: "33 17% 74%",
    input: "33 17% 78%",
    sidebar: "33 17% 86%",
    sidebarAccent: "33 17% 80%",
    sidebarBorder: "33 17% 72%",
  },
  {
    code: "mist",
    label: "Mist",
    background: "210 18% 92%",
    card: "210 20% 96%",
    popover: "210 20% 96%",
    muted: "210 15% 84%",
    border: "210 14% 76%",
    input: "210 14% 80%",
    sidebar: "210 15% 88%",
    sidebarAccent: "210 14% 83%",
    sidebarBorder: "210 14% 74%",
  },
  {
    code: "ivory",
    label: "Ivory",
    background: "42 35% 94%",
    card: "42 38% 97%",
    popover: "42 38% 97%",
    muted: "42 22% 86%",
    border: "42 20% 78%",
    input: "42 20% 82%",
    sidebar: "42 26% 90%",
    sidebarAccent: "42 22% 84%",
    sidebarBorder: "42 20% 76%",
  },
  {
    code: "pearl",
    label: "Pearl",
    background: "30 20% 95%",
    card: "30 22% 98%",
    popover: "30 22% 98%",
    muted: "30 14% 88%",
    border: "30 12% 80%",
    input: "30 12% 84%",
    sidebar: "30 16% 91%",
    sidebarAccent: "30 14% 86%",
    sidebarBorder: "30 12% 78%",
  },
  {
    code: "linen",
    label: "Linen",
    background: "18 26% 92%",
    card: "18 30% 96%",
    popover: "18 30% 96%",
    muted: "18 20% 84%",
    border: "18 18% 76%",
    input: "18 18% 80%",
    sidebar: "18 22% 88%",
    sidebarAccent: "18 20% 82%",
    sidebarBorder: "18 18% 74%",
  },
  {
    code: "ash",
    label: "Ash",
    background: "210 8% 90%",
    card: "210 10% 95%",
    popover: "210 10% 95%",
    muted: "210 8% 82%",
    border: "210 8% 74%",
    input: "210 8% 78%",
    sidebar: "210 9% 86%",
    sidebarAccent: "210 8% 80%",
    sidebarBorder: "210 8% 72%",
  },
  {
    code: "sage-paper",
    label: "Sage Paper",
    background: "118 16% 92%",
    card: "118 18% 96%",
    popover: "118 18% 96%",
    muted: "118 12% 84%",
    border: "118 10% 76%",
    input: "118 10% 80%",
    sidebar: "118 13% 88%",
    sidebarAccent: "118 11% 82%",
    sidebarBorder: "118 10% 74%",
  },
  {
    code: "custom",
    label: "Custom",
    background: "33 17% 90%",
    card: "33 17% 94%",
    popover: "33 17% 94%",
    muted: "33 17% 80%",
    border: "33 17% 74%",
    input: "33 17% 78%",
    sidebar: "33 17% 86%",
    sidebarAccent: "33 17% 80%",
    sidebarBorder: "33 17% 72%",
  },
] as readonly BackgroundColorOption[];

const textSecondaryColorOptions = [
  {
    code: "viomes-red",
    label: "Viomes Red",
    foreground: "2 39% 22%",
    primary: "2 39% 47%",
    secondary: "33 17% 84%",
    mutedForeground: "2 20% 35%",
    ring: "2 39% 47%",
    sidebarForeground: "2 39% 25%",
  },
  {
    code: "forest",
    label: "Forest",
    foreground: "148 34% 19%",
    primary: "148 43% 35%",
    secondary: "148 20% 84%",
    mutedForeground: "148 12% 33%",
    ring: "148 43% 35%",
    sidebarForeground: "148 30% 23%",
  },
  {
    code: "slate",
    label: "Slate",
    foreground: "218 18% 23%",
    primary: "218 28% 40%",
    secondary: "218 18% 85%",
    mutedForeground: "218 12% 38%",
    ring: "218 28% 40%",
    sidebarForeground: "218 16% 28%",
  },
  {
    code: "copper",
    label: "Copper",
    foreground: "19 42% 24%",
    primary: "19 56% 43%",
    secondary: "19 18% 84%",
    mutedForeground: "19 16% 36%",
    ring: "19 56% 43%",
    sidebarForeground: "19 34% 29%",
  },
  {
    code: "teal",
    label: "Teal",
    foreground: "182 54% 20%",
    primary: "182 62% 36%",
    secondary: "182 22% 84%",
    mutedForeground: "182 18% 34%",
    ring: "182 62% 36%",
    sidebarForeground: "182 40% 25%",
  },
  {
    code: "aubergine",
    label: "Aubergine",
    foreground: "318 30% 22%",
    primary: "318 42% 40%",
    secondary: "318 16% 84%",
    mutedForeground: "318 14% 35%",
    ring: "318 42% 40%",
    sidebarForeground: "318 24% 27%",
  },
  {
    code: "charcoal",
    label: "Charcoal",
    foreground: "220 9% 18%",
    primary: "220 12% 34%",
    secondary: "220 10% 82%",
    mutedForeground: "220 8% 33%",
    ring: "220 12% 34%",
    sidebarForeground: "220 8% 24%",
  },
  {
    code: "custom",
    label: "Custom",
    foreground: "2 39% 22%",
    primary: "2 39% 47%",
    secondary: "33 17% 84%",
    mutedForeground: "2 20% 35%",
    ring: "2 39% 47%",
    sidebarForeground: "2 39% 25%",
  },
] as readonly TextSecondaryColorOption[];

const typographyOptions = [
  {
    code: "inter-poppins",
    label: "Inter + Poppins",
    sans: '"Poppins", sans-serif',
    heading: '"Inter", sans-serif',
  },
  {
    code: "manrope-poppins",
    label: "Manrope + Poppins",
    sans: '"Poppins", sans-serif',
    heading: '"Manrope", sans-serif',
  },
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
    code: "quicksand",
    label: "Quicksand",
    sans: '"Quicksand", sans-serif',
    heading: '"Quicksand", sans-serif',
  },
  {
    code: "mulish",
    label: "Mulish",
    sans: '"Mulish", sans-serif',
    heading: '"Mulish", sans-serif',
  },
  {
    code: "noto-sans",
    label: "Noto Sans",
    sans: '"Noto Sans", sans-serif',
    heading: '"Noto Sans", sans-serif',
  },
  {
    code: "source-sans-3",
    label: "Source Sans 3",
    sans: '"Source Sans 3", sans-serif',
    heading: '"Source Sans 3", sans-serif',
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

const sizeOptions = [
  { code: "xs", label: "X-Small", scale: 0.8 },
  { code: "sm", label: "Small", scale: 0.9 },
  { code: "md", label: "Medium", scale: 1 },
  { code: "lg", label: "Large", scale: 1.1 },
  { code: "xl", label: "X-Large", scale: 1.2 },
  { code: "xxl", label: "XX-Large", scale: 1.3 },
] as const;

const baseTextSizes = {
  "--text-xs": "0.75rem",
  "--text-sm": "0.875rem",
  "--text-base": "1rem",
  "--text-lg": "1.125rem",
  "--text-xl": "1.25rem",
  "--text-2xl": "1.5rem",
  "--text-3xl": "1.875rem",
  "--text-4xl": "2.25rem",
  "--text-5xl": "3rem",
  "--text-6xl": "3.75rem",
  "--text-7xl": "4.5rem",
  "--text-8xl": "6rem",
  "--text-9xl": "8rem",
} as const;

const plainTextSizeKeys = ["--text-xs", "--text-sm", "--text-base", "--text-lg"] as const;
const titleSizeKeys = [
  "--text-xl",
  "--text-2xl",
  "--text-3xl",
  "--text-4xl",
  "--text-5xl",
  "--text-6xl",
  "--text-7xl",
  "--text-8xl",
  "--text-9xl",
] as const;

const flagClassByLanguage: Record<string, string> = {
  el: "fi fi-gr",
  en: "fi fi-gb",
  fr: "fi fi-fr",
  de: "fi fi-de",
};

const getFlagClass = (code: string) =>
  flagClassByLanguage[code] ?? flagClassByLanguage.en;

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
  const [language, setLanguage] = useState<string>(
    () => localStorage.getItem("viomes_language") || "el",
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    () => {
      try {
        const savedVersion = localStorage.getItem("viomes_palette_version");
        if (savedVersion !== PALETTE_DEFAULT_VERSION) {
          return "sand";
        }
        return localStorage.getItem("viomes_background_color") || "sand";
      } catch {
        return "sand";
      }
    },
  );
  const [textSecondaryColor, setTextSecondaryColor] = useState<string>(
    () => {
      try {
        const savedVersion = localStorage.getItem("viomes_palette_version");
        if (savedVersion !== PALETTE_DEFAULT_VERSION) {
          return "viomes-red";
        }
        return localStorage.getItem("viomes_text_secondary_color") || "viomes-red";
      } catch {
        return "viomes-red";
      }
    },
  );
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
    let selectedBackground =
      backgroundColorOptions.find((option) => option.code === backgroundColor) ??
      backgroundColorOptions[0];

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

    document.documentElement.style.setProperty("--background", selectedBackground.background);
    document.documentElement.style.setProperty("--card", selectedBackground.card);
    document.documentElement.style.setProperty("--popover", selectedBackground.popover);
    document.documentElement.style.setProperty("--muted", selectedBackground.muted);
    document.documentElement.style.setProperty("--border", selectedBackground.border);
    document.documentElement.style.setProperty("--input", selectedBackground.input);
    document.documentElement.style.setProperty("--sidebar", selectedBackground.sidebar);
    document.documentElement.style.setProperty("--sidebar-accent", selectedBackground.sidebarAccent);
    document.documentElement.style.setProperty("--sidebar-border", selectedBackground.sidebarBorder);
    document.documentElement.style.setProperty("--chart-2", selectedBackground.muted);
    document.documentElement.style.setProperty("--chart-4", selectedBackground.border);

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
      textSecondaryColorOptions.find((option) => option.code === textSecondaryColor) ??
      textSecondaryColorOptions[0];

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

    document.documentElement.style.setProperty("--foreground", selectedTextSecondary.foreground);
    document.documentElement.style.setProperty("--card-foreground", selectedTextSecondary.foreground);
    document.documentElement.style.setProperty("--popover-foreground", selectedTextSecondary.foreground);
    document.documentElement.style.setProperty("--primary", selectedTextSecondary.primary);
    document.documentElement.style.setProperty("--accent", selectedTextSecondary.primary);
    document.documentElement.style.setProperty("--secondary", selectedTextSecondary.secondary);
    document.documentElement.style.setProperty("--secondary-foreground", selectedTextSecondary.foreground);
    document.documentElement.style.setProperty("--muted-foreground", selectedTextSecondary.mutedForeground);
    document.documentElement.style.setProperty("--ring", selectedTextSecondary.ring);
    document.documentElement.style.setProperty("--sidebar-foreground", selectedTextSecondary.sidebarForeground);
    document.documentElement.style.setProperty("--sidebar-primary", selectedTextSecondary.primary);
    document.documentElement.style.setProperty("--sidebar-ring", selectedTextSecondary.ring);
    document.documentElement.style.setProperty("--chart-1", selectedTextSecondary.primary);
    document.documentElement.style.setProperty("--chart-3", selectedTextSecondary.foreground);
    document.documentElement.style.setProperty("--chart-5", selectedTextSecondary.primary);

    try {
      localStorage.setItem("viomes_text_secondary_color", selectedTextSecondary.code);
      localStorage.setItem("viomes_custom_text_hex", customTextHex);
      localStorage.setItem("viomes_palette_version", PALETTE_DEFAULT_VERSION);
    } catch {
      /* ignore */
    }
  }, [textSecondaryColor, customTextHex]);

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

  useEffect(() => {
    const selectedTitleSize = sizeOptions.find((option) => option.code === titleSize) ?? sizeOptions[1];
    const selectedPlainTextSize =
      sizeOptions.find((option) => option.code === plainTextSize) ?? sizeOptions[1];

    const toScaledRem = (value: string, scale: number) => {
      const rem = Number.parseFloat(value.replace("rem", ""));
      return `${(rem * scale).toFixed(4).replace(/\.?0+$/, "")}rem`;
    };

    plainTextSizeKeys.forEach((cssVar) => {
      const baseValue = baseTextSizes[cssVar];
      document.documentElement.style.setProperty(cssVar, toScaledRem(baseValue, selectedPlainTextSize.scale));
    });

    titleSizeKeys.forEach((cssVar) => {
      const baseValue = baseTextSizes[cssVar];
      document.documentElement.style.setProperty(cssVar, toScaledRem(baseValue, selectedTitleSize.scale));
    });

    try {
      localStorage.setItem("viomes_title_size", selectedTitleSize.code);
      localStorage.setItem("viomes_plain_text_size", selectedPlainTextSize.code);
    } catch {
      /* ignore */
    }
  }, [titleSize, plainTextSize]);

  const selectedLanguage =
    languages.find((selected) => selected.code === language) ?? languages[0];
  const selectedBackgroundColor =
    backgroundColorOptions.find((selected) => selected.code === backgroundColor) ??
    backgroundColorOptions[0];
  const selectedTextSecondaryColor =
    textSecondaryColorOptions.find((selected) => selected.code === textSecondaryColor) ??
    textSecondaryColorOptions[0];
  const selectedTypography =
    typographyOptions.find((selected) => selected.code === typography) ?? typographyOptions[0];
  const selectedTitleSize = sizeOptions.find((selected) => selected.code === titleSize) ?? sizeOptions[1];
  const selectedPlainTextSize =
    sizeOptions.find((selected) => selected.code === plainTextSize) ?? sizeOptions[1];
  const compactTriggerClassName =
    "inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/30 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm transition hover:bg-background/45";

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
          <div className="hidden lg:flex items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger className={compactTriggerClassName}>
                <span>Settings</span>
                <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                  Site Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Language: {selectedLanguage.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
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
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Font: {selectedTypography.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={typography} onValueChange={setTypography}>
                      {typographyOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.code} value={option.code}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Title size: {selectedTitleSize.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={titleSize} onValueChange={setTitleSize}>
                      {sizeOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.code} value={option.code}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Text size: {selectedPlainTextSize.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={plainTextSize} onValueChange={setPlainTextSize}>
                      {sizeOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.code} value={option.code}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Background: {selectedBackgroundColor.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={backgroundColor} onValueChange={setBackgroundColor}>
                      {backgroundColorOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.code} value={option.code}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-sm">Text / Secondary: {selectedTextSecondaryColor.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={textSecondaryColor} onValueChange={setTextSecondaryColor}>
                      {textSecondaryColorOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.code} value={option.code}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                {backgroundColor === "custom" || textSecondaryColor === "custom" ? (
                  <>
                    <DropdownMenuSeparator />
                    {backgroundColor === "custom" ? (
                      <div className="px-2 py-1.5">
                        <label className="mb-1 block text-xs text-foreground/70">Custom background</label>
                        <input
                          type="color"
                          value={customBackgroundHex}
                          onChange={(event) => setCustomBackgroundHex(event.target.value)}
                          className="h-8 w-full cursor-pointer rounded-md border border-border/60 bg-background/30 p-0.5"
                          aria-label="Custom background color"
                        />
                      </div>
                    ) : null}
                    {textSecondaryColor === "custom" ? (
                      <div className="px-2 py-1.5">
                        <label className="mb-1 block text-xs text-foreground/70">Custom text / secondary</label>
                        <input
                          type="color"
                          value={customTextHex}
                          onChange={(event) => setCustomTextHex(event.target.value)}
                          className="h-8 w-full cursor-pointer rounded-md border border-border/60 bg-background/30 p-0.5"
                          aria-label="Custom text and secondary color"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}
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
              <label className="sr-only">Title size</label>
              <select
                value={titleSize}
                onChange={(event) => setTitleSize(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {sizeOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="sr-only">Text size</label>
              <select
                value={plainTextSize}
                onChange={(event) => setPlainTextSize(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {sizeOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
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
            <div>
              <label className="sr-only">Background color</label>
              <select
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {backgroundColorOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {backgroundColor === "custom" ? (
              <div>
                <label className="sr-only">Custom background color</label>
                <input
                  type="color"
                  value={customBackgroundHex}
                  onChange={(event) => setCustomBackgroundHex(event.target.value)}
                  className="h-10 w-full cursor-pointer rounded-md border border-border bg-transparent p-1"
                />
              </div>
            ) : null}
            <div>
              <label className="sr-only">Text and secondary color</label>
              <select
                value={textSecondaryColor}
                onChange={(event) => setTextSecondaryColor(event.target.value)}
                className="w-full bg-transparent border border-border text-sm rounded-md px-3 py-2"
              >
                {textSecondaryColorOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {textSecondaryColor === "custom" ? (
              <div>
                <label className="sr-only">Custom text and secondary color</label>
                <input
                  type="color"
                  value={customTextHex}
                  onChange={(event) => setCustomTextHex(event.target.value)}
                  className="h-10 w-full cursor-pointer rounded-md border border-border bg-transparent p-1"
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
