import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { WebinarType } from '../types';
import { BackgroundGraphics } from './BackgroundGraphics';
import { API_URL } from '../config/api';

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

  const [errors, setErrors] = useState<any>({});

  // ✅ VALIDATION
  const validate = () => {
    let err: any = {};

    if (!formData.name.trim()) err.name = "Name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "Enter valid email";

    if (!/^\d{10}$/.test(formData.phone))
      err.phone = "Enter exactly 10 digits";

    if (!formData.city.trim()) err.city = "City is required";

    if (!formData.year) err.year = "Select year";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (status === 'loading') return;
  if (!validate()) return;

  // ⚡ Immediately show loading
  setStatus('loading');

  try {
    const resPromise = fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        webinar: activeWebinar,
      }),
    });

    // ⚡ small UX trick (makes UI feel instant)
    await new Promise((r) => setTimeout(r, 150));

    const res = await resPromise;
    const data = await res.json();

    // ⚡ FAST 409 HANDLING
    if (res.status === 409) {
      setErrors({ email: "You have already registered" });
      setStatus('idle');
      return;
    }

    setStatus(data.success ? 'success' : 'error');

  } catch (error) {
    console.error(error);
    setStatus('error');
  }
};

  // ✅ SUCCESS SCREEN (UNCHANGED UI)
  if (status === 'success') {
    return (
      <section className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center min-h-[600px]">
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
            Registration Confirmed
          </h2>

          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Thank you for registering for the{" "}
            <span className="text-[#CFAF57] font-semibold">
              {activeWebinar === 'pilot' ? 'Pilot Webinar' : 'Cabin Crew Webinar'}
            </span>.
            <br />
            Please check your email for further details.
          </p>

          <button
            onClick={() => setStatus('idle')}
            className="mt-8 text-[#CFAF57] font-black uppercase tracking-widest text-xs hover:text-[#F4D77A]"
          >
            Register another participant
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-32 bg-slate-950 relative overflow-hidden">
      <BackgroundGraphics />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT (UNCHANGED) */}
          <div>
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="max-w-xl"
  >
    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
      Your Journey <br />
      <span className="text-[#CFAF57]">Starts Here.</span>
    </h2>

    <p className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed">
      Join our aviation webinar and get clarity, confidence, and a clear roadmap
      to build your career in the aviation industry.
    </p>

    {/* 🔥 POINTS BACK */}
    <div className="space-y-5">
      {[
        ["Expert Mentorship", "Learn directly from aviation professionals."],
        ["Real-Time Insights", "Understand industry trends & requirements."],
        ["Career Roadmap", "Step-by-step guidance for your journey."],
      ].map(([title, desc], i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#CFAF57] font-bold">
            {i + 1}
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">{title}</h4>
            <p className="text-slate-500 text-xs">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</div>

          {/* FORM */}
          <motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  whileInView={{ opacity: 1, scale: 1 }}
  className="bg-white/5 backdrop-blur-2xl p-6 md:p-10 rounded-[32px] border border-[#CFAF57]/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-w-[480px] mx-auto"
>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" value={formData.name} error={errors.name}
                  onChange={(v:string)=>setFormData({...formData,name:v})}/>
                <Input label="Email Address" value={formData.email} error={errors.email}
                  onChange={(v:string)=>setFormData({...formData,email:v})}/>
              </div>

              <Input label="Phone / WhatsApp" value={formData.phone} error={errors.phone}
                onChange={(v:string)=>setFormData({...formData,phone:v.replace(/\D/g,'')})}/>

              <div className="grid grid-cols-2 gap-6">
                <Input label="City" value={formData.city} error={errors.city}
                  onChange={(v:string)=>setFormData({...formData,city:v})}/>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    Year of Passing (12th)
                  </label>

                  <select
                    value={formData.year}
                    onChange={(e)=>setFormData({...formData,year:e.target.value})}
                    className={`w-full bg-[#0A1333] border ${
                      errors.year ? "border-red-500" : "border-white/10"
                    } px-6 py-4 rounded-2xl text-white`}
                  >
                    <option value="">Select Year</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                  </select>

                  {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
                </div>
              </div>

              <motion.button
                disabled={status==='loading'}
                type="submit"
                className="w-full bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
              >
                {status==='loading'
  ? (
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin" size={18}/>
      <span>Submitting...</span>
    </div>
  )
                  : <>Register Now <Send size={20}/></>
                }
              </motion.button>

              {status==='error' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// 🔥 INPUT (UPDATED ONLY FOR ERROR SUPPORT)
function Input({ label, value, onChange, error }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className={`w-full bg-[#0A1333]/60 border ${
          error ? "border-red-500" : "border-white/10"
        } px-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-500
        focus:border-[#CFAF57] focus:ring-2 focus:ring-[#CFAF57]/20 outline-none transition`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}