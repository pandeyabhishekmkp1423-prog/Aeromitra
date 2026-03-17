import { useState, useEffect } from 'react';
import { Menu, X, Plane, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WebinarType } from '../types';
import logo from '../assets/logo.png';

interface HeaderProps {
  activeWebinar: WebinarType;
  onWebinarChange: (type: WebinarType) => void;
}

export default function Header({ activeWebinar, onWebinarChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', href: '#discover' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B1445]/95 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo + Name */}
        <a href="#" className="flex items-center gap-4 group">
          <img
            src={logo}
            alt="Aeromitra Aviation"
            className="h-12 w-auto transition-transform duration-500 group-hover:scale-105"
          />

          <div className="hidden sm:block leading-tight">
            <div className={`font-extrabold text-xl tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>
              AEROMITRA
            </div>
            <div className="text-sm font-semibold tracking-widest text-[#F4D77A]">
              AVIATION
            </div>
          </div>
        </a>

        {/* Webinar Switcher */}
        <div
          className={`hidden md:flex items-center p-1 rounded-full border transition-all ${
            isScrolled
              ? 'border-[#CFAF57]/40 bg-[#111C5A]'
              : 'border-white/20 bg-white/10 backdrop-blur'
          }`}
        >
          <button
            onClick={() => onWebinarChange('pilot')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              activeWebinar === 'pilot'
                ? 'bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] shadow-md'
                : 'text-white/70 hover:text-[#F4D77A]'
            }`}
          >
            <Plane size={14} />
            Pilot
          </button>

          <button
            onClick={() => onWebinarChange('cabin-crew')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              activeWebinar === 'cabin-crew'
                ? 'bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] shadow-md'
                : 'text-white/70 hover:text-[#F4D77A]'
            }`}
          >
            <Users size={14} />
            Crew
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-[#F4D77A] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#registration"
            className="bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Register Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B1445] border-t border-[#CFAF57]/20 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-white hover:text-[#F4D77A]"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] px-6 py-3 rounded-xl font-semibold"
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