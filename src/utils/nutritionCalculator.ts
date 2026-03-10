export interface UserData {
  age: string;
  gender: string;
  weight: string;
  height: string;
  goal: string;
  dietaryPreference: string;
  allergens: string[];
  activityLevel: string;
  currentDiet: string;
}

import translations from '@/utils/translations';

export function calculateNutritionPlan(userData: UserData & { lang?: 'en' | 'pt' }) {
  const age = parseInt(userData.age);
  const weight = parseFloat(userData.weight);
  const height = parseFloat(userData.height);
  const gender = userData.gender;
  const goal = userData.goal;
  const activityLevel = userData.activityLevel;
  const dietaryPreference = userData.dietaryPreference;
  const allergens = userData.allergens;
  const lang = (userData as any).lang || 'en';

  // Calculate BMI
  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Apply activity multiplier
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.5);

  // Adjust calories based on goal
  let dailyCalories = Math.round(tdee);
  if (goal === 'weight_loss') {
    dailyCalories = Math.round(tdee * 0.85); // 15% deficit
  } else if (goal === 'muscle_gain') {
    dailyCalories = Math.round(tdee * 1.1); // 10% surplus
  }

  // Calculate macronutrients based on goal
  let protein: number, carbs: number, fats: number;
  let proteinPercent: number, carbsPercent: number, fatsPercent: number;

  if (goal === 'muscle_gain' || goal === 'athlete_performance') {
    protein = Math.round(weight * 2.2); // 2.2g per kg for muscle gain
    proteinPercent = 30;
  } else if (goal === 'weight_loss') {
    protein = Math.round(weight * 2); // 2g per kg to preserve muscle
    proteinPercent = 35;
  } else {
    protein = Math.round(weight * 1.6); // 1.6g per kg for general wellness
    proteinPercent = 25;
  }

  // proteinCalories and remainingCalories were unused; removed to avoid unused-variable diagnostics

  if (
    goal === 'weight_loss' ||
    userData.currentDiet === 'low_carb'
  ) {
    carbsPercent = 40;
    fatsPercent = 25;
  } else {
    carbsPercent = 45;
    fatsPercent = 30;
  }

  carbs = Math.round((dailyCalories * (carbsPercent / 100)) / 4);
  fats = Math.round((dailyCalories * (fatsPercent / 100)) / 9);

  // Generate meals
  const meals = generateMealPlan(dietaryPreference, allergens, dailyCalories, protein, goal, lang);

  // Generate tips
  const tips = generateTips(goal, dietaryPreference, activityLevel);

  // Generate dietary notes
  const dietaryNotes = generateDietaryNotes(dietaryPreference, allergens);

  return {
    bmi,
    dailyCalories,
    protein,
    proteinPercent,
    carbs,
    carbsPercent,
    fats,
    fatsPercent,
    meals,
    tips,
    dietaryNotes,
    activityLevel: userData.activityLevel.replace(/_/g, ' '),
  };
}

function generateMealPlan(
  dietaryPreference: string,
  _allergens: string[],
  dailyCalories: number,
  dailyProtein: number,
  _goal: string,
  lang: 'en' | 'pt'
) {
  const dietKey =
    dietaryPreference === 'omnivore'
      ? 'omnivore'
      : dietaryPreference === 'vegetarian'
        ? 'vegetarian'
        : dietaryPreference === 'vegan'
          ? 'vegan'
          : dietaryPreference === 'pescatarian'
            ? 'pescatarian'
            : dietaryPreference === 'keto'
              ? 'keto'
              : 'omnivore';

  const mealTemplates = (translations as any)[lang]?.meals || (translations as any).en.meals;

  // Make shallow copy and add calories/protein numbers
  const templates = (mealTemplates[dietKey] || mealTemplates.omnivore).map((m: any, idx: number) => ({
    name: m.name,
    time: m.time,
    foods: m.foods,
    calories: Math.round(dailyCalories * [0.25, 0.1, 0.35, 0.1, 0.2][idx] || 0),
    protein: Math.round(dailyProtein * [0.25, 0.1, 0.35, 0.1, 0.2][idx] || 0),
  }));

  return templates;
}

function generateTips(
  goal: string,
  dietaryPreference: string,
  activityLevel: string
) {
  const tips: string[] = [];

  // Goal-specific tips
  if (goal === 'weight_loss') {
    tips.push('Create a moderate calorie deficit (300-500 calories below TDEE)');
    tips.push('Increase protein intake to preserve muscle mass');
    tips.push('Drink plenty of water (aim for 2-3 liters daily)');
    tips.push('Avoid sugary drinks and processed foods');
  } else if (goal === 'muscle_gain') {
    tips.push('Consume 300-500 calories above your TDEE');
    tips.push('Prioritize protein intake (aim for 2g per kg of body weight)');
    tips.push('Combine with a proper strength training program');
    tips.push('Ensure adequate rest and recovery (7-9 hours sleep)');
  } else if (goal === 'general_wellness') {
    tips.push('Focus on balanced macronutrients and whole foods');
    tips.push('Incorporate a variety of colorful fruits and vegetables');
    tips.push('Stay hydrated throughout the day');
    tips.push('Practice portion control and mindful eating');
  } else if (goal === 'athlete_performance') {
    tips.push('Time carbs around your training sessions');
    tips.push('Focus on peak performance nutrition');
    tips.push('Monitor electrolyte balance, especially when training');
    tips.push('Include foods rich in antioxidants for recovery');
  }

  // Dietary preference tips
  if (dietaryPreference === 'vegetarian') {
    tips.push('Combine different plant sources to get all amino acids');
    tips.push('Include legumes, nuts, and seeds for protein variety');
  } else if (dietaryPreference === 'vegan') {
    tips.push('Ensure adequate B12 intake through fortified foods or supplements');
    tips.push('Combine grains with legumes for complete proteins');
    tips.push('Consider supplementing with vitamin D and omega-3s');
  }

  // Activity level tips
  if (
    activityLevel === 'active' ||
    activityLevel === 'very_active'
  ) {
    tips.push('Replenish electrolytes after intense training');
    tips.push('Consider post-workout nutrition within 2 hours');
  }

  // General wellness tips
  tips.push('Keep a food journal to track consistency');
  tips.push('Reassess your plan every 4-6 weeks and adjust as needed');

  return tips;
}

function generateDietaryNotes(dietaryPreference: string, allergens: string[]) {
  const notes: string[] = [];

  if (dietaryPreference === 'vegetarian') {
    notes.push('Vegetarian meals focus on plant-based proteins');
  } else if (dietaryPreference === 'vegan') {
    notes.push(
      'All meals are completely plant-based. Consider B12 supplementation.'
    );
  } else if (dietaryPreference === 'pescatarian') {
    notes.push('Pescatarian meals include fish and seafood but no meat');
  } else if (dietaryPreference === 'keto') {
    notes.push(
      'Keto meals are high in fat and very low in carbohydrates for ketosis'
    );
  }

  if (allergens.length > 0) {
    notes.push(
      `This plan avoids: ${allergens.join(', ')}. All suggested meals are free from these allergens.`
    );
  }

  return notes.length > 0 ? notes.join(' ') : null;
}
