'use client';

import Link from 'next/link';
import GiftCardGenerator from '@/components/GiftCardGenerator';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GiftCardPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-gold-400 hover:text-gold-300 transition-colors text-sm"
        >
          <span className="mr-2">←</span> {t('backToHome')}
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gold-400 mb-3 festive-glow">
          {t('giftCardTitle')}
        </h2>
        <p className="text-lg text-gold-200 max-w-2xl mx-auto">
          {t('giftCardDescription')}
        </p>
      </div>

      <GiftCardGenerator />
    </div>
  );
}
