
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import ParticlesBackground from './components/ParticlesBackground';
import BirthdayOverlay from './components/BirthdayOverlay';
import FloatingFestiveBalloons from './components/FloatingFestiveBalloons';
import TipModal from './components/TipModal';
import MainPage from './pages/MainPage';
import BlogArchivePage from './pages/BlogArchivePage';
import BlogPostPage from './pages/BlogPostPage';
import MythologyPage from './pages/MythologyPage';
import PenetrationTestingMethodologyPage from './pages/PenetrationTestingMethodologyPage';
import AdvancedPentestMythologyPage from './pages/AdvancedPentestMythologyPage';
import QuranPlayerPage from './pages/QuranPlayerPage';
import WhoIAmPage from './pages/WhoIAmPage'; // New Page Import
import { BIRTHDAY_MONTH, BIRTHDAY_DAY, SITE_NAME, BIRTHDAY_SECURITY_TIP, BIRTH_YEAR, SECURITY_TECH_TIPS } from './constants';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext'; // Import the provider
import GlobalAudioControls from './components/GlobalAudioControls'; // Import the mini player

// Helper component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Only scroll to top if not a hash link on the same page
    if (!pathname.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  const [isBirthdayModeActive, setIsBirthdayModeActive] = useState(false);
  const [isTrueBirthday, setIsTrueBirthday] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [selectedTipMessage, setSelectedTipMessage] = useState('');
  const [isBirthdayOverlayVisible, setIsBirthdayOverlayVisible] = useState(true);
  const manualHideOverlayTimerRef = useRef<number | null>(null);
  const autoHideOverlayTimerRef = useRef<number | null>(null);


  useEffect(() => {
    const today = new Date();
    const actuallyBirthday = today.getMonth() + 1 === BIRTHDAY_MONTH && today.getDate() === BIRTHDAY_DAY;
    if (actuallyBirthday) {
      setIsBirthdayModeActive(true);
      setIsTrueBirthday(true);
      setIsBirthdayOverlayVisible(true);
    }
  }, []);

  const toggleBirthdayModePreview = () => {
    if (isTrueBirthday && isBirthdayModeActive) return;
    const newMode = !isBirthdayModeActive;
    setIsBirthdayModeActive(newMode);
    if (newMode) {
        setIsBirthdayOverlayVisible(true);
    } else { // If turning birthday mode OFF
      setIsBirthdayOverlayVisible(true); // Reset overlay visibility conceptually for next activation
      if (manualHideOverlayTimerRef.current) {
        clearTimeout(manualHideOverlayTimerRef.current);
        manualHideOverlayTimerRef.current = null;
      }
      if (autoHideOverlayTimerRef.current) {
        clearTimeout(autoHideOverlayTimerRef.current);
        autoHideOverlayTimerRef.current = null;
      }
    }
  };

  const handleShowSpecialMessage = () => {
    if (SECURITY_TECH_TIPS.length > 0) {
      const randomIndex = Math.floor(Math.random() * SECURITY_TECH_TIPS.length);
      setSelectedTipMessage(SECURITY_TECH_TIPS[randomIndex]);
    } else {
      setSelectedTipMessage("Wishing you a fantastic day filled with joy and success!");
    }
    setIsTipModalOpen(true);
  };

  const handleCloseTipModal = () => {
    setIsTipModalOpen(false);
  };

  const hideBirthdayOverlayTemporarily = () => {
    if (manualHideOverlayTimerRef.current) {
      clearTimeout(manualHideOverlayTimerRef.current);
    }
    if (autoHideOverlayTimerRef.current) { // Also clear auto-hide if manual hide is triggered
        clearTimeout(autoHideOverlayTimerRef.current);
        autoHideOverlayTimerRef.current = null;
    }
    setIsBirthdayOverlayVisible(false);
    manualHideOverlayTimerRef.current = window.setTimeout(() => {
      setIsBirthdayOverlayVisible(true);
      manualHideOverlayTimerRef.current = null;
    }, 60000); // Hide for 1 minute (60000 ms)
  };

  // Effect for 30-second auto-hide of BirthdayOverlay
  useEffect(() => {
    if (isBirthdayModeActive && isBirthdayOverlayVisible) {
      if (autoHideOverlayTimerRef.current) {
        clearTimeout(autoHideOverlayTimerRef.current);
      }
      autoHideOverlayTimerRef.current = window.setTimeout(() => {
        setIsBirthdayOverlayVisible(false);
      }, 30000); // Auto-hide after 30 seconds
    } else {
      // If mode is off, or overlay is already hidden, clear the auto-hide timer
      if (autoHideOverlayTimerRef.current) {
        clearTimeout(autoHideOverlayTimerRef.current);
        autoHideOverlayTimerRef.current = null;
      }
    }
    // Cleanup for this specific timer
    return () => {
      if (autoHideOverlayTimerRef.current) {
        clearTimeout(autoHideOverlayTimerRef.current);
      }
    };
  }, [isBirthdayModeActive, isBirthdayOverlayVisible]);


  useEffect(() => {
    if (isBirthdayModeActive) {
      document.body.classList.add('birthday-celebration-active');
    } else {
      document.body.classList.remove('birthday-celebration-active');
    }
  }, [isBirthdayModeActive]);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (manualHideOverlayTimerRef.current) {
        clearTimeout(manualHideOverlayTimerRef.current);
      }
      // autoHideOverlayTimerRef cleanup is handled by its own useEffect
    };
  }, []);


  return (
    <AudioPlayerProvider>
      <HashRouter>
        <ScrollToTop />
        <ParticlesBackground isBirthdayModeActive={isBirthdayModeActive} />
        {isBirthdayModeActive && isBirthdayOverlayVisible && (
          <BirthdayOverlay
            name={SITE_NAME}
            tip={BIRTHDAY_SECURITY_TIP}
            birthYear={BIRTH_YEAR}
            onHideTemporarily={hideBirthdayOverlayTemporarily}
          />
        )}
        {isBirthdayModeActive && <FloatingFestiveBalloons />}
        {isTipModalOpen && <TipModal tip={selectedTipMessage} onClose={handleCloseTipModal} />}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pb-20"> {/* Added padding-bottom for GlobalAudioControls */}
            <Routes>
              <Route path="/" element={<MainPage isTrueBirthday={isTrueBirthday} onShowSpecialMessage={handleShowSpecialMessage} isBirthdayModeActive={isBirthdayModeActive} />} />
              <Route path="/blog" element={<BlogArchivePage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/mythology" element={<MythologyPage />} />
              <Route path="/pentest-methodology" element={<PenetrationTestingMethodologyPage />} />
              <Route path="/advanced-mythology" element={<AdvancedPentestMythologyPage />} />
              <Route path="/quran-player" element={<QuranPlayerPage />} />
              <Route path="/who-i-am" element={<WhoIAmPage />} /> {/* New Route */}
            </Routes>
          </main>
          <GlobalAudioControls /> {/* Mini player visible on all pages */}
          <Footer
            onToggleBirthdayMode={toggleBirthdayModePreview}
            isBirthdayModeActive={isBirthdayModeActive}
            isTrueBirthday={isTrueBirthday}
          />
          <BackToTopButton />
        </div>
      </HashRouter>
    </AudioPlayerProvider>
  );
};

export default App;