'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 festive-glow">
          {t('homeTitle')}
        </h2>
        <p className="text-xl text-gold-200 max-w-2xl mx-auto mb-8">
          {t('homeDescription')}
        </p>
        <Link href="/gift-card">
          <span className="inline-block bg-gold-500 text-midnight-900 px-10 py-4 rounded-full text-xl font-bold hover:bg-gold-400 transition-all transform hover:scale-105 shadow-lg">
            {t('startCreating')}
          </span>
        </Link>
      </div>

      <h3 className="text-2xl font-bold text-gold-400 mb-6 text-center">{t('whyChoose')}</h3>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 text-center card-shadow">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-bold text-gold-400 mb-2">{t('beautifulThemes')}</h3>
          <p className="text-gold-200 text-sm">
            {t('beautifulThemesDesc')}
          </p>
        </div>

        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 text-center card-shadow">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-lg font-bold text-gold-400 mb-2">{t('personalMessages')}</h3>
          <p className="text-gold-200 text-sm">
            {t('personalMessagesDesc')}
          </p>
        </div>

        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 text-center card-shadow">
          <div className="text-4xl mb-4">📤</div>
          <h3 className="text-lg font-bold text-gold-400 mb-2">{t('easySharing')}</h3>
          <p className="text-gold-200 text-sm">
            {t('easySharingDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
