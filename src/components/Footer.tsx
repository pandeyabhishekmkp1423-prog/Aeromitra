import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#0A1333] text-white relative overflow-hidden pt-24 pb-10">

      {/* ✈️ CURVED AVIATION DIVIDER */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 120" className="w-full h-[100px]">
          <path
            d="M0,80 C240,0 1200,140 1440,40 L1440,0 L0,0 Z"
            fill="#ffffff"
            opacity="0.05"
          />
        </svg>
      </div>

      {/* ✨ GOLD GLOW */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#CFAF57]/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* LEFT */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
              <span className="font-black text-xl tracking-tight">
                AEROMITRA <span className="text-[#CFAF57]">AVIATION</span>
              </span>
            </div>

            <p className="max-w-md mb-6 text-white/60 text-sm leading-relaxed">
              Empowering the next generation of aviation professionals with expert mentorship, real insights, and a clear roadmap to the skies.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {[
                {
                  Icon: Facebook,
                  link: "https://www.facebook.com/share/1AR4HfSfoV/",
                },
                {
                  Icon: Instagram,
                  link: "https://www.instagram.com/aeromitraaviationlko?igsh=cTF2YTcxcjd1NzRi",
                },
                {
                  Icon: Linkedin,
                  link: "https://www.linkedin.com/company/aeromitra-aviation/",
                },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center 
                  hover:bg-[#CFAF57] hover:text-[#0A1333] hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#CFAF57] transition">Home</a></li>
              <li><a href="#discover" className="hover:text-[#CFAF57] transition">Discover</a></li>
              <li><a href="#agenda" className="hover:text-[#CFAF57] transition">Agenda</a></li>
              <li><a href="#testimonials" className="hover:text-[#CFAF57] transition">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-[#CFAF57] transition">FAQ</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">
              Contact
            </h4>

            <ul className="space-y-6 text-sm text-white/60">

              {/* LUCKNOW */}
              <li>
                <p className="text-[#CFAF57] text-xs mb-2 uppercase">Lucknow Branch</p>

                <a
                  href="tel:+919005527666"
                  className="flex items-center gap-3 group hover:text-[#CFAF57] transition mb-2"
                >
                  <Phone size={16} className="text-[#CFAF57]" />
                  <span>+91 9005527666 </span>
                </a>

                <a
                  href="mailto:info@aeromitraa.com"
                  className="flex items-center gap-3 group hover:text-[#CFAF57] transition mb-2"
                >
                  <Mail size={16} className="text-[#CFAF57]" />
                  <span>info@aeromitraa.com</span>
                </a>

                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#CFAF57]" />
                  <span>Kapoortha,Lucknow (U.P),India</span>
                </div>
              </li>

              {/* DELHI */}
              <li>
                <p className="text-[#CFAF57] text-xs mb-2 uppercase">Delhi Branch</p>

                <a
                  href="tel:+919999228597"
                  className="flex items-center gap-3 group hover:text-[#CFAF57] transition mb-2"
                >
                  <Phone size={16} className="text-[#CFAF57]" />
                  <span>+91 9999228597</span>
                </a>

                <a
                  href="mailto:admin@aeromitra.com"
                  className="flex items-center gap-3 group hover:text-[#CFAF57] transition mb-2"
                >
                  <Mail size={16} className="text-[#CFAF57]" />
                  <span>admin@aeromitra.com</span>
                </a>

                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#CFAF57]" />
                  <span>Arjun Nagar, Safdarjung Enclave,Delhi, India</span>
                </div>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">

          <p>© 2026 Aeromitra Aviation. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#CFAF57] transition">Privacy</a>
            <a href="#" className="hover:text-[#CFAF57] transition">Terms</a>
            <a href="#" className="hover:text-[#CFAF57] transition">Refund</a>
          </div>

        </div>

      </div>
    </footer>
  );
}