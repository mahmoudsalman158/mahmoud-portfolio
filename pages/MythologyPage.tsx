
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MYTHOLOGY_DATA } from '../constants';
import { MythItem, MythStep } from '../types';

const TYPING_SPEED_MS = 30; 
const LINE_REVEAL_DELAY_MS_BETWEEN_LINES = 200; 
const STEP_ADVANCE_DELAY_MS = 7000; 

const MythologyPage: React.FC = () => {
  const [selectedMyth, setSelectedMyth] = useState<MythItem | null>(null);
  const [currentCodeContent, setCurrentCodeContent] = useState<string>('');
  const [currentStepAnimating, setCurrentStepAnimating] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [highlightedStepId, setHighlightedStepId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'steps'>('code');

  // New state and refs for robust resume
  const [isMythFullyCompleted, setIsMythFullyCompleted] = useState<boolean>(false);
  const currentLineIndexInStepRef = useRef<number>(0);
  const currentCharIndexInLineRef = useRef<number>(0);

  const codeFrameRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMountedRef = useRef(true);
  const isPlayingRef = useRef(isPlaying); // Ref to track isPlaying for callbacks

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const clearAllAnimationTimeouts = useCallback(() => {
    animationTimeoutRefs.current.forEach(clearTimeout);
    animationTimeoutRefs.current = [];
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearAllAnimationTimeouts();
    };
  }, [clearAllAnimationTimeouts]);

  const resetAnimationState = useCallback((keepSelection: boolean = false) => {
    clearAllAnimationTimeouts();
    setCurrentCodeContent('');
    setCurrentStepAnimating(-1);
    currentLineIndexInStepRef.current = 0;
    currentCharIndexInLineRef.current = 0;
    setIsPlaying(false);
    setIsMythFullyCompleted(false);
    setHighlightedStepId(null);
    if (!keepSelection) {
      setSelectedMyth(null);
    }
  }, [clearAllAnimationTimeouts]);
  
  const handleSelectMyth = (myth: MythItem) => {
    if (selectedMyth?.id !== myth.id) {
      resetAnimationState(false); 
      setSelectedMyth(myth);
    } else {
      resetAnimationState(true); 
    }
    setActiveTab('code'); 
  };

  const typeCharacterRecursive = useCallback((
    stepData: MythStep,
    lineIdx: number,
    charIdx: number,
    onStepDone: () => void
  ) => {
    if (!isMountedRef.current || !isPlayingRef.current) {
      clearAllAnimationTimeouts();
      return;
    }

    const lines = stepData.codeSnippet.split('\n');

    if (lineIdx >= lines.length) {
      onStepDone(); // All lines in this step are done
      return;
    }

    const currentLineText = lines[lineIdx];

    if (charIdx < currentLineText.length) {
      setCurrentCodeContent(prev => prev + currentLineText[charIdx]);
      currentCharIndexInLineRef.current = charIdx + 1; // Update ref for next char
      currentLineIndexInStepRef.current = lineIdx;    // Ensure line ref is current

      const timeoutId = setTimeout(() => {
        typeCharacterRecursive(stepData, lineIdx, charIdx + 1, onStepDone);
      }, TYPING_SPEED_MS);
      animationTimeoutRefs.current.push(timeoutId);
    } else {
      // Line completed
      setCurrentCodeContent(prev => prev + '\n');
      currentLineIndexInStepRef.current = lineIdx + 1; // Move to next line
      currentCharIndexInLineRef.current = 0;          // Reset char index for new line

      const timeoutId = setTimeout(() => {
        typeCharacterRecursive(stepData, lineIdx + 1, 0, onStepDone);
      }, LINE_REVEAL_DELAY_MS_BETWEEN_LINES);
      animationTimeoutRefs.current.push(timeoutId);
    }
  }, [clearAllAnimationTimeouts]);


  useEffect(() => {
    if (!isPlaying || !selectedMyth || currentStepAnimating === -1 || currentStepAnimating >= selectedMyth.steps.length) {
      if (!isPlaying) clearAllAnimationTimeouts();
      return;
    }
    
    const currentStepData = selectedMyth.steps[currentStepAnimating];
    if (!currentStepData) return;

    setHighlightedStepId(currentStepData.id);
    clearAllAnimationTimeouts(); // Clear previous timeouts before starting new/resumed step

    const onStepDoneForThisStep = () => {
      if (!isMountedRef.current || !isPlayingRef.current) {
        clearAllAnimationTimeouts();
        return;
      }
      if (currentStepAnimating < selectedMyth.steps.length - 1) {
        const timeoutId = setTimeout(() => {
          if (isMountedRef.current && isPlayingRef.current) {
            currentLineIndexInStepRef.current = 0; // Reset for next step
            currentCharIndexInLineRef.current = 0;
            setCurrentStepAnimating(prev => prev + 1);
          } else {
            clearAllAnimationTimeouts();
          }
        }, STEP_ADVANCE_DELAY_MS);
        animationTimeoutRefs.current.push(timeoutId);
      } else {
        setIsPlaying(false);
        setIsMythFullyCompleted(true);
      }
    };
    
    // typeCharacterRecursive will use currentLineIndexInStepRef and currentCharIndexInLineRef to resume
    typeCharacterRecursive(currentStepData, currentLineIndexInStepRef.current, currentCharIndexInLineRef.current, onStepDoneForThisStep);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [isPlaying, currentStepAnimating, selectedMyth, typeCharacterRecursive]);


  const handlePlayPause = () => {
    if (!selectedMyth) return;

    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying); // This will trigger the useEffect above

    if (nextIsPlaying) { // Play or Resume
      if (isMythFullyCompleted || currentStepAnimating === -1 || 
          (currentStepAnimating === 0 && currentCodeContent === '' && currentLineIndexInStepRef.current === 0 && currentCharIndexInLineRef.current === 0)) { 
        // Reset for fresh play or replay
        clearAllAnimationTimeouts();
        setCurrentCodeContent('');
        currentLineIndexInStepRef.current = 0;
        currentCharIndexInLineRef.current = 0;
        setIsMythFullyCompleted(false);
        setCurrentStepAnimating(0); // This state change, along with isPlaying=true, triggers the useEffect
      }
      // If resuming, the useEffect will pick up the current state from refs and currentStepAnimating
    } else { // Pause
      clearAllAnimationTimeouts();
      // State (currentStepAnimating, currentLineIndexInStepRef, currentCharIndexInLineRef, currentCodeContent) is preserved
    }
  };
  
  const handleReset = () => {
    if (!selectedMyth) return;
    resetAnimationState(true); 
  };

  const handleStepListClick = (stepIndex: number) => {
    if (!selectedMyth) return;
    
    setIsPlaying(false); // Pause current animation
    clearAllAnimationTimeouts();
    setIsMythFullyCompleted(false);

    let newCode = '';
    for (let i = 0; i <= stepIndex; i++) {
      newCode += selectedMyth.steps[i].codeSnippet + '\n';
    }
    setCurrentCodeContent(newCode);
    setCurrentStepAnimating(stepIndex); 
    
    // Set refs to indicate completion of this step for resume logic
    const stepLines = selectedMyth.steps[stepIndex].codeSnippet.split('\n');
    currentLineIndexInStepRef.current = stepLines.length; // As if all lines of clicked step are done
    currentCharIndexInLineRef.current = 0;               // At start of a non-existent next line

    setHighlightedStepId(selectedMyth.steps[stepIndex].id);
    setActiveTab('code'); 
  };
  
  useEffect(() => {
    if (codeFrameRef.current) {
      codeFrameRef.current.scrollTop = codeFrameRef.current.scrollHeight;
    }
  }, [currentCodeContent]);

  let playButtonText = 'Play';
  if (isPlaying) {
    playButtonText = 'Pause';
  } else if (isMythFullyCompleted) {
    playButtonText = 'Replay';
  } else if (currentCodeContent !== '' || currentStepAnimating !== -1) {
    playButtonText = 'Resume';
  }


  return (
    <div className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white">
      <div className="container mx-auto">
        <header className="text-center mb-12 pt-10">
          <h1 className="text-4xl sm:text-5xl font-headings font-bold text-accent-blue transition-all duration-300 hover-neon-glow-blue">Mythology of Vulnerabilities</h1>
          <p className="text-lg text-gray-400 mt-2">Explore ancient myths, understand modern exploits.</p>
        </header>

        {!selectedMyth ? (
          <>
            <p className="text-center text-xl mb-8 text-accent-green">Choose a Myth to Begin Your Quest:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MYTHOLOGY_DATA.map(myth => (
                <button
                  key={myth.id}
                  onClick={() => handleSelectMyth(myth)}
                  className="myth-card-selector bg-base-light-dark p-6 rounded-lg shadow-lg hover:shadow-glow-purple transform hover:-translate-y-1 transition-all duration-300 text-left border border-gray-700 hover:border-accent-purple"
                >
                  <div className="flex items-center mb-3">
                    {myth.icon && <span className="mr-3 text-accent-purple text-2xl"><i className={myth.icon} aria-hidden="true"></i></span>}
                    <h2 className="text-2xl font-headings font-semibold text-white">{myth.title}</h2>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{myth.narrative.substring(0,100)}...</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="myth-details-view">
            <button 
                onClick={() => { resetAnimationState(false); }} 
                className="mb-8 text-accent-blue hover:text-accent-green transition-colors hover-neon-glow-blue">
                <i className="fas fa-arrow-left mr-2"></i> Back to Myth Selection
            </button>
            <div className="bg-base-light-dark p-6 sm:p-8 rounded-lg shadow-xl border border-gray-700 mb-8">
              <div className="flex items-center mb-4">
                {selectedMyth.icon && <span className="mr-4 text-4xl text-accent-purple"><i className={selectedMyth.icon} aria-hidden="true"></i></span>}
                <h2 className="text-3xl sm:text-4xl font-headings font-bold text-accent-purple hover-neon-glow-purple">{selectedMyth.title}</h2>
              </div>
              <p className="text-md font-body text-gray-300 mb-3 italic leading-relaxed">{selectedMyth.narrative}</p>
              <p className="text-md font-body text-accent-green leading-relaxed">{selectedMyth.vulnerabilityAnalogy}</p>
            </div>

            <div className="sm:hidden mb-4">
                <div className="flex border-b border-gray-700">
                    <button 
                        onClick={() => setActiveTab('code')}
                        className={`py-2 px-4 font-headings ${activeTab === 'code' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-gray-400 hover:text-accent-blue'}`}
                    >Code Simulation</button>
                    <button 
                        onClick={() => setActiveTab('steps')}
                        className={`py-2 px-4 font-headings ${activeTab === 'steps' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-gray-400 hover:text-accent-blue'}`}
                    >Exploit Steps</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              <div className={`lg:col-span-3 ${activeTab === 'code' ? 'block' : 'hidden sm:block'}`}>
                <h3 className="text-2xl font-headings text-accent-blue mb-3">Code Simulation</h3>
                <div 
                    ref={codeFrameRef}
                    className="myth-code-frame bg-gray-900 text-sm p-4 border-2 border-accent-blue rounded-md h-80 overflow-y-auto font-['Source_Code_Pro',_monospace] whitespace-pre-wrap leading-relaxed custom-scrollbar"
                    aria-live="polite"
                    role="log"
                >
                  {currentCodeContent}
                  {isPlaying && <span className="typed-cursor-blink"></span>}
                </div>
                <div className="mt-4 flex space-x-3 items-center">
                  <button onClick={handlePlayPause} className="bg-accent-green text-base-dark font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors hover-neon-glow-green">
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} mr-2`}></i>
                    {playButtonText}
                  </button>
                  <button onClick={handleReset} className="bg-accent-red text-base-dark font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors hover-neon-glow-red">
                    <i className="fas fa-undo mr-2"></i>Reset
                  </button>
                </div>
              </div>

              <div className={`lg:col-span-2 ${activeTab === 'steps' ? 'block' : 'hidden sm:block'}`}>
                <h3 className="text-2xl font-headings text-accent-green mb-3">Exploit Steps</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedMyth.steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => handleStepListClick(index)}
                      className={`block w-full text-left p-3 rounded transition-all duration-200 myth-step-item ${highlightedStepId === step.id ? 'bg-accent-blue/30 border-accent-blue text-white' : 'bg-base-light-dark hover:bg-gray-700 border-gray-700'} border`}
                    >
                      <strong className="font-headings text-accent-green">{`Step ${index + 1}: ${step.title}`}</strong>
                      {step.explanation && <p className="text-xs text-gray-400 mt-1">{step.explanation}</p>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-2xl font-headings text-accent-purple mb-4">Further Wisdom (Resources)</h3>
              <ul className="space-y-3">
                {selectedMyth.resources.map(resource => (
                  <li key={resource.name}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent-purple hover:underline transition-colors group">
                      {resource.icon && <span className="mr-2 text-accent-purple group-hover:text-white text-lg"><i className={resource.icon} aria-hidden="true"></i></span>}
                      {resource.name}
                      <i className="fas fa-external-link-alt ml-2 text-xs opacity-70"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MythologyPage;
