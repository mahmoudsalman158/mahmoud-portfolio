import React, { useEffect, useRef, useState } from 'react';

// vanilla-tilt.js is expected to be loaded globally via CDN or other means
declare var VanillaTilt: any;

interface ProfileCard3DProps {
  avatarSrc: string;
  name: string;
  title: string;
  bio: string;
  onCTAClick: () => void;
  ctaText: string;
}

const ProfileCard3D: React.FC<ProfileCard3DProps> = ({ avatarSrc, name, title, bio, onCTAClick, ctaText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const currentCard = cardRef.current;
    if (currentCard && typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(currentCard, {
        max: 15,      // Max tilt rotation (degrees)
        speed: 400,   // Speed of the enter/exit tilting
        glare: true,  // If it should have a "glare" effect
        "max-glare": 0.2, // Glare intensity (0.0 - 1.0)
        perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets
      });
    }
    return () => {
      // currentCard?.vanillaTilt?.destroy?.(); // Optional: if vanilla-tilt provides a destroy method
    };
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={cardRef} 
      className={`profile-card-3d-container mx-auto w-full max-w-sm h-96 perspective cursor-pointer transition-transform duration-300 ease-in-out`}
      onClick={handleFlip}
      style={{ transformStyle: 'preserve-3d' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleFlip() : null}
      aria-pressed={isFlipped}
      aria-label={`Profile card for ${name}. Click to ${isFlipped ? 'see front' : 'see back'}.`}
    >
      <div 
        className={`profile-card-inner w-full h-full relative transition-transform duration-700 ease-in-out`}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front Face */}
        <div className="profile-card-face profile-card-front absolute w-full h-full backface-hidden rounded-xl bg-base-light-dark shadow-2xl border-2 border-accent-blue p-6 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-full border-4 border-accent-green shadow-lg overflow-hidden">
            <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-headings font-bold text-accent-blue mb-1">{name}</h2>
          <p className="text-md text-gray-300 font-body">{title}</p>
          <p className="text-xs text-gray-500 mt-3">(Click to learn more)</p>
        </div>

        {/* Back Face */}
        <div className="profile-card-face profile-card-back absolute w-full h-full backface-hidden rounded-xl bg-base-dark shadow-2xl border-2 border-accent-purple p-6 flex flex-col items-center justify-center text-center overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <h3 className="text-xl sm:text-2xl font-headings font-bold text-accent-purple mb-3">About Me</h3>
          <p className="text-sm text-gray-200 font-body mb-6 leading-relaxed">
            {bio}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onCTAClick(); }} // Stop propagation to prevent card from flipping back immediately
            className="button-neon-purple font-headings py-2 px-5 text-sm sm:text-base transform hover:scale-105"
          >
            {ctaText}
          </button>
           <p className="text-xs text-gray-500 mt-3">(Click card to flip back)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard3D;