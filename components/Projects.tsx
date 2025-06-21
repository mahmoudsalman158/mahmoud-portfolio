import React, { useState } from 'react';
import { PROJECTS_DATA } from '../constants';
import { ProjectItem } from '../types';
import InteractiveDisplay from './InteractiveDisplay'; // Import the new component

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleSelectProject = (project: ProjectItem) => {
    if (selectedProject?.id === project.id) {
      // If the same project is clicked again, treat it as a toggle or simply re-select
      // For now, let's allow re-selection to re-trigger animations if any part depends on it
      setSelectedProject(null); // First, set to null to ensure transition from circle if it was closed
      setTimeout(() => setSelectedProject(project), 50); // Then set to the project
    } else {
      setSelectedProject(project);
    }
  };

  const handleCloseDisplay = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8 min-h-[700px] md:min-h-[800px]">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-blue mb-10 transition-all duration-300 hover-neon-glow-blue">
          Selected Projects
        </h2>

        {/* Project Selector Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {PROJECTS_DATA.map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelectProject(project)}
              className={`px-4 py-2 rounded-lg font-headings font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2
                          ${selectedProject?.id === project.id
                            ? 'bg-accent-blue text-base-dark shadow-lg ring-accent-blue ring-opacity-75 hover-neon-glow-blue'
                            : 'bg-base-light-dark text-accent-blue hover:bg-accent-blue/20 ring-transparent'
                          } border border-accent-blue/50`}
              aria-pressed={selectedProject?.id === project.id}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Interactive Display Area */}
        <div className="flex justify-center items-center mt-8">
          <InteractiveDisplay project={selectedProject} onClose={handleCloseDisplay} />
        </div>
      </div>
    </section>
  );
};

export default Projects;