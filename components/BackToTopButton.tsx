
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-accent-blue hover:bg-accent-green text-base-dark p-3 rounded-full shadow-lg hover:shadow-glow-blue transition-all duration-300 z-50 focus:outline-none"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-xl"></i>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
