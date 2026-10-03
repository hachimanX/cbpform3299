import React from 'react';
import type { CBPFormData } from '../../types/form';
import { Compass, Check } from 'lucide-react';

interface StepResidencyProps {
  data: CBPFormData;
  updateData: (fields: Partial<CBPFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepResidency: React.FC<StepResidencyProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section: Status of Arriving Person (Part II) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">3. Status of Arriving Person (Part II)</h3>
            <p className="text-xs text-slate-500">
              Select your immigration / residency category to determine your duty-free tariff exemptions.
            </p>
          </div>
        </div>

        {/* 3 Large Radio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Returning Resident */}
          <div
            onClick={() => updateData({ residencyStatus: 'returning_resident' })}
            className={`cursor-pointer p-5 rounded-xl border-2 transition-all relative ${
              data.residencyStatus === 'returning_resident'
                ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Category A</span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  data.residencyStatus === 'returning_resident'
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300'
                }`}
              >
                {data.residencyStatus === 'returning_resident' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Returning U.S. Resident</h4>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              U.S. citizens or lawful permanent residents (green card holders) returning from living abroad.
            </p>
          </div>

          {/* Card 2: Emigrating Nonresident */}
          <div
            onClick={() => updateData({ residencyStatus: 'emigrating' })}
            className={`cursor-pointer p-5 rounded-xl border-2 transition-all relative ${
              data.residencyStatus === 'emigrating'
                ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Category B (1)</span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  data.residencyStatus === 'emigrating'
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300'
                }`}
              >
                {data.residencyStatus === 'emigrating' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Nonresident Emigrating</h4>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Foreign nationals relocating to the U.S. permanently on an immigrant visa or initial Green Card.
            </p>
          </div>

          {/* Card 3: Visiting Nonresident */}
          <div
            onClick={() => updateData({ residencyStatus: 'visiting' })}
            className={`cursor-pointer p-5 rounded-xl border-2 transition-all relative ${
              data.residencyStatus === 'visiting'
                ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Category B (2)</span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  data.residencyStatus === 'visiting'
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300'
                }`}
              >
                {data.residencyStatus === 'visiting' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Nonresident Visiting</h4>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Temporary stay for work or study (e.g. H-1B, L-1, E-2, O-1, J-1, F-1 visa holders).
            </p>
          </div>
        </div>

        {/* Dynamic Fields based on status */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {data.residencyStatus === 'returning_resident'
                  ? 'Country You Resided In Abroad'
                  : 'Country of Citizenship / Foreign Residency'}{' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. United Kingdom, Germany, Canada"
                value={data.countryOfResidency}
                onChange={(e) => updateData({ countryOfResidency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase bg-white"
              />
            </div>

            {data.residencyStatus === 'returning_resident' && (
              <>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Length of Stay (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 2"
                    value={data.lengthOfStayYears}
                    onChange={(e) => updateData({ lengthOfStayYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all bg-white"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Length of Stay (Months)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    placeholder="e.g. 6"
                    value={data.lengthOfStayMonths}
                    onChange={(e) => updateData({ lengthOfStayMonths: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all bg-white"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section: Part III (U.S. Personnel & Evacuees) - Optional accordion */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="military-toggle"
              checked={data.isUsPersonnelOrEvacuee}
              onChange={(e) => updateData({ isUsPersonnelOrEvacuee: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="military-toggle" className="text-sm font-bold text-slate-900 cursor-pointer">
              Part III: U.S. Government / Military Personnel / Evacuee (Optional)
            </label>
          </div>
          <span className="text-[11px] text-slate-400">Leave unchecked if civilian</span>
        </div>

        {data.isUsPersonnelOrEvacuee && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date of Departure Abroad
              </label>
              <input
                type="date"
                value={data.dateOfDepartureAbroad}
                onChange={(e) => updateData({ dateOfDepartureAbroad: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date Official Orders Issued
              </label>
              <input
                type="date"
                value={data.dateOrdersIssued}
                onChange={(e) => updateData({ dateOrdersIssued: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
        >
          Continue to Step 3: Shipped Articles →
        </button>
      </div>
    </form>
  );
};
