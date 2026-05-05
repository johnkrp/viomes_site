export const siteCategories = [
  "Μπάνιο",
  "Κουζίνα",
  "Κήπος",
  "Καθαριότητα",
] as const;

export type SiteCategory = (typeof siteCategories)[number];

type ProductCategoryCandidate = {
  id: string;
  title: string;
  family_indicator?: string;
  group_root?: string;
  category?: string;
};

export const BATHROOM_SUBCATEGORIES = [
  "Είδη μπάνιου",
  "Λεκάνες",
  "Κουβάδες και στυφτήρια",
  "Αεροστεγή",
] as const;

export const KITCHEN_SUBCATEGORIES = [
  "Φαγητοδοχεία",
  "Σερβίρισμα",
  "Σκεύη μαγειρικής",
  "Εξοπλισμός κουζίνας",
  "Κάδοι απορριμμάτων",
] as const;

export const GARDEN_SUBCATEGORIES = [
  "Γλάστρες τοίχου",
  "Γλάστρες και πιάτα",
  "Ζαρντινιέρες",
  "Επιπλα κήπου",
] as const;

export const CLEANING_SUBCATEGORIES = [
  "Κάδοι απορριμάτων & ανακύκλωσης",
  "Εξοπλισμός τουαλέτας",
  "Σκεύη καθαρισμού",
  "Εξοπλισμός ρούχων",
] as const;

export const HOME_ITEMS_SUBCATEGORIES = BATHROOM_SUBCATEGORIES;

export const PLANTERS_SUBCATEGORIES = GARDEN_SUBCATEGORIES;

export const PROFESSIONAL_SUBCATEGORIES = CLEANING_SUBCATEGORIES;

export const normalizeGreek = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const mapExcelCategoryToSiteCategory = (value: string): SiteCategory => {
  const normalized = normalizeGreek(value || "");
  if (normalized.includes("μπανιο")) return "Μπάνιο";
  if (normalized.includes("κουζιν")) return "Κουζίνα";
  if (normalized.includes("γλαστρες") || normalized.includes("κηπος"))
    return "Κήπος";
  if (normalized.includes("καθαριοτητα") || normalized.includes("επαγγελματ"))
    return "Καθαριότητα";
  if (normalized.includes("ειδη σπιτιου")) return "Μπάνιο";
  return "Μπάνιο";
};

export const resolveSiteCategories = (product: ProductCategoryCandidate) => {
  if (product.category) {
    return [mapExcelCategoryToSiteCategory(product.category)];
  }

  const familyText = product.family_indicator || product.group_root || "";
  const text = normalizeGreek(`${product.title} ${product.id} ${familyText}`);
  const categories = new Set<SiteCategory>();

  const bathroomKeywords = [
    "wc equipment",
    "toilet brush",
    "basin",
    "λεκαν",
    "τουαλετ",
    "μπανιο",
    "wc",
  ];

  if (bathroomKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Μπάνιο");
  }

  const kitchenKeywords = [
    "kitchen collection",
    "fresco",
    "food container",
    "dish drainer",
    "kitchen equipment",
    "storage box",
    "nova box",
    "κουζιν",
    "κουτι",
    "αποθηκευ",
    "πιατοθηκ",
  ];

  if (kitchenKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Κουζίνα");
  }

  const gardenKeywords = [
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
    "garden furniture",
    "κηπος",
  ];

  if (gardenKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Κήπος");
  }

  const cleaningKeywords = [
    "ho.re.ca",
    "horeca",
    "βιομηχαν",
    "cleaning equipment",
    "kiklos collection",
    "deco bin",
    "cubo bin",
    "basic bin",
    "waste container",
    "pedal bin",
    "bucket",
    "wringer",
    "dust pan",
    "equipment for clothes",
    "κουβα",
    "κουβαδα",
    "καδος",
    "πενταλ",
    "stand",
    "κονταρι",
    "παρκετεζ",
  ];

  if (cleaningKeywords.some((keyword) => text.includes(keyword))) {
    categories.add("Καθαριότητα");
  }

  if (categories.size === 0) {
    categories.add("Μπάνιο");
  }

  return Array.from(categories);
};

export const resolvePrimaryCategory = (product: ProductCategoryCandidate) => {
  const categories = resolveSiteCategories(product);
  if (categories.includes("Κήπος")) return "Κήπος";
  if (categories.includes("Κουζίνα")) return "Κουζίνα";
  if (categories.includes("Καθαριότητα")) return "Καθαριότητα";
  return "Μπάνιο";
};
