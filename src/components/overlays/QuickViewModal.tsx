// import { X, Star, Headphones, ShoppingBag, MessageSquare, Send } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Product, ProductReview, User } from "../../types";
// import { useState, useEffect } from "react";
// import { reviewService } from "../../services/reviewService";

// interface QuickViewModalProps {
//   product: Product | null;
//   quantity: number;
//   onQuantityChange: (quantity: number) => void;
//   onClose: () => void;
//   onOrder: (product: Product, quantity: number) => void;
//   onAddToCart: (product: Product, quantity: number) => void;
//   currentUser?: User | null;
// }

// export default function QuickViewModal({
//   product,
//   quantity,
//   onQuantityChange,
//   onClose,
//   onOrder,
//   onAddToCart,
//   currentUser,
// }: QuickViewModalProps) {
//   const [reviews, setReviews] = useState<ProductReview[]>([]);
//   const [isFetchingReviews, setIsFetchingReviews] = useState(false);
//   const [newReviewRating, setNewReviewRating] = useState(5);
//   const [newReviewComment, setNewReviewComment] = useState("");
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

//   useEffect(() => {
//     if (product) {
//       setIsFetchingReviews(true);
//       reviewService.getReviewsByProduct(product.id)
//         .then(setReviews)
//         .catch(console.error)
//         .finally(() => setIsFetchingReviews(false));
//     } else {
//       setReviews([]);
//     }
//   }, [product]);

//   const handleAddReview = async () => {
//     if (!product || !newReviewComment.trim()) return;
    
//     setIsSubmittingReview(true);
    
//     const userName = currentUser?.name || "Anonymous User";
//     const userId = currentUser?.id || "anon-" + Date.now();

//     const newReview = await reviewService.addReview({
//       productId: product.id,
//       userId,
//       userName,
//       rating: newReviewRating,
//       comment: newReviewComment.trim()
//     });

//     if (newReview) {
//       setReviews(prev => [newReview, ...prev]);
//       setNewReviewComment("");
//       setNewReviewRating(5);
//     }
    
//     setIsSubmittingReview(false);
//   };

//   const dynamicRating = reviews.length > 0 
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
//     : product?.rating || 5;
//   const dynamicRatingCount = reviews.length > 0 ? reviews.length : (product?.ratingCount || 0);

//   return (
//     <AnimatePresence>
//       {product && (
//         <div
//           id="product-quick-view-modal"
//           className="fixed inset-0 z-95 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-xs"
//           />

//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: "spring", damping: 25, stiffness: 350 }}
//             className="relative bg-surface-container-lowest max-w-3xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10 border border-primary/10"
//           >
//             <div className="w-full md:w-1/2 bg-surface-container h-[250px] md:h-auto min-h-[250px] relative">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               {product.isNew && (
//                 <span className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md">
//                   NEW
//                 </span>
//               )}
//             </div>

//             <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-none">
//               <div className="p-6 md:p-8 flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] uppercase tracking-widest text-outline font-bold font-sans">
//                     {product.category} COLLECTION
//                   </span>
//                   <button
//                     onClick={onClose}
//                     className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <h2 className="text-2xl font-serif font-bold text-on-surface leading-tight">
//                   {product.name}
//                 </h2>

//                 <div className="flex items-center gap-1 text-xs text-outline-variant">
//                   <div className="flex items-center gap-0.5">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <Star
//                         key={i}
//                         className={`w-3.5 h-3.5 ${i <= Math.round(dynamicRating) ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-[13px] text-on-surface-variant font-semibold ml-1">
//                     {dynamicRating.toFixed(1)}
//                   </span>
//                   <span className="text-[12px] text-outline">
//                     ({dynamicRatingCount} reviews)
//                   </span>
//                 </div>

//                 <span className="text-2xl font-serif font-bold text-primary">
//                   ₹{product.price.toFixed(2)}
//                 </span>

//                 <div className="rounded-2xl bg-surface-container-low border border-primary/10 p-4 md:p-5">
//                   <h3 className="text-[11px] uppercase tracking-wider text-outline font-bold mb-2">
//                     Product Details
//                   </h3>
//                   <p className="text-sm text-on-surface-variant leading-6">
//                     {product.description || "Thoughtfully made for everyday comfort, gifting, and gentle baby care."}
//                   </p>
//                 </div>

//                 {/* Reviews Section */}
//                 <div className="mt-2 border-t border-outline-variant/30 pt-6">
//                   <h3 className="text-lg font-serif font-bold text-on-surface mb-4 flex items-center gap-2">
//                     <MessageSquare className="w-5 h-5 text-primary" />
//                     Customer Reviews
//                   </h3>
                  
//                   {/* Add Review Form */}
//                   <div className="bg-surface-container-low rounded-xl p-4 mb-6 border border-outline-variant/20">
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-3">Write a Review</h4>
//                     <div className="flex items-center gap-1 mb-3">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => setNewReviewRating(star)}
//                           className="p-1 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer"
//                         >
//                           <Star className={`w-5 h-5 ${star <= newReviewRating ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`} />
//                         </button>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Share your thoughts..."
//                         value={newReviewComment}
//                         onChange={(e) => setNewReviewComment(e.target.value)}
//                         className="flex-1 bg-surface border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-on-surface"
//                       />
//                       <button
//                         onClick={handleAddReview}
//                         disabled={isSubmittingReview || !newReviewComment.trim()}
//                         className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-none cursor-pointer flex items-center justify-center"
//                       >
//                         <Send className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Reviews List */}
//                   <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
//                     {isFetchingReviews ? (
//                       <p className="text-sm text-outline animate-pulse text-center py-4">Loading reviews...</p>
//                     ) : reviews.length === 0 ? (
//                       <p className="text-sm text-outline text-center py-4 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/30">
//                         No reviews yet. Be the first to share your experience!
//                       </p>
//                     ) : (
//                       reviews.map((review) => (
//                         <div key={review.id} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
//                           <div className="flex justify-between items-start mb-2">
//                             <span className="font-semibold text-sm text-on-surface">{review.userName}</span>
//                             <span className="text-[10px] text-outline">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-0.5 mb-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`w-3 h-3 ${star <= review.rating ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant/30"}`}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-sm text-on-surface-variant leading-relaxed">
//                             {review.comment}
//                           </p>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3 border-t border-primary/10 p-6 md:p-8 bg-surface-container-lowest">
//                 <div className="flex items-center justify-between sm:justify-start bg-surface-container-low border border-primary/10 rounded-xl p-1 shadow-xs">
//                   <button
//                     onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
//                     className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-lg leading-none bg-transparent border-none cursor-pointer"
//                   >
//                     −
//                   </button>
//                   <span className="text-sm font-bold min-w-[20px] text-center text-on-surface">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => onQuantityChange(quantity + 1)}
//                     className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-lg leading-none bg-transparent border-none cursor-pointer"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   <button
//                     onClick={() => onAddToCart(product, quantity)}
//                     className="w-full bg-primary hover:bg-primary/95 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
//                   >
//                     <ShoppingBag className="w-4 h-4" />
//                     Add to Bag
//                   </button>

//                   <button
//                     onClick={() => onOrder(product, quantity)}
//                     className="w-full bg-[#25D366] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
//                   >
//                     <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
//                     Direct Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }





// import { X, Star, Headphones, ShoppingBag, MessageSquare, Send, Eye } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Product, ProductReview, User } from "../../types";
// import { useState, useEffect } from "react";
// import { reviewService } from "../../services/reviewService";

// interface QuickViewModalProps {
//   product: Product | null;
//   quantity: number;
//   onQuantityChange: (quantity: number) => void;
//   onClose: () => void;
//   onOrder: (product: Product, quantity: number) => void;
//   onAddToCart: (product: Product, quantity: number) => void;
//   currentUser?: User | null;
//   onViewFullDetails?: (product: Product) => void;
// }

// export default function QuickViewModal({
//   product,
//   quantity,
//   onQuantityChange,
//   onClose,
//   onOrder,
//   onAddToCart,
//   currentUser,
//   onViewFullDetails,
// }: QuickViewModalProps) {
//   const [reviews, setReviews] = useState<ProductReview[]>([]);
//   const [isFetchingReviews, setIsFetchingReviews] = useState(false);
//   const [newReviewRating, setNewReviewRating] = useState(5);
//   const [newReviewComment, setNewReviewComment] = useState("");
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

//   useEffect(() => {
//     if (product) {
//       setIsFetchingReviews(true);
//       reviewService.getReviewsByProduct(product.id)
//         .then(setReviews)
//         .catch(console.error)
//         .finally(() => setIsFetchingReviews(false));
//     } else {
//       setReviews([]);
//     }
//   }, [product]);

//   const handleAddReview = async () => {
//     if (!product || !newReviewComment.trim()) return;
    
//     setIsSubmittingReview(true);
    
//     const userName = currentUser?.name || "Anonymous User";
//     const userId = currentUser?.id || "anon-" + Date.now();

//     const newReview = await reviewService.addReview({
//       productId: product.id,
//       userId,
//       userName,
//       rating: newReviewRating,
//       comment: newReviewComment.trim()
//     });

//     if (newReview) {
//       setReviews(prev => [newReview, ...prev]);
//       setNewReviewComment("");
//       setNewReviewRating(5);
//     }
    
//     setIsSubmittingReview(false);
//   };

//   const dynamicRating = reviews.length > 0 
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
//     : product?.rating || 5;
//   const dynamicRatingCount = reviews.length > 0 ? reviews.length : (product?.ratingCount || 0);

//   const description = product?.description || "Thoughtfully made for everyday comfort, gifting, and gentle baby care.";
//   const shouldShowExpandButton = description.length > 100;

//   return (
//     <AnimatePresence>
//       {product && (
//         <div
//           id="product-quick-view-modal"
//           className="fixed inset-0 z-95 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-xs"
//           />

//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: "spring", damping: 25, stiffness: 350 }}
//             className="relative bg-surface-container-lowest max-w-6xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row z-10 border border-primary/10"
//           >
//             {/* Left Column - Smaller Image */}
//             <div className="w-full md:w-[180px] lg:w-[300px] bg-surface-container flex-shrink-0">
//               <div className="relative h-[180px] md:h-full min-h-[180px]">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {product.isNew && (
//                   <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
//                     NEW
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Right Column - All Content with More Space */}
//             <div className="flex-1 flex flex-col overflow-y-auto max-h-[90vh]">
//               <div className="p-4 md:p-6 flex flex-col gap-3 flex-1">
//                 {/* Header */}
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex-1 min-w-0">
//                     <span className="text-[10px] uppercase tracking-widest text-outline font-bold">
//                       {product.category}
//                     </span>
//                     <h2 className="text-xl md:text-2xl font-serif font-bold text-on-surface leading-tight mt-0.5">
//                       {product.name}
//                     </h2>
//                   </div>
//                   <button
//                     onClick={onClose}
//                     className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all flex-shrink-0"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Rating & Price - Compact Row */}
//                 <div className="flex items-center justify-between flex-wrap gap-2">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-0.5">
//                       {[1, 2, 3, 4, 5].map((i) => (
//                         <Star
//                           key={i}
//                           className={`w-3.5 h-3.5 ${i <= Math.round(dynamicRating) ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-on-surface-variant font-semibold">
//                       {dynamicRating.toFixed(1)}
//                     </span>
//                     <span className="text-xs text-outline">
//                       ({dynamicRatingCount})
//                     </span>
//                   </div>
//                   <span className="text-2xl font-serif font-bold text-primary">
//                     ₹{product.price.toFixed(2)}
//                   </span>
//                 </div>

//                 {/* Description - Full with Expand/Collapse */}
//                 <div className="bg-surface-container-low rounded-xl border border-primary/10 p-3">
//                   <div className="relative">
//                     <p className={`text-sm text-on-surface-variant leading-5 whitespace-pre-wrap transition-all duration-300 ${
//                       isDescriptionExpanded ? '' : 'line-clamp-3'
//                     }`}>
//                       {description}
//                     </p>
//                     {shouldShowExpandButton && (
//                       <button
//                         onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
//                         className="mt-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors bg-transparent border-none cursor-pointer"
//                       >
//                         {isDescriptionExpanded ? 'Show Less' : 'Read More'}
//                       </button>
//                     )}
//                   </div>
//                   {onViewFullDetails && (
//                     <button
//                       onClick={() => onViewFullDetails(product)}
//                       className="mt-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer group"
//                     >
//                       <Eye className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
//                       View Full Details
//                     </button>
//                   )}
//                 </div>

//                 {/* Reviews Section - More Compact */}
//                 <div className="border-t border-outline-variant/30 pt-3 mt-1">
//                   <h3 className="text-sm font-serif font-bold text-on-surface mb-3 flex items-center gap-2">
//                     <MessageSquare className="w-4 h-4 text-primary" />
//                     Customer Reviews
//                   </h3>
                  
//                   {/* Add Review - Compact */}
//                   <div className="bg-surface-container-low rounded-lg p-3 mb-4 border border-outline-variant/20">
//                     <div className="flex items-center gap-1 mb-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => setNewReviewRating(star)}
//                           className="p-0.5 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer"
//                         >
//                           <Star className={`w-4 h-4 ${star <= newReviewRating ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`} />
//                         </button>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Share your thoughts..."
//                         value={newReviewComment}
//                         onChange={(e) => setNewReviewComment(e.target.value)}
//                         className="flex-1 bg-surface border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50 text-on-surface"
//                       />
//                       <button
//                         onClick={handleAddReview}
//                         disabled={isSubmittingReview || !newReviewComment.trim()}
//                         className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-none cursor-pointer flex items-center justify-center"
//                       >
//                         <Send className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Reviews List - Compact */}
//                   <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
//                     {isFetchingReviews ? (
//                       <p className="text-xs text-outline animate-pulse text-center py-2">Loading...</p>
//                     ) : reviews.length === 0 ? (
//                       <p className="text-xs text-outline text-center py-2 bg-surface-container-lowest rounded-lg border border-dashed border-outline-variant/30">
//                         No reviews yet. Be the first!
//                       </p>
//                     ) : (
//                       reviews.slice(0, 3).map((review) => (
//                         <div key={review.id} className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/10">
//                           <div className="flex justify-between items-start">
//                             <span className="font-semibold text-xs text-on-surface">{review.userName}</span>
//                             <span className="text-[9px] text-outline">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-0.5 my-0.5">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`w-2.5 h-2.5 ${star <= review.rating ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant/30"}`}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-1">
//                             {review.comment}
//                           </p>
//                         </div>
//                       ))
//                     )}
//                     {reviews.length > 3 && (
//                       <p className="text-xs text-center text-outline">+{reviews.length - 3} more reviews</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons - Compact */}
//               <div className="flex flex-col gap-2 border-t border-primary/10 p-4 md:p-5 bg-surface-container-lowest">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center bg-surface-container-low border border-primary/10 rounded-lg p-0.5 shadow-xs">
//                     <button
//                       onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
//                       className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-base leading-none bg-transparent border-none cursor-pointer"
//                     >
//                       −
//                     </button>
//                     <span className="text-sm font-bold min-w-[24px] text-center text-on-surface">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => onQuantityChange(quantity + 1)}
//                       className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-base leading-none bg-transparent border-none cursor-pointer"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => onAddToCart(product, quantity)}
//                     className="flex-1 bg-primary hover:bg-primary/95 text-white py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
//                   >
//                     <ShoppingBag className="w-4 h-4" />
//                     Add to Bag
//                   </button>

//                   <button
//                     onClick={() => onOrder(product, quantity)}
//                     className="flex-1 bg-[#25D366] text-white py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
//                   >
//                     <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
//                     Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }

import { X, Star, Headphones, ShoppingBag, MessageSquare, Send, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, ProductReview, User } from "../../types";
import { useState, useEffect } from "react";
import { reviewService } from "../../services/reviewService";

interface QuickViewModalProps {
  product: Product | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
  onOrder: (product: Product, quantity: number) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  currentUser?: User | null;
  onViewFullDetails?: (product: Product) => void;
}

function getProductIncludes(product: Product, description: string) {
  const explicitIncludes = [
    ...(product.includes ?? []),
    ...(product.tags ?? []),
  ]
    .map((item) => item.trim())
    .filter(Boolean);

  if (explicitIncludes.length > 0) {
    return Array.from(new Set(explicitIncludes)).slice(0, 6);
  }

  const includeMatch = description.match(
    /\b(?:includes?|comes with|features?|consisting of)\b\s+(.+?)(?:\.|$)/i
  );

  if (!includeMatch) return [];

  return includeMatch[1]
    .replace(/^[:\-]\s*/, "")
    .split(/,\s+|\s+and\s+/i)
    .map((item) =>
      item
        .replace(/^(a|an|the)\s+/i, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((item) => item.length > 2)
    .slice(0, 6);
}

export default function QuickViewModal({
  product,
  quantity,
  onQuantityChange,
  onClose,
  onOrder,
  onAddToCart,
  currentUser,
  onViewFullDetails,
}: QuickViewModalProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (product) {
      reviewService.getReviewsByProduct(product.id)
        .then(setReviews)
        .catch(console.error);
    } else {
      setReviews([]);
    }
  }, [product]);

  const handleAddReview = async () => {
    if (!product || !newReviewComment.trim()) return;

    setIsSubmittingReview(true);

    const userName = currentUser?.name || "Anonymous User";
    const userId = currentUser?.id || "anon-" + Date.now();

    const newReview = await reviewService.addReview({
      productId: product.id,
      userId,
      userName,
      rating: newReviewRating,
      comment: newReviewComment.trim()
    });

    if (newReview) {
      setReviews(prev => [newReview, ...prev]);
      setNewReviewComment("");
      setNewReviewRating(5);
    }

    setIsSubmittingReview(false);
  };

  const dynamicRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product?.rating || 5;
  const dynamicRatingCount = reviews.length > 0 ? reviews.length : (product?.ratingCount || 0);

  const description = product?.description || "Thoughtfully made for everyday comfort, gifting, and gentle baby care.";
  const productIncludes = product ? getProductIncludes(product, description) : [];

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

          {/*
            FIX: the outer card is the single source of truth for height.
            - max-h-[90vh] + overflow-hidden here means NOTHING can visually
              escape this box, no matter how long the description/reviews get.
            - min-h-0 on this flex container lets its flex children (image col
              + content col) actually shrink instead of growing unbounded,
              which is what was breaking the "fit" before.
          */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative bg-surface-container-lowest max-w-6xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] min-h-0 flex flex-col md:flex-row z-10 border border-primary/10"
          >
            {/* Left Column - Image */}
            <div className="w-full md:w-[180px] lg:w-[300px] bg-surface-container flex-shrink-0">
              <div className="relative h-[180px] md:h-full min-h-[180px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/*
              FIX: min-h-0 is the key addition here. Without it, a flex item
              with overflow-y-auto still refuses to shrink below its content
              size in a flex container — so on mobile (flex-col), this column
              was adding its own height ON TOP of the 180px image instead of
              scrolling within the remaining space, blowing past 90vh.
            */}
            <div className="flex-1 flex flex-col overflow-y-auto min-h-0">
              <div className="p-4 md:p-6 flex flex-col gap-3 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-widest text-outline font-bold">
                      {product.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-on-surface leading-tight mt-0.5">
                      {product.name}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-all flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i <= Math.round(dynamicRating) ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-on-surface-variant font-semibold">
                      {dynamicRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-outline">
                      ({dynamicRatingCount})
                    </span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-primary">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>

                {/*
                  FIX: description is just a fixed-height box that scrolls.
                  No clamp, no expand/collapse — this is what keeps the
                  modal's overall size predictable no matter how long the
                  text is.
                */}
                <div className="bg-surface-container-low rounded-xl border border-primary/10 p-3">
                  <p className="text-sm text-on-surface-variant leading-5 whitespace-pre-wrap">
                    {description}
                  </p>
                  {productIncludes.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-outline mr-1">
                        Includes
                      </span>
                      {productIncludes.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-primary/15 bg-surface-container-lowest px-2.5 py-1 text-[11px] font-medium text-on-surface-variant"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  {onViewFullDetails && (
                    <button
                      onClick={() => onViewFullDetails(product)}
                      className="mt-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer group"
                    >
                      <Eye className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                      View Full Details
                    </button>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="border-t border-outline-variant/30 pt-3 mt-1">
                  <h3 className="text-sm font-serif font-bold text-on-surface mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Customer Reviews
                  </h3>

                  {/* Add Review */}
                  <div className="bg-surface-container-low rounded-lg p-3 mb-4 border border-outline-variant/20">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          className="p-0.5 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= newReviewRating ? "fill-[#FFC107] text-[#FFC107]" : "text-outline-variant"}`} />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Share your thoughts..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="flex-1 bg-surface border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50 text-on-surface"
                      />
                      <button
                        onClick={handleAddReview}
                        disabled={isSubmittingReview || !newReviewComment.trim()}
                        className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-none cursor-pointer flex items-center justify-center"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/*
                FIX: flex-shrink-0 so the action bar never gets squeezed or
                pushed out — it's guaranteed to stay visible at the bottom
                of the scrollable content column, sticky-like, regardless of
                how much the description/reviews above it grow.
              */}
              <div className="flex-shrink-0 flex flex-col gap-2 border-t border-primary/10 p-4 md:p-5 bg-surface-container-lowest sticky bottom-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-surface-container-low border border-primary/10 rounded-lg p-0.5 shadow-xs">
                    <button
                      onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                      className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-base leading-none bg-transparent border-none cursor-pointer"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold min-w-[24px] text-center text-on-surface">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onQuantityChange(quantity + 1)}
                      className="p-1 px-2.5 text-on-surface hover:text-primary transition-colors font-bold text-base leading-none bg-transparent border-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="flex-1 bg-primary hover:bg-primary/95 text-white py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                  </button>

                  <button
                    onClick={() => onOrder(product, quantity)}
                    className="flex-1 bg-[#25D366] text-white py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-sm cursor-pointer border-none"
                  >
                    <Headphones className="w-4 h-4 fill-white text-transparent stroke-[1]" />
                    Order
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
