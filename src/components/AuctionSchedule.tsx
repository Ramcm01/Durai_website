import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Gavel, 
  ShieldCheck, 
  Smartphone, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { AUCTION_EVENTS, COMPANY_INFO } from '../data/chitData';

interface AuctionScheduleProps {
  onOpenAppShowcase: () => void;
}

export const AuctionSchedule: React.FC<AuctionScheduleProps> = ({ onOpenAppShowcase }) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'rules'>('upcoming');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="auctions" className="py-20 bg-white border-b border-[#ede6f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Source_Sans_3']">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#581c87] text-xs font-semibold mb-3 border border-purple-200">
            <Gavel className="w-4 h-4 text-[#581c87]" />
            <span>Monthly Bidding & Disbursement Schedule</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#1e0a38] tracking-tight">
            DFinance Batch Schedule & Disbursals
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-base text-[#5b4d6b]">
            Monthly schedule of reverse auctions, installment deadlines, and prize disbursals conducted at our Chromepet registered office.
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-[#faf7fd] border border-[#ede6f5] mt-6">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTab === 'upcoming'
                  ? 'bg-[#581c87] text-white shadow-xs'
                  : 'text-[#5b4d6b] hover:text-[#1e0a38]'
              }`}
            >
              Upcoming Batch Meetings
            </button>
            <button
              onClick={() => setSelectedTab('rules')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTab === 'rules'
                  ? 'bg-[#581c87] text-white shadow-xs'
                  : 'text-[#5b4d6b] hover:text-[#1e0a38]'
              }`}
            >
              Rules & Security Guidelines
            </button>
          </div>
        </div>

        {/* Tab 1: Upcoming Batches */}
        {selectedTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUCTION_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-[#faf7fd] rounded-xl border border-[#ede6f5] hover:border-[#581c87]/50 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-100 text-[#581c87]">
                      {event.groupCode}
                    </span>
                    <span className="text-xs font-semibold text-[#5b4d6b] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38]">
                    {formatCurrency(event.chitValue)} Chit Group
                  </h3>

                  <div className="mt-4 space-y-2 text-xs border-y border-[#ede6f5] py-3 text-[#5b4d6b]">
                    <div className="flex justify-between">
                      <span>Auction Date:</span>
                      <strong className="text-[#1e0a38]">{event.date}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum Bid Ceiling:</span>
                      <strong className="text-[#581c87]">{formatCurrency(event.maxBidCeiling)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Venue:</span>
                      <span className="font-medium text-[#1e0a38] text-right truncate max-w-[180px]">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>In-person & Digital Proxy</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAppShowcase}
                    className="text-xs font-bold text-[#581c87] hover:underline cursor-pointer"
                  >
                    View Office Map →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Guidelines */}
        {selectedTab === 'rules' && (
          <div className="bg-[#faf7fd] rounded-xl p-6 sm:p-8 border border-[#ede6f5] space-y-6">
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1e0a38] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#581c87]" />
              Official Rules & Auction Transparency Guidelines
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5b4d6b] leading-relaxed">
              <div className="p-4 rounded-xl bg-white border border-[#ede6f5] space-y-2">
                <h4 className="font-bold text-[#1e0a38] text-sm">1. Installment Due Dates</h4>
                <p>
                  Monthly subscriptions are due on or before the 10th of every calendar month. Subscriptions can be remitted in cash at our Chromepet counter or via Google Pay / PhonePe / Bank transfer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ede6f5] space-y-2">
                <h4 className="font-bold text-[#1e0a38] text-sm">2. 60% Festive Interest Scheme</h4>
                <p>
                  In the 4-Month Deepavali - Pongal scheme, subscribers depositing ₹4,000/month (total ₹16,000 for 1 chit) are entitled to ₹9,600 company interest plus referral bonus upon fulfilling eligibility.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ede6f5] space-y-2">
                <h4 className="font-bold text-[#1e0a38] text-sm">3. Security Verification</h4>
                <p>
                  Subscribers must submit Government ID (Aadhaar / PAN / Voter ID) at the time of subscription registration. Every payment is immediately acknowledged with printed and WhatsApp receipts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#ede6f5] space-y-2">
                <h4 className="font-bold text-[#1e0a38] text-sm">4. Direct Proprietor Redressal</h4>
                <p>
                  All grievances, prize settlements, and account confirmations are directly managed by Mr. S.Duraibabu at our Chromepet registered office.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
