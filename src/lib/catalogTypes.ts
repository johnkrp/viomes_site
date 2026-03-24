export type CatalogVariant = {
  code: string;
  description: string;
  color: string;
  image_url: string;
  pack?: string;
  excel_ar?: string;
  stock?: number | null;
};

export type ProductSpecs = {
  liters?: string | null;
  width?: string | null;
  depth?: string | null;
  box_height?: string | null;
  diameter?: string | null;
  height?: string | null;
  has_specs?: boolean;
};

export type CatalogSizeGroup = {
  size_label: string;
  size_code: string;
  variants: CatalogVariant[];
  colors_count: number;
  specs?: ProductSpecs;
};

export type GroupedProduct = {
  id: string;
  family_indicator?: string;
  group_root?: string;
  category?: string;
  title: string;
  representative_image: string;
  sizes: CatalogSizeGroup[];
  sizes_count: number;
  variants_count: number;
};
