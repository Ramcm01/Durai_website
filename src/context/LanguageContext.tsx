import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ta' | 'en';

export interface Translations {
  // Common
  langName: string;
  currencyPrefix: string;
  monthsSuffix: string;
  perMonth: string;
  
  // Top ribbon
  topGovtReg: string;
  topBanner: string;
  helpline: string;
  chromepetOffice: string;
  
  // Nav
  navSchemes: string;
  navCalculator: string;
  navCircular: string;
  navRunning: string;
  navHowItWorks: string;
  navAbout: string;
  navOffice: string;
  btnPdfCircular: string;
  btnPayOnline: string;
  btnJoinScheme: string;
  
  // Hero
  heroTrustBadge: string;
  heroFestivalPill: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroOfferBadge: string;
  heroOfferText: string;
  heroPillar1Title: string;
  heroPillar1Desc: string;
  heroPillar2Title: string;
  heroPillar2Desc: string;
  heroPillar3Title: string;
  heroPillar3Desc: string;
  heroBtnJoin: string;
  heroBtnCalc: string;
  heroBtnCircular: string;
  heroFamilyCardBadge: string;
  heroFamilyCardSub: string;
  heroFamilyQuote: string;
  hero1ChitLabel: string;
  hero1ChitDeposit: string;
  hero1ChitPayout: string;
  hero10ChitLabel: string;
  hero10ChitDeposit: string;
  hero10ChitPayout: string;
  
  // Schemes
  schemesPill: string;
  schemesTitle: string;
  schemesSubtitle: string;
  catAll: string;
  catSingle: string;
  catBundle: string;
  catVip: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerBadge: string;
  colMonthly: string;
  col4MoDeposit: string;
  colInterest: string;
  colReferral: string;
  colTotalPayout: string;
  colWithoutReferral: string;
  btnEnrollPlan: string;
  btnDetails: string;
  
  // Calculator
  calcPill: string;
  calcTitle: string;
  calcSubtitle: string;
  calcSliderLabel: string;
  calcTenureLabel: string;
  calcTenureValue: string;
  calcReferralTitle: string;
  calcReferralStandardDesc: string;
  calcReferralVipDesc: string;
  calcReferralNote: string;
  calcFormulaTitle: string;
  calcFormulaPrincipal: string;
  calcFormulaInterest: string;
  calcFormulaBonus: string;
  calcResultLabel: string;
  calcComparisonTitle: string;
  calcBankRdLabel: string;
  calcDfinanceLabel: string;
  calcExtraGain: string;
  calcBtnEnroll: string;
  calcBtnCircular: string;

  // Why Choose Us
  whyPill: string;
  whyTitle: string;
  whySubtitle: string;
  whyTrustTitle: string;
  whyTrustDesc: string;
  
  // Circular
  viewCircular: string;
  downloadCircular: string;
}

const translations: Record<Language, Translations> = {
  ta: {
    langName: 'தமிழ்',
    currencyPrefix: '₹',
    monthsSuffix: 'மாதங்கள்',
    perMonth: 'மாதம்',
    
    topGovtReg: 'மத்திய அரசு உத்யம் பதிவு',
    topBanner: '✨ தீபாவளி - பொங்கல் சிறப்பு 4 மாத சேமிப்புத் திட்டம் • 60% வட்டி வரை • Prop. திரு. S.துரைபாபு',
    helpline: 'உதவி எண்',
    chromepetOffice: 'குரோம்பேட்டை, சென்னை - 44',
    
    navSchemes: 'பண்டிகை சீட்டுகள்',
    navCalculator: 'சீட்டு கணக்கீடு',
    navCircular: 'அதிகாரப்பூர்வ சுற்றறிக்கை',
    navRunning: 'நடைமுறை சீட்டுகள்',
    navHowItWorks: 'செயல்படும் முறை',
    navAbout: 'DFinance பற்றி',
    navOffice: 'குரோம்பேட்டை கிளை',
    btnPdfCircular: 'PDF சுற்றறிக்கை',
    btnPayOnline: 'ஆன்லைன் கட்டணம்',
    btnJoinScheme: 'சீட்டில் சேரவும்',
    
    heroTrustBadge: 'மத்திய அரசு உத்யம் பதிவு எண்: UDYAM-TN-02-0501215 • குரோம்பேட்டை, சென்னை - 44',
    heroFestivalPill: 'தீபாவளி & பொங்கல் பண்டிகை கால சிறப்புச் சேமிப்பு',
    heroTitleLine1: '4 மாத அதிவேக',
    heroTitleHighlight: 'தீபாவளி சீட்டு திட்டம்',
    heroSubtitle: 'DFINANCE • உரிமையாளர் திரு. S.துரைபாபு',
    heroOfferBadge: 'அதிகபட்ச லாபம் தரும் பண்டிகை கால சிறப்புத் திட்டம்',
    heroOfferText: 'மாதம் வெறும் ₹4,000 மட்டும் 4 மாதங்கள் செலுத்தி, நிறுவனம் வழங்கும் 60% வரை வட்டி (₹9,600) மற்றும் 10 நபர்களை சேர்த்தால் ₹10,000 போனஸ் பெற்று மொத்தம் ₹35,600 வரை பெற்றிடுங்கள்!',
    heroPillar1Title: '1 முதல் 10 சீட்டு',
    heroPillar1Desc: 'உங்கள் விருப்பப்படி தேர்வு',
    heroPillar2Title: '60% வரை வட்டி',
    heroPillar2Desc: '₹9,600 முதல் ₹96,000 வரை',
    heroPillar3Title: '4 மாதம் மட்டுமே',
    heroPillar3Desc: 'குரோம்பேட்டை நேரடி கிளை',
    heroBtnJoin: 'பண்டிகை சீட்டில் இப்போதே சேரவும்',
    heroBtnCalc: '1 முதல் 10 சீட்டு தொகையைக் கணக்கிடுக',
    heroBtnCircular: 'அதிகாரப்பூர்வ PDF சுற்றறிக்கை',
    heroFamilyCardBadge: 'மகிழ்ச்சியான குடும்ப பண்டிகை சேமிப்பு',
    heroFamilyCardSub: '4 மாதத்தில் சேமித்து, குடும்பத்துடன் தீபாவளி & பொங்கலை சிறப்பாகக் கொண்டாடுங்கள்!',
    heroFamilyQuote: '"DFinance மூலமாக எங்களது குடும்ப பண்டிகை செலவுகளுக்கு முழுப் பாதுகாப்புடன் கூடிய சேமிப்பு கிடைத்துள்ளது."',
    hero1ChitLabel: '1 சீட்டு (மாதம் ₹4,000 X 4 மாதம்)',
    hero1ChitDeposit: 'கட்டிய தொகை: ₹16,000',
    hero1ChitPayout: 'வாடிக்கையாளர் பெறும் தொகை: ₹35,600',
    hero10ChitLabel: '10 சீட்டுகள் முழுத் திட்டம் (மாதம் ₹40,000)',
    hero10ChitDeposit: 'கட்டிய தொகை: ₹1,60,000',
    hero10ChitPayout: 'வாடிக்கையாளர் பெறும் தொகை: ₹2,76,000',

    schemesPill: 'தீபாவளி - பொங்கல் பண்டிகை கால சிறப்பு 4 மாத திட்டங்கள்',
    schemesTitle: 'DFinance Festival Chit Plans',
    schemesSubtitle: 'இந்த சீட்டில் ஒரு நபர் 1 முதல் 10 சீட்டு வரை சேரலாம். 4 மாதங்கள் மட்டும் மாதம் ₹4,000 வீதம் செலுத்தி 60% வரை வட்டி மற்றும் சிறப்பு பரிந்துரை போனஸ் பெற்றிடுங்கள்.',
    catAll: 'அனைத்து திட்டங்கள் (1 முதல் 10 சீட்டுகள்)',
    catSingle: '1 சீட்டு (அடிப்படை திட்டம்)',
    catBundle: '2 முதல் 5 சீட்டுகள் (வளர்ச்சி)',
    catVip: '10 சீட்டுகள் (மெகா திட்டம்)',
    bannerTitle: 'குறுகிய 4 மாதத்தில் பெருந்தொகை சேமிப்பு!',
    bannerDesc: 'பாரம்பரிய 25-40 மாத சீட்டுகள் போல் அல்லாமல், இது 4 மாதங்களில் முழுமையாக முடிவடையும் அதிவேகப் பண்டிகை காலத் திட்டம். குடும்ப பண்டிகை செலவுகளுக்கும் தங்க நகை சேமிப்பிற்கும் மிகச்சிறந்த வழி.',
    bannerBadge: 'குடும்ப மகிழ்ச்சி & பொருளாதார வளர்ச்சி',
    colMonthly: 'மாத தவணை:',
    col4MoDeposit: '4 மாதங்களில் நீங்கள் செலுத்தியது:',
    colInterest: 'நிறுவனம் தரும் 60% வட்டி:',
    colReferral: '10 நபர் பரிந்துரை போனஸ்:',
    colTotalPayout: 'வாடிக்கையாளர் பெறும் மொத்த முதிர்வுத் தொகை:',
    colWithoutReferral: 'பரிந்துரை சேர்க்கப்படாவிட்டால்:',
    btnEnrollPlan: 'இத்திட்டத்தில் சேரவும்',
    btnDetails: 'கணக்கீடு & முழு விவரம் பார்க்க',

    calcPill: 'அதிகாரப்பூர்வ சுற்றறிக்கை கணக்கீடு',
    calcTitle: 'DFinance 4-Month Festival Calculator',
    calcSubtitle: 'தீபாவளி - பொங்கல் பண்டிகை கால சிறப்பு 4 மாத திட்டம். 1 முதல் 10 சீட்டுகள் வரை தேர்வு செய்து உங்கள் 60% வட்டி மற்றும் பரிந்துரை பலனை உடனடியாகக் கணக்கிடுங்கள்.',
    calcSliderLabel: 'சீட்டுகளின் எண்ணிக்கையைத் தேர்வு செய்க (1 to 10 Chits)',
    calcTenureLabel: 'கால அளவு',
    calcTenureValue: '4 மாதங்கள் (Festival Special)',
    calcReferralTitle: '10 நபர்களை சேர்க்கும் கூடுதல் சலுகை',
    calcReferralStandardDesc: 'இந்த சீட்டில் சேரும் நபர் அவர்களின் மூலமாக 10 நபர்களை சேர்க்கும்போது ₹10,000 சிறப்பு போனஸ் வழங்கப்படுகிறது.',
    calcReferralVipDesc: '10 சீட்டுகளில் 10 நபர்களை சேர்க்கும்போது ஒரு நபர்க்கு ரூ. 2,000 வீதம் ₹20,000 நிறுவனம் வழங்கும்.',
    calcReferralNote: '(இது நிபந்தனைக்கு உட்பட்டது)',
    calcFormulaTitle: 'அதிகாரப்பூர்வ சுற்றறிக்கை கணக்கீட்டு முறை:',
    calcFormulaPrincipal: 'அசல்',
    calcFormulaInterest: 'நிறுவன 60% வட்டி',
    calcFormulaBonus: 'பரிந்துரை போனஸ்',
    calcResultLabel: 'வாடிக்கையாளர் பெறும் மொத்தத் தொகை:',
    calcComparisonTitle: 'ஒப்பீடு: DFinance vs வங்கி RD',
    calcBankRdLabel: 'வங்கி RD (ஆண்டுக்கு 6.5%):',
    calcDfinanceLabel: 'DFinance 4-மாத முதிர்வு:',
    calcExtraGain: 'கூடுதல் லாபம்',
    calcBtnEnroll: 'இந்த சீட்டு திட்டத்தில் சேரவும்',
    calcBtnCircular: 'சுற்றறிக்கையில் விதிகளைச் சரிபார்க்க',

    whyPill: 'குரோம்பேட்டை கிளை சிறப்பு & நம்பகத்தன்மை',
    whyTitle: 'Why Savers Choose DFinance',
    whySubtitle: 'குரோம்பேட்டையில் திரு. S.துரைபாபு அவர்களின் நேரடி நிர்வாகத்தில் இயங்கும் DFinance சீட்டு நிறுவனம் தரும் நம்பகத்தன்மை மற்றும் சிறப்பு பலன்கள்.',
    whyTrustTitle: 'நேரடி அலுவலகம் • வெளிப்படையான கணக்கு விவரங்கள்',
    whyTrustDesc: 'எங்கள் பதிவு அலுவலகத்திற்கு (எண் 12, முதல் புதுத் தெரு, லட்சுமிபுரம், குரோம்பேட்டை) நேரில் வந்து ரசீதுகளைப் பெறலாம். திரு. S.துரைபாபு அவர்களின் நேரடிப் பொறுப்பில் உங்கள் பணம் முழுப் பாதுகாப்போடு சேமிக்கப்படுகிறது.',

    viewCircular: 'அதிகாரப்பூர்வ சுற்றறிக்கை பார்க்க',
    downloadCircular: 'சுற்றறிக்கையை பதிவிறக்க',
  },
  en: {
    langName: 'English',
    currencyPrefix: '₹',
    monthsSuffix: 'Months',
    perMonth: 'month',
    
    topGovtReg: 'Govt. Udyam Registered',
    topBanner: '✨ Deepavali & Pongal Festival 4-Month Special Chit • Up to 60% Yield • Prop. Mr. S.Duraibabu',
    helpline: 'Helpline',
    chromepetOffice: 'Chromepet, Chennai - 44',
    
    navSchemes: 'Festival Schemes',
    navCalculator: 'Calculator',
    navCircular: 'Official Circular',
    navRunning: 'Running Batches',
    navHowItWorks: 'How It Works',
    navAbout: 'About DFinance',
    navOffice: 'Chromepet Office',
    btnPdfCircular: 'PDF Circular',
    btnPayOnline: 'Pay Online',
    btnJoinScheme: 'Join Scheme',
    
    heroTrustBadge: 'Govt. of India Udyam Reg: UDYAM-TN-02-0501215 • Chromepet, Chennai - 44',
    heroFestivalPill: 'Deepavali & Pongal Festival Special Savings Scheme',
    heroTitleLine1: 'Rapid 4-Month',
    heroTitleHighlight: 'Diwali Festival Chit Scheme',
    heroSubtitle: 'DFINANCE • Proprietor: Mr. S.Duraibabu',
    heroOfferBadge: 'Maximum Profit Festive Savings Plan',
    heroOfferText: 'Pay only ₹4,000 per month for just 4 months. Earn up to 60% company interest (₹9,600) and an extra ₹10,000 bonus on referring 10 members to receive up to ₹35,600 total payout!',
    heroPillar1Title: '1 to 10 Chit Units',
    heroPillar1Desc: 'Choose your desired scale',
    heroPillar2Title: 'Up to 60% Company Yield',
    heroPillar2Desc: '₹9,600 up to ₹96,000',
    heroPillar3Title: 'Strictly 4 Months',
    heroPillar3Desc: 'Chromepet registered office',
    heroBtnJoin: 'Join Festival Scheme Now',
    heroBtnCalc: 'Calculate 1 to 10 Chits Payout',
    heroBtnCircular: 'View Official PDF Circular',
    heroFamilyCardBadge: 'Happy Family Festive Savings',
    heroFamilyCardSub: 'Save swiftly in 4 months and celebrate Deepavali & Pongal with joyful abundance!',
    heroFamilyQuote: '"DFinance gave our family complete financial peace and festive cheer with guaranteed high returns."',
    hero1ChitLabel: '1 Chit Plan (₹4,000/mo × 4 Months)',
    hero1ChitDeposit: 'Total Paid: ₹16,000',
    hero1ChitPayout: 'Customer Receives: ₹35,600',
    hero10ChitLabel: '10 Chits Mega Block (₹40,000/mo)',
    hero10ChitDeposit: 'Total Paid: ₹1,60,000',
    hero10ChitPayout: 'Customer Receives: ₹2,76,000',

    schemesPill: 'Deepavali - Pongal Festival Special 4-Month Plans',
    schemesTitle: 'DFinance Festival Chit Plans',
    schemesSubtitle: 'An individual can enroll in 1 to 10 chits. Pay ₹4,000 per chit for only 4 months to receive 60% company yield plus special 10-member referral bonus.',
    catAll: 'All Plans (1 to 10 Chits)',
    catSingle: '1 Chit (Standard Unit)',
    catBundle: '2 to 5 Chits (Growth)',
    catVip: '10 Chits (Mega Block)',
    bannerTitle: 'Significant Capital Growth in Just 4 Months!',
    bannerDesc: 'Unlike conventional 25-40 month chits, this is an ultra-fast festival cycle designed for festival expenses, jewelry purchases, and family security.',
    bannerBadge: 'Family Security & Wealth Growth',
    colMonthly: 'Monthly Deposit:',
    col4MoDeposit: '4-Month Total Deposited:',
    colInterest: '60% Company Interest Added:',
    colReferral: '10-Member Referral Bonus:',
    colTotalPayout: 'Customer Total Maturity Payout:',
    colWithoutReferral: 'Payout without referral bonus:',
    btnEnrollPlan: 'Enroll in this Plan',
    btnDetails: 'View Mathematical Breakdown',

    calcPill: 'Official Circular Model Calculation',
    calcTitle: 'DFinance 4-Month Festival Calculator',
    calcSubtitle: 'Special Deepavali - Pongal 4-Month Scheme. Select 1 to 10 chit units to see your 60% company interest and referral bonuses calculated in real-time.',
    calcSliderLabel: 'Select Number of Chits (1 to 10 Units)',
    calcTenureLabel: 'Tenure Period',
    calcTenureValue: '4 Months (Festival Special)',
    calcReferralTitle: '10-Member Referral Bonus',
    calcReferralStandardDesc: 'When the enrolled member introduces 10 members through their reference, a special ₹10,000 bonus is granted.',
    calcReferralVipDesc: 'For 10 chits, introducing 10 members awards ₹2,000 per member = ₹20,000 bonus payout.',
    calcReferralNote: '(Subject to circular terms and conditions)',
    calcFormulaTitle: 'Official PDF Circular Formula Breakdown:',
    calcFormulaPrincipal: 'Principal',
    calcFormulaInterest: '60% Company Interest',
    calcFormulaBonus: 'Referral Bonus',
    calcResultLabel: 'Total Amount Customer Receives:',
    calcComparisonTitle: 'Comparison: DFinance vs Bank RD',
    calcBankRdLabel: 'Typical Bank RD (6.5% p.a.):',
    calcDfinanceLabel: 'DFinance 4-Month Return:',
    calcExtraGain: 'Extra Gain',
    calcBtnEnroll: 'Enroll in this Plan',
    calcBtnCircular: 'Verify Terms in PDF Circular',

    whyPill: 'Chromepet Branch Trust & Credibility',
    whyTitle: 'Why Savers Choose DFinance',
    whySubtitle: 'Operating under the direct supervision of proprietor Mr. S.Duraibabu in Chromepet, Chennai with full transparency and verified receipts.',
    whyTrustTitle: 'Direct Walk-in Branch • Transparent Records',
    whyTrustDesc: 'Visit our registered office at No.12, First New Street, Lakshmi Puram, Chromepet, Chennai - 44 for instant computerized and printed receipts. Managed with utmost security.',

    viewCircular: 'View Official Circular',
    downloadCircular: 'Download PDF Circular',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('dfinance_lang');
      if (saved === 'en' || saved === 'ta') return saved;
    } catch {
      // ignore
    }
    return 'ta'; // Default to Tamil as primary local language
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('dfinance_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ta' ? 'en' : 'ta');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
