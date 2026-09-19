import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Coins, 
  Clock, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2,
  Calendar,
  Gift
} from 'lucide-react';
import { ChitScheme } from '../types';
import { COMPANY_INFO } from '../data/chitData';

interface SchemeDetailModalProps {
  scheme: ChitScheme | null;
  onClose: () => void;
  onEnroll: (schemeId: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onEnroll,
}) => {
  if (!scheme) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#ede6f5] max-h-[90vh] flex flex-col font-['Source_Sans_3']">
        {/* Header */}
        <div className="bg-[#1e0a38] text-white p-5 flex justify-between items-center border-b border-purple-900 shrink-0">
          <div>
            <span className="text-[11px] font-bold text-[#fde047] uppercase tracking-wider">
              {scheme.code} • {scheme.chitUnits} {scheme.chitUnits === 1 ? 'Chit Unit' : 'Chit Units'}
            </span>
            <h3 className="font-['Playfair_Display'] font-bold text-lg text-white">{scheme.name}</h3>
            <p className="text-[11px] text-purple-200">
              DFinance Deepavali & Pongal Festival Special 4-Month Scheme
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#3b2d4a] text-xs">
          {/* Main Highlights Grid */}
          <div className="bg-[#faf7fd] p-4 rounded-xl border border-[#ede6f5] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] text-[#5b4d6b] block font-semibold">Monthly Deposit</span>
              <span className="text-sm font-bold text-[#1e0a38]">
                {formatCurrency(scheme.monthlyInstallment)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#5b4d6b] block font-semibold">Tenure</span>
              <span className="text-sm font-bold text-[#581c87]">4 Months</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5b4d6b] block font-semibold">Total Paid (4 Mo)</span>
              <span className="text-sm font-bold text-[#1e0a38]">
                {formatCurrency(scheme.totalPrincipalDeposited)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#5b4d6b] block font-semibold">Maturity Payout</span>
              <span className="text-sm font-black text-[#581c87]">
                {formatCurrency(scheme.totalCustomerPayout)}
              </span>
            </div>
          </div>

          {/* Mathematical Formula Box as in PDF */}
          <div className="p-4 rounded-xl bg-[#1e0a38] text-white space-y-2 font-mono">
            <div className="text-[#fde047] text-[11px] font-bold font-sans uppercase">
              Official Mathematical Breakdown (PDF Document):
            </div>
            <div className="text-purple-100">
              {formatCurrency(scheme.totalPrincipalDeposited)} X 60% = <span className="text-[#fde047] font-bold">{formatCurrency(scheme.interestAmount)}</span>
              <span className="text-purple-300 text-[10px] block font-sans">
                (வாடிக்கையாளர் கட்டிய தொகை மற்றும் அதற்கு நிறுவனம் வழங்கும் 60% வட்டி)
              </span>
            </div>
            <div className="text-emerald-400">
              = {formatCurrency(scheme.referralBonus)} (10 நபர்களை சேர்க்கும் போது சிறப்பு போனஸ்)
            </div>
            <div className="pt-2 border-t border-purple-800 text-xs font-sans flex justify-between items-center text-white">
              <span>வாடிக்கையாளர் பெறும் மொத்த தொகை:</span>
              <span className="text-sm font-black text-[#fde047]">
                {formatCurrency(scheme.totalCustomerPayout)}
              </span>
            </div>
          </div>

          {/* Statutory & Office Details */}
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-[#3b2d4a] space-y-1">
            <div className="font-bold text-[#1e0a38] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#581c87]" />
              <span>DFinance Registered Office</span>
            </div>
            <p className="text-[11px]">
              {COMPANY_INFO.fullAddress}
            </p>
            <div className="text-[11px] text-[#5b4d6b] pt-1 flex justify-between flex-wrap gap-2">
              <span>Proprietor: <strong className="text-[#1e0a38]">{COMPANY_INFO.proprietor}</strong></span>
              <span>Udyam Reg: <strong className="text-[#581c87]">{COMPANY_INFO.udyamRegNo}</strong></span>
              <span>Aadhaar: <strong className="text-[#1e0a38]">{COMPANY_INFO.aadhaarNo}</strong></span>
            </div>
          </div>

          {/* Key Advantages */}
          <div>
            <h4 className="font-bold text-[#1e0a38] text-xs mb-2">Scheme Terms & Features:</h4>
            <div className="space-y-1.5">
              {scheme.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#5b4d6b]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 text-[#5b4d6b]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Payable via Cash at Chromepet office or UPI to 9003241939 / 8668197626</span>
              </div>
              <div className="flex items-start gap-2 text-[#5b4d6b]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant handwritten and printed DFinance stamped receipt issued for every installment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#ede6f5] bg-[#faf7fd] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl border border-[#ede6f5] text-xs font-semibold text-[#5b4d6b] hover:bg-purple-50 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnroll(scheme.id);
            }}
            className="py-2.5 px-5 rounded-xl bg-[#581c87] hover:bg-[#4c1d95] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#f59e0b]/40"
          >
            <span>Proceed to Enroll</span>
            <ArrowRight className="w-4 h-4 text-[#fde047]" />
          </button>
        </div>
      </div>
    </div>
  );
};
