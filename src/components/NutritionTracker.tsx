import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Activity } from 'lucide-react';
import { Meal, MealPlan, NutritionGoals } from '../types';
import { calculateDailyNutrition, formatDate } from '../utils/nutrition';

interface NutritionTrackerProps {
  meals: Meal[];
  mealPlans: MealPlan[];
  goals: NutritionGoals;
}

export default function NutritionTracker({ meals, mealPlans, goals }: NutritionTrackerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateString = formatDate(currentDate);
  const dailyNutrition = calculateDailyNutrition(mealPlans, meals, dateString);

  const changeDay = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'bg-emerald-500';
    if (percentage > 110) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const nutrients = [
    {
      name: 'Calories',
      current: Math.round(dailyNutrition.calories),
      target: goals.daily_calories,
      unit: 'kcal',
      icon: Activity,
    },
    {
      name: 'Protein',
      current: Math.round(dailyNutrition.protein),
      target: goals.daily_protein,
      unit: 'g',
      icon: TrendingUp,
    },
    {
      name: 'Carbs',
      current: Math.round(dailyNutrition.carbs),
      target: goals.daily_carbs,
      unit: 'g',
      icon: TrendingUp,
    },
    {
      name: 'Fats',
      current: Math.round(dailyNutrition.fats),
      target: goals.daily_fats,
      unit: 'g',
      icon: TrendingUp,
    },
    {
      name: 'Fiber',
      current: Math.round(dailyNutrition.fiber),
      target: goals.daily_fiber,
      unit: 'g',
      icon: TrendingUp,
    },
  ];

  const todayPlans = mealPlans.filter(
    (plan) => plan.planned_date === dateString && plan.completed
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeDay(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {currentDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              <p className="text-sm text-gray-500">Track your daily nutrition</p>
            </div>
            <button
              onClick={() => changeDay(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {nutrients.map((nutrient) => {
            const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
            const Icon = nutrient.icon;
            return (
              <div key={nutrient.name} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-700">{nutrient.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {nutrient.current}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {nutrient.target} {nutrient.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor(
                        nutrient.current,
                        nutrient.target
                      )}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{Math.round(percentage)}% of goal</p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Consumed Meals Today</h3>
          {todayPlans.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No meals consumed yet today</p>
              <p className="text-sm text-gray-400 mt-1">
                Mark meals as complete in the Meal Planner
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {todayPlans.map((plan) => {
                const meal = meals.find((m) => m.id === plan.meal_id);
                if (!meal) return null;
                return (
                  <div key={plan.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                        <span className="text-xs text-emerald-600 font-medium capitalize">
                          {meal.meal_type}
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                        {plan.servings}x serving
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Cal</p>
                        <p className="font-semibold text-sm text-gray-800">
                          {Math.round(meal.calories * plan.servings)}
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Pro</p>
                        <p className="font-semibold text-sm text-gray-800">
                          {Math.round(meal.protein * plan.servings)}g
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Carb</p>
                        <p className="font-semibold text-sm text-gray-800">
                          {Math.round(meal.carbs * plan.servings)}g
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Fat</p>
                        <p className="font-semibold text-sm text-gray-800">
                          {Math.round(meal.fats * plan.servings)}g
                        </p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-xs text-gray-500">Fib</p>
                        <p className="font-semibold text-sm text-gray-800">
                          {Math.round(meal.fiber * plan.servings)}g
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
