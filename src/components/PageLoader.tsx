'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lets hero animations wait for the intro curtain only on the first page load.
export const intro = { done: false };

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Smooth percentage counter 0 to 100
    const duration = 1000;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.floor(prev + increment);
      });
    }, intervalTime);

    const finishTimer = setTimeout(() => {
      setLoading(false);
      intro.done = true;
    }, 1250);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: '0%' }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-ink-950 text-white flex flex-col justify-between p-8 sm:p-12 pointer-events-none select-none font-sans"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between text-xs font-mono text-ink-400">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              <span className="tracking-wider uppercase">KELTCH ENGINEERING</span>
            </span>
            <span className="tracking-widest uppercase">DELIVERING EXCELLENCE</span>
          </div>

          {/* Center Brand Reveal */}
          <div className="my-auto max-w-4xl mx-auto w-full text-center space-y-4">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
              >
                Keltch <span className="text-brand-400">Engineering</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-ink-400 text-xs sm:text-sm font-mono tracking-widest uppercase"
              >
                Electrification • Substations • Fire Fighting Infrastructure
              </motion.p>
            </div>
          </div>

          {/* Bottom Row with Live Counter */}
          <div className="flex items-end justify-between border-t border-white/10 pt-6">
            <div className="text-xs font-mono text-ink-400 uppercase tracking-widest">
              Powering up
            </div>

            <div className="text-4xl sm:text-6xl font-mono font-extrabold text-white tracking-tighter">
              <span className="text-brand-400">{counter.toString().padStart(3, '0')}</span>
              <span className="text-xs text-ink-500 font-mono ml-1">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
