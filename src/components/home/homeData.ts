export type ProductCategory = {
  title: string;
  en: string;
  hoverEmoji: string;
  image: string;
  href: string;
};

export type TopProduct = {
  title: string;
  en: string;
  image: string;
  href: string;
};

export const productCategories: ProductCategory[] = [
  {
    title: "Είδη Σπιτιού",
    en: "Home Items",
    hoverEmoji: "🏠",
    image: "/images/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/eidi-spitioy",
  },
  {
    title: "Γλάστρες",
    en: "Planters",
    hoverEmoji: "🪴",
    image: "/images/AND_6053.JPG",
    href: "/products/glastres",
  },
  {
    title: "Επαγγελματικός Εξοπλισμός",
    en: "Professional Equipment",
    hoverEmoji: "🧰",
    image: "/images/ΚΑΔΟΙ.JPG",
    href: "/products/epaggelmatikos-eksoplismos",
  },
];

export const topProducts: TopProduct[] = [
  {
    title: "Κάδος Αποθήκευσης",
    en: "Storage Bin",
    image: "/images/ΚΑΔΟΙ.JPG",
    href: "/products/epaggelmatikos-eksoplismos",
  },
  {
    title: "Γλάστρα Urban",
    en: "Urban Planter",
    image: "/images/AND_6053.JPG",
    href: "/products/glastres",
  },
  {
    title: "Σετ Ειδών Σπιτιού",
    en: "Home Essentials",
    image: "/images/ΕΙΔΗ ΣΠΙΤΙΟΥ.JPG",
    href: "/products/eidi-spitioy",
  },
];
