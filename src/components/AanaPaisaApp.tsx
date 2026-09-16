import React from 'react';
import { 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  Building2 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';

interface AanaPaisaAppProps {
  onOpenQuickPay: () => void;
  onOpenCircular: () => void;
}

export const AanaPaisaApp: React.FC<AanaPaisaAppProps> = ({ onOpenQuickPay, onOpenCircular }) => {
  const appFeatures = [
    {
      title: 'Instant UPI & QR Payments',
      desc: `Send your ₹4,000 monthly chit payment seamlessly via Google Pay, PhonePe, or Paytm to ${COMPANY_INFO.phone} or ${COMPANY_INFO.secondaryPhone}.`,
      icon: CreditCard,
    },
    {
      title: 'Direct WhatsApp E-Receipts',
      desc: 'Receive instant digitally stamped official DFinance payment receipts and passbook updates directly on your WhatsApp upon every payment.',
      icon: MessageSquare,
    },
    {
      title: 'Digital Passbook & Ledger',
      desc: 'Track your 4 months installment progress, accumulated 60% company interest, and 10-member referral bonus anytime.',
      icon: FileText,
    },
    {
      title: 'Direct Proprietor Contact',
      desc: `Direct helpline to Mr. Duraibabu at our Chromepet registered office: ${COMPANY_INFO.shortAddress}.`,
      icon: Building2,
    },
  ];

  return (
    <section id="app" className="py-20 bg-[#faf8f4] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Source_Sans_3']">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mobile Digital Passbook Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px]">
              {/* Phone Frame Mockup */}
              <div className="relative z-10 bg-[#0f172a] p-4 rounded-[36px] shadow-xl border-4 border-[#1e293b]">
                {/* Speaker notch */}
                <div className="w-24 h-4 bg-[#1e293b] rounded-full mx-auto mb-3" />

                {/* Screen Content */}
                <div className="bg-[#162238] rounded-[24px] overflow-hidden text-white p-4 border border-white/10 space-y-4">
                  {/* App Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] text-[#d79628] block font-semibold">DFinance Digital Passbook</span>
                      <h4 className="font-['Playfair_Display'] font-bold text-sm text-white">Chromepet Branch</h4>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Balance Card */}
                  <div className="p-3.5 rounded-lg bg-[#8e1426] border border-[#d79628]/40 shadow-sm space-y-1">
                    <span className="text-[10px] text-[#e5e0d3] block font-semibold">4-Month Scheme Balance</span>
                    <div className="text-xl font-bold text-white font-['Playfair_Display']">₹35,600</div>
                    <div className="flex justify-between items-center text-[10px] text-[#d79628] pt-1 border-t border-white/20">
                      <span>Accrued Yield + Bonus</span>
                      <span className="font-bold">+₹19,600</span>
                    </div>
                  </div>

                  {/* Payment Timeline */}
                  <div className="space-y-2 text-[11px]">
                    <span className="font-semibold text-[#e5e0d3] block text-[10px] uppercase tracking-wider">
                      Passbook Entries
                    </span>

                    <div className="p-2 rounded bg-white/5 border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Month 1 Deposit</span>
                        <span className="text-[9px] text-[#a8a29e]">UPI Ref: DF981240</span>
                      </div>
                      <span className="text-emerald-400 font-bold">₹4,000 Paid</span>
                    </div>

                    <div className="p-2 rounded bg-white/5 border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Month 2 Deposit</span>
                        <span className="text-[9px] text-[#a8a29e]">UPI Ref: DF981299</span>
                      </div>
                      <span className="text-emerald-400 font-bold">₹4,000 Paid</span>
                    </div>

                    <div className="p-2 rounded bg-white/5 border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">Month 3 Installment</span>
                        <span className="text-[9px] text-[#d79628]">Due on 10th</span>
                      </div>
                      <span className="text-[#d79628] font-bold">Upcoming</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenQuickPay}
                    className="w-full py-2.5 rounded bg-[#d79628] hover:bg-[#c48520] text-[#0f172a] text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Pay Current Month Online
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#8e1426]/10 text-[#8e1426] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#8e1426]" />
              <span>Digital Convenience & Receipts</span>
            </div>

            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#2c1b1b] tracking-tight">
              Pay via UPI & Track Every Rupee on WhatsApp
            </h2>

            <div className="gold-divider max-w-xs my-3" />

            <p className="text-base text-[#57534e] leading-relaxed">
              No need to travel to the counter every month. Pay conveniently via Google Pay, PhonePe, or Bank Transfer and receive instant official electronic receipts verified by DFinance Chromepet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {appFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white border border-[#e5e0d3] hover:border-[#8e1426]/40 transition-colors shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#8e1426]/10 text-[#8e1426] flex items-center justify-center mb-2.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-['Playfair_Display'] text-base font-bold text-[#2c1b1b] mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#57534e] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenQuickPay}
                className="py-3 px-6 rounded bg-[#8e1426] hover:bg-[#720f1e] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Open Quick Online Pay
              </button>
              <button
                type="button"
                onClick={onOpenCircular}
                className="py-3 px-6 rounded border border-[#d79628] hover:bg-[#d79628]/10 text-[#8e1426] font-semibold text-xs transition-colors cursor-pointer"
              >
                View Official Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
