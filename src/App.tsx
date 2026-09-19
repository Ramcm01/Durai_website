import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChitCalculator } from './components/ChitCalculator';
import { SchemesList } from './components/SchemesList';
import { VacantChits } from './components/VacantChits';
import { HowChitsWork } from './components/HowChitsWork';
import { AuctionSchedule } from './components/AuctionSchedule';
import { AanaPaisaApp } from './components/AanaPaisaApp';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuickPayModal } from './components/QuickPayModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { OfficialCircularModal } from './components/OfficialCircularModal';
import { ChitScheme, VacantChit } from './types';
import { MessageCircle, FileText, Globe } from 'lucide-react';
import { COMPANY_INFO } from './data/chitData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { language, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [quickPayOpen, setQuickPayOpen] = useState<boolean>(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState<boolean>(false);
  const [circularModalOpen, setCircularModalOpen] = useState<boolean>(false);
  const [selectedSchemeForEnroll, setSelectedSchemeForEnroll] = useState<string | undefined>(undefined);
  const [calculatorPreFill, setCalculatorPreFill] = useState<{
    units: number;
    monthly: number;
    totalPaid: number;
    totalPayout: number;
    hasReferral: boolean;
  } | null>(null);
  const [detailModalScheme, setDetailModalScheme] = useState<ChitScheme | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenEnrollWithScheme = (schemeId?: string) => {
    setSelectedSchemeForEnroll(schemeId);
    setCalculatorPreFill(null);
    setEnrollModalOpen(true);
  };

  const handleCalculatorEnroll = (details: {
    units: number;
    monthly: number;
    totalPaid: number;
    totalPayout: number;
    hasReferral: boolean;
  }) => {
    setCalculatorPreFill(details);
    setSelectedSchemeForEnroll(undefined);
    setEnrollModalOpen(true);
  };

  const handleClaimVacant = (chit: VacantChit) => {
    setSelectedSchemeForEnroll(chit.groupCode);
    setEnrollModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7fd] text-[#1e0a38] flex flex-col font-['Source_Sans_3'] antialiased selection:bg-[#f59e0b] selection:text-[#1e0a38]">
      {/* Sticky Header */}
      <Header
        onOpenQuickPay={() => setQuickPayOpen(true)}
        onOpenEnroll={(schemeId) => handleOpenEnrollWithScheme(schemeId)}
        onOpenCircular={() => setCircularModalOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreSchemes={() => scrollToSection('schemes')}
          onOpenCalculator={() => scrollToSection('calculator')}
          onOpenEnroll={() => handleOpenEnrollWithScheme()}
          onOpenCircular={() => setCircularModalOpen(true)}
        />

        <SchemesList
          onSelectScheme={(scheme) => setDetailModalScheme(scheme)}
          onOpenEnroll={(schemeId) => handleOpenEnrollWithScheme(schemeId)}
          onOpenCircular={() => setCircularModalOpen(true)}
        />

        <ChitCalculator
          onEnrollPlan={handleCalculatorEnroll}
          onOpenCircular={() => setCircularModalOpen(true)}
        />

        <VacantChits onClaimVacant={handleClaimVacant} />

        <HowChitsWork
          onOpenCircular={() => setCircularModalOpen(true)}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        <AuctionSchedule onOpenAppShowcase={() => scrollToSection('contact')} />

        <AanaPaisaApp
          onOpenQuickPay={() => setQuickPayOpen(true)}
          onOpenCircular={() => setCircularModalOpen(true)}
        />

        <WhyChooseUs />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenQuickPay={() => setQuickPayOpen(true)}
        onOpenEnroll={() => handleOpenEnrollWithScheme()}
        onOpenCircular={() => setCircularModalOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 font-['Source_Sans_3']">
        {/* Quick Language Floating Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-white hover:bg-[#faf7fd] text-[#581c87] px-3.5 py-2 rounded-full shadow-md border border-[#ede6f5] transition-all cursor-pointer font-semibold text-xs"
          title="Switch Language / மொழி மாற்றுக"
        >
          <Globe className="w-4 h-4 text-[#581c87]" />
          <span>{language === 'ta' ? 'English (EN)' : 'தமிழ் (TA)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCircularModalOpen(true)}
          className="flex items-center gap-2 bg-[#581c87] hover:bg-[#4c1d95] text-white px-3.5 py-2.5 rounded-full shadow-md border border-[#f59e0b]/50 transition-all cursor-pointer font-semibold text-xs"
          title="View Official Scheme Circular"
        >
          <FileText className="w-4 h-4 text-[#fde047]" />
          <span className="hidden sm:inline">PDF Circular (Tamil / Eng)</span>
        </button>

        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('Hello DFinance, I want to enroll in the 4-month festival chit scheme.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer font-bold text-xs group"
          title="Chat with Mr. S.Duraibabu on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">WhatsApp Help ({COMPANY_INFO.phone})</span>
        </a>
      </div>

      {/* Modals */}
      <QuickPayModal
        isOpen={quickPayOpen}
        onClose={() => setQuickPayOpen(false)}
      />

      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialSchemeId={selectedSchemeForEnroll}
        calculatorPreFill={calculatorPreFill}
      />

      <SchemeDetailModal
        scheme={detailModalScheme}
        onClose={() => setDetailModalScheme(null)}
        onEnroll={(schemeId) => handleOpenEnrollWithScheme(schemeId)}
      />

      <OfficialCircularModal
        isOpen={circularModalOpen}
        onClose={() => setCircularModalOpen(false)}
        onEnroll={(units) => {
          setCircularModalOpen(false);
          handleOpenEnrollWithScheme(units ? `df-${units}chit-4m` : undefined);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
