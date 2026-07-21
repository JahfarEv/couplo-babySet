import { CheckCircle, Truck, ShieldCheck, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Premium Quality",
    description: "Carefully selected organic textiles & safe materials.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick dispatch and safety-insured parcel routing.",
  },
  {
    icon: ShieldCheck,
    title: "100% Safe",
    description: "Non-toxic colors, certified GOTS and baby-ready.",
  },
  {
    icon: Headphones,
    title: "Easy Support",
    description: "Order directly via our continuous 24/7 WhatsApp line.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 px-4 md:px-16 bg-surface-container-high">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-4 text-primary shadow-[0_10px_20px_rgba(113,88,91,0.05)] hover:scale-105 transition-transform">
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
