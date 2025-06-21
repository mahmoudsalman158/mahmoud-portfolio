import React, { useState, useEffect, useCallback } from 'react';

interface AdviceBlockItem {
  id: string;
  tip: string;
  hintText: string;
}

const adviceBlocks: AdviceBlockItem[] = [
  { id: 'adv1', tip: "Always sanitize user inputs rigorously to prevent SQL injection and XSS.", hintText: "Our Pentest Methodology section details steps for identifying such flaws." },
  { id: 'adv2', tip: "Implement Multi-Factor Authentication (MFA) for all critical access points.", hintText: "Strong authentication is a cornerstone of robust security." },
  { id: 'adv3', tip: "Regularly patch systems and software. Vulnerability management is key.", hintText: "See how ignoring patch management can lead to epic fails in Advanced Mythology." },
  { id: 'adv4', tip: "Encrypt sensitive data at rest and in transit using strong algorithms.", hintText: "Cryptography concepts are foundational to securing data effectively." },
  { id: 'adv5', tip: "Understand common attack vectors like those in the OWASP Top 10.", hintText: "Explore our Mythology section where vulnerabilities are personified as mythic beasts." },
  { id: 'adv6', tip: "Principle of Least Privilege: Grant only necessary permissions.", hintText: "Minimizing access rights limits potential damage from a compromise." },
  { id: 'adv7', tip: "Conduct regular security audits and penetration tests.", hintText: "Learn about structured testing approaches in Pentest Methodology." },
  { id: 'adv8', tip: "Develop and test your Incident Response plan frequently.", hintText: "Being prepared for an incident is as crucial as preventing one." },
  { id: 'adv9', tip: "Secure your APIs with proper authentication and authorization.", hintText: "Advanced Mythology covers complex scenarios like API exploitation." },
  { id: 'adv10', tip: "Educate users about phishing and social engineering tactics.", hintText: "The human element is often targeted, a theme echoed in our Mythology." },
];

const CHAR_TYPING_SPEED_MS = 60; // Slightly faster typing
const POST_CYCLE_PAUSE_MS = 10000; // 10 seconds pause after both lines

const TerminalAdviceBlock: React.FC = () => {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const [typedTip, setTypedTip] = useState('');
  const [typedHint, setTypedHint] = useState('');
  const [isTypingTip, setIsTypingTip] = useState(true);
  const [isTypingHint, setIsTypingHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentAdvice = adviceBlocks[currentAdviceIndex];

  const startNextCycle = useCallback(() => {
    setIsPaused(false);
    setTypedTip('');
    setTypedHint('');
    setCurrentAdviceIndex((prevIndex) => (prevIndex + 1) % adviceBlocks.length);
    setIsTypingTip(true);
    setIsTypingHint(false);
  }, []);

  useEffect(() => {
    let timeoutId: number; // Changed NodeJS.Timeout to number

    if (isPaused) {
      timeoutId = window.setTimeout(startNextCycle, POST_CYCLE_PAUSE_MS);
    } else if (isTypingTip) {
      if (typedTip.length < currentAdvice.tip.length) {
        timeoutId = window.setTimeout(() => {
          setTypedTip(currentAdvice.tip.substring(0, typedTip.length + 1));
        }, CHAR_TYPING_SPEED_MS);
      } else {
        setIsTypingTip(false);
        setIsTypingHint(true); // Start typing hint immediately after tip
      }
    } else if (isTypingHint) {
      if (typedHint.length < currentAdvice.hintText.length) {
        timeoutId = window.setTimeout(() => {
          setTypedHint(currentAdvice.hintText.substring(0, typedHint.length + 1));
        }, CHAR_TYPING_SPEED_MS);
      } else {
        setIsTypingHint(false);
        setIsPaused(true); // Pause after hint is fully typed
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typedTip, typedHint, isTypingTip, isTypingHint, isPaused, currentAdvice, startNextCycle]);


  return (
    <div className="bg-base-light-dark p-4 sm:p-6 rounded-lg shadow-lg border border-gray-600 mt-12">
      <h3 className="text-2xl font-headings font-bold text-accent-green mb-4 flex items-center">
        <i className="fas fa-terminal mr-3"></i>System Operations Log
      </h3>
      <div className="font-['Source_Code_Pro',_monospace] text-sm text-text-off-white space-y-1 min-h-[6em]"> {/* min-h adjusted for two lines */}
        <p>
          <span className="text-accent-blue">portfolio@M.Salman:~$ security_bulletin:</span>{' '}
          {typedTip}
          {isTypingTip && <span className="typed-cursor-blink" aria-hidden="true"></span>}
        </p>
        <p>
          <span className="text-accent-purple">portfolio@M.Salman:~$ related_intel:</span>{' '}
          {typedHint}
          {(isTypingHint && !isTypingTip) && <span className="typed-cursor-blink" aria-hidden="true"></span>}
        </p>
      </div>
       {isPaused && (
        <p className="text-xs text-gray-500 text-center mt-2 animate-pulse">Next transmission in {POST_CYCLE_PAUSE_MS/1000}s...</p>
      )}
    </div>
  );
};

export default TerminalAdviceBlock;