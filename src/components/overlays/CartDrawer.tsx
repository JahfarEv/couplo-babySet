// import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { CartItem } from "../../types";

// interface CartDrawerProps {
//   open: boolean;
//   onClose: () => void;
//   cart: CartItem[];
//   onRemoveItem: (index: number) => void;
//   onUpdateQuantity: (index: number, quantity: number) => void;
//   onCheckout: () => void;
// }

// export default function CartDrawer({
//   open,
//   onClose,
//   cart,
//   onRemoveItem,
//   onUpdateQuantity,
//   onCheckout,
// }: CartDrawerProps) {
//   // Calculate subtotal
//   const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

//   return (
//     <AnimatePresence>
//       {open && (
//         <div id="cart-drawer-root" className="fixed inset-0 z-95 flex justify-end">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-xs"
//           />

//           {/* Drawer Container */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 28, stiffness: 300 }}
//             className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col z-10 border-l border-primary/10"
//           >
//             {/* Header */}
//             <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-surface">
//               <div className="flex items-center gap-2">
//                 <ShoppingBag className="w-5 h-5 text-primary" />
//                 <h2 className="text-xl font-serif font-bold text-on-surface">Your Shopping Bag</h2>
//                 <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all cursor-pointer border-none bg-transparent"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Scrollable list of items */}
//             <div className="flex-grow overflow-y-auto p-6 space-y-4">
//               {cart.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
//                   <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/60">
//                     <ShoppingBag className="w-8 h-8" />
//                   </div>
//                   <h3 className="text-lg font-serif font-bold text-on-surface">Your Bag is Empty</h3>
//                   <p className="text-xs text-outline max-w-xs">
//                     Explore our handcrafted collections to find soft, organic sets and gifts for your little one.
//                   </p>
//                   <button
//                     onClick={onClose}
//                     className="mt-2 bg-primary text-on-primary hover:bg-primary/95 text-xs font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98] border-none"
//                   >
//                     Continue Shopping
//                   </button>
//                 </div>
//               ) : (
//                 cart.map((item, idx) => (
//                   <motion.div
//                     key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
//                     initial={{ opacity: 0, y: 15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -15 }}
//                     className="flex gap-4 p-3 rounded-2xl border border-primary/5 bg-white hover:shadow-md transition-shadow relative group"
//                   >
//                     {/* Image */}
//                     <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low shrink-0 select-none">
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Details */}
//                     <div className="flex-grow flex flex-col justify-between">
//                       <div>
//                         <div className="flex justify-between items-start gap-1">
//                           <h4 className="font-serif font-bold text-sm text-on-surface leading-tight line-clamp-1 group-hover:text-primary transition-colors">
//                             {item.product.name}
//                           </h4>
//                           <span className="font-serif font-bold text-sm text-primary shrink-0">
//                             ${(item.product.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                         <p className="text-[10px] text-outline uppercase font-semibold mt-0.5">
//                           {item.product.category}
//                         </p>
                        
//                         {/* Options badge */}
//                         <div className="flex flex-wrap gap-1.5 mt-1.5">
//                           {item.selectedSize && (
//                             <span className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded-md font-medium border border-primary/5">
//                               Size: {item.selectedSize}
//                             </span>
//                           )}
//                           {item.selectedColor && (
//                             <span className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded-md font-medium border border-primary/5">
//                               Color: {item.selectedColor}
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       {/* Controls */}
//                       <div className="flex justify-between items-center mt-3">
//                         <div className="flex items-center bg-surface-container-low border border-primary/10 rounded-lg p-0.5 shadow-xs">
//                           <button
//                             onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
//                             className="p-1 px-2 text-on-surface hover:text-primary transition-colors font-bold text-xs bg-transparent border-none cursor-pointer"
//                           >
//                             −
//                           </button>
//                           <span className="text-xs font-bold min-w-[16px] text-center text-on-surface">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
//                             className="p-1 px-2 text-on-surface hover:text-primary transition-colors font-bold text-xs bg-transparent border-none cursor-pointer"
//                           >
//                             +
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => onRemoveItem(idx)}
//                           className="p-1.5 rounded-lg text-outline-variant hover:text-red-500 hover:bg-red-50/55 transition-all cursor-pointer bg-transparent border-none"
//                           title="Remove item"
//                         >
//                           <Trash2 className="w-4.5 h-4.5" />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))
//               )}
//             </div>

//             {/* Bottom Section */}
//             {cart.length > 0 && (
//               <div className="p-6 border-t border-primary/10 bg-surface space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-outline">Subtotal</span>
//                     <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-xs">
//                     <span className="text-outline">Shipping</span>
//                     <span className="text-emerald-600 font-semibold">Free Shipping</span>
//                   </div>
//                   <div className="border-t border-primary/5 pt-2 flex justify-between text-base">
//                     <span className="font-serif font-bold text-on-surface">Total Amount</span>
//                     <span className="font-serif font-bold text-primary">${subtotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="pt-2">
//                   <button
//                     onClick={onCheckout}
//                     className="w-full bg-[#25D366] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer border-none"
//                   >
//                     <span>Checkout via WhatsApp</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                   <p className="text-[10px] text-outline text-center mt-2.5">
//                     We will format your cart and open our WhatsApp checkout concierge service instantly.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }








import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, User } from "../../types";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onCheckout: () => void;
  currentUser?: User | null;
  onShowToast?: (message: string, type?: "success" | "info" | "error") => void;
}

export default function CartDrawer({
  open,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  currentUser,
  onShowToast,
}: CartDrawerProps) {
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Save cart to Firestore when it changes
  const saveCartToFirestore = async (cartItems: CartItem[]) => {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, "carts", currentUser.id);
      await setDoc(cartRef, {
        userId: currentUser.id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          product: item.product,
          quantity: item.quantity,
          selectedSize: item.selectedSize || null,
          selectedColor: item.selectedColor || null,
          customization: item.customization || null,
        })),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to save cart to Firestore:", error);
    }
  };

  // Load cart from Firestore on mount
  const loadCartFromFirestore = async () => {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, "carts", currentUser.id);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        const data = cartDoc.data();
        if (data.items && data.items.length > 0) {
          // Update cart with items from Firestore
          const cartItems = data.items.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            customization: item.customization || undefined,
          }));
          // You'll need to pass these to your parent component
          return cartItems;
        }
      }
    } catch (error) {
      console.error("Failed to load cart from Firestore:", error);
    }
    return null;
  };

  // Handle quantity update with Firebase sync
  const handleUpdateQuantity = async (index: number, quantity: number) => {
    onUpdateQuantity(index, quantity);
    // Save to Firebase after state update
    setTimeout(() => {
      saveCartToFirestore(cart);
    }, 100);
  };

  // Handle remove item with Firebase sync
  const handleRemoveItem = async (index: number) => {
    onRemoveItem(index);
    // Save to Firebase after state update
    setTimeout(() => {
      saveCartToFirestore(cart);
    }, 100);
  };

  // Handle checkout with Firebase sync
  const handleCheckout = async () => {
    if (!currentUser) {
      if (onShowToast) {
        onShowToast("Please sign in to checkout", "info");
      }
      return;
    }
    
    // Save cart before checkout
    await saveCartToFirestore(cart);
    onCheckout();
  };

  return (
    <AnimatePresence>
      {open && (
        <div id="cart-drawer-root" className="fixed inset-0 z-95 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col z-10 border-l border-primary/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-surface">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-serif font-bold text-on-surface">Your Shopping Bag</h2>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list of items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/60">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-on-surface">Your Bag is Empty</h3>
                  <p className="text-xs text-outline max-w-xs">
                    Explore our handcrafted collections to find soft, organic sets and gifts for your little one.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-primary text-on-primary hover:bg-primary/95 text-xs font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98] border-none"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex gap-4 p-3 rounded-2xl border border-primary/5 bg-white hover:shadow-md transition-shadow relative group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low shrink-0 select-none">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-serif font-bold text-sm text-on-surface leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                            {item.product.name}
                          </h4>
                          <span className="font-serif font-bold text-sm text-primary shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[10px] text-outline uppercase font-semibold mt-0.5">
                          {item.product.category}
                        </p>
                        
                        {/* Options badge */}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {item.selectedSize && (
                            <span className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded-md font-medium border border-primary/5">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded-md font-medium border border-primary/5">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.customization?.embroideredText && (
                            <span className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded-md font-medium border border-primary/5">
                              Text: {item.customization.embroideredText}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center bg-surface-container-low border border-primary/10 rounded-lg p-0.5 shadow-xs">
                          <button
                            onClick={() => handleUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="p-1 px-2 text-on-surface hover:text-primary transition-colors font-bold text-xs bg-transparent border-none cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold min-w-[16px] text-center text-on-surface">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1 px-2 text-on-surface hover:text-primary transition-colors font-bold text-xs bg-transparent border-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1.5 rounded-lg text-outline-variant hover:text-red-500 hover:bg-red-50/55 transition-all cursor-pointer bg-transparent border-none"
                          title="Remove item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bottom Section */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-primary/10 bg-surface space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Subtotal</span>
                    <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free Shipping</span>
                  </div>
                  <div className="border-t border-primary/5 pt-2 flex justify-between text-base">
                    <span className="font-serif font-bold text-on-surface">Total Amount</span>
                    <span className="font-serif font-bold text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer border-none"
                  >
                    <span>Checkout via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-outline text-center mt-2.5">
                    We will format your cart and open our WhatsApp checkout concierge service instantly.
                  </p>
                  {currentUser && (
                    <p className="text-[9px] text-outline text-center mt-1">
                      Cart saved to your account
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
