import React from 'react';
import type { CBPFormData } from '../../types/form';
import { Box, Plus, Trash2, Wine, CheckSquare } from 'lucide-react';

interface StepArticlesProps {
  data: CBPFormData;
  updateData: (fields: Partial<CBPFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepArticles: React.FC<StepArticlesProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addItemRow = () => {
    if (data.itemizedArticles.length >= 9) return;
    const nextNum = `${data.itemizedArticles.length + 1}`;
    updateData({
      itemizedArticles: [
        ...data.itemizedArticles,
        { itemNumber: nextNum, description: '', value: '', placeAcquiredDate: 'Owned > 1 Yr' }
      ]
    });
  };

  const removeItemRow = (index: number) => {
    const updated = data.itemizedArticles.filter((_, idx) => idx !== index);
    updateData({ itemizedArticles: updated });
  };

  const updateItemRow = (index: number, field: string, val: string) => {
    const updated = [...data.itemizedArticles];
    updated[index] = { ...updated[index], [field]: val };
    updateData({ itemizedArticles: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Category Checkboxes (Part IV) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">4. Customs Declaration &amp; Categories (Part IV)</h3>
            <p className="text-xs text-slate-500">
              Answer in plain English. We will check the exact legal tariff boxes on the official form.
            </p>
          </div>
        </div>

        {/* Primary Duty-Free Household Goods */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.householdEffectsOver1Year}
              onChange={(e) => updateData({ householdEffectsOver1Year: e.target.checked })}
              className="w-5 h-5 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-emerald-950 block">
                Household Goods Used Abroad for 1+ Year (Duty-Free Entry)
              </span>
              <span className="text-xs text-emerald-800 leading-normal block mt-0.5">
                Applies to used furniture, carpets, books, dishes, linens, and appliances owned and used abroad for not less than one year. (Harmonized Tariff Schedule 9804.00.05).
              </span>
            </div>
          </label>
        </div>

        {/* Other Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Alcohol & Tobacco */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.alcoholOrTobacco}
                onChange={(e) => updateData({ alcoholOrTobacco: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                  <Wine className="w-4 h-4 text-amber-500" />
                  <span>Alcoholic Beverages or Tobacco</span>
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Check if shipping wine, beer, spirits, or cigars (must be itemized in the table below).
                </span>
              </div>
            </label>
          </div>

          {/* Items Under 1 Year */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.householdEffectsUnder1Year}
                onChange={(e) => updateData({ householdEffectsUnder1Year: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Goods Acquired Abroad Under 1 Year Ago
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Check if any articles were purchased within the last 12 months (may be subject to duty).
                </span>
              </div>
            </label>
          </div>

          {/* Commercial / Resale */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.articlesForSaleCommercial}
                onChange={(e) => updateData({ articlesForSaleCommercial: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Articles for Sale or Commercial Use
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Check if any goods are intended for commercial business or resale in the US.
                </span>
              </div>
            </label>
          </div>

          {/* Items for Other Person */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.articlesForOtherPerson}
                onChange={(e) => updateData({ articlesForOtherPerson: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Articles for Account of Another Person
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Check if carrying items belonging to someone else not in your household.
                </span>
              </div>
            </label>
          </div>

          {/* Firearms */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.firearmsAmmunition}
                onChange={(e) => updateData({ firearmsAmmunition: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Firearms and/or Ammunition
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Requires ATF Form 6 permit upon import.
                </span>
              </div>
            </label>
          </div>

          {/* Food / Agriculture */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.fruitsPlantsMeatsBirds}
                onChange={(e) => updateData({ fruitsPlantsMeatsBirds: e.target.checked })}
                className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Fruits, Plants, Seeds, Meats, or Birds
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Subject to USDA/APHIS inspection and declaration.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Itemized Table (Part IV D on Page 2) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">5. Itemized Inventory &amp; Declarations (Page 2, Part IV D)</h3>
              <p className="text-xs text-slate-500">
                List general household effects or specifically declared items (wine, items &lt; 1 yr, tools of trade).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addItemRow}
            disabled={data.itemizedArticles.length >= 9}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row ({data.itemizedArticles.length}/9)</span>
          </button>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {data.itemizedArticles.map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase sm:hidden mb-1">Item #</label>
                <input
                  type="text"
                  value={item.itemNumber}
                  onChange={(e) => updateItemRow(index, 'itemNumber', e.target.value)}
                  className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs text-center font-bold bg-white"
                  placeholder={`${index + 1}`}
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase sm:hidden mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItemRow(index, 'description', e.target.value)}
                  placeholder="e.g. Used Household Effects (Used > 1 Yr)"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs font-medium bg-white"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase sm:hidden mb-1">Est. Value (USD)</label>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => updateItemRow(index, 'value', e.target.value)}
                  placeholder="e.g. $1,200"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase sm:hidden mb-1">Where &amp; Date Acquired</label>
                <input
                  type="text"
                  value={item.placeAcquiredDate}
                  onChange={(e) => updateItemRow(index, 'placeAcquiredDate', e.target.value)}
                  placeholder="e.g. Owned > 1 Yr Abroad"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                {data.itemizedArticles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(index)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
          Review &amp; Export Document →
        </button>
      </div>
    </form>
  );
};
