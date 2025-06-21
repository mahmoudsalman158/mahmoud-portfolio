import React, { useState, useEffect, useCallback } from 'react';

interface AdviceTickerProps {
  adviceList: string[];
  displayDuration?: number; // ms to display each item
  fadeDuration?: number;    // ms for fade in/out animation
}

const AdviceTicker: React.FC<AdviceTickerProps> = ({ 
  adviceList, 
  displayDuration = 4000, // Default 4 seconds display time
  fadeDuration = 500      // Default 0.5 seconds fade time
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextAdvice = useCallback(() => {
    setIsVisible(false); // Start fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adviceList.length);
      setIsVisible(true); // Start fade-in
    }, fadeDuration);
  }, [adviceList.length, fadeDuration]);

  useEffect(() => {
    if (!adviceList || adviceList.length === 0) return;

    const intervalId = setInterval(nextAdvice, displayDuration + fadeDuration * 2); // Total cycle time

    return () => clearInterval(intervalId);
  }, [adviceList, displayDuration, fadeDuration, nextAdvice]);

  if (!adviceList || adviceList.length === 0) {
    return null;
  }

  return (
    <div 
        className="bg-base-dark/70 backdrop-blur-sm border border-accent-blue rounded-lg shadow-lg overflow-hidden p-3 mt-2 h-16 flex items-center justify-center" // Fixed height
        style={{
            boxShadow: '0 0 10px rgba(0, 229, 255, 0.3), inset 0 0 5px rgba(0, 229, 255, 0.2)'
        }}
        aria-live="polite"
        aria-atomic="true"
    >
      <div
        className={`advice-item-animated text-md text-accent-green px-4 py-2 font-mono transition-opacity duration-${fadeDuration} ease-in-out`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <i className="fas fa-bolt mr-2 text-yellow-400"></i>
        {adviceList[currentIndex]}
      </div>
    </div>
  );
};

export default AdviceTicker;
