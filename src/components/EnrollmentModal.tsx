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
  Building2,
  Mail,
  Copy,
  ExternalLink,
  Check
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
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const getEmailDetails = (appId: string) => {
    const subject = `[DFinance Chit Application] ${formData.fullName} - ${chitUnits} Chit(s) (${appId})`;
    const body = `NEW 4-MONTH FESTIVAL CHIT ENROLLMENT APPLICATION
D FINANCE CHIT COMPANY - CHROMEPET, CHENNAI

Application ID: ${appId}
Submission Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}

1. SUBSCRIBER PARTICULARS:
--------------------------------------------------
Full Name: ${formData.fullName}
Mobile / WhatsApp: ${formData.phone}
${formData.email ? `Email: ${formData.email}\n` : ''}Residential Address: ${formData.address}

2. CHIT SCHEME DETAILS:
--------------------------------------------------
Scheme: Deepavali - Pongal 4-Month Festival Chit Scheme
Enrolled Units: ${chitUnits} Chit(s) (1 to 10 Chits)
Monthly Installment: ${formatCurrency(monthlyInstallment)} / month
Total 4-Month Principal: ${formatCurrency(totalPrincipal)}
60% High-Yield Bonus: ${formatCurrency(interestAmount)}
${includeReferral ? `Referral Group Incentive: ${formatCurrency(referralBonus)}\n` : ''}Total Expected Maturity Payout: ${formatCurrency(totalMaturityPayout)}
Joining Date: ${formData.joiningDate}
Maturity Date: ${calculateMaturityDate(formData.joiningDate)}

3. CONSENT & DECLARATION:
--------------------------------------------------
Declaration: "இத்திட்டத்தில் முழுமனதுடன் இணைய நாங்கள் தயாராக உள்ளோம்." (Agreed with full consent)

4. DFINANCE OFFICE DETAILS:
--------------------------------------------------
Office: No. 12, First New Street, Lakshmi Puram, Chromepet, Chennai - 600 044
Proprietor: Mr. Duraibabu
Phone: 9003241939 / 8668197626
Govt Udyam Reg: UDYAM-TN-02-0501215

--------------------------------------------------
Submitted via DFinance Web Application Portal.`;

    const mailtoUrl = `mailto:${COMPANY_INFO.chitAdminEmail}?cc=${COMPANY_INFO.chitCcEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(COMPANY_INFO.chitAdminEmail)}&cc=${encodeURIComponent(COMPANY_INFO.chitCcEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return { subject, body, mailtoUrl, gmailWebUrl };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'DF-APP-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(generatedId);
    setIsSubmitted(true);

    // Auto-trigger mail client to send mail to durai.vodafone@gmail.com and CC to advt.team@gmail.com
    const emailDetails = getEmailDetails(generatedId);
    try {
      window.location.href = emailDetails.mailtoUrl;
    } catch {
      // Fallback handled by interactive UI cards
    }
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
                    <label className="block font-bold text-[#1e0a38] mb-1">
                      கைபேசி எண் (Mobile / WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ede6f5] focus:outline-none focus:border-[#581c87] text-[#1e0a38] bg-[#faf7fd]"
                    />
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
                className="w-full py-3 px-4 rounded-xl bg-[#581c87] hover:bg-[#4c1d95] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors border border-[#f59e0b]/40"
              >
                <span>Submit Enrollment Application</span>
                <ArrowRight className="w-4 h-4 text-[#fde047]" />
              </button>
            </form>
          ) : (
            /* Success View */
            <div className="text-center py-4 space-y-3.5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider inline-block">
                  ✓ Application Registered & Email Generated
                </span>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38] mt-1.5">
                  Welcome to DFinance!
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

              {/* Email Dispatch Card */}
              {(() => {
                const emailDetails = getEmailDetails(applicationId);
                return (
                  <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-left space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#581c87] text-[#fde047] flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#1e0a38]">Chit Application Email Prepared</div>
                        <div className="text-[11px] text-[#5b4d6b] leading-tight mt-0.5">
                          To: <strong className="text-[#581c87] font-mono">{COMPANY_INFO.chitAdminEmail}</strong><br />
                          CC: <strong className="text-[#581c87] font-mono">{COMPANY_INFO.chitCcEmail}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                      <a
                        href={emailDetails.mailtoUrl}
                        className="py-2 px-3 rounded-lg bg-[#581c87] hover:bg-[#4c1d95] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Mail App</span>
                      </a>

                      <a
                        href={emailDetails.gmailWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-white border border-[#581c87] text-[#581c87] hover:bg-purple-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Gmail Web</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(emailDetails.body);
                        setCopiedEmail(true);
                        setTimeout(() => setCopiedEmail(false), 3000);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg border border-purple-200 bg-white hover:bg-purple-100/70 text-[11px] font-semibold text-[#581c87] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">✓ Application Details Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#581c87]" />
                          <span>Copy Full Application Text</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })()}

              {/* Direct WhatsApp Confirmation Button */}
              <div className="space-y-2 pt-0.5">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send Confirmation to DFinance WhatsApp (+91 {COMPANY_INFO.phone})</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 px-4 rounded-xl border border-[#ede6f5] text-[#5b4d6b] hover:bg-purple-50 text-xs font-semibold cursor-pointer"
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
