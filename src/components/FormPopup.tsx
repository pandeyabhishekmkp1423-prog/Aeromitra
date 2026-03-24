import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupForm from "./PopupForm";
import { WebinarType } from "../types";

interface Props {
  activeWebinar: WebinarType;
}

export default function FormPopup({ activeWebinar }: Props) {
  const [open, setOpen] = useState(false);

  // ⏱ Auto open after 1.5 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 🔒 Prevent scroll when popup open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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
          {/* CLICK OUTSIDE CLOSE */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          {/* POPUP BOX */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition"
            >
              ✕
            </button>

            {/* FORM CONTAINER */}
            <div className="bg-[#0B0F1A]/95 border border-[#CFAF57]/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <PopupForm activeWebinar={activeWebinar} />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}