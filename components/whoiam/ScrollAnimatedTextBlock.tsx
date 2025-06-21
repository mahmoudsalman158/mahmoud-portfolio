import React, { useEffect, useRef } from 'react';

interface ScrollAnimatedTextBlockProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  direction: 'left' | 'right';
  onCTAClick: () => void;
  ctaText: string;
}

const ScrollAnimatedTextBlock: React.FC<ScrollAnimatedTextBlockProps> = ({ icon, title, children, direction, onCTAClick, ctaText }) => {
  // IntersectionObserver logic will be handled by the parent WhoIAmPage for simplicity of this example
  // The parent will add 'is-visible' to the section containing this component.
  // This component will use Tailwind classes for animations based on that.

  return (
    <div 
      className={`
        p-6 sm:p-8 rounded-xl shadow-xl border 
        transition-all duration-1000 ease-out transform
        ${direction === 'left' ? 'border-accent-green bg-base-dark/70' : 'border-accent-purple bg-base-light-dark/70'}
        hover:shadow-2xl
        ${direction === 'left' ? 'hover:shadow-glow-green' : 'hover:shadow-glow-purple'}
      `}
      // The parent <section> in WhoIAmPage will handle the scroll-reveal-section and is-visible classes
      // For direct animation on this div based on parent logic:
      // isVisible ? (direction === 'left' ? 'animate-fade-in-left' : 'animate-fade-in-right') : 'opacity-0'
      // But assuming parent handles the trigger and this component is already visible if rendered by parent
    >
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
        <div className={`mb-4 sm:mb-0 sm:mr-6 p-3 rounded-full bg-base-dark shadow-lg border ${direction === 'left' ? 'border-accent-green' : 'border-accent-purple'}`}>
          <i className={`${icon} text-3xl sm:text-4xl ${direction === 'left' ? 'text-accent-green' : 'text-accent-purple'}`}></i>
        </div>
        <div className="flex-grow">
          <h3 className={`text-2xl sm:text-3xl font-headings font-bold mb-3 ${direction === 'left' ? 'text-accent-green' : 'text-accent-purple'}`}>
            {title}
          </h3>
          <div className="text-gray-300 font-body leading-relaxed mb-6">
            {children}
          </div>
          <button
            onClick={onCTAClick}
            className={`inline-flex items-center font-semibold group transition-all duration-300 text-lg py-2 px-4 rounded-md
                        ${direction === 'left' 
                          ? 'text-accent-green hover:text-white hover:bg-accent-green/10 hover-neon-glow-green' 
                          : 'text-accent-purple hover:text-white hover:bg-accent-purple/10 hover-neon-glow-purple'}`}
            role="button"
          >
            {ctaText}
            <i className="fas fa-arrow-right ml-2 transform transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimatedTextBlock;
