import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { WebinarData } from '../types';

interface TargetAudienceProps {
  data: WebinarData;
}

export default function TargetAudience({ data }: TargetAudienceProps) {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 FLOATING GOLD CONTAINER WITH HOVER */}
        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative rounded-[40px] p-10 md:p-16 
          bg-gradient-to-br from-[#CFAF57] via-[#E6C46A] to-[#B8963E] 
          border border-[#CFAF57]/40 
          shadow-[0_40px_120px_rgba(207,175,87,0.35)] overflow-hidden"
        >

          {/* ✨ Shine Overlay */}
          <div className="absolute inset-0 rounded-[40px] 
          bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>

          {/* ✨ Moving Light Effect */}
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#0A1333] mb-6">
                Who Is This{" "}
                <span className="text-[#0A1333]">For?</span>
              </h2>

              <p className="text-[#0A1333]/80 text-lg mb-8 max-w-xl">
                Whether you're just starting to dream or already researching your path, this session is designed to give you absolute clarity.
              </p>

              <div className="space-y-4">
                {[
                  "Aspiring individuals seeking a clear pilot career roadmap",
                  "Those confused about eligibility and selection process",
                  "People wanting a realistic understanding of aviation industry",
                  "Anyone looking for transparent training cost & planning"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-[#0A1333] w-5 h-5 mt-1" />
                    <span className="text-[#0A1333]/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT CARDS */}
            <div className="grid gap-5">
              {data.targetAudience.map((a, i) => {
                const IconComponent = (Icons as any)[a.icon] || Icons.HelpCircle;

                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group flex items-center gap-5 p-5 rounded-2xl 
                    bg-white/90 backdrop-blur 
                    border border-white/40 
                    shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] 
                    transition"
                  >

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-[#0A1333] flex items-center justify-center text-white group-hover:bg-[#CFAF57] transition">
                      <IconComponent size={22} />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-[#0A1333] font-bold">
                        {a.title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {a.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}