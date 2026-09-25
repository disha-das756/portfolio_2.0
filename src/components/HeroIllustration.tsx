import React, { useState } from 'react';
import heroImage from '../assets/image.jpg';
import { useMascot } from '../context/MascotContext';
import { zenAudio } from '../utils/audio';
import { Flame, Coffee, Wind } from 'lucide-react';

interface HeroIllustrationProps {
  onMascotClick?: () => void;
  onLanternToggle?: () => void;
  isLanternLit?: boolean;
  onMatchaDrink?: () => void;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({
  onMascotClick,
  onLanternToggle,
  isLanternLit = true,
  onMatchaDrink,
}) => {
  const { mascotState, triggerReaction, mascotQuote, isSleeping, wakeUp, putToSleep } = useMascot();
  const [heartPops, setHeartPops] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Audio feedback
    zenAudio.playKotoNote(4);

    // Heart pop micro-animation at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now(), x, y };
    setHeartPops((prev) => [...prev.slice(-4), newHeart]);
    setTimeout(() => {
      setHeartPops((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    // Trigger mascot reaction & quote
    if (isSleeping) {
      wakeUp();
    } else {
      triggerReaction('celebrating', 3200, 'Yay! Thanks for hanging out with me! 🌸✨');
    }

    // Trigger petal burst
    if (typeof window !== 'undefined' && (window as unknown as { triggerPetalStorm?: () => void }).triggerPetalStorm) {
      (window as unknown as { triggerPetalStorm: () => void }).triggerPetalStorm();
    }

    if (onMascotClick) {
      onMascotClick();
    }
  };

  const handleShakeSakura = (e: React.MouseEvent) => {
    e.stopPropagation();
    zenAudio.playWindChime();
    if (typeof window !== 'undefined' && (window as unknown as { triggerPetalStorm?: () => void }).triggerPetalStorm) {
      (window as unknown as { triggerPetalStorm: () => void }).triggerPetalStorm();
    }
    triggerReaction('waving', 2500, 'Petals fluttering all around! 🌸🍃');
  };

  const getStatusBadge = () => {
    switch (mascotState) {
      case 'sleeping':
        return { label: 'Compiling Dreams 💤', dot: 'bg-[#A855F7]' };
      case 'typing':
        return { label: 'Writing Code 💻', dot: 'bg-[#10B981]' };
      case 'compiling':
        return { label: 'Compiling DAG Graph ⚙️', dot: 'bg-[#0284C7]' };
      case 'tea':
        return { label: 'Matcha Break 🍵', dot: 'bg-[#F59E0B]' };
      case 'celebrating':
        return { label: 'Celebrating! 🎉', dot: 'bg-[#EC4899]' };
      case 'waving':
        return { label: 'Waving Hello! 👋', dot: 'bg-[#EC4899]' };
      default:
        return { label: 'In The Zone 🌸', dot: 'bg-[#EC4899]' };
    }
  };

  const status = getStatusBadge();

  return (
    <div className="relative w-full flex flex-col gap-3 select-none">
      {/* Outer Card with Dynamic Lighting Halo */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FCE7F3]/70 via-[#FBCFE8]/30 to-[#FFE4E6]/50 p-2 md:p-3 transition-all duration-700 border border-[#FBCFE8] shadow-[0_20px_60px_rgba(177,14,107,0.12)] ${
          isLanternLit ? 'ring-2 ring-[#F59E0B]/30' : ''
        }`}
      >
        {/* Soft Ambient Radial Glow Behind Image */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 blur-2xl ${
            isLanternLit ? 'opacity-40 bg-[#FBBF24]/20' : 'opacity-10 bg-white/10'
          }`}
        />

        {/* Main Image Container */}
        <div
          onClick={handleImageClick}
          className="relative w-full aspect-square max-h-[520px] rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-inner cursor-pointer group"
          title="Click to interact with Disha & shower sakura petals! 🌸"
        >
          {/* Hero Illustration */}
          <img
            src={heroImage}
            alt="Chibi Disha with hair bun, glasses, and cozy sakura hoodie coding on her pink laptop beside a green plant and coffee"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="eager"
          />

          {/* Floating Subtle Shimmer Highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E24]/30 via-transparent to-white/15 pointer-events-none" />

          {/* Top-Left Live Status Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-sm text-xs font-mono-code text-[#1E1E24]">
              <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
              <span className="font-semibold text-[#B10E6B]">Chibi Disha</span>
            </div>
          </div>

          {/* Top-Right Ambient Badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={handleShakeSakura}
              className="px-3 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#FBCFE8] shadow-sm text-xs font-mono-code text-[#B10E6B] transition-all flex items-center gap-1 hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              title="Shower Sakura Petals 🌸"
            >
              <Wind className="w-3 h-3 text-[#B10E6B]" />
              <span>🌸 Petals</span>
            </button>
          </div>

          {/* Interactive Speech Bubble Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#F472B6]/30 text-xs font-mono-code text-[#1E1E24] transition-all duration-300 flex items-center gap-2.5 group-hover:border-[#B10E6B]/50">
              <span className="text-base flex-shrink-0">
                {isSleeping ? '💤' : '👩‍💻'}
              </span>
              <span className="text-[#574048] italic truncate">
                "{mascotQuote}"
              </span>
            </div>
          </div>

          {/* Heart Pop Click Animations */}
          {heartPops.map((pop) => (
            <div
              key={pop.id}
              className="absolute pointer-events-none text-2xl animate-out fade-out zoom-out duration-1000 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pop.x, top: pop.y }}
            >
              🌸
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quick-Action Toolbar Strip */}
      <div className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E8F0] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-[#57534E]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              zenAudio.playKotoNote(2);
              if (isSleeping) {
                wakeUp();
              } else {
                putToSleep();
              }
            }}
            className="hover:text-[#B10E6B] transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#FAF7F2]"
            title={isSleeping ? 'Wake up Disha' : 'Send Disha to sleep'}
          >
            <span>{isSleeping ? '☀️ Wake Up' : '🌙 Nap Time'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {onLanternToggle && (
            <button
              onClick={onLanternToggle}
              className="text-[#825100] hover:text-[#B45309] transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#FEF3C7]/60"
            >
              <Flame className={`w-3.5 h-3.5 ${isLanternLit ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-stone-400'}`} />
              <span>{isLanternLit ? 'Extinguish' : 'Light'} Lantern 🏮</span>
            </button>
          )}

          <span className="text-[#CBD5E1]">|</span>

          {onMatchaDrink && (
            <button
              onClick={onMatchaDrink}
              className="text-[#3F665C] hover:text-[#115E59] transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#CCFBF1]/50"
            >
              <Coffee className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Matcha 🍵</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
