import { useState } from 'react';
import { Target, Save } from 'lucide-react';
import { NutritionGoals } from '../types';

interface GoalsSettingsProps {
  goals: NutritionGoals;
  onUpdateGoals: (goals: NutritionGoals) => void;
}

export default function GoalsSettings({ goals, onUpdateGoals }: GoalsSettingsProps) {
  const [formData, setFormData] = useState(goals);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoals(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const goalCategories = [
    {
      title: 'General Goals',
      description: 'Common nutrition targets for different lifestyles',
      presets: [
        {
          name: 'Weight Loss',
          values: { daily_calories: 1500, daily_protein: 100, daily_carbs: 150, daily_fats: 50, daily_fiber: 30 },
        },
        {
          name: 'Maintenance',
          values: { daily_calories: 2000, daily_protein: 50, daily_carbs: 250, daily_fats: 70, daily_fiber: 25 },
        },
        {
          name: 'Muscle Gain',
          values: { daily_calories: 2500, daily_protein: 150, daily_carbs: 300, daily_fats: 80, daily_fiber: 30 },
        },
        {
          name: 'Athletic Performance',
          values: { daily_calories: 3000, daily_protein: 120, daily_carbs: 400, daily_fats: 90, daily_fiber: 35 },
        },
      ],
    },
  ];

  const applyPreset = (preset: typeof goalCategories[0]['presets'][0]) => {
    setFormData({
      ...formData,
      ...preset.values,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Nutrition Goals</h2>
            <p className="text-sm text-gray-500">Set your daily nutrition targets</p>
          </div>
        </div>

        <div className="space-y-6">
          {goalCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {category.presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="text-left p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 border-2 border-transparent transition-all"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">{preset.name}</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>{preset.values.daily_calories} cal</p>
                      <p>P: {preset.values.daily_protein}g • C: {preset.values.daily_carbs}g</p>
                      <p>F: {preset.values.daily_fats}g • Fiber: {preset.values.daily_fiber}g</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Custom Goals</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calories (kcal)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.daily_calories}
                onChange={(e) =>
                  setFormData({ ...formData, daily_calories: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Protein (g)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.daily_protein}
                onChange={(e) =>
                  setFormData({ ...formData, daily_protein: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Carbs (g)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.daily_carbs}
                onChange={(e) =>
                  setFormData({ ...formData, daily_carbs: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Fats (g)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.daily_fats}
                onChange={(e) =>
                  setFormData({ ...formData, daily_fats: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Fiber (g)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.daily_fiber}
                onChange={(e) =>
                  setFormData({ ...formData, daily_fiber: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              Save Goals
            </button>
            {saved && (
              <span className="text-emerald-600 font-medium">Goals saved successfully!</span>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl shadow-sm p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-3">Nutrition Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>Aim for 0.8-1g of protein per pound of body weight for muscle maintenance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>Include at least 25-30g of fiber daily for digestive health</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>Balance your macros: 40-50% carbs, 25-35% protein, 20-30% fats</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>Stay hydrated with at least 8 glasses of water per day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-1">•</span>
            <span>Adjust goals based on your activity level and fitness objectives</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
