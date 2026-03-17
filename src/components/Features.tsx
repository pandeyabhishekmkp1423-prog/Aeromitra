import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { WebinarData } from '../types';

interface FeaturesProps {
  data: WebinarData;
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section id="discover" className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#0A1333] mb-6"
          >
            What You'll{" "}
            <span className="text-[#CFAF57]">
              Discover
            </span>
          </motion.h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A powerful live session designed to give you complete clarity about becoming a pilot — from training to career success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {data.discoveries.map((item, index) => {
            const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#0A1333]"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#0A1333] flex items-center justify-center mb-6 text-white group-hover:bg-[#CFAF57] transition">
                  <IconComponent size={24} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0A1333] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom line */}
                <div className="mt-6 h-[2px] w-0 bg-[#CFAF57] group-hover:w-full transition-all duration-300"></div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}