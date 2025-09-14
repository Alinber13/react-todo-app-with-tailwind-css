import React from 'react';
import clsx from 'clsx';

const StatsCard = ({ icon, label, value, color, progress }) => {
  const colorClasses = {
    primary: 'from-primary to-primary/60',
    success: 'from-success to-success/60',
    secondary: 'from-secondary to-secondary/60',
    accent: 'from-accent to-accent/60',
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 animate-slide-up hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={clsx(
          'p-3 rounded-xl bg-gradient-to-br',
          colorClasses[color],
          'text-white'
        )}>
          {icon}
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-textSecondary text-sm">{label}</p>
      
      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <div 
              className={clsx(
                'h-full bg-gradient-to-r rounded-full transition-all duration-500',
                colorClasses[color]
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
