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
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.personalInfo}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.gender}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t.selectGender}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.weight}</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 75"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.height}</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  min="100"
                  max="250"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 180"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.healthGoals}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.primaryGoal}</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t.selectGoal}</option>
                  <option value="weight_loss">{t.goals.weight_loss}</option>
                  <option value="muscle_gain">{t.goals.muscle_gain}</option>
                  <option value="general_wellness">{t.goals.general_wellness}</option>
                  <option value="athlete_performance">{t.goals.athlete_performance}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.activityLevel}</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.dietaryPreferences}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.dietaryPreference}</label>
                <select
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentDiet}</label>
                <select
                  name="currentDiet"
                  value={formData.currentDiet}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.allergies}</label>
                <div className="space-y-2">
                  {['Dairy', 'Gluten', 'Nuts', 'Fish', 'Soy', 'Eggs'].map((allergen) => (
                    <label key={allergen} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allergens.includes(allergen)}
                        onChange={() => handleAllergenChange(allergen)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{allergen}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
            >
              {loading ? t.generating : t.generateButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
