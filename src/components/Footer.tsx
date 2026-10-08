import React from 'react';
import { Lock, Mail, ExternalLink } from 'lucide-react';
import type { LegalPage } from './LegalModals';

interface FooterProps {
  onOpenLegal: (page: LegalPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-white tracking-tight">
                CBP<span className="text-amber-400">3299</span>
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Generator
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                REV. 05/24
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              The trusted, plain-English digital assistant for compiling U.S. Customs Form 3299 (Declaration for Free Entry of Unaccompanied Articles). Helping international relocators, military personnel, and expats move household goods smoothly.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>100% In-Browser Privacy</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href="mailto:support@cbpform3299.com" className="hover:text-amber-400 transition-colors">
                  support@cbpform3299.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal &amp; Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy (Zero Storage)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('refund')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  14-Day Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Government Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('deletion')}
                  className="text-red-400 hover:text-red-300 transition-colors text-left cursor-pointer"
                >
                  Data Deletion Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Customs Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#wizard-section" className="hover:text-amber-400 transition-colors">
                  Interactive Questionnaire
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:text-amber-400 transition-colors">
                  CBP 3299 Step-by-Step Guide
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/guides/how-to-fill-out-cbp-form-3299/" className="hover:text-amber-400 transition-colors">
                  How to Fill Out Form 3299
                </a>
              </li>
              <li>
                <a href="/guides/cbp-form-3299-fedex/" className="hover:text-amber-400 transition-colors">
                  FedEx Customs Clearance Guide
                </a>
              </li>
              <li>
                <a href="/guides/cbp-form-3299-supplemental-declaration/" className="hover:text-amber-400 transition-colors">
                  Supplemental Packing List Guide
                </a>
              </li>
              <li>
                <a href="/ai-instructions" className="hover:text-amber-400 transition-colors">
                  AI Instructions (LLMs)
                </a>
              </li>
              <li>
                <a href="/sitemap/" className="hover:text-amber-400 transition-colors">
                  HTML Sitemap
                </a>
              </li>
              <li>
                <a
                  href="https://www.cbp.gov/sites/default/files/2024-05/cbp_form_3299_0.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1"
                >
                  <span>Official Blank Form (CBP.gov)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Federal Disclaimer Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p className="font-bold text-slate-300">
            DISCLAIMER OF GOVERNMENT AFFILIATION &amp; LEGAL NOTICE:
          </p>
          <p>
            cbpform3299.com is an independent digital document preparation service and is NOT affiliated with, sponsored by, endorsed by, or authorized by U.S. Customs and Border Protection (CBP), the U.S. Department of Homeland Security (DHS), or the United States Government. Official blank CBP forms and statutory guidelines are available for free directly at{' '}
            <a href="https://www.cbp.gov" target="_blank" rel="noreferrer" className="text-amber-400 underline font-semibold">
              cbp.gov
            </a>
            .
          </p>
          <p>
            Our software assists users with the automated formatting and digital population of user-entered data onto standard publicly accessible PDF templates. We do not provide legal, customs brokerage, or tax advice. The declarant is solely responsible for reviewing the accuracy and completeness of all statements before submitting documents to customs authorities.
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} cbpform3299.com. All rights reserved. Built for international movers &amp; relocators.
          </div>
          <div className="flex items-center space-x-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>No Cookies Tracked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
