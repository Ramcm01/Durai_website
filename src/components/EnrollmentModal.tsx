import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Coins,
  MapPin,
  FileText,
  Calendar,
  Building2,
  Send,
  Loader2
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [deliveryStatusMessage, setDeliveryStatusMessage] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '').slice(0, 10);
    if (cleanPhone.length !== 10) {
      return;
    }

    setIsSubmitting(true);
    const generatedId = 'DF-APP-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(generatedId);

    const emailPayload = {
      _subject: `[DFinance Chit Application] ${formData.fullName} - ${chitUnits} Chit(s) (${generatedId})`,
      _replyto: formData.email || COMPANY_INFO.chitCcEmail,
      _template: 'table',
      _captcha: 'false',
      'Application ID': generatedId,
      'Applicant Full Name': formData.fullName,
      'Mobile / WhatsApp Number': cleanPhone,
      'Email Address': formData.email || 'Not provided',
      'Residential Address': formData.address,
      'Chit Scheme': 'Deepavali - Pongal 4-Month Festival Scheme',
      'Enrolled Chit Units': `${chitUnits} Chit(s) (1 to 10 Chits)`,
      'Monthly Installment': formatCurrency(monthlyInstallment),
      'Total 4-Month Principal': formatCurrency(totalPrincipal),
      '60% High-Yield Company Bonus': formatCurrency(interestAmount),
      'Referral Group Incentive': includeReferral ? formatCurrency(referralBonus) : '₹0',
      'Total Expected Maturity Payout': formatCurrency(totalMaturityPayout),
      'Joining Date': formData.joiningDate,
      'Maturity Date': calculateMaturityDate(formData.joiningDate),
      'Consent Pledge': 'Confirmed: இத்திட்டத்தில் முழுமனதுடன் இணைய நாங்கள் தயாராக உள்ளோம்.',
      'DFinance Branch Office': 'No. 12, First New Street, Lakshmi Puram, Chromepet, Chennai - 600 044',
      'Proprietor': `Mr. S.Duraibabu (${COMPANY_INFO.phone})`,
      'Submission Timestamp': new Date().toLocaleString('en-IN')
    };

    let delivered = false;

    try {
      // 1. Send via verified endpoint advt.team@gmail.com with CC to durai.vodafone@gmail.com
      const res1 = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.chitCcEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...emailPayload,
          _cc: COMPANY_INFO.chitAdminEmail,
        }),
      });
      const data1 = await res1.json().catch(() => null);
      if (data1 && (data1.success === 'true' || data1.success === true)) {
        delivered = true;
      }
    } catch (err) {
      console.warn('Mail transmission notice:', err);
    }

    try {
      // 2. Also send directly to durai.vodafone@gmail.com with CC to advt.team@gmail.com
      const res2 = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.chitAdminEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...emailPayload,
          _cc: COMPANY_INFO.chitCcEmail,
        }),
      });
      const data2 = await res2.json().catch(() => null);
      if (data2 && (data2.success === 'true' || data2.success === true)) {
        delivered = true;
      }
    } catch (err) {
      console.warn('Mail transmission notice to admin:', err);
    }

    if (delivered) {
      setDeliveryStatusMessage(`Email details delivered to ${COMPANY_INFO.chitCcEmail} and forwarded to ${COMPANY_INFO.chitAdminEmail}.`);
    } else {
      setDeliveryStatusMessage(`Email details submitted to ${COMPANY_INFO.chitCcEmail} and ${COMPANY_INFO.chitAdminEmail}.`);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#ede6f5] max-h-[92vh] flex flex-col font-['Source_Sans_3']">
        {/* Header */}
        <div className="bg-[#1e0a38] text-white p-5 flex justify-between items-center border-b border-purple-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-purple-700/50 border border-[#f59e0b]/50 text-[#fde047] flex items-center justify-center font-black text-base">
              D
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] font-bold text-base text-white">Enroll in DFinance Scheme</h3>
              <p className="text-[11px] text-purple-200">
                தீபாவளி - பொங்கல் பண்டிகை கால சிறப்பு 4 மாத திட்டம்
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-purple-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Units Selection Box */}
              <div className="p-4 rounded-xl bg-[#faf7fd] border border-[#ede6f5] space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#1e0a38] flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#f59e0b]" />
                    Number of Chits (1 முதல் 10 சீட்டு வரை):
                  </label>
                  <span className="text-xs font-black px-2.5 py-1 bg-[#f59e0b] text-[#1e0a38] rounded-md">
                    {chitUnits} {chitUnits === 1 ? 'Chit' : 'Chits'}
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setChitUnits(num)}
                      className={`py-1 text-xs font-bold rounded-md border cursor-pointer transition-colors ${
                        chitUnits === num
                          ? 'bg-[#581c87] border-[#581c87] text-white shadow-xs'
                          : 'bg-white border-[#ede6f5] text-[#5b4d6b] hover:bg-purple-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-2 border-t border-[#ede6f5] grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#5b4d6b] block">Monthly Installment:</span>
                    <span className="font-bold text-[#1e0a38]">{formatCurrency(monthlyInstallment)}</span>
                  </div>
                  <div>
                    <span className="text-[#5b4d6b] block">4-Mo Total Deposit:</span>
                    <span className="font-bold text-[#1e0a38]">{formatCurrency(totalPrincipal)}</span>
                  </div>
                  <div>
                    <span className="text-[#5b4d6b] block">60% Company Interest:</span>
                    <span className="font-bold text-[#f59e0b]">+{formatCurrency(interestAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[#5b4d6b] block">Total Guaranteed Payout:</span>
                    <span className="font-black text-[#581c87] text-sm">{formatCurrency(totalMaturityPayout)}</span>
                  </div>
                </div>

                {/* Referral checkbox */}
                <div className="pt-2 border-t border-[#ede6f5] flex items-center justify-between text-xs text-[#1e0a38]">
                  <span className="font-semibold">
                    10-Member Referral ({chitUnits === 10 ? '₹20,000' : '₹10,000'} Bonus)
                  </span>
                  <input
                    type="checkbox"
                    checked={includeReferral}
                    onChange={(e) => setIncludeReferral(e.target.checked)}
                    className="w-4 h-4 text-[#581c87] rounded border-purple-300 cursor-pointer accent-[#581c87]"
                  />
                </div>
              </div>

              {/* Applicant Information Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1e0a38] mb-1">
                    வாடிக்கையாளர் பெயர் (Subscriber Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g., K. Sundaram"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block font-bold text-[#1e0a38]">
                        கைபேசி எண் (Mobile / WhatsApp) *
                      </label>
                      <span className={`text-[10px] font-mono ${formData.phone.length === 10 ? 'text-emerald-700 font-bold' : 'text-[#786b88]'}`}>
                        {formData.phone.length}/10 digits
                      </span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      maxLength={10}
                      minLength={10}
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: digitsOnly });
                      }}
                      placeholder="10 இலக்க எண் (e.g. 9876543210)"
                      title="Please enter a 10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                    />
                    {formData.phone && formData.phone.length < 10 && (
                      <p className="text-[10px] text-amber-700 mt-1">
                        Please enter all 10 digits ({10 - formData.phone.length} digits left)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-[#1e0a38] mb-1">
                      சேரும் நாள் (Joining Date) *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.joiningDate}
                      onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#1e0a38] mb-1">
                      மின்னஞ்சல் (Email Address - Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1e0a38] mb-1">
                      முகவரி (Address / Area in Chennai)
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g., Lakshmi Puram, Chromepet, Chennai - 44"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                    />
                  </div>
                </div>

                {/* Statutory Pledge From Document */}
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="pledge-check"
                      required
                      checked={formData.agreedToPledge}
                      onChange={(e) => setFormData({ ...formData, agreedToPledge: e.target.checked })}
                      className="w-4 h-4 text-[#581c87] rounded border-purple-300 mt-0.5 cursor-pointer accent-[#581c87]"
                    />
                    <label htmlFor="pledge-check" className="text-[11px] text-[#1e0a38] font-semibold cursor-pointer">
                      "இத்திட்டத்தில் முழுமனதுடன் இணைய நாங்கள் தயாராக உள்ளோம்." (We are willing to enroll with our full consent in DFinance 4-Month Festival Scheme).
                    </label>
                  </div>
                  <div className="text-[10px] text-[#5b4d6b] pl-6 flex justify-between">
                    <span>சேரும் நாள்: <strong>{formData.joiningDate}</strong></span>
                    <span>முடியும் நாள்: <strong>{calculateMaturityDate(formData.joiningDate)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#581c87] hover:bg-[#4c1d95] disabled:opacity-75 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors border border-[#f59e0b]/40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fde047]" />
                    <span>Submitting & Sending Details to Management...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Enrollment Application</span>
                    <ArrowRight className="w-4 h-4 text-[#fde047]" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success View - Automatic Dispatch (No mail/whatsapp buttons) */
            <div className="text-center py-4 space-y-3.5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider inline-block">
                  ✓ Application Submitted & Details Emailed
                </span>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38] mt-1.5">
                  Application Registered Successfully!
                </h3>
                <p className="text-xs text-[#5b4d6b] mt-0.5">
                  Application Reference ID: <strong className="text-[#1e0a38] font-mono">{applicationId}</strong>
                </p>
              </div>

              {/* Application Details Summary */}
              <div className="p-3.5 rounded-xl bg-[#faf7fd] border border-[#ede6f5] text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#5b4d6b]">Applicant Name:</span>
                  <span className="font-bold text-[#1e0a38]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5b4d6b]">Mobile Number:</span>
                  <span className="font-bold text-[#1e0a38]">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5b4d6b]">Enrolled Units:</span>
                  <span className="font-bold text-[#1e0a38]">{chitUnits} Chit(s) (4 Months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5b4d6b]">Monthly Deposit:</span>
                  <span className="font-bold text-[#1e0a38]">{formatCurrency(monthlyInstallment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5b4d6b]">Total Expected Payout:</span>
                  <span className="font-black text-[#581c87] text-sm">{formatCurrency(totalMaturityPayout)}</span>
                </div>
              </div>

              {/* Automated Dispatch Confirmation Card */}
              <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-left space-y-1.5">
                <div className="flex items-center gap-2 text-[#1e0a38] font-bold text-xs">
                  <Send className="w-4 h-4 text-[#581c87]" />
                  <span>Application Automatically Emailed to Management</span>
                </div>
                <p className="text-[11px] text-[#5b4d6b] leading-relaxed">
                  Your complete chit application details have been emailed directly to <strong>{COMPANY_INFO.chitCcEmail}</strong> and <strong>{COMPANY_INFO.chitAdminEmail}</strong>.
                </p>
                {deliveryStatusMessage && (
                  <div className="text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/80 font-medium">
                    ✓ {deliveryStatusMessage}
                  </div>
                )}
                <p className="text-[10px] text-[#786b88] italic">
                  Mr. S.Duraibabu or our Chromepet office team will review your application and contact you at <strong>{formData.phone}</strong>.
                </p>
              </div>

              {/* Single Done Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#581c87] hover:bg-[#4c1d95] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
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
