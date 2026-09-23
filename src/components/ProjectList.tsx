'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Project } from '@/data/companyData';
import { EASE } from '@/components/motion';

/**
 * Editorial project index. Desktop: a preview image follows the cursor over each row.
 * Click a row to expand its scope and highlights.
 */
export default function ProjectList({ projects, dark = false }: { projects: Project[]; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const line = dark ? 'border-white/15' : 'border-ink-900/15';
  const muted = 'text-ink-400';
  const strong = dark ? 'text-white' : 'text-ink-900';

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setHovered(null)} className={`relative border-t ${line}`}>
      {/* Cursor-following preview (pointer devices only) */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
      >
        <AnimatePresence>
          {hovered !== null && openId === null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative -translate-x-1/2 -translate-y-1/2 w-80 h-56 overflow-hidden rounded-lg shadow-2xl"
            >
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  animate={{ opacity: i === hovered ? 1 : 0, scale: i === hovered ? 1 : 1.15 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={p.image} alt="" fill sizes="320px" className="object-cover" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((p, i) => {
          const open = openId === p.id;
          return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`border-b ${line}`}
              onMouseEnter={() => setHovered(i)}
            >
              <button
                onClick={() => setOpenId(open ? null : p.id)}
                aria-expanded={open}
                className="group w-full grid grid-cols-12 items-center gap-4 py-7 text-left"
              >
                <span className={`col-span-12 md:col-span-6 font-display text-2xl sm:text-3xl font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-3 ${strong}`}>
                  {p.client}
                </span>
                <span className={`col-span-6 md:col-span-3 text-sm ${muted}`}>{p.location}</span>
                <span className="col-span-5 md:col-span-2 text-sm flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'executed' ? 'bg-emerald-500' : 'bg-brand-500 animate-pulse'}`} />
                  <span className={muted}>{p.status === 'executed' ? 'Completed' : 'In progress'}</span>
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`col-span-1 justify-self-end ${strong}`}
                >
                  <Plus className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
                      <motion.div
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                        className="md:col-span-5 relative h-64 overflow-hidden rounded-lg"
                      >
                        <Image src={p.image} alt={`${p.client}, ${p.location}`} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                      </motion.div>
                      <div className="md:col-span-7 space-y-6">
                        <p className={`text-xs uppercase tracking-[0.18em] ${dark ? 'text-brand-400' : 'text-brand-600'}`}>{p.category}</p>
                        <p className={`text-lg leading-relaxed ${dark ? 'text-ink-200' : 'text-ink-600'}`}>{p.scope}</p>
                        <ul className={`divide-y ${dark ? 'divide-white/10' : 'divide-ink-900/10'}`}>
                          {p.keyHighlights.map((h) => (
                            <li key={h} className={`py-3 text-sm ${dark ? 'text-ink-300' : 'text-ink-500'}`}>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
