export type ProductCategory = {
  title: string;
  en: string;
  description: string;
  hoverEmoji: string;
  image: string;
  href: string;
};

export type TopProduct = {
  title: string;
  en: string;
  badge: string;
  featuredItems: string[];
  image: string;
  href: string;
};

export const productCategories: ProductCategory[] = [
  {
    title: "Είδη Σπιτιού",
    en: "Home Items",
    description: "Λύσεις καθημερινής οργάνωσης και αποθήκευσης.",
    hoverEmoji: "🏠",
    image: "https://viomes.gr/images/hero/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/eidi-spitioy",
  },
  {
    title: "Γλάστρες",
    en: "Planters",
    description: "Ανθεκτικές σειρές για εσωτερικούς και εξωτερικούς χώρους.",
    hoverEmoji: "🪴",
    image: "https://viomes.gr/images/hero/AND_6053.JPG",
    href: "/products/glastres",
  },
  {
    title: "Επαγγελματικός Εξοπλισμός",
    en: "Professional Equipment",
    description: "Σχεδιασμένος για απαιτητική καθημερινή επαγγελματική χρήση.",
    hoverEmoji: "🧰",
    image: "https://viomes.gr/images/hero/ΚΑΔΟΙ.JPG",
    href: "/products/epaggelmatikos-eksoplismos",
  },
];

export const topProducts: TopProduct[] = [
  {
    title: "Κάδος Ανακύκλωσης CUBO",
    en: "Recycling Bin CUBO",
    badge: "Heavy-Duty",
    featuredItems: ["1070-50", "1070.1-84", "1070.6-98"],
    image: "https://viomes.gr/images/hero/ΚΑΔΟΙ.JPG",
    href: "/products/1890",
  },
  {
    title: "Γλάστρα BASIC LINEA",
    en: "BASIC LINEA Planter",
    badge: "Recycled",
    featuredItems: ["872-79"],
    image: "https://viomes.gr/images/hero/AND_6053.JPG",
    href: "/products/2780",
  },
  {
    title: "Κουτί τακτοποίησης NOVA",
    en: "NOVA Storage Box",
    badge: "New",
    featuredItems: ["681.6-96", "690.6-97"],
    image: "https://viomes.gr/images/hero/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/1880",
  },
];
