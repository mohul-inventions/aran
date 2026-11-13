import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface IntroAnimationProps {
  onFinish: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [skip, setSkip] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem('aranIntroSeen') === 'true') {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('aranIntroSeen', 'true');
      onFinish();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setSkip(true);
    sessionStorage.setItem('aranIntroSeen', 'true');
    onFinish();
  };

  if (skip) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B12] text-center px-4 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 text-xs font-mono text-[#00E5FF] hover:text-white px-3 py-1.5 rounded border border-[#00E5FF]/30 hover:border-[#00E5FF] transition bg-[#0C1420]/80 backdrop-blur z-50"
      >
        SKIP INTRO &rarr;
      </button>

      <div className="flex flex-col items-center max-w-xl mx-auto w-full">
        {/* Shield Emblem Animated SVG */}
        <motion.div
          className="relative w-36 h-44 mb-6 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg
            viewBox="0 0 140 160"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            fill="none"
          >
            {/* Background Glow */}
            <defs>
              <radialGradient id="aranGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="70" cy="80" r="50" fill="url(#aranGlow)" />

            {/* Central Pulse Dot */}
            <motion.circle
              cx="70"
              cy="80"
              r="8"
              fill="#318BFF"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                reduced
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [0, 1.4, 1],
                      opacity: [0, 1, 0.9],
                    }
              }
              transition={{ delay: 0.2, duration: 0.8 }}
            />

            {/* Shield Outline Path */}
            <motion.path
              d="M70 10 L125 45 L108 145 L32 145 L15 45 Z"
              stroke="#00E5FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={500}
              strokeDashoffset={500}
              animate={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Seven AI Agent Nodes */}
            {[
              [70, 30],
              [40, 55],
              [100, 55],
              [35, 105],
              [105, 105],
              [52, 135],
              [88, 135],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="4.5"
                fill="#00E5FF"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                transition={{ delay: 1.6 + i * 0.15, duration: 0.4 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* NAALVARX Presenter Tag */}
        <motion.p
          className="text-xs font-mono text-[#00E5FF] tracking-[0.3em] uppercase mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
        >
          NAALVARX PRESENTS
        </motion.p>

        {/* Wordmark */}
        <motion.h1
          className="text-5xl sm:text-6xl font-black tracking-widest text-[#EAF3FF] mb-3 drop-shadow-lg"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.5 }}
        >
          ARAN
        </motion.h1>

        {/* Tagline - Responsive and never cut off */}
        <motion.p
          className="text-lg sm:text-2xl text-[#00E5FF] italic font-medium px-4 mb-3 max-w-lg mx-auto leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.6 }}
        >
          &ldquo;When Chaos Rises, ARAN Responds.&rdquo;
        </motion.p>

        {/* Secondary Description */}
        <motion.p
          className="text-xs sm:text-sm text-[#8797AA] tracking-wider uppercase font-mono px-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.9, duration: 0.5 }}
        >
          Autonomous Rescue &amp; Assistance Network
        </motion.p>

        {/* Call To Action Button */}
        <motion.button
          onClick={handleSkip}
          className="px-8 py-3 bg-[#00E5FF] hover:bg-cyan-300 text-[#070B12] text-xs font-bold font-mono tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] transition cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.5 }}
        >
          ENTER COMMAND GRID &rarr;
        </motion.button>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
