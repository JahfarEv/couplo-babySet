// import { forwardRef } from "react";
// import { Grid, ArrowRight } from "lucide-react";
// import { useCategories } from "../../hooks/useCategories";
// import { CategoryFilter, Category } from "../../types";

// interface CuratedCollectionsProps {
//   onCategoryClick: (category: CategoryFilter) => void;
// }

// const categoryImageMap: Record<CategoryFilter, string> = {
//   babyset: "/babyset/frok1.jpeg",
//   accessories:
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuArL_iDD6-BE12HVDGAY_ogXIObff0_iytIHIFw6ONaEw8Kt4vBV_adoUUB6YL50IHsHFfynq3rhcQ-S_-BS_W-s2nAKx-QBnUWz2e6umn5YA8YGvOF5FGfTh2Q_ulN_dDLhK3WGNWa87OA7dq3P3WmKcx0vv6U8Y0mn4bMIURvAFV4YLsDOEojxuojH2OzXHW69N9Ph9S5qyKqnKHqpksWKbAo9F_1Mx_tZo7lB6R9QaXfJOSob2HzSrnLUI2PkVkixD7FZMrNCw",
//   tshirt:
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuBIIlbtn6qBaLAKWxKVimSPrE2FW_8YQTAsPp0m9spn8j3flNctnXyvCNyqLuKnKrLtM3CoT5PiZ4xDg4Sx-6CWhXORHGOKc1DarH0rodFpou-A3DHDX1jmLnc2gMRPyYM7yb4HQ_hhRud3NIyTYz4CEUV45b6OdWZjyRMHsHjK546wtotJExDldloR_QfYN7rnhP3w3mnZz7t5s3uff3n_Alrsz-n-PTw0alwwLcPl7lCYy_ue0mgXXE4uaiL6JTe9kNgR73D4BA",
//   cordset:
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrL2YAc6DnfP6Eac9Ky6osZNQ3BZOIkQ5-5AN6yL4Si-9ho1KcWXw3MV8EMyYeE6eqXVObJqZtXXETTzErkCYDf9fiTnx87fz0LDnQhKuZjs6ELKW6dCcNb_72HjIhihcW7qW_7LKYZNYLAyQbXlpNggf0vFxxczSPkHLCSpRhAuvZpUn1k0RL5ZzaYSw5VF76e9Sqd_FV_zDsHzsws-iA2Un2LE_V7n4CYhUHy2J8CW-b2Q_HcouAZHtLJvlyMriXvAdzJwQog",
// };

// const defaultCategoryCards = [
//   {
//     value: "babyset" as CategoryFilter,
//     title: "Baby Clothing",
//     label: "Baby Sets",
//     image: categoryImageMap.babyset,
//     extraCopy: "Explore garments",
//     large: true,
//   },
//   {
//     value: "tshirt" as CategoryFilter,
//     title: "T Shirts",
//     label: "T Shirts",
//     image: categoryImageMap.tshirt,
//   },
//   {
//     value: "cordset" as CategoryFilter,
//     title: "Cord Set",
//     label: "Cord Set",
//     image: categoryImageMap.cordset,
//   },
// ];

// const CuratedCollections = forwardRef<HTMLDivElement, CuratedCollectionsProps>(
//   ({ onCategoryClick }, ref) => {
//     const { categories } = useCategories();

//     const categoryCards = categories.length
//       ? categories.map((category, index) => ({
//           value: category.value,
//           title:
//             category.value === "babyset"
//               ? "Baby Clothing"
//               : category.value === "accessories"
//               ? "Wooden Toys"
//               : category.value === "tshirt"
//               ? "T Shirts"
//               : category.value === "cordset"
//               ? "Cord Set"
//               : category.label,
//           label: category.label,
//           image: categoryImageMap[category.value] ?? categoryImageMap.babyset,
//           extraCopy: category.value === "babyset" ? "Explore garments" : undefined,
//           large: index === 0,
//         }))
//       : defaultCategoryCards;

//     return (
//       <section
//         ref={ref}
//         id="curated-collections"
//         className="py-20 px-4 md:px-16 bg-surface-container-low transition-all"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="text-[11px] uppercase tracking-widest font-bold text-primary">
//               SHOP BY THEME
//             </span>
//             <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-2 mb-4">
//               Curated Collections
//             </h2>
//             <p className="text-sm md:text-md text-on-surface-variant max-w-md mx-auto">
//               Find exactly what you need for every milestone. Organic,
//               non-toxic, and hand-selected items.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
//             {categoryCards.slice(0, 3).map((card, index) => (
//               <div
//                 key={card.value}
//                 onClick={() => onCategoryClick(card.value)}
//                 className={`group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none ${card.large ? "col-span-2 row-span-2 h-full" : ""}`}
//               >
//                 <img
//                   alt={card.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
//                   src={card.image}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-inverse-surface/20 to-transparent" />
//                 <div className="absolute bottom-6 left-6 right-6">
//                   <h3 className="text-2xl md:text-3xl font-serif text-white font-black text-on-primary">
//                     {card.title}
//                   </h3>
//                   {card.extraCopy ? (
//                     <span className="text-xs text-primary-fixed-dim font-bold flex items-center group-hover:text-on-primary transition-colors mt-2">
//                       {card.extraCopy}
//                       <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             ))}

//             <div
//               onClick={() =>
//                 window.open(
//                   "https://whatsapp.com/channel/0029VbDWjLXAO7RN0fAEt91F",
//                   "_blank",
//                 )
//               }
//               className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
//             >
//               <img
//                 alt="Join our WhatsApp Channel"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-95"
//                 src="/babyset/more.jpg"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4">
//                 <h3 className="text-md sm:text-lg font-serif font-bold text-white">
//                   More Collections
//                 </h3>
//                 <p className="text-xs text-white/80 mt-1">
//                   Latest arrivals & offers
//                 </p>
//               </div>
//             </div>

//             <div
//               onClick={() => onCategoryClick("all")}
//               className="group relative rounded-3xl overflow-hidden shadow-xs cursor-pointer block select-none border border-primary/10"
//             >
//               <div className="absolute inset-0 bg-secondary-container/20 flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-secondary-container/40">
//                 <Grid className="w-8 h-8 text-secondary mb-2" />
//                 <h3 className="text-xs sm:text-sm font-semibold font-serif text-on-surface">
//                   View All Categories
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   },
// );

// CuratedCollections.displayName = "CuratedCollections";

// export default CuratedCollections;

// // import { forwardRef } from "react";
// // import { Grid } from "lucide-react";
// // import { CategoryFilter } from "../../types";

// // interface CuratedCollectionsProps {
// //   onCategoryClick: (category: CategoryFilter) => void;
// // }

// // const CuratedCollections = forwardRef<HTMLDivElement, CuratedCollectionsProps>(
// //   ({ onCategoryClick }, ref) => {
// //     return (
// //       <section
// //         ref={ref}
// //         id="curated-collections"
// //         className="py-20 px-4 md:px-16 bg-surface-container-low transition-all"
// //       >
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-16">
// //             <span className="text-[11px] uppercase tracking-widest font-bold text-primary">
// //               SHOP BY THEME
// //             </span>
// //             <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-2 mb-4">
// //               Curated Collections
// //             </h2>
// //             <p className="text-sm md:text-md text-on-surface-variant max-w-md mx-auto">
// //               Find exactly what you need for every milestone. Organic,
// //               non-toxic, and hand-selected items.
// //             </p>
// //           </div>

// //           {/* 4 equal cards: 2x2 on mobile, 1x4 row on desktop — no leftover gaps */}
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
// //             <div
// //               onClick={() => onCategoryClick("babyset")}
// //               className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
// //             >
// //               <img
// //                 alt="Organic cotton baby clothing elegantly folded"
// //                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
// //                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOU5KZxVtaPusHeQ4PsOAho5NJoMReQpzIKWW5DqS3BUuMYGO9ATkrLE5P3XMvitfRDaSjgzpsLyRaK5XEr5lrdq7qr650tz5D6bDU1mJsgki9cA-OzRMAvB5QRAm9pnoGOrM_zCxGn7IAKXFENFQtjUZs68x9UxXosEUHISPR7J7QYkJ4EVMfyscd80J2SYWZ13stn3AnnbXSXBephRwz2YG-OgwGP6cMREUEvlIWGnL6Jcuaff4rj5CcNs3z1nx2ImvAtDk1PA"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
// //               <div className="absolute bottom-4 left-4 right-4">
// //                 <h3 className="text-md sm:text-lg font-serif font-bold text-on-primary">
// //                   Baby Set
// //                 </h3>
// //               </div>
// //             </div>

// //             <div
// //               onClick={() => onCategoryClick("accessories")}
// //               className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
// //             >
// //               <img
// //                 alt="Minimalist wooden baby stacking rings"
// //                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-95"
// //                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuArL_iDD6-BE12HVDGAY_ogXIObff0_iytIHIFw6ONaEw8Kt4vBV_adoUUB6YL50IHsHFfynq3rhcQ-S_-BS_W-s2nAKx-QBnUWz2e6umn5YA8YGvOF5FGfTh2Q_ulN_dDLhK3WGNWa87OA7dq3P3WmKcx0vv6U8Y0mn4bMIURvAFV4YLsDOEojxuojH2OzXHW69N9Ph9S5qyKqnKHqpksWKbAo9F_1Mx_tZo7lB6R9QaXfJOSob2HzSrnLUI2PkVkixD7FZMrNCw"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
// //               <div className="absolute bottom-4 left-4 right-4">
// //                 <h3 className="text-md sm:text-lg font-serif font-bold text-on-primary">
// //                   Accessories
// //                 </h3>
// //               </div>
// //             </div>

// //             <div
// //               onClick={() => onCategoryClick("tshirt")}
// //               className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
// //             >
// //               <img
// //                 alt="Premium baby gift sets"
// //                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-95"
// //                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIIlbtn6qBaLAKWxKVimSPrE2FW_8YQTAsPp0m9spn8j3flNctnXyvCNyqLuKnKrLtM3CoT5PiZ4xDg4Sx-6CWhXORHGOKc1DarH0rodFpou-A3DHDX1jmLnc2gMRPyYM7yb4HQ_hhRud3NIyTYz4CEUV45b6OdWZjyRMHsHjK546wtotJExDldloR_QfYN7rnhP3w3mnZz7t5s3uff3n_Alrsz-n-PTw0alwwLcPl7lCYy_ue0mgXXE4uaiL6JTe9kNgR73D4BA"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
// //               <div className="absolute bottom-4 left-4 right-4">
// //                 <h3 className="text-md sm:text-lg font-serif font-bold text-on-primary">
// //                   T shirts
// //                 </h3>
// //               </div>
// //             </div>

// //             <div
// //               onClick={() => onCategoryClick("all")}
// //               className="group relative rounded-3xl overflow-hidden shadow-xs cursor-pointer block select-none border border-primary/10"
// //             >
// //               <div className="absolute inset-0 bg-secondary-container/20 flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-secondary-container/40">
// //                 <Grid className="w-8 h-8 text-secondary mb-2" />
// //                 <h3 className="text-xs sm:text-sm font-semibold font-serif text-on-surface">
// //                   View All Categories
// //                 </h3>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     );
// //   },
// // );

// // CuratedCollections.displayName = "CuratedCollections";

// // export default CuratedCollections;








// import { forwardRef, useMemo } from "react";
// import { Grid, ArrowRight } from "lucide-react";
// import { useCategories } from "../../hooks/useCategories";
// import { CategoryFilter } from "../../types";

// interface CuratedCollectionsProps {
//   onCategoryClick: (category: CategoryFilter) => void;
// }

// // Fallback images for categories
// const categoryImageMap: Record<string, string> = {
//   babyset: "/babyset/frok1.jpeg",
//   accessories: "https://lh3.googleusercontent.com/aida-public/AB6AXuArL_iDD6-BE12HVDGAY_ogXIObff0_iytIHIFw6ONaEw8Kt4vBV_adoUUB6YL50IHsHFfynq3rhcQ-S_-BS_W-s2nAKx-QBnUWz2e6umn5YA8YGvOF5FGfTh2Q_ulN_dDLhK3WGNWa87OA7dq3P3WmKcx0vv6U8Y0mn4bMIURvAFV4YLsDOEojxuojH2OzXHW69N9Ph9S5qyKqnKHqpksWKbAo9F_1Mx_tZo7lB6R9QaXfJOSob2HzSrnLUI2PkVkixD7FZMrNCw",
//   tshirt: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIIlbtn6qBaLAKWxKVimSPrE2FW_8YQTAsPp0m9spn8j3flNctnXyvCNyqLuKnKrLrM3CoT5PiZ4xDg4Sx-6CWhXORHGOKc1DarH0rodFpou-A3DHDX1jmLnc2gMRPyYM7yb4HQ_hhRud3NIyTYz4CEUV45b6OdWZjyRMHsHjK546wtotJExDldloR_QfYN7rnhP3w3mnZz7t5s3uff3n_Alrsz-n-PTw0alwwLcPl7lCYy_ue0mgXXE4uaiL6JTe9kNgR73D4BA",
//   cordset: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrL2YAc6DnfP6Eac9Ky6osZNQ3BZOIkQ5-5AN6yL4Si-9ho1KcWXw3MV8EMyYeE6eqXVObJqZtXXETTzErkCYDf9fiTnx87fz0LDnQhKuZjs6ELKW6dCcNb_72HjIhihcW7qW_7LKYZNYLAyQbXlpNggf0vFxxczSPkHLCSpRhAuvZpUn1k0RL5ZzaYSw5VF76e9Sqd_FV_zDsHzsws-iA2Un2LE_V7n4CYhUHy2J8CW-b2Q_HcouAZHtLJvlyMriXvAdzJwQog",
// };

// // Map category names to their filter values
// const categoryValueMap: Record<string, string> = {
//   "Accessories": "accessories",
//   "Baby Sets": "babyset",
//   "T-Shirts": "tshirt",
//   "Cord Sets": "cordset",
// };

// const CuratedCollections = forwardRef<HTMLDivElement, CuratedCollectionsProps>(
//   ({ onCategoryClick }, ref) => {
//     const { categories, loading, error } = useCategories();

//     // Get categories for display
//     const displayCategories = useMemo(() => {
//       // Filter out any categories that don't have a valid value mapping
//       const validCategories = categories.filter(cat => {
//         const value = categoryValueMap[cat.name];
//         return value !== undefined;
//       });

//       // Take first 3 categories
//       return validCategories.slice(0, 3).map((category, index) => {
//         const value = categoryValueMap[category.name] || category.name.toLowerCase();
//         return {
//           ...category,
//           value: value as CategoryFilter,
//           image: category.image || categoryImageMap[value] || categoryImageMap.babyset,
//           isLarge: index === 0,
//           extraCopy: index === 0 ? "Explore garments" : undefined,
//         };
//       });
//     }, [categories]);

//     return (
//       <section
//         ref={ref}
//         id="curated-collections"
//         className="py-20 px-4 md:px-16 bg-surface-container-low transition-all"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="text-[11px] uppercase tracking-widest font-bold text-primary">
//               SHOP BY THEME
//             </span>
//             <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-2 mb-4">
//               Curated Collections
//             </h2>
//             <p className="text-sm md:text-md text-on-surface-variant max-w-md mx-auto">
//               Find exactly what you need for every milestone. Organic,
//               non-toxic, and hand-selected items.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
//             {loading ? (
//               // Loading skeletons
//               <>
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className={`relative rounded-3xl overflow-hidden bg-gray-200 animate-pulse ${
//                       i === 1 ? "col-span-2 row-span-2" : ""
//                     }`}
//                   >
//                     <div className="w-full h-full flex items-center justify-center">
//                       <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
//                     </div>
//                   </div>
//                 ))}
//               </>
//             ) : error ? (
//               // Error state
//               <div className="col-span-2 md:col-span-4 text-center py-12">
//                 <p className="text-red-600">Failed to load categories</p>
//                 <button 
//                   onClick={() => window.location.reload()}
//                   className="mt-2 text-primary underline"
//                 >
//                   Retry
//                 </button>
//               </div>
//             ) : displayCategories.length === 0 ? (
//               // No categories
//               <div className="col-span-2 md:col-span-4 text-center py-12">
//                 <p className="text-on-surface-variant">No categories available</p>
//               </div>
//             ) : (
//               // Display categories from Firebase
//               displayCategories.map((category) => (
//                 <div
//                   key={category.id}
//                   onClick={() => onCategoryClick(category.value)}
//                   className={`group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none transition-all hover:shadow-lg ${
//                     category.isLarge ? "col-span-2 row-span-2 h-full" : ""
//                   }`}
//                 >
//                   <img
//                     alt={category.label}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
//                     src={category.image}
//                     onError={(e) => {
//                       // Fallback if image fails to load
//                       (e.target as HTMLImageElement).src = categoryImageMap.babyset;
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-inverse-surface/20 to-transparent" />
//                   <div className="absolute bottom-6 left-6 right-6">
//                     <h3 className="text-2xl md:text-3xl font-serif text-white font-black text-on-primary">
//                       {category.label}
//                     </h3>
//                     {category.extraCopy && (
//                       <span className="text-xs text-primary-fixed-dim font-bold flex items-center group-hover:text-on-primary transition-colors mt-2">
//                         {category.extraCopy}
//                         <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* WhatsApp Channel Card - Always visible */}
//             <div
//               onClick={() =>
//                 window.open(
//                   "https://whatsapp.com/channel/0029VbDWjLXAO7RN0fAEt91F",
//                   "_blank",
//                 )
//               }
//               className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
//             >
//               <img
//                 alt="Join our WhatsApp Channel"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-95"
//                 src="/babyset/more.jpg"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = categoryImageMap.babyset;
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
//               <div className="absolute bottom-4 left-4 right-4">
//                 <h3 className="text-md sm:text-lg font-serif font-bold text-white">
//                   More Collections
//                 </h3>
//                 <p className="text-xs text-white/80 mt-1">
//                   Latest arrivals & offers
//                 </p>
//               </div>
//             </div>

//             {/* View All Categories Card - Always visible */}
//             <div
//               onClick={() => onCategoryClick("all")}
//               className="group relative rounded-3xl overflow-hidden shadow-xs cursor-pointer block select-none border border-primary/10 hover:border-primary/30 transition-all"
//             >
//               <div className="absolute inset-0 bg-secondary-container/20 flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-secondary-container/40">
//                 <Grid className="w-8 h-8 text-secondary mb-2" />
//                 <h3 className="text-xs sm:text-sm font-semibold font-serif text-on-surface">
//                   View All Categories
//                 </h3>
//                 {!loading && !error && (
//                   <p className="text-[10px] text-on-surface-variant mt-1">
//                     {categories.length} categories
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   },
// );

// CuratedCollections.displayName = "CuratedCollections";

// export default CuratedCollections;




import { forwardRef, useMemo } from "react";
import { Grid, ArrowRight } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { CategoryFilter } from "../../types";
import { CuratedCollectionsSkeleton } from "./CuratedCollectionsSkeleton";

interface CuratedCollectionsProps {
  onCategoryClick: (category: CategoryFilter) => void;
}

const CuratedCollections = forwardRef<HTMLDivElement, CuratedCollectionsProps>(
  ({ onCategoryClick }, ref) => {
    const { categories, loading, error } = useCategories();

    // Get first 3 categories for display
    const displayCategories = useMemo(() => {
      return categories.slice(0, 3).map((category, index) => ({
        ...category,
        image: category.image || "", // Use image from Firebase or empty
        isLarge: index === 0,
        extraCopy: index === 0 ? "Explore garments" : undefined,
      }));
    }, [categories]);

    // Show skeleton while loading
    if (loading) {
      return <CuratedCollectionsSkeleton />;
    }

    // Show error state
    if (error) {
      return (
        <section ref={ref} className="py-20 px-4 md:px-16 bg-surface-container-low">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <p className="text-red-600 font-medium">Failed to load categories</p>
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        id="curated-collections"
        className="py-20 px-4 md:px-16 bg-surface-container-low transition-all"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-widest font-bold text-primary">
              SHOP BY THEME
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mt-2 mb-4">
              Curated Collections
            </h2>
            <p className="text-sm md:text-md text-on-surface-variant max-w-md mx-auto">
              Find exactly what you need for every milestone. Organic,
              non-toxic, and hand-selected items.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {displayCategories.length === 0 ? (
              <div className="col-span-2 md:col-span-4 text-center py-12">
                <p className="text-on-surface-variant">No categories available</p>
              </div>
            ) : (
              displayCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => onCategoryClick(category.value)}
                  className={`group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none transition-all hover:shadow-lg ${
                    category.isLarge ? "col-span-2 row-span-2 h-full" : ""
                  }`}
                >
                  {category.image ? (
                    <img
                      alt={category.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      src={category.image}
                      onError={(e) => {
                        // Hide image on error and show fallback
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl';
                          fallback.textContent = '🧸';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
                      🧸
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-inverse-surface/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl md:text-3xl font-serif text-white font-black text-on-primary">
                      {category.label}
                    </h3>
                    {category.extraCopy && (
                      <span className="text-xs text-primary-fixed-dim font-bold flex items-center group-hover:text-on-primary transition-colors mt-2">
                        {category.extraCopy}
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* WhatsApp Channel Card */}
            <div
              onClick={() =>
                window.open(
                  "https://whatsapp.com/channel/0029VbDWjLXAO7RN0fAEt91F",
                  "_blank",
                )
              }
              className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer block select-none"
            >
              <img
                alt="Join our WhatsApp Channel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-95"
                src="/babyset/more.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-md sm:text-lg font-serif font-bold text-white">
                  More Collections
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Latest arrivals & offers
                </p>
              </div>
            </div>

            {/* View All Categories Card */}
            <div
              onClick={() => onCategoryClick("all")}
              className="group relative rounded-3xl overflow-hidden shadow-xs cursor-pointer block select-none border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="absolute inset-0 bg-secondary-container/20 flex flex-col items-center justify-center text-center p-4 transition-all group-hover:bg-secondary-container/40">
                <Grid className="w-8 h-8 text-secondary mb-2" />
                <h3 className="text-xs sm:text-sm font-semibold font-serif text-on-surface">
                  View All Categories
                </h3>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  {categories.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

CuratedCollections.displayName = "CuratedCollections";

export default CuratedCollections;