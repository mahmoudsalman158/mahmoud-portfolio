import React, { useEffect, useRef } from 'react';
import { SOCIAL_LINKS, SITE_NAME } from '../constants';

// Declare tippy for global scope
declare var tippy: any;
// Removed particlesJS declaration as it's not used in this new design for About section

const About: React.FC = () => {
  const aboutSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof tippy !== 'undefined') {
      tippy('.skill-box[data-tippy-content]', {
        animation: 'scale',
        theme: 'translucent', // A dark theme
        placement: 'top',
        arrow: true,
      });
    }
    
    // Add 'animated-fade-in' class after component mounts to trigger animation
    // This assumes the class is defined in global CSS to handle the fade-in.
    // The section now has this class directly in JSX.
    // if (aboutSectionRef.current) {
    //   aboutSectionRef.current.classList.add('animated-fade-in');
    // }

  }, []);

  return (
    <section id="about" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8 animated-fade-in" ref={aboutSectionRef}> {/* Changed bg-base-light-dark/0 to bg-transparent */}
      <div className="container mx-auto text-center"> {/* Added text-center for overall alignment */}
        
        <h2 className="section-title text-3xl sm:text-4xl font-headings font-bold text-accent-green mb-8 transition-all duration-300 hover-neon-glow-green"> {/* Increased mb for spacing after moving title up */}
          Meet <span className="gradient-text">{SITE_NAME}</span>
        </h2>

        <div className="profile-burst">
          <img 
            src="/mahmoud-portfolio/images/profile-avatar.jpg" 
            alt={SITE_NAME} 
            className="profile-avatar" 
          />
          <div className="glow-pulse"></div>
        </div>

        {/* Updated section-lead to be more visually distinct */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-xl mt-8 mb-10">
          <span className="text-accent-blue whitespace-nowrap font-semibold flex items-center">
            <i className="fas fa-shield-alt mr-2"></i>Certified Cybersecurity Specialist
          </span>
          <span className="text-accent-red whitespace-nowrap font-semibold flex items-center">
            <i className="fas fa-mask mr-2"></i>Red Teamer
          </span>
          <span className="text-accent-green whitespace-nowrap font-semibold flex items-center">
            <i className="fas fa-laptop-code mr-2"></i>Full-Stack Wizard
          </span>
          <span className="text-accent-purple whitespace-nowrap font-semibold flex items-center">
            <i className="fas fa-paint-brush mr-2"></i>Visual Design Enthusiast
          </span>
        </div>

        <div className="about-content text-left md:text-center max-w-3xl mx-auto"> {/* max-w for readability, text-left for mobile, md:text-center for wider */}
          <p className="text-md text-gray-200 font-body mb-6 leading-relaxed">
            With <strong className="text-accent-green font-bold hover-neon-glow-green">2+ years of deep experience</strong> in <em className="text-accent-purple italic hover-neon-glow-purple">penetration testing, secure web development</em>, and <em className="text-accent-purple italic hover-neon-glow-purple">digital design</em>,
            I bring a unique fusion of offensive security mindset and clean UI/UX aesthetics to every project I touch.
          </p>
          <p className="text-md text-gray-200 font-body mb-6 leading-relaxed">
            From dissecting systems and automating security pipelines in <strong className="text-accent-green font-bold hover-neon-glow-green">Go, Python, and JavaScript</strong>, to designing sleek
            developer tools and web experiences—my mission is simple: <em className="text-accent-purple italic hover-neon-glow-purple">build secure, elegant, and high-performing systems that last</em>.
          </p>
          <p className="text-md text-gray-200 font-body mb-10 leading-relaxed">
            My journey is driven by curiosity, sharpened by real-world exploits, and elevated by an eye for creative storytelling through design.
          </p>
        </div>

        <div className="skills-pulse-grid">
          <div className="skill-box" data-tippy-content="eJPT v2 Certified: Hands-on practical penetration testing certification.">
            <i className="fas fa-terminal"></i>
            <span>eJPT v2 Certified</span>
          </div>
          <div className="skill-box" data-tippy-content="Red Teaming: Simulating real-world adversary tactics to test defenses.">
            <i className="fas fa-user-secret"></i>
            <span>Red Teaming</span>
          </div>
          <div className="skill-box" data-tippy-content="Core Languages: Proficient in Go, Python, and JavaScript for development and scripting.">
            <i className="fas fa-code"></i>
            <span>Go &middot; Python &middot; JavaScript</span>
          </div>
          <div className="skill-box" data-tippy-content="Security Tooling: Building and utilizing tools for security automation and analysis.">
            <i className="fas fa-draw-polygon"></i> {/* Changed from fa-cogs to represent 'tooling' or 'polygon modeling' to fit design */}
            <span>Security Tooling</span>
          </div>
          <div className="skill-box" data-tippy-content="Design Skills: Crafting intuitive user experiences and engaging visual designs.">
            <i className="fas fa-paint-brush"></i>
            <span>UX/UI &amp; Motion Design</span>
          </div>
           <div className="skill-box" data-tippy-content="Ethical Hacking: Discovering vulnerabilities through authorized offensive security techniques.">
            <i className="fas fa-shield-virus"></i>
            <span>Ethical Hacking</span>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center space-x-6"> {/* Adjusted margin and spacing */}
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-gray-400 hover:text-accent-blue text-3xl transition-all duration-300 transform hover:scale-125 hover-neon-glow-blue" // Increased text-size slightly
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;