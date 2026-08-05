import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Star, Heart, Baby, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Banner, bannerService } from "../../services/bannerService";

interface HeroBannerProps {
  onShopCollection: () => void;
  onExploreCategories: () => void;
}

const CLOTHING_ITEMS = ["Onesies", "Rompers", "Frocks", "Kurtas", "Tiny Tees", "Gift Sets"];
const FALLBACK_IMAGE = "/baby.jpg";
const SLIDE_INTERVAL_MS = 4500;

export default function HeroBanner({ onShopCollection, onExploreCategories }: HeroBannerProps) {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "fallback",
      imageUrl: FALLBACK_IMAGE,
      alt: "Adorable baby wearing a customised occasion outfit",
    },
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let mounted = true;

    bannerService.getBanners().then((loadedBanners) => {
      if (!mounted || !loadedBanners.length) return;

      setBanners(loadedBanners);
      setActiveSlide(0);
    }).catch(() => {
      if (mounted) setActiveSlide(0);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [banners.length]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + banners.length) % banners.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % banners.length);
  };

  return (
    <section
      id="hero-banner"
      className="relative min-h-[540px] md:min-h-[819px] flex items-center justify-center overflow-hidden px-4 md:px-16 py-16"
    >
      <div className="absolute inset-0 z-0">
        {banners.map((banner, index) => (
          <img
            key={banner.id}
            src={banner.imageUrl}
            alt={banner.alt || banner.title || "Couplo Baby Sets banner"}
            aria-hidden={index !== activeSlide}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
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
              Baby Soft Personalised Outfits
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
  Premium personalised outfits for babies and kids, beautifully crafted for
  every special ceremony, celebration, and precious family moment.
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
              Loved by 5000+ happy families
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

      {banners.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-4 px-4">
          <button
            type="button"
            onClick={showPreviousSlide}
            aria-label="Previous banner"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/86 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-lg backdrop-blur">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show banner ${index + 1}`}
                aria-current={index === activeSlide}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeSlide ? "w-7 bg-primary" : "w-2.5 bg-gray-300 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={showNextSlide}
            aria-label="Next banner"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/86 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
