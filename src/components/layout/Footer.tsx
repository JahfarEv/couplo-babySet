import { Instagram, Mail } from "lucide-react";
import { CategoryFilter } from "../../types";

interface FooterProps {
  onCategoryClick: (category: CategoryFilter) => void;
  onShowToast: (message: string, type?: "success" | "info") => void;
}

export default function Footer({ onCategoryClick, onShowToast }: FooterProps) {
  return (
    <footer
      id="footer"
      className="bg-surface-container-low w-full rounded-t-3xl border-t border-primary/10"
    >
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 py-20 max-w-7xl mx-auto text-center md:text-left">        <div className="space-y-4">
          <a href="#" className="text-2xl font-serif font-bold text-primary block">
            Couplo Baby Sets
          </a>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-xs">
            Nurturing elegance for your little ones. Premium breathable
            organic garments, essentials, nursery wooden playthings, and
            lovely gift boxes curated with extreme care.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Shop Categories
          </h4>
          <ul className="space-y-3 text-xs md:text-sm">
            <li>
              <button
                onClick={() => onCategoryClick("babyset")}
                className="text-on-surface-variant hover:text-primary transition-colors text-left"
              >
                Newborn Clothing
              </button>
            </li>
            <li>
              <button
                onClick={() => onCategoryClick("accessories")}
                className="text-on-surface-variant hover:text-primary transition-colors text-left"
              >
                Wood Toys &amp; Learning
              </button>
            </li>
            <li>
              <button
                onClick={() => onCategoryClick("tshirt")}
                className="text-on-surface-variant hover:text-primary transition-colors text-left"
              >
                Silicone Feeding Sets
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => onCategoryClick("gifts")}
                className="text-on-surface-variant hover:text-primary transition-colors text-left"
              >
                Baby Gift Hampers
              </button>
            </li> */}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Help &amp; Info
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-on-surface-variant">
            <li>
              <a href="#our-story" className="hover:text-primary transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <button
                onClick={() =>
                  onShowToast("Shipping policy is 100% free above orders of ₹999.", "info")
                }
                className="hover:text-primary transition-colors hover:underline text-left"
              >
                Shipping &amp; Delivery Policies
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  onShowToast(
                    "Contact us anytime at contact@couplobaby.com or WhatsApp.",
                    "info",
                  )
                }
                className="hover:text-primary transition-colors hover:underline text-left"
              >
                Support Contact Details
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowToast("100% safe checkout protocol guarantees.", "info")}
                className="hover:text-primary transition-colors hover:underline text-left"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
            Connect With Us
          </h4>
<div className="flex justify-center md:justify-start space-x-3">            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onShowToast("Follow us @CouploBabySets for daily updates!");
              }}
              className="w-10 h-10 rounded-full bg-surface hover:bg-gray-200 hover:text-on-primary text-primary border border-primary/10 flex items-center justify-center transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@couplobaby.com"
              onClick={(e) => {
                e.preventDefault();
                onShowToast("Email us at hello@couplobaby.com");
              }}
              className="w-10 h-10 rounded-full bg-surface hover:bg-gray-200 hover:text-on-primary text-primary border border-primary/10 flex items-center justify-center transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
         <div className="pt-4 space-y-2">
  <p className="text-[11px] text-outline">
    © 2026 Couplo Baby Sets. Designed for pristine comfort. All rights
    reserved.
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
        </div>
      </div>
    </footer>
  );
}
