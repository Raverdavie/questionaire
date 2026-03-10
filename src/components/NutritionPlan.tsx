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
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          {t.back}
        </button>
        <button
          onClick={() => {
            if (!pdfLoading) handleDownloadPDF();
          }}
          disabled={pdfLoading}
          className={`px-4 py-2 text-white font-semibold rounded-lg transition-colors ${
            pdfLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {pdfLoading ? 'Generating PDF...' : t.downloadPdf}
        </button>
      </div>

      <div ref={planRef} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.plan.header}</h1>
          <p className="text-gray-600">{t.plan.basedOn}</p>
        </div>

        {/* User Profile Summary */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.plan.profile}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-2xl font-bold text-blue-600">{data.bmi}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Daily Calories</p>
              <p className="text-2xl font-bold text-blue-600">{data.dailyCalories.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Protein Target</p>
              <p className="text-2xl font-bold text-blue-600">{data.protein}g</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Activity Level</p>
              <p className="text-lg font-bold text-blue-600">{data.activityLevel}</p>
            </div>
          </div>
        </section>

        {/* Macronutrient Distribution */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.plan.dailyMacros}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Protein</p>
              <p className="text-3xl font-bold text-red-600">{data.protein}g</p>
              <p className="text-sm text-gray-500 mt-2">{data.proteinPercent}% of daily calories</p>
            </div>
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Carbohydrates</p>
              <p className="text-3xl font-bold text-yellow-600">{data.carbs}g</p>
              <p className="text-sm text-gray-500 mt-2">{data.carbsPercent}% of daily calories</p>
            </div>
            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Fats</p>
              <p className="text-3xl font-bold text-orange-600">{data.fats}g</p>
              <p className="text-sm text-gray-500 mt-2">{data.fatsPercent}% of daily calories</p>
            </div>
          </div>
        </section>

        {/* Daily Meal Recommendations */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.plan.sampleMeals}</h2>
          <div className="space-y-4">
            {data.meals.map((meal: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{meal.calories} cal</p>
                    <p className="text-sm text-gray-600">{meal.protein}g protein</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {meal.foods.map((food: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center">
                      <span className="text-blue-500 mr-2">•</span>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.plan.tips}</h2>
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
            <ul className="space-y-3">
              {data.tips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dietary Notes */}
        {data.dietaryNotes && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.plan.dietaryNotes}</h2>
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg">
              <p className="text-gray-700">{data.dietaryNotes}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
