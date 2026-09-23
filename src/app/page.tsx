'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Building2, Factory, Warehouse, Activity, GraduationCap, Home } from 'lucide-react';
import StatCounter from '@/components/StatCounter';
import { intro } from '@/components/PageLoader';
import ServicesAccordion from '@/components/ServicesAccordion';
import ProjectList from '@/components/ProjectList';
import { EASE, Marquee, Reveal, ScrollText, SplitText, Stagger, StaggerItem } from '@/components/motion';
import { ArrowLink, CircleLink, Kicker, SectionHeading } from '@/components/Section';
import { COMPANY_INFO, SERVICES, PROJECTS, CREDENTIALS, SECTORS } from '@/data/companyData';

const CLIENTS = ["Haldiram's", 'Relaxo Footwear', 'Multibud Foods', 'Gyanshree School', 'Rattan Singh Builders'];
const ROTATING = ['factories.', 'hospitals.', 'campuses.', 'warehouses.', 'offices.'];

const sectorIconMap: Record<string, React.ElementType> = { Building2, Factory, Warehouse, Activity, GraduationCap, Home };

const PROCESS = [
  {
    title: 'Survey & load study',
    body: 'We walk the site, study the drawings and calculate connected load, fire-risk category and cable routes before anything is quoted.',
  },
  {
    title: 'Design & BOQ',
    body: 'Single-line diagrams, panel schedules, riser layouts and a line-item bill of quantities you can check against the drawings.',
  },
  {
    title: 'Procurement',
    body: 'Transformers, panels, cables, pumps and detectors sourced from approved makes, inspected and delivered on schedule.',
  },
  {
    title: 'Installation',
    body: 'Our own teams install and terminate, with critical works like HT terminations and pump rooms supervised by the founder.',
  },
  {
    title: 'Testing & handover',
    body: 'Insulation, earth-resistance and pressure tests, load trials and as-built documents, followed by a clean handover.',
  },
];

const WHY = [
  {
    title: 'Founder on site',
    body: `${COMPANY_INFO.founder.experienceYears}+ years of field experience, directly supervising every contract rather than delegating it away.`,
  },
  {
    title: 'One accountable contractor',
    body: 'Power, fire, security and lightning protection under one scope, so nothing falls through the gaps between trades.',
  },
  {
    title: 'Built to code',
    body: 'Execution aligned with IS codes and the National Building Code, documented and tested before handover.',
  },
  {
    title: 'Certified & registered',
    body: `${COMPANY_INFO.isoCert} quality system, MSME registered and GST compliant for institutional contracting.`,
  },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING[i]}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-block text-brand-400"
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  // wait for the loader curtain on first visit only
  const [d] = useState(() => (intro.done ? 0 : 1.2));

  return (
    <section className="bg-ink-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24 min-h-[calc(100svh-72px)] flex flex-col justify-between gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: d }}
          className="flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.2em] text-ink-400"
        >
          <span>Electrical · Substations · Fire safety</span>
          <span>Noida — Est. {COMPANY_INFO.establishedYear}</span>
        </motion.div>

        <h1 className="font-display font-semibold tracking-[-0.045em] text-[15vw] sm:text-[12vw] lg:text-[128px] leading-[0.92]">
          <SplitText text="We power" delay={d + 0.05} />
          <br />
          <SplitText text="and protect" delay={d + 0.2} />
          <br />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.55, duration: 0.6 }}>
            <RotatingWord />
          </motion.span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.7, ease: EASE }}
            className="lg:col-span-5 text-lg text-ink-300 leading-relaxed"
          >
            Substations, HT/LT power distribution and fire-fighting systems, designed, supplied, installed and
            commissioned by one founder-led team. ISO 9001:2015 certified.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.85, ease: EASE }}
            className="lg:col-start-8 lg:col-span-5 flex items-center justify-between lg:justify-end gap-10"
          >
            <span className="hidden sm:flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-400">
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <ArrowDown className="w-4 h-4" />
              </motion.span>
              Scroll
            </span>
            <CircleLink href="/contact">
              Request a<br />site survey
            </CircleLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Image that widens from inset to full-bleed as it scrolls into view. */
function ExpandingImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 15%'] });
  const inset = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <div ref={ref} className="bg-ink-950">
      <motion.div style={{ clipPath }} className="relative h-[70vh] lg:h-[92vh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2400&q=80"
            alt="Electrician working on industrial switchgear"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Process() {
  const target = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section ref={target} style={{ height: `calc(100vh + ${distance}px)` }} className="relative bg-ink-950 text-white">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div ref={track} style={{ x }} className="flex items-stretch w-max pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="w-[85vw] sm:w-[60vw] lg:w-[34rem] shrink-0 pr-16 flex flex-col justify-center gap-8">
            <Kicker dark index="03">How we deliver</Kicker>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98]">From first survey to final handover.</h2>
            <p className="text-ink-300 leading-relaxed max-w-sm">
              Five stages, the same on every project, so you always know what is happening on site and who is responsible.
            </p>
          </div>

          {PROCESS.map((step, i) => (
            <div key={step.title} className="w-[80vw] sm:w-[50vw] lg:w-[26rem] shrink-0 pr-12 lg:pr-16 flex flex-col justify-center">
              <span className="font-display text-[140px] lg:text-[180px] font-semibold leading-none text-outline-light tracking-tighter">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-8 pt-8 border-t border-white/15 space-y-4">
                <h3 className="text-2xl lg:text-3xl font-semibold">{step.title}</h3>
                <p className="text-ink-300 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        <div className="absolute bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:right-[max(2rem,calc((100vw-80rem)/2+2rem))] h-px bg-white/10">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-brand-400 origin-left" />
        </div>
      </div>
    </section>
  );
}

function BigCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-25%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-25%', '5%']);

  return (
    <section ref={ref} className="bg-paper py-32 overflow-hidden">
      <div className="font-display font-semibold tracking-[-0.045em] text-[18vw] lg:text-[200px] leading-[0.9] text-ink-900 whitespace-nowrap">
        <motion.div style={{ x: x1 }}>Let&apos;s power</motion.div>
        <motion.div style={{ x: x2 }} className="text-outline-dark">
          your next site
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-6">
          <p className="text-xl text-ink-500 leading-relaxed">
            Send us your drawings or a rough scope. We&apos;ll visit, assess the load and fire-safety needs, and come back
            with a clear execution plan and quotation.
          </p>
        </Reveal>
        <div className="lg:col-start-9 lg:col-span-4 flex items-center gap-8">
          <CircleLink href="/contact" tone="dark">
            Start a project
          </CircleLink>
          <a
            href={`https://wa.me/${COMPANY_INFO.contacts.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900"
          >
            WhatsApp us
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="bg-paper text-ink-900">
      <Hero />
      <ExpandingImage />

      {/* STATEMENT */}
      <section className="py-32 lg:py-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <Kicker index="01">Who we are</Kicker>
            </Reveal>
          </div>
          <div className="lg:col-span-9 space-y-12">
            <ScrollText
              className="font-display text-3xl sm:text-4xl lg:text-[52px] font-medium leading-[1.15] tracking-tight text-ink-900"
              text={`Keltch Engineering is a founder-led electrical and fire-safety contractor. Since ${COMPANY_INFO.establishedYear} we have energised factories, schools and warehouses across North India, planned in detail, supervised in person and tested before handover.`}
            />
            <Reveal>
              <ArrowLink href="/about">Our story</ArrowLink>
            </Reveal>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 grid grid-cols-2 lg:grid-cols-4 gap-y-14">
          {[
            <StatCounter key="y" value={Number(COMPANY_INFO.establishedYear)} static label="Established" sublabel="Noida, Uttar Pradesh" />,
            <StatCounter key="p" value={PROJECTS.length} suffix="+" label="Projects" sublabel="Delivered & active" />,
            <StatCounter key="s" value={SERVICES.length} label="Disciplines" sublabel="Under one contract" />,
            <StatCounter key="e" value={COMPANY_INFO.founder.experienceYears} suffix="+" label="Years" sublabel="Founder field experience" />,
          ].map((stat, i) => (
            <div key={i} className="pl-6 border-l border-ink-900/15">
              {stat}
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-14 border-y border-ink-900/10">
        <Marquee
          items={CLIENTS.map((c) => (
            <span key={c} className="flex items-center gap-12 pr-12 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-ink-900/80">
              {c}
              <span className="w-3 h-3 rounded-full bg-brand-400" />
            </span>
          ))}
        />
      </section>

      {/* SERVICES */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            index="02"
            kicker="What we do"
            title="Eight disciplines, one accountable team."
            description="Take one service or combine them into a single turnkey contract. Open any line to see exactly what is included."
          />
          <ServicesAccordion />
        </div>
      </section>

      <Process />

      {/* SECTORS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <SectionHeading
            index="04"
            kicker="Sectors"
            title="For buildings where downtime isn't an option."
            description="Different facilities fail in different ways. We design each system around how the building actually runs."
          />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {SECTORS.map((sector) => {
              const Icon = sectorIconMap[sector.icon] || Building2;
              return (
                <StaggerItem key={sector.title} className="group pt-8 border-t border-ink-900/15">
                  <div className="flex items-center justify-between mb-10">
                    <Icon className="w-7 h-7 text-brand-600 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.5} />
                    <span className="text-xs text-ink-400">{sector.badge}</span>
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight mb-4 transition-transform duration-500 group-hover:translate-x-2">{sector.title}</h3>
                  <p className="text-ink-500 leading-relaxed">{sector.description}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-32 bg-ink-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            dark
            index="05"
            kicker="Selected work"
            title="Energised, tested and handed over."
            description="Hover a project to preview it, click to see the scope we delivered."
          />
          <ProjectList projects={PROJECTS.slice(0, 6)} dark />
          <Reveal>
            <ArrowLink href="/projects" dark>
              All {PROJECTS.length} projects
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <SectionHeading index="06" kicker="Why Keltch" title="Why clients choose us." />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            {WHY.map((w, i) => (
              <StaggerItem key={w.title} className="pt-8 border-t border-ink-900/15">
                <span className="font-mono text-sm text-brand-600">0{i + 1}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight mb-3">{w.title}</h3>
                <p className="text-ink-500 leading-relaxed">{w.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="flex flex-wrap gap-x-12 gap-y-4 pt-10 border-t border-ink-900/10 text-sm text-ink-500">
            {CREDENTIALS.map((c) => (
              <span key={c.title}>
                <span className="text-ink-900 font-medium">{c.title}</span> · <span className="font-mono">{c.regNumber}</span>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <BigCTA />
    </div>
  );
}
