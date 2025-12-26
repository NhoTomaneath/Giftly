'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-midnight-900/50 backdrop-blur-sm border-t border-gold-500/20 mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-gold-300">
        <p>{t('footerText')}</p>
      </div>
    </footer>
  );
}
