import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2 } from 'lucide-react';
import { WebinarType } from '../types';
import { BackgroundGraphics } from './BackgroundGraphics';

interface RegistrationFormProps {
  activeWebinar: WebinarType;
}

export default function RegistrationForm({ activeWebinar }: RegistrationFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    year: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, webinarType: activeWebinar }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="registration" className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center min-h-[600px]">
        <BackgroundGraphics />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 bg-white/5 backdrop-blur-3xl p-16 rounded-[48px] border border-[#CFAF57]/20 shadow-[0_30px_80px_rgba(207,175,87,0.25)]"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#CFAF57] to-[#F4D77A] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Send className="text-[#0A1333]" size={40} />
          </div>

          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
            Registration Successful!
          </h2>

          <p className="text-slate-400 text-xl font-medium max-w-md mx-auto">
            You're all set for the {activeWebinar === 'pilot' ? 'Pilot Training' : 'Cabin Crew'} Masterclass. Check your email for the joining link.
          </p>

          <button
            onClick={() => setStatus('idle')}
            className="mt-8 text-[#CFAF57] font-black uppercase tracking-widest text-xs hover:text-[#F4D77A] transition-colors"
          >
            Register another person
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-32 bg-slate-950 relative overflow-hidden">
      <BackgroundGraphics />
      
      {/* GOLD GLOW INSTEAD OF BLUE */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFAF57]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CFAF57]/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                Your Journey <br />
                <span className="text-[#CFAF57]">Starts Here.</span>
              </h2>

              <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
                Join our elite community of aviation aspirants. Secure your spot in the next masterclass and take the first step towards the cockpit.
              </p>
              
              <div className="space-y-8">
                {[
                  { id: 1, title: 'Expert Mentorship', desc: 'Learn from the best in the industry.' },
                  { id: 2, title: 'Real-Time Insights', desc: 'Get the latest updates on recruitment.' },
                  { id: 3, title: 'Career Roadmap', desc: 'A clear path from student to professional.' }
                ].map((item) => (
                  <div key={item.id} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CFAF57] flex-shrink-0 group-hover:bg-[#CFAF57] group-hover:text-[#0A1333] transition-all duration-300">
                      <span className="font-black text-xl">{item.id}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[48px] border border-[#CFAF57]/20 shadow-[0_30px_80px_rgba(207,175,87,0.2)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Phone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">City</label>
                  <input
                    required
                    type="text"
                    placeholder="Mumbai"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-slate-600 focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Year of Passing</label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium appearance-none"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option value="" className="bg-slate-900">Select Year</option>
                    <option value="2020" className="bg-slate-900">2020</option>
                    <option value="2021" className="bg-slate-900">2021</option>
                    <option value="2022" className="bg-slate-900">2022</option>
                    <option value="2023" className="bg-slate-900">2023</option>
                    <option value="2024" className="bg-slate-900">2024</option>
                    <option value="2025" className="bg-slate-900">2025</option>
                    <option value="2026" className="bg-slate-900">2026</option>
                    <option value="Ongoing" className="bg-slate-900">2027+</option>
                  
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(207,175,87,0.5)' }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Secure My Spot Now
                    <Send size={20} />
                  </>
                )}
              </motion.button>
              
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center font-bold">
                  Something went wrong. Please try again.
                </p>
              )}
              
              <p className="text-slate-500 text-[10px] text-center uppercase tracking-[0.3em] font-black">
                🔒 Encrypted & Secure
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}