import React from 'react';
import { X, ShieldCheck, Lock, RefreshCw, AlertTriangle, Trash2 } from 'lucide-react';

export type LegalPage = 'terms' | 'privacy' | 'refund' | 'disclaimer' | 'deletion';

interface LegalModalsProps {
  page: LegalPage | null;
  onClose: () => void;
  onSelectPage: (p: LegalPage) => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ page, onClose, onSelectPage }) => {
  if (!page) return null;

  const handleEraseData = () => {
    if (window.confirm('This will delete all saved form data and drafts from your local browser storage. Continue?')) {
      localStorage.removeItem('cbp_3299_form_draft_v1');
      alert('All local data has been successfully erased from your device.');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 capitalize">
                {page === 'terms' && 'Terms of Service'}
                {page === 'privacy' && 'Privacy Policy (Zero Server Storage)'}
                {page === 'refund' && '14-Day Money-Back Refund Policy'}
                {page === 'disclaimer' && 'Legal Notice & Government Disclaimer'}
                {page === 'deletion' && 'Data Deletion & Privacy Control'}
              </h3>
              <p className="text-xs text-slate-500">Last updated: October 2026 • cbpform3299.com</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 px-6 py-2.5 bg-slate-100/60 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => onSelectPage('privacy')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              page === 'privacy' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onSelectPage('terms')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              page === 'terms' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => onSelectPage('refund')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              page === 'refund' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Refund Policy
          </button>
          <button
            onClick={() => onSelectPage('disclaimer')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              page === 'disclaimer' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Disclaimers
          </button>
          <button
            onClick={() => onSelectPage('deletion')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              page === 'deletion' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Eraser
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
          {page === 'privacy' && (
            <>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <span className="font-bold flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% In-Browser Privacy Guarantee</span>
                </span>
                <p>
                  Unlike standard cloud services, cbpform3299.com compiles all PDFs locally inside your browser using client-side JavaScript. Your Passport numbers, Social Security Numbers (SSN), flight details, and home addresses are never sent across the internet to our servers.
                </p>
              </div>

              <h4 className="font-bold text-slate-900 text-base">1. Information We Do Not Collect</h4>
              <p>
                We do not collect, log, or store sensitive identifying documents. Any details you type into the generator remain strictly in your temporary local browser memory (localStorage) to allow you to edit your draft without losing progress.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Payment Processing & Third-Party SDKs</h4>
              <p>
                Payments are processed securely via Stripe. When making a purchase, your payment details (credit card number, billing address) are collected directly by Stripe under their privacy standards. We never receive or store your credit card information.
              </p>

              <h4 className="font-bold text-slate-900 text-base">3. Tracking & Cookies</h4>
              <p>
                We do not use invasive third-party tracking scripts, cross-site trackers, or advertising networks. We use only essential functional session storage strictly needed to operate the form wizard.
              </p>

              <h4 className="font-bold text-slate-900 text-base">4. Children&apos;s Privacy (COPPA Compliance)</h4>
              <p>
                Our services are directed strictly to adult individuals aged 18 and older. We do not knowingly collect personal information from individuals under the age of 18.
              </p>
            </>
          )}

          {page === 'terms' && (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Software Service Description</h4>
              <p>
                cbpform3299.com provides an automated electronic document preparation utility designed to help individuals format their relocation information onto standard public templates of U.S. Customs and Border Protection (CBP) Form 3299.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Non-Affiliation & Legal Notice</h4>
              <p>
                cbpform3299.com is an independent commercial web application. We are <strong>not affiliated with, authorized by, endorsed by, or in any way officially connected to U.S. Customs and Border Protection (CBP), the U.S. Department of Homeland Security (DHS), or any United States government agency</strong>. Blank official forms and instructions are available free of charge directly at <a href="https://www.cbp.gov" target="_blank" rel="noreferrer" className="text-blue-600 underline">cbp.gov</a>.
              </p>

              <h4 className="font-bold text-slate-900 text-base">3. No Legal or Customs Brokerage Advice</h4>
              <p>
                The information, tooltips, and guides provided on this website are for educational and document-preparation purposes only and do not constitute legal advice or licensed customs brokerage services. Users with complex commercial imports, contested tariff classifications, or restricted goods should consult a licensed customs broker or maritime attorney.
              </p>

              <h4 className="font-bold text-slate-900 text-base">4. User Responsibility for Accuracy</h4>
              <p>
                The declarant is solely responsible for reviewing and verifying the accuracy and truthfulness of all statements and entries on their generated form prior to signing and submitting to customs officials or freight forwarders.
              </p>

              <h4 className="font-bold text-slate-900 text-base">5. One-Time Pricing & No Subscriptions</h4>
              <p>
                Purchasing the clean document export is a single, one-time payment of $4.99. You will not be enrolled into any recurring memberships, recurring monthly dues, or hidden charges.
              </p>
            </>
          )}

          {page === 'refund' && (
            <>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
                <span className="font-bold flex items-center space-x-1.5">
                  <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>14-Day Formatting Acceptance Guarantee</span>
                </span>
                <p>
                  We stand behind the formatting accuracy of our generated CBP Form 3299 declarations. If your international moving company or licensed customs broker rejects the layout or field structure of your generated PDF, we will promptly refund your $4.99 purchase (minus third-party payment processing fees, e.g., Stripe transaction fee of $0.44).
                </p>
              </div>

              <h4 className="font-bold text-slate-900 text-base">Fraud Prevention &amp; Proof Requirement:</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Because digital goods are immediately generated and rendered directly on your device, written proof is strictly required to prevent abuse and refund loopholes. To qualify for a refund, you must provide formal written verification (such as an email or rejection letter) from your moving carrier, freight forwarder, or licensed customs broker explicitly confirming that the PDF layout or AcroForm structure was rejected.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Refunds are not granted for changes of mind, personal scheduling cancellations, or errors resulting from inaccurate user data input into the questionnaire.
              </p>

              <h4 className="font-bold text-slate-900 text-base">How to Claim a Refund:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  Email our support desk at{' '}
                  <a href="mailto:support@cbpform3299.com" className="text-blue-600 underline font-semibold">
                    support@cbpform3299.com
                  </a>{' '}
                  within 14 calendar days of your original purchase.
                </li>
                <li>Include your name, order email address, and Stripe transaction receipt number.</li>
                <li>
                  Attach the formal written rejection communication received from your moving company or customs broker citing the document layout rejection.
                </li>
                <li>
                  Once verified, your refund (purchase price minus the non-refundable third-party processing fee) will be credited directly back to your original payment method within 24 to 48 hours.
                </li>
              </ol>
            </>
          )}

          {page === 'disclaimer' && (
            <>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <span className="font-bold flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Important Regulatory Disclaimers</span>
                </span>
                <p>
                  Official CBP Form 3299 is a public government document administered by U.S. Customs and Border Protection. You are not required to purchase our software to obtain this form; the blank form is distributed freely at <a href="https://www.cbp.gov" target="_blank" rel="noreferrer" className="underline font-bold">cbp.gov</a>.
                </p>
                <p>
                  Our fee is exclusively for the convenience of using our digital questionnaire wizard, formatting intelligence, AcroForm positioning software, and supplemental packing list template.
                </p>
              </div>

              <h4 className="font-bold text-slate-900 text-base">Declaration Under Penalty of Law</h4>
              <p>
                When you sign Part VI of CBP Form 3299, you are executing a legal declaration under federal law (18 U.S.C. 1001). Making false or fraudulent statements to U.S. Customs carries severe statutory penalties. Please ensure that all listed items, residency lengths, and declarations reflect your actual situation accurately.
              </p>
            </>
          )}

          {page === 'deletion' && (
            <>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">
                  User Data Deletion Request (Right to Erasure)
                </span>
                <p>
                  Because we run 100% client-side, we do not store your passport or personal info in any cloud database. All temporary draft data is retained solely in your own device&apos;s local storage.
                </p>
                <p>
                  You can immediately wipe all data from your computer or phone using the button below.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleEraseData}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Erase All My Data From This Device Now</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Official website: cbpform3299.com</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-bold text-slate-800 bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
