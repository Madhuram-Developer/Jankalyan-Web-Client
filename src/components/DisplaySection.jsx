'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../constants/translations';

const Toggle = ({ id, checked, onChange, label, icon }) => {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
                <span className={`material-symbols-outlined text-3xl ${checked ? 'text-primary' : 'text-(--color-text-primary)'}`}>{icon}</span>
                <p className="font-medium text-(--color-text-primary)">{label}</p>
            </div>
            <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
                <input
                    className="sr-only peer"
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
            </label>
        </div>
    );
};

const DisplaySection = ({ isDarkMode, onToggle }) => {
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);

    return (
        <section>
            <h2 className="text-lg font-semibold text-(--color-text-secondary) mb-3">{t('display')}</h2>
            <div className="bg-(--color-card) rounded-DEFAULT shadow-sm overflow-hidden">
                <Toggle
                    id="theme-toggle"
                    checked={isDarkMode}
                    onChange={onToggle}
                    label={t('darkMode')}
                    icon="dark_mode"
                />
            </div>
        </section>
    );
};

export default DisplaySection;