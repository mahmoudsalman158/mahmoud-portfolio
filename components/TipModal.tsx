
import React from 'react';

interface TipModalProps {
  tip: string;
  onClose: () => void;
}

const TipModal: React.FC<TipModalProps> = ({ tip, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] p-4 transition-opacity duration-300 ease-out animate-fade-in"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="tipModalTitle"
      aria-describedby="tipModalDescription"
    >
      <div 
        className="bg-black p-6 sm:p-8 rounded-xl text-white max-w-lg w-full transform transition-all duration-300 ease-out animate-fade-in-up border-2 border-accent-purple"
        style={{
          boxShadow: '0 0 8px #B388EB, 0 0 16px #B388EB, 0 0 24px #B388EB', // Neon glow effect
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="tipModalTitle" className="text-xl sm:text-2xl font-headings font-bold text-accent-purple">
            <i className="fas fa-envelope-open-text mr-2"></i>A Special Message For You!
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-accent-red text-2xl transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <p id="tipModalDescription" className="text-md sm:text-lg font-body text-text-off-white leading-relaxed mb-6 text-center py-4 border-y border-gray-700">
          {tip}
        </p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-accent-green text-base-dark font-headings font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover-neon-glow-green"
          >
            Got it! Thanks! <i className="fas fa-thumbs-up ml-1"></i>
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
          /* fadeInFromBottom animation is assumed to be globally available or defined in BirthdayOverlay/index.html */
          /* .animate-fade-in-up uses global styles */
        `}
      </style>
    </div>
  );
};

export default TipModal;
