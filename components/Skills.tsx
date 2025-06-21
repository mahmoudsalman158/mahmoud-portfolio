
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SKILLS_DATA } from '../constants';
import { SkillItem } from '../types';

const SkillCard: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [showLoadingText, setShowLoadingText] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false); // Ref to track visibility for timeouts

  const startAnimationCycle = useCallback(() => {
    // Ensure this runs only if the component is currently visible
    if (!isVisibleRef.current) return;

    setShowLoadingText(true);
    setCurrentWidth(0); // Reset width for animation start

    // Short delay to ensure reset is applied before animating to full width
    const fillTimeoutId = window.setTimeout(() => {
      if (!isVisibleRef.current) return; // Check visibility again before proceeding
      setCurrentWidth(skill.proficiency); // Animate to full proficiency

      // After 1s (animation duration), hide "Loading..." and set 30s timer
      animationTimeoutRef.current = window.setTimeout(() => {
        if (!isVisibleRef.current) return;
        setShowLoadingText(false);

        // After 30s, restart cycle if still visible
        animationTimeoutRef.current = window.setTimeout(() => {
          if (isVisibleRef.current) {
            startAnimationCycle(); // Loop
          }
        }, 30000); // 30 seconds pause
      }, 1000); // 1 second for fill animation (matches CSS transition)
    }, 50); // Small delay before triggering fill animation
    
    // Store the earliest timeout for potential clearing
    animationTimeoutRef.current = fillTimeoutId; 

  }, [skill.proficiency]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting; // Update visibility ref
        if (entry.isIntersecting) {
          startAnimationCycle();
        } else {
          // Cleanup when not visible
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
          }
          setCurrentWidth(0); // Reset width visually
          setShowLoadingText(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
      }
    );

    const currentCardRef = cardRef.current; // Capture for cleanup
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
      // Clear any pending timeouts when component unmounts or dependencies change
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [skill.proficiency, startAnimationCycle]); // startAnimationCycle is memoized

  return (
    <div 
      ref={cardRef}
      className="bg-base-light-dark p-6 rounded-lg shadow-lg hover:shadow-glow-purple transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-transparent hover:border-accent-purple"
    >
      <div className="mb-4 text-4xl"><i className={skill.icon} aria-hidden="true"></i></div>
      <h3 className="text-xl font-headings font-semibold text-white mb-2">{skill.name}</h3>
      <div 
        className="w-full bg-gray-900 rounded-full h-5 mb-1 overflow-hidden relative" // Increased height to h-5 (20px)
        style={{
          boxShadow: '0 0 6px rgba(179, 136, 235, 0.6), 0 0 12px rgba(179, 136, 235, 0.3)' // Purple neon glow for the track
        }}
      >
        <div
          className="bg-accent-green h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center" // CSS transition for 1 second
          style={{ 
            width: `${currentWidth}%`, 
            boxShadow: '0 0 6px #00FFAA, 0 0 12px #00FFAA, 0 0 18px #00FFAA' // Green neon glow for filled part
          }}
          aria-valuenow={skill.proficiency} 
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${skill.name} proficiency`}
        >
          {showLoadingText && (
            <span className="text-xs text-base-dark font-semibold px-1 select-none">
              Loading...
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-accent-green text-glow-green">{skill.proficiency}%</p>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headings font-bold text-center text-accent-purple mb-12 transition-all duration-300 hover-neon-glow-purple">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {SKILLS_DATA.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;