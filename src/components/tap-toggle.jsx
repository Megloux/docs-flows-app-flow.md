import React, { useState } from 'react';

// TapToggle Component
// This component creates a circular button that toggles between Assisted (A) and Resisted (R)
// It automatically uses the Julius Sans One font we set up in styles.css
const TapToggle = () => {
  // State management for the toggle and animation
  const [mode, setMode] = useState('A'); // 'A' for Assisted, 'R' for Resisted
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle the tap/click interaction
  const handleTap = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(mode === 'A' ? 'R' : 'A');
      setIsAnimating(false);
    }, 150); // Brief animation duration for smooth transition
  };

  // The component inherits the Julius Sans One font automatically from styles.css
  // We only need to handle the component-specific styling here
  return (
    <button 
      onClick={handleTap}
      className={`
        w-8 h-8 
        rounded-full 
        border border-gray-800 
        flex items-center justify-center
        ${isAnimating ? 'scale-95' : 'scale-100'}
        transition-all duration-150
      `}
    >
      <span className={`
        text-sm 
        uppercase
        ${mode === 'A' ? 'text-emerald-400' : 'text-rose-400'}
      `}>
        {mode}
      </span>
    </button>
  );
};

export default TapToggle;
