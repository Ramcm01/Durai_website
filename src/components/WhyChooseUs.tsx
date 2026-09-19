import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  Building2,
  Banknote,
  Gift,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { language, t } = useLanguage();

  const advantages = [
    {
      title: language === 'ta' ? 'உத்யம் பதிவு & நேரடி நம்பகத்தன்மை' : 'Govt. Udyam Registered & Verified',
      desc: language === 'ta'
        ? `மத்திய அரசு உத்யம் பதிவு எண்: ${COMPANY_INFO.udyamRegNo}. உரிமையாளர் ${COMPANY_INFO.proprietor} அவர்களின் நேரடி மேற்பார்வையில் 100% நேர்மையுடன் இயங்குகிறது.`
        : `Govt. of India Udyam Registration Certificate No: ${COMPANY_INFO.udyamRegNo}. Operated with utmost transparency by proprietor ${COMPANY_INFO.proprietor}.`,
      icon: ShieldCheck,
    },
    {
      title: language === 'ta' ? 'அதிவேக 4 மாத கால அளவு' : 'Fast 4-Month Rapid Tenure',
      desc: language === 'ta'
        ? 'நீண்ட 20 முதல் 40 மாதங்கள் காத்திருக்கத் தேவையில்லை. 4 மாதங்களில் முழுத் தொகையும் 60% வட்டியுடன் உங்கள் கைகளில் கிடைக்கும்.'
        : 'No prolonged 20-40 month commitments. Complete 4 monthly installments and receive principal + 60% yield in time for festivals.',
      icon: Clock,
    },
    {
      title: language === 'ta' ? '60% வரை சிறப்பு வட்டி சலுகை' : 'Up to 60% Festive Company Yield',
      desc: language === 'ta'
        ? 'தீபாவளி - பொங்கல் பண்டிகையை முன்னிட்டு உங்கள் சேமிப்பிற்கு நிறுவனம் வழங்கும் 60% கூடுதல் வட்டி சலுகை.'
        : 'Festive return of up to 60% added on your deposited principal (e.g. ₹9,600 on ₹16,000) for joyous festival purchases.',
      icon: Gift,
    },
    {
      title: language === 'ta' ? '10 நபர் பரிந்துரை போனஸ்' : '10-Member Referral Incentive',
      desc: language === 'ta'
        ? 'உங்கள் மூலமாக 10 நபர்களை இந்த சீட்டில் இணைத்தால் ₹10,000 முதல் ₹20,000 வரை சிறப்பு பரிந்துரை போனஸ் கிடைக்கும்.'
        : 'Introduce 10 members through your reference and receive ₹10,000 (standard chits) or ₹20,000 (10-chit block) bonus.',
      icon: Users,
    },
    {
      title: language === 'ta' ? 'குரோம்பேட்டை நேரடி பதிவு அலுவலகம்' : 'Convenient Chromepet Office',
      desc: language === 'ta'
        ? 'எண் 12, முதல் புதுத் தெரு, லட்சுமிபுரம், குரோம்பேட்டை, சென்னை 600044. (ரயில் நிலையம் மற்றும் ஜி.எஸ்.டி சாலை அருகில்).'
        : 'Located at No.12, First New Street, Lakshmi Puram, Chromepet, Chennai - 44 (Near Chromepet Railway Station & GST Road).',
      icon: Building2,
    },
    {
      title: language === 'ta' ? 'டிஜிட்டல் UPI & கணினி ரசீதுகள்' : 'Digital UPI & Instant Receipts',
      desc: language === 'ta'
        ? 'கூகுள் பே, போன்பே அல்லது நேரடி வங்கி மூலம் கட்டலாம். கட்டிய உடன் வாட்ஸ்அப் மற்றும் அச்சிடப்பட்ட அதிகாரப்பூர்வ ரசீது தரப்படும்.'
        : 'Pay seamlessly via Google Pay, PhonePe, or Bank Transfer. Instant printed & WhatsApp receipts issued for every payment.',
      icon: Banknote,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-[#ede6f5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#581c87] bg-purple-100 px-3.5 py-1.5 rounded-full font-['Source_Sans_3'] mb-3 border border-purple-200">
            <Sparkles className="w-4 h-4 text-[#581c87]" />
            <span>{t.whyPill}</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e0a38] tracking-tight">
            {t.whyTitle}
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#5b4d6b] font-medium font-['Source_Sans_3'] leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 font-['Source_Sans_3']">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-[#ede6f5] hover:border-[#581c87]/60 transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#581c87] group-hover:bg-[#581c87] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38] mb-2 group-hover:text-[#581c87] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-[#5b4d6b] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Trust Banner with Proprietor Guarantee */}
        <div className="rounded-xl bg-[#faf7fd] p-6 sm:p-8 border border-[#f59e0b]/50 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center font-['Source_Sans_3']">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[#581c87] font-bold text-xs uppercase tracking-widest block">
                {language === 'ta' ? 'அதிகாரப்பூர்வ உத்தரவாதம்' : 'Official Guarantee'}
              </span>
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#1e0a38]">
                {t.whyTrustTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5b4d6b] leading-relaxed">
                {t.whyTrustDesc}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center p-4 rounded-xl bg-white border border-[#ede6f5]">
              <span className="text-xs text-[#5b4d6b]">{language === 'ta' ? 'நிர்வாக உரிமையாளர்' : 'Managing Proprietor'}</span>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#581c87] mt-0.5">{COMPANY_INFO.proprietor}</span>
              <span className="text-xs text-[#1e0a38] mt-1 font-semibold">{COMPANY_INFO.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
