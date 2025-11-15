'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Signal, Battery } from 'lucide-react';
import LanguageSection from '../../components/LanguageSection';
import DisplaySection from '../../components/DisplaySection';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../constants/translations';

const SettingsPage = () => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);

    return (
        <div className="mx-auto max-w-sm flex flex-col bg-(--color-background) overflow-hidden">
            <main className="grow overflow-hidden px-4 pb-24">
                <div className="flex items-center py-4">
                    <button className="p-2 -ml-2 text-primary" onClick={() => router.back()}>
                        <ArrowLeft size={30} />
                    </button>
                    <h1 className="text-xl font-bold text-center grow text-(--color-text-primary) -ml-10">{t('settings')}</h1>
                </div>
                <div className="space-y-8 mt-4">
                    <LanguageSection />
                    <DisplaySection
                        isDarkMode={isDarkMode}
                        onToggle={toggleDarkMode}
                    />
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
