import { useState, useEffect } from 'react';
import Header from './components/Header';
import MealPlanner from './components/MealPlanner';
import NutritionTracker from './components/NutritionTracker';
import MealLibrary from './components/MealLibrary';
import GoalsSettings from './components/GoalsSettings';
import { storage } from './utils/storage';
import { Meal, MealPlan, NutritionGoals } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [goals, setGoals] = useState<NutritionGoals | null>(null);

  useEffect(() => {
    setMeals(storage.getMeals());
    setMealPlans(storage.getMealPlans());
    setGoals(storage.getNutritionGoals());
  }, []);

  const handleUpdateMeals = (newMeals: Meal[]) => {
    setMeals(newMeals);
    storage.saveMeals(newMeals);
  };

  const handleUpdateMealPlans = (newPlans: MealPlan[]) => {
    setMealPlans(newPlans);
    storage.saveMealPlans(newPlans);
  };

  const handleUpdateGoals = (newGoals: NutritionGoals) => {
    setGoals(newGoals);
    storage.saveNutritionGoals(newGoals);
  };

  if (!goals) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'planner' && (
          <MealPlanner
            meals={meals}
            mealPlans={mealPlans}
            onUpdateMealPlans={handleUpdateMealPlans}
          />
        )}
        {activeTab === 'tracker' && (
          <NutritionTracker meals={meals} mealPlans={mealPlans} goals={goals} />
        )}
        {activeTab === 'library' && (
          <MealLibrary meals={meals} onUpdateMeals={handleUpdateMeals} />
        )}
        {activeTab === 'goals' && (
          <GoalsSettings goals={goals} onUpdateGoals={handleUpdateGoals} />
        )}
      </main>
    </div>
  );
}

export default App;
