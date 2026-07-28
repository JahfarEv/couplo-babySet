import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Star, Heart, Baby } from "lucide-react";
import { motion } from "motion/react";
import { bannerService } from "../../services/bannerService";

interface HeroBannerProps {
  onShopCollection: () => void;
  onExploreCategories: () => void;
}

const CLOTHING_ITEMS = ["Onesies", "Rompers", "Frocks", "Kurtas", "Tiny Tees", "Gift Sets"];
const FALLBACK_IMAGE = "/baby.jpg";

export default function HeroBanner({ onShopCollection, onExploreCategories }: HeroBannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string>(FALLBACK_IMAGE);
  const [bannerAlt, setBannerAlt] = useState<string>("Adorable baby wearing a customised occasion outfit");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    bannerService.getPrimaryBanner().then((banner) => {
      if (!mounted || !banner) return;

      const img = new Image();
      img.onload = () => {
        if (!mounted) return;
        setBannerUrl(banner.imageUrl);
        setBannerAlt(banner.alt || bannerAlt);
        setImageLoaded(true);
      };
      img.onerror = () => {
        if (mounted) setImageLoaded(true);
      };
      img.src = banner.imageUrl;
    }).catch(() => {
      if (mounted) setImageLoaded(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="hero-banner"
      className="relative min-h-[540px] md:min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-16 py-16"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={FALLBACK_IMAGE}
          alt={bannerAlt}
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {bannerUrl !== FALLBACK_IMAGE && (
          <img
            src={bannerUrl}
            alt={bannerAlt}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/52 to-primary/10 md:from-white/82 md:via-white/36 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:justify-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 lg:w-[43%] space-y-5 text-center md:text-left bg-white/92 backdrop-blur-md p-6 md:p-10 rounded-[2rem] shadow-[0_30px_80px_rgba(216,111,146,0.18)] border border-white/80"
        >
          <div className="absolute -top-5 -right-4 hidden sm:flex h-14 w-14 rotate-6 items-center justify-center rounded-[1.4rem] bg-tertiary-container text-tertiary shadow-lg">
            <Heart className="h-7 w-7 fill-current" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden sm:flex h-12 w-12 -rotate-6 items-center justify-center rounded-full bg-secondary-container text-secondary shadow-lg">
            <Baby className="h-6 w-6" />
          </div>

          <div className="inline-flex items-center gap-2 bg-primary-container px-4 py-1.5 rounded-full border border-primary/10">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Baby Soft Custom Outfits
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Tiny Outfits
            <br />
            <span className="text-primary">Made for Your</span>
            <br />
            Little Love
          </h1>

          <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
            From first birthdays to festive celebrations, shop or personalise
            snuggle-soft baby outfits for every sweet little milestone.
          </p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CLOTHING_ITEMS.map((item) => (
              <span
                key={item}
                className="text-[11px] font-semibold bg-white text-primary border border-primary/15 px-3 py-1 rounded-full shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              Loved by 500+ happy families
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-1">
            <button
              onClick={onShopCollection}
              className="group bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCategories}
              className="bg-white border-2 border-primary/25 hover:border-primary text-primary hover:bg-primary-container px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Customise Yours
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
