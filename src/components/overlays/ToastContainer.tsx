// import { Check, X } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Toast } from "../../hooks/useToast";

// interface ToastContainerProps {
//   toasts: Toast[];
//   onDismiss: (id: string) => void;
// }

// export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
//   return (
//     <div
//       id="toast-container"
//       className="fixed bottom-6 right-6 z-99 flex flex-col gap-2 max-w-sm w-full"
//     >
//       <AnimatePresence>
//         {toasts.map((t) => (
//           <motion.div
//             key={t.id}
//             initial={{ transform: "translateY(50px)", opacity: 0 }}
//             animate={{ transform: "translateY(0)", opacity: 1 }}
//             exit={{ transform: "translateY(-20px)", opacity: 0 }}
//             className={`p-4 rounded-xl shadow-xl flex items-center justify-between border ${t.type === "info" ? "bg-secondary-container text-on-secondary-container border-secondary-fixed" : "bg-primary text-on-primary border-primary"}`}
//           >
//             <div className="flex items-center gap-2">
//               <Check className="w-4 h-4 rounded-full bg-white/20 p-0.5 text-current" />
//               <span className="text-xs font-semibold">{t.message}</span>
//             </div>
//             <button
//               onClick={() => onDismiss(t.id)}
//               className="text-current hover:opacity-75 p-0.5"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }


import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toast } from "../../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      id="toast-container"
      className="fixed top-6 right-6 z-99 flex flex-col gap-2 max-w-sm w-full"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ transform: "translateY(-50px)", opacity: 0 }}
            animate={{ transform: "translateY(0)", opacity: 1 }}
            exit={{ transform: "translateY(-20px)", opacity: 0 }}
            className={`p-4 rounded-xl shadow-xl flex items-center justify-between border ${t.type === "info" ? "bg-secondary-container text-on-secondary-container border-secondary-fixed" : "bg-primary text-on-primary border-primary"}`}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 rounded-full bg-white/20 p-0.5 text-current" />
              <span className="text-xs font-semibold">{t.message}</span>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="text-current hover:opacity-75 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}