
import React, { useEffect } from 'react'; // Added useEffect
import { useLocation } from 'react-router-dom'; // Added useLocation
import Hero from '../components/Hero';
import TerminalEffect from '../components/TerminalEffect'; // Import the new component
import About from '../components/About';
import CareerPath from '../components/CareerPath'; // Import new CareerPath component
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BlogPreview from '../components/BlogPreview';
import Contact from '../components/Contact';

interface MainPageProps {
  isTrueBirthday: boolean;
  onShowSpecialMessage: () => void;
  isBirthdayModeActive: boolean; // Added new prop
}

const MainPage: React.FC<MainPageProps> = ({ isTrueBirthday, onShowSpecialMessage, isBirthdayModeActive }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove #
      const element = document.getElementById(id);
      if (element) {
        // Using setTimeout to ensure the element is available after any potential re-renders due to routing.
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [location.hash]); // Re-run effect if hash changes

  return (
    <>
      <Hero 
        isTrueBirthday={isTrueBirthday} 
        onShowSpecialMessage={onShowSpecialMessage} 
        isBirthdayModeActive={isBirthdayModeActive} // Pass down
      />
      <TerminalEffect /> {/* Add the new TerminalEffect section here */}
      <About />
      <CareerPath /> {/* Add new CareerPath section */}
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  );
};

export default MainPage;