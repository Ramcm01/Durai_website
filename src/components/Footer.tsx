import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Smartphone, 
  ArrowUp, 
  Calendar
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuickPay: () => void;
  onOpenEnroll: () => void;
  onOpenCircular: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenQuickPay,
  onOpenEnroll,
  onOpenCircular,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#140727] text-[#e9d5ff] text-xs font-['Source_Sans_3'] relative">
      {/* Top Gold Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Statutory Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#581c87] border border-[#f59e0b] flex items-center justify-center font-bold text-[#fde047] text-xl font-['Playfair_Display'] shadow-md">
                D
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight font-['Playfair_Display']">
                  DFINANCE
                </span>
                <p className="text-xs text-[#fde047]">
                  {COMPANY_INFO.legalName} • {COMPANY_INFO.proprietor}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#d8b4fe] leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline}. A registered and transparent indigenous savings initiative operated with direct accountability in Chromepet, Chennai.
            </p>

            <div className="pt-1">
              <span className="font-['Dancing_Script'] text-2xl text-[#fde047]">
                More Savings, Happier Families ♡
              </span>
            </div>

            {/* Statutory Compliance Box */}
            <div className="p-3.5 bg-purple-950/40 rounded-xl border border-purple-500/20 text-xs text-[#e9d5ff] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#fde047]">
                <ShieldCheck className="w-4 h-4 text-[#fde047]" />
                <span>Statutory Registration & Verification</span>
              </div>
              <p>• Udyam Reg. No: <strong className="text-white font-mono">{COMPANY_INFO.udyamRegNo}</strong></p>
              <p>• Aadhaar Identity: <strong className="text-white font-mono">{COMPANY_INFO.aadhaarNo}</strong></p>
              <p>• Proprietor: <strong className="text-white">{COMPANY_INFO.proprietor}</strong></p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-4 border-l-2 border-[#f59e0b] pl-3">
              Chit Schemes
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-[#fde047] transition-colors text-left"
                >
                  1 Chit Plan (₹4,000/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-[#fde047] transition-colors text-left"
                >
                  2 to 5 Chits Growth Bundles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-[#fde047] transition-colors text-left"
                >
                  10 Chits Mega Block (₹40,000/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#fde047] transition-colors text-left"
                >
                  4-Month Scheme Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCircular}
                  className="text-[#fde047] hover:underline transition-colors text-left font-bold"
                >
                  📄 Official Circular (Tamil / English)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuickPay}
                  className="text-white hover:text-[#fde047] transition-colors text-left font-semibold"
                >
                  💳 Quick Installment Pay Online
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-4 border-l-2 border-[#f59e0b] pl-3">
              Chromepet Registered Office
            </h4>
            <div className="space-y-2.5 text-xs text-[#e9d5ff]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#fde047] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{COMPANY_INFO.registeredOffice}</p>
                  <p className="text-[11px] text-purple-200 mt-0.5">{COMPANY_INFO.tamilAddress}</p>
                  <p className="text-[10px] text-purple-300 mt-0.5">{COMPANY_INFO.landmark}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fde047] shrink-0" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-white hover:text-[#fde047]">
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-purple-300"> / </span>
                  <a href={`tel:${COMPANY_INFO.secondaryPhone}`} className="font-bold text-white hover:text-[#fde047]">
                    {COMPANY_INFO.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Helpline: +91 {COMPANY_INFO.phone}</span>
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-purple-200">
                <Calendar className="w-4 h-4 text-[#fde047] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-purple-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-purple-300">
          <div>
            © {new Date().getFullYear()} DFinance (D Finance Chit Company). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCircular}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Circular Document
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Office Map & Hours
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#fde047] hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
