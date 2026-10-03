import React from 'react';
import type { CBPFormData } from '../../types/form';
import { User, Package } from 'lucide-react';

interface StepPersonalProps {
  data: CBPFormData;
  updateData: (fields: Partial<CBPFormData>) => void;
  onNext: () => void;
}

export const StepPersonal: React.FC<StepPersonalProps> = ({ data, updateData, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Importer Identity */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">1. Declarant / Importer Information</h3>
            <p className="text-xs text-slate-500">
              The primary person moving to the United States (as shown on passport).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Last Name / Surname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SMITH"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. JOHN"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Middle Initial
            </label>
            <input
              type="text"
              maxLength={2}
              placeholder="e.g. M"
              value={data.middleInitial}
              onChange={(e) => updateData({ middleInitial: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase text-center"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={data.dateOfBirth}
                onChange={(e) => updateData({ dateOfBirth: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Date of Your Arrival in the U.S. <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={data.dateOfArrival}
              onChange={(e) => updateData({ dateOfArrival: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-12">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              U.S. Address (Where goods are being delivered) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 742 Evergreen Terrace, Springfield, OR 97477"
              value={data.usAddress}
              onChange={(e) => updateData({ usAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              If temporary, provide hotel or company relocation address where you can be contacted.
            </p>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Port of Arrival in U.S. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. JFK Airport, NY or Los Angeles, CA"
              value={data.portOfArrival}
              onChange={(e) => updateData({ portOfArrival: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Arriving Airline &amp; Flight # or Vessel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. British Airways Flight 177"
              value={data.arrivingVesselOrFlight}
              onChange={(e) => updateData({ arrivingVesselOrFlight: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-12">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Accompanying Household Members (Names &amp; Relationship)
            </label>
            <input
              type="text"
              placeholder="e.g. Jane Smith (Spouse), Tommy Smith (Child)"
              value={data.householdMembers}
              onChange={(e) => updateData({ householdMembers: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              List family members traveling with you whose belongings are in the shipment.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Unaccompanied Shipment Details */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">2. Shipment &amp; Freight Details</h3>
            <p className="text-xs text-slate-500">
              Information about your sea container, air freight, or international moving company.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Estimated Arrival Date of Goods
            </label>
            <input
              type="date"
              value={data.belongingsArrivalDate}
              onChange={(e) => updateData({ belongingsArrivalDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Moving / Freight Carrier Name
            </label>
            <input
              type="text"
              placeholder="e.g. Allied Van Lines, Schumacher, MSC"
              value={data.carrierName}
              onChange={(e) => updateData({ carrierName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Shipped From Country
            </label>
            <input
              type="text"
              placeholder="e.g. United Kingdom, Germany, Japan"
              value={data.fromCountry}
              onChange={(e) => updateData({ fromCountry: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bill of Lading (B/L) or Air Waybill (AWB) #
            </label>
            <input
              type="text"
              placeholder="e.g. MAEU987654321 or Pending"
              value={data.billOfLadingOrAwb}
              onChange={(e) => updateData({ billOfLadingOrAwb: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Number &amp; Type of Packages
            </label>
            <input
              type="text"
              placeholder="e.g. 1 x 20ft Container, 25 Cartons"
              value={data.numberOfContainers}
              onChange={(e) => updateData({ numberOfContainers: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>

          <div className="sm:col-span-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Marks &amp; Numbers
            </label>
            <input
              type="text"
              placeholder="e.g. As Addressed or Container # MSKU123456"
              value={data.marksAndNumbers}
              onChange={(e) => updateData({ marksAndNumbers: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 outline-none transition-all uppercase"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
        >
          Continue to Step 2: Residency Status →
        </button>
      </div>
    </form>
  );
};
