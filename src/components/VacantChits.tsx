import React from 'react';
import { 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { VACANT_CHITS } from '../data/chitData';
import { VacantChit } from '../types';

interface VacantChitsProps {
  onClaimVacant: (chit: VacantChit) => void;
}

export const VacantChits: React.FC<VacantChitsProps> = ({ onClaimVacant }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="vacant" className="py-20 bg-[#faf8f4] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8e1426] bg-[#8e1426]/10 px-3.5 py-1.5 rounded font-['Source_Sans_3'] mb-3">
            <Sparkles className="w-4 h-4 text-[#8e1426]" />
            <span>Fast-Track Running Batches</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#2c1b1b] tracking-tight">
            Vacant Priority Slots in Ongoing Batches
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#57534e] font-medium font-['Source_Sans_3'] leading-relaxed">
            தற்போது நடைபெற்று வரும் 4 மாத தீபாவளி - பொங்கல் தொகுப்புகளில் உடனடி காலியிடங்கள். முந்தைய மாத தவணைகளை செலுத்தி உடனடியாக அடுத்த மாத முதிர்வு அல்லது ஏல பலனைப் பெற்றிடுங்கள்!
          </p>
        </div>

        {/* Vacant Chits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Source_Sans_3']">
          {VACANT_CHITS.map((chit) => (
            <div
              key={chit.id}
              className="bg-white rounded-lg border border-[#e5e0d3] hover:border-[#8e1426]/40 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#faf8f4] text-[#8e1426] border border-[#e5e0d3]">
                    Slot #{chit.vacantSlotNumber} Available
                  </span>
                  <span className="text-xs font-semibold text-[#57534e]">
                    {chit.remainingMonths} Months Remaining
                  </span>
                </div>

                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2c1b1b]">
                  {chit.groupCode}
                </h3>
                <p className="text-xs text-[#57534e] mt-0.5">
                  Total Expected Maturity: <strong className="text-[#8e1426] font-['Playfair_Display'] text-sm">{formatCurrency(chit.chitValue)}</strong>
                </p>

                {/* Progress Bar */}
                <div className="my-4">
                  <div className="flex justify-between text-[11px] text-[#57534e] font-semibold mb-1">
                    <span>Tenure Progress</span>
                    <span>Month {chit.completedMonths} of {chit.durationMonths} Completed</span>
                  </div>
                  <div className="w-full bg-[#e5e0d3] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#8e1426] h-2 rounded-full"
                      style={{
                        width: `${(chit.completedMonths / chit.durationMonths) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Stats Breakdown */}
                <div className="p-3 bg-[#faf8f4] rounded-lg space-y-2 text-xs border border-[#e5e0d3]">
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Monthly Installment:</span>
                    <span className="font-bold text-[#2c1b1b]">{formatCurrency(chit.monthlyInstallment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534e]">Already Deposited:</span>
                    <span className="font-bold text-[#2c1b1b]">{formatCurrency(chit.accumulatedPaidPrincipal)}</span>
                  </div>
                  <div className="flex justify-between text-[#8e1426] font-semibold">
                    <span>Accrued 60% Yield:</span>
                    <span className="font-bold">+{formatCurrency(chit.accumulatedDividendBenefit)}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 border-t border-[#e5e0d3] mt-5">
                <button
                  type="button"
                  onClick={() => onClaimVacant(chit)}
                  className="w-full py-2.5 px-4 rounded bg-[#8e1426] hover:bg-[#720f1e] text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Claim Slot #{chit.vacantSlotNumber}</span>
                  <ArrowRight className="w-4 h-4 text-[#d79628]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
