import { useState, useEffect } from "react";
import { Menu, X, Plane, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { WebinarType } from "../types";
import logo from "../assets/logo.png";

interface HeaderProps {
  activeWebinar: WebinarType;
}

export default function Header({ activeWebinar }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ CLOSE mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Discover", href: "#discover" },
    { name: "Agenda", href: "#agenda" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <div
            onClick={() => navigate("/pilot")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={logo}
              alt="Aeromitra Aviation"
              className="h-11 w-auto transition-transform duration-500 group-hover:scale-105"
            />

            <span className="font-black text-2xl tracking-tighter hidden sm:block text-white">
              AEROMITRA <span className="text-[#CFAF57]">AVIATION</span>
            </span>
          </div>

          {/* 🔥 TOGGLE */}
          <div className="relative flex p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">

            {/* Animated Pill */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] shadow-[0_0_20px_rgba(207,175,87,0.4)]"
              animate={{
                x: activeWebinar === "pilot" ? "0%" : "100%",
              }}
            />

            {/* Pilot */}
            <button
              onClick={() => navigate("/pilot")}
              className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeWebinar === "pilot"
                  ? "text-black"
                  : "text-white/70 hover:text-[#F4D77A]"
              }`}
            >
              <Plane size={14} />
              Pilot
            </button>

            {/* Crew */}
            <button
              onClick={() => navigate("/crew")}
              className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeWebinar === "cabin-crew"   // ✅ FIXED
                  ? "text-black"
                  : "text-white/70 hover:text-[#F4D77A]"
              }`}
            >
              <Users size={14} />
              Crew
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-[#F4D77A] transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#registration"
            className="bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-black px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_10px_30px_-10px_rgba(207,175,87,0.6)] hover:scale-105"
          >
            Register Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0B0F1A]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-5 py-6 space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-base text-white/80 hover:text-[#F4D77A]"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#registration"
                className="block w-full text-center bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-black px-6 py-3 rounded-xl font-semibold"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}