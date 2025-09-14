import React, { useState } from 'react';
import { Check, Star, Trash2, Edit3, Calendar, Flag, Tag, Clock } from 'lucide-react';
import clsx from 'clsx';

const TodoItem = ({ todo, onToggleComplete, onToggleStar, onEdit, onDelete, index }) => {
  const [showActions, setShowActions] = useState(false);

  const priorityColors = {
    low: 'bg-success/20 text-success border-success/30',
    medium: 'bg-warning/20 text-warning border-warning/30',
    high: 'bg-error/20 text-error border-error/30',
  };

  const priorityLabels = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée'
  };

  const categoryTranslations = {
    'Work': 'Travail',
    'Personal': 'Personnel',
    'Shopping': 'Courses',
    'Health': 'Santé',
    'Finance': 'Finance',
    'Learning': 'Apprentissage',
    'Home': 'Maison',
    'Other': 'Autre',
    'Travail': 'Travail',
    'Personnel': 'Personnel',
    'Courses': 'Courses',
    'Santé': 'Santé',
    'Finance': 'Finance',
    'Apprentissage': 'Apprentissage',
    'Maison': 'Maison',
    'Autre': 'Autre'
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain';
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
      });
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={clsx(
        'glass-morphism rounded-2xl p-6 transition-all duration-300 animate-slide-up',
        'hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]',
        todo.completed && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={clsx(
            'mt-1 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center',
            todo.completed
              ? 'bg-gradient-to-r from-primary to-secondary border-primary'
              : 'border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20'
          )}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={clsx(
                'text-lg font-semibold transition-all duration-300',
                todo.completed && 'line-through text-textSecondary'
              )}>
                {todo.text}
              </h3>
              
              {todo.description && (
                <p className="mt-1 text-textSecondary text-sm">
                  {todo.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {todo.priority && (
                  <span className={clsx(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border',
                    priorityColors[todo.priority]
                  )}>
                    <Flag className="w-3 h-3" />
                    {priorityLabels[todo.priority]}
                  </span>
                )}

                {todo.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-background/50 border border-border/50 rounded-lg text-xs">
                    <Tag className="w-3 h-3" />
                    {categoryTranslations[todo.category] || todo.category}
                  </span>
                )}

                {todo.dueDate && (
                  <span className={clsx(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs',
                    isOverdue
                      ? 'bg-error/20 text-error border border-error/30'
                      : 'bg-background/50 border border-border/50'
                  )}>
                    <Calendar className="w-3 h-3" />
                    {formatDate(todo.dueDate)}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2 py-1 bg-background/50 border border-border/50 rounded-lg text-xs text-textSecondary">
                  <Clock className="w-3 h-3" />
                  {new Date(todo.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={clsx(
              'flex items-center gap-2 transition-all duration-300',
              showActions ? 'opacity-100' : 'opacity-0 lg:opacity-100'
            )}>
              <button
                onClick={() => onToggleStar(todo.id)}
                className={clsx(
                  'p-2 rounded-lg transition-all duration-300',
                  todo.starred
                    ? 'text-warning bg-warning/20 hover:bg-warning/30'
                    : 'text-textSecondary hover:text-warning hover:bg-warning/10'
                )}
              >
                <Star className={clsx('w-5 h-5', todo.starred && 'fill-current')} />
              </button>

              <button
                onClick={() => onEdit(todo)}
                className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-textSecondary hover:text-error hover:bg-error/10 rounded-lg transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
