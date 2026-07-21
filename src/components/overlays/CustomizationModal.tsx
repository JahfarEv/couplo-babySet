// import { motion, AnimatePresence } from "motion/react";
// import {
//   X,
//   Pencil,
//   Gift,
//   Sparkles,
//   Check,
//   Baby,
//   MessageSquare,
//   ShoppingBag,
//   Headphones,
// } from "lucide-react";
// import { Product } from "../../types";
// import { CustomizationDetails } from "../../types/customization";

// const FONT_STYLES = [
//   { id: "Classic Script", preview: "𝒞𝓁𝒶𝓈𝓈𝒾𝒸", desc: "Elegant cursive" },
//   { id: "Bold Block", preview: "BOLD", desc: "Strong uppercase" },
//   { id: "Delicate Serif", preview: "Delicate", desc: "Refined serif" },
//   { id: "Playful Print", preview: "Playful!", desc: "Fun & round" },
// ];

// const EMBROIDERY_COLORS = [
//   { name: "Dusty Rose", hex: "#DEB8C0" },
//   { name: "Sage Green", hex: "#8F9779" },
//   { name: "Sky Blue", hex: "#A8C3D2" },
//   { name: "Warm Cream", hex: "#E8DFD0" },
//   { name: "Lavender", hex: "#C9B8D8" },
//   { name: "Charcoal", hex: "#5C5C5C" },
// ];

// const BABY_AGES = [
//   "Newborn", "0–3 Months", "3–6 Months",
//   "6–12 Months", "1–2 Years", "2+ Years",
// ];

// interface StepProps {
//   product: Product;
//   customization: CustomizationDetails;
//   onChange: (patch: Partial<CustomizationDetails>) => void;
// }

// /* ─── Step 1: Baby Info ─────────────────────────────────────────────────── */
// function StepBabyInfo({ product, customization, onChange }: StepProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
//           <Baby className="w-5 h-5 text-primary" />
//         </div>
//         <div>
//           <h3 className="font-serif font-bold text-on-surface text-lg">Baby Details</h3>
//           <p className="text-xs text-on-surface-variant">Tell us a little about your little one</p>
//         </div>
//       </div>

//       {/* Baby Name */}
//       <div className="space-y-1.5">
//         <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
//           Baby's Name <span className="text-primary">*</span>
//         </label>
//         <input
//           id="custom-baby-name"
//           type="text"
//           value={customization.babyName}
//           onChange={(e) => onChange({ babyName: e.target.value })}
//           placeholder="e.g. Amara, Noah, Lily…"
//           maxLength={20}
//           className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
//         />
//         <p className="text-[10px] text-on-surface-variant">
//           This name will be embroidered on your item
//         </p>
//       </div>

//       {/* Baby Age */}
//       <div className="space-y-2">
//         <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
//           Baby's Age
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {BABY_AGES.map((age) => (
//             <button
//               key={age}
//               id={`age-${age.replace(/\s/g, "-")}`}
//               onClick={() => onChange({ babyAge: age })}
//               className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
//                 customization.babyAge === age
//                   ? "bg-primary border-primary text-white"
//                   : "bg-white border-outline-variant text-on-surface hover:border-primary/60"
//               }`}
//             >
//               {age}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product preview */}
//       <div className="flex items-center gap-3 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/30">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
//         />
//         <div className="min-w-0">
//           <p className="text-xs font-semibold text-on-surface truncate">{product.name}</p>
//           <p className="text-xs text-primary font-bold">${product.price.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Step 2: Embroidery & Font ─────────────────────────────────────────── */
// function StepEmbroidery({ customization, onChange }: StepProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
//           <Pencil className="w-5 h-5 text-primary" />
//         </div>
//         <div>
//           <h3 className="font-serif font-bold text-on-surface text-lg">Embroidery Style</h3>
//           <p className="text-xs text-on-surface-variant">Choose how your name will look</p>
//         </div>
//       </div>

//       {/* Font Style */}
//       <div className="space-y-2">
//         <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
//           Font Style
//         </label>
//         <div className="grid grid-cols-2 gap-2">
//           {FONT_STYLES.map((font) => (
//             <button
//               key={font.id}
//               id={`font-${font.id.replace(/\s/g, "-")}`}
//               onClick={() => onChange({ fontStyle: font.id })}
//               className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
//                 customization.fontStyle === font.id
//                   ? "border-primary bg-primary-container/30"
//                   : "border-outline-variant bg-white hover:border-primary/40"
//               }`}
//             >
//               {customization.fontStyle === font.id && (
//                 <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
//                   <Check className="w-2.5 h-2.5 text-white" />
//                 </span>
//               )}
//               <p className="text-base font-serif text-on-surface mb-0.5">{font.preview}</p>
//               <p className="text-[10px] text-on-surface-variant">{font.desc}</p>
//               <p className="text-[11px] font-semibold text-primary mt-1">{font.id}</p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Embroidery Color */}
//       <div className="space-y-2">
//         <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
//           Thread Color:{" "}
//           <span className="text-on-surface normal-case italic font-normal">
//             {customization.embroideryColor}
//           </span>
//         </label>
//         <div className="flex flex-wrap gap-3">
//           {EMBROIDERY_COLORS.map((col) => (
//             <button
//               key={col.name}
//               id={`emb-color-${col.name.replace(/\s/g, "-")}`}
//               onClick={() => onChange({ embroideryColor: col.name })}
//               title={col.name}
//               className={`w-9 h-9 rounded-full border-2 transition-all relative cursor-pointer ${
//                 customization.embroideryColor === col.name
//                   ? "border-primary scale-110 shadow-md"
//                   : "border-transparent hover:scale-105"
//               }`}
//               style={{ backgroundColor: col.hex }}
//             >
//               {customization.embroideryColor === col.name && (
//                 <span className="absolute inset-0 flex items-center justify-center">
//                   <Check className="w-4 h-4 text-white mix-blend-difference" />
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Live preview badge */}
//       {customization.babyName && (
//         <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 text-center">
//           <p className="text-[10px] uppercase tracking-wider text-outline mb-2">Preview</p>
//           <p
//             className="text-2xl font-serif"
//             style={{ color: EMBROIDERY_COLORS.find((c) => c.name === customization.embroideryColor)?.hex ?? "#DEB8C0" }}
//           >
//             {customization.babyName}
//           </p>
//           <p className="text-[10px] text-on-surface-variant mt-1">{customization.fontStyle}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─── Step 3: Gift & Notes ──────────────────────────────────────────────── */
// function StepGiftNotes({ customization, onChange }: StepProps) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
//           <Gift className="w-5 h-5 text-primary" />
//         </div>
//         <div>
//           <h3 className="font-serif font-bold text-on-surface text-lg">Gift & Special Requests</h3>
//           <p className="text-xs text-on-surface-variant">Make it extra special</p>
//         </div>
//       </div>

//       {/* Gift wrap toggle */}
//       <div
//         onClick={() => onChange({ giftWrap: !customization.giftWrap })}
//         id="gift-wrap-toggle"
//         className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
//           customization.giftWrap
//             ? "border-primary bg-primary-container/20"
//             : "border-outline-variant/50 bg-white hover:border-primary/40"
//         }`}
//       >
//         <div
//           className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
//             customization.giftWrap ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"
//           }`}
//         >
//           <Gift className="w-5 h-5" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-semibold text-on-surface">Premium Gift Wrapping</p>
//           <p className="text-xs text-on-surface-variant">Tissue, ribbon & personalised tag</p>
//         </div>
//         <div
//           className={`w-11 h-6 rounded-full transition-all flex items-center px-0.5 ${
//             customization.giftWrap ? "bg-primary" : "bg-surface-container-high"
//           }`}
//         >
//           <div
//             className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
//               customization.giftWrap ? "translate-x-5" : "translate-x-0"
//             }`}
//           />
//         </div>
//       </div>

//       {/* Gift message */}
//       {customization.giftWrap && (
//         <div className="space-y-1.5">
//           <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
//             Gift Card Message
//           </label>
//           <textarea
//             id="gift-message"
//             value={customization.giftMessage}
//             onChange={(e) => onChange({ giftMessage: e.target.value })}
//             placeholder="e.g. Welcome to the world, little one! With all our love 💕"
//             rows={3}
//             maxLength={150}
//             className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
//           />
//           <p className="text-[10px] text-on-surface-variant text-right">
//             {customization.giftMessage.length}/150
//           </p>
//         </div>
//       )}

//       {/* Special notes */}
//       <div className="space-y-1.5">
//         <label className="text-[11px] uppercase tracking-wider font-bold text-outline flex items-center gap-1">
//           <MessageSquare className="w-3 h-3" /> Special Instructions
//         </label>
//         <textarea
//           id="special-notes"
//           value={customization.specialNotes}
//           onChange={(e) => onChange({ specialNotes: e.target.value })}
//           placeholder="e.g. Prefer organic dye, rush delivery needed, specific packaging requests…"
//           rows={3}
//           maxLength={300}
//           className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
//         />
//         <p className="text-[10px] text-on-surface-variant text-right">
//           {customization.specialNotes.length}/300
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ─── Step 4: Review & Confirm ──────────────────────────────────────────── */
// function StepReview({
//   product,
//   customization,
//   intent,
//   selectedSize,
//   selectedColor,
//   quantity,
// }: {
//   product: Product;
//   customization: CustomizationDetails;
//   intent: "order" | "cart";
//   selectedSize?: string;
//   selectedColor?: string;
//   quantity: number;
// }) {
//   const rows: { label: string; value: string }[] = [
//     { label: "Baby's Name", value: customization.babyName || "—" },
//     { label: "Age", value: customization.babyAge || "—" },
//     { label: "Font Style", value: customization.fontStyle },
//     { label: "Thread Color", value: customization.embroideryColor },
//     { label: "Gift Wrap", value: customization.giftWrap ? "Yes ✓" : "No" },
//     ...(customization.giftWrap && customization.giftMessage
//       ? [{ label: "Gift Message", value: `"${customization.giftMessage}"` }]
//       : []),
//     ...(selectedSize ? [{ label: "Size", value: selectedSize }] : []),
//     ...(selectedColor ? [{ label: "Color", value: selectedColor }] : []),
//     { label: "Quantity", value: String(quantity) },
//     ...(customization.specialNotes
//       ? [{ label: "Special Notes", value: customization.specialNotes }]
//       : []),
//   ];

//   return (
//     <div className="space-y-5">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
//           <Sparkles className="w-5 h-5 text-primary" />
//         </div>
//         <div>
//           <h3 className="font-serif font-bold text-on-surface text-lg">Review Your Order</h3>
//           <p className="text-xs text-on-surface-variant">Everything looks good?</p>
//         </div>
//       </div>

//       {/* Product strip */}
//       <div className="flex items-center gap-3 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/30">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
//         />
//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-semibold text-on-surface">{product.name}</p>
//           <p className="text-primary font-bold text-sm">${(product.price * quantity).toFixed(2)}</p>
//           <p className="text-[10px] text-on-surface-variant mt-0.5">Customized · {quantity} unit{quantity > 1 ? "s" : ""}</p>
//         </div>
//       </div>

//       {/* Customization summary */}
//       <div className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden divide-y divide-outline-variant/20">
//         {rows.map(({ label, value }) => (
//           <div key={label} className="flex gap-3 px-4 py-2.5">
//             <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">
//               {label}
//             </span>
//             <span className="text-xs text-on-surface break-words">{value}</span>
//           </div>
//         ))}
//       </div>

//       <p className="text-[11px] text-on-surface-variant text-center leading-relaxed">
//         {intent === "order"
//           ? "You'll be redirected to WhatsApp where our team will confirm production details."
//           : "Item will be added to your cart with these customization details."}
//       </p>
//     </div>
//   );
// }

// /* ─── Main Modal ────────────────────────────────────────────────────────── */
// const STEPS = ["Baby Info", "Embroidery", "Gift & Notes", "Review"];

// interface CustomizationModalProps {
//   open: boolean;
//   product: Product | null;
//   intent: "order" | "cart" | null;
//   customization: CustomizationDetails;
//   selectedSize?: string;
//   selectedColor?: string;
//   quantity: number;
//   onChange: (patch: Partial<CustomizationDetails>) => void;
//   onClose: () => void;
//   onConfirm: (customization: CustomizationDetails) => void;
// }

// export default function CustomizationModal({
//   open,
//   product,
//   intent,
//   customization,
//   onChange,
//   onClose,
//   onConfirm,
// }: CustomizationModalProps) {
//   const canConfirm = customization.babyName.trim().length > 0;

//   const handleClose = () => {
//     onClose();
//   };

//   if (!product) return null;

//   const stepProps: StepProps = { product, customization, onChange };

//   return (
//     <AnimatePresence>
//       {open && (
//         <div
//           id="customization-modal-root"
//           className="fixed inset-0 z-[110] flex items-center justify-center p-4"
//         >
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"
//           />

//           {/* Panel */}
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.95, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 28, stiffness: 380 }}
//             className="relative bg-surface-container-lowest w-full max-w-lg rounded-3xl shadow-2xl border border-primary/10 flex flex-col max-h-[90vh] z-10 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/30 flex-shrink-0">
//               <div>
//                 <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5">
//                   Baby Details
//                 </p>
//                 <h2 className="text-lg font-serif font-bold text-on-surface">
//                   Personalise Your Order
//                 </h2>
//               </div>
//               <button
//                 id="customization-modal-close"
//                 onClick={handleClose}
//                 className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-all cursor-pointer"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-y-auto px-6 py-4">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key="baby-info"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.22 }}
//                 >
//                   <StepBabyInfo {...stepProps} />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Footer */}
//             <div className="flex items-center gap-3 px-6 py-5 border-t border-outline-variant/30 flex-shrink-0">
//               <button
//                 id="customization-back-btn"
//                 onClick={handleClose}
//                 className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
//               >
//                 Cancel
//               </button>

//               <button
//                 id="customization-next-btn"
//                 onClick={() => onConfirm(customization)}
//                 disabled={!canConfirm}
//                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${
//                   intent === "order"
//                     ? "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md"
//                     : "bg-primary hover:bg-primary/90 text-white shadow-md"
//                 } disabled:opacity-40 disabled:cursor-not-allowed`}
//               >
//                 {intent === "order" ? (
//                   <>
//                     <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
//                     Send Order via WhatsApp
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingBag className="w-4 h-4" />
//                     Add to Bag
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Pencil,
  Gift,
  Sparkles,
  Check,
  Baby,
  MessageSquare,
  ShoppingBag,
  Headphones,
  Type,
} from "lucide-react";
import { Product } from "../../types";
import { CustomizationDetails } from "../../types/customization";

const FONT_STYLES = [
  { id: "Classic Script", preview: "𝒞𝓁𝒶𝓈𝓈𝒾𝒸", desc: "Elegant cursive" },
  { id: "Bold Block", preview: "BOLD", desc: "Strong uppercase" },
  { id: "Delicate Serif", preview: "Delicate", desc: "Refined serif" },
  { id: "Playful Print", preview: "Playful!", desc: "Fun & round" },
];

const EMBROIDERY_COLORS = [
  { name: "Dusty Rose", hex: "#DEB8C0" },
  { name: "Sage Green", hex: "#8F9779" },
  { name: "Sky Blue", hex: "#A8C3D2" },
  { name: "Warm Cream", hex: "#E8DFD0" },
  { name: "Lavender", hex: "#C9B8D8" },
  { name: "Charcoal", hex: "#5C5C5C" },
];

const BABY_AGES = [
  "Newborn", "0–3 Months", "3–6 Months",
  "6–12 Months", "1–2 Years", "2+ Years",
];

interface StepProps {
  product: Product;
  customization: CustomizationDetails;
  onChange: (patch: Partial<CustomizationDetails>) => void;
}

/* ─── Step 1: Baby Info ─────────────────────────────────────────────────── */
function StepBabyInfo({ product, customization, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
          <Baby className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-on-surface text-lg">Baby Details</h3>
          <p className="text-xs text-on-surface-variant">Tell us a little about your little one</p>
        </div>
      </div>

      {/* Custom Embroidery Text - Updated */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
          Embroidery Text <span className="text-primary">*</span>
        </label>
        <input
          id="custom-embroidery-text"
          type="text"
          value={customization.embroideryText || customization.babyName || ""}
          onChange={(e) => onChange({ 
            embroideryText: e.target.value,
            babyName: e.target.value // Keep for backward compatibility
          })}
          placeholder="e.g. Baby's name, initials, or special message…"
          maxLength={25}
          className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <p className="text-[10px] text-on-surface-variant">
          This text will be embroidered on your item (max 25 characters)
        </p>
      </div>

      {/* Baby Name - Optional field for context */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
          Baby's Name (Optional)
        </label>
        <input
          id="custom-baby-name"
          type="text"
          value={customization.babyName || ""}
          onChange={(e) => onChange({ babyName: e.target.value })}
          placeholder="e.g. Amara, Noah, Lily…"
          maxLength={20}
          className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <p className="text-[10px] text-on-surface-variant">
          Used for gift tags and personalization (optional)
        </p>
      </div>

      {/* Baby Age */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
          Baby's Age
        </label>
        <div className="flex flex-wrap gap-2">
          {BABY_AGES.map((age) => (
            <button
              key={age}
              id={`age-${age.replace(/\s/g, "-")}`}
              onClick={() => onChange({ babyAge: age })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                customization.babyAge === age
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-outline-variant text-on-surface hover:border-primary/60"
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Product preview */}
      <div className="flex items-center gap-3 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-on-surface truncate">{product.name}</p>
          <p className="text-xs text-primary font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Embroidery & Font ─────────────────────────────────────────── */
function StepEmbroidery({ customization, onChange }: StepProps) {
  const embroideryText = customization.embroideryText || customization.babyName || "";
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
          <Pencil className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-on-surface text-lg">Embroidery Style</h3>
          <p className="text-xs text-on-surface-variant">Choose how your text will look</p>
        </div>
      </div>

      {/* Font Style */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
          Font Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_STYLES.map((font) => (
            <button
              key={font.id}
              id={`font-${font.id.replace(/\s/g, "-")}`}
              onClick={() => onChange({ fontStyle: font.id })}
              className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                customization.fontStyle === font.id
                  ? "border-primary bg-primary-container/30"
                  : "border-outline-variant bg-white hover:border-primary/40"
              }`}
            >
              {customization.fontStyle === font.id && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </span>
              )}
              <p className="text-base font-serif text-on-surface mb-0.5">{font.preview}</p>
              <p className="text-[10px] text-on-surface-variant">{font.desc}</p>
              <p className="text-[11px] font-semibold text-primary mt-1">{font.id}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Embroidery Color */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
          Thread Color:{" "}
          <span className="text-on-surface normal-case italic font-normal">
            {customization.embroideryColor}
          </span>
        </label>
        <div className="flex flex-wrap gap-3">
          {EMBROIDERY_COLORS.map((col) => (
            <button
              key={col.name}
              id={`emb-color-${col.name.replace(/\s/g, "-")}`}
              onClick={() => onChange({ embroideryColor: col.name })}
              title={col.name}
              className={`w-9 h-9 rounded-full border-2 transition-all relative cursor-pointer ${
                customization.embroideryColor === col.name
                  ? "border-primary scale-110 shadow-md"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: col.hex }}
            >
              {customization.embroideryColor === col.name && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white mix-blend-difference" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live preview badge */}
      {embroideryText && (
        <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 text-center">
          <p className="text-[10px] uppercase tracking-wider text-outline mb-2">Preview</p>
          <p
            className="text-2xl font-serif"
            style={{ color: EMBROIDERY_COLORS.find((c) => c.name === customization.embroideryColor)?.hex ?? "#DEB8C0" }}
          >
            {embroideryText}
          </p>
          <p className="text-[10px] text-on-surface-variant mt-1">{customization.fontStyle}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Step 3: Gift & Notes ──────────────────────────────────────────────── */
function StepGiftNotes({ customization, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
          <Gift className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-on-surface text-lg">Gift & Special Requests</h3>
          <p className="text-xs text-on-surface-variant">Make it extra special</p>
        </div>
      </div>

      {/* Gift wrap toggle */}
      <div
        onClick={() => onChange({ giftWrap: !customization.giftWrap })}
        id="gift-wrap-toggle"
        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
          customization.giftWrap
            ? "border-primary bg-primary-container/20"
            : "border-outline-variant/50 bg-white hover:border-primary/40"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
            customization.giftWrap ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"
          }`}
        >
          <Gift className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-on-surface">Premium Gift Wrapping</p>
          <p className="text-xs text-on-surface-variant">Tissue, ribbon & personalised tag</p>
        </div>
        <div
          className={`w-11 h-6 rounded-full transition-all flex items-center px-0.5 ${
            customization.giftWrap ? "bg-primary" : "bg-surface-container-high"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              customization.giftWrap ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Gift message */}
      {customization.giftWrap && (
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider font-bold text-outline">
            Gift Card Message
          </label>
          <textarea
            id="gift-message"
            value={customization.giftMessage}
            onChange={(e) => onChange({ giftMessage: e.target.value })}
            placeholder="e.g. Welcome to the world, little one! With all our love 💕"
            rows={3}
            maxLength={150}
            className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
          <p className="text-[10px] text-on-surface-variant text-right">
            {customization.giftMessage.length}/150
          </p>
        </div>
      )}

      {/* Special notes */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider font-bold text-outline flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> Special Instructions
        </label>
        <textarea
          id="special-notes"
          value={customization.specialNotes}
          onChange={(e) => onChange({ specialNotes: e.target.value })}
          placeholder="e.g. Prefer organic dye, rush delivery needed, specific packaging requests…"
          rows={3}
          maxLength={300}
          className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface bg-white placeholder-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
        />
        <p className="text-[10px] text-on-surface-variant text-right">
          {customization.specialNotes.length}/300
        </p>
      </div>
    </div>
  );
}

/* ─── Step 4: Review & Confirm ──────────────────────────────────────────── */
function StepReview({
  product,
  customization,
  intent,
  selectedSize,
  selectedColor,
  quantity,
}: {
  product: Product;
  customization: CustomizationDetails;
  intent: "order" | "cart";
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}) {
  const embroideryText = customization.embroideryText || customization.babyName || "";
  
  const rows: { label: string; value: string }[] = [
    { label: "Embroidery Text", value: embroideryText || "—" },
    { label: "Baby's Name", value: customization.babyName || "—" },
    { label: "Age", value: customization.babyAge || "—" },
    { label: "Font Style", value: customization.fontStyle },
    { label: "Thread Color", value: customization.embroideryColor },
    { label: "Gift Wrap", value: customization.giftWrap ? "Yes ✓" : "No" },
    ...(customization.giftWrap && customization.giftMessage
      ? [{ label: "Gift Message", value: `"${customization.giftMessage}"` }]
      : []),
    ...(selectedSize ? [{ label: "Size", value: selectedSize }] : []),
    ...(selectedColor ? [{ label: "Color", value: selectedColor }] : []),
    { label: "Quantity", value: String(quantity) },
    ...(customization.specialNotes
      ? [{ label: "Special Notes", value: customization.specialNotes }]
      : []),
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-on-surface text-lg">Review Your Order</h3>
          <p className="text-xs text-on-surface-variant">Everything looks good?</p>
        </div>
      </div>

      {/* Product strip */}
      <div className="flex items-center gap-3 bg-surface-container-low rounded-2xl p-3 border border-outline-variant/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface">{product.name}</p>
          <p className="text-primary font-bold text-sm">${(product.price * quantity).toFixed(2)}</p>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Customized · {quantity} unit{quantity > 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Customization summary */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden divide-y divide-outline-variant/20">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-3 px-4 py-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-outline min-w-[110px] flex-shrink-0 pt-0.5">
              {label}
            </span>
            <span className="text-xs text-on-surface break-words">{value}</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-on-surface-variant text-center leading-relaxed">
        {intent === "order"
          ? "You'll be redirected to WhatsApp where our team will confirm production details."
          : "Item will be added to your cart with these customization details."}
      </p>
    </div>
  );
}

/* ─── Main Modal ────────────────────────────────────────────────────────── */
const STEPS = ["Baby Info", "Embroidery", "Gift & Notes", "Review"];

interface CustomizationModalProps {
  open: boolean;
  product: Product | null;
  intent: "order" | "cart" | null;
  customization: CustomizationDetails;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  onChange: (patch: Partial<CustomizationDetails>) => void;
  onClose: () => void;
  onConfirm: (customization: CustomizationDetails) => void;
}

export default function CustomizationModal({
  open,
  product,
  intent,
  customization,
  onChange,
  onClose,
  onConfirm,
}: CustomizationModalProps) {
  const embroideryText = customization.embroideryText || customization.babyName || "";
  const canConfirm = embroideryText.trim().length > 0;

  const handleClose = () => {
    onClose();
  };

  if (!product) return null;

  const stepProps: StepProps = { product, customization, onChange };

  return (
    <AnimatePresence>
      {open && (
        <div
          id="customization-modal-root"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="relative bg-surface-container-lowest w-full max-w-lg rounded-3xl shadow-2xl border border-primary/10 flex flex-col max-h-[90vh] z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/30 flex-shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5">
                  Personalization
                </p>
                <h2 className="text-lg font-serif font-bold text-on-surface">
                  Customize Your Item
                </h2>
              </div>
              <button
                id="customization-modal-close"
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="baby-info"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <StepBabyInfo {...stepProps} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-6 py-5 border-t border-outline-variant/30 flex-shrink-0">
              <button
                id="customization-back-btn"
                onClick={handleClose}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                id="customization-next-btn"
                onClick={() => onConfirm(customization)}
                disabled={!canConfirm}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${
                  intent === "order"
                    ? "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md"
                    : "bg-primary hover:bg-primary/90 text-white shadow-md"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {intent === "order" ? (
                  <>
                    <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
                    Send Order via WhatsApp
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}