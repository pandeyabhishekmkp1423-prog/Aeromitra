import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupForm from "./PopupForm";
import { WebinarType } from "../types";

interface Props {
  activeWebinar: WebinarType;
}

export default function FormPopup({ activeWebinar }: Props) {
  const [open, setOpen] = useState(false);

  // ⏱ Auto open
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔒 Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
        >
          {/* BACKDROP */}
          <div className="absolute inset-0" onClick={() => setOpen(false)} />

          {/* POPUP */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md"
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              ✕
            </button>

            {/* FORM */}
            <div className="bg-[#0B0F1A]/95 border border-[#CFAF57]/20 rounded-2xl shadow-xl backdrop-blur-xl">
              <PopupForm activeWebinar={activeWebinar} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}