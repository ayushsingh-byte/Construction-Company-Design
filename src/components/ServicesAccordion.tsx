'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SERVICES } from '@/data/companyData';
import { SERVICE_ICONS } from '@/components/icons';
import { ArrowLink } from '@/components/Section';
import { EASE } from '@/components/motion';

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <div className="border-t border-ink-900/15">
      {SERVICES.map((s, i) => {
        const open = s.id === openId;
        const Icon = SERVICE_ICONS[s.iconName];
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }}
            className="border-b border-ink-900/15"
          >
            <button
              onClick={() => setOpenId(open ? null : s.id)}
              aria-expanded={open}
              className="group w-full flex items-center gap-6 sm:gap-10 py-7 sm:py-9 text-left"
            >
              <span className={`font-mono text-sm transition-colors duration-500 ${open ? 'text-brand-600' : 'text-ink-300'}`}>{s.number}</span>
              <span
                className={`flex-1 font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-2 ${
                  open ? 'text-ink-900' : 'text-ink-400 group-hover:text-ink-900'
                }`}
              >
                {s.title}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  open ? 'bg-brand-400 text-ink-950' : 'text-ink-900 group-hover:bg-ink-900 group-hover:text-white'
                }`}
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 sm:pl-[4.5rem]">
                    <div className="lg:col-span-5 space-y-6">
                      <Icon className="w-8 h-8 text-brand-600" strokeWidth={1.5} />
                      <p className="text-lg text-ink-500 leading-relaxed">{s.fullDesc}</p>
                      <ArrowLink href={`/services#${s.id}`}>Full scope</ArrowLink>
                    </div>
                    <ul className="lg:col-start-7 lg:col-span-6 divide-y divide-ink-900/10">
                      {s.deliverables.map((d, j) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + j * 0.06, duration: 0.5, ease: EASE }}
                          className="flex items-baseline gap-4 py-3.5 text-ink-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 translate-y-[-2px]" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
