import React, { useEffect } from 'react';
import { FlowchartStep } from '../../types'; // Import FlowchartStep type
import Flowchart from './Flowchart'; // Import the Flowchart component

interface ExplanatoryModalProps {
  title: string;
  content: string;
  onClose: () => void;
  flowchartData?: FlowchartStep[]; // Optional flowchart data
}

const ExplanatoryModal: React.FC<ExplanatoryModalProps> = ({ title, content, onClose, flowchartData }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4 transition-opacity duration-300 ease-out animate-fade-in"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="explanatoryModalTitle"
      aria-describedby="explanatoryModalDescription"
    >
      <div
        className="bg-base-dark p-6 sm:p-8 rounded-xl text-white max-w-2xl w-full transform transition-all duration-300 ease-out animate-fade-in-up border-2 border-accent-green shadow-2xl flex flex-col max-h-[90vh]"
        style={{
          boxShadow: '0 0 10px #00FFAA, 0 0 20px #00FFAA, 0 0 30px #00FFAA', 
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center mb-5 flex-shrink-0">
          <h3 id="explanatoryModalTitle" className="text-xl sm:text-2xl font-headings font-bold text-accent-green">
            <i className="fas fa-info-circle mr-2"></i>{title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-accent-red text-3xl transition-colors leading-none p-1"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
            <div 
                id="explanatoryModalDescription" 
                className="text-sm sm:text-base text-gray-200 font-body leading-relaxed mb-6 prose prose-sm sm:prose-base prose-invert max-w-none"
                // Using prose classes for better default styling of p, ul, strong, em
                dangerouslySetInnerHTML={{ __html: content }} // HTML content is expected to be safe
            >
            </div>
            {flowchartData && flowchartData.length > 0 && (
              <Flowchart steps={flowchartData} />
            )}
        </div>

        <div className="text-right mt-auto pt-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="button-neon-green font-headings font-semibold py-2 px-6 text-sm sm:text-base transform hover:scale-105"
          >
            Close <i className="fas fa-times-circle ml-1"></i>
          </button>
        </div>
      </div>
      {/* Keyframes assumed to be in global styles or defined if this component is widely reused */}
    </div>
  );
};

export default ExplanatoryModal;
