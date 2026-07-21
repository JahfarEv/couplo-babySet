// import { HeartHandshake, ArrowRight } from "lucide-react";
// import { motion } from "motion/react";

// interface HeroBannerProps {
//   onShopCollection: () => void;
//   onExploreCategories: () => void;
// }

// export default function HeroBanner({ onShopCollection, onExploreCategories }: HeroBannerProps) {
//   return (
//     <section
//       id="hero-banner"
//       className="relative min-h-[500px] md:min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-16 py-16"
//     >
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/baby.jpg"
//           alt="Cozy baby nursery with soft organic clothing and toys"
//           className="w-full h-full object-cover object-center"
//         />
//         <div className="absolute" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:justify-start">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 lg:w-2/5 space-y-6 text-center md:text-left bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-primary/10"
//         >
//           <div className="inline-flex items-center gap-2 bg-primary/15 px-4 py-1.5 rounded-full">
//             <HeartHandshake className="w-4 h-4 text-primary" />
//             <span className="text-[11px] tracking-widest uppercase font-bold text-primary">
//               PREMIUM BABY COLLECTION
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
//             Everything Your
//             <br />
//             Little One Needs
//           </h1>

//           <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
//             Discover adorable organic baby clothing, modern accessories,
//             safe wooden toys, and nursery essentials designed with premium
//             care, comfort, and sustainable values.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
//             <button
//               onClick={onShopCollection}
//               className="group bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
//             >
//               Shop Collection
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>

//             <button
//               onClick={onExploreCategories}
//               className="bg-transparent border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
//             >
//               Explore Categories
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




import { Sparkles, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroBannerProps {
  onShopCollection: () => void;
  onExploreCategories: () => void;
}

const CLOTHING_ITEMS = ["Onesies", "Rompers", "Dungarees", "Frocks", "Kurtas", "T-Shirts"];

export default function HeroBanner({ onShopCollection, onExploreCategories }: HeroBannerProps) {
  return (
    <section
      id="hero-banner"
      className="relative min-h-[500px] md:min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-16 py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/baby.jpg"
          alt="Adorable baby wearing a customised occasion outfit"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:justify-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 lg:w-[42%] space-y-5 text-center md:text-left bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-primary/10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/12 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Customised &amp; Non-Customised
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Occasion Outfits
            <br />
            <span className="text-primary">Made for Your</span>
            <br />
            Little Star
          </h1>

          {/* Sub-copy */}
          <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
            From first birthdays to festive celebrations — shop or personalise
            adorable baby outfits for every special moment.
          </p>

          {/* Clothing type pill row */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CLOTHING_ITEMS.map((item) => (
              <span
                key={item}
                className="text-[11px] font-semibold bg-primary/8 text-primary border border-primary/15 px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Trust line */}
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              Loved by 500+ happy families
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-1">
            <button
              onClick={onShopCollection}
              className="group bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCategories}
              className="bg-transparent border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Customise Yours →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}