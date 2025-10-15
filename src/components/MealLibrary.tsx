import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { Meal } from '../types';
import { generateId } from '../utils/nutrition';

interface MealLibraryProps {
  meals: Meal[];
  onUpdateMeals: (meals: Meal[]) => void;
}

export default function MealLibrary({ meals, onUpdateMeals }: MealLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    meal_type: 'breakfast' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  });

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || meal.meal_type === filterType;
    return matchesSearch && matchesType;
  });

  const openAddModal = () => {
    setEditingMeal(null);
    setFormData({
      name: '',
      description: '',
      meal_type: 'breakfast',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (meal: Meal) => {
    setEditingMeal(meal);
    setFormData({
      name: meal.name,
      description: meal.description,
      meal_type: meal.meal_type,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      fiber: meal.fiber,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMeal) {
      onUpdateMeals(
        meals.map((meal) =>
          meal.id === editingMeal.id
            ? { ...meal, ...formData }
            : meal
        )
      );
    } else {
      const newMeal: Meal = {
        id: generateId(),
        ...formData,
        created_at: new Date().toISOString(),
      };
      onUpdateMeals([...meals, newMeal]);
    }
    setShowModal(false);
  };

  const deleteMeal = (mealId: string) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      onUpdateMeals(meals.filter((meal) => meal.id !== mealId));
    }
  };

  const mealTypes = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snacks' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {mealTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === type.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Meal
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{meal.name}</h3>
                  <span className="text-xs text-emerald-600 font-medium capitalize">
                    {meal.meal_type}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(meal)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{meal.description}</p>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div className="bg-white rounded p-2">
                  <p className="text-xs text-gray-500">Cal</p>
                  <p className="font-semibold text-sm text-gray-800">{meal.calories}</p>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="text-xs text-gray-500">Pro</p>
                  <p className="font-semibold text-sm text-gray-800">{meal.protein}g</p>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="text-xs text-gray-500">Carb</p>
                  <p className="font-semibold text-sm text-gray-800">{meal.carbs}g</p>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="text-xs text-gray-500">Fat</p>
                  <p className="font-semibold text-sm text-gray-800">{meal.fats}g</p>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="text-xs text-gray-500">Fib</p>
                  <p className="font-semibold text-sm text-gray-800">{meal.fiber}g</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No meals found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {editingMeal ? 'Edit Meal' : 'Add New Meal'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the meal details and nutrition information
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Grilled Chicken Salad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the meal..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Type
                </label>
                <select
                  value={formData.meal_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meal_type: e.target.value as 'breakfast' | 'lunch' | 'dinner' | 'snack',
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.protein}
                    onChange={(e) =>
                      setFormData({ ...formData, protein: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.carbs}
                    onChange={(e) =>
                      setFormData({ ...formData, carbs: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.fats}
                    onChange={(e) =>
                      setFormData({ ...formData, fats: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiber (g)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.fiber}
                    onChange={(e) =>
                      setFormData({ ...formData, fiber: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  {editingMeal ? 'Update Meal' : 'Add Meal'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
