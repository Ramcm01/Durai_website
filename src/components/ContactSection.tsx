import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Building2,
  Mail
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: '',
    phone: '',
    units: '1 Chit (₹4,000/mo)',
    message: '',
  });

  const [inquiryEmailDetails, setInquiryEmailDetails] = useState<{ mailtoUrl: string; to: string; cc: string } | null>(null);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[DFinance Chit Inquiry] ${inquiry.name} (${inquiry.units})`;
    const body = `CHIT SCHEME INQUIRY - DFINANCE CHROMEPET
Date: ${new Date().toLocaleDateString('en-IN')}

Sender Details:
----------------------------------------
Name: ${inquiry.name}
Phone: ${inquiry.phone}
Interested Plan: ${inquiry.units}
Message: ${inquiry.message || 'No additional note'}

----------------------------------------
Sent via DFinance Online Web Portal.`;

    const mailtoUrl = `mailto:${COMPANY_INFO.chitAdminEmail}?cc=${COMPANY_INFO.chitCcEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setInquiryEmailDetails({
      mailtoUrl,
      to: COMPANY_INFO.chitAdminEmail,
      cc: COMPANY_INFO.chitCcEmail,
    });
    setFormSent(true);

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Handled in UI
    }

    setTimeout(() => {
      setFormSent(false);
      setInquiry({
        name: '',
        phone: '',
        units: '1 Chit (₹4,000/mo)',
        message: '',
      });
    }, 8000);
  };

  return (
    <section id="contact" className="py-20 bg-[#faf7fd] border-b border-[#ede6f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office & Contact Details */}
          <div className="lg:col-span-6 space-y-6 font-['Source_Sans_3']">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#581c87] text-xs font-semibold border border-purple-200">
              <Building2 className="w-4 h-4 text-[#581c87]" />
              DFinance Chromepet Office
            </div>

            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#1e0a38] tracking-tight">
              Visit Us or Connect Directly
            </h2>

            <div className="gold-divider max-w-xs my-3" />

            <p className="text-base text-[#5b4d6b] leading-relaxed">
              திரு. துரைபாபு அவர்களின் நேரடி நிர்வாகத்தில் இயங்கும் D Finance அலுவலகத்திற்கு நேரில் வருகை தந்து திட்ட விவரங்களை அறிந்துகொள்ளலாம் அல்லது உடனடியாக இணையலாம்.
            </p>

            <div className="space-y-4 pt-2">
              {/* Address card */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#ede6f5] shadow-xs">
                <MapPin className="w-5 h-5 text-[#581c87] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-['Playfair_Display'] font-bold text-[#1e0a38] block text-base">
                    {COMPANY_INFO.name} Registered Office
                  </span>
                  <p className="text-[#5b4d6b] font-medium">
                    {COMPANY_INFO.registeredOffice}
                  </p>
                  <p className="text-[#78716c] text-[11px]">
                    {COMPANY_INFO.tamilAddress}
                  </p>
                  <p className="text-[#581c87] text-[11px] font-semibold">
                    Landmark: {COMPANY_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#ede6f5] hover:border-[#581c87] transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#581c87] shrink-0" />
                  <div className="text-xs">
                    <span className="text-[#78716c] block text-[10px]">Primary Mobile</span>
                    <span className="font-bold text-[#1e0a38]">{COMPANY_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.secondaryPhone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#ede6f5] hover:border-[#581c87] transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#581c87] shrink-0" />
                  <div className="text-xs">
                    <span className="text-[#78716c] block text-[10px]">Alternate Mobile</span>
                    <span className="font-bold text-[#1e0a38]">{COMPANY_INFO.secondaryPhone}</span>
                  </div>
                </a>
              </div>

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('Hello DFinance, I want to join the 4-month festival scheme in Chromepet.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <span className="font-bold text-[#128C7E]">Chat with Mr. Duraibabu on WhatsApp</span>
                    <span className="text-[10px] text-[#075E54] block">+91 {COMPANY_INFO.phone}</span>
                  </div>
                </div>
                <span className="text-[#128C7E] font-bold">Message →</span>
              </a>

              {/* Office hours */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#ede6f5] text-xs shadow-xs">
                <Clock className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <div>
                  <span className="text-[#78716c] block text-[10px]">Office & Inquiry Hours</span>
                  <span className="text-[#1e0a38] font-medium">{COMPANY_INFO.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Query Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-[#ede6f5] shadow-sm flex flex-col justify-center font-['Source_Sans_3']">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1e0a38] mb-2">
              Request a Callback or Enrollment Guidance
            </h3>
            <p className="text-xs text-[#5b4d6b] mb-6">
              Fill in your contact number and our team will get in touch regarding the 4-Month Deepavali & Pongal scheme.
            </p>

            {formSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-[#1e0a38] text-base">Inquiry Prepared & Dispatched!</h4>
                <p className="text-xs text-[#5b4d6b]">
                  Your inquiry has been routed to <strong>{COMPANY_INFO.chitAdminEmail}</strong> (CC: <strong>{COMPANY_INFO.chitCcEmail}</strong>). Mr. Duraibabu or our Chromepet office team will call you back within 2 hours.
                </p>
                {inquiryEmailDetails && (
                  <div className="pt-2">
                    <a
                      href={inquiryEmailDetails.mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#581c87] text-white text-xs font-bold hover:bg-[#4c1d95] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Mail App</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#1e0a38] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. R. Subramanian"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf7fd] border border-[#ede6f5] text-[#1e0a38] focus:outline-none focus:border-[#581c87]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1e0a38] mb-1">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={inquiry.phone}
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf7fd] border border-[#ede6f5] text-[#1e0a38] focus:outline-none focus:border-[#581c87]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1e0a38] mb-1">Preferred Chit Plan</label>
                  <select
                    value={inquiry.units}
                    onChange={(e) => setInquiry({ ...inquiry, units: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf7fd] border border-[#ede6f5] text-[#1e0a38] focus:outline-none focus:border-[#581c87]"
                  >
                    <option value="1 Chit (₹4,000/mo)">1 Chit (₹4,000/mo • ₹35,600 Payout)</option>
                    <option value="2 Chits (₹8,000/mo)">2 Chits (₹8,000/mo • ₹61,200 Payout)</option>
                    <option value="3 Chits (₹12,000/mo)">3 Chits (₹12,000/mo • ₹86,800 Payout)</option>
                    <option value="5 Chits (₹20,000/mo)">5 Chits (₹20,000/mo • ₹1,38,000 Payout)</option>
                    <option value="10 Chits (₹40,000/mo)">10 Chits (₹40,000/mo • ₹2,76,000 Payout)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1e0a38] mb-1">Question or Special Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="Let us know if you want to visit our Chromepet office or pay digitally..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf7fd] border border-[#ede6f5] text-[#1e0a38] focus:outline-none focus:border-[#581c87]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#581c87] hover:bg-[#4c1d95] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors border border-[#f59e0b]/40"
                >
                  <Send className="w-4 h-4 text-[#fde047]" />
                  <span>Submit Inquiry to DFinance</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
