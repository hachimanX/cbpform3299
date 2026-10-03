import React from 'react';
import { FileText, Lock, Sparkles, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onStartGenerator: () => void;
  onOpenLegal: (page: 'terms' | 'privacy' | 'refund' | 'disclaimer') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartGenerator, onOpenLegal }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  CBP<span className="text-amber-400">3299</span>
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Generator</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  REV. 05/24
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Official Declaration for Free Entry of Unaccompanied Articles
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#wizard-section" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
              <span>Interactive Wizard</span>
            </a>
            <a href="#pricing-section" className="hover:text-amber-400 transition-colors">
              Pricing
            </a>
            <a href="#seo-guide" className="hover:text-amber-400 transition-colors">
              Form 3299 Guide
            </a>
            <a href="#faq-section" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>FAQs</span>
            </a>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5 text-emerald-400/90 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20"
              title="Your personal information never leaves your browser"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>100% In-Browser Private</span>
            </button>
          </nav>

          {/* Primary Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-amber-500/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start Generator</span>
              <span className="hidden sm:inline bg-slate-950 text-amber-400 text-xs px-1.5 py-0.5 rounded font-extrabold ml-1">
                $4.99
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
