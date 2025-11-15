'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../constants/translations';
import { ChevronDown } from 'lucide-react';

const LanguageSection = () => {
  const { language, changeLanguage } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold text-(--color-text-secondary) mb-3">{t('language')}</h2>
      <div className="bg-(--color-card) rounded-DEFAULT shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <span className="material-symbols-outlined text-primary text-3xl">language</span>
          <div className="flex-1">
            <p className="font-medium text-(--color-text-primary) mb-2">{t('appLanguage')}</p>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full appearance-none bg-(--color-background) border border-(--color-border) rounded-lg pl-4 pr-10 py-3 text-(--color-text-primary) focus:ring-primary focus:border-primary"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-(--color-text-secondary)">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageSection;