'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { EASE } from '@/components/motion';
import { COMPANY_INFO } from '@/data/companyData';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Keltch Engineering home">
      <span className="relative w-9 h-9 rounded-full bg-brand-400 text-ink-950 flex items-center justify-center font-display font-bold text-sm tracking-tight transition-transform duration-500 group-hover:rotate-[360deg]">
        KE
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-white">Keltch Engineering</span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-400 mt-1">Delivering excellence</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Native listener: framer's scrollY change event can skip the final position after a jump.
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: EASE }}
      className="sticky top-0 z-50 w-full"
    >
      <nav
        className={`relative transition-colors duration-500 ${
          scrolled ? 'bg-ink-950/80 backdrop-blur-xl' : 'bg-ink-950'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm transition-colors ${active ? 'text-white' : 'text-ink-300 hover:text-white'}`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -bottom-1 -ml-[3px] w-1.5 h-1.5 rounded-full bg-brand-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="group hidden md:inline-flex items-center gap-2 pl-5 pr-4 py-2.5 text-sm font-semibold text-ink-950 bg-brand-400 hover:bg-brand-300 rounded-full transition-colors"
          >
            Get a quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            type="button"
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-brand-400" />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="md:hidden fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] bg-ink-950 flex flex-col justify-between px-6 pt-8 pb-10"
          >
            <nav className="space-y-2">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.15 + 0.06 * i, duration: 0.7, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-baseline gap-4 font-display text-5xl font-semibold ${
                        pathname === link.href ? 'text-brand-400' : 'text-white'
                      }`}
                    >
                      <span className="font-mono text-xs text-ink-500">0{i + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-1 text-sm text-ink-400">
              <p>{COMPANY_INFO.contacts.formattedPhone}</p>
              <p>{COMPANY_INFO.contacts.primaryEmail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
