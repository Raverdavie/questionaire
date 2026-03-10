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
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-emerald-900 mb-3">{t.title}</h1>
            <p className="text-lg text-emerald-700">{t.subtitle}</p>
          </div>
          <div>
            <button
              onClick={toggleLang}
              className="px-6 py-3 bg-emerald-100 text-emerald-800 font-semibold rounded-full hover:bg-emerald-200 transition-colors duration-200 border border-emerald-300"
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
