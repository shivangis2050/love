
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Heart, 
  Stars, 
  Volume2, 
  VolumeX, 
  Music, 
  LockOpen, 
  Sparkles, 
  PartyPopper,
  HeartHandshake
} from 'lucide-react';

// --- CONFIG ---
const CUTE_TUNE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; 
const SUCCESS_SONG = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; 

// --- COMPONENTS ---

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float-up text-pink-400"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <Heart className="fill-current" />
        </div>
      ))}
    </div>
  );
};

const ElusiveButton: React.FC<{ onAttempt: () => void }> = ({ onAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const moveButton = useCallback(() => {
    const padding = 100;
    const maxX = window.innerWidth / 2 - padding;
    const maxY = window.innerHeight / 2 - padding;
    const randomX = (Math.random() - 0.5) * maxX * 1.5;
    const randomY = (Math.random() - 0.5) * maxY * 1.5;
    setPosition({ x: randomX, y: randomY });
    onAttempt();
  }, [onAttempt]);

  return (
    <button
      onMouseEnter={moveButton}
      onMouseDown={moveButton}
      onClick={(e) => { e.preventDefault(); moveButton(); }}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="px-8 py-3 font-semibold text-slate-500 bg-white border-2 border-slate-200 rounded-full transition-all duration-200 ease-out shadow-sm hover:shadow-md cursor-default select-none active:scale-90"
    >
      No
    </button>
  );
};

const SuccessView: React.FC<{ isMusicPlaying?: boolean; toggleMusic?: () => void }> = ({ isMusicPlaying, toggleMusic }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-rose-400 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <Sparkles className="w-[80vw] h-[80vw] text-white animate-spin-slow" />
      </div>
      <button onClick={toggleMusic} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 border-2 border-white/30 text-white transition-all hover:bg-white/40 active:scale-95 shadow-lg">
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      <div className="relative z-10 text-center space-y-6 animate-in fade-in zoom-in duration-700 px-4">
        <div className="flex justify-center gap-4 text-white">
          <PartyPopper className="w-12 h-12 animate-bounce" />
          <Heart className="w-20 h-20 fill-white animate-pulse" />
          <PartyPopper className="w-12 h-12 animate-bounce delay-150" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-lg">I love you too!</h1>
          <h2 className="text-3xl md:text-5xl font-cursive text-pink-100 drop-shadow-md animate-pulse">Happy Valentine's Day!</h2>
          <p className="text-pink-50 text-xl md:text-2xl font-semibold max-w-md mx-auto drop-shadow-sm pt-2">My heart belongs to you forever! 💖</p>
        </div>
        <div className="flex justify-center pt-4">
           <div className="relative group">
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop" className="relative rounded-3xl border-8 border-white shadow-2xl w-64 h-64 md:w-96 md:h-96 object-cover transition-transform hover:scale-105" />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-2xl animate-bounce">
                <Heart className="text-red-500 fill-current w-8 h-8" />
              </div>
           </div>
        </div>
        {isMusicPlaying && (
          <div className="flex flex-col items-center justify-center gap-2 text-pink-100 text-base animate-pulse font-medium">
            <div className="flex items-center gap-2"><Music size={18} /> <span>Now Playing:</span></div>
            <span className="text-sm uppercase tracking-widest font-bold italic bg-black/10 px-4 py-1 rounded-full text-center">"Romantic Favorites"</span>
          </div>
        )}
        <div className="pt-6">
          <button onClick={() => window.location.reload()} className="px-10 py-4 text-pink-600 bg-white rounded-full font-bold text-lg shadow-xl hover:bg-pink-50 transition-all active:scale-95">Relive the magic</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noAttemptCount, setNoAttemptCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio play failed:", err));
    }
  };

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

  if (!isStarted) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-pink-100 overflow-hidden">
        <FloatingHearts />
        <div className="z-10 text-center space-y-8 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-white mx-4 max-w-sm">
          <Heart className="w-20 h-20 text-pink-500 fill-current mx-auto animate-pulse" />
          <div className="space-y-2">
            <h1 className="text-4xl font-cursive text-pink-600">A Surprise for You</h1>
            <p className="text-slate-500 font-medium">Click below to open my heart...</p>
          </div>
          <button onClick={startExperience} className="w-full group relative flex items-center justify-center gap-3 px-10 py-5 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-all shadow-xl hover:scale-105 active:scale-95">
            <LockOpen className="w-6 h-6" /> OPEN SURPRISE
          </button>
        </div>
        <audio ref={audioRef} src={CUTE_TUNE} loop preload="auto" />
      </div>
    );
  }

  if (hasAccepted) return <SuccessView isMusicPlaying={isPlaying} toggleMusic={toggleMusic} />;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-pink-100 via-white to-red-50">
      <FloatingHearts />
      <audio ref={audioRef} src={CUTE_TUNE} loop preload="auto" />
      
      <div className="fixed top-6 right-6 z-50">
        <button onClick={toggleMusic} className={`p-4 rounded-full bg-white shadow-xl border-2 border-pink-200 text-pink-500 transition-all ${isPlaying ? 'animate-pulse' : 'opacity-80'}`}>
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <div className="z-10 text-center space-y-12 max-w-lg w-full">
        <div className="space-y-6">
          <div className="flex justify-center gap-2 text-pink-500 mb-2 animate-bounce-slow">
            <Heart className="fill-current w-8 h-8 animate-pulse" />
            <Stars className="w-8 h-8" />
            <Heart className="fill-current w-8 h-8 animate-pulse delay-75" />
          </div>
          <h1 className="text-6xl md:text-8xl font-cursive text-pink-600 drop-shadow-sm px-2">Do you love me?</h1>
          <p className="text-slate-500 font-medium px-4 text-lg">
            {noAttemptCount === 0 ? "I have a very special question for you..." : "It's meant to be! Just click Yes! ❤️"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[160px]">
          <button
            onClick={() => setHasAccepted(true)}
            style={{ transform: `scale(${yesButtonScale})` }}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-pink-500 rounded-full hover:bg-pink-600 active:scale-95 shadow-xl z-20"
          >
            Yes! <Heart className="w-6 h-6 fill-current ml-2" />
          </button>
          
          <ElusiveButton onAttempt={() => { 
            setNoAttemptCount(prev => prev + 1); 
            setYesButtonScale(prev => Math.min(prev + 0.15, 3.5)); 
          }} />
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-xs text-pink-300 font-medium uppercase tracking-widest text-center px-4">
        Made for my favorite person
      </footer>
    </div>
  );
};

// --- MOUNT ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
