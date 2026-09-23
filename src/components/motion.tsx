'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useMotionValue, type Variants, type MotionValue } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades + rises into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal for headings. Pass plain text. */
export function SplitText({
  text,
  className,
  delay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } } : { animate: 'show' };

  return (
    <motion.span
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {' '}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}

/** Image that wipes open when it enters the viewport, with a slow parallax drift. */
export function ClipImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.3, ease: EASE }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/** Wrapper that pulls its child toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal text loop. */
export function Marquee({ items, reverse = false, className = '' }: { items: React.ReactNode[]; reverse?: boolean; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div className={`flex w-max animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {[...row, ...row].map((item, i) => (
          <span key={i} className="shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
