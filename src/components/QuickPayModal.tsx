import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Smartphone, 
  Download, 
  ArrowRight,
  Printer,
  QrCode,
  Building2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/chitData';

interface QuickPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickPayModal: React.FC<QuickPayModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'lookup' | 'details' | 'success'>('lookup');
  const [ticketId, setTicketId] = useState('DF-4M-CHIT-042');
  const [phone, setPhone] = useState('9876543210');
  const [chitUnits, setChitUnits] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash' | 'gpay'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  if (!isOpen) return null;

  const installmentAmount = chitUnits * 4000;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('details');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptData({
        txnId: 'DF' + Math.floor(10000000 + Math.random() * 90000000),
        ticketId: ticketId.toUpperCase(),
        subscriberName: 'S. Rajagopalan',
        schemeCode: `DF-FESTIVAL-${chitUnits}CHIT (Batch #03)`,
        installmentNo: '02 of 04',
        grossAmount: installmentAmount,
        netPaid: installmentAmount,
        chitUnits: chitUnits,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        method: paymentMethod.toUpperCase(),
        proprietor: COMPANY_INFO.proprietor,
        office: COMPANY_INFO.shortAddress,
        udyamReg: COMPANY_INFO.udyamRegNo,
      });
      setStep('success');
    }, 1000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/30 border border-red-500/40 text-amber-400 flex items-center justify-center font-bold text-sm">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">DFinance Quick Installment Pay</h3>
              <p className="text-[11px] text-slate-300">
                Chromepet, Chennai - 44 • Official Receipt Generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* STEP 1: LOOKUP */}
          {step === 'lookup' && (
            <form onSubmit={handleLookup} className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-base font-black text-slate-900">
                  Pay Your Monthly 4-Month Chit Installment
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Enter your Chit Ticket ID or Registered Mobile number to fetch installment dues.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Chit Member ID or Ticket Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    placeholder="e.g. DF-4M-CHIT-042"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registered Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Direct UPI Payment Numbers:</span>
                </div>
                <p className="text-[11px]">
                  Google Pay / PhonePe / Paytm to: <strong>8668197626</strong> or <strong>9003241939</strong>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <span>Fetch Chit Dues</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          )}

          {/* STEP 2: DETAILS & PAYMENT */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subscriber Name:</span>
                  <span className="font-bold text-slate-900">S. Rajagopalan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Chit Ticket:</span>
                  <span className="font-mono font-bold text-slate-900">{ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Chit Units:</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={chitUnits}
                      onChange={(e) => setChitUnits(Number(e.target.value))}
                      className="bg-white border border-slate-300 rounded px-2 py-0.5 font-bold text-slate-900 text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Chit (₹4,000)' : `Chits (₹${n * 4000})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Installment Period:</span>
                  <span className="font-bold text-blue-950">Month 02 of 04</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-slate-900 font-bold">Installment Payable:</span>
                  <span className="text-xl font-black text-red-600">
                    {formatCurrency(installmentAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 ring-2 ring-amber-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'gpay'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 ring-2 ring-amber-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-blue-600" />
                    <span>Scan UPI QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 ring-2 ring-amber-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-slate-600" />
                    <span>Cash at Office</span>
                  </button>
                </div>
              </div>

              {/* UPI info */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl text-xs space-y-1">
                <div className="text-amber-400 font-bold">DFinance UPI ID / Mobile:</div>
                <div className="font-mono text-sm font-bold text-white">
                  8668197626@upi / 9003241939
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Mention Ticket ID ({ticketId}) in transaction remarks.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('lookup')}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePay}
                  className="w-2/3 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying & Recording...</span>
                  ) : (
                    <span>Confirm & Generate Receipt ({formatCurrency(installmentAmount)})</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & OFFICIAL RECEIPT */}
          {step === 'success' && receiptData && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-slate-900">Payment Recorded Successfully</h4>
                <p className="text-xs text-slate-500">Official DFinance Installment E-Receipt</p>
              </div>

              {/* Printable Official Receipt Paper */}
              <div 
                id="printable-payment-receipt"
                className="bg-white p-5 rounded-xl border-2 border-slate-900 text-xs space-y-3 font-mono shadow-sm"
              >
                <div className="text-center pb-3 border-b border-slate-300 font-sans">
                  <div className="text-lg font-black text-red-600">D FINANCE</div>
                  <div className="text-[11px] text-slate-700">{receiptData.office}</div>
                  <div className="text-[10px] text-slate-500">
                    Udyam Reg: {receiptData.udyamReg} • Prop. {receiptData.proprietor}
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Txn Reference:</span>
                    <span className="font-bold">{receiptData.txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Subscriber:</span>
                    <span className="font-bold">{receiptData.subscriberName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Ticket & Scheme:</span>
                    <span className="font-bold">{receiptData.ticketId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Installment No:</span>
                    <span className="font-bold">{receiptData.installmentNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Date & Time:</span>
                    <span>{receiptData.date} {receiptData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Payment Mode:</span>
                    <span className="font-bold">{receiptData.method}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-sans font-black">
                  <span>Amount Received:</span>
                  <span className="text-red-700 text-base">{formatCurrency(receiptData.netPaid)}</span>
                </div>

                <div className="pt-3 border-t border-dashed border-slate-300 flex justify-between items-end font-sans text-[10px] text-slate-500">
                  <div>* Valid computer generated receipt</div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">For D FINANCE</div>
                    <div>Authorized Seal</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
