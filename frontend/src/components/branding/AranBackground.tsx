import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
// Emblem loaded from public directory via absolute URL path

/**
 * Large animated ARAN background watermark.
 * Uses SVG animation + framer‑motion for edge glow and node pulses.
 */
const AranBackground: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-primary">
      {/* Large watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ width: 'clamp(350px,45vw,800px)', height: 'auto' }}
        initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
        animate={reduced ? {} : { opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 200 240" className="text-cyan-400" fill="none" stroke="#00E5FF" strokeWidth={8}>
          {/* Shield outline – animated edge glow */}
          <path
            d="M100 0 L170 45 L150 210 L50 210 L30 45 Z"
            strokeDasharray="200"
            strokeDashoffset="200"
            style={reduced ? {} : { animation: 'edgeGlow 8s linear infinite' }}
          />
          {/* Central light */}
          <circle cx="100" cy="120" r="12" fill="#318BFF" />
          {/* Seven network nodes – animated individually */}
          {[
            [70, 80],
            [130, 80],
            [55, 150],
            [145, 150],
            [85, 190],
            [115, 190],
            [100, 50],
          ].map((c, i) => (
            <circle
              key={i}
              cx={c[0]}
              cy={c[1]}
              r={4}
              fill="#00E5FF"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default AranBackground;
