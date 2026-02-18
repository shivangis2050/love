
import React from 'react';
import { Heart, Sparkles, PartyPopper, Music, Volume2, VolumeX } from 'lucide-react';

interface SuccessViewProps {
  isMusicPlaying?: boolean;
  toggleMusic?: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ isMusicPlaying, toggleMusic }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-rose-400 to-pink-500 overflow-hidden">
      {/* Decorative center burst background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <Sparkles className="w-[80vw] h-[80vw] text-white animate-spin-slow" />
      </div>

      {/* Music Control in Success State */}
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 border-2 border-white/30 text-white transition-all hover:bg-white/40 active:scale-95 shadow-lg"
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className="relative z-10 text-center space-y-6 animate-in fade-in zoom-in duration-700 px-4">
        <div className="flex justify-center gap-4 text-white">
          <PartyPopper className="w-12 h-12 animate-bounce" />
          <Heart className="w-20 h-20 fill-white animate-pulse" />
          <PartyPopper className="w-12 h-12 animate-bounce delay-150" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl md:text-9xl font-cursive text-white drop-shadow-lg">
            I love you too!
          </h1>
          <h2 className="text-3xl md:text-5xl font-cursive text-pink-100 drop-shadow-md animate-pulse">
            Happy Valentine's Day!
          </h2>
          <p className="text-pink-50 text-xl md:text-2xl font-semibold max-w-md mx-auto drop-shadow-sm pt-2">
            My heart belongs to you forever! 💖
          </p>
        </div>

        {/* The Photo */}
        <div className="flex justify-center pt-4">
           <div className="relative group">
              <div className="absolute -inset-6 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop" 
                alt="Love Celebration" 
                className="relative rounded-3xl border-8 border-white shadow-2xl w-64 h-64 md:w-96 md:h-96 object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-2xl animate-bounce">
                <Heart className="text-red-500 fill-current w-8 h-8" />
              </div>
           </div>
        </div>

        {isMusicPlaying ? (
          <div className="flex flex-col items-center justify-center gap-2 text-pink-100 text-base animate-pulse font-medium">
            <div className="flex items-center gap-2">
              <Music size={18} /> <span>Now Playing our favorites:</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm uppercase tracking-widest font-bold italic drop-shadow-sm bg-black/10 px-4 py-1 rounded-full">
                "Tere Bina Na Guzara Re"
              </span>
              <span className="text-sm uppercase tracking-widest font-bold italic drop-shadow-sm bg-black/10 px-4 py-1 rounded-full">
                "I Really Really Like You"
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button 
              onClick={toggleMusic}
              className="text-white text-xs underline underline-offset-4 animate-pulse opacity-80"
            >
              Click here to play our songs
            </button>
          </div>
        )}

        <div className="pt-6">
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 text-pink-600 bg-white rounded-full font-bold text-lg hover:bg-pink-50 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            Relive the magic
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessView;
