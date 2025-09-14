import React from 'react';
import { Inbox, Search, Star, CheckCircle, Plus } from 'lucide-react';

const EmptyState = ({ filter, searchQuery }) => {
  const getEmptyMessage = () => {
    if (searchQuery) {
      return {
        icon: <Search className="w-16 h-16 text-primary/50" />,
        title: 'Aucun résultat trouvé',
        description: `Aucune tâche ne correspond à "${searchQuery}". Essayez un autre terme de recherche.`
      };
    }

    switch (filter) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-16 h-16 text-success/50" />,
          title: 'Aucune tâche terminée',
          description: 'Terminez quelques tâches pour les voir ici !'
        };
      case 'active':
        return {
          icon: <Inbox className="w-16 h-16 text-secondary/50" />,
          title: 'Toutes les tâches sont terminées !',
          description: 'Excellent travail ! Ajoutez de nouvelles tâches pour continuer.'
        };
      case 'starred':
        return {
          icon: <Star className="w-16 h-16 text-warning/50" />,
          title: 'Aucune tâche favorite',
          description: 'Marquez les tâches importantes comme favorites pour les voir ici.'
        };
      default:
        return {
          icon: <Inbox className="w-16 h-16 text-primary/50" />,
          title: 'Aucune tâche pour le moment',
          description: 'Créez votre première tâche pour commencer !'
        };
    }
  };

  const { icon, title, description } = getEmptyMessage();

  return (
    <div className="glass-morphism rounded-3xl p-16 text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-textSecondary mb-8 max-w-md mx-auto">{description}</p>
      
      {!searchQuery && filter === 'all' && (
        <button
          onClick={() => {
            const addButton = document.querySelector('button[class*="from-primary"]');
            if (addButton) addButton.click();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Créer la première tâche
        </button>
      )}
    </div>
  );
};

export default EmptyState;
