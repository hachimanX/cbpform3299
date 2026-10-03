import React, { useState, useEffect } from 'react';
import type { CBPFormData } from '../../types/form';
import { generateCBPForm3299, downloadPdf } from '../../lib/pdfGenerator';
import { generatePackingListPdf } from '../../lib/packingListGenerator';
import { WatermarkPreviewModal } from './WatermarkPreviewModal';
import { 
  FileCheck, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet,
  CreditCard,
  Check,
  Eye,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/6oU4gz2Y278m8wn667bZe01';

interface StepReviewExportProps {
  data: CBPFormData;
  updateData: (fields: Partial<CBPFormData>) => void;
  onPrev: () => void;
  onOpenLegal: (page: 'terms' | 'privacy' | 'refund' | 'disclaimer') => void;
}

export const StepReviewExport: React.FC<StepReviewExportProps> = ({
  data,
  updateData,
  onPrev,
  onOpenLegal,
}) => {
  const [hasReviewedConsent, setHasReviewedConsent] = useState(true);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [previewPdfBytes, setPreviewPdfBytes] = useState<Uint8Array | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isGeneratingClean, setIsGeneratingClean] = useState(false);
  const [isGeneratingPacking, setIsGeneratingPacking] = useState(false);
  const [unlockedPurchased, setUnlockedPurchased] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-detect return from Stripe payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPaid = urlParams.get('payment') === 'success' || urlParams.get('paid') === 'true';
    if (isPaid && !unlockedPurchased) {
      setUnlockedPurchased(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#3b82f6', '#10b981'],
        });
      } catch {}

      // Auto-trigger clean download
      handleDownloadClean();
    }
  }, []);

  // Open Watermarked Uneditable PDF Preview Modal
  const handleOpenPreviewModal = async () => {
    try {
      setIsGeneratingPreview(true);
      setErrorMessage(null);

      if (previewBlobUrl && previewPdfBytes) {
        setIsPreviewModalOpen(true);
        return;
      }

      const pdfBytes = await generateCBPForm3299(data, { isWatermarked: true });
      const buffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setPreviewPdfBytes(pdfBytes);
      setPreviewBlobUrl(url);
      setIsPreviewModalOpen(true);
    } catch (err: any) {
      console.error('Failed to generate preview PDF:', err);
      setErrorMessage(err.message || 'Failed to generate preview PDF');
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  // Directly Download Watermarked Uneditable Preview PDF
  const handleDownloadPreviewPdf = async () => {
    try {
      setIsGeneratingPreview(true);
      setErrorMessage(null);

      let bytes = previewPdfBytes;
      if (!bytes) {
        bytes = await generateCBPForm3299(data, { isWatermarked: true });
        setPreviewPdfBytes(bytes);
      }

      const fileName = `CBP_3299_UNEDITABLE_PREVIEW_${data.lastName ? data.lastName.toUpperCase() : 'DECLARATION'}.pdf`;
      downloadPdf(bytes, fileName);
    } catch (err: any) {
      console.error('Failed to download preview PDF:', err);
      setErrorMessage(err.message || 'Failed to download preview PDF');
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  // Download Clean Official PDF (Post-Purchase / Test Unlock)
  const handleDownloadClean = async () => {
    if (!hasReviewedConsent) {
      alert('Please check the verification agreement before downloading.');
      return;
    }

    try {
      setIsGeneratingClean(true);
      setErrorMessage(null);
      const pdfBytes = await generateCBPForm3299(data, { isWatermarked: false });
      downloadPdf(pdfBytes, `CBP_Form_3299_OFFICIAL_${data.lastName || 'DECLARATION'}.pdf`);
      setUnlockedPurchased(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate clean PDF');
    } finally {
      setIsGeneratingClean(false);
    }
  };

  // Redirect to Stripe Checkout
  const handleProceedToStripe = () => {
    if (!hasReviewedConsent) {
      alert('Please review and agree to the declaration statement before proceeding.');
      return;
    }

    try {
      // Ensure data is saved locally so it's intact upon return
      localStorage.setItem('cbp_3299_form_draft_v1', JSON.stringify(data));
    } catch {}

    window.location.href = STRIPE_CHECKOUT_URL;
  };

  // Download Free Supplemental Packing List
  const handleDownloadPackingList = async () => {
    try {
      setIsGeneratingPacking(true);
      const packingBytes = await generatePackingListPdf(data);
      downloadPdf(packingBytes, `CBP_3299_Supplemental_Packing_List_${data.lastName || 'DECLARATION'}.pdf`);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Failed to generate packing list');
    } finally {
      setIsGeneratingPacking(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Verification & Certification Section (Part VI) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">6. Review &amp; Certification (Part VI)</h3>
            <p className="text-xs text-slate-500">
              Select your filing capacity and verify your entered information.
            </p>
          </div>
        </div>

        {/* Declarant Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => updateData({ certificationRole: 'importer' })}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              data.certificationRole === 'importer'
                ? 'border-blue-600 bg-blue-50/50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Part VI Box B</span>
              <input
                type="radio"
                name="role"
                checked={data.certificationRole === 'importer'}
                onChange={() => updateData({ certificationRole: 'importer' })}
                className="w-4 h-4 text-blue-600"
              />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1">I am the Importer (Declarant)</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              You are the traveler whose goods are being imported into the U.S.
            </p>
          </div>

          <div
            onClick={() => updateData({ certificationRole: 'authorized_agent' })}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              data.certificationRole === 'authorized_agent'
                ? 'border-blue-600 bg-blue-50/50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Part VI Box A</span>
              <input
                type="radio"
                name="role"
                checked={data.certificationRole === 'authorized_agent'}
                onChange={() => updateData({ certificationRole: 'authorized_agent' })}
                className="w-4 h-4 text-blue-600"
              />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1">Authorized Agent / Broker</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Moving company, customs broker, or freight forwarder signing on behalf.
            </p>
          </div>
        </div>

        {data.certificationRole === 'authorized_agent' && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Agent / Firm Name to Print
            </label>
            <input
              type="text"
              placeholder="e.g. Allied International Logistics LLC"
              value={data.agentNamePrint || ''}
              onChange={(e) => updateData({ agentNamePrint: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium bg-white"
            />
          </div>
        )}

        {/* Date of Signature */}
        <div className="w-full sm:w-64">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Declaration Signature Date
          </label>
          <input
            type="date"
            value={data.signatureDate}
            onChange={(e) => updateData({ signatureDate: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium"
          />
        </div>

        {/* Summary Quick Review Pill Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
          <div className="font-bold text-slate-900 text-sm mb-2">Summary Verification:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-semibold text-slate-500">Importer: </span>
              {data.lastName ? `${data.lastName}, ${data.firstName}` : 'Not entered'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Date of Arrival: </span>
              {data.dateOfArrival || 'Not entered'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Port of Entry: </span>
              {data.portOfArrival || 'Not entered'}
            </div>
            <div>
              <span className="font-semibold text-slate-500">Residency Category: </span>
              <span className="capitalize">{data.residencyStatus.replace('_', ' ')}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-slate-500">Delivery Address: </span>
              {data.usAddress || 'Not entered'}
            </div>
          </div>
        </div>

        {/* Mandatory User Consent Checkbox (Legal Protection #5, #6, #11) */}
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <input
              type="checkbox"
              required
              checked={hasReviewedConsent}
              onChange={(e) => setHasReviewedConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs text-amber-950 leading-relaxed">
              <strong>Accuracy Confirmation &amp; Disclaimer:</strong> I certify that I have reviewed the information entered above. I understand that cbpform3299.com is an independent automated document preparation utility, not affiliated with U.S. Customs and Border Protection (CBP) or any government agency, and does not provide legal advice. I am solely responsible for the truthfulness and accuracy of my declarations upon signing and submitting to customs officials.{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('disclaimer')}
                className="underline text-blue-700 hover:text-blue-900 font-semibold"
              >
                Read Legal Notice
              </button>
            </span>
          </label>
        </div>
      </div>

      {unlockedPurchased && (
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-emerald-600 text-white shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-emerald-900 text-base">Payment Verified &amp; Unlocked!</div>
              <p className="text-xs text-emerald-700">
                Your clean vector CBP Form 3299 has been generated. You can download your official PDF and packing list below anytime.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadClean}
            disabled={isGeneratingClean}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors shrink-0 cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Re-Download Clean PDF</span>
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Download Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Free Watermarked Uneditable PDF */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>Free Option • Uneditable PDF</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">Uneditable Watermarked PDF</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Proofread your full declaration formatted on the official CBP layout before purchasing. All fields are locked to read-only with verification watermarks. Moving carriers and customs brokers require the clean vector PDF.
            </p>

            <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant visual proofreading in browser</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Locked fields (tamper-proof &amp; uneditable)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Includes all 3 pages with itemized articles</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-400">
                <span>• Contains diagonal verification watermarks</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleOpenPreviewModal}
              disabled={isGeneratingPreview}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              <span>{isGeneratingPreview ? 'Compiling Preview...' : 'View On-Screen Preview'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPreviewPdf}
              disabled={isGeneratingPreview}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Uneditable PDF</span>
            </button>
          </div>
        </div>

        {/* Card 2: Official Clean Document Unlock ($4.99 via Stripe) */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border-2 border-amber-400/80 shadow-xl text-white flex flex-col justify-between space-y-5 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wide shadow-sm">
              Launch Deal • 50% Off
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline space-x-2.5">
              <span className="text-slate-400 line-through text-lg font-bold">$9.99</span>
              <span className="text-3xl font-extrabold text-amber-400">$4.99</span>
              <span className="text-xs text-slate-400">One-time payment</span>
            </div>

            <h4 className="text-xl font-extrabold text-white">
              Complete Form 3299 + Free Packing List
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Export the clean, watermark-free, print-ready official vector PDF accepted by all ocean/air carriers, plus our bonus Customs Packing Inventory.
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-emerald-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>100% Never a Subscription:</strong> Pay $4.99 once. No hidden fees or recurring rebills.
              </span>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean, high-resolution official vector PDF (Zero Watermark)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>FREE Supplemental Packing List PDF included ($19 value)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>14-Day Acceptance Guarantee (carrier rejection proof required)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 pt-2">
            {unlockedPurchased ? (
              <button
                type="button"
                onClick={handleDownloadClean}
                disabled={isGeneratingClean}
                className="w-full py-4 px-6 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-400 hover:from-emerald-300 hover:to-emerald-400 shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download className="w-5 h-5 text-slate-950" />
                <span>Download Print-Ready Form 3299 Now</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleProceedToStripe}
                disabled={!hasReviewedConsent}
                className="w-full py-4 px-6 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-lg hover:shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <CreditCard className="w-5 h-5 text-slate-950" />
                <span>Pay $4.99 &amp; Unlock Form 3299 PDF</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadPackingList}
              disabled={isGeneratingPacking}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isGeneratingPacking ? 'Generating Packing List...' : 'Download Free Customs Packing List Only'}
              </span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => onOpenLegal('refund')}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                14-Day Guarantee Terms &amp; Carrier Rejection Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
        >
          ← Back to Articles
        </button>
      </div>

      {/* Watermarked Uneditable Preview Modal */}
      <WatermarkPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        pdfBlobUrl={previewBlobUrl}
        pdfBytes={previewPdfBytes}
        lastName={data.lastName}
        onProceedToPayment={handleProceedToStripe}
      />
    </div>
  );
};
