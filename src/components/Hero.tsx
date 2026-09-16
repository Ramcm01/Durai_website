import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  FileText, 
  Home, 
  Car, 
  GraduationCap, 
  IndianRupee, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  Gift 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreSchemes: () => void;
  onOpenCalculator: () => void;
  onOpenEnroll: () => void;
  onOpenCircular: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSchemes,
  onOpenCalculator,
  onOpenEnroll,
  onOpenCircular,
}) => {
  const { language, t } = useLanguage();
  const [showPayoutTable, setShowPayoutTable] = useState(false);
  const [heroImage] = useState<string>(() => {
    return localStorage.getItem('dfinance_hero_image') || '/hero-banner.webp';
  });

  return (
    <div className="relative">
      {/* Hero Section styled strictly according to jayasulochanachits.com */}
      <section 
        id="home" 
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0f172a] text-white pt-12 pb-24"
      >
        {/* Background Image: using hero image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-60 sm:opacity-50"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        {/* Gradient Overlay matching jayasulochanachits.com oklch(0.18 0.10 265) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/85 to-[#0f172a]/45" />

        {/* Left vertical brand accent bar matching jayasulochanachits.com */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8e1426]" 
          style={{ boxShadow: "4px 0 20px rgba(142, 20, 38, 0.4)" }} 
        />

        {/* Chennai Skyline watermark & decorative accents */}
        <div className="absolute top-4 right-6 text-right hidden lg:block pointer-events-none">
          <span className="font-['Dancing_Script'] text-2xl text-[#d79628] drop-shadow-md">
            More Savings, Happier Families ♡
          </span>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subheading, Category Icons, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Pill & Small Steps Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#d79628]/20 border border-[#d79628]/40 rounded-full px-4 py-1.5 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d79628] animate-pulse" />
                  <span className="text-[#d79628] text-xs sm:text-sm font-semibold font-['Source_Sans_3'] tracking-wide">
                    {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட நிறுவனம் · UDYAM: ' + COMPANY_INFO.udyamRegNo : 'Trusted Chit Partner · UDYAM: ' + COMPANY_INFO.udyamRegNo}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d79628] font-['Source_Sans_3'] bg-black/40 px-3 py-1 rounded-md border-l-2 border-[#d79628]">
                  <span>SMALL STEPS TOWARDS BIG DREAMS</span>
                </div>
              </div>

              {/* Main Headline styled like jayasulochanachits.com */}
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
                  {language === 'ta' ? (
                    <>
                      ஒன்றாக நாம் உருவாக்குவோம் <br />
                      <span className="text-[#d79628]">பிரகாசமான எதிர்காலம்</span>
                    </>
                  ) : (
                    <>
                      Together We Build <br />
                      <span className="text-[#d79628]">Brighter Tomorrows</span>
                    </>
                  )}
                </h1>
                <p className="text-xl sm:text-2xl text-[#e5e0d3] font-medium font-['Playfair_Display'] italic">
                  {language === 'ta' ? 'உங்கள் வாழ்வின் ஒவ்வொரு கட்டத்திற்கும் நம்பகமான தீபாவளி & பொங்கல் சீட்டுத் திட்டம்' : 'Trusted Chit Plans for Every Stage of Life'}
                </p>
              </div>

              {/* Descriptive Paragraph */}
              <p className="text-[#e5e0d3] text-base sm:text-lg leading-relaxed font-['Source_Sans_3'] max-w-2xl">
                {language === 'ta' ? (
                  <>
                    <strong className="text-white">DFinance (திரு. துரைபாபு)</strong>, லக்ஷ்மி புரம், குரோம்பேட்டை, சென்னை - 44. 
                    மாதம் ₹1,000 மட்டுமே சேமித்து 4 மாத முடிவில் <strong>60% லாபத்துடன் ₹6,000 ரொக்கம்</strong> + ₹4,000 பரிந்துரை சலுகைகள் பெறுங்கள்!
                  </>
                ) : (
                  <>
                    <strong className="text-white">DFinance (Prop. Mr. Duraibabu)</strong>, Lakshmi Puram, Chromepet, Chennai - 44. 
                    Special 4-Month Deepavali & Pongal Festival Chit Scheme: Save ₹1,000/month for 4 months to receive a guaranteed <strong>₹6,000 cash payout (60% return)</strong> plus up to ₹4,000 referral benefits!
                  </>
                )}
              </p>

              {/* 4 Dream Milestones matching the attached image design */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs hover:border-[#d79628] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#d79628]/20 border border-[#d79628]/40 flex items-center justify-center mb-2 text-[#d79628]">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white font-['Source_Sans_3']">
                    {language === 'ta' ? 'கனவு இல்லம்' : 'Buy Your Dream Home'}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs hover:border-[#d79628] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#d79628]/20 border border-[#d79628]/40 flex items-center justify-center mb-2 text-[#d79628]">
                    <Car className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white font-['Source_Sans_3']">
                    {language === 'ta' ? 'சொந்த வாகனம்' : 'Own Your Dream Car'}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs hover:border-[#d79628] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#d79628]/20 border border-[#d79628]/40 flex items-center justify-center mb-2 text-[#d79628]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white font-['Source_Sans_3']">
                    {language === 'ta' ? 'பிள்ளைகள் கல்வி' : "Secure Child's Future"}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs hover:border-[#d79628] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#d79628]/20 border border-[#d79628]/40 flex items-center justify-center mb-2 text-[#d79628]">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white font-['Source_Sans_3']">
                    {language === 'ta' ? 'பண்டிகை சேமிப்பு' : "Achieve Life's Milestones"}
                  </span>
                </div>
              </div>

              {/* Action Buttons matching jayasulochanachits.com */}
              <div className="flex flex-wrap gap-4 pt-4 font-['Source_Sans_3']">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hello DFinance, I want to start my journey with the 4-month festival chit scheme.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#8e1426] text-white px-7 py-3.5 rounded font-semibold text-base hover:bg-[#720f1e] transition-all duration-200 hover:scale-105 shadow-lg border border-[#d79628]/30"
                >
                  <MessageCircle className="w-5 h-5 text-[#d79628]" />
                  <span>{language === 'ta' ? 'இன்றே பயணத்தைத் தொடங்குங்கள் →' : 'Start Your Journey Today →'}</span>
                </a>

                <button
                  onClick={onOpenEnroll}
                  id="hero-enroll-scheme-btn"
                  className="flex items-center gap-2 bg-[#d79628] text-[#0f172a] px-6 py-3.5 rounded font-bold text-base hover:bg-[#caa143] transition-all duration-200 hover:scale-105 shadow-md"
                >
                  <Gift className="w-5 h-5" />
                  <span>{t.btnJoinScheme}</span>
                </button>

                <button
                  onClick={onExploreSchemes}
                  className="flex items-center gap-2 border-2 border-[#d79628] text-[#d79628] px-6 py-3.5 rounded font-semibold text-base hover:bg-[#d79628]/15 transition-all duration-200"
                >
                  <span>{language === 'ta' ? 'திட்டங்களை காண்க' : 'View Our Plans'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenCircular}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#fce8b3] px-5 py-3.5 rounded font-semibold text-sm border border-white/20 transition-all"
                >
                  <FileText className="w-4 h-4 text-[#d79628]" />
                  <span>{t.btnPdfCircular}</span>
                </button>
              </div>

              {/* Proudly Chennai Tag */}
              <div className="pt-2 flex items-center gap-2 text-sm text-[#e5e0d3]">
                <span className="font-['Dancing_Script'] text-xl text-[#d79628]">Proudly Chennai ♡</span>
                <span>•</span>
                <span>No.12, First New Street, Lakshmi Puram, Chromepet, Chennai - 44</span>
              </div>
            </div>

            {/* Right Column: High-Resolution Showcase of the Attached Image & Scheme Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#d79628]/80 shadow-2xl bg-[#162238] group">
                {/* Image presentation */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img 
                    src={heroImage}
                    alt="Happy South Indian family celebrating Deepavali and Pongal festival savings with DFinance Chit Fund Chennai"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.currentTarget;
                      if (target.src !== '/hero-banner.webp') {
                        target.src = '/hero-banner.webp';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162238] via-transparent to-black/30" />
                  
                  {/* Decorative Banner Tags matching uploaded image */}
                  <div className="absolute top-3 left-3 bg-[#8e1426] text-white text-xs font-bold px-3 py-1.5 rounded shadow-md border border-[#d79628]/50 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d79628]" />
                    <span>Bigger, Brighter, Together</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-[#d79628] text-xs font-bold px-3 py-1.5 rounded border border-[#d79628]/40 font-['Dancing_Script'] text-sm tracking-wide">
                    More Savings, Happier Families ♡
                  </div>
                </div>

                {/* Card Body: Scheme Core Math (1 to 10 Chits) */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e5e0d3]/15 pb-3">
                    <div>
                      <h4 className="font-['Playfair_Display'] text-lg font-bold text-white">
                        {language === 'ta' ? '4 மாத சிறப்பு பண்டிகை திட்டம்' : '4-Month Special Festival Scheme'}
                      </h4>
                      <p className="text-xs text-[#d79628] font-['Source_Sans_3']">
                        {language === 'ta' ? '1 முதல் 10 சீட்டுகள் வரை தேர்வு செய்யலாம்' : 'Flexible Options: 1 to 10 Chits'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPayoutTable(!showPayoutTable)}
                      className="text-xs font-bold text-[#d79628] hover:underline cursor-pointer bg-[#d79628]/10 px-2.5 py-1 rounded border border-[#d79628]/30"
                    >
                      {showPayoutTable 
                        ? (language === 'ta' ? 'சுருக்கமாக' : 'Show Less') 
                        : (language === 'ta' ? 'அட்டவணை' : 'View Breakdown')}
                    </button>
                  </div>

                  {!showPayoutTable ? (
                    <div className="grid grid-cols-2 gap-3 font-['Source_Sans_3']">
                      <div className="p-3 rounded-lg bg-[#0f172a] border border-[#e5e0d3]/15">
                        <span className="text-[11px] text-[#e5e0d3] block">
                          {language === 'ta' ? '1 சீட்டு (குறைந்தபட்சம்)' : '1 Chit Unit (Starter)'}
                        </span>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          ₹1,000 × 4 = <span className="text-[#e5e0d3]">₹4,000</span>
                        </div>
                        <div className="text-xs font-bold text-[#d79628] mt-1">
                          {language === 'ta' ? 'திரும்பப் பெறுவது: ₹6,000' : 'Guaranteed: ₹6,000'}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0f172a] border border-[#d79628]/40">
                        <span className="text-[11px] text-[#e5e0d3] block">
                          {language === 'ta' ? '10 சீட்டுகள் (அதிகபட்சம்)' : '10 Chit Units (Max)'}
                        </span>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          ₹10,000 × 4 = <span className="text-[#e5e0d3]">₹40,000</span>
                        </div>
                        <div className="text-xs font-bold text-emerald-400 mt-1">
                          {language === 'ta' ? 'திரும்பப் பெறுவது: ₹60,000' : 'Guaranteed: ₹60,000'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs font-['Source_Sans_3']">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/20 text-[#d79628]">
                            <th className="pb-1">Chits</th>
                            <th className="pb-1">Monthly</th>
                            <th className="pb-1">Total Paid</th>
                            <th className="pb-1 text-right">Cash Return</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-white">
                          {[1, 2, 3, 5, 10].map((units) => (
                            <tr key={units} className="hover:bg-white/5">
                              <td className="py-1 font-bold">{units} Chit</td>
                              <td className="py-1">₹{(units * 1000).toLocaleString('en-IN')}</td>
                              <td className="py-1 text-[#e5e0d3]">₹{(units * 4000).toLocaleString('en-IN')}</td>
                              <td className="py-1 text-right font-bold text-emerald-400">₹{(units * 6000).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={onOpenCalculator}
                      className="text-xs font-bold text-[#d79628] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'கணக்கிடும் கருவி' : 'Interactive Calculator'}</span>
                    </button>

                    <button
                      onClick={onOpenEnroll}
                      className="text-xs font-bold bg-[#8e1426] hover:bg-[#720f1e] text-white px-4 py-2 rounded transition-all"
                    >
                      {language === 'ta' ? 'இப்போதே சேரவும்' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Angled geometric divider matching jayasulochanachits.com */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-14 bg-[#faf8f4]" 
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} 
        />
      </section>

      {/* 3 Stat Rings Section matching jayasulochanachits.com */}
      <section className="bg-[#faf8f4] py-12 border-b border-[#e5e0d3]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="stat-ring w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center mb-3 bg-white shadow-sm">
                <div className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#8e1426]">
                  15<span className="text-[#d79628]">+</span>
                </div>
              </div>
              <p className="font-['Source_Sans_3'] text-xs sm:text-sm font-semibold text-[#57534e]">
                {language === 'ta' ? 'ஆண்டுகள் நம்பிக்கை' : 'Years of Trust'}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="stat-ring w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center mb-3 bg-white shadow-sm">
                <div className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#8e1426]">
                  1,000<span className="text-[#d79628]">+</span>
                </div>
              </div>
              <p className="font-['Source_Sans_3'] text-xs sm:text-sm font-semibold text-[#57534e]">
                {language === 'ta' ? 'மகிழ்ச்சியான குடும்பங்கள்' : 'Happy Families'}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="stat-ring w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center mb-3 bg-white shadow-sm">
                <div className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#8e1426]">
                  60<span className="text-[#d79628]">%</span>
                </div>
              </div>
              <p className="font-['Source_Sans_3'] text-xs sm:text-sm font-semibold text-[#57534e]">
                {language === 'ta' ? 'உத்தரவாத லாபம்' : 'Guaranteed Returns'}
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
