// import { useState, useRef } from "react";
// import FeaturedProducts from "./FeaturedProducts";
// import { useUserProducts } from "../../hooks/useProducts";
// import { CategoryFilter, Product } from "../../types";

// interface FeaturedProductsContainerProps {
//   onQuickView: (product: Product) => void;
//   onOrder: (product: Product) => void;
//   onAddToCart: (product: Product) => void;
// }

// export default function FeaturedProductsContainer({
//   onQuickView,
//   onOrder,
//   onAddToCart,
// }: FeaturedProductsContainerProps) {
//   const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
//   const { products, loading } = useUserProducts();
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Filter products by category
//   const filteredProducts = categoryFilter === "all"
//     ? products
//     : products.filter((p) => p.category === categoryFilter);

//   // Sort products - newest first (optional)
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     // You can add sorting logic here if needed
//     return 0;
//   });

//   return (
//     <FeaturedProducts
//       ref={sectionRef}
//       products={sortedProducts}
//       categoryFilter={categoryFilter}
//       onCategoryChange={setCategoryFilter}
//       onQuickView={onQuickView}
//       onOrder={onOrder}
//       onAddToCart={onAddToCart}
//       loading={loading}
//     />
//   );
// }









import { useState, useRef, useMemo } from "react";
import FeaturedProducts from "./FeaturedProducts";
import { useUserProducts, ProductPriceRange } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { CategoryFilter, Product } from "../../types";
import { categoryMatches, generateCategoryTabs, getCategoryLabel } from "../../utils/categoryUtils";

interface FeaturedProductsContainerProps {
  onQuickView: (product: Product) => void;
  onOrder: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function FeaturedProductsContainer({
  onQuickView,
  onOrder,
  onAddToCart,
}: FeaturedProductsContainerProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [priceRange, setPriceRange] = useState<ProductPriceRange>("all");
  const {
    products,
    loading: productsLoading,
    loadingPage: productsLoadingPage,
    currentPage: productsCurrentPage,
    totalPages: productsTotalPages,
    goToPage: goToProductsPage,
  } = useUserProducts(priceRange);
  const { categories } = useCategories();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Generate category tabs dynamically from Firebase categories
  const categoryTabs = useMemo(() => {
    return generateCategoryTabs(categories);
  }, [categories]);

  // Get label for a category - completely dynamic
  const handleGetCategoryLabel = (category: CategoryFilter): string => {
    return getCategoryLabel(category, categories);
  };

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (categoryFilter === "all") {
      return products;
    }
    return products.filter((p) => categoryMatches(p.category, categoryFilter));
  }, [products, categoryFilter]);

  // Sort products (optional)
  const sortedProducts = useMemo(() => {
    return [...filteredProducts];
  }, [filteredProducts]);

  return (
    <FeaturedProducts
      ref={sectionRef}
      products={sortedProducts}
      categoryFilter={categoryFilter}
      categoryTabs={categoryTabs}
      getCategoryLabel={handleGetCategoryLabel}
      onCategoryChange={setCategoryFilter}
      priceRange={priceRange}
      onPriceRangeChange={setPriceRange}
      onQuickView={onQuickView}
      onOrder={onOrder}
      onAddToCart={onAddToCart}
      currentPage={productsCurrentPage}
      totalPages={productsTotalPages}
      onPageChange={goToProductsPage}
      loadingPage={productsLoadingPage}
      loading={productsLoading}
    />
  );
}
