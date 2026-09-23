'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
          className="fixed inset-0 z-[9999] bg-white flex flex-col justify-between p-8 sm:p-12 pointer-events-none select-none"
        >
          <div />

          {/* Logo wipes in left to right */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[min(560px,85vw)]"
          >
            <Image src="/logo-full.svg" alt="Keltch Engineering — Delivering Excellence" width={552} height={131} priority className="w-full h-auto" />
          </motion.div>

          <div className="flex items-end justify-between border-t border-ink-100 pt-6">
            <div className="text-xs font-mono text-ink-400 uppercase tracking-widest">Powering up</div>
            <div className="text-4xl sm:text-6xl font-mono font-extrabold text-ink-900 tracking-tighter tabular-nums">
              {counter.toString().padStart(3, '0')}
              <span className="text-xs text-ink-400 font-mono ml-1">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
