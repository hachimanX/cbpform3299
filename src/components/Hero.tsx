import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, FileCheck, ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onScrollToGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onScrollToGuide }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 border-b border-slate-800">
      {/* Background Subtle Grid / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Official Form Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Updated for 2024–2026 Regulations (Rev. 05/24)</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-bold">19 CFR 148.6 Compliant</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Generate Your Official <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              CBP Form 3299
            </span>{' '}
            in 3 Minutes
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Shipping household goods or unaccompanied baggage to the United States? Stop wrestling with confusing tariff codes and rigid PDF boxes. Answer simple questions, preview for free, and download your print-ready declaration instantly.
          </p>

          {/* Pricing Highlight: Anchored $9.99 slashed to $4.99 */}
          <div className="pt-2">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-lg">
              <div className="flex items-center space-x-2.5">
                <span className="text-slate-400 line-through text-lg font-semibold">$9.99</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">$4.99</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                  50% OFF Launch Special
                </span>
              </div>
              <span className="hidden sm:inline text-slate-600">|</span>
              <div className="text-xs text-slate-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">One-Time Payment.</span>
                <span>NEVER a recurring subscription. No hidden fees.</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-xl hover:shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Start Interactive Wizard</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={onScrollToGuide}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
            >
              <FileCheck className="w-5 h-5 text-amber-400" />
              <span>Read 2026 Form Instructions</span>
            </button>
          </div>

          {/* 3 Core Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 text-left">
            {/* Card 1: Privacy */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>100% In-Browser Privacy</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Your passport, SSN, and addresses are processed strictly inside your device. Zero cloud storage or server logging.
                </p>
              </div>
            </div>

            {/* Card 2: Compliance */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3.5">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Official 05/24 CBP Format</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Fills official AcroForm fields accepted by all ocean freight, air cargo carriers, and licensed customs brokers.
                </p>
              </div>
            </div>

            {/* Card 3: Free Packing List */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Free Packing List Included</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  International carriers require a packing list alongside Form 3299. Get our printable inventory template free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
