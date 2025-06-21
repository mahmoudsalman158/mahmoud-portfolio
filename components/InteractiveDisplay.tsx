import React from 'react';
import { ProjectItem } from '../types';

interface InteractiveDisplayProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const InteractiveDisplay: React.FC<InteractiveDisplayProps> = ({ project, onClose }) => {
  const isProjectSelected = project !== null;

  return (
    <div
      className={`
        mx-auto transition-all duration-700 ease-in-out relative 
        border-2 
        ${isProjectSelected 
          ? 'w-full max-w-2xl lg:max-w-3xl h-auto min-h-[650px] sm:min-h-[700px] md:min-h-[830px] lg:min-h-[850px] rounded-xl bg-base-light-dark/90 shadow-2xl border-accent-blue backdrop-blur-sm' 
          : 'w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-base-dark/80 flex items-center justify-center text-center p-6 shadow-xl border-accent-purple backdrop-blur-sm'
        }
      `}
      style={{
        boxShadow: isProjectSelected 
          ? '0 0 15px rgba(0, 229, 255, 0.5), 0 0 30px rgba(0, 229, 255, 0.3)' 
          : '0 0 15px rgba(179, 136, 235, 0.5), 0 0 30px rgba(179, 136, 235, 0.3)'
      }}
    >
      {/* Placeholder Content */}
      <div
        className={`
          transition-opacity duration-300 absolute inset-0 flex flex-col items-center justify-center p-4
          ${isProjectSelected ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}
        `}
        aria-hidden={isProjectSelected}
      >
        <i className="fas fa-hand-pointer text-5xl text-accent-purple mb-4 transform transition-transform duration-500 hover:scale-110"></i>
        <h3 className="text-xl font-headings text-gray-200">Select a Project</h3>
        <p className="text-sm text-gray-400 mt-1">Click a project title above to view details here.</p>
      </div>

      {/* Project Details Content */}
      <div
        className={`
          transition-opacity duration-500 ${isProjectSelected ? 'opacity-100 delay-500' : 'opacity-0 pointer-events-none'}
          w-full h-full 
        `}
        aria-hidden={!isProjectSelected}
      >
        {project && (
          <div className="p-5 sm:p-6 flex flex-col h-full">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-300 hover:text-accent-red text-3xl sm:text-4xl z-20 bg-base-dark/50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center leading-none transition-colors duration-200"
              aria-label="Close project details"
              title="Close"
            >
              &times;
            </button>
            
            <div className="w-full h-64 sm:h-80 md:h-[350px] lg:h-[380px] mb-4 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    loading="lazy"
                />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-headings font-bold text-accent-blue mb-2 text-center sm:text-left">{project.title}</h3>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
              {project.techStack.map(tech => (
                <span 
                    key={tech} 
                    className="bg-gray-700 text-accent-green text-xs px-2.5 py-1 rounded-full shadow"
                >
                    {tech}
                </span>
              ))}
            </div>
            
            {/* Scrollable Text Content Area */}
            <div className="flex-grow custom-scrollbar overflow-y-auto max-h-[220px] sm:max-h-[250px] md:max-h-[280px] lg:max-h-[300px] p-1 pr-2 space-y-3">
              <div>
                <h4 className="text-md font-semibold text-accent-green mb-1">Description</h4>
                <p className="text-text-off-white font-body text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.importance && (
                <div>
                  <h4 className="text-md font-semibold text-accent-green mb-1">Importance</h4>
                  <p className="text-text-off-white font-body text-sm leading-relaxed">
                    {project.importance}
                  </p>
                </div>
              )}

              {project.benefits && (
                <div>
                  <h4 className="text-md font-semibold text-accent-green mb-1">Benefits</h4>
                  <p className="text-text-off-white font-body text-sm leading-relaxed">
                    {project.benefits}
                  </p>
                </div>
              )}

              {project.developmentDetails && (
                <div>
                  <h4 className="text-md font-semibold text-accent-green mb-1">Development Insights</h4>
                  <p className="text-text-off-white font-body text-sm leading-relaxed">
                    {project.developmentDetails}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center sm:justify-start space-x-5 mt-auto pt-4 border-t border-gray-700/60">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-2xl sm:text-3xl hover-neon-glow-blue"
                  aria-label={`${project.title} GitHub repository`}
                  title="View on GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
              {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-2xl sm:text-3xl hover-neon-glow-blue"
                  aria-label={`${project.title} live demo`}
                  title="View Live Demo"
                >
                  <i className="fas fa-external-link-alt"></i>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDisplay;