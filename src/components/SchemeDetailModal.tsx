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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {scheme.code} • {scheme.chitUnits} {scheme.chitUnits === 1 ? 'Chit Unit' : 'Chit Units'}
            </span>
            <h3 className="font-black text-lg text-white">{scheme.name}</h3>
            <p className="text-[11px] text-slate-300">
              DFinance Deepavali & Pongal Festival Special 4-Month Scheme
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs">
          {/* Main Highlights Grid */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold">Monthly Deposit</span>
              <span className="text-sm font-black text-slate-900">
                {formatCurrency(scheme.monthlyInstallment)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold">Tenure</span>
              <span className="text-sm font-black text-blue-900">4 Months</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold">Total Paid (4 Mo)</span>
              <span className="text-sm font-black text-slate-900">
                {formatCurrency(scheme.totalPrincipalDeposited)}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-semibold">Maturity Payout</span>
              <span className="text-sm font-black text-red-600">
                {formatCurrency(scheme.totalCustomerPayout)}
              </span>
            </div>
          </div>

          {/* Mathematical Formula Box as in PDF */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 font-mono">
            <div className="text-amber-400 text-[11px] font-bold font-sans uppercase">
              Official Mathematical Breakdown (PDF Document):
            </div>
            <div className="text-slate-200">
              {formatCurrency(scheme.totalPrincipalDeposited)} X 60% = <span className="text-amber-300 font-bold">{formatCurrency(scheme.interestAmount)}</span>
              <span className="text-slate-400 text-[10px] block font-sans">
                (வாடிக்கையாளர் கட்டிய தொகை மற்றும் அதற்கு நிறுவனம் வழங்கும் 60% வட்டி)
              </span>
            </div>
            <div className="text-emerald-400">
              = {formatCurrency(scheme.referralBonus)} (10 நபர்களை சேர்க்கும் போது சிறப்பு போனஸ்)
            </div>
            <div className="pt-2 border-t border-slate-700 text-xs font-sans flex justify-between items-center text-white">
              <span>வாடிக்கையாளர் பெறும் மொத்த தொகை:</span>
              <span className="text-sm font-black text-amber-400">
                {formatCurrency(scheme.totalCustomerPayout)}
              </span>
            </div>
          </div>

          {/* Statutory & Office Details */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-slate-700 space-y-1">
            <div className="font-bold text-blue-950 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span>DFinance Registered Office</span>
            </div>
            <p className="text-[11px]">
              {COMPANY_INFO.fullAddress}
            </p>
            <div className="text-[11px] text-slate-600 pt-1 flex justify-between flex-wrap gap-2">
              <span>Proprietor: <strong>{COMPANY_INFO.proprietor}</strong></span>
              <span>Udyam Reg: <strong>{COMPANY_INFO.udyamRegNo}</strong></span>
              <span>Aadhaar: <strong>{COMPANY_INFO.aadhaarNo}</strong></span>
            </div>
          </div>

          {/* Key Advantages */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2">Scheme Terms & Features:</h4>
            <div className="space-y-1.5">
              {scheme.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Payable via Cash at Chromepet office or UPI to 8668197626 / 9003241939</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant handwritten and printed DFinance stamped receipt issued for every installment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnroll(scheme.id);
            }}
            className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Proceed to Enroll</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
