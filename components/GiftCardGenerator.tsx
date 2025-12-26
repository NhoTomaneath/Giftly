'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { STICKERS, Sticker } from '@/lib/stickers';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GiftCardGenerator() {
  const { t } = useLanguage();

  const MESSAGE_TEMPLATES = [
    t('template1'),
    t('template2'),
    t('template3'),
    t('template4'),
    t('template5'),
  ];

  const [selectedSticker, setSelectedSticker] = useState<Sticker>(STICKERS[0]);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState(t('template1'));
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [useCustomBg, setUseCustomBg] = useState(false);
  const [borderStyle, setBorderStyle] = useState<'none' | 'solid' | 'double'>('none');
  const [borderColor, setBorderColor] = useState('#fbbf24');
  const [cornerIcon, setCornerIcon] = useState('none');
  const [headingText, setHeadingText] = useState('Happy New Year 2025!');
  const [footerText, setFooterText] = useState('🎉 Happy New Year 2025 🎉');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('medium');
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateCard = async () => {
    if (!cardRef.current) return;

    try {
      setIsSaving(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0c4a6e',
      });

      const response = await fetch('/api/giftcard/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: dataUrl,
          recipientName,
          senderName,
          message,
          stickerType: selectedSticker.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedUrl(data.imageUrl);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        alert('Failed to generate card. Please try again.');
      }
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Failed to generate card. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const shareToTelegram = () => {
    if (!generatedUrl) return;
    const url = `${window.location.origin}${generatedUrl}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Happy New Year 2025! 🎉`)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareToMessenger = () => {
    if (!generatedUrl) return;
    const url = `${window.location.origin}${generatedUrl}`;
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(window.location.href)}`;
    window.open(messengerUrl, '_blank');
  };

  const downloadCard = () => {
    if (!generatedUrl) return;
    const link = document.createElement('a');
    link.download = `new-year-card-${recipientName || 'gift'}-${Date.now()}.png`;
    link.href = generatedUrl;
    link.click();
  };

  const resetCard = () => {
    setGeneratedUrl(null);
    setRecipientName('');
    setSenderName('');
    setMessage('Wishing you a wonderful 2025!');
    setSelectedSticker(STICKERS[0]);
    setCustomBackground(null);
    setUseCustomBg(false);
    setBorderStyle('none');
    setBorderColor('#fbbf24');
    setCornerIcon('none');
    setHeadingText('Happy New Year 2025!');
    setFooterText('🎉 Happy New Year 2025 🎉');
    setTextColor('#ffffff');
    setFontSize('medium');
    setPhotoImage(null);
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomBackground(reader.result as string);
        setUseCustomBg(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomBackground = () => {
    setCustomBackground(null);
    setUseCustomBg(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoImage(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const currentBackground = useCustomBg && customBackground
    ? `url(${customBackground})`
    : selectedSticker.background;

  const getBorderClass = () => {
    if (borderStyle === 'none') return '';
    if (borderStyle === 'solid') return 'border-4';
    if (borderStyle === 'double') return 'border-8 border-double';
    return '';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-2xl md:text-3xl';
    if (fontSize === 'large') return 'text-4xl md:text-5xl';
    return 'text-3xl md:text-4xl'; // medium
  };


  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '🎆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {/* Sticker Selection */}
        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 card-shadow">
          <h3 className="text-xl font-bold text-gold-400 mb-4">{t('chooseTheme')}</h3>
          <div className="grid grid-cols-4 gap-3">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => {
                  setSelectedSticker(sticker);
                  setUseCustomBg(false);
                }}
                title={sticker.name}
                className={`p-3 rounded-lg text-3xl transition-all transform hover:scale-110 ${
                  selectedSticker.id === sticker.id && !useCustomBg
                    ? 'ring-2 ring-gold-400 scale-110 shadow-lg'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ background: sticker.background }}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>

          {/* Custom Background Upload */}
          <div className="mt-4 pt-4 border-t border-gold-500/20">
            <label className="block text-gold-300 mb-2 font-medium text-sm">
              {t('orUploadOwn')}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="hidden"
              id="bg-upload"
            />
            {!useCustomBg ? (
              <>
                <label
                  htmlFor="bg-upload"
                  className="w-full bg-midnight-900/50 border-2 border-dashed border-gold-500/40 rounded-lg p-4 text-center cursor-pointer hover:border-gold-400 hover:bg-midnight-900/70 transition-all flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">🖼️</span>
                  <span className="text-gold-300 text-sm">{t('clickToUpload')}</span>
                </label>
                <p className="text-gold-400/60 text-xs mt-2">{t('imageFormatNote')}</p>
              </>
            ) : (
              <div className="relative">
                <div
                  className="w-full h-24 rounded-lg bg-cover bg-center border-2 border-gold-400 shadow-lg"
                  style={{ backgroundImage: customBackground ? `url(${customBackground})` : 'none' }}
                />
                <button
                  type="button"
                  onClick={removeCustomBackground}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  title="Remove custom background"
                >
                  ✕
                </button>
                <p className="text-gold-300 text-xs mt-2 text-center">Custom background active</p>
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div className="mt-4 pt-4 border-t border-gold-500/20">
            <label className="block text-gold-300 mb-2 font-medium text-sm">
              {t('addPhoto')}
            </label>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            {!photoImage ? (
              <>
                <label
                  htmlFor="photo-upload"
                  className="w-full bg-midnight-900/50 border-2 border-dashed border-gold-500/40 rounded-lg p-4 text-center cursor-pointer hover:border-gold-400 hover:bg-midnight-900/70 transition-all flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">📷</span>
                  <span className="text-gold-300 text-sm">{t('clickToUploadPhoto')}</span>
                </label>
                <p className="text-gold-400/60 text-xs mt-2">{t('imageFormatNote')}</p>
              </>
            ) : (
              <div className="relative">
                <div
                  className="w-full h-32 rounded-lg bg-cover bg-center border-2 border-gold-400 shadow-lg"
                  style={{ backgroundImage: `url(${photoImage})` }}
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  title={t('removePhoto')}
                >
                  ✕
                </button>
                <p className="text-gold-300 text-xs mt-2 text-center">{t('uploadPhoto')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Customize Card */}
        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 card-shadow">
          <h3 className="text-xl font-bold text-gold-400 mb-4">{t('customizeCard')}</h3>

          <div className="space-y-4">
            {/* Main Heading */}
            <div>
              <label className="block text-gold-300 mb-2 font-medium">
                {t('mainHeading')}
              </label>
              <input
                type="text"
                value={headingText}
                onChange={(e) => setHeadingText(e.target.value)}
                placeholder="Happy New Year 2025!"
                className="w-full px-4 py-2 rounded-lg bg-midnight-900/50 border border-gold-500/30 text-gold-100 placeholder-gold-400/50 focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Footer Tagline */}
            <div>
              <label className="block text-gold-300 mb-2 font-medium">
                {t('bottomTagline')}
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="🎉 Happy New Year 2025 🎉"
                className="w-full px-4 py-2 rounded-lg bg-midnight-900/50 border border-gold-500/30 text-gold-100 placeholder-gold-400/50 focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gold-300 mb-2 font-medium">
                  {t('recipientTo')}
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t('recipientPlaceholder')}
                  className="w-full px-4 py-2 rounded-lg bg-midnight-900/50 border border-gold-500/30 text-gold-100 placeholder-gold-400/50 focus:border-gold-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gold-300 mb-2 font-medium">
                  {t('senderFrom')}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t('senderPlaceholder')}
                  className="w-full px-4 py-2 rounded-lg bg-midnight-900/50 border border-gold-500/30 text-gold-100 placeholder-gold-400/50 focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gold-300 mb-2 font-medium">
                {t('yourMessage')}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('messagePlaceholder')}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-midnight-900/50 border border-gold-500/30 text-gold-100 placeholder-gold-400/50 focus:border-gold-400 focus:outline-none resize-none"
              />
            </div>

            {/* Message Templates */}
            <div>
              <label className="block text-gold-300 mb-2 font-medium text-sm">
                {t('messageTemplates')}
              </label>
              <div className="flex flex-wrap gap-2">
                {MESSAGE_TEMPLATES.map((template, index) => {
                  const themeNames = [
                    t('joyAndSuccess'),
                    t('happinessAndProsperity'),
                    t('newBeginnings'),
                    t('healthAndWealth'),
                    t('dreamBig')
                  ];
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setMessage(template)}
                      className="text-xs px-3 py-1 rounded-full bg-midnight-900/50 border border-gold-500/20 text-gold-300 hover:border-gold-400 hover:text-gold-200 transition-colors"
                    >
                      {themeNames[index]}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerateCard}
              disabled={isSaving || !recipientName || !message}
              className="w-full bg-gold-500 text-midnight-900 py-3 rounded-lg font-bold text-lg hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {isSaving ? t('generating') : t('generateCard')}
            </button>
          </div>
        </div>

        {/* Border & Text Customization */}
        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 card-shadow">
          <h3 className="text-xl font-bold text-gold-400 mb-4">{t('cardStyling')}</h3>

          <div className="space-y-4">
            {/* Border Style */}
            <div>
              <label className="block text-gold-300 mb-2 font-medium">
                {t('borderStyle')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'none', label: t('borderNone') },
                  { value: 'solid', label: t('borderSolid') },
                  { value: 'double', label: t('borderDouble') },
                ].map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setBorderStyle(style.value as any)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      borderStyle === style.value
                        ? 'bg-gold-500 text-midnight-900 font-semibold'
                        : 'bg-midnight-900/50 text-gold-300 hover:bg-midnight-900/70'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Color */}
            {borderStyle !== 'none' && (
              <div>
                <label htmlFor="border-color-picker" className="block text-gold-300 mb-2 font-medium">
                  {t('borderColor')}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    id="border-color-picker"
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer bg-midnight-900/50 border border-gold-500/30"
                    title="Pick a custom border color"
                  />
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    {['#ffffff', '#fbbf24', '#FF69B4', '#87CEEB', '#98FB98'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setBorderColor(color)}
                        className={`h-8 rounded-lg border-2 transition-all ${
                          borderColor === color ? 'border-gold-400 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Text Color */}
            <div>
              <label htmlFor="text-color-picker" className="block text-gold-300 mb-2 font-medium">
                {t('textColor')}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  id="text-color-picker"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-midnight-900/50 border border-gold-500/30"
                  title="Pick a custom text color"
                />
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {['#ffffff', '#FFD700', '#FF69B4', '#87CEEB', '#98FB98'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setTextColor(color)}
                      className={`h-8 rounded-lg border-2 transition-all ${
                        textColor === color ? 'border-gold-400 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-gold-300 mb-2 font-medium">
                {t('fontSize')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'small', label: t('fontSmall'), icon: 'Aa' },
                  { value: 'medium', label: t('fontMedium'), icon: 'Aa' },
                  { value: 'large', label: t('fontLarge'), icon: 'Aa' },
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFontSize(size.value)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      fontSize === size.value
                        ? 'bg-gold-500 text-midnight-900 font-semibold'
                        : 'bg-midnight-900/50 text-gold-300 hover:bg-midnight-900/70'
                    }`}
                    style={{
                      fontSize: size.value === 'small' ? '14px' : size.value === 'large' ? '18px' : '16px'
                    }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Decorative Icon */}
            <div>
                <label className="block text-gold-300 mb-2 font-medium">
                  {t('cornerDecoration')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['none', '✨', '⭐', '💫', '🌟', '❄️', '🎆', '🎉', '🎊', '💖', '🔥', '🌸', '🦋'].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setCornerIcon(icon)}
                      className={`w-12 h-12 rounded-lg text-2xl transition-all ${
                        cornerIcon === icon
                          ? 'bg-gold-500 scale-110 ring-2 ring-gold-400'
                          : 'bg-midnight-900/50 hover:bg-midnight-900/70 hover:scale-105'
                      }`}
                      title={icon === 'none' ? 'No corner decoration' : `Use ${icon} as corner decoration`}
                    >
                      {icon === 'none' ? '🚫' : icon}
                    </button>
                  ))}
                </div>
                <p className="text-gold-300/60 text-xs mt-2">
                  {t('cornerIconDesc')}
                </p>
              </div>
          </div>
        </div>

        {/* Share Options */}
        {generatedUrl && (
          <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 card-shadow animate-fadeIn">
            <h3 className="text-xl font-bold text-gold-400 mb-4">{t('shareCard')}</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={shareToTelegram}
                className="bg-[#0088cc] text-white py-3 rounded-lg font-semibold hover:bg-[#0077b5] transition-colors flex items-center justify-center gap-2"
              >
                {t('shareTelegram')}
              </button>
              <button
                onClick={shareToMessenger}
                className="bg-[#0084ff] text-white py-3 rounded-lg font-semibold hover:bg-[#0073e6] transition-colors flex items-center justify-center gap-2"
              >
                {t('shareMessenger')}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadCard}
                className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
              >
                {t('downloadCard')}
              </button>
              <button
                onClick={resetCard}
                className="bg-midnight-700 text-gold-400 py-3 rounded-lg font-semibold hover:bg-midnight-600 border border-gold-500/30 transition-colors flex items-center justify-center gap-2"
              >
                {t('newCard')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-midnight-800/60 backdrop-blur-sm p-6 rounded-xl border border-gold-500/30 card-shadow">
          <h3 className="text-xl font-bold text-gold-400 mb-4">{t('livePreview')}</h3>
          <div
            ref={cardRef}
            className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-cover bg-center ${getBorderClass()}`}
            style={{
              background: useCustomBg && customBackground
                ? `url(${customBackground}) center/cover`
                : selectedSticker.background,
              borderColor: borderStyle !== 'none' ? borderColor : undefined
            }}
          >
            {/* Semi-transparent overlay for better text readability on custom backgrounds */}
            {useCustomBg && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
            )}

            {/* Corner Decorative elements */}
            {cornerIcon !== 'none' && (
              <>
                <div className="absolute top-4 left-4 text-4xl opacity-30 z-10">{cornerIcon}</div>
                <div className="absolute top-4 right-4 text-4xl opacity-30 z-10">{cornerIcon}</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-30 z-10">{cornerIcon}</div>
                <div className="absolute bottom-4 right-4 text-4xl opacity-30 z-10">{cornerIcon}</div>
              </>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="text-7xl mb-4 animate-bounce">
                {selectedSticker.emoji}
              </div>

              <h2
                className={`${getFontSizeClass()} font-bold mb-4 festive-glow drop-shadow-lg`}
                style={{ color: textColor }}
              >
                {headingText || 'Happy New Year 2025!'}
              </h2>

              {recipientName && (
                <p
                  className="text-xl mb-4 drop-shadow"
                  style={{ color: textColor, opacity: 0.9 }}
                >
                  Dear <span className="font-bold">{recipientName}</span>,
                </p>
              )}

              {message && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm mb-4">
                  <p
                    className="text-base leading-relaxed drop-shadow"
                    style={{ color: textColor }}
                  >
                    {message}
                  </p>
                </div>
              )}

              {senderName && (
                <p
                  className="text-lg drop-shadow mb-4"
                  style={{ color: textColor, opacity: 0.9 }}
                >
                  {t('withLove')} <span className="font-semibold">{senderName}</span>
                </p>
              )}

              {/* Photo Card - Below sender name */}
              {photoImage && (
                <div className="mt-2 mb-4">
                  {/* Polaroid-style photo card */}
                  <div className="bg-white p-3 pb-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                    <div
                      className="w-28 h-28 md:w-32 md:h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url(${photoImage})` }}
                    />
                  </div>
                </div>
              )}

              <div
                className="absolute bottom-6 text-xs"
                style={{ color: textColor, opacity: 0.5 }}
              >
                {footerText || '🎉 Happy New Year 2025 🎉'}
              </div>
            </div>
          </div>

          <p className="text-center text-gold-300/60 text-sm mt-4">
            {t('fillDetails')}
          </p>
        </div>
      </div>
    </div>
  );
}
