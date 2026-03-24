import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
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

  const amount = activeWebinar === 'pilot' ? 149 : 99;

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (formData.phone.length < 10) {
    alert('Enter valid phone number');
    return;
  }

  setStatus('loading');

  try {
    // ✅ 1. Create Order from Backend
    const res = await fetch('http://localhost:5000/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

if (!res.ok || !data.order) {
  console.error("ORDER ERROR:", data);
  alert("Backend error. Check console.");
  setStatus("error");
  return;
}

    // ✅ 2. Load Razorpay Script (if not already)
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔥 IMPORTANT
        amount: data.order.amount,
        currency: "INR",
        name: "AeroMitra Aviation",
        description: activeWebinar === 'pilot' ? "Pilot Webinar" : "Crew Webinar",
        order_id: data.order.id,

        handler: async function (response: any) {
          // ✅ 3. Verify Payment
          const verifyRes = await fetch('http://localhost:5000/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    formData: {
      ...formData,
      webinar: activeWebinar,
    },
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
  }),
});

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#CFAF57",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };

  } catch (error) {
    console.error(error);
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
            You're all set for the {activeWebinar === 'pilot' ? 'Pilot Training' : 'Cabin Crew'} Masterclass.
          </p>

          <button
            onClick={() => setStatus('idle')}
            className="mt-8 text-[#CFAF57] font-black uppercase tracking-widest text-xs hover:text-[#F4D77A]"
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

      {/* GOLD GLOW */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFAF57]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CFAF57]/20 rounded-full blur-[120px]" />
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
                Join our elite community and secure your spot.
              </p>

              <div className="space-y-8">
                {[1,2,3].map((id) => (
                  <div key={id} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CFAF57] group-hover:bg-[#CFAF57] group-hover:text-[#0A1333] transition-all">
                      <span className="font-black text-xl">{id}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg">
                        {id === 1 && "Expert Mentorship"}
                        {id === 2 && "Real-Time Insights"}
                        {id === 3 && "Career Roadmap"}
                      </h4>
                      <p className="text-slate-500">
                        {id === 1 && "Learn from the best."}
                        {id === 2 && "Latest updates."}
                        {id === 3 && "Clear path."}
                      </p>
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
            className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[48px] border border-[#CFAF57]/20 shadow-[0_30px_80px_rgba(207,175,87,0.25)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" value={formData.name} onChange={(v:string)=>setFormData({...formData,name:v})}/>
                <Input label="Email Address" value={formData.email} onChange={(v:string)=>setFormData({...formData,email:v})}/>
              </div>

              <Input label="Phone / WhatsApp" value={formData.phone} onChange={(v:string)=>setFormData({...formData,phone:v})}/>

              <div className="grid grid-cols-2 gap-6">
                <Input label="City" value={formData.city} onChange={(v:string)=>setFormData({...formData,city:v})}/>

                {/* 🔥 FIXED SELECT */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    Year of Passing
                  </label>

                  <div className="relative">
                    <select
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 pr-10 rounded-2xl text-white appearance-none focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
                    >
                      <option value="" className="bg-[#0B0F1A] text-white">Select Year</option>
                      <option className="bg-[#0B0F1A] text-white">2020</option>
                      <option className="bg-[#0B0F1A] text-white">2021</option>
                      <option className="bg-[#0B0F1A] text-white">2022</option>
                      <option className="bg-[#0B0F1A] text-white">2023</option>
                      <option className="bg-[#0B0F1A] text-white">2024</option>
                      <option className="bg-[#0B0F1A] text-white">2025</option>
                      <option className="bg-[#0B0F1A] text-white">2026</option>
                      <option className="bg-[#0B0F1A] text-white">2027+</option>
                    </select>

                    {/* Arrow */}
                    <div className="absolute inset-y-0 right-4 flex items-center text-white/60 pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="text-center text-slate-400 text-sm">
                Webinar Fee:
                <span className="text-[#CFAF57] text-lg font-bold ml-2">₹{amount}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(207,175,87,0.5)' }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl"
              >
                {status === 'loading'
                  ? <Loader2 className="animate-spin" />
                  : <>Pay ₹{amount} & Register <Send size={20} /></>
                }
              </motion.button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center font-bold">
                  Something went wrong.
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

/* INPUT */
function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
        {label}
      </label>
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-slate-500 focus:border-[#CFAF57] focus:ring-4 focus:ring-[#CFAF57]/20 outline-none transition-all font-medium"
      />
    </div>
  );
}