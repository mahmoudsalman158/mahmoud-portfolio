
import React, { useState, useEffect, useRef, useContext } from 'react';
import { SURAHS_DATA, RECITERS_DATA } from '../constants';
import { SurahDataItem, ReciterItem } from '../types';
import { AudioPlayerContext } from '../contexts/AudioPlayerContext'; // Import the context

const QuranPlayerPage: React.FC = () => {
  const {
    currentSurahData,
    currentReciter,
    isPlaying,
    volume,
    currentTime,
    duration,
    isTimerActive,
    timerRemainingSeconds,
    timerInputHours,
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
    currentSurahIndex,
  } = useContext(AudioPlayerContext);

  const surahListRef = useRef<HTMLDivElement>(null);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatTimerTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSurahSelection = (index: number) => {
    playSurah(index);
  };

  const handleReciterSelection = (reciterId: string) => {
    selectReciter(reciterId);
  };
  
  const handleLocalSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSeek(parseFloat(e.target.value));
  };

  const handleLocalTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerInputHours(e.target.value);
  };

  useEffect(() => {
    const currentSurahElement = document.getElementById(`surah-item-${currentSurahIndex}`);
    if (currentSurahElement && surahListRef.current) {
      const list = surahListRef.current;
      const surahTop = currentSurahElement.offsetTop;
      const surahHeight = currentSurahElement.offsetHeight;
      const listHeight = list.clientHeight;
      const listScrollTop = list.scrollTop;

      if (surahTop < listScrollTop || surahTop + surahHeight > listScrollTop + listHeight) {
        list.scrollTo({
          top: surahTop - listHeight / 2 + surahHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [currentSurahIndex]);


  if (!currentReciter || !SURAHS_DATA.length) {
    return <div>Loading player data...</div>;
  }

  return (
    <div className="quran-player-page bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-text-off-white" dir="rtl">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-6 pt-10">
          <img src={currentReciter.imageUrl} alt={currentReciter.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-accent-purple shadow-lg" />
          <h1 className="text-3xl sm:text-4xl font-headings font-bold text-accent-blue transition-all duration-300 hover-neon-glow-blue">{currentReciter.name}</h1>
        </header>

        {/* Reciter Selection */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-headings text-accent-green mb-3">اختر القارئ:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {RECITERS_DATA.map((reciter) => (
              <button
                key={reciter.id}
                onClick={() => handleReciterSelection(reciter.id)}
                className={`py-2 px-4 rounded-md font-headings text-sm transition-all duration-200 border-2
                            ${currentReciter.id === reciter.id
                              ? 'bg-accent-purple text-white border-accent-purple shadow-lg hover-neon-glow-purple'
                              : 'bg-base-light-dark text-gray-300 border-gray-600 hover:border-accent-purple hover:text-white'}`}
              >
                {reciter.name.split(" - ")[0]} {/* Show only Sheikh's name */}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Surah List */}
          <div ref={surahListRef} className="lg:w-1/3 bg-base-light-dark p-4 rounded-lg shadow-xl border border-gray-700 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-headings text-accent-green mb-3">قائمة السور</h2>
            <ul>
              {SURAHS_DATA.map((surah, index) => (
                <li key={surah.id} id={`surah-item-${index}`}
                    className={`flex items-center justify-between mb-1 rounded-md hover:bg-accent-blue/10 transition-all duration-150 group ${index === currentSurahIndex ? 'surah-active' : ''}`}
                >
                  <button
                    onClick={() => handleSurahSelection(index)}
                    className={`w-full text-right p-3 rounded-md flex-grow
                                ${index === currentSurahIndex ? 'text-accent-green font-semibold' : 'text-text-off-white group-hover:text-white'}`}
                    aria-label={`تشغيل سورة ${surah.name}`}
                  >
                    {surah.id}. {surah.name} ({surah.englishName})
                    {index === currentSurahIndex && isPlaying && <i className="fas fa-volume-up text-accent-green audio-playing-indicator ml-2 float-left"></i>}
                  </button>
                  {/* Info icon removed */}
                </li>
              ))}
            </ul>
          </div>

          {/* Player Controls and Surah Text Display */}
          <div className="lg:w-2/3 bg-base-light-dark p-6 rounded-lg shadow-xl border border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-headings text-accent-purple mb-1">{currentSurahData?.name}</h2>
              <p className="text-sm text-gray-400">{currentSurahData?.englishName} - {currentSurahData?.revelationType}</p>
            </div>

            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleLocalSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
                aria-label="Track progress"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-6 text-2xl text-text-off-white">
              <button onClick={handlePreviousSurah} className="player-control-button" aria-label="Previous Surah"><i className="fas fa-step-backward"></i></button>
              <button onClick={handlePlayPause} className="player-control-button text-4xl text-accent-green" aria-label={isPlaying ? "Pause" : "Play"}>
                <i className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
              </button>
              <button onClick={handleStop} className="player-control-button" aria-label="Stop"><i className="fas fa-stop-circle"></i></button>
              <button onClick={handleNextSurah} className="player-control-button" aria-label="Next Surah"><i className="fas fa-step-forward"></i></button>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-8 px-4">
              <i className="fas fa-volume-down text-gray-400"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-1/2 sm:w-1/3 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                aria-label="Volume control"
              />
              <i className="fas fa-volume-up text-gray-400"></i>
            </div>

            {/* Current Surah Text Display */}
            <div className="my-6">
              {currentSurahData?.content && (
                <>
                  <h3 className="text-lg font-headings text-accent-blue mb-2 text-center">نص السورة الحالية:</h3>
                  <div
                    className="surah-text-content-player bg-base-dark p-3 rounded-md border border-gray-600 max-h-60 overflow-y-auto custom-scrollbar whitespace-pre-wrap leading-relaxed"
                  >
                    {currentSurahData.content.split('(').map((part, index) => {
                      if (index === 0 && !part.includes(')')) return part;
                      const verseNumberMatch = part.match(/^(\d+)\)/);
                      if (!verseNumberMatch) return part;
                      const verseNumber = verseNumberMatch[1];
                      const verseText = part.substring(verseNumberMatch[0].length);
                      return (
                        <React.Fragment key={`player-text-verse-${index}`}>
                          <span className="text-accent-yellow font-bold">({verseNumber})</span>
                          {verseText}
                        </React.Fragment>
                      );
                    }).reduce((acc: (string | JSX.Element)[], part, index, array) => {
                        acc.push(part);
                        if (index < array.length - 1 && (typeof part !== 'string' || (typeof part === 'string' && part.trim() !== ''))) {
                            acc.push(' ');
                        }
                        return acc;
                    }, [])}
                  </div>
                </>
              )}
              {/* If no content, this section will be empty, effectively removing the "not available" message. */}
            </div>


            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-headings text-accent-blue mb-3 text-center">Listening Timer</h3> {/* English Title */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="number"
                  placeholder="Hours (e.g., 1.5)"
                  value={timerInputHours}
                  onChange={handleLocalTimerInputChange}
                  disabled={isTimerActive}
                  className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-text-off-white focus:ring-accent-blue focus:border-accent-blue w-full sm:w-auto"
                  aria-label="Timer duration in hours"
                />
                <button
                  onClick={toggleTimer}
                  className={`font-headings font-semibold py-2 px-5 rounded-md text-base-dark transition-all duration-300 transform hover:scale-105
                              ${isTimerActive
                                ? 'bg-accent-red hover:bg-opacity-80 shadow-[0_0_15px_#FF4757]'
                                : 'bg-accent-green hover:bg-opacity-80 shadow-[0_0_15px_#00FFAA]'}`}
                >
                  <i className={`fas ${isTimerActive ? 'fa-stop-circle' : 'fa-hourglass-start'} mr-2`}></i>
                  {isTimerActive ? `Stop Timer (${formatTimerTime(timerRemainingSeconds)})` : 'Start Timer'}
                </button>
              </div>
              {isTimerActive && (
                <div className="text-center text-sm text-accent-purple mt-3">
                   Time Remaining: {formatTimerTime(timerRemainingSeconds)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal component removed */}
    </div>
  );
};

export default QuranPlayerPage;