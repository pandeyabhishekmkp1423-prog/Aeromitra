import { useState, FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { WebinarType } from "../types";

interface Props {
  activeWebinar: WebinarType;
}

export default function PopupForm({ activeWebinar }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const amount = activeWebinar === "pilot" ? 149 : 99;

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
  if (status === "success") {
    return (
      <div className="p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#CFAF57] to-[#F4D77A] flex items-center justify-center">
          <Send size={20} className="text-[#0A1333]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Registration Successful
        </h3>

        <p className="text-sm text-slate-400">
          Check your email for webinar details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0F1A] border border-[#CFAF57]/20 rounded-2xl p-6 sm:p-8 w-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

      {/* TITLE */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">
          Register for{" "}
          <span className="text-[#CFAF57]">
            {activeWebinar === "pilot" ? "Pilot Webinar" : "Crew Webinar"}
          </span>
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Limited seats available
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          required
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-slate-500 focus:border-[#CFAF57] focus:ring-2 focus:ring-[#CFAF57]/20 outline-none transition"
        />

        {/* EMAIL */}
        <input
          required
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-slate-500 focus:border-[#CFAF57] focus:ring-2 focus:ring-[#CFAF57]/20 outline-none transition"
        />

        {/* PHONE */}
        <input
          required
          type="tel"
          placeholder="Phone / WhatsApp"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-slate-500 focus:border-[#CFAF57] focus:ring-2 focus:ring-[#CFAF57]/20 outline-none transition"
        />

        {/* PRICE */}
        <div className="text-center text-sm text-slate-400 pt-2">
          Webinar Fee:{" "}
          <span className="text-[#CFAF57] font-bold text-lg">
            ₹{amount}
          </span>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full mt-2 bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Pay ₹{amount} & Register <Send size={16} />
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-xs text-center">
            Something went wrong. Try again.
          </p>
        )}

        <p className="text-[10px] text-center text-slate-500 pt-1">
          🔒 Secure & Encrypted Payment
        </p>
      </form>
    </div>
  );
}