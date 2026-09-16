import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Smartphone,
  Coins,
  MapPin,
  FileText,
  Calendar,
  Building2
} from 'lucide-react';
import { CHIT_SCHEMES, COMPANY_INFO } from '../data/chitData';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchemeId?: string;
  calculatorPreFill?: {
    units: number;
    monthly: number;
    totalPaid: number;
    totalPayout: number;
    hasReferral: boolean;
  } | null;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialSchemeId,
  calculatorPreFill,
}) => {
  const [chitUnits, setChitUnits] = useState<number>(1);
  const [includeReferral, setIncludeReferral] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: 'Chromepet, Chennai',
    joiningDate: new Date().toISOString().split('T')[0],
    agreedToPledge: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    if (calculatorPreFill) {
      setChitUnits(calculatorPreFill.units);
      setIncludeReferral(calculatorPreFill.hasReferral);
    } else if (initialSchemeId) {
      const match = CHIT_SCHEMES.find((s) => s.id === initialSchemeId);
      if (match) {
        setChitUnits(match.chitUnits);
      }
    }
  }, [calculatorPreFill, initialSchemeId]);

  if (!isOpen) return null;

  const monthlyInstallment = chitUnits * 4000;
  const totalPrincipal = monthlyInstallment * 4;
  const interestAmount = Math.round(totalPrincipal * 0.60);
  const referralBonus = includeReferral ? (chitUnits === 10 ? 20000 : 10000) : 0;
  const totalMaturityPayout = totalPrincipal + interestAmount + referralBonus;

  // Completion Date (4 months later)
  const calculateMaturityDate = (startDateStr: string) => {
    const d = new Date(startDateStr);
    d.setMonth(d.getMonth() + 4);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'DF-APP-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(generatedId);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `Hello DFinance, I want to enroll in the 4-Month Festival Scheme.\n\nApplication ID: ${applicationId}\nName: ${formData.fullName}\nPhone: ${formData.phone}\nChits: ${chitUnits} (${formatCurrency(monthlyInstallment)}/mo)\nTotal 4-Mo Deposit: ${formatCurrency(totalPrincipal)}\nExpected Payout: ${formatCurrency(totalMaturityPayout)}\nAddress: ${formData.address}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-600/30 border border-red-500/40 text-amber-400 flex items-center justify-center font-black text-base">
              D
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Enroll in DFinance Scheme</h3>
              <p className="text-[11px] text-slate-300">
                தீபாவளி - பொங்கல் பண்டிகை கால சிறப்பு 4 மாத திட்டம்
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Units Selection Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-600" />
                    Number of Chits (1 முதல் 10 சீட்டு வரை):
                  </label>
                  <span className="text-xs font-black px-2.5 py-1 bg-amber-500 text-slate-950 rounded-md">
                    {chitUnits} {chitUnits === 1 ? 'Chit' : 'Chits'}
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setChitUnits(num)}
                      className={`py-1 text-xs font-bold rounded border cursor-pointer ${
                        chitUnits === num
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Monthly Installment:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(monthlyInstallment)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">4-Mo Total Deposit:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(totalPrincipal)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">60% Company Interest:</span>
                    <span className="font-bold text-amber-600">+{formatCurrency(interestAmount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Total Guaranteed Payout:</span>
                    <span className="font-black text-red-600 text-sm">{formatCurrency(totalMaturityPayout)}</span>
                  </div>
                </div>

                {/* Referral checkbox */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-amber-950">
                  <span className="font-semibold">
                    10-Member Referral ({chitUnits === 10 ? '₹20,000' : '₹10,000'} Bonus)
                  </span>
                  <input
                    type="checkbox"
                    checked={includeReferral}
                    onChange={(e) => setIncludeReferral(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 cursor-pointer"
                  />
                </div>
              </div>

              {/* Applicant Information Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    வாடிக்கையாளர் பெயர் (Subscriber Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g., K. Sundaram"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      கைபேசி எண் (Mobile / WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      சேரும் நாள் (Joining Date) *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.joiningDate}
                      onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    முகவரி (Address / Area in Chennai)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g., Lakshmi Puram, Chromepet, Chennai - 44"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  />
                </div>

                {/* Statutory Pledge From Document */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="pledge-check"
                      required
                      checked={formData.agreedToPledge}
                      onChange={(e) => setFormData({ ...formData, agreedToPledge: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded border-amber-400 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="pledge-check" className="text-[11px] text-amber-950 font-semibold cursor-pointer">
                      "இத்திட்டத்தில் முழுமனதுடன் இணைய நாங்கள் தயாராக உள்ளோம்." (We are willing to enroll with our full consent in DFinance 4-Month Festival Scheme).
                    </label>
                  </div>
                  <div className="text-[10px] text-slate-600 pl-6 flex justify-between">
                    <span>சேரும் நாள்: <strong>{formData.joiningDate}</strong></span>
                    <span>முடியும் நாள்: <strong>{calculateMaturityDate(formData.joiningDate)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>Submit Enrollment Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Application Registered Successfully
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Welcome to DFinance!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Your application reference ID: <strong className="text-slate-900 font-mono">{applicationId}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrolled Units:</span>
                  <span className="font-bold text-slate-900">{chitUnits} Chit(s) (4 Months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Deposit:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(monthlyInstallment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Expected Payout:</span>
                  <span className="font-black text-red-600 text-sm">{formatCurrency(totalMaturityPayout)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  DFinance Office: <strong>{COMPANY_INFO.shortAddress}</strong>. Call: <strong>{COMPANY_INFO.phone}</strong>.
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/918668197626?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send Confirmation to DFinance WhatsApp (+91 8668197626)</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
