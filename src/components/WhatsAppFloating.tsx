'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '@/data/companyData';

export default function WhatsAppFloating() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contacts.whatsapp}?text=${encodeURIComponent(
    'Hello Keltch Engineering, I would like to discuss an engineering project requirement.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-950/50 flex items-center justify-center transition-transform hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
      aria-label="Direct WhatsApp Inquiry with Keltch Engineering"
    >
      <MessageSquare className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pl-0 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </a>
  );
}
