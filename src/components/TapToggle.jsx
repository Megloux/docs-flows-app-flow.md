import React, { useState } from 'react';

const TapToggle = () => {
  const [mode, setMode] = useState('A');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTap = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(mode === 'A' ? 'R' : 'A');
      setIsAnimating(false);
    }, 150);
  };

  return (
    <button 
      onClick={handleTap}
      className={`w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center
        ${isAnimating ? 'scale-95' : 'scale-100'}
        transition-all duration-150`}
    >
      <span className={`text-sm ${mode === 'A' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {mode}
      </span>
    </button>
  );
};

export default TapToggle;
