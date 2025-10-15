export interface Meal {
  id: string;
  name: string;
  description: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  image_url?: string;
  created_at: string;
}

export interface MealPlan {
  id: string;
  meal_id: string;
  planned_date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
  completed: boolean;
  created_at: string;
}

export interface NutritionGoals {
  id: string;
  daily_calories: number;
  daily_protein: number;
  daily_carbs: number;
  daily_fats: number;
  daily_fiber: number;
}

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}
