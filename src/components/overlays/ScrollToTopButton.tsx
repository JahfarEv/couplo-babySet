import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ScrollToTopButtonProps {
  visible: boolean;
}

export default function ScrollToTopButton({ visible }: ScrollToTopButtonProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 bg-surface-container-lowest border border-primary/15 text-primary p-3 rounded-full shadow-xl hover:bg-primary-container hover:scale-105 active:scale-95 transition-all"
          title="Scroll to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
