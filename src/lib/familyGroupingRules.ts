/**
 * Manual Family Grouping Rules
 *
 * This file serves as the source of truth for how product families should be grouped
 * on detail pages. When a product group contains multiple distinct families (by size_code),
 * this file defines whether they should:
 * - Be split into separate detail pages (split rule)
 * - Remain together on one detail page (unified rule)
 *
 * Format:
 * - split: families are split into separate products (one detail page per family)
 *   Example: Group 1390 contains laundry baskets AND hangers → split into 1390-440, 1390-460, 1390-94, 1390-95
 * - unified: families remain together on one detail page
 *   Example: Group XYZ contains size variants of the same product → keep as one product
 */

export interface SizesGroup {
  groupName: string; // e.g., "GROUP1", "GROUP2", used as suffix in product ID
  sizeCodes: string[]; // array of size_code values to group together
  title?: string; // optional custom title for this group
  subcategory?: string; // optional site subcategory, e.g. "Σερβίρισμα"
}

export interface GroupingRule {
  type: "split" | "unified";
  description?: string;
  splits?: SizesGroup[]; // Only for "split" type - groups of size_codes
}

export type FamilyGroupingRules = Record<string, GroupingRule>;

/**
 * Active grouping rules for all product groups
 *
 * @example
 * "1390": {
 *   type: "split",
 *   description: "Laundry baskets and hangers - completely different products",
 *   splits: [
 *     { sizeCode: "440", id: "1390-440" }, // Καλάθι πλυμένων
 *     { sizeCode: "460", id: "1390-460" }, // Another variant
 *     { sizeCode: "94", id: "1390-94" },   // Κρεμάστρες σετ 6 τεμ.
 *     { sizeCode: "95", id: "1390-95" }    // Another hanger variant
 *   ]
 * }
 */
export const familyGroupingRules: FamilyGroupingRules = {
  // GUSTO Kitchen Category (Product 1270)
  // User decision: Size_codes grouped into 3 detail pages
  "1270": {
    type: "split",
    description: "Gusto Kitchen - size codes grouped into 3 subcategories",
    splits: [
      {
        groupName: "1020",
        sizeCodes: ["1020", "1021"],
        title: "Ποτήρι GUSTO",
        subcategory: "Σερβίρισμα",
      },
      {
        groupName: "1030",
        sizeCodes: ["1030", "1031", "1032"],
        title: "Πιάτο GUSTO",
        subcategory: "Σερβίρισμα",
      },
      {
        groupName: "1040",
        sizeCodes: ["1040", "1041"],
        title: "Μπωλ GUSTO",
        subcategory: "Σερβίρισμα",
      },
    ],
  },

  "1205": {
    type: "split",
    description: "Fresco Kitchen",
    splits: [
      {
        groupName: "1205",
        sizeCodes: ["1050", "1051", "1150", "1151", "1250", "1251"],
        title: "Φαγητοδοχεία ορθογώνια KEEP IT FRESCO",
        subcategory: "Φαγητοδοχεία",
      },
    ],
  },

  "1210": {
    type: "split",
    description: "Αεροστεγή τετράγωνα/παραλληλόγραμμα φαγητοδοχεία",
    splits: [
      {
        groupName: "50",
        sizeCodes: ["50", "51", "510", "52", "450", "451", "452"],
        title: "Αεροστεγή φαγητοδοχεία τετράγωνα",
        subcategory: "Φαγητοδοχεία",
      },
      {
        groupName: "47",
        sizeCodes: ["46.1", "47.1", "45", "447"],
        title: "Αεροστεγή φαγητοδοχεία παραλληλόγραμμα",
        subcategory: "Φαγητοδοχεία",
      },
    ],
  },

  // Add more grouping rules here as the user defines them
  // Example template (uncomment and fill in when user provides rules):
  /*
  "2000": {
    type: "split",
    description: "Description of why this group should be split",
    splits: [
      { groupName: "A", sizeCodes: ["100", "200"] },
      { groupName: "B", sizeCodes: ["300"] }
    ]
  }
  */
};

/**
 * Helper function to get the grouping rule for a product group
 */
export function getGroupingRule(groupRoot: string): GroupingRule | undefined {
  return familyGroupingRules[groupRoot];
}

/**
 * Helper function to check if a group should be split
 */
export function shouldSplitGroup(groupRoot: string): boolean {
  const rule = getGroupingRule(groupRoot);
  return rule?.type === "split";
}
