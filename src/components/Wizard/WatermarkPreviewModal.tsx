import React, { useState } from 'react';
import { X, Download, ShieldAlert, CreditCard, Eye, FileImage } from 'lucide-react';
import { downloadBlob, downloadDataUrl } from '../../lib/pdfRasterizer';

interface WatermarkPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageImages: string[];
  combinedBlob: Blob | null;
  lastName: string;
  onProceedToPayment: () => void;
}

export const WatermarkPreviewModal: React.FC<WatermarkPreviewModalProps> = ({
  isOpen,
  onClose,
  pageImages,
  combinedBlob,
  lastName,
  onProceedToPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'page1' | 'page2'>('all');

  if (!isOpen) return null;

  const fileNamePrefix = `CBP_3299_PREVIEW_${lastName ? lastName.toUpperCase() : 'DECLARATION'}`;

  const handleDownloadCombined = () => {
    if (combinedBlob) {
      downloadBlob(combinedBlob, `${fileNamePrefix}_COMBINED.png`);
    } else if (pageImages[0]) {
      downloadDataUrl(pageImages[0], `${fileNamePrefix}_PAGE1.png`);
    }
  };

  const handleDownloadPage = (pageIndex: number) => {
    if (pageImages[pageIndex]) {
      downloadDataUrl(pageImages[pageIndex], `${fileNamePrefix}_PAGE${pageIndex + 1}.png`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white flex items-center space-x-2">
                <span>Watermarked Form Preview</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-medium">
                  Raster PNG (Copy-Protected)
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Visual proofreading only • Official CBP AcroForm layout
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
              <strong>Proofreading Preview:</strong> Text copy-paste and AcroForm extraction are permanently disabled on this raster image. Moving carriers and customs brokers require the official clean vector PDF.
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
            <span>Unlock Clean Vector PDF ($4.99)</span>
          </button>
        </div>

        {/* View Controls & Action Toolbar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          {/* Tab Selector */}
          <div className="flex items-center space-x-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Pages
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('page1')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'page1'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 1 (Importer)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('page2')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'page2'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 2 (Articles)
            </button>
          </div>

          {/* Download PNG Options */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDownloadCombined}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Combined PNG</span>
            </button>
            {pageImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleDownloadPage(0)}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium cursor-pointer transition-colors"
                >
                  <FileImage className="w-3.5 h-3.5 text-slate-500" />
                  <span>Page 1 PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPage(1)}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium cursor-pointer transition-colors"
                >
                  <FileImage className="w-3.5 h-3.5 text-slate-500" />
                  <span>Page 2 PNG</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Scrollable Image Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/60 flex flex-col items-center space-y-6">
          {pageImages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Loading preview pages...
            </div>
          ) : (
            <>
              {(activeTab === 'all' || activeTab === 'page1') && pageImages[0] && (
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden border border-slate-300">
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between items-center">
                    <span>Page 1: Parts I - IV (Importer &amp; Residency Declaration)</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono">WATERMARKED PNG</span>
                  </div>
                  <img
                    src={pageImages[0]}
                    alt="CBP Form 3299 Page 1 Watermarked Preview"
                    className="w-full h-auto select-none pointer-events-auto"
                    draggable={false}
                  />
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'page2') && pageImages[1] && (
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden border border-slate-300">
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between items-center">
                    <span>Page 2: Part IV-D &amp; Part VI (Itemized Articles &amp; Certification)</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono">WATERMARKED PNG</span>
                  </div>
                  <img
                    src={pageImages[1]}
                    alt="CBP Form 3299 Page 2 Watermarked Preview"
                    className="w-full h-auto select-none pointer-events-auto"
                    draggable={false}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-white">
              Ready to submit to your customs broker or moving company?
            </div>
            <div className="text-xs text-slate-400">
              Unlock the official high-resolution, watermark-free vector PDF + Free Packing List for $4.99.
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
