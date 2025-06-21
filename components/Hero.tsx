import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, SOCIAL_LINKS, USER_ADVICE } from '../constants'; 
import useTypedText from '../hooks/useTypedText';
import AdviceTicker from './AdviceTicker'; 

interface HeroProps {
  isTrueBirthday: boolean;
  onShowSpecialMessage: () => void;
  isBirthdayModeActive: boolean;
}

const ROLES_LIST: string[] = [
  "Cybersecurity Architect",
  "Penetration Tester",
  "Software Engineer",
  "Security Researcher",
  "DevSecOps Specialist",
  "Threat Hunter",
  "Cloud Security Engineer",
  "Ethical Hacker",
  "AI Security Developer",
  "Blockchain Security Expert",
];

const NEON_TEXT_CLASSES: string[] = [
  'neon-text-cyan',
  'neon-text-lime',
  'neon-text-magenta',
  'neon-text-orange',
  'neon-text-yellow',
  'neon-text-red',
  'neon-text-purple', 
];

const Hero: React.FC<HeroProps> = ({ isTrueBirthday, onShowSpecialMessage, isBirthdayModeActive }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const roleIntervalId = setInterval(() => {
      setCurrentRoleIndex(prevIndex => (prevIndex + 1) % ROLES_LIST.length);
    }, 30000); 

    return () => {
      clearInterval(roleIntervalId);
    };
  }, []);

  const currentRoleText = ROLES_LIST[currentRoleIndex];
  const typedRoleForDisplay = useTypedText(currentRoleText, 100, 0, currentRoleText);
  const currentNeonClass = NEON_TEXT_CLASSES[currentRoleIndex % NEON_TEXT_CLASSES.length];


  const techStack = [
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'Go', icon: 'fab fa-golang' },
    { name: 'JavaScript', icon: 'fab fa-js-square' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'AWS', icon: 'fab fa-aws' },
  ];

  const decorativeOrbits = [
    { icon: "fas fa-code", style: {'--orbit-radius': '190px', '--orbit-duration': '20s', '--orbit-delay': '0s', '--orbit-size': '38px', '--initial-angle': '0deg'} as React.CSSProperties, key: 'dec-code' },
    { icon: "fas fa-shield-alt", style: {'--orbit-radius': '190px', '--orbit-duration': '20s', '--orbit-delay': '-7s', '--orbit-size': '38px', '--initial-angle': '120deg'} as React.CSSProperties, key: 'dec-shield' },
    { icon: "fas fa-atom", style: {'--orbit-radius': '190px', '--orbit-duration': '20s', '--orbit-delay': '-14s', '--orbit-size': '38px', '--initial-angle': '240deg'} as React.CSSProperties, key: 'dec-atom' },
  ];

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent"
    >
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column: Text Content */}
          <div className="hero-content-left md:w-3/5 lg:w-3/5 text-center md:text-left md:pr-12">
            <p className="text-sm text-accent-green mb-2 animate-fade-in-down">
              Available for Freelance Work
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-headings font-bold text-accent-blue mb-2 animate-fade-in-down"
            >
              Hi, I’m <span className="gradient-text">{SITE_NAME}</span>
            </h1>
            <p 
              className={`text-3xl sm:text-4xl md:text-5xl text-text-off-white mb-4 font-headings animate-fade-in-down animation-delay-300 min-h-[1.8em] sm:min-h-[2em] ${currentNeonClass}`}
            >
                {typedRoleForDisplay}
                {typedRoleForDisplay.length < currentRoleText.length && <span className={`typed-cursor-blink relative top-[-0.05em] text-3xl sm:text-4xl md:text-5xl ${currentNeonClass.replace('neon-text-', 'neon-cursor-')} `}></span>}
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 font-body animate-fade-in-up animation-delay-300">
              I uncover critical vulnerabilities and fortify digital defenses through expert penetration testing and advanced security assessments. My focus is on proactive threat hunting and building resilient systems against sophisticated cyber attacks.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 animate-fade-in-up animation-delay-600 mb-10">
              {isBirthdayModeActive ? (
                <button
                  onClick={onShowSpecialMessage}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-headings font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 animate-pulse text-sm sm:text-base"
                >
                  <i className="fas fa-envelope-open-text mr-2"></i>
                  See My Message For You 💌
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('projects')}
                  className="button-neon-blue font-headings font-semibold py-3 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  View My Work
                </button>
              )}
              <button
                onClick={() => scrollToSection('contact')}
                className="button-neon-green font-headings font-semibold py-3 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Contact Me
              </button>
            </div>

            {/* New Quran Button Section */}
            <div className="my-10 flex justify-center md:justify-start animate-fade-in-up animation-delay-600">
              <div className="relative"> {/* Relative parent for orbit */}
                <Link
                  to="/quran-player"
                  className="button-neon-purple inline-block font-headings font-semibold py-3 px-8 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base relative z-10"
                >
                  Listen to Quran <i className="fas fa-headphones-alt ml-2"></i>
                </Link>
                {/* Orbiting Quran Icon */}
                <div
                  className="orbiting-element"
                  style={{
                    '--orbit-radius': '75px', 
                    '--orbit-duration': '18s',
                    '--orbit-delay': '0s',
                    '--orbit-size': '35px',
                    '--initial-angle': '45deg',
                    backgroundColor: 'rgba(179, 136, 235, 0.15)', 
                    borderColor: 'rgba(179, 136, 235, 0.6)',   
                    color: '#B388EB',                         
                    boxShadow: '0 0 8px rgba(179, 136, 235, 0.6), inset 0 0 5px rgba(179, 136, 235, 0.3)',
                  } as React.CSSProperties}
                >
                  <i className="fas fa-quran text-md"></i>
                </div>
              </div>
            </div>
            
            {/* Tech I work with section */}
            <div className="animate-fade-in-up animation-delay-600 mb-10"> {/* Increased bottom margin */}
              <p className="text-sm text-gray-400 mb-3 text-center md:text-left">Tech I work with.</p>
              <div className="tech-stack-icons flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                {techStack.map(tech => (
                  <span key={tech.name} className="tech-badge" title={tech.name}>
                    <i className={tech.icon}></i> {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Mantras Ticker Section */}
            <div className="mt-8 mb-4 animate-fade-in-up animation-delay-600">
              <h3 className="text-lg font-headings text-accent-purple mb-3 text-center md:text-left">My Personal Mantras:</h3>
              <AdviceTicker adviceList={USER_ADVICE} /> {/* Now uses USER_ADVICE and new animation style */}
            </div>

          </div>

          {/* Right Column: Image and Orbits */}
          <div className="hero-image-right md:w-2/5 lg:w-2/5 mt-16 md:mt-0 flex flex-col justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px]"> 
              <img 
                src="/mahmoud-portfolio/images/profile-hero.jpg" 
                alt={SITE_NAME} 
                className="rounded-full w-full h-full object-cover border-4 border-accent-blue shadow-2xl" 
              />
              
              {decorativeOrbits.map(orbit => (
                <div key={orbit.key} className="orbiting-element" style={orbit.style}>
                  <i className={`${orbit.icon} text-xl`}></i>
                </div>
              ))}
            </div>
            
            <div className="hero-social-links-container mt-8"> 
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="career-social-icon hover-neon-glow-blue" 
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <i className={`${link.icon}`}></i> 
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;