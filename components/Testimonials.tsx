
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { TESTIMONIALS_DATA } from '../constants';
import { TestimonialItem } from '../types';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (TESTIMONIALS_DATA.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
    }, 7000); // Change slide every 7 seconds (was 5)
    return () => clearInterval(interval);
  }, []);

  if (TESTIMONIALS_DATA.length === 0) {
    return null; // Don't render if no testimonials
  }
  
  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-accent-purple mb-12 transition-all duration-300 hover-neon-glow-purple">
          Words From Collaborators
        </h2>
        <div className="relative max-w-3xl mx-auto p-8 bg-base-dark rounded-lg shadow-xl border border-accent-purple mb-16">
          <i className="fas fa-quote-left text-5xl text-accent-purple opacity-20 absolute top-4 left-4 z-0"></i>
          <div className="relative z-10"> {/* Content above quote icons */}
            <p className="text-lg font-body text-text-off-white italic mb-6 min-h-[6em]"> {/* Min height for consistency */}
              "{currentTestimonial.quote}"
            </p>
            <p className="font-headings font-semibold text-accent-purple hover-neon-glow-purple transition-all duration-200">
              {currentTestimonial.author}
            </p>
            <p className="text-sm text-gray-400">
              {currentTestimonial.role}{currentTestimonial.company && `, ${currentTestimonial.company}`}
            </p>
          </div>
          <i className="fas fa-quote-right text-5xl text-accent-purple opacity-20 absolute bottom-4 right-4 z-0"></i>
          
          {TESTIMONIALS_DATA.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {TESTIMONIALS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-accent-purple scale-125' : 'bg-gray-600 hover:bg-gray-500'} transition-all duration-300`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>

        {/* Interactive "See Who I Am" Box */}
        <div className="mt-12 max-w-xl mx-auto">
          <div className="bg-base-light-dark/70 backdrop-blur-sm p-6 rounded-xl shadow-2xl border-2 border-accent-blue transform transition-all duration-300 hover:scale-105 hover:shadow-glow-blue group relative overflow-hidden">
             <div className="absolute inset-0 animate-pulse-slow bg-accent-blue/10 rounded-xl group-hover:bg-accent-blue/20 transition-all duration-500"></div>
            <h3 className="text-2xl sm:text-3xl font-headings font-bold text-accent-blue mb-4 text-center relative z-10">
              Curious About My Impact?
            </h3>
            <p className="text-gray-300 text-center mb-6 relative z-10">
              Discover a more detailed look at my contributions, skills, and the value I bring to complex cybersecurity challenges.
            </p>
            <div className="text-center relative z-10">
              <Link
                to="/who-i-am"
                className="button-neon-blue font-headings font-semibold py-3 px-8 text-lg transition-all duration-300 transform hover:scale-110 inline-block group-hover:text-white group-hover:shadow-lg"
              >
                See Who I Am <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
             <style>{`
              @keyframes pulse-slow {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.02); }
              }
              .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
            `}</style>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;