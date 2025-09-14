import React from 'react';
import { ListTodo, CheckCircle, Circle, Star } from 'lucide-react';
import clsx from 'clsx';

const FilterBar = ({ filter, setFilter, stats }) => {
  const filters = [
    { id: 'all', label: 'Toutes les tâches', icon: <ListTodo className="w-4 h-4" />, count: stats.total },
    { id: 'active', label: 'En cours', icon: <Circle className="w-4 h-4" />, count: stats.active },
    { id: 'completed', label: 'Terminées', icon: <CheckCircle className="w-4 h-4" />, count: stats.completed },
    { id: 'starred', label: 'Favoris', icon: <Star className="w-4 h-4" />, count: stats.starred },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={clsx(
            'px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105',
            filter === f.id
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
              : 'glass-morphism text-textSecondary hover:text-text hover:border-primary/30'
          )}
        >
          {f.icon}
          <span className="font-medium">{f.label}</span>
          <span className={clsx(
            'px-2 py-0.5 rounded-lg text-xs font-semibold',
            filter === f.id
              ? 'bg-white/20'
              : 'bg-background/50'
          )}>
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
