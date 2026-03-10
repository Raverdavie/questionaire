# Nutrition Questionnaire & Plan Generator

A modern, professional web application that generates personalized nutrition plans based on user health profile and goals.

## Features

- **Comprehensive Questionnaire**: Collects user data including age, weight, height, health goals, activity level, and dietary preferences
- **Personalized Nutrition Plans**: Generates custom nutrition recommendations based on user profile
- **Calorie & Macro Tracking**: Displays daily calorie targets and macronutrient distribution (protein, carbs, fats)
- **Sample Meal Plans**: Provides realistic daily meal suggestions with estimated calories and protein
- **Multiple Diet Types**: Supports omnivore, vegetarian, vegan, pescatarian, and keto diets
- **Allergy Management**: Accounts for common food allergies (dairy, gluten, nuts, fish, soy, eggs)
- **PDF Export**: Download nutrition plan as a professional PDF document
- **Clean UI**: Professional, modern design using Tailwind CSS

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF Export**: html2pdf.js
- **Deployment Ready**: Optimized for Vercel and other Node.js hosting

## Getting Started

### Prerequisites

- Node.js 18+ (includes npm)

### Installation

1. Navigate to the project directory:
```bash
cd questionaire
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## How It Works

1. **User Input**: Users complete a detailed questionnaire about their health profile
2. **Calculation**: Backend calculates BMI, daily calorie needs (using Mifflin-St Jeor equation), and macronutrient targets
3. **Plan Generation**: Generates a personalized nutrition plan with:
   - Daily calorie targets adjusted for their goal (weight loss/gain/maintenance)
   - Optimal macronutrient distribution
   - Sample daily meal plans with 5 meals/snacks
   - Personalized nutrition tips
   - Allergy accommodations

4. **Output**: Users can view the plan and export it as a PDF for offline reference

## Nutrition Calculations

### Calorie Calculation
- Uses the Mifflin-St Jeor equation for BMR (Basal Metabolic Rate)
- Applies activity multiplier to calculate TDEE (Total Daily Energy Expenditure)
- Adjusts for goal: Weight loss (15% deficit), Weight gain (10% surplus), Maintenance (no change)

### Macronutrient Distribution
Based on user goal:
- **Weight Loss**: 35% protein, 40% carbs, 25% fats
- **Muscle Gain**: 30% protein, 45% carbs, 25% fats
- **General Wellness**: 25% protein, 45% carbs, 30% fats
- **Athletic Performance**: 30% protein, 50% carbs, 20% fats

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── plan/
│   │       └── route.ts          # API endpoint for plan generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page with questionnaire/plan view
├── components/
│   ├── Questionnaire.tsx         # Questionnaire form component
│   └── NutritionPlan.tsx         # Plan display & PDF export
└── utils/
    └── nutritionCalculator.ts    # Core nutrition calculation logic
```

## Future Enhancements

- Database integration to save user plans
- Weekly meal plan variations
- Grocery shopping list generation
- Progress tracking and plan adjustments
- Integration with fitness apps
- Recipe suggestions with instructions
- Nutritionist review/feedback feature

## License

MIT

## Support

For issues or questions, please check the project repository or contact the development team.
