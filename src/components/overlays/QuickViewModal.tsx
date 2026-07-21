import { X, Star, Headphones, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../../types";

interface QuickViewModalProps {
  product: Product | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
  onOrder: (product: Product, quantity: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function QuickViewModal({
  product,
  quantity,
  onQuantityChange,
  onClose,
  onOrder,
  onAddToCart,
}: QuickViewModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <div
          id="product-quick-view-modal"
          className="fixed inset-0 z-95 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative bg-surface-container-lowest max-w-3xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10 border border-primary/10"
          >
            <div className="w-full md:w-1/2 bg-surface-container h-[250px] md:h-auto min-h-[250px] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
                  NEW
                </span>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-none">
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-sans">
                    {product.category} COLLECTION
                  </span>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-serif font-bold text-on-surface leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1 text-xs text-outline-variant">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i <= Math.floor(product.rating) ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-on-surface-variant font-semibold ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[12px] text-outline">
                    ({product.ratingCount} reviews)
                  </span>
                </div>

                <span className="text-2xl font-serif font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>

                <div className="rounded-2xl bg-surface-container-low border border-primary/10 p-4 md:p-5">
                  <h3 className="text-[11px] uppercase tracking-wider text-outline font-bold mb-2">
                    Product Details
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-6">
                    {product.description || "Thoughtfully made for everyday comfort, gifting, and gentle baby care."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-primary/10 p-6 md:p-8 bg-surface-container-lowest">
                <div className="flex items-center justify-between sm:justify-start bg-surface-container-low border border-primary/10 rounded-xl p-1 shadow-xs">
                  <button
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-lg leading-none bg-transparent border-none cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold min-w-[20px] text-center text-on-surface">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-lg leading-none bg-transparent border-none cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="w-full bg-primary hover:bg-primary/95 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>

                  <button
                    onClick={() => onOrder(product, quantity)}
                    className="w-full bg-[#25D366] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
                  >
                    <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
                    Direct Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
