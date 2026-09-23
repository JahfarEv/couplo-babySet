import { motion } from "motion/react";
import {
  CheckCircle,
  ArrowLeft,
  Package,
  User,
  Palette,
  Gift,
  MessageSquare,
  Sparkles,
  Phone,
  Headphones,
  ShoppingBag,
} from "lucide-react";
import { Product, User as UserType } from "../../types";
import { CustomizationDetails } from "../../types/customization";

export interface PendingOrderData {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customization: CustomizationDetails;
}

interface OrderConfirmationPageProps {
  orderData: PendingOrderData;
  currentUser: UserType;
  onConfirm: () => void;
  onBack: () => void;
}

export default function OrderConfirmationPage({
  orderData,
  currentUser,
  onConfirm,
  onBack,
}: OrderConfirmationPageProps) {
  const { product, quantity, selectedSize, selectedColor, customization } = orderData;
  const total = product.price * quantity;

  // Build summary rows
  const customizationRows: { label: string; value: string; icon?: React.ReactNode }[] = [];

  if (customization.romperName) {
    customizationRows.push({ label: "Name in Romper", value: customization.romperName });
  }
  if (customization.capName) {
    customizationRows.push({ label: "Name in Cap", value: customization.capName });
  }
  if (customization.bow) {
    customizationRows.push({ label: "Bow", value: customization.bow });
  }
  if (customization.designImageName) {
    customizationRows.push({ label: "Design Image", value: customization.designImageName });
  }
  if (customization.babyAge) {
    customizationRows.push({ label: "Age", value: customization.babyAge });
  }
  if (customization.fontStyle) {
    customizationRows.push({ label: "Font Style", value: customization.fontStyle });
  }
  if (customization.embroideryColor) {
    customizationRows.push({ label: "Thread Color", value: customization.embroideryColor });
  }
  if (customization.giftWrap) {
    customizationRows.push({ label: "Gift Wrap", value: "Yes ✓" });
    if (customization.giftMessage) {
      customizationRows.push({ label: "Gift Message", value: `"${customization.giftMessage}"` });
    }
  }
  if (customization.specialNotes) {
    customizationRows.push({ label: "Special Notes", value: customization.specialNotes });
  }
  if (customization.additionalNotes) {
    customizationRows.push({ label: "Additional Notes", value: customization.additionalNotes });
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-6 cursor-pointer bg-transparent border-none transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customization
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-on-surface mb-1">
            Confirm Your Order
          </h1>
          <p className="text-sm text-on-surface-variant">
            Please review your order details before sending via WhatsApp
          </p>
        </motion.div>

        {/* Product card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden mb-5"
        >
          <div className="flex items-center gap-4 p-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-container-low">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-outline">Product</span>
              </div>
              <p className="text-base font-semibold text-on-surface leading-tight">{product.name}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-primary font-bold text-lg">₹{total.toFixed(2)}</span>
                {quantity > 1 && (
                  <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                    ×{quantity}
                  </span>
                )}
              </div>
            </div>
          </div>
          {(selectedSize || selectedColor) && (
            <div className="px-4 pb-4 flex gap-3">
              {selectedSize && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
                  📏 Size: {selectedSize}
                </span>
              )}
              {selectedColor && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
                  🎨 Color: {selectedColor}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Customization details */}
        {customizationRows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden mb-5"
          >
            <div className="flex items-center gap-2.5 px-5 pt-4 pb-3">
              <div className="w-8 h-8 bg-primary-container rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-serif font-bold text-on-surface">Customization Details</h3>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {customizationRows.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.03 }}
                  className="flex gap-3 px-5 py-3"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">
                    {label}
                  </span>
                  <span className="text-xs text-on-surface break-words flex-1">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Customer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden mb-5"
        >
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3">
            <div className="w-8 h-8 bg-secondary-container rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-secondary" />
            </div>
            <h3 className="text-sm font-serif font-bold text-on-surface">Customer Details</h3>
          </div>
          <div className="divide-y divide-outline-variant/20">
            <div className="flex gap-3 px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">Name</span>
              <span className="text-xs text-on-surface">{currentUser.name}</span>
            </div>
            <div className="flex gap-3 px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">Email</span>
              <span className="text-xs text-on-surface">{currentUser.email}</span>
            </div>
            {customization.contactNumber && (
              <div className="flex gap-3 px-5 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">WhatsApp No.</span>
                <span className="text-xs text-on-surface">{customization.contactNumber}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary-container/30 rounded-2xl border border-primary/10 px-5 py-4 mb-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-on-surface">Total Amount</span>
            <span className="text-xl font-bold text-primary">₹{total.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-1">
            Customized · {quantity} unit{quantity > 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Info message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-start gap-3 bg-surface-container-low rounded-2xl border border-outline-variant/30 p-4 mb-6"
        >
          <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            After confirming, you'll be redirected to WhatsApp where our team will confirm production details and delivery timeline.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3"
        >
          <button
            id="confirm-order-btn"
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer border-none active:scale-[0.98]"
          >
            <Headphones className="w-5 h-5 fill-white text-transparent stroke-[1]" />
            Confirm & Send via WhatsApp
          </button>

          <button
            id="confirm-back-btn"
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back & Edit
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[10px] text-outline mt-6"
        >
          ✨ Safe Packing • Trusted Courier Partners • Free Delivery Across India 🚚📦
        </motion.p>
      </div>
    </div>
  );
}
