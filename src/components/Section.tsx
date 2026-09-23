'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EASE, Magnetic, Reveal, SplitText } from '@/components/motion';

export function Kicker({ children, dark = false, index }: { children: React.ReactNode; dark?: boolean; index?: string }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] ${dark ? 'text-ink-300' : 'text-ink-500'}`}>
      {index && <span className={`font-mono ${dark ? 'text-brand-400' : 'text-brand-600'}`}>{index}</span>}
      <span className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-ink-200'}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  index,
  title,
  description,
  dark = false,
}: {
  kicker: string;
  index?: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
      <div className="lg:col-span-8 space-y-6">
        <Reveal y={10}>
          <Kicker dark={dark} index={index}>
            {kicker}
          </Kicker>
        </Reveal>
        <h2 className={`text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.02] ${dark ? 'text-white' : 'text-ink-900'}`}>
          <SplitText text={title} inView />
        </h2>
      </div>
      {description && (
        <Reveal delay={0.2} className="lg:col-span-4">
          <p className={`text-base leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-500'}`}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Typographic hero used at the top of every inner page. */
export function PageHero({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-36 lg:pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }}>
          <Kicker dark>{kicker}</Kicker>
        </motion.div>
        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-[96px] font-semibold leading-[0.98] max-w-5xl">
          <SplitText text={title} delay={0.1} />
        </h1>
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="lg:col-start-7 lg:col-span-6 text-lg text-ink-300 leading-relaxed"
          >
            {description}
          </motion.p>
          {children && <div className="lg:col-span-6 lg:row-start-1">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/** Pill-free text link with a sliding underline. */
export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-medium ${dark ? 'text-white' : 'text-ink-900'}`}
    >
      <span className="relative">
        {children}
        <span className={`absolute left-0 -bottom-1 h-px w-full origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ${dark ? 'bg-white/40' : 'bg-ink-900/30'}`} />
        <span className="absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 delay-100 bg-brand-500" />
      </span>
      <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
    </Link>
  );
}

/** Round magnetic call-to-action with a fill-up hover. */
export function CircleLink({
  href,
  children,
  tone = 'brand',
}: {
  href: string;
  children: React.ReactNode;
  tone?: 'brand' | 'dark';
}) {
  const base = tone === 'brand' ? 'bg-brand-400 text-ink-950' : 'bg-ink-950 text-white';
  const fill = tone === 'brand' ? 'bg-white' : 'bg-brand-400';
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center text-center text-sm font-semibold overflow-hidden ${base}`}
      >
        <span className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full ${fill}`} />
        <span className={`relative px-4 transition-colors duration-500 ${tone === 'dark' ? 'group-hover:text-ink-950' : ''}`}>{children}</span>
      </Link>
    </Magnetic>
  );
}
