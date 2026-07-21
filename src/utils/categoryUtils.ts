import { Category, CategoryFilter } from "../types";

const CATEGORY_ALIASES: Record<string, CategoryFilter> = {
  babysets: "babyset",
  babyset: "babyset",
  accessories: "accessories",
  accessory: "accessories",
  tshirts: "tshirt",
  tshirt: "tshirt",
  teeshirts: "tshirt",
  teeshirt: "tshirt",
  cordsets: "cordset",
  cordset: "cordset",
};

/**
 * Normalize Firebase/admin category strings into stable filter values.
 * Handles names, slugs, ids, and legacy app values.
 */
export function normalizeCategoryValue(value: unknown): CategoryFilter {
  if (value === "all") return "all";

  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");

  if (!normalized) return "";

  return CATEGORY_ALIASES[normalized] ?? normalized;
}

export function categoryMatches(
  productCategory: unknown,
  selectedCategory: CategoryFilter,
): boolean {
  return (
    selectedCategory === "all" ||
    normalizeCategoryValue(productCategory) === normalizeCategoryValue(selectedCategory)
  );
}

/**
 * Format a category name for display - completely dynamic
 * Handles: snake_case, kebab-case, camelCase, and any string
 */
export function formatCategoryName(category: CategoryFilter): string {
  if (category === "all") return "All Items";
  
  if (typeof category === 'string') {
    // Remove any special characters and split
    return category
      .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .trim()
      .split(' ')
      .map(word => {
        // Handle special cases like "t-shirt" -> "T-Shirt"
        if (word.length <= 2) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }
  
  return String(category);
}

/**
 * Generate category tabs from Firebase categories
 */
export function generateCategoryTabs(categories: Category[]): CategoryFilter[] {
  const tabs: CategoryFilter[] = ["all"];
  categories.forEach(cat => {
    if (cat.value && cat.value !== "all") {
      tabs.push(cat.value);
    }
  });
  return tabs;
}

/**
 * Get category label from Firebase categories or format dynamically
 */
export function getCategoryLabel(
  category: CategoryFilter, 
  categories: Category[]
): string {
  if (category === "all") return "All Items";
  
  // Find the category in Firebase categories
  const found = categories.find(cat => cat.value === category);
  if (found) return found.label;
  
  // If not found, format dynamically
  return formatCategoryName(category);
}
