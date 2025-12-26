'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the html lang attribute when language changes
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
