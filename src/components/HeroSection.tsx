'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative z-20 h-screen flex flex-col justify-end pb-32 items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-white drop-shadow-lg"
        style={{ fontFamily: 'var(--font-artistic)' }}
      >
        Vibe Shot Club
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg md:text-xl text-gray-200 mb-12 max-w-xl font-light tracking-wide drop-shadow-md"
      >
        Exploring the boundaries of AI photography and visual storytelling.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/gallery"
          className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/30 rounded-full transition-all duration-500 text-white font-medium tracking-wide hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Enter Gallery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;
