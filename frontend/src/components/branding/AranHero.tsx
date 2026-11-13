import React from 'react';
import { motion } from 'framer-motion';
import AranBackground from './AranBackground';

/** Premium landing screen */
const AranHero: React.FC = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
    <AranBackground />
    <div className="z-10 flex flex-col items-center gap-6 px-6 max-w-3xl">
      <motion.h2
        className="text-xs md:text-sm text-[#00E5FF] uppercase tracking-[0.3em] font-light"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        NAALVARX PRESENTS
      </motion.h2>

      {/* Shield emblem inline */}
      <motion.svg
        width={100}
        height={120}
        viewBox="0 0 120 140"
        className="mt-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <path d="M60 5 L110 35 L95 125 L25 125 L10 35 Z" fill="none" stroke="#00E5FF" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="60" cy="65" r="8" fill="#318BFF" />
        <circle cx="40" cy="40" r="4" fill="#00E5FF" />
        <circle cx="80" cy="40" r="4" fill="#00E5FF" />
        <circle cx="30" cy="85" r="4" fill="#00E5FF" />
        <circle cx="90" cy="85" r="4" fill="#00E5FF" />
        <circle cx="50" cy="115" r="4" fill="#00E5FF" />
        <circle cx="70" cy="115" r="4" fill="#00E5FF" />
        <circle cx="60" cy="20" r="4" fill="#00E5FF" />
      </motion.svg>

      <motion.h1
        className="text-5xl md:text-7xl font-bold text-[#EAF3FF] tracking-widest drop-shadow-lg"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        ARAN
      </motion.h1>

      <motion.p
        className="text-xs md:text-sm text-[#00E5FF] tracking-[0.25em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Autonomous Rescue &amp; Assistance Network
      </motion.p>

      <motion.p
        className="text-lg md:text-2xl text-[#00E5FF] italic mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        &ldquo;When Chaos Rises, ARAN Responds.&rdquo;
      </motion.p>

      <motion.p
        className="max-w-2xl text-sm md:text-base text-[#8797AA] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        An autonomous multi‑agent intelligence network that transforms fragmented
        disaster distress signals into coordinated, explainable emergency‑response
        recommendations.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <a
          href="/command"
          className="px-8 py-3 bg-[#00E5FF] text-[#070B12] rounded-md font-semibold hover:bg-cyan-300 transition text-sm tracking-wider"
        >
          ENTER COMMAND GRID
        </a>
        <a
          href="/intelligence"
          className="px-8 py-3 border border-[#00E5FF] text-[#00E5FF] rounded-md font-semibold hover:bg-[#0C1420] transition text-sm tracking-wider"
        >
          EXPLORE THE INTELLIGENCE
        </a>
      </motion.div>

      {/* Seven agent status dots */}
      <motion.div
        className="flex gap-3 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        {['Signal', 'Geo', 'Fusion', 'Critical', 'Resource', 'Route', 'Sync'].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-3 h-3 rounded-full bg-[#00E5FF] animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <span className="text-[9px] text-[#8797AA] uppercase tracking-wider">{name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AranHero;
