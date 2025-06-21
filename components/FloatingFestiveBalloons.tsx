
import React, { useEffect, useState } from 'react';
import { SECURITY_TECH_TIPS } from '../constants';

interface BalloonStyle {
  id: number;
  left: string;
  bottom: string; 
  animationDuration: string;
  animationDelay: string;
  backgroundColor: string;
  width: string;
  height: string;
  tipText?: string; // Text for the tip
}

const balloonColors = [
  'rgba(255, 105, 180, 0.8)', // Pink
  'rgba(0, 191, 255, 0.8)',   // Deep Sky Blue
  'rgba(50, 205, 50, 0.8)',    // Lime Green
  'rgba(255, 215, 0, 0.8)',   // Gold
  'rgba(179, 136, 235, 0.8)', // Accent Purple (from theme)
  'rgba(255, 69, 0, 0.8)',    // Red-Orange
  'rgba(0, 255, 255, 0.8)',   // Cyan/Aqua
  'rgba(255, 165, 0, 0.8)',   // Orange
];


const FloatingFestiveBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonStyle[]>([]);

  useEffect(() => {
    const createBalloons = () => {
      const newBalloons: BalloonStyle[] = [];
      const numBalloons = 10; // Display more balloons for better coverage with tips

      for (let i = 0; i < numBalloons; i++) {
        const size = Math.random() * 60 + 50; // Balloon size (50px to 110px)
        let tip: string | undefined = undefined;
        // Assign a tip to roughly 1 in 3 balloons
        if (i % 3 === 0 && SECURITY_TECH_TIPS.length > 0) {
          tip = SECURITY_TECH_TIPS[Math.floor(Math.random() * SECURITY_TECH_TIPS.length)];
        }

        newBalloons.push({
          id: Date.now() + i, // More unique key
          left: `${Math.random() * 90}%`, 
          bottom: `-${size + Math.random() * 100}px`, 
          animationDuration: `${Math.random() * 7 + 8}s`, // Float up duration (8-15s)
          animationDelay: `${Math.random() * 10}s`, // Staggered start up to 10s for continuous effect
          backgroundColor: balloonColors[Math.floor(Math.random() * balloonColors.length)],
          width: `${size}px`,
          height: `${size * 1.15}px`, // Slightly oval
          tipText: tip,
        });
      }
      setBalloons(newBalloons);
    };

    createBalloons();
    // Set an interval to refresh balloons for a continuous effect
    const intervalId = setInterval(createBalloons, 15000); // Refresh every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[5]">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="floating-balloon flex items-center justify-center text-white text-center p-2"
          style={{
            left: balloon.left,
            bottom: balloon.bottom,
            width: balloon.width,
            height: balloon.height,
            backgroundColor: balloon.backgroundColor,
            animationName: 'floatAndPopEffect', // Updated animation name
            animationDuration: balloon.animationDuration,
            animationDelay: balloon.animationDelay,
            animationIterationCount: 'infinite', // Ensure balloons loop if they don't pop or are replaced
            animationTimingFunction: 'linear',
            fontSize: balloon.tipText ? 'clamp(0.5rem, 2.5vw, 0.75rem)' : 'clamp(1rem, 5vw, 1.5rem)', // Smaller font for tips
            lineHeight: '1.2',
            overflow: 'hidden', // Prevent text overflow
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%', // Balloon shape
            boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.2), 0px 0px 10px rgba(0,0,0,0.2)',
          }}
          role="presentation"
          aria-hidden="true"
        >
          {balloon.tipText || ["🎉", "🎊", "🥳", "🎈"][balloon.id % 4]}
        </div>
      ))}
    </div>
  );
};

export default FloatingFestiveBalloons;