'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 bg-ink-900/90 backdrop-blur hover:bg-brand-400 text-ink-200 hover:text-ink-950 p-3 rounded-full border border-white/10 shadow-xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
