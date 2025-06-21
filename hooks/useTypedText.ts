import { useState, useEffect, useCallback } from 'react';

const useTypedText = (
  text: string,
  speed: number = 150,
  delay: number = 0,
  resetTrigger?: any // Add a prop that can trigger a reset
): string => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(delay === 0);

  const reset = useCallback(() => {
    setTypedText('');
    setCurrentIndex(0);
    if (delay > 0) {
      setStartTyping(false); // Reset startTyping only if there's a delay
      const delayTimeout = setTimeout(() => {
        setStartTyping(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      setStartTyping(true); // If no delay, start immediately
    }
  }, [delay]);

  useEffect(() => {
    reset();
  }, [resetTrigger, text, reset]); // Add text to dependencies if it can change dynamically

  useEffect(() => {
    if (!startTyping) {
      const delayTimeout = setTimeout(() => {
        setStartTyping(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startTyping, delay]);
  
  useEffect(() => {
    if (!startTyping || currentIndex >= text.length) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setTypedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [text, speed, currentIndex, startTyping]);

  return typedText;
};

export default useTypedText;