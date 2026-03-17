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
      setIsScrolled(window.scrollY > 50);
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
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">

          {/* 🔥 LOGO REPLACED */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Aeromitra Aviation"
              className="h-11 w-auto transition-transform duration-500 group-hover:scale-105"
            />

            <span className={`font-black text-2xl tracking-tighter hidden sm:block transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              AEROMITRA <span className="text-[#CFAF57]">AVIATION</span>
            </span>
          </a>

          {/* Webinar Switcher */}
          <div className={`flex p-1 rounded-full border ${isScrolled ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'}`}>
            <button
              onClick={() => onWebinarChange('pilot')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeWebinar === 'pilot'
                  ? 'bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] shadow-sm'
                  : isScrolled ? 'text-gray-500 hover:text-[#CFAF57]' : 'text-white/70 hover:text-[#F4D77A]'
              }`}
            >
              <Plane size={14} />
              Pilot
            </button>

            <button
              onClick={() => onWebinarChange('cabin-crew')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeWebinar === 'cabin-crew'
                  ? 'bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] shadow-sm'
                  : isScrolled ? 'text-gray-500 hover:text-[#CFAF57]' : 'text-white/70 hover:text-[#F4D77A]'
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
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-[#CFAF57]' : 'text-white/90 hover:text-[#F4D77A]'
              }`}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#registration"
            className="bg-gradient-to-r from-[#CFAF57] to-[#F4D77A] text-[#0B1445] px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105"
          >
            Register Now
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-gray-900 hover:text-[#CFAF57]"
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