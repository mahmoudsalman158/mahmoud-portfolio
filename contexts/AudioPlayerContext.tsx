
import React, { createContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { SURAHS_DATA, RECITERS_DATA } from '../constants';
import { SurahDataItem, ReciterItem } from '../types';

interface AudioPlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  currentSurahIndex: number;
  currentSurahData: SurahDataItem | null;
  selectedReciterId: string;
  currentReciter: ReciterItem | null;
  volume: number;
  currentTime: number;
  duration: number;
  isTimerActive: boolean;
  timerRemainingSeconds: number;
  timerInputHours: string;
  audioSrc: string;
  playSurah: (index: number) => void;
  handlePlayPause: () => void;
  handleStop: () => void;
  handleNextSurah: () => void;
  handlePreviousSurah: () => void;
  handleVolumeChange: (newVolume: number) => void;
  handleSeek: (time: number) => void;
  toggleTimer: () => void;
  setTimerInputHours: (hours: string) => void;
  selectReciter: (reciterId: string) => void;
  isPlayerInitialized: boolean;
}

export const AudioPlayerContext = createContext<AudioPlayerContextType>(null!);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [selectedReciterId, setSelectedReciterId] = useState<string>(RECITERS_DATA[0].id);
  const [currentSurahIndex, setCurrentSurahIndex] = useState<number>(-1); 
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [timerInputHours, setTimerInputHours] = useState<string>("");
  // const [timerDurationSeconds, setTimerDurationSeconds] = useState<number>(0); // Internal state, not directly exposed
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isPlayerInitialized, setIsPlayerInitialized] = useState<boolean>(false);


  const audioRef = useRef<HTMLAudioElement>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const currentReciter = RECITERS_DATA.find(r => r.id === selectedReciterId) || RECITERS_DATA[0];
  const currentSurahData = currentSurahIndex >=0 && currentSurahIndex < SURAHS_DATA.length ? SURAHS_DATA[currentSurahIndex] : null;
  
  const audioSrc = currentSurahData && currentReciter ? `${currentReciter.audioBaseUrl}${currentSurahData.number}.mp3` : "";

  const playSurah = useCallback((index: number) => {
    if (index < 0 || index >= SURAHS_DATA.length) return;
    setCurrentSurahIndex(index); // This will change audioSrc via derived state
    setIsPlaying(true);          // This, along with new audioSrc, triggers useEffect
    if (!isPlayerInitialized) setIsPlayerInitialized(true);
  }, [isPlayerInitialized]);

  const handlePlayPause = () => {
    if (currentSurahIndex === -1 && SURAHS_DATA.length > 0) {
        playSurah(0);
    } else {
        setIsPlaying(!isPlaying); // Toggle play state
    }
    if (!isPlayerInitialized && currentSurahIndex !== -1) setIsPlayerInitialized(true);
  };

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      // audioRef.current.pause(); // useEffect will handle this via setIsPlaying(false)
      audioRef.current.currentTime = 0;
      setCurrentTime(0); // Explicitly update currentTime state
    }
    setIsPlaying(false);
  }, []);

  const handleNextSurah = useCallback(() => {
    if (currentSurahIndex === -1) {
        playSurah(0);
        return;
    }
    const nextIndex = (currentSurahIndex + 1) % SURAHS_DATA.length;
    playSurah(nextIndex);
  }, [currentSurahIndex, playSurah]);

  const handlePreviousSurah = useCallback(() => { // Added useCallback
     if (currentSurahIndex === -1) {
        playSurah(SURAHS_DATA.length -1);
        return;
    }
    const prevIndex = (currentSurahIndex - 1 + SURAHS_DATA.length) % SURAHS_DATA.length;
    playSurah(prevIndex);
  }, [currentSurahIndex, playSurah]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleSeek = (time: number) => {
     if (audioRef.current) {
        audioRef.current.currentTime = time;
        setCurrentTime(time); // Update state after seeking
     }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = useCallback(() => {
    if (isTimerActive && timerRemainingSeconds <= 0) {
      handleStop();
      setIsTimerActive(false);
      alert("Listening timer has finished.");
      return;
    }
    if (currentSurahIndex < SURAHS_DATA.length - 1) {
      handleNextSurah();
    } else { 
      if (isTimerActive) {
        handleStop();
        setIsTimerActive(false); 
        alert("You have completed the Quran. The listening timer has finished.");
      } else {
        handleStop();
        alert("You have completed the Quran.");
      }
    }
  }, [currentSurahIndex, handleNextSurah, isTimerActive, timerRemainingSeconds, handleStop]);

  const toggleTimer = () => {
    if (isTimerActive) {
      setIsTimerActive(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setTimerRemainingSeconds(0);
      setTimerInputHours("");
    } else {
      const hours = parseFloat(timerInputHours);
      if (!isNaN(hours) && hours > 0) {
        // setTimerDurationSeconds(Math.floor(hours * 3600)); // Set internal duration if needed elsewhere
        setTimerRemainingSeconds(Math.floor(hours * 3600));
        setIsTimerActive(true);
        if (!isPlaying && currentSurahIndex !== -1) {
          setIsPlaying(true);
        } else if (!isPlaying && currentSurahIndex === -1 && SURAHS_DATA.length > 0) {
          playSurah(0); 
        }
        if (!isPlayerInitialized && currentSurahIndex !== -1) setIsPlayerInitialized(true);
      } else {
        alert("Please enter a valid number of hours for the timer.");
      }
    }
  };
  
  const selectReciter = (reciterId: string) => {
    if (selectedReciterId !== reciterId) {
      const wasPlaying = isPlaying;
      if (audioRef.current) {
        audioRef.current.pause(); // Pause directly before changing src
      }
      setSelectedReciterId(reciterId); // This will trigger audioSrc update.
      // The useEffect hook will handle loading the new src.
      // If it was playing, we want to resume.
      if (currentSurahIndex !== -1 && wasPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false); // Ensure it's paused if not playing before or no surah selected.
      }
      if (!isPlayerInitialized && currentSurahIndex !== -1) setIsPlayerInitialized(true);
    }
  };

  // Consolidated useEffect for audio control
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (audioSrc) {
      // If the source is different, update src and load.
      // Using audioElement.src directly for comparison as currentSrc might not update immediately after setting .src
      if (audioElement.src !== audioSrc) {
        audioElement.src = audioSrc;
        audioElement.load(); // Load the new source
      }

      if (isPlaying) {
        // Check if metadata (duration) is loaded. Sometimes play() fails if called too early.
        // A common practice is to wait for 'canplay' or 'canplaythrough' event,
        // but for simplicity, we rely on the browser's behavior.
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // AbortError is common if play() is interrupted by a new load() or src change.
            // This is often handled gracefully by the browser, so we might not need to log it or change state.
            if (error.name !== 'AbortError') {
              console.error("Error playing audio:", error);
              // setIsPlaying(false); // Optionally set isPlaying to false for other errors.
            }
          });
        }
      } else {
        audioElement.pause();
      }
    } else {
      // No valid audioSrc (e.g., player not initialized or invalid state), ensure paused.
      audioElement.pause();
      if (isPlaying) { // Correct the state if it's supposed to be playing but no src.
          setIsPlaying(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, audioSrc]); // Only re-run when isPlaying or audioSrc changes


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isTimerActive && timerRemainingSeconds > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemainingSeconds(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current!);
            timerIntervalRef.current = null;
            setIsTimerActive(false);
            handleStop(); // Stop audio and reset timer states.
            alert("Listening timer has finished.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isTimerActive && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerActive, timerRemainingSeconds, handleStop]);


  const contextValue: AudioPlayerContextType = {
    audioRef,
    isPlaying,
    currentSurahIndex,
    currentSurahData,
    selectedReciterId,
    currentReciter,
    volume,
    currentTime,
    duration,
    isTimerActive,
    timerRemainingSeconds,
    timerInputHours,
    audioSrc,
    playSurah,
    handlePlayPause,
    handleStop,
    handleNextSurah,
    handlePreviousSurah,
    handleVolumeChange,
    handleSeek,
    toggleTimer,
    setTimerInputHours,
    selectReciter,
    isPlayerInitialized,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        // src is managed by the useEffect hook when audioSrc changes
      />
    </AudioPlayerContext.Provider>
  );
};
