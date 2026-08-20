// import { ChevronRight, User as UserIcon, ShoppingBag } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { CategoryFilter, User, CartItem } from "../../types";

// interface MobileNavProps {
//   open: boolean;
//   onClose: () => void;
//   onCategoryClick: (category: CategoryFilter) => void;
//   onAccountClick: () => void;
//   currentUser: User | null;
//   cart: CartItem[];
//   onOpenCart: () => void;
// }

// export default function MobileNav({
//   open,
//   onClose,
//   onCategoryClick,
//   onAccountClick,
//   currentUser,
//   cart,
//   onOpenCart,
// }: MobileNavProps) {
//   const handleCategoryClick = (category: CategoryFilter) => {
//     onClose();
//     onCategoryClick(category);
//   };

//   const handleAccountClick = () => {
//     onClose();
//     onAccountClick();
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           id="mobile-navigation"
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="md:hidden bg-surface-container-low border-t border-primary/5 px-6 py-4 flex flex-col gap-3"
//         >
//           <button
//             onClick={() => handleCategoryClick("all")}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
//           >
//             Collections <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={() => handleCategoryClick("babyset")}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
//           >
//             Baby Sets <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={() => handleCategoryClick("accessories")}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
//           >
//             Accessories <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={() => handleCategoryClick("tshirt")}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
//           >
//             T-Shirts <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={() => handleCategoryClick("cordset")}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
//           >
//             Cord Sets <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={() => {
//               onClose();
//               onOpenCart();
//             }}
//             className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between items-center cursor-pointer"
//           >
//             <span className="flex items-center gap-2">
//               <ShoppingBag className="w-5 h-5" />
//               Shopping Bag
//               {totalItems > 0 && (
//                 <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 animate-pulse">
//                   {totalItems}
//                 </span>
//               )}
//             </span>
//             <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <button
//             onClick={handleAccountClick}
//             className="text-left py-2.5 font-serif font-bold text-lg text-primary/95 border-b border-primary/5 flex items-center justify-between cursor-pointer"
//           >
//             <span className="flex items-center gap-2">
//               <UserIcon className="w-5 h-5" />
//               {currentUser ? `My Account (${currentUser.name.split(" ")[0]})` : "Sign In / Register"}
//             </span>
//             <ChevronRight className="w-4 h-4 text-outline" />
//           </button>
//           <p className="text-[11px] text-outline text-center mt-2">
//             Order instantly via 24/7 WhatsApp service
//           </p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



import { ChevronRight, User as UserIcon, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CategoryFilter, User, CartItem, Category } from "../../types";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  onCategoryClick: (category: CategoryFilter) => void;
  onAccountClick: () => void;
  currentUser: User | null;
  cart: CartItem[];
  onOpenCart: () => void;
  categories?: Category[];
  loading?: boolean;
}

export default function MobileNav({
  open,
  onClose,
  onCategoryClick,
  onAccountClick,
  currentUser,
  cart,
  onOpenCart,
  categories = [],
  loading = false,
}: MobileNavProps) {
  const handleCategoryClick = (category: CategoryFilter) => {
    onClose();
    onCategoryClick(category);
  };

  const handleAccountClick = () => {
    onClose();
    onAccountClick();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter categories (exclude "all")
  const navCategories = categories.filter(cat => cat.value !== "all");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-surface-container-low border-t border-primary/5 px-6 py-4 flex flex-col gap-3"
        >
          {/* All Items - Always first */}
          <button
            onClick={() => handleCategoryClick("all")}
            className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
          >
            All Items <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Dynamic categories from Firebase */}
          {loading ? (
            // Show skeleton while loading
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-3 border-b border-primary/5">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </>
          ) : navCategories.length > 0 ? (
            navCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.value)}
                className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
              >
                {category.label} <ChevronRight className="w-4 h-4 text-outline" />
              </button>
            ))
          ) : (
            <div className="py-2 text-on-surface-variant text-sm">
              No categories available
            </div>
          )}

          {/* More Designs */}
          <button
            onClick={() => {
              onClose();
              window.open("https://whatsapp.com/channel/0029VbDWjLXAO7RN0fAEt91F", "_blank");
            }}
            className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between cursor-pointer"
          >
            More Designs <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="text-left py-2 font-serif font-semibold text-lg text-primary border-b border-primary/5 flex justify-between items-center cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Bag
              {totalItems > 0 && (
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 animate-pulse">
                  {totalItems}
                </span>
              )}
            </span>
            <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          {/* Account */}
          <button
            onClick={handleAccountClick}
            className="text-left py-2.5 font-serif font-bold text-lg text-primary/95 border-b border-primary/5 flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              {currentUser ? `My Account (${currentUser.name.split(" ")[0]})` : "Sign In / Register"}
            </span>
            <ChevronRight className="w-4 h-4 text-outline" />
          </button>

          <p className="text-[11px] text-outline text-center mt-2">
            Order instantly via 24/7 WhatsApp service
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}