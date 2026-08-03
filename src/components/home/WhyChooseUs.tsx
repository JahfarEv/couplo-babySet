import { HeartHandshake, Truck, ShieldCheck, MessageCircleHeart } from "lucide-react";

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "Baby-Soft Feel",
    description: "Gentle textiles chosen for delicate little skin.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick dispatch with careful, gift-ready packing.",
  },
  {
    icon: ShieldCheck,
    title: "Hygiene Checked",
    description: "Every outfit is checked and packed with clean, baby-safe care.",
  },
  {
    icon: MessageCircleHeart,
    title: "Sweet Support",
    description: "Order and personalise easily through WhatsApp.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 px-4 md:px-16 bg-gradient-to-r from-primary-container via-surface-container-lowest to-secondary-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-[1.4rem] flex items-center justify-center mb-4 text-primary shadow-[0_14px_30px_rgba(216,111,146,0.14)] hover:scale-105 transition-transform rotate-3">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-sm font-bold text-primary font-serif uppercase tracking-wider mb-1">
                {title}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
