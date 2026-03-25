import { useState, FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { WebinarType } from "../types";
import { API_URL } from "../config/api";

interface Props {
  activeWebinar: WebinarType;
}

export default function PopupForm({ activeWebinar }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    year: "",
  });

  const [errors, setErrors] = useState<any>({});

  // ✅ VALIDATION
  const validate = () => {
    let err: any = {};

    if (!formData.name.trim()) err.name = "Full name is required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "Enter valid email";

    if (!/^\d{10}$/.test(formData.phone))
      err.phone = "Enter 10 digit number";

    if (!formData.city.trim()) err.city = "City is required";

    if (!formData.year) err.year = "Select year";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          webinar: activeWebinar,
        }),
      });

      const data = await res.json();

      // ⚡ INSTANT DUPLICATE RESPONSE
      if (res.status === 409) {
        setErrors({ email: "Already registered with this email" });
        setStatus("idle"); // stops loader immediately
        return;
      }

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // 🎉 SUCCESS
  if (status === "success") {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="text-green-400" size={28} />
        </div>

        <h3 className="text-xl font-bold text-white">
          You're Registered ✈️
        </h3>

        <p className="text-slate-400 text-sm">
          Check your email for webinar details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0F1A] border border-[#CFAF57]/20 rounded-2xl p-6 w-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

      <div className="text-center mb-5">
        <h3 className="text-lg font-bold text-white">
          Secure Your Seat
        </h3>
        <p className="text-xs text-slate-400">
          Limited slots • Free webinar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        <Input placeholder="Full Name" value={formData.name} error={errors.name}
          onChange={(v:any)=>setFormData({...formData,name:v})}/>

        <Input placeholder="Email Address" value={formData.email} error={errors.email}
          onChange={(v:any)=>setFormData({...formData,email:v})}/>

        <Input placeholder="Phone Number" value={formData.phone} error={errors.phone}
          maxLength={10}
          onChange={(v:any)=>setFormData({...formData,phone:v.replace(/\D/g,"")})}/>

        <Input placeholder="City" value={formData.city} error={errors.city}
          onChange={(v:any)=>setFormData({...formData,city:v})}/>

        <div>
          <select
            value={formData.year}
            onChange={(e)=>setFormData({...formData,year:e.target.value})}
            className={`w-full bg-[#0A1333] border ${
              errors.year ? "border-red-500" : "border-white/10"
            } px-4 py-3 rounded-xl text-white`}
          >
            <option value="">Select Year</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
          {errors.year && <p className="text-red-400 text-xs">{errors.year}</p>}
        </div>

        <button
          type="submit"
          disabled={status==="loading"}
          className="w-full bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0A1333] py-3 rounded-xl font-bold"
        >
          {status==="loading" ? "Submitting..." : "Register Now"}
        </button>

        {status==="error" && (
          <p className="text-red-400 text-xs text-center">
            Something went wrong
          </p>
        )}
      </form>
    </div>
  );
}

// INPUT
function Input({ placeholder, value, onChange, error, maxLength }: any) {
  return (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e)=>onChange(e.target.value)}
        className={`w-full bg-[#0A1333] border ${
          error ? "border-red-500" : "border-white/10"
        } px-4 py-3 rounded-xl text-white`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}