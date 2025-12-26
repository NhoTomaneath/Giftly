'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'km' : 'en');
  };

  const getLanguageLabel = () => {
    return language === 'en' ? 'EN' : 'ភាសាខ្មែរ';
  };

  return (
    <header className="bg-midnight-900/50 backdrop-blur-sm border-b border-gold-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Top Left */}
        <div className="flex items-center gap-3">
          <div className="text-4xl md:text-5xl animate-party-bounce">
            🎉
          </div>
          <h1 className="text-3xl md:text-4xl font-bold festive-glow text-gold-400">
            {t('brandName')}
          </h1>
        </div>

        {/* Translate Button - Top Right */}
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/50 rounded-lg text-gold-200 font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          aria-label="Change language"
        >
          <span className="text-xl">🌐</span>
          <span className="text-sm md:text-base">{getLanguageLabel()}</span>
        </button>
      </div>
    </header>
  );
}
