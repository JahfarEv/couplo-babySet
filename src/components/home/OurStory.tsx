import { ClipboardCheck, MessageCircle, PackageCheck, Truck } from "lucide-react";

const deliverySteps = [
  {
    title: "Choose Your Set",
    description: "Pick the baby outfit, size, color, and any custom name details you want.",
    icon: ClipboardCheck,
  },
  {
    title: "Place Order",
    description: "Send your order through WhatsApp and our team confirms the details with you.",
    icon: MessageCircle,
  },
  {
    title: "Verify Design",
    description: "Before packing, we share the product and design details on WhatsApp for your confirmation.",
    icon: ClipboardCheck,
  },
  {
    title: "Pack With Care",
    description: "Your item is checked, folded, and packed neatly for a gift-ready delivery.",
    icon: PackageCheck,
  },
  {
    title: "Delivered Home",
    description: "We share delivery updates so the parcel reaches your doorstep smoothly.",
    icon: Truck,
  },
];

export default function OurStory() {
  return (
    <section
      id="order-delivery"
      className="py-24 px-4 md:px-16 bg-surface-container-low border-t border-primary/10"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-5">
          <span className="inline-flex text-[11px] uppercase tracking-widest font-bold text-primary bg-white px-4 py-2 rounded-full border border-primary/10 shadow-sm">
            Order Procedure
          </span>
          <h2 className="text-3xl font-serif font-black text-on-surface">
            From Order to Delivery
          </h2>
          <p className="text-sm md:text-md text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            A simple, friendly process so you always know what happens after
            choosing your favorite baby set.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {deliverySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl p-6 border border-primary/10 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center">
                    <Icon size={22} strokeWidth={2.2} />
                  </span>
                  <span className="font-serif text-3xl font-black text-primary/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
