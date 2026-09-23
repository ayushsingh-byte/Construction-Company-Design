'use client';

import React from 'react';
import { COMPANY_INFO, CREDENTIALS } from '@/data/companyData';
import { ArrowLink, Kicker, PageHero, SectionHeading } from '@/components/Section';
import { ClipImage, Reveal, ScrollText, Stagger, StaggerItem } from '@/components/motion';

const FACTS = [
  { label: 'Legal name', value: COMPANY_INFO.legalName },
  { label: 'Registered on', value: COMPANY_INFO.incorporationDate },
  { label: 'MSME (Udyam)', value: COMPANY_INFO.msmeReg },
  { label: 'GSTIN', value: COMPANY_INFO.gstin },
  { label: 'Quality system', value: COMPANY_INFO.isoCert },
  { label: 'ISO scope', value: 'Electrical, security & civil works' },
];

const HABITS = [
  {
    title: 'Plan before we pull cable',
    body: 'Load studies, single-line diagrams and cable schedules are fixed before work starts, which keeps sites clean and budgets predictable.',
  },
  {
    title: 'Supervise what matters',
    body: 'HT terminations, transformer commissioning and pump-room work are personally supervised. These are the jobs that cannot be redone.',
  },
  {
    title: 'Test, then hand over',
    body: 'Every installation is tested for insulation, earthing and pressure and documented before the client takes charge of it.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink-900">
      <PageHero
        kicker="About us"
        title="Engineering that's planned, supervised and proven."
        description="Keltch Engineering is a Noida-based electrical and fire-safety contractor delivering substations, power distribution, fire-fighting and low-voltage systems for industry, institutions and commercial real estate."
      />

      <div className="bg-ink-950 px-4 sm:px-6 lg:px-8 pb-4">
        <ClipImage
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80"
          alt="Engineer reviewing construction drawings on site"
          priority
          className="h-[60vh] lg:h-[80vh] rounded-2xl"
        />
      </div>

      {/* STORY */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Kicker index="01">Our story</Kicker>
            </Reveal>
          </div>
          <div className="lg:col-span-9 space-y-16">
            <ScrollText
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight"
              text={`Keltch Engineering was founded in ${COMPANY_INFO.establishedYear} by ${COMPANY_INFO.founder.name} after fourteen years on some of North India's toughest electrical and fire-safety sites.`}
            />
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg text-ink-500 leading-relaxed">
              <p>
                Before starting Keltch, he spent {COMPANY_INFO.founder.experienceYears} years at {COMPANY_INFO.founder.priorCompany},
                working on high-voltage substations, industrial power distribution and fire-fighting pump rooms.
              </p>
              <p>
                Today our teams handle the complete cycle, from design through supply, installation, testing and commissioning,
                for clients including Haldiram&apos;s, Relaxo Footwear, Multibud Foods and Gyanshree School.
              </p>
            </Reveal>

            <dl className="border-t border-ink-900/15">
              {FACTS.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.04} y={12}>
                  <div className="grid grid-cols-12 gap-4 py-5 border-b border-ink-900/15">
                    <dt className="col-span-12 sm:col-span-4 text-sm text-ink-400">{f.label}</dt>
                    <dd className="col-span-12 sm:col-span-8 font-mono text-ink-900">{f.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-32 bg-ink-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="font-display text-[160px] sm:text-[220px] leading-[0.8] font-semibold tracking-tighter text-outline-brand">
              {COMPANY_INFO.founder.experienceYears}+
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-ink-400">Years in the field</p>
          </Reveal>
          <div className="lg:col-span-7 space-y-10">
            <SectionHeading dark index="02" kicker="Leadership" title="Led by an engineer who still walks the site." />
            <Reveal className="space-y-5 text-lg text-ink-300 leading-relaxed">
              <p>
                {COMPANY_INFO.founder.name} worked under senior management at {COMPANY_INFO.founder.priorCompany} on large
                electrical and fire-safety contracts: HT substations, industrial cable-tray routing, DG synchronisation panels and
                wet-riser pump rooms, all to NBC and IS codes.
              </p>
              <p>That same standard is applied to every Keltch project.</p>
            </Reveal>
            <Reveal>
              <p className="font-display text-2xl font-semibold">{COMPANY_INFO.founder.name}</p>
              <p className="text-brand-400 text-sm mt-1">{COMPANY_INFO.founder.role}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HABITS */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <SectionHeading index="03" kicker="How we work" title="Three habits behind every project." />
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
            {HABITS.map((h, i) => (
              <StaggerItem key={h.title} className="pt-8 border-t border-ink-900/15">
                <span className="font-display text-7xl font-semibold text-outline-dark">0{i + 1}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight mb-3">{h.title}</h3>
                <p className="text-ink-500 leading-relaxed">{h.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            index="04"
            kicker="Certifications"
            title="Registered, certified and compliant."
            description="The registrations that let us contract with institutions, government bodies and large enterprises."
          />
          <div className="border-t border-ink-900/15">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-4 py-10 border-b border-ink-900/15">
                  <h3 className="lg:col-span-4 text-3xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {c.title}
                  </h3>
                  <p className="lg:col-span-5 text-ink-500 leading-relaxed">{c.description}</p>
                  <div className="lg:col-span-3 lg:text-right space-y-1 text-sm">
                    <p className="font-mono text-ink-900">{c.regNumber}</p>
                    <p className="text-ink-400">{c.authority}</p>
                    <p className="text-ink-400">Issued {c.issuedDate}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading index="05" kicker="Offices" title="Where to find us." />
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <StaggerItem className="pt-8 border-t border-ink-900/15 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600">Head office</p>
              <p className="font-display text-2xl leading-snug">{COMPANY_INFO.officeAddress.full}</p>
              <p className="text-ink-500">
                {COMPANY_INFO.contacts.formattedPhone} · {COMPANY_INFO.contacts.primaryEmail}
              </p>
            </StaggerItem>
            <StaggerItem className="pt-8 border-t border-ink-900/15 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600">Registered address</p>
              <p className="font-display text-2xl leading-snug">{COMPANY_INFO.registeredAddress.full}</p>
              <ArrowLink href="/contact">Get in touch</ArrowLink>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </div>
  );
}
