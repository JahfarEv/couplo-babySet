import { CheckCircle, MessageCircle, PackageCheck } from "lucide-react";

const claimChecklist = [
  "Share order ID",
  "Attach unboxing video",
  "Wait for confirmation",
];

export default function ReturnClaims() {
  const openReturnClaim = () => {
    const message = [
      "Hi Couplo Baby Sets, I would like to submit a return or claim request.",
      "",
      "Order ID:",
      "Issue:",
      "I will share the uncut unboxing video here.",
    ].join("\n");

    window.open(`https://wa.me/919539794665?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section
      id="returns-claims"
      className="py-20 px-4 md:px-16 bg-surface-container-lowest border-t border-primary/10"
      aria-labelledby="returns-claims-heading"
    >
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch bg-white/80 border border-primary/10 rounded-2xl p-6 md:p-8 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-primary bg-primary-container/70 px-4 py-2 rounded-full">
            <PackageCheck className="w-3.5 h-3.5" />
            Returns &amp; Claims
          </span>
          <h3
            id="returns-claims-heading"
            className="mt-4 text-2xl font-serif font-black text-on-surface"
          >
            Need help after delivery?
          </h3>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed max-w-2xl">
            If your parcel arrives damaged, has a wrong item, or has a stitching
            or design issue, send us a claim request within 24 hours of delivery.
            Please keep the original packing, product tags, and an uncut unboxing
            video ready for faster support.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {claimChecklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs font-semibold text-on-surface bg-surface-container-low rounded-xl px-3 py-3"
              >
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-5 md:p-6 border border-primary/10">
          <h4 className="text-sm font-bold text-on-surface mb-4">
            Claim Procedure
          </h4>
          <ol className="space-y-4 text-sm text-on-surface-variant">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>Click the WhatsApp claim button below.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>Send your order ID, issue details, and uncut unboxing video.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <span>Our team checks the request and confirms the next step.</span>
            </li>
          </ol>

          <button
            onClick={openReturnClaim}
            className="mt-6 w-full bg-[#25D366] text-white py-3.5 px-4 rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Start Return or Claim
          </button>
        </div>
      </div>
    </section>
  );
}
