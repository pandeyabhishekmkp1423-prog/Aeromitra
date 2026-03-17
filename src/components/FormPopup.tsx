import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RegistrationForm from './RegistrationForm';
import { WebinarType } from '../types';

interface Props {
  activeWebinar: WebinarType;
}

export default function FormPopup({ activeWebinar }: Props) {
  const [open, setOpen] = useState(false);

  // ⏱ show after 1 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >

          {/* CLOSE CLICK OUTSIDE */}
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          {/* POPUP CONTENT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full"
            >
              ✕
            </button>

            {/* ⚠️ YOUR SAME FORM (UNCHANGED) */}
            <RegistrationForm activeWebinar={activeWebinar} />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}