import React, { useEffect, useRef, useState } from 'react';
import { CAREER_PATH_DATA, SOCIAL_LINKS } from '../constants'; // Import SOCIAL_LINKS
import { CareerPathItem } from '../types';

const TimelineItem: React.FC<{ item: CareerPathItem; index: number }> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current && observer) { // Check if observer exists before unobserving
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`timeline-item-wrapper mb-12 flex w-full items-start
        ${isLeft ? 'left-item flex-row' : 'right-item flex-row-reverse'}
        ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Content Card Container (takes up ~half the space) */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 text-left'}`}> {/* Padding for gap from center line */}
        <div className="p-5 rounded-lg shadow-xl bg-base-light-dark border border-gray-700 hover:border-accent-purple transition-all duration-300 hover:shadow-glow-purple">
          <div className={`flex items-center mb-2 ${isLeft ? 'justify-end flex-row-reverse' : 'justify-start flex-row'}`}>
            <i className={`${item.icon} text-2xl ${isLeft ? 'ml-3' : 'mr-3'} text-accent-green`}></i>
            <h3 className="text-xl font-headings font-semibold text-accent-green">{item.title}</h3>
          </div>
          <p className="text-sm text-gray-400 mb-2 font-mono">{item.date} ({item.category})</p>
          <p className="text-text-off-white font-body text-sm leading-relaxed mb-3">{item.description}</p>
          {item.details && item.details.length > 0 && (
            <ul className={`list-disc text-xs text-gray-300 space-y-1 ${isLeft ? 'list-inside text-right' : 'pl-5 text-left'}`}>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Middle Gutter / Node Anchor */}
      <div className="w-0 relative flex-shrink-0 mx-auto"> {/* This div is the conceptual center */}
        {/* Actual Node Dot, positioned relative to this central point */}
        <div className="absolute left-1/2 top-5 transform -translate-x-1/2"> {/* Adjust top for vertical alignment with card content */}
          <div className="w-5 h-5 bg-accent-green rounded-full border-4 border-base-dark shadow-md z-10"></div>
        </div>
      </div>
      
      {/* Empty Spacer for the other half - ensures flexbox pushes content to correct side */}
      <div className={`w-1/2 ${isLeft ? 'pl-6' : 'pr-6'}`}>
        {/* This side remains visually empty to allow content to be on one side */}
      </div>
    </div>
  );
};


const CareerPath: React.FC = () => {
  const [isPathDrawing, setIsPathDrawing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null); // Observe the section for path drawing

  useEffect(() => {
    const pathObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPathDrawing(true);
        } else {
          // Optional: setIsPathDrawing(false); // To retract line when scrolling up out of view
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) { 
      pathObserver.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current && pathObserver) { // Check if pathObserver exists
        pathObserver.unobserve(sectionRef.current);
      }
    };
  }, []);


  return (
    <section id="career-path" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-blue mb-4 transition-all duration-300 hover-neon-glow-blue">
          My Journey & Milestones
        </h2>
        
        {/* Social Icons with Wave Animation */}
        <div className="career-social-icons-container mb-12">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={`career-social-${link.id}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="career-social-icon"
              style={{ animationDelay: `${index * 0.15}s` }} // Apply staggered delay directly
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        
        <div className="timeline-path-container relative max-w-3xl mx-auto">
          <div 
            className={`timeline-central-line ${isPathDrawing ? 'is-drawing' : ''}`}
          ></div>
          <div className="relative z-[5]">
            {CAREER_PATH_DATA.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPath;