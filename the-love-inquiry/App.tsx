<script type="text/babel" data-type="module" data-presets="typescript,react" src="index.tsx"></script>
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Heart, Stars, HeartHandshake, Volume2, VolumeX, Music, LockOpen } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import ElusiveButton from './components/ElusiveButton';
import SuccessView from './components/SuccessView';

// Using extremely reliable test tracks to ensure playback
const CUTE_TUNE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; 
// Updated to a slightly more upbeat romantic track for the 'I Really Really Like You' vibe
const SUCCESS_SONG = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; 

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noAttemptCount, setNoAttemptCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start the experience and music
  const startExperience = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Audio play failed:", err));
    }
  };

  // Handle song transition when user clicks "Yes"
  useEffect(() => {
    if (hasAccepted && audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = SUCCESS_SONG;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log("Success audio blocked:", e));
      }
    }
  }, [hasAccepted, isPlaying]);

  const handleNoClickAttempt = useCallback(() => {
    setNoAttemptCount(prev => prev + 1);
    setYesButtonScale(prev => Math.min(prev + 0.15, 3));
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const handleYesClick = () => {
    setHasAccepted(true);
  };

  // Splash Screen to unlock audio
  if (!isStarted) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-pink-100 overflow-hidden">
        <FloatingHearts />
        <div className="z-10 text-center space-y-8 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-white animate-in zoom-in duration-500">
          <Heart className="w-20 h-20 text-pink-500 fill-current mx-auto animate-pulse" />
          <div className="space-y-2">
            <h1 className="text-4xl font-cursive text-pink-600">A Surprise for You</h1>
            <p className="text-slate-500 font-medium">Click below to open my heart...</p>
          </div>
          <button 
            onClick={startExperience}
            className="group relative flex items-center gap-3 px-10 py-5 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <LockOpen className="w-6 h-6" />
            OPEN SURPRISE
          </button>
        </div>
        {/* Hidden audio element to be triggered by the button click */}
        <audio ref={audioRef} src={CUTE_TUNE} loop preload="auto" />
      </div>
    );
  }

  if (hasAccepted) {
    return <SuccessView isMusicPlaying={isPlaying} toggleMusic={toggleMusic} />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-pink-100 via-white to-red-50">
      <FloatingHearts />
      
      {/* Background Music */}
      <audio ref={audioRef} src={CUTE_TUNE} loop preload="auto" />

      {/* Music Toggle Button */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <button 
          onClick={toggleMusic}
          className={`p-4 rounded-full bg-white shadow-xl border-2 border-pink-200 text-pink-500 transition-all duration-300 hover:scale-110 active:scale-95 ${isPlaying ? 'animate-pulse' : 'opacity-80'}`}
        >
          {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
        </button>
      </div>

      <div className="z-10 text-center space-y-12 max-w-lg w-full">
        <div className="space-y-6">
          <div className="flex justify-center gap-2 text-pink-500 mb-2 animate-bounce-slow">
            <Heart className="fill-current w-8 h-8 animate-pulse" />
            <Stars className="w-8 h-8" />
            <Heart className="fill-current w-8 h-8 animate-pulse delay-75" />
          </div>
          <h1 className="text-6xl md:text-8xl font-cursive text-pink-600 drop-shadow-sm">
            Do you love me?
          </h1>
          <p className="text-slate-500 font-medium px-4 text-lg">
            {noAttemptCount === 0 
              ? "I have a very special question for you..." 
              : noAttemptCount < 5 
                ? "Wait, the 'No' button is feeling shy! 🥺" 
                : "It's meant to be! Just click Yes! ❤️"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[160px]">
          <button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesButtonScale})` }}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-pink-500 rounded-full hover:bg-pink-600 active:scale-95 shadow-xl hover:shadow-pink-200/50 z-20"
          >
            <span className="relative flex items-center gap-2 text-xl">
              Yes! <Heart className="w-6 h-6 fill-current" />
            </span>
          </button>

          <ElusiveButton onAttempt={handleNoClickAttempt} />
        </div>

        <div className="pt-12 opacity-30">
           <HeartHandshake className="w-12 h-12 mx-auto text-pink-300" />
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-pink-300 font-medium uppercase tracking-widest">
        Made for my favorite person
      </footer>
    </div>
  );
};

export default App;
