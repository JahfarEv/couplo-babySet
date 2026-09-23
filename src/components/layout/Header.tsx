import { Search, Menu, User as UserIcon, ShoppingBag } from "lucide-react";
import { CategoryFilter, User, CartItem } from "../../types";
import MobileNav from "./MobileNav";
import { useCategories } from "../../hooks/useCategories";

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onOpenSearch: () => void;
  onCategoryClick: (category: CategoryFilter) => void;
  activeView: "home" | "auth" | "order-confirmation";
  currentUser: User | null;
  onAccountClick: () => void;
  onLogoClick: () => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export default function Header({
  mobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onOpenSearch,
  onCategoryClick,
  activeView,
  currentUser,
  onAccountClick,
  onLogoClick,
  cart,
  onOpenCart,
}: HeaderProps) {
  const { categories, loading } = useCategories();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
console.log(categories, 'category');

  // Get categories for navigation (exclude "all")
  const navCategories = categories.filter((cat) => cat.value !== "all");

  return (
    <header
      id="app-header"
      className="bg-white/78 backdrop-blur-md sticky top-0 w-full z-40 transition-all duration-300 shadow-[0_18px_45px_rgba(216,111,146,0.08)] border-b border-primary/10"
    >
      <div className="flex justify-between items-center w-full px-4 md:px-16 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onToggleMobileMenu}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={onOpenSearch}
            className="text-primary hover:opacity-80 transition-all cursor-pointer bg-transparent border-none p-0"
            aria-label="Search items"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
{/* 
        <button
          onClick={onLogoClick}
          className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-tight hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-none p-0"
        >
          Couplo Baby Sets
        </button> */}



<button
  onClick={onLogoClick}
  className="cursor-pointer bg-transparent border-none p-0 hover:opacity-90 transition-opacity"
  aria-label="Couplo Baby Sets"
>
  <img
    src="/fav1.PNG"
    alt="Couplo Baby Sets"
    className="h-12 md:h-17 w-auto object-contain"
  />
</button>
        <nav className="hidden md:flex items-center space-x-10">
          {/* All Items - Always first */}
          <button
            onClick={() => onCategoryClick("all")}
            className="text-sm font-semibold text-on-surface-variant hover:text-primary hover:underline underline-offset-4 decoration-primary/20 transition-all cursor-pointer bg-transparent border-none p-0"
          >
            All Items
          </button>

          {/* Dynamic categories from Firebase */}
          {loading ? (
            // Show skeleton while loading
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                className="h-5 w-16 bg-primary-container rounded-full animate-pulse"
                />
              ))}
            </>
          ) : (
            navCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.value)}
                className="text-sm font-semibold text-on-surface-variant hover:text-primary hover:underline underline-offset-4 decoration-primary/20 transition-all cursor-pointer bg-transparent border-none p-0"
              >
                {category.label}
              </button>
            ))
          )}

          {/* More Designs Button */}
          <button
            onClick={() => window.open("https://whatsapp.com/channel/0029VbDWjLXAO7RN0fAEt91F", "_blank")}
            className="text-sm font-semibold text-on-surface-variant hover:text-primary hover:underline underline-offset-4 decoration-primary/20 transition-all cursor-pointer bg-transparent border-none p-0"
          >
            More Designs
          </button>
        </nav>

        <div className="flex items-center text-primary gap-4">
          <button
            onClick={onOpenSearch}
            className="hidden md:flex hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
            title="Search Products"
          >
            <Search className="w-5 h-5 text-primary" />
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={onOpenCart}
            className="hover:scale-105 transition-transform flex items-center relative cursor-pointer bg-transparent border-none p-0"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5.5 h-5.5 md:w-5 md:h-5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-tertiary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={onAccountClick}
            className={`hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 ${
              activeView === "auth"
                ? "text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
            title={
              currentUser ? `Logged in as ${currentUser.name}` : "My Account"
            }
          >
            <UserIcon className="w-5.5 h-5.5 md:w-5 md:h-5 text-primary" />
            {currentUser && (
              <span className="hidden lg:inline text-xs font-semibold max-w-[100px] truncate">
                {currentUser.name.split(" ")[0]}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileNav
        open={mobileMenuOpen}
        onClose={onCloseMobileMenu}
        onCategoryClick={onCategoryClick}
        onAccountClick={onAccountClick}
        currentUser={currentUser}
        cart={cart}
        onOpenCart={onOpenCart}
        categories={categories} // Pass categories from Firebase
        loading={loading} // Pass loading state
      />
    </header>
  );
}
