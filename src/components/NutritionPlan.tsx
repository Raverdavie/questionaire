'use client';

import { useRef, useState } from 'react';
import translations from '@/utils/translations';

interface NutritionPlanProps {
  data: any;
  onBack: () => void;
  lang: 'en' | 'pt';
}

export default function NutritionPlan({ data, onBack, lang }: NutritionPlanProps) {
  const t = translations[lang];
  const planRef = useRef<HTMLDivElement>(null);

  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!planRef.current) return;
    if (typeof window === 'undefined') return;
    setPdfLoading(true);

    const options = {
      margin: 10,
      filename: 'nutrition-plan.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    try {
      // Load bundled html2pdf (includes html2canvas and jsPDF) from CDN if not already loaded
      if (!(window as any).html2pdf) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load html2pdf script'));
          document.body.appendChild(script);
        });
      }

      const html2pdf = (window as any).html2pdf;
      if (!html2pdf) throw new Error('html2pdf not available');

      // @ts-ignore
      await html2pdf().set(options).from(planRef.current).save();
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-4 mb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {t.back}
        </button>
        <button
          onClick={() => {
            if (!pdfLoading) handleDownloadPDF();
          }}
          disabled={pdfLoading}
          className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
            pdfLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {pdfLoading ? 'Generating PDF...' : t.downloadPdf}
        </button>
      </div>

      <div ref={planRef} className="bg-white rounded-xl shadow-xl p-10 border border-emerald-100 space-y-10">
        {/* Header */}
        <div className="border-b-2 border-emerald-600 pb-8">
          <h1 className="text-4xl font-bold text-emerald-900 mb-3">{t.plan.header}</h1>
          <p className="text-lg text-emerald-700">{t.plan.basedOn}</p>
        </div>

        {/* User Profile Summary */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
            <span className="w-1 h-7 bg-emerald-600 mr-3 rounded"></span>
            {t.plan.profile}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-700 font-semibold">BMI</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{data.bmi}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-700 font-semibold">Daily Calories</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{data.dailyCalories.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-700 font-semibold">Protein Target</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{data.protein}g</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-700 font-semibold">Activity Level</p>
              <p className="text-xl font-bold text-emerald-600 mt-2">{data.activityLevel}</p>
            </div>
          </div>
        </section>

        {/* Macronutrient Distribution */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
            <span className="w-1 h-7 bg-emerald-600 mr-3 rounded"></span>
            {t.plan.dailyMacros}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-teal-500 bg-teal-50 p-6 rounded-lg">
              <p className="text-sm text-teal-700 font-semibold mb-2">Protein</p>
              <p className="text-3xl font-bold text-teal-600">{data.protein}g</p>
              <p className="text-sm text-teal-600 mt-3">{data.proteinPercent}% of daily calories</p>
            </div>
            <div className="border-l-4 border-lime-500 bg-lime-50 p-6 rounded-lg">
              <p className="text-sm text-lime-700 font-semibold mb-2">Carbohydrates</p>
              <p className="text-3xl font-bold text-lime-600">{data.carbs}g</p>
              <p className="text-sm text-lime-600 mt-3">{data.carbsPercent}% of daily calories</p>
            </div>
            <div className="border-l-4 border-emerald-500 bg-emerald-50 p-6 rounded-lg">
              <p className="text-sm text-emerald-700 font-semibold mb-2">Fats</p>
              <p className="text-3xl font-bold text-emerald-600">{data.fats}g</p>
              <p className="text-sm text-emerald-600 mt-3">{data.fatsPercent}% of daily calories</p>
            </div>
          </div>
        </section>

        {/* Daily Meal Recommendations */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
            <span className="w-1 h-7 bg-emerald-600 mr-3 rounded"></span>
            {t.plan.sampleMeals}
          </h2>
          <div className="space-y-5">
            {data.meals.map((meal: any, index: number) => (
              <div key={index} className="border border-emerald-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">{meal.name}</h3>
                    <p className="text-sm text-emerald-600 mt-1">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-700 font-semibold">{meal.calories} cal</p>
                    <p className="text-sm text-emerald-600">{meal.protein}g protein</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {meal.foods.map((food: string, idx: number) => (
                    <li key={idx} className="text-sm text-emerald-800 flex items-center">
                      <span className="text-emerald-500 mr-3 font-bold">•</span>
                      {food}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Nutrition Tips */}
        <section>
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
            <span className="w-1 h-7 bg-emerald-600 mr-3 rounded"></span>
            {t.plan.tips}
          </h2>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-8 rounded-lg">
            <ul className="space-y-4">
              {data.tips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-emerald-900">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dietary Notes */}
        {data.dietaryNotes && (
          <section>
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
              <span className="w-1 h-7 bg-emerald-600 mr-3 rounded"></span>
              {t.plan.dietaryNotes}
            </h2>
            <div className="bg-gradient-to-r from-emeral-50 to-cyan-50 border-l-4 border-emerald-600 p-8 rounded-lg">
              <p className="text-emerald-900 text-lg leading-relaxed">{data.dietaryNotes}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
