'use client';

import { useEffect, useState } from 'react';
import Questionnaire from '@/components/Questionnaire';
import NutritionPlan from '@/components/NutritionPlan';
import translations from '@/utils/translations';

export default function Home() {
  const [showPlan, setShowPlan] = useState(false);
  const [planData, setPlanData] = useState<any>(null);
  const [lang, setLang] = useState<'en' | 'pt'>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (stored === 'pt' || stored === 'en') setLang(stored as 'en' | 'pt');
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'pt' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const handleQuestionnaireSubmit = (data: any) => {
    setPlanData(data);
    setShowPlan(true);
  };

  const handleBackToQuestionnaire = () => {
    setShowPlan(false);
    setPlanData(null);
  };

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-lg text-gray-600">{t.subtitle}</p>
          </div>
          <div>
            <button
              onClick={toggleLang}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              {t.langName}
            </button>
          </div>
        </div>

        {!showPlan ? (
          <Questionnaire onSubmit={handleQuestionnaireSubmit} lang={lang} />
        ) : (
          <NutritionPlan data={planData} onBack={handleBackToQuestionnaire} lang={lang} />
        )}
      </div>
    </main>
  );
}
