'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeft, ChevronDown, Signal, Battery } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../constants/translations';

export default function AskDoubt() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);


  return (
    <div className="mx-auto max-w-sm h-[calc(100vh-5rem)] flex flex-col bg-(--color-background) overflow-hidden">
      <main className="grow overflow-hidden px-4 pb-24">
        <div className="flex items-center py-4">
          <button className="p-2 -ml-2 text-primary" onClick={() => router.back()}>
            <ArrowLeft size={30} />
          </button>
          <h1 className="text-xl font-bold text-center grow text-(--color-text-primary) -ml-10">{t('askYourQuestions')}</h1>
        </div>
        <form className="space-y-5 mt-4">
          <div>
            <label className="text-sm font-medium text-(--color-text-secondary) mb-1 ml-1 block" htmlFor="name">{t('fullName')}</label>
            <input className="w-full bg-(--color-card) border border-(--color-border) rounded-lg px-4 py-3 placeholder:text-(--color-text-secondary) text-(--color-text-primary) focus:ring-primary focus:border-primary" id="name" placeholder={t('fullNamePlaceholder')} type="text"/>
          </div>
          <div>
            <label className="text-sm font-medium text-(--color-text-secondary) mb-1 ml-1 block" htmlFor="phone">{t('mobileNumber')}</label>
            <input className="w-full bg-(--color-card) border border-(--color-border) rounded-lg px-4 py-3 placeholder:text-(--color-text-secondary) text-(--color-text-primary) focus:ring-primary focus:border-primary" id="phone" placeholder={t('mobileNumberPlaceholder')} type="tel"/>
          </div>
          <div>
            <label className="text-sm font-medium text-(--color-text-secondary) mb-1 ml-1 block" htmlFor="category">{t('doubtCategory')}</label>
            <div className="relative">
              <select className="w-full appearance-none bg-(--color-card) border border-(--color-border) rounded-lg pl-4 pr-10 py-3 text-(--color-text-primary) focus:ring-primary focus:border-primary" id="category">
                <option>{t('generalInquiry')}</option>
                <option>{t('career')}</option>
                <option>{t('relationships')}</option>
                <option>{t('finances')}</option>
                <option>{t('spirituality')}</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-(--color-text-secondary)">
                <ChevronDown />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-(--color-text-secondary) mb-1 ml-1 block" htmlFor="doubt">{t('writeYourQuestion')}</label>
            <textarea className="w-full bg-(--color-card) border border-(--color-border) rounded-lg px-4 py-3 placeholder:text-(--color-text-secondary) text-(--color-text-primary) focus:ring-primary focus:border-primary" id="doubt" placeholder={t('questionPlaceholder')} rows="5"></textarea>
          </div>
          <div className="pt-4">
            <button className="w-full bg-[#E30074] dark:bg-primary text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-colors" type="submit">
              {t('submitQuestion')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
