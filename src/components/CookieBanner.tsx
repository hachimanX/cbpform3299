import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cbp_3299_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveChoice = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem('cbp_3299_cookie_consent', choice);
    } catch {}
    if (choice === 'accepted') {
      // Grant Google Analytics storage (defaults to denied in index.html)
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 sm:p-5 sm:rounded-2xl border-t sm:border border-slate-700 shadow-2xl animate-fade-in">
      <div className="flex items-start space-x-3.5">
        <div className="hidden sm:block p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 text-xs leading-relaxed text-slate-300">
          <p>
            We use Google Analytics only if you accept. No advertising cookies. Your form draft stays in your browser.{' '}
            <button
              onClick={onOpenPrivacy}
              className="text-amber-400 underline hover:text-amber-300 font-medium"
            >
              Privacy Policy
            </button>
          </p>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => saveChoice('accepted')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Accept Analytics
            </button>
            <button
              onClick={() => saveChoice('essential')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
