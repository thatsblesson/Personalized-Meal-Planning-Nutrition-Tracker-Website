import { Apple } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'planner', label: 'Meal Planner' },
    { id: 'tracker', label: 'Nutrition Tracker' },
    { id: 'library', label: 'Meal Library' },
    { id: 'goals', label: 'Goals' },
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Apple className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">NutriPlan</h1>
              <p className="text-emerald-100 text-sm">Your Personal Nutrition Companion</p>
            </div>
          </div>
        </div>
        <nav className="flex gap-1 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 font-medium transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
