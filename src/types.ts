export interface ChitScheme {
  id: string;
  code: string;
  name: string;
  tamilName?: string;
  chitUnits: number; // 1 to 10 chits
  chitValue: number; // total expected payout with return
  durationMonths: number; // 4 months for this festival scheme
  monthlyInstallment: number; // e.g. 4000, 8000, ... 40000
  totalPrincipalDeposited: number; // monthly * 4
  interestPercent: number; // 60%
  interestAmount: number; // 60% of principal
  referralBonus: number; // e.g. 10,000 or 20,000 for 10 members
  totalCustomerPayout: number; // principal + interest + referral
  totalPayoutWithoutReferral: number; // principal + interest
  membersCount: number;
  category: 'single' | 'bundle' | 'vip' | 'popular';
  status: 'Enrolling Now' | 'Fast Filling' | 'Limited Slots';
  targetAudience: string;
  highlights: string[];
}

export interface VacantChit {
  id: string;
  groupCode: string;
  chitValue: number;
  durationMonths: number;
  completedMonths: number;
  remainingMonths: number;
  monthlyInstallment: number;
  accumulatedPaidPrincipal: number;
  accumulatedDividendBenefit: number;
  eligibleForNextAuction: boolean;
  nextAuctionDate: string;
  vacantSlotNumber: number;
  status: 'Available' | 'Reserved';
}

export interface AuctionEvent {
  id: string;
  groupCode: string;
  chitValue: number;
  auctionNo: number;
  totalAuctions: number;
  date: string;
  time: string;
  venue: string;
  mode: 'Hybrid (In-Office & Aana Paisa App)' | 'Online Bidding';
  minBidFloor: number;
  maxBidCeiling: number;
  status: 'Upcoming' | 'Live Today' | 'Completed';
  lastMonthWinningBid?: number;
  lastMonthDividendPerMember?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl?: string;
  rating: number;
  review: string;
  schemeEnrolled: string;
  yearsWithCompany: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'bidding' | 'payments' | 'legal';
}
