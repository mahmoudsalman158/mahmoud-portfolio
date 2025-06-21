
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from '../constants';

interface FooterProps {
  onToggleBirthdayMode: () => void;
  isBirthdayModeActive: boolean;
  isTrueBirthday: boolean; 
}

const Footer: React.FC<FooterProps> = ({ 
  onToggleBirthdayMode, 
  isBirthdayModeActive,
  isTrueBirthday
}) => {
    const scrollToSection = (id: string) => {
    const element = document.getElementById(id.substring(1)); // Remove # from id
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-transparent border-t border-gray-700/50 text-gray-400 py-12 px-4 sm:px-6 lg:px-8"> {/* Changed bg-base-dark to bg-transparent, softened border */}
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-headings text-accent-blue mb-3">{SITE_NAME}</h3>
            <p className="text-xs font-body">Cybersecurity & Software Engineer</p>
            <p className="text-sm font-body">Crafting secure and innovative digital solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-headings text-accent-blue mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={`footer-${link.name}`}>
                  {link.isPageLink ? (
                     <Link to={link.href} className="hover:text-accent-green transition-colors font-body">{link.name}</Link>
                  ) : (
                    <button onClick={() => scrollToSection(link.href)} className="hover:text-accent-green transition-colors font-body">{link.name}</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
             <h3 className="text-lg font-headings text-accent-blue mb-3">Connect</h3>
             <p className="text-sm font-body mb-2">Email: <a href="mailto:mahmoudsalman796@gmail.com" className="hover:text-accent-green">mahmoudsalman796@gmail.com</a></p>
             <p className="text-sm font-body">Location: Cairo, Egypt (Remote)</p>
             <div className="mt-4 flex justify-center md:justify-start space-x-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={`footer-social-${link.id}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="hover:text-accent-green text-xl transition-colors"
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
             </div>
          </div>
        </div>
        
        <div className="text-center mt-8 border-t border-gray-700/50 pt-6 space-y-2"> {/* Softened border */}
           <button
            onClick={onToggleBirthdayMode}
            className={`px-4 py-2 rounded-md font-headings font-semibold transition-all duration-300 transform hover:scale-105
                        ${isBirthdayModeActive 
                          ? 'bg-accent-red text-base-dark hover:bg-opacity-80 hover-neon-glow-red' 
                          : 'bg-accent-green text-base-dark hover:bg-opacity-80 hover-neon-glow-green'}
                        ${isTrueBirthday && isBirthdayModeActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-pressed={isBirthdayModeActive}
            disabled={isTrueBirthday && isBirthdayModeActive} 
          >
            <i className={`fas ${isBirthdayModeActive ? 'fa-stop-circle' : 'fa-birthday-cake'} mr-2`}></i>
            {isBirthdayModeActive ? 'Disable Birthday Party 🎉' : 'See My Birthday Party'}
          </button>
          {/* Explanatory subtext paragraph was previously here and is now removed. */}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-700/50 text-center text-sm"> {/* Softened border */}
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-1">
            <i className="fas fa-lock text-accent-purple mr-1" title="Secure Connection (HTTPS)"></i>
            "In the world of bits and bytes, vigilance is the strongest shield."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;