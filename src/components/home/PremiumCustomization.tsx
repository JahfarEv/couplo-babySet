// components/home/PremiumCustomization.tsx
import { 
  Paintbrush, 
  Heart, 
  BadgeCheck, 
  Phone, 
  MapPin, 
  Sparkles, 
  Baby, 
  PenTool, 
  Palette, 
  Crown, 
  Calendar, 
  Sparkle,
  MessageCircleHeart,
  Truck,
  ShieldCheck,
  Star
} from "lucide-react";

const CUSTOMIZATION_OPTIONS = [
  { icon: Baby, label: "Baby Name Printing" },
  { icon: PenTool, label: "Custom Text & Quotes" },
  { icon: Palette, label: "Custom Colour Printing" },
  { icon: Paintbrush, label: "Custom Design Printing" },
  { icon: Crown, label: "Cradle Ceremony Themes" },
  { icon: Calendar, label: "Naming Ceremony Designs" },
  { icon: Sparkle, label: "Personalized Artwork & Graphics" },
];

const PARENT_LOVE_REASONS = [
  "100% Newborn Comfort",
  "Premium Interlock Fabric",
  "Soft & Gentle On Delicate Baby Skin",
  "Breathable & Comfortable For All-Day Wear",
  "Elegant Premium White Design",
  "High-Quality Printing & Premium Finishing",
  "Perfect For Cradle Ceremonies, Naming Ceremonies, Baptisms & Photoshoots",
];

export default function PremiumCustomization() {
  return (
    <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-surface via-surface-container-lowest to-surface">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-primary bg-primary-container/30 px-5 py-2 rounded-full border border-primary/10 mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Premium Customization</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          
          {/* <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-on-surface mb-4"
          >
            <span className="relative inline-block">
              Beautiful Decorative Bows
              <span className="absolute -top-6 -right-8 text-3xl animate-bounce">🎀</span>
            </span>
            <br />
            <span className="text-primary">For Your Baby's Special Moments</span>
          </motion.h2>
           */}
          {/* <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          >
            Make Your Baby's Outfit Even More Special And Elegant For Cradle Ceremonies, 
            Naming Ceremonies & Photoshoots.
          </motion.p> */}

          {/* Quick Badges */}
          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-6"
          >
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
              <Star className="w-3.5 h-3.5" />
              Premium Quality
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
              <Paintbrush className="w-3.5 h-3.5" />
              100% Customizable
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
              <Truck className="w-3.5 h-3.5" />
              All India Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#25D366]/10 text-[#25D366] px-3 py-1.5 rounded-full text-xs font-medium border border-[#25D366]/20">
              <Phone className="w-3.5 h-3.5" />
              Pre-Booking Available
            </span>
          </motion.div> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Customization Options */}
          <div
            className="bg-white rounded-3xl shadow-xl border border-primary/10 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Paintbrush className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-on-surface">100% Customizable Printing</h3>
                <p className="text-sm text-outline">Make it uniquely yours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZATION_OPTIONS.map((option) => (
                <div
                  key={option.label}
                  className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3 border border-outline-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-default"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <option.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-on-surface-variant text-center leading-relaxed">
                <span className="font-semibold text-primary">Every Romper Is Custom-Made</span> According To Your Requirements, 
                Making It Unique And Memorable For Your Baby's Special Occasion.
              </p>
            </div>
          </div>

          {/* Right Column - Why Parents Love */}
          <div
            className="bg-white rounded-3xl shadow-xl border border-primary/10 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#FFC107]/10 rounded-2xl">
                <Heart className="w-6 h-6 text-[#FFC107]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-on-surface">Why Parents Love Our Rompers</h3>
                <p className="text-sm text-outline">Made with love for your little one</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {PARENT_LOVE_REASONS.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3 border border-outline-variant/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-on-surface-variant">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Section */}
        <div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* WhatsApp CTA */}
          <div className="bg-gradient-to-br from-[#25D366]/10 to-white rounded-2xl shadow-xl border border-[#25D366]/20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-3 bg-[#25D366]/20 rounded-2xl flex-shrink-0">
                <MessageCircleHeart className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-on-surface text-sm mb-0.5">Order via WhatsApp</h4>
                <p className="text-xs text-on-surface-variant">
                  Share your baby's name and design details for a custom romper.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("featured-products")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="w-full sm:w-auto flex-shrink-0 bg-[#25D366] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#20bd5a] transition-colors"
            >
              Order Now
            </button>
          </div>

          {/* Features Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-4 text-center flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">🚚</div>
              <p className="text-xs font-medium text-on-surface">All India Delivery</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-4 text-center flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">📦</div>
              <p className="text-xs font-medium text-on-surface">Pre-Booking Only</p>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div
          className="mt-8 text-center bg-gradient-to-r from-primary/5 via-white to-secondary/5 rounded-2xl border border-primary/10 p-4 md:p-5"
        >
          <p className="text-sm md:text-base text-on-surface-variant font-medium flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span>✨</span>
            <span>Premium Quality</span>
            <span className="hidden sm:inline">•</span>
            <span>100% Customizable</span>
            <span className="hidden sm:inline">•</span>
            <span>All India Delivery</span>
            <span className="hidden sm:inline">•</span>
            <span>Pre-Booking Available</span>
            <span>👶🤍🎨🚚</span>
          </p>
        </div>
      </div>
    </section>
  );
}
