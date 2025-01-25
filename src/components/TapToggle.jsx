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

 const fontStyle = {
   fontFamily: 'Julius Sans One, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif'
 };

 return (
   <button 
     onClick={handleTap}
     style={fontStyle}
     className={`tap-toggle w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center
       ${isAnimating ? 'scale-95' : 'scale-100'}
       transition-all duration-150`}
   >
     <span 
       style={fontStyle}
       className={`text-sm ${mode === 'A' ? 'text-emerald-400' : 'text-rose-400'}`}
     >
       {mode}
     </span>
   </button>
 );
};

export default TapToggle;
