'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectList from '@/components/ProjectList';
import { PROJECTS } from '@/data/companyData';
import { CircleLink, PageHero } from '@/components/Section';
import { ClipImage, EASE, Reveal, SplitText } from '@/components/motion';

type Tab = 'all' | 'executed' | 'under_execution';

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'executed', label: 'Completed' },
  { id: 'under_execution', label: 'In progress' },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const count = (t: Tab) => (t === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.status === t).length);
  const filtered = PROJECTS.filter((p) => activeTab === 'all' || p.status === activeTab);

  return (
    <div className="bg-paper text-ink-900">
      <PageHero
        kicker="Projects"
        title="Work that's energised, tested and in daily use."
        description="Completed and ongoing contracts across food processing, footwear, education, real estate and government, from 11kV substations to complete office-cum-residential complexes."
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="flex gap-14"
        >
          <div>
            <p className="font-display text-6xl font-semibold">{count('executed')}</p>
            <p className="text-sm text-ink-400 mt-2">Completed</p>
          </div>
          <div>
            <p className="font-display text-6xl font-semibold text-brand-400">{count('under_execution')}</p>
            <p className="text-sm text-ink-400 mt-2">In progress</p>
          </div>
        </motion.div>
      </PageHero>

      {/* Image strip */}
      <div className="bg-ink-950 px-4 sm:px-6 lg:px-8 pb-4 grid grid-cols-12 gap-4">
        <ClipImage src={PROJECTS[4].image} alt={PROJECTS[4].client} sizes="60vw" priority className="col-span-12 md:col-span-7 h-[50vh] lg:h-[70vh] rounded-2xl" />
        <ClipImage src={PROJECTS[9].image} alt={PROJECTS[9].client} sizes="40vw" className="hidden md:block md:col-span-5 h-[50vh] lg:h-[70vh] rounded-2xl" />
      </div>

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              <SplitText text="Project index" inView />
            </h2>
            <div className="flex gap-8" role="tablist" aria-label="Filter projects">
              {TABS.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative pb-2 text-sm transition-colors ${isActive ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'}`}
                  >
                    {t.label} <sup className="font-mono text-[10px]">{count(t.id)}</sup>
                    {isActive && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-brand-500"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <ProjectList projects={filtered} />
        </div>
      </section>

      <section className="py-32 bg-ink-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight">
              <SplitText text="Planning something similar?" inView />
            </h2>
            <Reveal>
              <p className="text-lg text-ink-300 leading-relaxed max-w-2xl">
                Tell us about your site and we&apos;ll show you how we would approach it, from load study to handover.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <CircleLink href="/contact">Discuss your project</CircleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
