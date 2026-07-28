import { Instagram, Phone } from "lucide-react";
import { Category, CategoryFilter } from "../../types";

interface FooterProps {
  onCategoryClick: (category: CategoryFilter) => void;
  categories: Category[];
  categoriesLoading?: boolean;
}

export default function Footer({
  onCategoryClick,
  categories,
  categoriesLoading = false,
}: FooterProps) {
  const scrollToOrderDelivery = () => {
    document.getElementById("order-delivery")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReturnClaim = () => {
    document.getElementById("returns-claims")?.scrollIntoView({ behavior: "smooth" });
  };

  const footerCategories = categories.filter((category) => category.value !== "all");

  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-surface-container-low via-white to-secondary-container/70 w-full rounded-t-[2rem] border-t border-primary/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 pt-20 pb-12 max-w-7xl mx-auto text-center md:text-left">
        <div className="space-y-4">
          <a href="#" className="inline-flex justify-center md:justify-start">
            <img
              src="/fav1.PNG"
              alt="Couplo Baby Sets"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </a>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-xs">
            Cute, breathable baby outfits and gift-ready essentials made for
            tiny cuddles, milestone photos, and everyday comfort.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Shop Categories
          </h4>
          <ul className="space-y-3 text-xs md:text-sm">
            <li>
              <button
                onClick={() => onCategoryClick("all")}
                className="text-on-surface-variant hover:text-primary transition-colors text-left"
              >
                All Items
              </button>
            </li>
            {categoriesLoading
              ? [1, 2, 3].map((item) => (
                  <li key={item}>
                    <div className="h-4 w-28 bg-primary-container rounded-full animate-pulse" />
                  </li>
                ))
              : footerCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => onCategoryClick(category.value)}
                      className="text-on-surface-variant hover:text-primary transition-colors text-left"
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Help &amp; Info
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-on-surface-variant">
            <li>
              <button
                onClick={scrollToOrderDelivery}
                className="hover:text-primary transition-colors hover:underline text-left"
              >
                Shipping &amp; Delivery Policies
              </button>
            </li>
            <li>
              <button
                onClick={scrollToReturnClaim}
                className="hover:text-primary transition-colors hover:underline text-left"
              >
                Returns &amp; Claims
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
            Connect With Us
          </h4>
          <div className="flex justify-center md:justify-start space-x-3">
            <a
              href="https://www.instagram.com/couplo.babyset?igsh=MWNuejNwdGxmaDJqbA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-primary-container text-primary border border-primary/10 flex items-center justify-center transition-all shadow-sm"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="tel:+918590288151"
              className="w-10 h-10 rounded-full bg-white hover:bg-primary-container text-primary border border-primary/10 flex items-center justify-center transition-all shadow-sm"
              title="Call +91 8590288151"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-1 text-xs md:text-sm text-on-surface-variant">
            <a
              href="tel:+918590288151"
              className="block hover:text-primary transition-colors"
            >
              +91 8590288151
            </a>
            <a
              href="tel:+918089670175"
              className="block hover:text-primary transition-colors"
            >
              +91 8089670175
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-8 text-center space-y-2">
        <p className="text-[11px] text-outline">
          {"\u00a9"} 2026 Couplo Baby Sets. Designed for pristine comfort. All
          rights reserved.
        </p>

        <p className="text-[11px] text-outline">
          Developed by{" "}
          <a
            href="https://jahfar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            jahfar.online
          </a>
        </p>
      </div>
    </footer>
  );
}
