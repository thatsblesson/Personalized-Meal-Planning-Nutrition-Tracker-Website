import { useState } from 'react';
import { Plus, Calendar, ChevronLeft, ChevronRight, Check, Trash2 } from 'lucide-react';
import { Meal, MealPlan } from '../types';
import { formatDate, generateId } from '../utils/nutrition';

interface MealPlannerProps {
  meals: Meal[];
  mealPlans: MealPlan[];
  onUpdateMealPlans: (plans: MealPlan[]) => void;
}

export default function MealPlanner({ meals, mealPlans, onUpdateMealPlans }: MealPlannerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');

  const dateString = formatDate(currentDate);
  const todayPlans = mealPlans.filter((plan) => plan.planned_date === dateString);

  const changeDay = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const addMealToPlan = (meal: Meal) => {
    const newPlan: MealPlan = {
      id: generateId(),
      meal_id: meal.id,
      planned_date: dateString,
      meal_type: selectedMealType,
      servings: 1,
      completed: false,
      created_at: new Date().toISOString(),
    };
    onUpdateMealPlans([...mealPlans, newPlan]);
    setShowAddModal(false);
  };

  const toggleCompleted = (planId: string) => {
    onUpdateMealPlans(
      mealPlans.map((plan) =>
        plan.id === planId ? { ...plan, completed: !plan.completed } : plan
      )
    );
  };

  const removePlan = (planId: string) => {
    onUpdateMealPlans(mealPlans.filter((plan) => plan.id !== planId));
  };

  const getMealInfo = (mealId: string) => meals.find((m) => m.id === mealId);

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

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
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h2>
                <p className="text-sm text-gray-500">Plan your meals for the day</p>
              </div>
            </div>
            <button
              onClick={() => changeDay(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedMealType('breakfast');
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Meal
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealTypes.map((type) => {
            const typePlans = todayPlans.filter((plan) => plan.meal_type === type);
            return (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 capitalize mb-3 flex items-center justify-between">
                  {type}
                  <button
                    onClick={() => {
                      setSelectedMealType(type);
                      setShowAddModal(true);
                    }}
                    className="text-emerald-600 hover:text-emerald-700 p-1 hover:bg-white rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </h3>
                <div className="space-y-2">
                  {typePlans.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No meals planned</p>
                  ) : (
                    typePlans.map((plan) => {
                      const meal = getMealInfo(plan.meal_id);
                      if (!meal) return null;
                      return (
                        <div
                          key={plan.id}
                          className={`bg-white rounded-lg p-3 border-2 transition-all ${
                            plan.completed
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm ${plan.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {meal.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {meal.calories} cal • {meal.protein}g protein
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => toggleCompleted(plan.id)}
                                className={`p-1 rounded transition-colors ${
                                  plan.completed
                                    ? 'text-emerald-600 bg-emerald-100'
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removePlan(plan.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Add Meal to {selectedMealType}</h3>
              <p className="text-sm text-gray-500 mt-1">Select a meal from your library</p>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="grid gap-3">
                {meals
                  .filter((meal) => meal.meal_type === selectedMealType)
                  .map((meal) => (
                    <button
                      key={meal.id}
                      onClick={() => addMealToPlan(meal)}
                      className="text-left p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 border-2 border-transparent transition-all"
                    >
                      <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>{meal.calories} cal</span>
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fats}g</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
