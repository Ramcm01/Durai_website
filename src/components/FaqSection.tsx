import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/chitData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-b border-[#e5e0d3] font-['Source_Sans_3']">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#8e1426]/10 text-[#8e1426] text-xs font-semibold mb-3">
            <HelpCircle className="w-4 h-4 text-[#8e1426]" />
            Clear & Transparent Answers
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#2c1b1b] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#57534e]">
            Everything you need to know about joining a chit fund, bidding processes, dividend distributions, and legal safeguards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[#e5e0d3] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 bg-[#faf8f4] hover:bg-[#f4f0e8] transition-colors cursor-pointer"
                >
                  <span className="font-['Playfair_Display'] font-bold text-base text-[#2c1b1b]">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-[#e5e0d3] flex items-center justify-center shrink-0 text-[#8e1426]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 bg-white text-sm text-[#57534e] leading-relaxed border-t border-[#e5e0d3]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
