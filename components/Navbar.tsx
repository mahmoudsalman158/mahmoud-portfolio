
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLinkItem } from '../types';
import { NAV_LINKS, SITE_LOGO_TEXT } from '../constants';
import BirthdayCountdown from './BirthdayCountdown'; // Import the new component

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.substring(1)); // Remove # from id
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after click
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-base-light-dark/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center"> {/* Added flex items-center */}
            <Link to="/" className="text-2xl font-headings font-bold text-accent-blue hover:text-accent-green transition-colors hover-neon-glow-blue">
              {SITE_LOGO_TEXT}
            </Link>
            <BirthdayCountdown /> {/* Added BirthdayCountdown component */}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                link.isPageLink ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-headings uppercase text-sm text-accent-blue hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover-neon-glow-blue"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="font-headings uppercase text-sm text-accent-blue hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover-neon-glow-blue"
                  >
                    {link.name}
                  </button>
                )
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-accent-blue hover:text-white focus:outline-none"
              aria-label="Open menu"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-light-dark/95 shadow-xl py-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              link.isPageLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-headings uppercase text-accent-blue hover:text-white hover:bg-accent-blue/20 block px-3 py-2 rounded-md text-base transition-all duration-200 hover-neon-glow-blue"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="font-headings uppercase text-accent-blue hover:text-white hover:bg-accent-blue/20 block w-full text-left px-3 py-2 rounded-md text-base transition-all duration-200 hover-neon-glow-blue"
                >
                  {link.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
