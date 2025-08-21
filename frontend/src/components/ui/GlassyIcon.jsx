import React from 'react';

const GlassyIcon = ({ 
  icon: IconComponent, 
  size = 24, 
  color = 'currentColor',
  className = '',
  onClick 
}) => {
  return (
    <div 
      className={`
        relative p-3 rounded-2xl 
        bg-white/10 dark:bg-black/20 
        backdrop-blur-md border border-white/20
        transition-all duration-300 
        hover:scale-110 hover:bg-white/20
        group cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {/* Glassy background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
      
      {/* Icon with glow effect */}
      <IconComponent 
        size={size} 
        color={color}
        className="relative z-10 transition-all duration-300 group-hover:drop-shadow-lg"
      />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default GlassyIcon;
