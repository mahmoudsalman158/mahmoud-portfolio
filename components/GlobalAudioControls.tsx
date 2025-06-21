import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AudioPlayerContext } from '../contexts/AudioPlayerContext';

const GlobalAudioControls: React.FC = () => {
  const {
    isPlaying,
    currentSurahData,
    currentReciter,
    handlePlayPause,
    handleNextSurah,
    handlePreviousSurah,
    isPlayerInitialized,
  } = useContext(AudioPlayerContext);

  if (!isPlayerInitialized || !currentSurahData || !currentReciter) {
    return null; // Don't render if nothing has been played yet or data isn't ready
  }

  return (
    <div className="global-audio-controls" dir="rtl">
      <div className="track-info">
        <span className="surah-name">سورة: {currentSurahData.name}</span>
        <span className="mx-1">-</span>
        <span className="reciter-name">القارئ: {currentReciter.name.split(" - ")[0]}</span>
      </div>
      <div className="controls">
        <button onClick={handlePreviousSurah} aria-label="السورة السابقة">
          <i className="fas fa-step-backward"></i>
        </button>
        <button onClick={handlePlayPause} className="play-pause-btn" aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}>
          <i className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
        </button>
        <button onClick={handleNextSurah} aria-label="السورة التالية">
          <i className="fas fa-step-forward"></i>
        </button>
      </div>
      <Link to="/quran-player" className="open-full-player-link" title="فتح المشغل الكامل">
        <i className="fas fa-expand-alt"></i>
      </Link>
    </div>
  );
};

export default GlobalAudioControls;
