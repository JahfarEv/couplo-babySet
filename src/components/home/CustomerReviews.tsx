import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  caption: string;
  review: string;
  productName: string;
  productImage: string;
  date: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    avatar: "SM",
    rating: 5,
    caption: "Absolutely in love with this set!",
    review:
      "The quality of the fabric is just incredible — so soft against my baby's skin. We've had zero rashes and she looks adorable in it. Worth every penny and then some!",
    productName: "Organic Ribbed Onesie",
    productImage: "/babyset/frok1.jpeg",
    date: "June 20, 2026",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "London, UK",
    avatar: "PS",
    rating: 5,
    caption: "The perfect baby shower gift!",
    review:
      "I ordered the Sweet Dreams Knit Gift Set for my sister's baby shower and everyone was blown away. The packaging was stunning and the quality felt so luxurious. Definitely ordering again!",
    productName: "Sweet Dreams Knit Gift Set",
    productImage: "/babyset/set14.jpeg",
    date: "June 15, 2026",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Torres",
    location: "Sydney, Australia",
    avatar: "ET",
    rating: 5,
    caption: "Softest romper we've ever tried!",
    review:
      "My 3-month-old practically melted into this romper — it's so breathable and light. The linen-cotton blend is perfect for warm days. The coconut shell buttons are such a thoughtful touch.",
    productName: "Linen Blend Knit Romper",
    productImage: "/babyset/fullRomber1.jpeg",
    date: "June 5, 2026",
    verified: true,
  },
  {
    id: 4,
    name: "Amara Osei",
    location: "Toronto, Canada",
    avatar: "AO",
    rating: 4,
    caption: "Beautiful prints, great quality!",
    review:
      "The Earth Tones Swaddle Set is exactly what I was looking for. The muslin material gets softer with each wash. My baby loves being wrapped up in it. Highly recommend for new parents!",
    productName: "Earth Tones Swaddle Set",
    productImage: "/babyset/Half romper1.jpeg",
    date: "May 28, 2026",
    verified: true,
  },
  {
    id: 5,
    name: "Liu Wei",
    location: "Singapore",
    avatar: "LW",
    rating: 5,
    caption: "Fast shipping and gorgeous packaging!",
    review:
      "I was amazed at how quickly my order arrived. The packaging was so elegant — felt like opening a luxury gift. The Knit Gift Set is now my go-to recommendation for every new parent I know.",
    productName: "Linen Blend Knit Romper",
    productImage: "/babyset/set19.jpeg",
    date: "May 20, 2026",
    verified: true,
  },
  {
    id: 6,
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    avatar: "FA",
    rating: 5,
    caption: "My baby's skin has never been happier!",
    review:
      "We have very sensitive skin in our family and I was hesitant to try a new brand. But Couplo Baby Sets exceeded all expectations. Zero irritation, silky soft, and the colors are gorgeous. A loyal customer now!",
    productName: "Linen Blend Knit Romper",
    productImage: "/babyset/set1.jpeg",
    date: "May 10, 2026",
    verified: true,
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  return (
    <div
      className={`
        flex-shrink-0 w-full transition-all duration-500
        ${active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute inset-0"}
      `}
    >
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(113,88,91,0.12)] overflow-hidden max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-2/5 relative overflow-hidden bg-surface-container-low">
            <img
              src={review.productImage}
              alt={review.productName}
              className="w-full h-64 md:h-full object-cover"
            />
            {/* Overlay label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-white text-xs font-semibold tracking-wide uppercase opacity-90">
                {review.productName}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
            {/* Quote icon */}
            <div>
              <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary fill-primary/30" />
              </div>

              {/* Star Rating */}
              <StarRating rating={review.rating} size={18} />

              {/* Caption */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-on-surface mt-3 mb-4 leading-snug">
                "{review.caption}"
              </h3>

              {/* Review Text */}
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-4">
                {review.review}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-outline-variant">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-on-surface text-sm">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {review.location} · {review.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReviews = REVIEWS.length;

  const goNext = () => setActiveIndex((i) => (i + 1) % totalReviews);
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + totalReviews) % totalReviews);

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(goNext, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, activeIndex]);

  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  const avgRating = (
    REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length
  ).toFixed(1);
  const totalRatings = 654;

  return (
    <section
      id="customer-reviews"
      className="py-24 px-4 md:px-16 bg-surface-container-low relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(113,88,91,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(75,98,108,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Happy Families
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface mb-4">
            What Our Customers Say
          </h2>
          <p className="text-on-surface-variant text-sm max-w-lg mx-auto leading-relaxed">
            Trusted by thousands of parents worldwide. Every stitch crafted with
            love, every review earned with care.
          </p>

          {/* Aggregate Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-sm px-6 py-4 mt-8 border border-outline-variant/40">
            <span className="text-4xl font-serif font-bold text-primary">
              {avgRating}
            </span>
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={5} size={16} />
              <span className="text-xs text-on-surface-variant">
                Based on {totalRatings.toLocaleString()}+ reviews
              </span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Cards */}
          <div className="relative min-h-[380px] md:min-h-[340px]">
            {REVIEWS.map((review, i) => (
              <div
                key={review.id}
                className={`transition-all duration-500 ${
                  i === activeIndex ? "relative" : "absolute inset-0"
                }`}
                style={{ zIndex: i === activeIndex ? 1 : 0 }}
              >
                <ReviewCard review={review} active={i === activeIndex} />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              id="reviews-prev-btn"
              onClick={() => {
                pauseAutoplay();
                goPrev();
              }}
              className="w-11 h-11 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  id={`reviews-dot-${i}`}
                  onClick={() => {
                    pauseAutoplay();
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-outline-variant hover:bg-primary/50"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              id="reviews-next-btn"
              onClick={() => {
                pauseAutoplay();
                goNext();
              }}
              className="w-11 h-11 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini Thumbnail Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-14">
          {REVIEWS.map((review, i) => (
            <button
              key={review.id}
              id={`review-thumb-${review.id}`}
              onClick={() => {
                pauseAutoplay();
                setActiveIndex(i);
              }}
              className={`group relative rounded-2xl overflow-hidden aspect-square transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "ring-2 ring-primary ring-offset-2 shadow-lg scale-105"
                  : "ring-1 ring-outline-variant/30 opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              aria-label={`View ${review.name}'s review`}
            >
              <img
                src={review.productImage}
                alt={review.productName}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-200 ${
                  i === activeIndex
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <span className="text-white text-[9px] font-semibold leading-tight truncate">
                  {review.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
