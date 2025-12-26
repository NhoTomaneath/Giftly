import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';
import LanguageWrapper from '@/components/LanguageWrapper';

export const metadata: Metadata = {
  title: 'Giftly - Gift Card Generator',
  description: 'Create and share beautiful personalized gift cards with your loved ones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Siemreap&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <LanguageWrapper>
            <div className="min-h-screen">
              <Header />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
