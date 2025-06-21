import React from 'react';
import { FlowchartStep } from '../../types';

interface FlowchartProps {
  steps: FlowchartStep[];
}

const Flowchart: React.FC<FlowchartProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-6 mb-4 overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`p-3 sm:p-4 rounded-lg shadow-md border flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg min-w-[120px] sm:min-w-[150px]
                ${step.type === 'start' || step.type === 'end' ? 'bg-accent-purple/20 border-accent-purple' : 
                  step.type === 'milestone' ? 'bg-accent-green/20 border-accent-green' :
                  'bg-gray-700/50 border-gray-600 hover:border-accent-blue'}`}
            >
              {step.icon && <i className={`${step.icon} text-2xl sm:text-3xl mb-2 ${step.color || 'text-white'}`}></i>}
              <p className={`text-xs sm:text-sm font-semibold ${step.color || 'text-gray-200'}`}>
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-shrink-0">
                <i className="fas fa-arrow-right text-xl sm:text-2xl text-gray-500 transform scale-x-125 sm:scale-x-150"></i>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Flowchart;
