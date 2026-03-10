import { NextRequest, NextResponse } from 'next/server';
import { calculateNutritionPlan } from '@/utils/nutritionCalculator';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // Validate required fields
    if (
      !userData.age ||
      !userData.gender ||
      !userData.weight ||
      !userData.height ||
      !userData.goal ||
      !userData.dietaryPreference ||
      !userData.activityLevel ||
      !userData.currentDiet
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate nutrition plan
    const plan = calculateNutritionPlan(userData);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error generating nutrition plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate nutrition plan' },
      { status: 500 }
    );
  }
}
