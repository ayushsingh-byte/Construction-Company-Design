'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES, Service } from '@/data/companyData';
import { SERVICE_ICONS } from '@/components/icons';
import { ArrowLink, CircleLink, PageHero } from '@/components/Section';
import { Reveal, SplitText } from '@/components/motion';

function ServiceSection({ service, onActive }: { service: Service; onActive: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  // "active" while the section crosses the middle of the viewport
  const inView = useInView(ref, { margin: '-45% 0px -50% 0px' });
  const Icon = SERVICE_ICONS[service.iconName];

  useEffect(() => {
    if (inView) onActive(service.id);
  }, [inView, onActive, service.id]);

  return (
    <section ref={ref} id={service.id} className="scroll-mt-24 py-20 border-t border-ink-900/15 first:border-0 first:pt-0">
      <div className="flex items-start justify-between gap-6">
        <span className="font-display text-8xl lg:text-9xl font-semibold leading-none tracking-tighter text-outline-dark">{service.number}</span>
        <Reveal>
          <Icon className="w-10 h-10 text-brand-600" strokeWidth={1.25} />
        </Reveal>
      </div>

      <h2 className="mt-8 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
        <SplitText text={service.title} inView />
      </h2>

      <Reveal delay={0.1}>
        <p className="mt-8 text-xl text-ink-500 leading-relaxed max-w-3xl">{service.fullDesc}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Reveal delay={0.15}>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400 mb-4">What&apos;s included</p>
          <ul className="border-t border-ink-900/10">
            {service.deliverables.map((d) => (
              <li key={d} className="py-4 border-b border-ink-900/10 text-ink-800">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-400 mb-4">Typical sites</p>
            <p className="text-lg text-ink-800 leading-relaxed">{service.applications.join(' · ')}</p>
          </div>
          <ArrowLink href={`/contact?service=${encodeURIComponent(service.title)}`}>Enquire about this service</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [active, setActive] = useState(SERVICES[0].id);

  return (
    <div className="bg-paper text-ink-900">
      <PageHero
        kicker="Services"
        title="Everything a facility needs to be powered and protected."
        description="Eight engineering disciplines delivered on a supply, installation, testing and commissioning (SITC) basis, individually or as one turnkey package."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-28 space-y-1" aria-label="Services">
            {SERVICES.map((s) => {
              const isActive = s.id === active;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`relative flex items-center gap-4 py-2.5 pl-5 text-sm transition-colors duration-300 ${
                    isActive ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="services-spy"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-brand-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="font-mono text-xs">{s.number}</span>
                  {s.title}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="lg:col-span-9">
          {SERVICES.map((s) => (
            <ServiceSection key={s.id} service={s} onActive={setActive} />
          ))}
        </div>
      </div>

      <section className="py-32 bg-ink-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight">
              <SplitText text="Need more than one discipline?" inView />
            </h2>
            <Reveal>
              <p className="text-lg text-ink-300 leading-relaxed max-w-2xl">
                Most projects combine power, fire and security. One contract means one schedule, one point of contact and no
                gaps between trades.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <CircleLink href="/contact">
              Discuss a<br />turnkey package
            </CircleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
