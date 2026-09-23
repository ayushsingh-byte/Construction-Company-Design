'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '@/data/companyData';
import { PageHero } from '@/components/Section';
import { EASE, Magnetic, Reveal } from '@/components/motion';

const inputClass =
  'peer w-full bg-transparent border-0 border-b border-ink-900/20 text-ink-900 placeholder-ink-300 px-0 py-4 text-lg focus:outline-none focus:border-ink-900 transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group relative block">
      <span className="text-xs uppercase tracking-[0.18em] text-ink-400 group-focus-within:text-brand-600 transition-colors">{label}</span>
      {children}
      <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full bg-brand-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
    </label>
  );
}

function ContactForm() {
  const params = useSearchParams();
  const preselected = SERVICES.find((s) => s.title === params.get('service'))?.title ?? SERVICES[0].title;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceType: preselected,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-16 space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-16 h-16 bg-brand-400 text-ink-950 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <h3 className="text-4xl font-semibold tracking-tight">Thanks, we&apos;ve got your enquiry.</h3>
            <p className="text-lg text-ink-500 max-w-md">
              Our team will review your requirements and get back to you by phone or email within one working day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 text-sm font-semibold bg-ink-950 text-white rounded-full hover:bg-ink-800 transition-colors"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Tell us about your project</h2>
              <p className="text-ink-500 mt-3">A few details are enough to get started. We&apos;ll follow up for drawings.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
              <Field label="Full name *">
                <input type="text" required value={formData.name} onChange={set('name')} placeholder="Rajesh Sharma" className={inputClass} />
              </Field>
              <Field label="Company">
                <input type="text" value={formData.company} onChange={set('company')} placeholder="Company or organisation" className={inputClass} />
              </Field>
              <Field label="Phone *">
                <input type="tel" required value={formData.phone} onChange={set('phone')} placeholder="98765 43210" className={inputClass} />
              </Field>
              <Field label="Email *">
                <input type="email" required value={formData.email} onChange={set('email')} placeholder="name@company.com" className={inputClass} />
              </Field>
            </div>

            <Field label="Service required *">
              <select value={formData.serviceType} onChange={set('serviceType')} className={inputClass}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Project details *">
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={set('message')}
                placeholder="Site location, building type, approximate load or transformer rating, fire-safety requirements, timeline..."
                className={inputClass}
              />
            </Field>

            <Magnetic strength={0.2}>
              <button
                type="submit"
                className="group relative overflow-hidden inline-flex items-center gap-3 pl-8 pr-7 py-5 bg-ink-950 text-white font-semibold rounded-full"
              >
                <span className="absolute inset-0 bg-brand-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative group-hover:text-ink-950 transition-colors duration-500">Send enquiry</span>
                <ArrowRight className="relative w-4 h-4 group-hover:text-ink-950 group-hover:translate-x-1 transition-all duration-500" />
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contacts.whatsapp}?text=${encodeURIComponent(
    'Hello Keltch Engineering, I would like to discuss an engineering project.'
  )}`;

  const channels = [
    {
      icon: Phone,
      label: 'Call us',
      value: COMPANY_INFO.contacts.formattedPhone,
      href: `tel:${COMPANY_INFO.contacts.phone}`,
      note: 'Mon to Sat, 9am to 7pm',
    },
    {
      icon: Mail,
      label: 'Email',
      value: COMPANY_INFO.contacts.primaryEmail,
      href: `mailto:${COMPANY_INFO.contacts.primaryEmail}`,
      note: 'Send drawings and BOQs here',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: 'Chat with our team',
      href: whatsappUrl,
      note: 'Fastest for site photos',
    },
  ];

  return (
    <div className="bg-paper text-ink-900">
      <PageHero
        kicker="Contact"
        title="Let's talk about your site."
        description="Share your project and we'll arrange a site survey, assess the load and fire-safety requirements, and send a clear scope with quotation."
      />

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-16">
            <div className="border-t border-ink-900/15">
              {channels.map(({ icon: Icon, label, value, href, note }, i) => (
                <Reveal key={label} delay={i * 0.08} y={16}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 py-7 border-b border-ink-900/15"
                  >
                    <Icon className="w-5 h-5 mt-1.5 text-brand-600 shrink-0" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.18em] text-ink-400">{label}</span>
                      <span className="block mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight break-all transition-transform duration-500 group-hover:translate-x-2">
                        {value}
                      </span>
                      <span className="block text-sm text-ink-400 mt-1">{note}</span>
                    </span>
                    <ArrowRight className="w-5 h-5 mt-1.5 text-ink-300 -rotate-45 group-hover:rotate-0 group-hover:text-brand-600 transition-all duration-500" />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal className="space-y-3">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink-400">
                <MapPin className="w-4 h-4 text-brand-600" /> Head office, Noida
              </p>
              <p className="text-lg text-ink-700 leading-relaxed">{COMPANY_INFO.officeAddress.full}</p>
              <p className="flex items-center gap-2 text-sm text-ink-400">
                <Clock className="w-4 h-4" /> Site visits across Delhi-NCR and North India
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-start-7 lg:col-span-6">
            <Suspense>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
