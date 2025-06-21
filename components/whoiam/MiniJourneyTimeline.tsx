import React, { useEffect } from 'react';
import { CareerPathItem } from '../../types'; // Assuming CareerPathItem type is defined
import { Link } from 'react-router-dom'; // Assuming a contact page or relevant link

// Declare tippy for global scope
declare var tippy: any;

interface MiniJourneyTimelineProps {
  milestones: CareerPathItem[]; // Expecting a subset of career path data
  onCTAClick: () => void;
  ctaText: string;
}

const MiniJourneyTimeline: React.FC<MiniJourneyTimelineProps> = ({ milestones, onCTAClick, ctaText }) => {
  useEffect(() => {
    if (typeof tippy !== 'undefined') {
      tippy('.timeline-milestone-dot', {
        animation: 'scale',
        theme: 'translucent', // A dark theme
        placement: 'top',
        arrow: true,
        allowHTML: true, // Crucial for rendering HTML in tooltips
      });
    }
  }, [milestones]); // Re-run if milestones change to re-apply tippy

  if (!milestones || milestones.length === 0) {
    return <p className="text-center text-gray-500">No journey milestones to display.</p>;
  }
  
  const getIconColor = (category: CareerPathItem['category']): string => {
    switch (category) {
      case 'Education': return 'text-accent-blue';
      case 'Certification': return 'text-accent-green';
      case 'Achievement': return 'text-accent-purple';
      case 'Experience': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };


  return (
    <div className="py-12 bg-base-light-dark/30 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-headings font-semibold text-center text-white mb-12">
          A Glimpse into My Path
        </h2>
        
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2 rounded-full"></div>
          
          <div className="relative flex justify-between items-center">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.id} 
                className="flex flex-col items-center group timeline-milestone-dot"
                data-tippy-content={`<strong>${milestone.title}</strong><br/>${milestone.date}<br/><em>${milestone.category}</em>`}
              >
                {/* Dot on the line */}
                <div className={`w-5 h-5 rounded-full border-4 border-base-dark z-10 transition-all duration-300 group-hover:scale-125 ${getIconColor(milestone.category).replace('text-', 'bg-')}`}></div>
                
                {/* Icon above/below */}
                <div className={`mt-3 text-center transition-opacity duration-300 opacity-80 group-hover:opacity-100`}>
                  <i className={`${milestone.icon} text-2xl mb-1 ${getIconColor(milestone.category)}`}></i>
                  <p className={`text-xs font-semibold ${getIconColor(milestone.category)}`}>
                    {/* Display only year or key part of date for brevity */}
                    {milestone.date.match(/\b\d{4}\b|\bPresent\b|\bFuture\b|\bMay\b/) ? (milestone.date.match(/\b\d{4}\b|\bPresent\b|\bFuture\b|\bMay\b/) || [''])[0] : milestone.date.split(' ')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Hover over milestones for details. (Showing key highlights)</p>
        
        <div className="text-center mt-12">
           <button
            onClick={onCTAClick}
            className="inline-flex items-center text-accent-purple hover:text-white font-semibold group transition-all duration-300 hover-neon-glow-purple text-lg py-2 px-4 rounded-md hover:bg-accent-purple/10"
            role="button"
          >
            {ctaText}
            <i className="fas fa-shoe-prints ml-2 transform transition-transform duration-300 group-hover:rotate-[15deg]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniJourneyTimeline;