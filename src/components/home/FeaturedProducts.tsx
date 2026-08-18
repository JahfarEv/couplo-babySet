import { forwardRef } from "react";
import { BellRing, PackagePlus, Sparkles } from "lucide-react";
import { CategoryFilter, Product } from "../../types";
import ProductCard from "@/src/components/home/ProductCard";
import { formatCategoryName } from "../../utils/categoryUtils";
import type { ProductPriceRange } from "../../hooks/useProducts";

interface FeaturedProductsProps {
  products: Product[];
  completedOrderCounts?: Record<string, number>;
  categoryFilter: CategoryFilter;
  categoryTabs?: CategoryFilter[];
  getCategoryLabel?: (category: CategoryFilter) => string;
  onCategoryChange: (category: CategoryFilter) => void;
  priceRange: ProductPriceRange;
  onPriceRangeChange: (range: ProductPriceRange) => void;
  onQuickView: (product: Product) => void;
  onOrder: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loadingPage: boolean;
  loading?: boolean;
}

// Default fallback if no tabs provided
const DEFAULT_CATEGORY_TABS: CategoryFilter[] = ["all"];

const FeaturedProducts = forwardRef<HTMLDivElement, FeaturedProductsProps>(
  ({ 
    products,
    completedOrderCounts = {},
    categoryFilter, 
    categoryTabs = DEFAULT_CATEGORY_TABS, 
    getCategoryLabel: labelMapper, 
    onCategoryChange, 
    priceRange,
    onPriceRangeChange,
    onQuickView, 
    onOrder, 
    onAddToCart,
    currentPage,
    totalPages,
    onPageChange,
    loadingPage,
    loading = false 
  }, ref) => {
    // Use provided tabs or defaults
    const tabs = categoryTabs.length ? categoryTabs : DEFAULT_CATEGORY_TABS;
    
    // Get label for category - either from mapper or format dynamically
    const labelFor = (category: CategoryFilter): string => {
      if (labelMapper) return labelMapper(category);
      return formatCategoryName(category);
    };
    const selectedCategoryLabel = labelFor(categoryFilter);

    return (
      <section ref={ref} id="featured-products" className="py-24 px-4 md:px-16 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Baby Favorites</span>
                {categoryFilter !== "all" && (
                  <span className="bg-primary-container text-primary rounded-full px-2 py-0.5 ml-1 lowercase font-semibold">
                    filtering: {labelFor(categoryFilter)}
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-1 mb-2">
                Soft Picks for Little Smiles
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium">
               Crafted with premium comfort and personalized elegance for your little one's special moments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={priceRange}
                onChange={(event) => onPriceRangeChange(event.target.value as ProductPriceRange)}
                className="rounded-full border border-primary/20 bg-surface-container-lowest px-4 py-2 text-xs font-semibold text-on-surface-variant outline-none transition-all focus:border-primary"
                aria-label="Filter products by price range"
              >
                <option value="all">All prices</option>
                <option value="99-599">₹99 - ₹599</option>
                <option value="599-1199">₹599 - ₹1199</option>
                <option value="1199-1799">₹1199 - ₹1799</option>
              </select>
              {tabs.map((cat) => (
                <button
                  key={String(cat)}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    categoryFilter === cat 
                      ? "bg-primary border-primary text-on-primary shadow-[0_10px_25px_rgba(216,111,146,0.22)]" 
                      : "bg-surface-container-lowest border-primary/10 text-on-surface-variant hover:border-primary/30 hover:bg-primary-container/60"
                  }`}
                >
                  {labelFor(cat)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-lowest p-8 rounded-[2rem] border border-dashed border-primary/20 shadow-[0_18px_45px_rgba(216,111,146,0.08)]">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              <span className="font-serif text-lg text-primary font-bold">
                Gathering the tiny outfits
              </span>
              <p className="text-xs text-outline max-w-sm">
                Your newest baby collection is being fetched now.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="relative overflow-hidden py-20 text-center flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-primary-container/70 via-white to-secondary-container/70 p-8 rounded-[2rem] border border-primary/15 shadow-[0_24px_60px_rgba(216,111,146,0.12)]">
              <div className="absolute top-6 left-8 w-16 h-16 rounded-full border border-primary/10" />
              <div className="absolute bottom-8 right-10 w-24 h-24 rounded-full border border-secondary/20" />
              <div className="relative w-16 h-16 rounded-full bg-white text-primary border border-primary/10 shadow-sm flex items-center justify-center">
                <PackagePlus className="w-7 h-7" />
              </div>
              <div className="relative space-y-2">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-primary bg-white/80 px-4 py-2 rounded-full border border-primary/10">
                  <BellRing className="w-3.5 h-3.5" />
                  Coming Soon
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-on-surface font-black">
                  Coming Soon
                </h3>
              </div>
              <p className="relative text-sm text-on-surface-variant leading-relaxed max-w-md">
                {categoryFilter === "all"
                  ? "We are preparing fresh baby collections. Please check back soon."
                  : `We are preparing fresh baby collections for ${selectedCategoryLabel}. Please check back soon.`}
              </p>
              <button
                onClick={() => onCategoryChange("all")}
                className="relative bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-semibold shadow-[0_12px_30px_rgba(216,111,146,0.25)] hover:bg-primary/95 transition-all"
              >
                View All Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  completedOrderCount={completedOrderCounts[p.id] || 0}
                  onQuickView={onQuickView} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  disabled={loadingPage}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-full border px-3 text-sm font-semibold transition-all disabled:cursor-wait disabled:opacity-60 ${
                    currentPage === page
                      ? "border-primary bg-primary text-on-primary"
                      : "border-primary/30 text-primary hover:border-primary hover:bg-primary-container"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;
