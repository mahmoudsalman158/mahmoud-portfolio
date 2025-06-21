import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Assuming a contact page or relevant link

// Declare tippy for global scope
declare var tippy: any;

interface RadialProgressProps {
  label: string;
  percentage: number;
  color: string; // Tailwind color class e.g., "text-accent-blue"
  trailColor?: string; // Tailwind color class for trail e.g., "text-gray-700"
  tooltipText: string;
}

const RadialProgress: React.FC<RadialProgressProps> = ({ label, percentage, color, trailColor = "text-gray-700", tooltipText }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const barRef = useRef<SVGSVGElement>(null);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (currentPercentage / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentPercentage === 0) { // Animate only once when visible
          let start: number | null = null;
          const duration = 1500; // Animation duration
          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const val = Math.min(Math.floor((progress / duration) * percentage), percentage);
            setCurrentPercentage(val);
            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    const currentBarRef = barRef.current;
    if (currentBarRef) {
      observer.observe(currentBarRef);
    }
    return () => {
      if (currentBarRef) {
        observer.unobserve(currentBarRef);
      }
    };
  }, [percentage, currentPercentage]); // Depend on percentage and currentPercentage to restart if props change drastically (not used here)

   useEffect(() => {
    if (barRef.current && typeof tippy !== 'undefined') {
      tippy(barRef.current, {
        content: tooltipText,
        placement: 'top',
        animation: 'scale',
        theme: 'translucent', // A dark theme that fits well
      });
    }
  }, [tooltipText]);


  return (
    <div className="flex flex-col items-center p-4 bg-base-dark rounded-lg shadow-lg border border-gray-700 hover:border-opacity-50 transition-all duration-300 transform hover:-translate-y-1" 
         style={{borderColor: `var(--tw-color-${color.split('-')[1]}-${color.split('-')[2] || '500'})`}}
         data-tippy-content={tooltipText}
    >
      <svg ref={barRef} className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          className={`stroke-current ${trailColor}`}
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`stroke-current ${color} transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      <span className={`mt-[-70px] mb-[42px] text-2xl font-bold font-headings ${color}`}>{currentPercentage}%</span>
      <p className={`text-sm font-semibold ${color}`}>{label}</p>
    </div>
  );
};


interface RadialProgressBarsContainerProps {
  onCTAClick: () => void;
  ctaText: string;
}

const RadialProgressBars: React.FC<RadialProgressBarsContainerProps> = ({ onCTAClick, ctaText }) => {
  const motivationData = [
    { id: 'curiosity', label: 'Curiosity', percentage: 92, color: 'text-accent-blue', tooltipText: "Driven by a need to understand how things work and why. Explores 5+ new security CVEs and tech articles weekly." },
    { id: 'drive', label: 'Drive', percentage: 88, color: 'text-accent-green', tooltipText: "Relentless pursuit of solutions and excellence. Consistently dedicates extra hours to perfect complex projects." },
    { id: 'creativity', label: 'Creativity', percentage: 85, color: 'text-accent-purple', tooltipText: "Finds novel approaches to complex problems. Designed 3 unique tools for security automation last quarter." },
  ];

  return (
    <div className="py-12 bg-base-light-dark/30 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-headings font-semibold text-center text-white mb-10">
          My Core Motivators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {motivationData.map(item => (
            <RadialProgress 
              key={item.id}
              label={item.label}
              percentage={item.percentage}
              color={item.color}
              tooltipText={item.tooltipText}
            />
          ))}
        </div>
         <div className="text-center mt-12">
          <button
            onClick={onCTAClick}
            className="inline-flex items-center text-accent-blue hover:text-white font-semibold group transition-all duration-300 hover-neon-glow-blue text-lg py-2 px-4 rounded-md hover:bg-accent-blue/10"
            role="button"
          >
            {ctaText}
            <i className="fas fa-rocket ml-2 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[15deg]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressBars;
