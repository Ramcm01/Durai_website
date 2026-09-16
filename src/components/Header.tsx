import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  CreditCard, 
  FileText,
  Sparkles,
  Gift,
  Globe,
  Mail
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenQuickPay: () => void;
  onOpenEnroll: (schemeId?: string) => void;
  onOpenCircular: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuickPay,
  onOpenEnroll,
  onOpenCircular,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'schemes', label: t.navSchemes },
    { id: 'calculator', label: t.navCalculator },
    { id: 'circular', label: t.navCircular },
    { id: 'vacant', label: t.navRunning },
    { id: 'how-it-works', label: t.navHowItWorks },
    { id: 'why-us', label: t.navAbout },
    { id: 'contact', label: t.navOffice },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'circular') {
      onOpenCircular();
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f4]/95 backdrop-blur-md border-b border-[#e5e0d3] shadow-xs transition-all duration-200">
      {/* Top Banner with Rich South Indian Crimson Red matching Jayasulochana Chits */}
      <div className="bg-[#8e1426] text-white py-1.5 px-4 text-xs font-['Source_Sans_3']">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#fce8b3] bg-black/25 px-2.5 py-0.5 rounded-full border border-[#d79628]/40 text-[11px]">
              <Sparkles className="w-3 h-3 text-[#fce8b3]" />
              UDYAM: {COMPANY_INFO.udyamRegNo}
            </span>
            <span className="text-[#fce8b3]/90 font-medium">
              📞 Call / WhatsApp: <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-white hover:underline">{COMPANY_INFO.phone}</a> | ✉️ <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-white hover:underline">{COMPANY_INFO.email}</a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-white text-xs flex-wrap justify-center font-bold">
            <span className="hidden md:inline-flex items-center gap-1 text-[#f8e7b9]">
              <MapPin className="w-3 h-3 text-[#d79628]" />
              {t.chromepetOffice}
            </span>

            <span className="text-white/40 hidden md:inline">•</span>

            {/* Bilingual Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-black/25 border border-[#d79628]/40">
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-[#d79628] text-[#2c1b1b] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#d79628] text-[#2c1b1b] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* DFinance Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8e1426] p-0.5 shadow-md group-hover:scale-105 transition-all border border-[#d79628]">
              <div className="w-full h-full bg-[#720f1e] rounded-[10px] flex items-center justify-center font-bold text-2xl text-[#d79628] font-['Playfair_Display']">
                <span>D</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#8e1426] font-['Playfair_Display']">
                  DFINANCE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d79628] text-[#2c1b1b] px-2 py-0.5 rounded font-['Source_Sans_3']">
                  CHITS
                </span>
              </div>
              <p className="text-xs text-[#57534e] font-medium font-['Source_Sans_3']">
                Lakshmi Puram, Chromepet, Chennai - 44
              </p>
            </div>
          </div>

          {/* Desktop Nav Links with Jayasulochana Hover Underline */}
          <nav className="hidden xl:flex items-center gap-1 font-['Source_Sans_3']">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer relative group ${
                  activeSection === item.id
                    ? 'text-[#8e1426] font-bold'
                    : 'text-[#34322d] hover:text-[#8e1426]'
                }`}
              >
                <span>{item.label}</span>
                <span 
                  className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#8e1426] transition-transform duration-200 origin-left ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </button>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden lg:flex items-center gap-2.5 font-['Source_Sans_3']">
            {/* Language Switcher */}
            <div className="flex items-center p-1 rounded-lg bg-white border border-[#e5e0d3] shadow-2xs mr-1">
              <Globe className="w-3.5 h-3.5 text-[#8e1426] ml-1.5 mr-1" />
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-2 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-[#8e1426] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#2c1b1b]'
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#8e1426] text-white shadow-xs'
                    : 'text-[#57534e] hover:text-[#2c1b1b]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onOpenCircular}
              id="header-circular-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border-2 border-[#d79628] text-[#d79628] hover:bg-[#d79628]/10 text-xs font-bold transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#d79628]" />
              <span>{t.btnPdfCircular}</span>
            </button>

            <button
              onClick={onOpenQuickPay}
              id="header-quickpay-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#e5e0d3] bg-white hover:bg-[#faf8f4] text-[#8e1426] text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <CreditCard className="w-4 h-4 text-[#8e1426]" />
              <span>{t.btnPayOnline}</span>
            </button>

            <button
              onClick={() => onOpenEnroll()}
              id="header-enroll-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#8e1426] hover:bg-[#720f1e] text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-105"
            >
              <Gift className="w-4 h-4 text-[#d79628]" />
              <span>{t.btnJoinScheme}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-[#d79628] bg-white text-[#8e1426] text-xs font-bold flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#8e1426]" />
              <span>{language === 'ta' ? 'EN' : 'தமிழ்'}</span>
            </button>

            <button
              onClick={onOpenQuickPay}
              className="px-3 py-1.5 rounded-lg bg-[#8e1426] text-white text-xs font-bold sm:hidden"
            >
              Pay
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#2c1b1b] hover:bg-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#8e1426]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf8f4] border-b border-[#e5e0d3] px-4 pt-3 pb-6 space-y-3 shadow-xl font-['Source_Sans_3']">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#e5e0d3]">
            <span className="text-xs font-bold text-[#2c1b1b] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#8e1426]" />
              Language / மொழி
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  language === 'ta'
                    ? 'bg-[#8e1426] text-white'
                    : 'bg-[#faf8f4] text-[#34322d] border border-[#e5e0d3]'
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  language === 'en'
                    ? 'bg-[#8e1426] text-white'
                    : 'bg-[#faf8f4] text-[#34322d] border border-[#e5e0d3]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenCircular();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-white text-[#d79628] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#d79628] shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#d79628]" />
              <span>{t.btnPdfCircular}</span>
            </button>
            <button
              onClick={() => {
                onOpenQuickPay();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg bg-white text-[#8e1426] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#e5e0d3]"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#8e1426]" />
              <span>{t.btnPayOnline}</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#8e1426] text-white font-bold'
                    : 'text-[#34322d] hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#e5e0d3]">
            <button
              onClick={() => {
                onOpenEnroll();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-lg bg-[#8e1426] hover:bg-[#720f1e] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Gift className="w-4 h-4 text-[#d79628]" />
              <span>{t.btnJoinScheme}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
