import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { SELLER_CONTACT_EMAIL } from '../site';

export type LegalPage = 'deletion';

interface LegalModalsProps {
  page: LegalPage | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ page, onClose }) => {
  if (page !== 'deletion') return null;

  const handleEraseData = () => {
    if (window.confirm('This will delete the saved form draft from this browser. Continue?')) {
      localStorage.removeItem('cbp_3299_form_draft_v1');
      localStorage.removeItem('cbp_3299_checkout_session_v1');
      alert('The draft saved in this browser has been erased.');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Erase the draft on this device</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            The form draft is stored in this browser only. The watermarked preview is also built on this device.
            The paid PDF is built after Stripe confirms payment, and that check does not keep a copy of your answers.
          </p>
          <p>
            This button deletes the draft from this browser. To ask a privacy question, email{' '}
            <a className="text-blue-700 underline font-semibold" href={`mailto:${SELLER_CONTACT_EMAIL}`}>
              {SELLER_CONTACT_EMAIL}
            </a>
            . The full privacy policy is on the <a className="text-blue-700 underline" href="/privacy/">privacy page</a>.
          </p>
          <button
            type="button"
            onClick={handleEraseData}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Erase the draft from this browser</span>
          </button>
        </div>
      </div>
    </div>
  );
};
