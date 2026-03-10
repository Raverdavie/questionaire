'use client';

import { useState } from 'react';
import translations from '@/utils/translations';

interface QuestionnaireProps {
  onSubmit: (data: any) => void;
  lang: 'en' | 'pt';
}

export default function Questionnaire({ onSubmit, lang }: QuestionnaireProps) {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    goal: '',
    dietaryPreference: '',
    allergens: [] as string[],
    activityLevel: '',
    currentDiet: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAllergenChange = (allergen: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, lang }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const plan = await response.json();
      onSubmit(plan);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate nutrition plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-10 border border-emerald-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="border-b border-emerald-200 pb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-emerald-600 mr-3 rounded"></span>
              {t.personalInfo}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.age}</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="120"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                  placeholder="e.g., 30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.gender}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                >
                  <option value="">{t.selectGender}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.weight}</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                  placeholder="e.g., 75"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.height}</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  min="100"
                  max="250"
                  step="0.1"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                  placeholder="e.g., 180"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="border-b border-emerald-200 pb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-emerald-600 mr-3 rounded"></span>
              {t.healthGoals}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.primaryGoal}</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                >
                  <option value="">{t.selectGoal}</option>
                  <option value="weight_loss">{t.goals.weight_loss}</option>
                  <option value="muscle_gain">{t.goals.muscle_gain}</option>
                  <option value="general_wellness">{t.goals.general_wellness}</option>
                  <option value="athlete_performance">{t.goals.athlete_performance}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.activityLevel}</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                >
                  <option value="">{t.selectActivity}</option>
                  <option value="sedentary">{t.activityOptions.sedentary}</option>
                  <option value="light">{t.activityOptions.light}</option>
                  <option value="moderate">{t.activityOptions.moderate}</option>
                  <option value="active">{t.activityOptions.active}</option>
                  <option value="very_active">{t.activityOptions.very_active}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="border-b border-emerald-200 pb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-emerald-600 mr-3 rounded"></span>
              {t.dietaryPreferences}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.dietaryPreference}</label>
                <select
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                >
                  <option value="">{t.selectDietPref}</option>
                  <option value="omnivore">{t.dietaryOptions.omnivore}</option>
                  <option value="vegetarian">{t.dietaryOptions.vegetarian}</option>
                  <option value="vegan">{t.dietaryOptions.vegan}</option>
                  <option value="pescatarian">{t.dietaryOptions.pescatarian}</option>
                  <option value="keto">{t.dietaryOptions.keto}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-2">{t.currentDiet}</label>
                <select
                  name="currentDiet"
                  value={formData.currentDiet}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50 focus:bg-white transition-colors"
                >
                  <option value="">{t.selectCurrentDiet}</option>
                  <option value="balanced">{t.currentDietOptions.balanced}</option>
                  <option value="high_protein">{t.currentDietOptions.high_protein}</option>
                  <option value="low_carb">{t.currentDietOptions.low_carb}</option>
                  <option value="high_carb">{t.currentDietOptions.high_carb}</option>
                  <option value="calorie_restricted">{t.currentDietOptions.calorie_restricted}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-emerald-900 mb-4">{t.allergies}</label>
                <div className="space-y-3">
                  {['Dairy', 'Gluten', 'Nuts', 'Fish', 'Soy', 'Eggs'].map((allergen) => (
                    <label key={allergen} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.allergens.includes(allergen)}
                        onChange={() => handleAllergenChange(allergen)}
                        className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 bg-white cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-emerald-900 group-hover:text-emerald-600 transition-colors">{allergen}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {loading ? t.generating : t.generateButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
