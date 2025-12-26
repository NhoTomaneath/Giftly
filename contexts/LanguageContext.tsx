'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'km';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    brandName: 'Giftly',
    backToHome: 'Back to Home',

    // Home Page
    homeTitle: 'Create Beautiful New Year Gift Cards',
    homeDescription: 'Design personalized gift cards with festive themes, custom messages, and share them with your loved ones',
    startCreating: 'Start Creating Now',
    whyChoose: 'Why Choose Our Gift Cards?',
    beautifulThemes: 'Beautiful Themes',
    beautifulThemesDesc: 'Choose from 8 stunning gradient backgrounds with festive stickers',
    personalMessages: 'Personal Messages',
    personalMessagesDesc: 'Add heartfelt wishes and personalize for each recipient',
    easySharing: 'Easy Sharing',
    easySharingDesc: 'Share via Telegram, Messenger, or download directly',

    // Gift Card Page
    giftCardTitle: 'Gift Card Generator',
    giftCardDescription: 'Create personalized New Year gift cards with beautiful designs and heartfelt messages.',

    // Stickers Section
    chooseTheme: 'Choose a Theme',
    chooseBackground: 'Choose Your Background:',
    presetStickers: 'Preset Stickers',
    customBackground: 'Custom Background',
    uploadCustomBg: 'Upload Custom Background',
    removeCustomBg: 'Remove Custom Background',
    orUploadOwn: 'Or upload your own background:',
    clickToUpload: 'Click to upload custom background',
    livePreview: 'Live Preview',
    fillDetails: 'Fill in the details to see your card come to life!',
    addPhoto: 'Add a Photo',
    uploadPhoto: 'Upload your photo',
    clickToUploadPhoto: 'Click to upload a photo',
    removePhoto: 'Remove Photo',
    imageFormatNote: 'Supported formats: JPG, PNG, GIF • Max size: 5MB',

    // Border Customization
    cardStyling: 'Card Styling',
    borderStyle: 'Border Style:',
    borderColor: 'Border Color:',
    borderNone: 'None',
    borderSolid: 'Solid',
    borderDashed: 'Dashed',
    borderDotted: 'Dotted',
    borderDouble: 'Double',
    borderDecorative: 'Decorative',
    borderEmoji: 'Border Emoji:',

    // Text & Icon Customization
    textColor: 'Text Color:',
    fontSize: 'Text Size:',
    fontSmall: 'Small',
    fontMedium: 'Medium',
    fontLarge: 'Large',
    cornerIcon: 'Corner Icon:',
    cornerDecoration: 'Corner Decoration:',
    cornerIconDesc: 'Choose the icon that appears in the four corners of your card',

    // Customize Card
    customizeCard: 'Customize Your Card',
    mainHeading: 'Main Heading:',
    mainHeadingPlaceholder: 'Happy New Year 2025!',
    bottomTagline: 'Bottom Tagline:',
    bottomTaglinePlaceholder: '🎉 Happy New Year 2025 🎉',
    recipientTo: 'To:',
    recipientPlaceholder: "Recipient's name",
    senderFrom: 'From:',
    senderPlaceholder: 'Your name',
    yourMessage: 'Your Message:',
    messagePlaceholder: 'Write your heartfelt message here...',
    messageTemplates: 'Quick Message Themes:',

    // Message Theme Names
    joyAndSuccess: 'Joy & Success',
    happinessAndProsperity: 'Happiness & Prosperity',
    newBeginnings: 'New Beginnings',
    healthAndWealth: 'Health & Wealth',
    dreamBig: 'Dream Big',

    // Actions
    generateCard: 'Generate Card',
    generating: 'Generating...',
    newCard: 'New Card',

    // Success Section
    cardReady: '🎉 Your Card is Ready!',
    shareCard: 'Share Your Card:',
    shareWhatsApp: 'WhatsApp',
    shareTelegram: 'Telegram',
    shareMessenger: 'Messenger',
    copyLink: 'Copy Link',
    downloadCard: 'Download',

    // Message Templates
    template1: 'Wishing you a wonderful 2025 filled with joy and success!',
    template2: 'May this New Year bring you endless happiness and prosperity!',
    template3: "Here's to new beginnings and amazing adventures in 2025!",
    template4: 'Cheers to health, wealth, and happiness in the coming year!',
    template5: 'May 2025 be your best year yet! Dream big and achieve more!',

    // Card Preview
    withLove: 'With love,',

    // Footer
    footerText: '© 2025 Giftly. Made with love.',

    // Digital Scrapbook
    scrapbookTitle: '📸 Digital Scrapbook',
    scrapbookDescription: 'Upload your favorite photos and create a beautiful collection of 2025 memories.',
  },
  km: {
    // Header
    brandName: 'Giftly',
    backToHome: 'ត្រឡប់ទៅទំព័រដើម',

    // Home Page
    homeTitle: 'បង្កើតកាតអំណោយឆ្នាំថ្មីស្រស់ស្អាត',
    homeDescription: 'រចនាកាតអំណោយផ្ទាល់ខ្លួនជាមួយនឹងប្រធានបទបុណ្យ សារផ្ទាល់ខ្លួន និងចែករំលែកជាមួយមនុស្សជាទីស្រឡាញ់របស់អ្នក',
    startCreating: 'ចាប់ផ្តើមបង្កើតឥឡូវនេះ',
    whyChoose: 'ហេតុអ្វីជ្រើសរើសកាតអំណោយរបស់យើង?',
    beautifulThemes: 'ប្រធានបទស្រស់ស្អាត',
    beautifulThemesDesc: 'ជ្រើសរើសពីផ្ទៃខាងក្រោយជម្រាល 8 ស្រស់ស្អាតជាមួយនឹងស្ទីគឃ័របុណ្យ',
    personalMessages: 'សារផ្ទាល់ខ្លួន',
    personalMessagesDesc: 'បន្ថែមការជូនពរពីបេះដូង និងកែសម្រួលសម្រាប់អ្នកទទួលនីមួយៗ',
    easySharing: 'ចែករំលែកយ៉ាងងាយស្រួល',
    easySharingDesc: 'ចែករំលែកតាមរយៈ Telegram, Messenger ឬទាញយកដោយផ្ទាល់',

    // Gift Card Page
    giftCardTitle: 'កម្មវិធីបង្កើតកាតអំណោយ',
    giftCardDescription: 'បង្កើតកាតអំណោយឆ្នាំថ្មីដែលមានការរចនាស្រស់ស្អាត និងសាររបស់អ្នក។',

    // Stickers Section
    chooseTheme: 'ជ្រើសរើសប្រធានបទ',
    chooseBackground: 'ជ្រើសរើសផ្ទៃខាងក្រោយរបស់អ្នក:',
    presetStickers: 'ស្ទីគឃ័រដែលបានកំណត់',
    customBackground: 'ផ្ទៃខាងក្រោយផ្ទាល់ខ្លួន',
    uploadCustomBg: 'ផ្ទុកផ្ទៃខាងក្រោយផ្ទាល់ខ្លួន',
    removeCustomBg: 'លុបផ្ទៃខាងក្រោយផ្ទាល់ខ្លួន',
    orUploadOwn: 'ឬផ្ទុកផ្ទៃខាងក្រោយផ្ទាល់ខ្លួនរបស់អ្នក:',
    clickToUpload: 'ចុចដើម្បីផ្ទុកផ្ទៃខាងក្រោយផ្ទាល់ខ្លួន',
    livePreview: 'មើលជាមុន',
    fillDetails: 'បំពេញព័ត៌មានលម្អិតដើម្បីមើលកាតរបស់អ្នក!',
    addPhoto: 'បន្ថែមរូបភាព',
    uploadPhoto: 'ផ្ទុករូបភាពរបស់អ្នក',
    clickToUploadPhoto: 'ចុចដើម្បីផ្ទុករូបភាព',
    removePhoto: 'លុបរូបភាព',
    imageFormatNote: 'ទ្រង់ទ្រាយគាំទ្រ៖ JPG, PNG, GIF • ទំហំអតិបរមា៖ 5MB',

    // Border Customization
    cardStyling: 'រចនាប័ទ្មកាត',
    borderStyle: 'រចនាប័ទ្មគែម:',
    borderColor: 'ពណ៌គែម:',
    borderNone: 'គ្មាន',
    borderSolid: 'រឹង',
    borderDashed: 'ចុច',
    borderDotted: 'ចុចតូច',
    borderDouble: 'ពីរជាន់',
    borderDecorative: 'តុបតែង',
    borderEmoji: 'អ៊ីម៉ូជីគែម:',

    // Text & Icon Customization
    textColor: 'ពណ៌អក្សរ:',
    fontSize: 'ទំហំអក្សរ:',
    fontSmall: 'តូច',
    fontMedium: 'មធ្យម',
    fontLarge: 'ធំ',
    cornerIcon: 'រូបតំណាងជ្រុង:',
    cornerDecoration: 'ការតុបតែងជ្រុង:',
    cornerIconDesc: 'ជ្រើសរើសរូបតំណាងដែលបង្ហាញនៅជ្រុងទាំងបួនរបស់កាតអ្នក',

    // Customize Card
    customizeCard: 'កែសម្រួលកាតរបស់អ្នក',
    mainHeading: 'ចំណងជើងមេ:',
    mainHeadingPlaceholder: 'រីករាយឆ្នាំថ្មី 2025!',
    bottomTagline: 'ពាក្យស្លោកខាងក្រោម:',
    bottomTaglinePlaceholder: '🎉 រីករាយឆ្នាំថ្មី 2025 🎉',
    recipientTo: 'ជូនដល់:',
    recipientPlaceholder: 'ឈ្មោះអ្នកទទួល',
    senderFrom: 'ពី:',
    senderPlaceholder: 'ឈ្មោះរបស់អ្នក',
    yourMessage: 'សាររបស់អ្នក:',
    messagePlaceholder: 'សរសេរសាររបស់អ្នកនៅទីនេះ...',
    messageTemplates: 'ប្រធានបទសាររហ័ស:',

    // Message Theme Names
    joyAndSuccess: 'សេចក្តីរីករាយ និងជោគជ័យ',
    happinessAndProsperity: 'សុភមង្គល និងភាពរុងរឿង',
    newBeginnings: 'ការចាប់ផ្តើមថ្មី',
    healthAndWealth: 'សុខភាព និងសម្បត្តិ',
    dreamBig: 'សុបិនធំ',

    // Actions
    generateCard: 'បង្កើតកាត',
    generating: 'កំពុងបង្កើត...',
    newCard: 'កាតថ្មី',

    // Success Section
    cardReady: '🎉 កាតរបស់អ្នករួចរាល់ហើយ!',
    shareCard: 'ចែករំលែកកាតរបស់អ្នក:',
    shareWhatsApp: 'WhatsApp',
    shareTelegram: 'Telegram',
    shareMessenger: 'Messenger',
    copyLink: 'ចម្លងតំណ',
    downloadCard: 'ទាញយក',

    // Message Templates
    template1: 'សូមជូនពរឆ្នាំ 2025 ពោរពេញដោយសេចក្តីរីករាយ និងជោគជ័យ!',
    template2: 'សូមឲ្យឆ្នាំថ្មីនេះនាំមកនូវសុភមង្គល និងភាពរុងរឿង!',
    template3: 'សូមឲ្យមានការចាប់ផ្តើមថ្មី និងការផ្សងព្រេងអស្ចារ្យក្នុងឆ្នាំ 2025!',
    template4: 'សូមជូនពរសុខភាព សម្បត្តិ និងសេចក្តីសុខក្នុងឆ្នាំថ្មី!',
    template5: 'សូមឲ្យឆ្នាំ 2025 ក្លាយជាឆ្នាំដ៏ល្អបំផុតរបស់អ្នក! សុបិនធំ និងសម្រេចបានច្រើន!',

    // Card Preview
    withLove: 'ជាមួយនឹងស្នេហា,',

    // Footer
    footerText: '© 2025 Giftly. បង្កើតដោយសេចក្តីស្រឡាញ់។',

    // Digital Scrapbook
    scrapbookTitle: '📸 សៀវភៅរូបភាពឌីជីថល',
    scrapbookDescription: 'ផ្ទុករូបភាពដែលអ្នកចូលចិត្តបំផុត និងបង្កើតបណ្តុំអនុស្សាវរីយ៍ស្អាតនៃឆ្នាំ 2025។',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
