import React from 'react';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onStartGenerator: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onStartGenerator }) => {
  return (
    <section id="pricing-section" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            One Small Fee. Zero Subscriptions.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Unlike other document sites that secretly enroll you in $39/month recurring subscriptions, we charge once.
          </p>
        </div>

        {/* 3-Way Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Competitor 1: Generic PDF Editors */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-6 opacity-90">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Generic PDF Editors
              </span>
              <h3 className="text-lg font-bold text-slate-800">DocuSign / PDFfiller</h3>
              <div className="flex items-baseline space-x-1 text-slate-800">
                <span className="text-2xl font-extrabold">$39.99</span>
                <span className="text-xs text-slate-500">/ month (recurring)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 pt-2">
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Hidden monthly recurring subscription</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>No customs or tariff guidance</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Uploads sensitive passport & SSN to cloud</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>No packing inventory template</span>
                </li>
              </ul>
            </div>
            <div className="text-center text-xs text-slate-400 font-medium">Expensive recurring trap</div>
          </div>

          {/* OUR TOOL (Hero Card) */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 uppercase tracking-wider shadow-sm">
                Most Popular • 50% Off
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                cbpform3299.com
              </span>
              <h3 className="text-xl font-extrabold text-white">Complete Declaration Package</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-slate-400 line-through text-lg font-bold">$9.99</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">$4.99</span>
                <span className="text-xs text-slate-300">one-time</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-emerald-400 font-semibold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Single payment • No subscription ever</span>
              </div>

              <ul className="text-xs text-slate-300 space-y-2.5 pt-1">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clean, print-ready PDF export (Zero watermark)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive plain-English customs wizard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% In-Browser Privacy (Zero server storage)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>FREE Customs Packing List PDF included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>14-Day Money-Back Guarantee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onStartGenerator}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-amber-400/20 transition-all cursor-pointer text-center"
            >
              Start For $4.99 →
            </button>
          </div>

          {/* Competitor 2: Customs Brokers */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-6 opacity-90">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Full Customs Broker
              </span>
              <h3 className="text-lg font-bold text-slate-800">Licensed Customs Broker</h3>
              <div className="flex items-baseline space-x-1 text-slate-800">
                <span className="text-2xl font-extrabold">$150 - $350</span>
                <span className="text-xs text-slate-500">per entry</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 pt-2">
                <li className="flex items-center space-x-2 text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full hands-on entry filing</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Very expensive manual paperwork fee</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Requires days of back-and-forth emails</span>
                </li>
                <li className="flex items-center space-x-2 text-red-500">
                  <X className="w-4 h-4 shrink-0" />
                  <span>Still requires YOU to provide itemized lists</span>
                </li>
              </ul>
            </div>
            <div className="text-center text-xs text-slate-400 font-medium">Overkill for simple relocations</div>
          </div>
        </div>
      </div>
    </section>
  );
};
