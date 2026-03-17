import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WebinarData } from '../types';
import { BackgroundGraphics } from './BackgroundGraphics';

interface FAQProps {
  data: WebinarData;
}

export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-white relative overflow-hidden">
      <BackgroundGraphics />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADING */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-[#0A1333] mb-6 tracking-tighter">
              Common <span className="text-[#CFAF57]">Queries</span>
            </h2>

            <p className="text-lg text-gray-600 font-medium">
              Everything you need to know about your aviation career path.
            </p>
          </motion.div>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {data.faq.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full text-left p-7 md:p-8 rounded-[28px] transition-all duration-300 border ${
                    openIndex === i 
                      ? 'bg-white border-[#CFAF57]/40 shadow-[0_20px_60px_rgba(207,175,87,0.15)]' 
                      : 'bg-white border-gray-200 hover:border-[#CFAF57]/40 hover:shadow-md'
                  }`}
                >

                  <div className="flex justify-between items-center gap-6">

                    {/* QUESTION */}
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                      openIndex === i ? 'text-[#CFAF57]' : 'text-[#0A1333]'
                    }`}>
                      {faq.question}
                    </span>

                    {/* ICON */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openIndex === i 
                        ? 'bg-gradient-to-br from-[#CFAF57] to-[#F4D77A] text-[#0A1333] rotate-180' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-[#CFAF57]/10 group-hover:text-[#CFAF57]'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  
                  {/* ANSWER */}
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 text-gray-600 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-6 font-medium">Still have questions?</p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#registration"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-[0_20px_50px_rgba(207,175,87,0.3)] transition-all"
          >
            Ask them live in the webinar
            <ChevronDown className="-rotate-90" size={20} />
          </motion.a>
        </div>

      </div>
    </section>
  );
}