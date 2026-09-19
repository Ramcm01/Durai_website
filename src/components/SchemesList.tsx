import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  FileText, 
  Calendar, 
  Gift,
  Award
} from 'lucide-react';
import { CHIT_SCHEMES, COMPANY_INFO } from '../data/chitData';
import { ChitScheme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SchemesListProps {
  onSelectScheme: (scheme: ChitScheme) => void;
  onOpenEnroll: (schemeId: string) => void;
  onOpenCircular?: () => void;
}

export const SchemesList: React.FC<SchemesListProps> = ({
  onSelectScheme,
  onOpenEnroll,
  onOpenCircular,
}) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'popular', label: t.catSingle },
    { id: 'bundle', label: t.catBundle },
    { id: 'vip', label: t.catVip },
  ];

  const filteredSchemes = CHIT_SCHEMES.filter((scheme) => {
    if (selectedCategory === 'all') return true;
    return scheme.category === selectedCategory;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="schemes" className="py-20 bg-[#faf7fd] border-b border-[#ede6f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header styled with Royal Purple branding */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#581c87] bg-purple-100 px-3.5 py-1.5 rounded-full font-['Source_Sans_3'] mb-3 border border-purple-200">
            <Gift className="w-4 h-4 text-[#581c87]" />
            <span>{t.schemesPill}</span>
          </div>

          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e0a38] tracking-tight">
            {t.schemesTitle}
          </h2>

          <div className="gold-divider max-w-xs mx-auto my-4" />

          <p className="text-base text-[#5b4d6b] font-medium font-['Source_Sans_3'] leading-relaxed">
            {t.schemesSubtitle}
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap font-['Source_Sans_3']">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#581c87] text-white shadow-sm ring-2 ring-purple-300'
                    : 'bg-white text-[#4a3e56] border border-[#ede6f5] hover:border-[#581c87]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Festive Banner matching Royal Purple branding */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-sm border border-purple-200 bg-[#1e0a38] text-white relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image Side */}
            <div className="lg:col-span-5 relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-[#150826]">
              <img
                src="/hero-banner.webp?v=2"
                alt="DFinance festival celebration"
                className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1e0a38]/95 via-[#1e0a38]/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 rounded bg-[#f59e0b] text-[#1e0a38] text-xs font-bold uppercase tracking-wider mb-1 font-['Source_Sans_3']">
                  ✨ {t.bannerBadge}
                </span>
                <p className="text-xs text-[#e9d5ff] font-medium font-['Source_Sans_3']">
                  {language === 'ta' 
                    ? 'குடும்பத்துடன் மகிழ்ச்சியாகக் கொண்டாட DFinance வழங்கும் சிறப்பு திட்டம்'
                    : 'Celebrate with family joy and verified financial prosperity with DFinance'}
                </p>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 font-['Source_Sans_3']">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#fde047] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Certified 4-Month Swift Maturity</span>
              </div>

              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {t.bannerTitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#e9d5ff] leading-relaxed">
                {t.bannerDesc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-white/10 border border-white/15 text-center">
                  <div className="text-[10px] text-[#e9d5ff]">
                    {language === 'ta' ? '1 சீட்டு முதிர்வு' : '1 Chit Payout'}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#fde047] font-['Playfair_Display']">₹35,600</div>
                </div>
                <div className="p-3 rounded-lg bg-white/10 border border-white/15 text-center">
                  <div className="text-[10px] text-[#e9d5ff]">
                    {language === 'ta' ? '5 சீட்டுகள் முதிர்வு' : '5 Chits Payout'}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#fde047] font-['Playfair_Display']">₹1,38,000</div>
                </div>
                <div className="p-3 rounded-lg bg-white/10 border border-white/15 text-center col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-[#e9d5ff]">
                    {language === 'ta' ? '10 சீட்டுகள் முதிர்வு' : '10 Chits Payout'}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 font-['Playfair_Display']">₹2,76,000</div>
                </div>
              </div>

              {onOpenCircular && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenCircular}
                    className="text-xs text-[#fde047] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-[#f59e0b]" />
                    <span>{language === 'ta' ? 'அதிகாரப்பூர்வ சுற்றறிக்கை மற்றும் விண்ணப்ப படிவத்தைப் பார்வையிட இங்கே கிளிக் செய்யவும் →' : 'Click here to view official circular and enrollment rules →'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schemes Grid styled with Royal Purple branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-['Source_Sans_3']">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className={`rounded-xl bg-white border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md relative ${
                scheme.chitUnits === 1
                  ? 'border-[#581c87] ring-1 ring-[#581c87]/30'
                  : scheme.chitUnits === 10
                  ? 'border-[#f59e0b] ring-2 ring-[#f59e0b]/40'
                  : 'border-[#ede6f5] hover:border-[#581c87]/50'
              }`}
            >
              {/* Highlight bar */}
              {scheme.chitUnits === 1 && (
                <div className="bg-[#581c87] text-white font-bold text-xs py-1.5 px-4 text-center uppercase tracking-wider font-['Source_Sans_3']">
                  ★ {language === 'ta' ? 'அடிப்படை 1 சீட்டு திட்டம் (முதிர்வு: ₹35,600)' : 'Standard 1 Chit Plan (Payout: ₹35,600)'}
                </div>
              )}
              {scheme.chitUnits === 10 && (
                <div className="bg-[#f59e0b] text-[#1e0a38] font-black text-xs py-1.5 px-4 text-center uppercase tracking-wider font-['Source_Sans_3']">
                  👑 {language === 'ta' ? '10 சீட்டுகள் மெகா திட்டம் (முதிர்வு: ₹2,76,000)' : '10 Chits Mega Block (Payout: ₹2,76,000)'}
                </div>
              )}

              <div className="p-6">
                {/* Scheme Code & Units */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#6b21a8] uppercase tracking-wider block">
                      {scheme.code} • 4 {t.monthsSuffix}
                    </span>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38] mt-0.5">
                      {language === 'ta' && scheme.tamilName ? scheme.tamilName : scheme.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#faf7fd] text-[#581c87] border border-[#ede6f5]">
                    {scheme.chitUnits} {scheme.chitUnits === 1 ? (language === 'ta' ? 'சீட்டு' : 'Chit Unit') : (language === 'ta' ? 'சீட்டுகள்' : 'Chits')}
                  </span>
                </div>

                {/* Primary Payout Box */}
                <div className="bg-[#faf7fd] p-4 rounded-lg border border-[#ede6f5] my-4 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#5b4d6b] font-semibold">{t.colMonthly}</span>
                    <span className="text-xl font-bold text-[#581c87] font-['Playfair_Display']">
                      {formatCurrency(scheme.monthlyInstallment)}/{t.perMonth}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#5b4d6b] pt-1.5 border-t border-[#ede6f5]">
                    <span>{t.col4MoDeposit}</span>
                    <span className="font-semibold text-[#1e0a38]">
                      {formatCurrency(scheme.totalPrincipalDeposited)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#6b21a8] font-semibold">
                    <span>{t.colInterest}</span>
                    <span className="font-bold">
                      +{formatCurrency(scheme.interestAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                    <span>{t.colReferral}</span>
                    <span className="font-bold">
                      +{formatCurrency(scheme.referralBonus)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#1e0a38] text-white shadow-xs mt-2 border-l-3 border-[#f59e0b]">
                    <div className="text-[11px] font-semibold text-[#fde047]">
                      {t.colTotalPayout}
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-[#fde047] font-['Playfair_Display']">
                      {formatCurrency(scheme.totalCustomerPayout)}
                    </div>
                    <div className="text-[10px] text-[#e9d5ff] mt-0.5">
                      ({t.colWithoutReferral} {formatCurrency(scheme.totalPayoutWithoutReferral)})
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-2 text-xs text-[#5b4d6b]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'ta' ? '4 மாதங்கள் மட்டுமே (குறுகிய விரைவு காலம்)' : 'Strictly 4 Months Tenure (Rapid & Safe)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'ta' ? '60% வரை நிறுவனம் தரும் வட்டி சலுகை' : '60% Guaranteed Company Yield on Deposit'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'ta' ? 'குரோம்பேட்டை நேரடி கிளை பணப் பட்டுவாடா' : 'Direct Chromepet Office Disbursal & Receipts'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenEnroll(scheme.id)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#581c87] hover:bg-[#4c1d95] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <span>{t.btnEnrollPlan}</span>
                  <ArrowRight className="w-4 h-4 text-[#fde047]" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectScheme(scheme)}
                  className="w-full py-2 px-4 rounded-lg border border-[#ede6f5] hover:border-[#581c87] text-[#4a3e56] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-white hover:bg-[#faf7fd]"
                >
                  <span>{t.btnDetails}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
