import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WizardContainer } from './components/Wizard/WizardContainer';
import { PricingSection } from './components/PricingSection';
import { SeoGuide } from './components/SeoGuide';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';
import type { LegalPage } from './components/LegalModals';

export function App() {
  const [legalModalPage, setLegalModalPage] = useState<LegalPage | null>(null);

  const scrollToWizard = () => {
    const el = document.getElementById('wizard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGuide = () => {
    const el = document.getElementById('seo-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onStartGenerator={scrollToWizard}
      />

      {/* Hero Section */}
      <Hero
        onStart={scrollToWizard}
        onScrollToGuide={scrollToGuide}
      />

      {/* Main Interactive Questionnaire & Generator */}
      <main className="flex-1">
        <WizardContainer />

        {/* Pricing Comparison */}
        <PricingSection
          onStartGenerator={scrollToWizard}
        />

        {/* Comprehensive SEO Guide */}
        <SeoGuide
          onStartGenerator={scrollToWizard}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer with Compliance & Disclaimers */}
      <Footer
        onEraseData={() => setLegalModalPage('deletion')}
      />

      {/* Legal Modals (data deletion). The cookie banner is public/consent.js. */}
      <LegalModals
        page={legalModalPage}
        onClose={() => setLegalModalPage(null)}
      />
    </div>
  );
}

export default App;
