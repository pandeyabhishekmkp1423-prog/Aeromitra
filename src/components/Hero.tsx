import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft, ChevronRight as NextIcon, Plane } from 'lucide-react';
import { WebinarData } from '../types';
import { useState } from 'react';

interface HeroProps {
  data: WebinarData;
}

export default function Hero({ data }: HeroProps) {
  const [index, setIndex] = useState(0);

  const mentors = data.mentors || [];
  const current = mentors[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % mentors.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0A1333]">

      {/* ✈️ Background */}
      <div className="absolute inset-0">
        <img
          src={
            data.id === 'pilot'
              ? "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=2000"
              : "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000"
          }
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1333] via-[#0A1333]/90 to-[#0A1333]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#E5C76B] text-xs font-bold mb-6">
            <Plane size={14} />
            EXCLUSIVE LIVE MASTERCLASS
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            {data.title}
          </h1>

          <p className="text-lg text-white/70 mb-10 max-w-xl">
            {data.subtitle}
          </p>

          {/* Info */}
          <div className="flex gap-6 mb-10 text-white/70">
            <div className="flex items-center gap-2"><Calendar size={16} /> {data.date}</div>
            <div className="flex items-center gap-2"><Clock size={16} /> {data.time}</div>
            <div className="flex items-center gap-2"><MapPin size={16} /> {data.location}</div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="#registration"
              className="bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] px-8 py-4 rounded-xl font-bold flex items-center gap-2"
            >
              Book Seat ₹{data.id === 'pilot' ? 149 : 99}
              <ChevronRight />
            </a>

            <a
              href="#discover"
              className="border border-white/20 px-8 py-4 rounded-xl text-white"
            >
              View Agenda
            </a>
          </div>
        </div>

        {/* RIGHT — BIG HERO CARD */}
        <div className="relative">

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-full hover:bg-white/20"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-full hover:bg-white/20"
          >
            <NextIcon />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -40 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)]"
            >
              <img
                src={current?.image}
                className="w-full h-[800px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1333] via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-8">
                <div className="inline-block px-4 py-1 rounded-full bg-[#CFAF57]/20 border border-[#CFAF57]/30 text-[#F4D77A] text-xs font-bold mb-4">
                  MASTERCLASS MENTOR
                </div>

                <h3 className="text-3xl font-bold text-white">
                  {current?.name}
                </h3>

                <p className="text-white/70 mt-2">
                  {current?.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}