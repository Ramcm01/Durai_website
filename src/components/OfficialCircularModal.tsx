import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Download,
  Languages
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';
import { useLanguage } from '../context/LanguageContext';

interface OfficialCircularModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (units?: number) => void;
}

export const OfficialCircularModal: React.FC<OfficialCircularModalProps> = ({
  isOpen,
  onClose,
  onEnroll,
}) => {
  const { language } = useLanguage();
  const [lang, setLang] = useState<'tamil' | 'english'>(language === 'ta' ? 'tamil' : 'english');

  // Keep in sync when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLang(language === 'ta' ? 'tamil' : 'english');
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#ede6f5] max-h-[92vh] flex flex-col font-['Source_Sans_3']">
        {/* Modal Top Bar */}
        <div className="bg-[#1e0a38] text-white p-4 px-5 flex justify-between items-center border-b border-purple-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#fde047]" />
            <div>
              <h3 className="font-['Playfair_Display'] font-bold text-sm sm:text-base text-white">
                Official Scheme Circular & Application Document
              </h3>
              <p className="text-[11px] text-purple-200">
                D Finance • Deepavali & Pongal Festival Special 4-Month Scheme
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <div className="flex bg-purple-900/60 rounded-lg p-0.5 border border-purple-700 text-xs">
              <button
                type="button"
                onClick={() => setLang('tamil')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                  lang === 'tamil' ? 'bg-[#f59e0b] text-[#1e0a38]' : 'text-purple-200 hover:text-white'
                }`}
              >
                தமிழ் (Original)
              </button>
              <button
                type="button"
                onClick={() => setLang('english')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                  lang === 'english' ? 'bg-[#f59e0b] text-[#1e0a38]' : 'text-purple-200 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-purple-300 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper Area */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-purple-50/50 flex justify-center">
          <div 
            id="printable-circular" 
            className="bg-white max-w-2xl w-full p-6 sm:p-10 rounded-xl shadow-md border border-[#ede6f5] text-[#1e0a38] font-sans relative"
          >
            {/* Document Header */}
            <div className="text-center pb-5 border-b-2 border-[#581c87]">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#581c87] sm:tracking-normal font-['Playfair_Display']">
                D FINANCE
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#5b4d6b] mt-1">
                {COMPANY_INFO.tamilAddress}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#1e0a38] mt-0.5">
                செல்: {COMPANY_INFO.phone} / {COMPANY_INFO.secondaryPhone}
              </p>
            </div>

            {/* Document Body */}
            {lang === 'tamil' ? (
              <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#3b2d4a] leading-relaxed font-sans">
                <p>
                  <strong>திரு. துரைபாபு</strong> என்பவர் <strong>D பைனான்ஸ்</strong> சீட்டு நிறுவனம் நடத்திக்கொண்டு வருகிறார். இவரது அலுவலகம் சென்னை குரோம்பேட்டையில் உள்ளது.
                </p>

                {/* Statutory Registration Table */}
                <div className="bg-[#faf7fd] p-3.5 rounded-lg border border-[#ede6f5] text-xs space-y-1">
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">முகவரி:</span>
                    <span className="font-semibold text-[#1e0a38]">
                      எண். 12, முதல் புதுத் தெரு, லட்சுமிபுரம், குரோம்பேட்டை, சென்னை-600 044.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">ஆதார் எண்:</span>
                    <span className="font-mono font-bold text-[#1e0a38]">{COMPANY_INFO.aadhaarNo}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">நிறுவனத்தின் சான்றிதழ் எண்:</span>
                    <span className="font-mono font-bold text-[#581c87]">{COMPANY_INFO.udyamRegNo}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-bold text-[#1e0a38] text-sm sm:text-base border-b border-[#ede6f5] pb-1 font-['Playfair_Display']">
                    இந்த சீட்டு திட்டத்தின் விவரங்கள்:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>இந்த சீட்டில் ஒரு நபர் ஒன்று அல்லது பத்து சீட்டு வரை சேரலாம்.</li>
                    <li>
                      இது நான்கு மாதம் திட்டம் மாதம் 4000 கட்டவேண்டும் நீங்கள் கட்டிய மொத்தப்பணம் ரூபாய் 16,000 அதற்கு நிறுவனம் 60% வரை வட்டி சேர்க்கப்படுகிறது. இந்த சலுகை வரும் தீபாவளி பொங்கல் பண்டிகை காலம் மட்டுமே.
                    </li>
                  </ul>
                </div>

                {/* 1 Chit Calculation Box */}
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-2 font-mono">
                  <div className="font-bold text-[#581c87] font-sans text-sm">
                    1 சீட்டு திட்டம் (கணக்கீடு):
                  </div>
                  <div className="text-[#3b2d4a]">
                    <strong>16,000 X 60% = 9,600</strong> (வாடிக்கையாளர் கட்டிய தொகை மற்றும் அதற்கு வட்டி)
                  </div>
                  <div className="text-emerald-800">
                    <strong>= 10,000</strong> (இந்த சீட்டில் சேரும் நபர் அவர்களின் மூலமாக 10 நபர்களை சேர்க்கவேண்டும். இது நிபந்தனைக்கு உட்பட்டது.)
                  </div>
                  <div className="pt-2 border-t border-purple-200 text-[#1e0a38] font-sans font-bold text-sm">
                    வாடிக்கையாளர் பெறும் தொகை (ரூபாய் 16,000 + 9,600 + 10,000 = <span className="text-[#581c87] font-black text-base">35,600</span>)
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="font-bold text-[#1e0a38]">
                    ❖ வாடிக்கையாளர் இதுவே 10 சீட்டில் சேர்ந்தால் அவர்கள் பெரும் தொகை:
                  </p>
                  <p>
                    ❖ 10 சீட்டு என்ற விதத்தில் மாதம் 40,000 ரூபாய் கட்டவேண்டும். மொத்தம் 4 மாதத்திற்கு 1,60,000 ரூபாய் அதற்கு வட்டி 60% வரை சேர்க்கப்படுகிறது.
                  </p>
                </div>

                {/* 10 Chits Calculation Box */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-xs space-y-2 font-mono">
                  <div className="font-bold text-amber-950 font-sans text-sm">
                    10 சீட்டுகள் திட்டம் (கணக்கீடு):
                  </div>
                  <div className="text-[#3b2d4a]">
                    <strong>1,60,000 X 60% = 96,000</strong> (வாடிக்கையாளர் கட்டிய தொகை மற்றும் அதற்கு வட்டி)
                  </div>
                  <div className="text-emerald-800">
                    <strong>= 20,000</strong> (இந்த சீட்டில் சேரும் நபர் அவர்களின் மூலமாக 10 நபர்களை சேர்க்கவேண்டும். ஒருநபர்க்கு ரூ.2000 X 10 = 20000 நிறுவனம் கொடுக்கப்படும். இது நிபந்தனைக்கு உட்பட்டது.)
                  </div>
                  <div className="pt-2 border-t border-amber-300 text-[#1e0a38] font-sans font-bold text-sm">
                    வாடிக்கையாளர் பெறும் தொகை (ரூபாய் 1,60,000 + 96,000 + 20,000 = <span className="text-[#581c87] font-black text-base">2,76,000</span>)
                  </div>
                </div>

                {/* Consent & Signature Block */}
                <div className="pt-5 border-t border-[#ede6f5] space-y-4">
                  <p className="font-bold text-[#1e0a38] text-center italic">
                    "இத்திட்டத்தில் முழுமனதுடன் இணைய நாங்கள் தயாராக உள்ளோம்."
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="border-b border-dotted border-purple-300 pb-1">
                      <span className="font-bold">சேரும் நாள் :</span> ________________
                    </div>
                    <div className="border-b border-dotted border-purple-300 pb-1">
                      <span className="font-bold">முடியும் நாள் :</span> ________________
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-end text-xs">
                    <div className="space-y-6">
                      <div>வாடிக்கையாளர் பெயர் மற்றும் கையொப்பம்</div>
                      <div className="border-b border-purple-300 w-48" />
                    </div>
                    <div className="text-right space-y-6">
                      <div className="font-bold text-[#1e0a38]">இப்படிக்கு</div>
                      <div className="font-bold text-[#581c87]">D FINANCE</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* English Translation of the Document */
              <div className="mt-6 space-y-4 text-xs sm:text-sm text-[#3b2d4a] leading-relaxed">
                <p>
                  <strong>Mr. Duraibabu</strong> is running the <strong>D Finance</strong> Chit Organization. The registered office is located in Chromepet, Chennai.
                </p>

                <div className="bg-[#faf7fd] p-3.5 rounded-lg border border-[#ede6f5] text-xs space-y-1">
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">Office Address:</span>
                    <span className="font-semibold text-[#1e0a38]">
                      No. 12, First New Street, Lakshmi Puram, Chromepet, Chennai - 600 044.
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">Aadhaar No:</span>
                    <span className="font-mono font-bold text-[#1e0a38]">{COMPANY_INFO.aadhaarNo}</span>
                  </div>
                  <div className="flex">
                    <span className="w-44 font-bold text-[#5b4d6b]">Udyam Reg. Certificate:</span>
                    <span className="font-mono font-bold text-[#581c87]">{COMPANY_INFO.udyamRegNo}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-bold text-[#1e0a38] text-sm sm:text-base border-b border-[#ede6f5] pb-1 font-['Playfair_Display']">
                    Chit Scheme Particulars:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>A person can join from 1 chit unit up to 10 chit units.</li>
                    <li>
                      This is a 4-month plan. You must pay ₹4,000 per month. The total principal amount paid by you is ₹16,000. For that, the company adds up to 60% interest. This offer is valid only for the upcoming Deepavali & Pongal Festival Season.
                    </li>
                  </ul>
                </div>

                {/* 1 Chit English Box */}
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-2 font-mono">
                  <div className="font-bold text-[#581c87] font-sans text-sm">
                    1 Chit Plan Breakdown:
                  </div>
                  <div className="text-[#3b2d4a]">
                    <strong>16,000 X 60% = ₹9,600</strong> (Principal paid & 60% company interest)
                  </div>
                  <div className="text-emerald-800">
                    <strong>= ₹10,000</strong> (Subscribers who introduce 10 members through them receive ₹10,000 bonus. Subject to terms.)
                  </div>
                  <div className="pt-2 border-t border-purple-200 text-[#1e0a38] font-sans font-bold text-sm">
                    Customer Total Payout: ₹16,000 + ₹9,600 + ₹10,000 = <span className="text-[#581c87] font-black text-base">₹35,600</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="font-bold text-[#1e0a38]">
                    ❖ If a customer joins with 10 Chits (Full Unit):
                  </p>
                  <p>
                    ❖ Monthly installment is ₹40,000 (for 10 chits). Total amount paid for 4 months is ₹1,60,000. Company adds 60% interest (₹96,000).
                  </p>
                </div>

                {/* 10 Chits English Box */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-xs space-y-2 font-mono">
                  <div className="font-bold text-amber-950 font-sans text-sm">
                    10 Chits Plan Breakdown:
                  </div>
                  <div className="text-[#3b2d4a]">
                    <strong>1,60,000 X 60% = ₹96,000</strong> (Principal paid & 60% company interest)
                  </div>
                  <div className="text-emerald-800">
                    <strong>= ₹20,000</strong> (For 10 members referred, company provides ₹2,000 x 10 = ₹20,000 bonus. Subject to terms.)
                  </div>
                  <div className="pt-2 border-t border-amber-300 text-[#1e0a38] font-sans font-bold text-sm">
                    Customer Total Payout: ₹1,60,000 + ₹96,000 + ₹20,000 = <span className="text-[#581c87] font-black text-base">₹2,76,000</span>
                  </div>
                </div>

                {/* English Consent Block */}
                <div className="pt-5 border-t border-[#ede6f5] space-y-4">
                  <p className="font-bold text-[#1e0a38] text-center italic">
                    "We are ready and willing to join this scheme with our full consent."
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="border-b border-dotted border-purple-300 pb-1">
                      <span className="font-bold">Joining Date:</span> ________________
                    </div>
                    <div className="border-b border-dotted border-purple-300 pb-1">
                      <span className="font-bold">Completion Date (4 Mos):</span> ________________
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-end text-xs">
                    <div className="space-y-6">
                      <div>Customer Name & Signature</div>
                      <div className="border-b border-purple-300 w-48" />
                    </div>
                    <div className="text-right space-y-6">
                      <div className="font-bold text-[#1e0a38]">Sincerely,</div>
                      <div className="font-bold text-[#581c87]">D FINANCE</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 px-6 border-t border-[#ede6f5] bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-2 px-3.5 rounded-xl border border-[#ede6f5] text-xs font-bold text-[#5b4d6b] hover:bg-purple-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#5b4d6b]" />
              <span>Print Application Form</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl border border-[#ede6f5] text-xs font-semibold text-[#5b4d6b] hover:bg-purple-50 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnroll(1);
              }}
              className="py-2 px-4 rounded-xl bg-[#581c87] hover:bg-[#4c1d95] text-white font-bold text-xs cursor-pointer shadow-sm border border-[#f59e0b]/40"
            >
              Enroll in DFinance Scheme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
