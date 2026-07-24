import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../../types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  results: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function SearchOverlay({
  open,
  onClose,
  searchQuery,
  onSearchQueryChange,
  results,
  onSelectProduct,
}: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-primary/10 backdrop-blur-md z-90 flex flex-col items-center justify-start pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-2xl p-6 border border-primary/10 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <span className="font-serif text-xl text-primary font-semibold">
                Search Our Curations
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-primary-container/20 text-on-surface-variant transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="What are you looking for today? (onesie, plush, swaddle...)"
                className="w-full bg-surface-container-low pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-primary/20 focus:outline-none transition-all placeholder:text-outline text-on-surface"
                autoFocus
              />
            </div>

            {searchQuery && (
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Suggested Products ({results.length})
                </span>
                <div className="max-h-72 overflow-y-auto flex flex-col gap-2 no-scrollbar">
                  {results.length === 0 ? (
                    <span className="text-sm text-outline py-4 text-center">
                      No matches found. Try searching swaddle or gift!
                    </span>
                  ) : (
                    results.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="flex items-center gap-4 p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-surface"
                        />
                        <div className="flex flex-col flex-grow">
                          <span className="text-sm font-semibold font-serif text-on-surface text-left">
                            {p.name}
                          </span>
                          <span className="text-xs text-primary font-medium text-left">
                            ₹{p.price.toFixed(2)}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary opacity-60" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
