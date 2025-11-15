'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { History, Info, MessageCircleQuestion, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../constants/translations';

const Navigation = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const navItems = [
    {
      href: '/',
      icon: MessageCircleQuestion,
      labelKey: 'askQuestion',
      size: 24
    },
    {
      href: '/about-us',
      icon: Info,
      labelKey: 'aboutUs',
      size: 22
    },
    {
      href: '/history',
      icon: History,
      labelKey: 'history',
      size: 24
    },
    {
      href: '/settings',
      icon: Settings,
      labelKey: 'settings',
      size: 22
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-(--color-card) border-t border-(--color-border)">
      <div className="flex justify-around items-center h-18">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex flex-col items-center justify-center space-y-1 transition-colors rounded-lg p-2 ${
                isActive 
                  ? '' 
                  : 'text-(--color-text-secondary) hover:text-primary'
              }`}>
                <IconComponent 
                  size={item.size} 
                  className={`${isActive ? 'text-[#E30074] stroke-[2.5]' : 'text-(--color-text-secondary)'}`}
                />
                <span className={`text-xs ${isActive ? 'font-semibold text-(--color-text-primary)' : 'text-(--color-text-secondary)'}`}>{t(item.labelKey)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;