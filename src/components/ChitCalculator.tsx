import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Gift, 
  Coins
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';
import { useLanguage } from '../context/LanguageContext';

interface ChitCalculatorProps {
  onEnrollPlan: (details: { units: number; monthly: number; totalPaid: number; totalPayout: number; hasReferral: boolean }) => void;
  onOpenCircular?: () => void;
}

export const ChitCalculator: React.FC<ChitCalculatorProps> = ({ onEnrollPlan, onOpenCircular }) => {
  const { language, t } = useLanguage();
  const [chitUnits, setChitUnits] = useState<number>(1);
  const [includeReferral, setIncludeReferral] = useState<boolean>(true);

  const calculations = useMemo(() => {
    const monthlyPerUnit = 4000;
    const durationMonths = 4;
    const monthlyInstallment = chitUnits * monthlyPerUnit;
    const totalPrincipal = monthlyInstallment * durationMonths; // e.g. 16,000 for 1, 1,60,000 for 10
    const interestPercent = 60;
    const interestAmount = Math.round(totalPrincipal * 0.60); // 9,600 for 1, 96,000 for 10

    let referralBonusAmount = 0;
    if (includeReferral) {
      if (chitUnits === 10) {
        referralBonusAmount = 20000;
      } else {
        referralBonusAmount = 10000;
      }
    }

    const totalPayout = totalPrincipal + interestAmount + referralBonusAmount;
    const payoutWithoutReferral = totalPrincipal + interestAmount;

    // Bank comparison (typical Bank RD pays 6.5% p.a. -> ~2.1% in 4 months)
    const bankRdInterest = Math.round(totalPrincipal * (0.065 * (4 / 12)));
    const bankRdTotal = totalPrincipal + bankRdInterest;
    const extraBenefit = totalPayout - bankRdTotal;

    return {
      monthlyInstallment,
      totalPrincipal,
      interestPercent,
      interestAmount,
      referralBonusAmount,
      totalPayout,
      payoutWithoutReferral,
      bankRdInterest,
      bankRdTotal,
      extraBenefit,
      durationMonths,
    };
  }, [chitUnits, includeReferral]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-20 bg-white border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8e1426] bg-[#8e1426]/10 px-3.5 py-1.5 rounded font-['Source_Sans_3'] mb-3">
            <Calculator className="w-4 h-4 text-[#8e1426]" />
            <span>{t.calcPill}</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2c1b1b] tracking-tight">
            {t.calcTitle}
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#57534e] font-medium font-['Source_Sans_3'] leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 bg-[#faf8f4] rounded-lg p-6 sm:p-8 border border-[#e5e0d3] shadow-xs space-y-6 font-['Source_Sans_3']">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-[#2c1b1b] flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#8e1426]" />
                  <span>{t.calcSliderLabel}</span>
                </label>
                <span className="text-sm font-bold px-3.5 py-1 bg-[#8e1426] text-white rounded shadow-xs font-['Source_Sans_3']">
                  {chitUnits} {chitUnits === 1 ? (language === 'ta' ? 'சீட்டு' : 'Unit') : (language === 'ta' ? 'சீட்டுகள்' : 'Units')}
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={chitUnits}
                onChange={(e) => setChitUnits(Number(e.target.value))}
                className="w-full h-2.5 bg-[#e5e0d3] rounded-lg appearance-none cursor-pointer accent-[#8e1426]"
              />

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mt-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setChitUnits(num)}
                    className={`py-2 text-xs font-bold rounded border transition-all cursor-pointer ${
                      chitUnits === num
                        ? 'bg-[#8e1426] border-[#8e1426] text-white shadow-xs'
                        : 'bg-white border-[#e5e0d3] text-[#34322d] hover:border-[#8e1426]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Scheme Parameter Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-white border border-[#e5e0d3]">
                <div className="text-xs text-[#57534e] font-semibold">{t.colMonthly}</div>
                <div className="text-xl font-bold text-[#8e1426] font-['Playfair_Display'] mt-1">
                  {formatCurrency(calculations.monthlyInstallment)}
                </div>
                <div className="text-[11px] text-[#78716c] mt-0.5">
                  ({chitUnits} x ₹4,000/{t.perMonth})
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#e5e0d3]">
                <div className="text-xs text-[#57534e] font-semibold">{t.calcTenureLabel}</div>
                <div className="text-xl font-bold text-[#2c1b1b] font-['Playfair_Display'] mt-1">
                  {calculations.durationMonths} {t.monthsSuffix}
                </div>
                <div className="text-[11px] text-[#8e1426] font-semibold mt-0.5">
                  {t.calcTenureValue}
                </div>
              </div>
            </div>

            {/* Referral Option Toggle */}
            <div className="p-4 rounded-lg bg-white border border-[#d79628]/50 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2c1b1b] flex items-center gap-1.5 cursor-pointer">
                  <Gift className="w-4 h-4 text-[#d79628]" />
                  <span>{t.calcReferralTitle}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIncludeReferral(!includeReferral)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    includeReferral ? 'bg-[#8e1426] justify-end' : 'bg-[#e5e0d3] justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform" />
                </button>
              </div>
              <p className="text-xs text-[#57534e] leading-relaxed">
                {chitUnits === 10
                  ? t.calcReferralVipDesc
                  : t.calcReferralStandardDesc}
                {' '}
                <span className="text-[#8e1426] font-semibold">{t.calcReferralNote}</span>
              </p>
            </div>

            {/* Formula Math Breakdown Box */}
            <div className="p-4 rounded-lg bg-[#0f172a] text-[#e5e0d3] text-xs font-mono space-y-1.5 border border-slate-800">
              <div className="text-[#d79628] font-bold font-sans flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.calcFormulaTitle}</span>
              </div>
              <div className="flex justify-between text-[#e5e0d3] pt-1">
                <span>{t.calcFormulaPrincipal} ({chitUnits} x ₹4,000 x 4m):</span>
                <span className="font-bold text-white">{formatCurrency(calculations.totalPrincipal)}</span>
              </div>
              <div className="flex justify-between text-[#d79628]">
                <span>+ {t.calcFormulaInterest} (60%):</span>
                <span className="font-bold">+{formatCurrency(calculations.interestAmount)}</span>
              </div>
              {includeReferral && (
                <div className="flex justify-between text-emerald-400">
                  <span>+ {t.calcFormulaBonus}:</span>
                  <span className="font-bold">+{formatCurrency(calculations.referralBonusAmount)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Jayasulochana High-Contrast Result Box */}
          <div className="lg:col-span-6 space-y-6 font-['Source_Sans_3']">
            {/* Payout Card */}
            <div className="rounded-lg bg-[#0f172a] text-white p-6 sm:p-8 border-l-4 border-[#d79628] shadow-md space-y-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#d79628] uppercase tracking-wider block">
                    {language === 'ta' ? '4 மாத முதிர்வு பலன்' : '4-Month Maturity Payout'}
                  </span>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mt-0.5">
                    {t.calcResultLabel}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded text-xs font-bold bg-[#d79628] text-[#2c1b1b] shadow-xs">
                  60% {language === 'ta' ? 'வட்டி' : 'Yield'}
                </span>
              </div>

              {/* Huge Number Display */}
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#d79628] font-['Playfair_Display']">
                  {formatCurrency(calculations.totalPayout)}
                </div>
                <div className="text-xs text-[#e5e0d3] mt-2 flex items-center gap-2">
                  <span>{t.colWithoutReferral}:</span>
                  <strong className="text-white font-mono">{formatCurrency(calculations.payoutWithoutReferral)}</strong>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/15 text-center">
                <div className="p-2.5 rounded bg-white/10 border border-white/10">
                  <div className="text-[10px] text-[#e5e0d3]">{language === 'ta' ? 'நீங்கள் கட்டியது' : 'Your Principal'}</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-['Playfair_Display'] mt-0.5">
                    {formatCurrency(calculations.totalPrincipal)}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#8e1426]/40 border border-[#8e1426]">
                  <div className="text-[10px] text-[#fce8b3]">{language === 'ta' ? 'நிறுவன வட்டி' : '60% Yield'}</div>
                  <div className="text-xs sm:text-sm font-bold text-[#fce8b3] font-['Playfair_Display'] mt-0.5">
                    +{formatCurrency(calculations.interestAmount)}
                  </div>
                </div>
                <div className="p-2.5 rounded bg-emerald-500/20 border border-emerald-400/30">
                  <div className="text-[10px] text-emerald-300">{language === 'ta' ? 'போனஸ்' : 'Bonus'}</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 font-['Playfair_Display'] mt-0.5">
                    +{formatCurrency(calculations.referralBonusAmount)}
                  </div>
                </div>
              </div>

              {/* Comparison vs Bank RD */}
              <div className="p-4 rounded bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-[#e5e0d3]">
                  <span>{t.calcBankRdLabel}</span>
                  <span className="font-mono text-slate-300">{formatCurrency(calculations.bankRdTotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#d79628]">
                  <span>{t.calcDfinanceLabel}</span>
                  <span className="font-['Playfair_Display'] text-base">{formatCurrency(calculations.totalPayout)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {t.calcExtraGain}:
                  </span>
                  <span className="font-['Playfair_Display'] text-sm">
                    +{formatCurrency(calculations.extraBenefit)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onEnrollPlan({
                      units: chitUnits,
                      monthly: calculations.monthlyInstallment,
                      totalPaid: calculations.totalPrincipal,
                      totalPayout: calculations.totalPayout,
                      hasReferral: includeReferral,
                    })
                  }
                  className="w-full py-3.5 px-6 rounded bg-[#8e1426] hover:bg-[#720f1e] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
                >
                  <Gift className="w-4 h-4 text-[#d79628]" />
                  <span>{t.calcBtnEnroll} ({chitUnits} {chitUnits === 1 ? 'Chit' : 'Chits'})</span>
                  <ArrowRight className="w-4 h-4 text-[#d79628]" />
                </button>

                {onOpenCircular && (
                  <button
                    type="button"
                    onClick={onOpenCircular}
                    className="w-full py-2.5 px-4 rounded text-xs text-[#d79628] hover:text-white font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#d79628]" />
                    <span>{t.calcBtnCircular}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
