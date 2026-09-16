import React from 'react';
import { 
  Users, 
  Calendar, 
  Coins, 
  Gift, 
  TrendingUp, 
  Percent, 
  Building2, 
  FileText 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';

interface HowChitsWorkProps {
  onOpenCircular?: () => void;
  onOpenCalculator?: () => void;
}

export const HowChitsWork: React.FC<HowChitsWorkProps> = ({ onOpenCircular, onOpenCalculator }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose 1 to 10 Chits',
      subtitle: '1 முதல் 10 சீட்டு வரை தேர்வு',
      icon: Users,
      description:
        'Subscribers can enroll in 1 chit unit (₹4,000/mo) up to 10 chit units (₹40,000/mo) depending on their financial capacity.',
    },
    {
      step: '02',
      title: 'Pay for 4 Months',
      subtitle: '4 மாதம் மட்டுமே சேமிப்பு',
      icon: Calendar,
      description:
        'Unlike conventional 25 or 40-month chits, this is a swift 4-month program. For 1 chit, you deposit a total of ₹16,000 (₹1,60,000 for 10 chits).',
    },
    {
      step: '03',
      title: 'Company 60% Interest Added',
      subtitle: 'நிறுவனம் வழங்கும் 60% வட்டி',
      icon: Percent,
      description:
        'DFinance adds up to 60% interest on your total deposit: ₹9,600 for 1 chit, or ₹96,000 for 10 chits as exclusive festive yield.',
    },
    {
      step: '04',
      title: '10-Member Referral Bonus',
      subtitle: '10 நபர்களை சேர்த்தல் போனஸ்',
      icon: Gift,
      description:
        'Introduce 10 members through you to receive ₹10,000 bonus (₹20,000 for 10 chits). Payout reaches ₹35,600 (1 chit) or ₹2,76,000 (10 chits)!',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0f172a] text-white border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#d79628]/20 text-[#d79628] text-xs font-semibold mb-3 border border-[#d79628]/40 font-['Source_Sans_3']">
            <Coins className="w-4 h-4 text-[#d79628]" />
            <span>How the DFinance 4-Month Scheme Works</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Simple 4-Step Festive Savings Model
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#e5e0d3] font-['Source_Sans_3'] leading-relaxed">
            இத்திட்டம் வரும் தீபாவளி - பொங்கல் பண்டிகை காலத்திற்கென பிரத்யேகமாக வடிவமைக்கப்பட்ட 4 மாத சேமிப்புத் திட்டம் ஆகும்.
          </p>
        </div>

        {/* 4 Steps with Jayasulochana Circle Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-['Source_Sans_3']">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white/5 rounded-lg p-6 border border-white/10 flex flex-col justify-between hover:border-[#d79628]/60 hover:bg-white/10 transition-all text-center group"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#8e1426] flex items-center justify-center mx-auto mb-4 text-white shadow-md border-2 border-[#d79628]/40 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-[#d79628]" />
                  </div>

                  <span className="text-xs font-bold text-[#d79628] uppercase tracking-widest font-mono block mb-1">
                    Step {item.step}
                  </span>

                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#d79628] mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#e5e0d3] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Callout with Formula */}
        <div className="mt-12 bg-[#162238] rounded-lg p-6 sm:p-8 text-white border border-[#e5e0d3]/20 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center font-['Source_Sans_3']">
          <div className="md:col-span-8 space-y-2">
            <div className="text-xs font-semibold text-[#d79628] uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#d79628]" />
              <span>Official Registered Terms • Chromepet, Chennai - 44</span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-white">
              Official Calculation Verified
            </h3>
            <div className="text-xs sm:text-sm text-[#e5e0d3] space-y-1">
              <div>• 1 Chit: 16,000 X 60% = ₹9,600 + ₹10,000 Referral = <strong className="text-[#d79628]">₹35,600 Payout</strong></div>
              <div>• 10 Chits: 1,60,000 X 60% = ₹96,000 + ₹20,000 Referral = <strong className="text-emerald-400">₹2,76,000 Payout</strong></div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
            {onOpenCircular && (
              <button
                type="button"
                onClick={onOpenCircular}
                className="w-full py-2.5 px-4 rounded border border-[#d79628] hover:bg-[#d79628]/10 text-[#d79628] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-[#d79628]" />
                <span>Read Official Circular</span>
              </button>
            )}
            {onOpenCalculator && (
              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full py-2.5 px-4 rounded bg-[#8e1426] hover:bg-[#720f1e] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-[#d79628]" />
                <span>Calculate Your Return</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
