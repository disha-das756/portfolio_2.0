import React, { useState } from 'react';
import { HeroIllustration } from './HeroIllustration';
import { PERSONAL_INFO, EASTER_EGGS } from '../data/portfolioData';
import { zenAudio } from '../utils/audio';
import { useMascot } from '../context/MascotContext';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onContactClick,
  onTriggerToast
}) => {
  const [isLanternLit, setIsLanternLit] = useState(true);
  const { triggerReaction, isSleeping, wakeUp } = useMascot();

  const handleMascotClick = () => {
    if (isSleeping) {
      wakeUp();
      onTriggerToast("Disha woke up! 🌸", "👩‍💻");
    } else {
      triggerReaction('celebrating', 3200, "Yay! Thanks for saying hi! 🌸✨");
      onTriggerToast("Disha is super happy to see you! 🌸", "🌸");
    }
  };

  const handleLanternToggle = () => {
    const newState = !isLanternLit;
    setIsLanternLit(newState);
    zenAudio.playKotoNote(3);
    if (newState) {
      onTriggerToast(EASTER_EGGS.lanternMsg, '✨');
    } else {
      onTriggerToast("Lantern resting in peaceful shadow 🏮", "🌙");
    }
  };

  const handleMatchaDrink = () => {
    zenAudio.playWaterDrop();
    triggerReaction('tea', 3500, "Matcha fuel +10! Delicious and warm 🍵");
    onTriggerToast(EASTER_EGGS.matchaMsg, '🍵');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-6 md:px-12 flex flex-col justify-center">
      {/* Subtle Ambient Background Gradient Blurs */}
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-[#FCE7F3]/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-[#C1EBDF]/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-12 w-80 h-80 bg-[#FFDDB8]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Story, Title, Actions */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
            <span>{PERSONAL_INFO.eyebrow}</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <span className="font-serif-jp text-2xl md:text-3xl text-[#B10E6B] italic">
              Hello, I'm {PERSONAL_INFO.name}.
            </span>
            <h1 className="font-serif-jp text-4xl sm:text-5xl lg:text-6xl text-[#1E1E24] font-medium tracking-tight leading-[1.12]">
              I build beautiful things with code.
            </h1>
            <p className="text-base sm:text-lg font-serif-jp text-[#8B7079] italic mt-1">
              ようこそ、デジタルの庭へ 🌸
            </p>
          </div>

          {/* Supporting & Description */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-mono-code font-semibold text-[#52796F] tracking-wide">
              {PERSONAL_INFO.subheadline}
            </p>
            <p className="font-sans-clean text-base text-[#57534E] leading-relaxed max-w-xl">
              {PERSONAL_INFO.narrative}
          </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              onMouseEnter={() => {
                if (!isSleeping) triggerReaction('waving', 2500, "Explore Disha's work! 🌸");
              }}
              className="group px-7 py-3.5 rounded-full bg-[#B10E6B] hover:bg-[#D23284] text-white font-sans-clean text-sm font-medium tracking-wide shadow-[0_8px_24px_rgba(177,14,107,0.22)] hover:shadow-[0_12px_32px_rgba(177,14,107,0.35)] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <span className="group-hover:rotate-45 transition-transform duration-300">🌸</span>
            </button>

            <button
              onClick={onContactClick}
              onMouseEnter={() => {
                if (!isSleeping) triggerReaction('waving', 2000, "Say hello to Disha! 💌");
              }}
              className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#1E1E24] font-sans-clean text-sm font-medium tracking-wide border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>SAY HELLO</span>
              <span>💌</span>
            </button>

            <button
              onClick={handleMatchaDrink}
              className="w-11 h-11 rounded-full bg-[#BEE8DC]/50 hover:bg-[#BEE8DC] text-[#3F665C] border border-[#A6CFC3] flex items-center justify-center transition-all cursor-pointer"
              title="Drink warm ceremonial matcha 🍵"
            >
              <span className="text-lg">🍵</span>
            </button>
          </div>

          {/* Minimalist Tech Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#8B7079]">
            <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E2E8F0]">LangGraph</span>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E2E8F0]">Vector RAG</span>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E2E8F0]">FastAPI</span>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E2E8F0]">Python</span>
          </div>
        </div>

        {/* Right Column: Chibi Disha Hero Illustration & Interactive Sanctuary */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <HeroIllustration
            onMascotClick={handleMascotClick}
            onLanternToggle={handleLanternToggle}
            isLanternLit={isLanternLit}
            onMatchaDrink={handleMatchaDrink}
          />
        </div>
      </div>
    </section>
  );
};
