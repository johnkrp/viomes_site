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
    title: "Μπάνιο",
    en: "Bathroom",
    description: "Λύσεις οργάνωσης βάνιου.",
    hoverEmoji: "🛁",
    image: "https://viomes.gr/images/hero/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/mpanio",
  },
  {
    title: "Κουζίνα",
    en: "Kitchen",
    description: "Ανθεκτά είδη κουζίνας και αποθήκευσης.",
    hoverEmoji: "🚪",
    image: "https://viomes.gr/images/hero/AND_6053.JPG",
    href: "/products/kouzina",
  },
  {
    title: "Κήπος",
    en: "Garden",
    description: "Γλάστρες και λύσεις για κήπους.",
    hoverEmoji: "🌱",
    image: "https://viomes.gr/images/hero/ΚΑΔΟΙ.JPG",
    href: "/products/kipos",
  },
  {
    title: "Καθαριότητα",
    en: "Cleaning",
    description: "Εξοπλισμός καθαρισμού.",
    hoverEmoji: "🧹",
    image: "https://viomes.gr/images/hero/ΚΑΔΟΙ.JPG",
    href: "/products/kathariotita",
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
