import { Meal, MealPlan, DailyNutrition } from '../types';

export function calculateDailyNutrition(
  mealPlans: MealPlan[],
  meals: Meal[],
  date: string
): DailyNutrition {
  const dailyPlans = mealPlans.filter(
    (plan) => plan.planned_date === date && plan.completed
  );

  const nutrition: DailyNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  };

  dailyPlans.forEach((plan) => {
    const meal = meals.find((m) => m.id === plan.meal_id);
    if (meal) {
      const multiplier = plan.servings;
      nutrition.calories += meal.calories * multiplier;
      nutrition.protein += meal.protein * multiplier;
      nutrition.carbs += meal.carbs * multiplier;
      nutrition.fats += meal.fats * multiplier;
      nutrition.fiber += meal.fiber * multiplier;
    }
  });

  return nutrition;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDateString(daysOffset: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return formatDate(date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
