import React from 'react';
import { BookOpen, AlertOctagon, Info, ArrowRight } from 'lucide-react';

interface SeoGuideProps {
  onStartGenerator: () => void;
}

export const SeoGuide: React.FC<SeoGuideProps> = ({ onStartGenerator }) => {
  return (
    <section id="seo-guide" className="scroll-mt-24 py-20 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete 2026 Customs Compliance Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Fill Out CBP Form 3299 for U.S. Customs
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            The definitive instructions for declaring unaccompanied personal effects, household goods, and relocation shipments entering the United States.
          </p>
        </div>

        {/* What is Form 3299 */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>What is CBP Form 3299?</span>
            </h3>
            <p className="text-sm">
              <strong>CBP Form 3299</strong>, titled <em>&quot;Declaration for Free Entry of Unaccompanied Articles&quot;</em>, is the mandatory U.S. Customs and Border Protection document required whenever your personal belongings, furniture, or household goods arrive in the United States separately from your own physical travel (via ocean freight container, air cargo, or international moving truck).
            </p>
            <p className="text-sm">
              Under federal regulations (<strong>19 CFR 148.6, 148.52, 148.53, and 148.77</strong>), international shipments cannot clear U.S. Customs without a signed Form 3299. It informs CBP officers whether your articles qualify for duty-free entry or are subject to import tariffs and taxes.
            </p>
          </div>

          {/* Section Breakdown Grid */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Breakdown of CBP Form 3299: Part by Part
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Part I */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Part I</span>
                <h4 className="font-bold text-slate-900 text-base">Importer Information &amp; Transport</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Contains your full legal name, date of birth, date of arrival in the U.S., and the U.S. address where your items will be delivered. You must also supply the carrier details, port of entry, and shipment tracking numbers (Ocean Bill of Lading or Air Waybill #).
                </p>
              </div>

              {/* Part II */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Part II</span>
                <h4 className="font-bold text-slate-900 text-base">Status of Arriving Person</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Crucial for determining duties. You must designate whether you are a <strong>Returning U.S. Resident</strong> (provide country abroad and length of stay) or a <strong>Nonresident</strong> (either permanently emigrating on an immigrant visa/green card, or visiting temporarily on a work visa like H-1B, L-1, or student F-1).
                </p>
              </div>

              {/* Part III */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Part III</span>
                <h4 className="font-bold text-slate-900 text-base">U.S. Personnel &amp; Evacuees Only</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reserved strictly for U.S. military service members, Department of Defense contractors, foreign service diplomats, and official evacuees entering under government travel orders. Civilians must leave this part blank.
                </p>
              </div>

              {/* Part IV */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Part IV</span>
                <h4 className="font-bold text-slate-900 text-base">Declaration of Articles &amp; Tariff Rules</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This is where most filers make errors. You check boxes regarding whether your household effects were owned and used abroad for <strong>at least one full year</strong> (qualifying for duty-free exemption 9804.00.05), or if you are carrying alcohol, tobacco, commercial resale items, or articles acquired under 1 year.
                </p>
              </div>
            </div>
          </div>

          {/* 5 Costly Mistakes */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200/90 space-y-4 pt-6">
            <h3 className="text-xl font-bold text-amber-950 flex items-center space-x-2">
              <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0" />
              <span>5 Critical Mistakes That Cause Customs Delays &amp; Penalties</span>
            </h3>

            <ul className="space-y-3 text-sm text-amber-900">
              <li className="flex items-start space-x-2.5">
                <span className="font-bold text-amber-700 shrink-0">1.</span>
                <span>
                  <strong>Failing to declare alcohol or tobacco:</strong> Even a few bottles of vintage wine from your home cellar must be declared in Part IV and itemized on Page 2 with quantity, value, and alcohol percentage to avoid container holds.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="font-bold text-amber-700 shrink-0">2.</span>
                <span>
                  <strong>Assuming all furniture is duty-free automatically:</strong> Only household goods owned and used abroad for <em>not less than 1 year</em> are duty-free. Brand new items purchased shortly before moving are taxable.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="font-bold text-amber-700 shrink-0">3.</span>
                <span>
                  <strong>Omitting the Supplemental Packing Inventory:</strong> Submitting Form 3299 without an attached packing list or inventory summary is the #1 reason customs brokers reject filings before port entry.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="font-bold text-amber-700 shrink-0">4.</span>
                <span>
                  <strong>Mismatched Names:</strong> The name on Form 3299 must exactly match your passport and the ocean/air Bill of Lading (B/L).
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="font-bold text-amber-700 shrink-0">5.</span>
                <span>
                  <strong>Using Outdated Paper Forms:</strong> Customs frequently rejects superseded revisions. Always use the <strong>Rev. 05/24 standard</strong> template.
                </span>
              </li>
            </ul>
          </div>

          {/* Deep-Dive Compliance Guides */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-3">
              <h3 className="text-2xl font-bold text-slate-900">
                Official Customs &amp; Carrier Reference Guides
              </h3>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Updated for 2026 Regulations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <a
                href="/guides/how-to-fill-out-cbp-form-3299/"
                className="group p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all space-y-2.5 block"
              >
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                  <span>Pillar Guide</span>
                </div>
                <h4 className="font-bold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">
                  How to Fill Out Form 3299 &rarr;
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Line-by-line instructions, residency status rules (19 CFR 148), and 1-year duty-free exemption criteria.
                </p>
              </a>

              <a
                href="/guides/cbp-form-3299-fedex/"
                className="group p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all space-y-2.5 block"
              >
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  <span>Express Carrier</span>
                </div>
                <h4 className="font-bold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">
                  FedEx Customs Clearance Guide &rarr;
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  How to resolve FedEx clearance delay holds at Memphis &amp; Indy hubs, AWB mapping, and passenger travel proof.
                </p>
              </a>

              <a
                href="/guides/cbp-form-3299-supplemental-declaration/"
                className="group p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all space-y-2.5 block"
              >
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <span>Packing List</span>
                </div>
                <h4 className="font-bold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">
                  Supplemental Declaration &rarr;
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formatting your itemized packing inventory, declaring wine cellars, and ATF ammunition regulations.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Ready to generate your compliant Form 3299?
            </h3>
            <p className="text-xs text-slate-300">
              Skip the manual paperwork. Answer our guided questions and get your official print-ready PDF in 3 minutes.
            </p>
          </div>

          <button
            onClick={onStartGenerator}
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <span>Start Generator Now ($4.99)</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
};
