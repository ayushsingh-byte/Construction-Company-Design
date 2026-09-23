import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloating from '@/components/WhatsAppFloating';
import BackToTop from '@/components/BackToTop';
import PageLoader from '@/components/PageLoader';
import { COMPANY_INFO } from '@/data/companyData';

const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KELTCH ENGINEERING — Turnkey Substations, HT/LT Power & Fire Safety Infrastructure',
  description:
    'ISO 9001:2015 certified engineering firm specializing in 11kV/415V substations, 3 MVA transformers, turnkey HT/LT distribution, wet-riser fire systems, and LPS infrastructure across India.',
  keywords: [
    'Keltch Engineering',
    'Substation Installation Noida',
    '11kV Substation UP Delhi',
    '3 MVA Transformer Commissioning',
    'HT LT Cabling Contractors',
    'Wet Riser Fire Fighting Systems',
    'Lightning Protection LPS',
    'ISO 9001:2015 Electrical Contractor',
    'MSME Registered MEP Consultant'
  ],
  authors: [{ name: COMPANY_INFO.name }],
  openGraph: {
    title: 'KELTCH ENGINEERING — Turnkey Substations, HT/LT Power & Fire Safety Infrastructure',
    description:
      'Turnkey electrical distribution, 1000kV USS, HT/LT cabling, wet-riser fire fighting, and industrial safety infrastructure executed for leading enterprises.',
    url: 'https://keltchengineering.com',
    siteName: COMPANY_INFO.name,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-paper text-ink-900 flex flex-col font-sans">
        <PageLoader />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <BackToTop />
      </body>
    </html>
  );
}
