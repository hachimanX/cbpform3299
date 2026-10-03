import React, { useState, useEffect } from 'react';
import type { CBPFormData } from '../../types/form';
import { initialFormData } from '../../types/form';
import { StepPersonal } from './StepPersonal';
import { StepResidency } from './StepResidency';
import { StepArticles } from './StepArticles';
import { StepReviewExport } from './StepReviewExport';
import { Check, User, Compass, Box, Download, RotateCcw } from 'lucide-react';

interface WizardContainerProps {
  onOpenLegal: (page: 'terms' | 'privacy' | 'refund' | 'disclaimer') => void;
}

const STORAGE_KEY = 'cbp_3299_form_draft_v1';

export const WizardContainer: React.FC<WizardContainerProps> = ({ onOpenLegal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CBPFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return initialFormData;
  });

  // Save changes locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  // Check for return from Stripe payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success' || urlParams.get('paid') === 'true') {
      setCurrentStep(4);
      const wizardEl = document.getElementById('wizard-section');
      if (wizardEl) {
        wizardEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const updateFormData = (fields: Partial<CBPFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear your entered details and start fresh? All data will be removed from your browser.')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(initialFormData);
      setCurrentStep(1);
    }
  };

  const steps = [
    { num: 1, title: 'Personal & Flight', icon: User },
    { num: 2, title: 'Residency Status', icon: Compass },
    { num: 3, title: 'Shipped Articles', icon: Box },
    { num: 4, title: 'Review & Export', icon: Download },
  ];

  return (
    <div id="wizard-section" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Stepper Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              CBP Form 3299 Generator
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Step {currentStep} of 4 • Complete all sections to compile your official PDF declaration.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            title="Wipe data from this browser"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset / Clear Data</span>
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            const Icon = s.icon;

            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num <= currentStep) setCurrentStep(s.num);
                }}
                className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-all ${
                  isCurrent
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : isCompleted
                    ? 'border-slate-200 bg-white cursor-pointer hover:bg-slate-50'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Step {s.num}
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate">{s.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="transition-all duration-200">
        {currentStep === 1 && (
          <StepPersonal
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepResidency
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepArticles
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepReviewExport
            data={formData}
            updateData={updateFormData}
            onPrev={() => setCurrentStep(3)}
            onOpenLegal={onOpenLegal}
          />
        )}
      </div>
    </div>
  );
};
