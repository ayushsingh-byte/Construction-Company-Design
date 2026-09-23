'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COMPANY_INFO, SERVICES } from '@/data/companyData';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = 'group relative inline-block text-ink-300 hover:text-white transition-colors';
  const underline = <span className="absolute left-0 -bottom-0.5 h-px w-full bg-brand-400 origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500" />;
  return external ? (
    <a href={href} className={cls}>
      {children}
      {underline}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {underline}
    </Link>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);

  return (
    <footer ref={ref} className="bg-ink-950 text-ink-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
          <div className="md:col-span-5 space-y-6">
            <p className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight tracking-tight">
              Have a project in mind?
            </p>
            <a
              href={`mailto:${COMPANY_INFO.contacts.primaryEmail}`}
              className="group inline-flex items-center gap-3 font-display text-xl sm:text-2xl text-brand-400 break-all"
            >
              {COMPANY_INFO.contacts.primaryEmail}
              <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
            </a>
          </div>

          <div className="md:col-span-2 space-y-5 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Menu</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Services</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <FooterLink href={`/services#${s.id}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-5 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Office</p>
            <p className="leading-relaxed">{COMPANY_INFO.officeAddress.full}</p>
            <FooterLink href={`tel:${COMPANY_INFO.contacts.phone}`} external>
              {COMPANY_INFO.contacts.formattedPhone}
            </FooterLink>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 py-6 border-t border-white/10 text-xs text-ink-500">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName} · {COMPANY_INFO.isoCert} · GSTIN {COMPANY_INFO.gstin}
          </p>
          <p>
            Photography is representative ·{' '}
            <a href="https://gigplux.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink-200 transition-colors">
              Built by gigplux
            </a>
          </p>
        </div>
      </div>

      <motion.p
        style={{ y }}
        aria-hidden
        className="font-display font-semibold text-[23vw] leading-[0.75] tracking-[-0.06em] text-center text-white/[0.06] select-none -mb-[2vw]"
      >
        KELTCH
      </motion.p>
    </footer>
  );
}
