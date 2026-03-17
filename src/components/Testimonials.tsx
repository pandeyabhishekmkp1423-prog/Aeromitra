import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Harshit Mehra",
    role: "Pilot Aspirant",
    content: "The clarity I got in just 90 minutes was more than what I gathered in months of research. Capt. Deval's approach is very practical.",
    image: "https://i.pravatar.cc/150?u=harshit",
  },
  {
    name: "Riya Sharma",
    role: "Pilot Aspirant",
    content: "I was confused between cadet and conventional paths. This webinar cleared all my doubts about costs and selection processes.",
    image: "https://t3.ftcdn.net/jpg/10/24/11/58/360_F_1024115848_VTfuHjHj9UVVvrUOaDQqm2clMspgRnGs.jpg",
  },
  {
    name: "Aman Rathore",
    role: "Pilot Aspirant",
    content: "Highly recommended for anyone starting their aviation journey. The financial planning section was an eye-opener.",
    image: "https://i.pravatar.cc/150?u=aman",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-21 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A1333] mb-6">
            Real Stories.{" "}
            <span className="text-[#CFAF57]">Real Aspirants.</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how this session helped aspiring pilots gain clarity and take confident decisions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              
              className="group relative p-8 rounded-3xl 
              bg-[#0A1333] text-white 
              shadow-[0_20px_60px_rgba(0,0,0,0.2)] 
              transition-all duration-300 
              hover:bg-gradient-to-br hover:from-[#CFAF57] hover:to-[#F4D77A]"
            >

              {/* Quote */}
              <Quote className="absolute top-6 right-6 w-10 h-10 opacity-20 text-white group-hover:text-[#0A1333]" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-[#CFAF57] text-[#CFAF57]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-8 leading-relaxed text-white/90 group-hover:text-[#0A1333]">
                “{t.content}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />

                <div>
                  <h4 className="font-bold text-white group-hover:text-[#0A1333]">
                    {t.name}
                  </h4>

                  <p className="text-xs uppercase font-semibold tracking-wide text-white/60 group-hover:text-[#0A1333]/70">
                    {t.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}