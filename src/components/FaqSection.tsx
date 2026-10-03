import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is CBP Form 3299 used for?',
    answer:
      'CBP Form 3299 (Declaration for Free Entry of Unaccompanied Articles) is required by U.S. Customs and Border Protection for clearing household goods, personal effects, and unaccompanied baggage shipped to the United States via sea freight container or air cargo.',
  },
  {
    question: 'How much does this generator cost?',
    answer:
      'You can preview your completed declaration with a watermark 100% free. To export the clean, official high-resolution PDF without watermarks, we charge a one-time fee of $4.99 (slashed from $9.99 for our launch special). There are NEVER any recurring monthly subscriptions or hidden fees.',
  },
  {
    question: 'Is my personal data or passport number stored on your servers?',
    answer:
      'NO. Absolutely not. Our generator runs 100% locally inside your web browser using modern client-side JavaScript. Your passport numbers, addresses, and flight details are never sent to, logged by, or stored on our servers. When you close or reset the browser, your data remains completely under your control.',
  },
  {
    question: 'What qualifies as duty-free household goods?',
    answer:
      'Under Harmonized Tariff Schedule subheading 9804.00.05, household effects (such as furniture, carpets, paintings, tableware, books, and linens) that have been owned and used abroad by you or your family for not less than one full year enter the United States completely duty-free.',
  },
  {
    question: 'Can I include wine or alcohol in my shipment?',
    answer:
      'Yes, but you must check the box for alcohol/tobacco in Part IV and itemize each bottle on Page 2 (Item D) specifying the type of alcohol, bottle count, volume (liters), estimated value, and country of origin. Alcohol is subject to federal excise taxes and state regulations.',
  },
  {
    question: 'Do I still need a customs broker or moving company?',
    answer:
      'Yes. Your international mover or freight forwarder is responsible for transporting the physical cargo and lodging entry with CBP. However, they require YOU to provide a signed Form 3299 and packing inventory so their broker can submit the paperwork on your behalf.',
  },
  {
    question: 'How do I sign the form after downloading?',
    answer:
      'You can open the downloaded PDF in any standard software (Apple Preview, Adobe Acrobat) to add a digital signature, or simply print the completed document and sign it by hand in Part VI Box B before emailing a scanned copy to your mover.',
  },
  {
    question: 'What if my mover or broker rejects the generated form?',
    answer:
      'We format our output strictly using the latest official CBP Form 3299 (Rev. 05/24) template with exact federal AcroForm fields. In the unlikely event that your moving agent or customs officer rejects the document layout, we offer a 100% money-back guarantee within 14 days of purchase.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="scroll-mt-24 py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know about filing CBP Form 3299, tariffs, privacy, and our generator.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-4.5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Seal */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-center space-x-3 text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Need help with a unique relocation situation? Contact our support desk at{' '}
            <a href="mailto:support@cbpform3299.com" className="font-bold underline">
              support@cbpform3299.com
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};
