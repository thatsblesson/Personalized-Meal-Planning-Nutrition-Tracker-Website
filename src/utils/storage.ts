import { Meal, MealPlan, NutritionGoals } from '../types';

const STORAGE_KEYS = {
  MEALS: 'nutrition_tracker_meals',
  MEAL_PLANS: 'nutrition_tracker_meal_plans',
  NUTRITION_GOALS: 'nutrition_tracker_nutrition_goals',
};

export const storage = {
  getMeals(): Meal[] {
    const data = localStorage.getItem(STORAGE_KEYS.MEALS);
    return data ? JSON.parse(data) : getDefaultMeals();
  },

  saveMeals(meals: Meal[]): void {
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  },

  getMealPlans(): MealPlan[] {
    const data = localStorage.getItem(STORAGE_KEYS.MEAL_PLANS);
    return data ? JSON.parse(data) : [];
  },

  saveMealPlans(plans: MealPlan[]): void {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(plans));
  },

  getNutritionGoals(): NutritionGoals {
    const data = localStorage.getItem(STORAGE_KEYS.NUTRITION_GOALS);
    return data ? JSON.parse(data) : getDefaultGoals();
  },

  saveNutritionGoals(goals: NutritionGoals): void {
    localStorage.setItem(STORAGE_KEYS.NUTRITION_GOALS, JSON.stringify(goals));
  },
};

function getDefaultGoals(): NutritionGoals {
  return {
    id: '1',
    daily_calories: 2000,
    daily_protein: 50,
    daily_carbs: 250,
    daily_fats: 70,
    daily_fiber: 25,
  };
}

function getDefaultMeals(): Meal[] {
  const now = new Date().toISOString();
  return [
    {
      id: '1',
      name: 'Avocado Toast',
      description: 'Whole grain toast with mashed avocado, cherry tomatoes, and a poached egg',
      meal_type: 'breakfast',
      calories: 350,
      protein: 12,
      carbs: 35,
      fats: 18,
      fiber: 8,
      created_at: now,
    },
    {
      id: '2',
      name: 'Greek Yogurt Bowl',
      description: 'Greek yogurt with mixed berries, granola, and honey',
      meal_type: 'breakfast',
      calories: 280,
      protein: 15,
      carbs: 42,
      fats: 6,
      fiber: 5,
      created_at: now,
    },
    {
      id: '3',
      name: 'Oatmeal with Berries',
      description: 'Steel-cut oats with blueberries, almonds, and cinnamon',
      meal_type: 'breakfast',
      calories: 320,
      protein: 10,
      carbs: 48,
      fats: 10,
      fiber: 8,
      created_at: now,
    },
    {
      id: '4',
      name: 'Grilled Chicken Salad',
      description: 'Mixed greens with grilled chicken, quinoa, vegetables, and balsamic dressing',
      meal_type: 'lunch',
      calories: 420,
      protein: 35,
      carbs: 32,
      fats: 16,
      fiber: 7,
      created_at: now,
    },
    {
      id: '5',
      name: 'Salmon Bowl',
      description: 'Grilled salmon with brown rice, edamame, and sesame dressing',
      meal_type: 'lunch',
      calories: 480,
      protein: 32,
      carbs: 45,
      fats: 18,
      fiber: 6,
      created_at: now,
    },
    {
      id: '6',
      name: 'Turkey Wrap',
      description: 'Whole wheat wrap with turkey, hummus, and vegetables',
      meal_type: 'lunch',
      calories: 380,
      protein: 28,
      carbs: 38,
      fats: 12,
      fiber: 6,
      created_at: now,
    },
    {
      id: '7',
      name: 'Steak with Vegetables',
      description: 'Grilled steak with roasted sweet potato and broccoli',
      meal_type: 'dinner',
      calories: 520,
      protein: 38,
      carbs: 42,
      fats: 20,
      fiber: 8,
      created_at: now,
    },
    {
      id: '8',
      name: 'Pasta Primavera',
      description: 'Whole wheat pasta with seasonal vegetables and olive oil',
      meal_type: 'dinner',
      calories: 450,
      protein: 15,
      carbs: 68,
      fats: 14,
      fiber: 9,
      created_at: now,
    },
    {
      id: '9',
      name: 'Baked Chicken Breast',
      description: 'Herb-crusted chicken with quinoa and green beans',
      meal_type: 'dinner',
      calories: 460,
      protein: 42,
      carbs: 38,
      fats: 14,
      fiber: 7,
      created_at: now,
    },
    {
      id: '10',
      name: 'Mixed Nuts',
      description: 'Almonds, walnuts, and cashews',
      meal_type: 'snack',
      calories: 180,
      protein: 6,
      carbs: 8,
      fats: 15,
      fiber: 3,
      created_at: now,
    },
    {
      id: '11',
      name: 'Apple with Peanut Butter',
      description: 'Sliced apple with natural peanut butter',
      meal_type: 'snack',
      calories: 200,
      protein: 7,
      carbs: 24,
      fats: 10,
      fiber: 5,
      created_at: now,
    },
    {
      id: '12',
      name: 'Protein Smoothie',
      description: 'Banana, protein powder, almond milk, and spinach',
      meal_type: 'snack',
      calories: 220,
      protein: 20,
      carbs: 28,
      fats: 4,
      fiber: 4,
      created_at: now,
    },
  ];
}
