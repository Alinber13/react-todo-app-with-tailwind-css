import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Flag, Tag } from 'lucide-react';
import clsx from 'clsx';

const TodoForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Travail', 'Personnel', 'Courses', 'Santé', 'Finance', 'Apprentissage', 'Maison', 'Autre'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.text.trim()) {
      newErrors.text = 'Le titre de la tâche est requis';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée'
    };
    return labels[priority] || priority;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface glass-morphism rounded-3xl p-8 max-w-lg w-full animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">
            {initialData ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-textSecondary hover:text-text hover:bg-background/50 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Titre de la tâche *
            </label>
            <input
              type="text"
              value={formData.text}
              onChange={(e) => handleChange('text', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 bg-background/50 border rounded-xl focus:outline-none focus:ring-2 transition-all',
                errors.text
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-border/50 focus:border-primary focus:ring-primary/20'
              )}
              placeholder="Entrez le titre de la tâche..."
              autoFocus
            />
            {errors.text && (
              <p className="mt-1 text-sm text-error">{errors.text}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Ajoutez plus de détails..."
              rows="3"
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Priorité
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date d'échéance
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-background/50 text-textSecondary border border-border/50 rounded-xl hover:bg-background/70 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {initialData ? 'Mettre à jour' : 'Créer la tâche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
