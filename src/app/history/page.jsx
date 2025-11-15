'use client'

import { useRouter } from 'next/navigation';
import { HelpCircle, CheckCircle, Clock, Plus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../constants/translations';

export default function History() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const doubts = [
    { title: "What is the significance of the upcoming lunar eclipse?", date: "Oct 26, 2023", status: "Answered" },
    { title: "How does Mercury retrograde affect my career path?", date: "Oct 24, 2023", status: "Pending" },
    { title: "Is there a good time to start a new project this month?", date: "Oct 22, 2023", status: "Answered" },
    { title: "Can you explain the meaning of a Saturn return?", date: "Oct 19, 2023", status: "Answered" },
  ];

  return (
    <div className="mx-auto max-w-sm h-[calc(100vh-5rem)] flex flex-col bg-(--color-background) overflow-hidden">
      <main className="grow overflow-hidden px-4 pb-24">
        <div className="flex items-center py-4">
          <button className="p-2 -ml-2 text-primary" onClick={() => router.back()}>
            <ArrowLeft size={30} />
          </button>
          <h1 className="text-xl font-bold text-center grow text-(--color-text-primary) -ml-10">{t('myDoubts')}</h1>
        </div>
        <div className="space-y-4 mt-4">
          {doubts.map((doubt, index) => (
            <div key={index} className="flex cursor-pointer items-center gap-4 rounded-xl bg-(--color-card) p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HelpCircle size={24} />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1 overflow-hidden">
                <p className="truncate text-base font-semibold text-(--color-text-primary)">{doubt.title}</p>
                <p className="text-sm text-(--color-text-secondary)">{doubt.date}</p>
              </div>
              <div className={`flex shrink-0 flex-col items-center justify-center gap-1 text-xs font-medium ${doubt.status === 'Answered' ? 'text-green-500' : 'text-amber-500'}`}>
                {doubt.status === 'Answered' ? <CheckCircle size={20} /> : <Clock size={20} />}
                <span>{doubt.status === 'Answered' ? t('answered') : t('pending')}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
