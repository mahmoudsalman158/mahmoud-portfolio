import React from 'react';

interface BirthdayOverlayProps {
  name: string;
  tip: string;
  birthYear: number;
  onHideTemporarily: () => void; // New prop for hiding
}

const subsidiaryBalloonMessages = [
  "Keep Inspiring!",
  "Shine Bright!",
  "Dream Big!"
];

const subsidiaryBalloonColors = [
  'bg-sky-400/80',
  'bg-green-400/80',
  'bg-yellow-300/80',
];

const BirthdayOverlay: React.FC<BirthdayOverlayProps> = ({ name, tip, birthYear, onHideTemporarily }) => {
  const calculateAge = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };
  const age = calculateAge();

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] p-4 pointer-events-none"
      aria-live="assertive"
      role="alert"
    >
      {/* Main Balloon Container */}
      <div 
        className="bg-gradient-to-br from-accent-purple via-pink-500 to-accent-red text-white p-6 sm:p-8 rounded-xl shadow-2xl transform transition-all duration-500 ease-out animate-fade-in-up max-w-md w-full text-center relative overflow-hidden pointer-events-auto" // Added pointer-events-auto for button
        style={{
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', 
          animation: 'floatAnimation 6s ease-in-out infinite, fadeInFromBottom 0.7s ease-out forwards',
        }}
      >
        {/* Sparkles for main balloon */}
        {[...Array(5)].map((_, i) => (
          <div key={`sparkle-${i}`} className="absolute bg-yellow-300 rounded-full animate-ping opacity-50" style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}></div>
        ))}

        {/* Main Balloon Content */}
        <div className="relative z-10">
          <button
            onClick={onHideTemporarily}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-white transition-colors p-1 rounded-full bg-black/20 hover:bg-black/40 pointer-events-auto"
            aria-label="Hide message for 1 minute"
            title="Hide for 1 minute"
          >
            <i className="fas fa-eye-slash text-sm sm:text-base"></i>
          </button>

          <h3 className="text-xl sm:text-2xl font-headings font-bold mb-3 mt-4 sm:mt-0"> {/* Added margin-top for spacing from new button */}
            <i className="fas fa-gift mr-2"></i>A Special Birthday Message!
          </h3>
          <div 
            className="text-lg sm:text-xl font-body mb-4 p-3 bg-white/20 rounded-lg shadow-inner"
            dir="ltr" 
          >
            "{tip}"
          </div>
          <p className="text-md sm:text-lg font-headings font-semibold">
            <i className="fas fa-user-astronaut mr-2"></i>
            {name.split(" ")[0]}
          </p>
          <p className="text-sm sm:text-md font-headings text-yellow-300">
            Age: {age}
          </p>
        </div>

        {/* Balloon string/tail for main balloon */}
        <div 
          className="absolute left-1/2 bottom-[-15px] transform -translate-x-1/2 w-1.5 h-10 bg-white/70 rounded-b-full"
          style={{
             clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0% 100%)',
          }}
        ></div>

        {/* Subsidiary Balloons */}
        {subsidiaryBalloonMessages.map((message, index) => (
          <div
            key={`sub-balloon-${index}`}
            className={`absolute ${subsidiaryBalloonColors[index % subsidiaryBalloonColors.length]} text-black p-3 rounded-full shadow-lg text-xs sm:text-sm font-semibold animate-fade-in-up`}
            style={{
              width: 'auto', 
              minWidth: '80px', 
              maxWidth: '120px',
              height: 'auto', 
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              animationName: 'floatAnimation, fadeInFromBottom',
              animationDuration: `${5 + index * 0.5}s, 0.7s`, 
              animationIterationCount: 'infinite, 1',
              animationTimingFunction: 'ease-in-out, ease-out',
              animationFillMode: 'forwards',
              animationDelay: `${index * 0.2}s, ${0.3 + index * 0.15}s`, 
              top: index === 0 ? '-15%' : index === 1 ? '5%' : 'auto',
              bottom: index === 2 ? '-10%' : 'auto',
              left: index === 0 ? '5%' : index === 2 ? '10%' : 'auto',
              right: index === 1 ? '5%' : 'auto',
              transform: index === 0 ? 'rotate(-15deg)' : index === 1 ? 'rotate(10deg)' : 'rotate(5deg)',
              zIndex: 5, 
            }}
          >
            {message}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes floatAnimation {
            0%, 100% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          
          @keyframes fadeInFromBottom {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0px); }
          }
          .animate-fade-in-up { 
            animation-name: fadeInFromBottom;
            animation-duration: 0.7s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    </div>
  );
};

export default BirthdayOverlay;