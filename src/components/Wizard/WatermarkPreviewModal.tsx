import React from 'react';
import { X, Download, ShieldAlert, CreditCard, Eye, Lock } from 'lucide-react';
import { downloadPdf } from '../../lib/pdfGenerator';

interface WatermarkPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBlobUrl: string | null;
  pdfBytes: Uint8Array | null;
  lastName: string;
  onProceedToPayment: () => void;
}

export const WatermarkPreviewModal: React.FC<WatermarkPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfBlobUrl,
  pdfBytes,
  lastName,
  onProceedToPayment,
}) => {
  if (!isOpen) return null;

  const fileName = `CBP_3299_UNEDITABLE_PREVIEW_${lastName ? lastName.toUpperCase() : 'DECLARATION'}.pdf`;

  const handleDownload = () => {
    if (pdfBytes) {
      downloadPdf(pdfBytes, fileName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white flex items-center space-x-2">
                <span>Uneditable Watermarked Preview</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Fields Locked (Read-Only)</span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Visual proofreading draft • Official CBP Form 3299
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security / Conversion Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Proofreading Draft:</strong> All form fields are locked to read-only. Watermarked drafts are rejected by U.S. Customs. Unlock the official clean PDF for submission.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToPayment();
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Unlock Clean Official PDF ($4.99)</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="text-slate-600 font-medium">
            Review your information formatted on all 3 pages below:
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium cursor-pointer transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Uneditable PDF</span>
          </button>
        </div>

        {/* Embedded Native PDF Viewer */}
        <div className="flex-1 w-full bg-slate-200/50 relative overflow-hidden">
          {pdfBlobUrl ? (
            <iframe
              src={`${pdfBlobUrl}#toolbar=0`}
              title="CBP Form 3299 Uneditable Preview"
              className="w-full h-full border-0"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Generating uneditable preview...
            </div>
          )}
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-white">
              Ready to submit your declaration to your customs broker or mover?
            </div>
            <div className="text-xs text-slate-400">
              Get the official print-ready vector PDF without watermarks + Free Packing List for $4.99.
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Back to Wizard
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToPayment();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Unlock Official PDF ($4.99) →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
