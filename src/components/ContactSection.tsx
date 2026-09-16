import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Building2
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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setInquiry({
        name: '',
        phone: '',
        units: '1 Chit (₹4,000/mo)',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#faf8f4] border-b border-[#e5e0d3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office & Contact Details */}
          <div className="lg:col-span-6 space-y-6 font-['Source_Sans_3']">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#8e1426]/10 text-[#8e1426] text-xs font-semibold">
              <Building2 className="w-4 h-4 text-[#8e1426]" />
              DFinance Chromepet Office
            </div>

            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#2c1b1b] tracking-tight">
              Visit Us or Connect Directly
            </h2>

            <div className="gold-divider max-w-xs my-3" />

            <p className="text-base text-[#57534e] leading-relaxed">
              திரு. துரைபாபு அவர்களின் நேரடி நிர்வாகத்தில் இயங்கும் D Finance அலுவலகத்திற்கு நேரில் வருகை தந்து திட்ட விவரங்களை அறிந்துகொள்ளலாம் அல்லது உடனடியாக இணையலாம்.
            </p>

            <div className="space-y-4 pt-2">
              {/* Address card */}
              <div className="flex items-start gap-3.5 p-4 rounded-lg bg-white border border-[#e5e0d3] shadow-xs">
                <MapPin className="w-5 h-5 text-[#8e1426] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-['Playfair_Display'] font-bold text-[#2c1b1b] block text-base">
                    {COMPANY_INFO.name} Registered Office
                  </span>
                  <p className="text-[#57534e] font-medium">
                    {COMPANY_INFO.registeredOffice}
                  </p>
                  <p className="text-[#78716c] text-[11px]">
                    {COMPANY_INFO.tamilAddress}
                  </p>
                  <p className="text-[#8e1426] text-[11px] font-semibold">
                    Landmark: {COMPANY_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-[#e5e0d3] hover:border-[#8e1426] transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#8e1426] shrink-0" />
                  <div className="text-xs">
                    <span className="text-[#78716c] block text-[10px]">Primary Mobile</span>
                    <span className="font-bold text-[#2c1b1b]">{COMPANY_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.secondaryPhone}`}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-[#e5e0d3] hover:border-[#8e1426] transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#8e1426] shrink-0" />
                  <div className="text-xs">
                    <span className="text-[#78716c] block text-[10px]">Alternate Mobile</span>
                    <span className="font-bold text-[#2c1b1b]">{COMPANY_INFO.secondaryPhone}</span>
                  </div>
                </a>
              </div>

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/918668197626?text=${encodeURIComponent('Hello DFinance, I want to join the 4-month festival scheme in Chromepet.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <span className="font-bold text-[#128C7E]">Chat with Mr. Duraibabu on WhatsApp</span>
                    <span className="text-[10px] text-[#075E54] block">+91 8668197626</span>
                  </div>
                </div>
                <span className="text-[#128C7E] font-bold">Message →</span>
              </a>

              {/* Office hours */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-[#e5e0d3] text-xs shadow-xs">
                <Clock className="w-4 h-4 text-[#d79628] shrink-0" />
                <div>
                  <span className="text-[#78716c] block text-[10px]">Office & Inquiry Hours</span>
                  <span className="text-[#2c1b1b] font-medium">{COMPANY_INFO.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Query Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-lg border border-[#e5e0d3] shadow-sm flex flex-col justify-center font-['Source_Sans_3']">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#2c1b1b] mb-2">
              Request a Callback or Enrollment Guidance
            </h3>
            <p className="text-xs text-[#57534e] mb-6">
              Fill in your contact number and our team will get in touch regarding the 4-Month Deepavali & Pongal scheme.
            </p>

            {formSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-[#2c1b1b] text-base">Inquiry Received!</h4>
                <p className="text-xs text-[#57534e]">
                  Mr. Duraibabu or our Chromepet office team will call you back within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#2c1b1b] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. R. Subramanian"
                    className="w-full px-3.5 py-2.5 rounded bg-[#faf8f4] border border-[#e5e0d3] text-[#2c1b1b] focus:outline-none focus:border-[#8e1426]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2c1b1b] mb-1">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={inquiry.phone}
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded bg-[#faf8f4] border border-[#e5e0d3] text-[#2c1b1b] focus:outline-none focus:border-[#8e1426]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2c1b1b] mb-1">Preferred Chit Plan</label>
                  <select
                    value={inquiry.units}
                    onChange={(e) => setInquiry({ ...inquiry, units: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-[#faf8f4] border border-[#e5e0d3] text-[#2c1b1b] focus:outline-none focus:border-[#8e1426]"
                  >
                    <option value="1 Chit (₹4,000/mo)">1 Chit (₹4,000/mo • ₹35,600 Payout)</option>
                    <option value="2 Chits (₹8,000/mo)">2 Chits (₹8,000/mo • ₹61,200 Payout)</option>
                    <option value="3 Chits (₹12,000/mo)">3 Chits (₹12,000/mo • ₹86,800 Payout)</option>
                    <option value="5 Chits (₹20,000/mo)">5 Chits (₹20,000/mo • ₹1,38,000 Payout)</option>
                    <option value="10 Chits (₹40,000/mo)">10 Chits (₹40,000/mo • ₹2,76,000 Payout)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2c1b1b] mb-1">Question or Special Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="Let us know if you want to visit our Chromepet office or pay digitally..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#faf8f4] border border-[#e5e0d3] text-[#2c1b1b] focus:outline-none focus:border-[#8e1426]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded bg-[#8e1426] hover:bg-[#720f1e] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4 text-[#d79628]" />
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
