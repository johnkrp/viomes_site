export const siteCategories = [
  "Είδη Σπιτιού",
  "Γλάστρες",
  "Επαγγελματικός Εξοπλισμός",
] as const;

export type SiteCategory = (typeof siteCategories)[number];

type ProductCategoryCandidate = {
  id: string;
  title: string;
  family_indicator?: string;
  group_root?: string;
};

export const HOME_ITEMS_SUBCATEGORIES = [
  "Αεροστεγή",
  "Εξοπλισμός κουζίνας",
  "Λεκάνες",
  "Φαράσια",
  "Είδη μπάνιου",
  "Κουβάδες και στυφτήρια",
  "Κάδοι απορριμάτων & ανακύκλωσης",
  "Εξοπλισμός ρούχων",
  "Κουτιά",
  "Επιπλα κήπου",
  "Λοιπός οικιακός εξοπλισμός",
] as const;

export const PLANTERS_SUBCATEGORIES = [
  "Γλάστρες τοίχου",
  "Γλάστρες και πιάτα",
  "Ζαρντινιέρες",
] as const;

export const PROFESSIONAL_SUBCATEGORIES = [
  "Κάδοι απορριμμάτων",
  "Εξοπλισμός τουαλέτας",
  "Σκεύη καθαρισμού",
] as const;

export const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const resolveSiteCategories = (product: ProductCategoryCandidate) => {
  const familyText = product.family_indicator || product.group_root || "";
  const text = normalizeGreek(`${product.title} ${product.id} ${familyText}`);
  const categories = new Set<SiteCategory>();

  const homeKeywords = [
    "showroom",
    "kiklos",
    "deco",
    "cubo",
    "basic bin",
    "waste container",
    "pedal bin",
    "wc equipment",
    "equipment for clothes",
    "storage box",
    "nova box",
    "cleaning equipment",
    "bucket",
    "wringer",
    "dust pan",
    "kitchen collection",
    "fresco",
    "food container",
    "ora basin",
    "basin",
    "dish drainer",
    "kitchen equipment",
    "household article",
    "garden furniture",
    "καδος",
    "λεκαν",
    "κουβα",
    "κουτι",
    "αποθηκευ",
    "πιατοθηκ",
    "κουζιν",
    "wc",
  ];

  if (homeKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Είδη Σπιτιού");
  }

  const planterKeywords = [
    "γλαστ",
    "πιατο γλαστ",
    "ζαρντιν",
    "κασπω",
    "φυτο",
    "orchid flowerpot",
    "lily flowerpot",
    "terracotta flowerpot",
    "terracotta round",
    "terracotta flowerbowl",
    "terracotta plate",
    "terracotta small jardiniere",
    "terracotta big jardiniere",
    "greenhouse flowerpot",
    "linea flowerpot",
    "linea round",
    "linea square",
    "linea mosaic",
    "linea jardiniere",
    "vita",
    "lotus",
    "iris",
    "innova",
    "cilindro",
    "gea",
    "plant",
    "planter",
    "pot",
    "campana",
    "sydney",
    "rondo",
  ];

  if (planterKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Γλάστρες");
  }

  const professionalKeywords = [
    "ho.re.ca",
    "horeca",
    "βιομηχαν",
    "επαγγελματ",
    "kiklos collection",
    "deco bin",
    "cubo bin",
    "basic bin",
    "waste container",
    "pedal bin",
    "wc equipment",
    "toilet brush",
    "καδος",
    "πενταλ",
    "τουαλετ",
    "stand",
    "κονταρι",
    "παρκετεζ",
  ];

  if (professionalKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Επαγγελματικός Εξοπλισμός");
  }

  if (categories.size === 0) {
    categories.add("Είδη Σπιτιού");
  }

  return Array.from(categories);
};

export const resolvePrimaryCategory = (product: ProductCategoryCandidate) => {
  const categories = resolveSiteCategories(product);
  if (categories.includes("Γλάστρες")) return "Γλάστρες";
  if (categories.includes("Επαγγελματικός Εξοπλισμός")) {
    return "Επαγγελματικός Εξοπλισμός";
  }
  return "Είδη Σπιτιού";
};
