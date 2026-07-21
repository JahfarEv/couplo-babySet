// import { forwardRef } from "react";
// import { SlidersHorizontal } from "lucide-react";
// import { CategoryFilter, Product } from "../../types";
// import ProductCard from "@/src/components/home/ProductCard";

// interface FeaturedProductsProps {
//   products: Product[];
//   categoryFilter: CategoryFilter;
//   categoryTabs?: CategoryFilter[];
//   getCategoryLabel?: (category: CategoryFilter) => string;
//   onCategoryChange: (category: CategoryFilter) => void;
//   onQuickView: (product: Product) => void;
//   onOrder: (product: Product) => void;
//   onAddToCart: (product: Product) => void;
//   loading?: boolean;
// }

// const DEFAULT_CATEGORY_TABS: CategoryFilter[] = ["all", "babyset", "accessories", "tshirt", "cordset"];

// function getCategoryLabel(category: CategoryFilter) {
//   if (category === "all") return "All Items";
//   if (category === "accessories") return "Toys & Play";
//   if (category === "tshirt") return "Gift Boxes";
//   if (category === "cordset") return "Cord Sets";
//   return category.charAt(0).toUpperCase() + category.slice(1);
// }

// const FeaturedProducts = forwardRef<HTMLDivElement, FeaturedProductsProps>(
//   ({ products, categoryFilter, categoryTabs = DEFAULT_CATEGORY_TABS, getCategoryLabel: labelMapper, onCategoryChange, onQuickView, onOrder, onAddToCart, loading = false }, ref) => {
//     const tabs = categoryTabs.length ? categoryTabs : DEFAULT_CATEGORY_TABS;
//     const labelFor = (category: CategoryFilter) => labelMapper?.(category) ?? getCategoryLabel(category);
//     return (
//       <section ref={ref} id="featured-products" className="py-24 px-4 md:px-16 bg-surface">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
//             <div>
//               <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-primary">
//                 <span>DISCOVER THE BEST</span>
//                 {categoryFilter !== "all" && (
//                   <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 ml-1 lowercase font-semibold">
//                     filtering: {categoryFilter}
//                   </span>
//                 )}
//               </div>
//               <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-1 mb-2">
//                 Featured Products
//               </h2>
//               <p className="text-xs md:text-sm text-on-surface-variant font-medium">
//                 Handpicked modern favorites crafted with safety, love, and
//                 nursery elegance.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               {tabs.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => onCategoryChange(cat)}
//                   className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${categoryFilter === cat ? "bg-primary border-primary text-on-primary" : "bg-surface-container-lowest border-primary/10 text-on-surface-variant hover:border-primary/30"}`}
//                 >
//                   {labelFor(cat)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {loading ? (
//             <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-lowest p-8 rounded-3xl border border-dashed border-primary/20">
//               <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
//               <span className="font-serif text-lg text-primary font-bold">
//                 Loading products from Firebase
//               </span>
//               <p className="text-xs text-outline max-w-sm">
//                 Your latest collection is being fetched now.
//               </p>
//             </div>
//           ) : products.length === 0 ? (
//             <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-lowest p-8 rounded-3xl border border-dashed border-primary/20">
//               <SlidersHorizontal className="w-10 h-10 text-outline" />
//               <span className="font-serif text-lg text-primary font-bold">
//                 No Products Match This View
//               </span>
//               <p className="text-xs text-outline max-w-sm">
//                 We couldn't find items in this specific selection currently.
//                 Try viewing another category.
//               </p>
//               <button
//                 onClick={() => onCategoryChange("all")}
//                 className="bg-primary text-on-primary px-6 py-2 rounded-xl text-xs font-semibold"
//               >
//                 Reset Curation Grid
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//               {products.map((p) => (
//                 <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     );
//   },
// );

// FeaturedProducts.displayName = "FeaturedProducts";

// export default FeaturedProducts;





import { forwardRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CategoryFilter, Product } from "../../types";
import ProductCard from "@/src/components/home/ProductCard";
import { formatCategoryName } from "../../utils/categoryUtils";

interface FeaturedProductsProps {
  products: Product[];
  categoryFilter: CategoryFilter;
  categoryTabs?: CategoryFilter[];
  getCategoryLabel?: (category: CategoryFilter) => string;
  onCategoryChange: (category: CategoryFilter) => void;
  onQuickView: (product: Product) => void;
  onOrder: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  loading?: boolean;
}

// Default fallback if no tabs provided
const DEFAULT_CATEGORY_TABS: CategoryFilter[] = ["all"];

const FeaturedProducts = forwardRef<HTMLDivElement, FeaturedProductsProps>(
  ({ 
    products, 
    categoryFilter, 
    categoryTabs = DEFAULT_CATEGORY_TABS, 
    getCategoryLabel: labelMapper, 
    onCategoryChange, 
    onQuickView, 
    onOrder, 
    onAddToCart, 
    loading = false 
  }, ref) => {
    // Use provided tabs or defaults
    const tabs = categoryTabs.length ? categoryTabs : DEFAULT_CATEGORY_TABS;
    
    // Get label for category - either from mapper or format dynamically
    const labelFor = (category: CategoryFilter): string => {
      if (labelMapper) return labelMapper(category);
      return formatCategoryName(category);
    };

    return (
      <section ref={ref} id="featured-products" className="py-24 px-4 md:px-16 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-primary">
                <span>DISCOVER THE BEST</span>
                {categoryFilter !== "all" && (
                  <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 ml-1 lowercase font-semibold">
                    filtering: {labelFor(categoryFilter)}
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-1 mb-2">
                Featured Products
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                Handpicked modern favorites crafted with safety, love, and
                nursery elegance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((cat) => (
                <button
                  key={String(cat)}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    categoryFilter === cat 
                      ? "bg-primary border-primary text-on-primary" 
                      : "bg-surface-container-lowest border-primary/10 text-on-surface-variant hover:border-primary/30"
                  }`}
                >
                  {labelFor(cat)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-lowest p-8 rounded-3xl border border-dashed border-primary/20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              <span className="font-serif text-lg text-primary font-bold">
                Loading products from Firebase
              </span>
              <p className="text-xs text-outline max-w-sm">
                Your latest collection is being fetched now.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-lowest p-8 rounded-3xl border border-dashed border-primary/20">
              <SlidersHorizontal className="w-10 h-10 text-outline" />
              <span className="font-serif text-lg text-primary font-bold">
                No Products Match This View
              </span>
              <p className="text-xs text-outline max-w-sm">
                We couldn't find items in this specific selection currently.
                Try viewing another category.
              </p>
              <button
                onClick={() => onCategoryChange("all")}
                className="bg-primary text-on-primary px-6 py-2 rounded-xl text-xs font-semibold"
              >
                Reset Curation Grid
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onQuickView={onQuickView} 
                  onAddToCart={onAddToCart} 
                />
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