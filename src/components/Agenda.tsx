import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2, Plane } from 'lucide-react';
import { WebinarData } from '../types';
import { useRef } from 'react';

interface AgendaProps {
  data: WebinarData;
}

export default function Agenda({ data }: AgendaProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Line grows as user scrolls
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Plane moves along path
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="agenda" className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A1333] mb-6">
            The <span className="text-[#CFAF57]">Flight Plan</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A strategically designed session to guide your aviation journey step-by-step.
          </p>
        </div>

        <div className="relative">

          {/* ✈️ FLIGHT PATH LINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#CFAF57]/10 -translate-x-1/2 hidden md:block">

            {/* Animated Progress Line */}
            <motion.div
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-[#CFAF57] to-[#F4D77A]"
            />

          </div>

          {/* ✈️ MOVING AIRPLANE */}
          <motion.div
            style={{ top: planeY }}
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex z-20"
          >
            <div className="w-10 h-10 bg-[#CFAF57] rounded-full flex items-center justify-center shadow-lg">
              <Plane className="text-[#0A1333]" size={18} />
            </div>
          </motion.div>

          <div className="space-y-20">

            {data.agenda.map((item, i) => {
              const isGold = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row gap-10 items-center ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >

                  {/* Card */}
                  <div className="flex-1 w-full">
                    <motion.div
                      whileHover={{ y: -12, scale: 1.03 }}
                      className={`p-8 rounded-3xl border transition-all duration-300 ${
                        isGold
                          ? 'bg-gradient-to-br from-[#CFAF57] to-[#F4D77A] text-[#0A1333] shadow-[0_25px_70px_rgba(207,175,87,0.4)]'
                          : 'bg-[#0A1333] text-white border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.5)]'
                      } ${
                        i % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                      }`}
                    >

                      {/* Header */}
                      <div className="flex items-center gap-4 mb-5">
                        <span className={`px-4 py-1 rounded-lg text-xs font-bold ${
                          isGold
                            ? 'bg-[#0A1333] text-white'
                            : 'bg-[#CFAF57] text-[#0A1333]'
                        }`}>
                          {item.time}
                        </span>

                        <h3 className="text-xl font-bold">
                          {item.title}
                        </h3>
                      </div>

                      {/* Points */}
                      <ul className="space-y-3">
                        {item.points.map((p, pi) => (
                          <li
                            key={pi}
                            className={`flex items-start gap-3 text-sm ${
                              isGold ? 'text-[#0A1333]/80' : 'text-white/80'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-5 h-5 mt-0.5 ${
                                isGold ? 'text-[#0A1333]' : 'text-[#CFAF57]'
                              }`}
                            />
                            {p}
                          </li>
                        ))}
                      </ul>

                    </motion.div>
                  </div>

                  {/* ✨ CHECKPOINT DOT */}
                  <div className="hidden md:flex items-center justify-center relative w-10 h-10 z-10">
                    <div className="w-4 h-4 bg-[#CFAF57] rounded-full"></div>

                    {/* Pulse */}
                    <div className="absolute w-6 h-6 bg-[#CFAF57]/30 rounded-full animate-ping"></div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>

                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}