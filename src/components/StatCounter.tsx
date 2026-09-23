'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  /** Show the value as-is without counting (e.g. a year). */
  static?: boolean;
}

export default function StatCounter({ value, suffix = '', label, sublabel, static: isStatic = false }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || isStatic) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      // plain String(): toLocaleString would render years as "2,024"
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [isInView, isStatic, value]);

  return (
    <div ref={ref} className="py-2">
      <div className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold text-ink-900 tracking-tight tabular-nums leading-none">
        <span ref={numRef}>{isStatic ? value : 0}</span>
        <span className="text-brand-500">{suffix}</span>
      </div>
      <div className="mt-5 text-sm font-medium text-ink-900">{label}</div>
      {sublabel && <div className="text-sm text-ink-400 mt-0.5">{sublabel}</div>}
    </div>
  );
}
