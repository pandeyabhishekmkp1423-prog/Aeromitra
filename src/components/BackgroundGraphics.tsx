import { motion } from 'motion/react';

export const BackgroundGraphics = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

      {/* ✨ GOLD MIST (TOP) */}
      <motion.div
        animate={{
          x: [-150, 150],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 -left-1/3 w-[180%] h-72 bg-gradient-to-r from-transparent via-[#CFAF57]/20 to-transparent blur-[120px]"
      />

      {/* ✨ GOLD MIST (BOTTOM) */}
      <motion.div
        animate={{
          x: [150, -150],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 -right-1/3 w-[180%] h-96 bg-gradient-to-r from-transparent via-[#CFAF57]/10 to-transparent blur-[140px]"
      />

      {/* ✈️ RADAR RINGS (GOLD) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#CFAF57]/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#CFAF57]/5 rounded-full" />

      {/* ✨ PULSE CENTER */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#CFAF57] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[1px]"
      />

      {/* ✈️ RADAR SWEEP */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-[500px] h-[1px] bg-gradient-to-r from-[#CFAF57]/40 to-transparent origin-left -translate-y-1/2"
      />

      {/* ✨ RUNWAY GLOW LINE */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#CFAF57]/40 to-transparent blur-sm" />

    </div>
  );
};

export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.4
          }}
          animate={{
            y: [null, "-=120"],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 12 + 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8
          }}
          className="absolute w-[2px] h-[2px] bg-[#CFAF57] rounded-full blur-[1px]"
        />
      ))}

    </div>
  );
};