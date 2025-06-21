
import React, { useState, useEffect, useCallback } from 'react';
import { BIRTHDAY_MONTH, BIRTHDAY_DAY, SITE_NAME } from '../constants';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const BIRTH_YEAR = 2003;

const BirthdayCountdown: React.FC = () => {
  const calculateTimeLeft = useCallback((): TimeLeft | string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    if (now.getMonth() === BIRTHDAY_MONTH - 1 && now.getDate() === BIRTHDAY_DAY) {
      const age = currentYear - BIRTH_YEAR;
      return `🎂 عيد ميلاد سعيد يا ${SITE_NAME.split(" ")[0]}! عمرك الآن ${age} سنة. 🎉 نتمنى لك دوام النجاح والتوفيق! ادعيلي بالنجاح دوما وتمنالي التوفيق`;
    }

    let nextBirthday = new Date(currentYear, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
    if (nextBirthday < now) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    const difference = +nextBirthday - +now;
    
    if (difference <= 0) {
         nextBirthday.setFullYear(currentYear + 1); 
         const newDifference = +nextBirthday - +now;
          return {
            days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((newDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((newDifference / 1000 / 60) % 60),
            seconds: Math.floor((newDifference / 1000) % 60),
        };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | string>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, calculateTimeLeft]);

  if (typeof timeLeft === 'string') {
    return (
      <span className="ml-2 text-sm sm:text-base lg:text-lg font-headings text-accent-green animate-pulse hover-neon-glow-green whitespace-nowrap p-2 rounded-md bg-black/20 shadow-lg">
        {timeLeft}
      </span>
    );
  }

  return (
    <div className="ml-2 text-xs sm:text-sm font-['Source_Code_Pro',_monospace] text-accent-purple whitespace-nowrap hidden md:flex items-baseline" title="Time until Mahmoud's Birthday!">
      <span className="mr-1 text-gray-400">Next B-Day:</span>
      {timeLeft.days !== undefined && <span className="text-glow-purple">{String(timeLeft.days).padStart(2, '0')}d</span>}
      {timeLeft.hours !== undefined && <span className="mx-0.5 text-glow-purple">{String(timeLeft.hours).padStart(2, '0')}h</span>}
      {timeLeft.minutes !== undefined && <span className="mx-0.5 text-glow-purple">{String(timeLeft.minutes).padStart(2, '0')}m</span>}
      {timeLeft.seconds !== undefined && <span className="text-glow-purple">{String(timeLeft.seconds).padStart(2, '0')}s</span>}
    </div>
  );
};

export default BirthdayCountdown;
