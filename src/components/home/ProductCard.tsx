import { Star, Eye, ShoppingBag } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  completedOrderCount?: number;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, completedOrderCount = 0, onQuickView, onAddToCart }: ProductCardProps) {
  return (
    <div
      onClick={() => onQuickView(product)}
      className="bg-white rounded-[1.75rem] p-4 shadow-[0_20px_45px_rgba(216,111,146,0.1)] hover:shadow-[0_32px_60px_rgba(216,111,146,0.18)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col border border-primary/8"
    >
      <div className="relative aspect-square rounded-[1.35rem] overflow-hidden mb-4 bg-gradient-to-br from-primary-container via-white to-secondary-container select-none">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          src={product.image}
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-on-primary text-[9px] px-2.5 py-1 rounded-full z-10 font-bold uppercase tracking-wider shadow-sm">
            New
          </div>
        )}
{completedOrderCount > 0 && (
  <div className="absolute top-3 right-3 bg-primary/10 text-on-primary text-[13px] px-2.5 py-1 rounded-full z-10 font-semibold backdrop-blur-sm border border-primary/20">
    {completedOrderCount} {completedOrderCount === 1 ? 'piece' : 'pieces'} sold
  </div>
)}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-surface text-primary text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-primary/5">
            Quick View
          </span>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center text-[11px] text-outline mb-1 gap-1 select-none">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-3.5 h-3.5 ${starIdx <= Math.floor(product.rating) ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`}
                />
              ))}
            </div>
            <span className="ml-1 text-on-surface-variant font-semibold">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <h3 className="text-md md:text-lg font-serif font-bold text-on-surface mb-1 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </div>

        <div className="mt-4">
          <p className="text-lg font-serif font-bold text-primary mb-3">
            ₹{product.price.toFixed(2)}
          </p>
          <div className="flex flex-row gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            className="flex-1 bg-primary hover:bg-primary/95 text-white py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            className="flex-1 bg-secondary hover:bg-secondary/95 text-white py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
