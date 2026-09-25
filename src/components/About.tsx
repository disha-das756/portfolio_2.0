import React, { useState } from 'react';
import { zenAudio } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onTriggerToast }) => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      title: "BUILD",
      kanji: "創",
      emoji: "🌸",
      subtitle: "Architecture & Systems",
      color: "#B10E6B",
      bgLight: "bg-[#FCE7F3]",
      borderLight: "border-[#F472B6]/30",
      description: "Resilient asynchronous APIs built with Python, FastAPI, and structured Pydantic schemas.",
      highlight: "FastAPI • Clean OOP • Docker • REST APIs"
    },
    {
      title: "LEARN",
      kanji: "学",
      emoji: "🌷",
      subtitle: "AI Reasoning & RAG",
      color: "#825100",
      bgLight: "bg-[#FFDDB8]",
      borderLight: "border-[#FFB95F]/30",
      description: "Grounding LLM reasoning loops with FAISS vector search and dense semantic embeddings.",
      highlight: "ReAct Agents • FAISS • Vector Search • Embeddings"
    },
    {
      title: "EXPLORE",
      kanji: "探",
      emoji: "🌿",
      subtitle: "Multi-Agent Graphs",
      color: "#3F665C",
      bgLight: "bg-[#BEE8DC]",
      borderLight: "border-[#A6CFC3]/30",
      description: "Cyclic state workflows, multi-agent collaboration, and tool-calling routines with LangGraph.",
      highlight: "LangGraph • Cyclic State • Tool Calling • Memory"
    },
    {
      title: "CREATE",
      kanji: "美",
      emoji: "✨",
      subtitle: "Human Experience",
      color: "#B10E6B",
      bgLight: "bg-[#F5F2FB]",
      borderLight: "border-[#DEBEC8]/40",
      description: "Crafting software interfaces inspired by Japanese spatial harmony and smooth micro-interactions.",
      highlight: "Japanese Aesthetics • Polish • Accessibility"
    }
  ];

  const handlePillarHover = (index: number) => {
    setActivePillar(index);
    zenAudio.playKotoNote(index + 1);
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
            <span>01. PHILOSOPHY & BACKGROUND</span>
            <span className="text-[#DEBEC8]">•</span>
            <span>閑寂 (KANJAKU)</span>
          </div>
          <h2 className="font-serif-jp text-3xl md:text-5xl text-[#1E1E24] font-medium tracking-tight">
            A little about me 🌸
          </h2>
        </div>
        <p className="font-serif-jp text-xl md:text-2xl text-[#574048] italic">
          "Curious by nature. Engineer by practice."
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Washi Paper Editorial Card */}
        <div className="lg:col-span-7 washi-panel rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Sakura Blossom Background Motif */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FCE7F3]/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍵</span>
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079]">
                JOURNEY & MOTIVATION
              </span>
            </div>

            <h3 className="font-serif-jp text-2xl md:text-3xl text-[#1E1E24] leading-snug">
              Bridging modern AI models with dependable software engineering.
            </h3>

            <div className="flex flex-col gap-3 text-base font-sans-clean text-[#574048] leading-relaxed">
              <p>
                Based in West Bengal, I'm an AI Agent Engineer pursuing my B.Tech in Information Technology. I build autonomous workflows with explicit reasoning loops, vector retrieval, and robust FastAPI backends.
              </p>
              <p>
                Inspired by the clean simplicity of Japanese gardens, I design systems where every component exists with purpose, clarity, and grace.
              </p>
            </div>

            {/* Quick Metrics & Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-4 border-t border-[#DEBEC8]/40">
              <div className="flex flex-col">
                <span className="font-serif-jp text-2xl md:text-3xl font-semibold text-[#B10E6B]">
                  B.Tech
                </span>
                <span className="text-xs font-mono-code text-[#8B7079] uppercase">
                  Info Tech (2025)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-jp text-2xl md:text-3xl font-semibold text-[#1E1E24]">
                  LangChain
                </span>
                <span className="text-xs font-mono-code text-[#8B7079] uppercase">
                  ReAct & Tools
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-jp text-2xl md:text-3xl font-semibold text-[#825100]">
                  FAISS
                </span>
                <span className="text-xs font-mono-code text-[#8B7079] uppercase">
                  Vector RAG
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-jp text-2xl md:text-3xl font-semibold text-[#3F665C]">
                  FastAPI
                </span>
                <span className="text-xs font-mono-code text-[#8B7079] uppercase">
                  Async APIs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Interactive Floating Flower Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079]">
              CORE PILLARS (HOVER TO BLOOM)
            </span>
            <span className="text-xs font-serif-jp text-[#B10E6B] italic">四つの花</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const isHovered = activePillar === idx;
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => handlePillarHover(idx)}
                  onMouseLeave={() => setActivePillar(null)}
                  onClick={() => {
                    zenAudio.playKotoNote(idx * 2);
                    onTriggerToast(`Pillar ${pillar.title}: ${pillar.subtitle} blossomed 🌸`, pillar.emoji);
                  }}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[190px] ${
                    isHovered
                      ? 'bg-white shadow-[0_12px_30px_rgba(177,14,107,0.12)] border-[#EC4899] scale-[1.02]'
                      : 'bg-white/70 hover:bg-white border-[#E2E8F0] shadow-sm'
                  }`}
                  data-cursor="flower"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-3xl transition-transform duration-300 ${
                        isHovered ? 'scale-125 rotate-12' : ''
                      }`}
                    >
                      {pillar.emoji}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono-code text-[#8B7079] font-medium">
                        {pillar.kanji}
                      </span>
                      <span
                        className="text-xs font-mono-code font-bold uppercase tracking-wider"
                        style={{ color: pillar.color }}
                      >
                        {pillar.title}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-serif-jp text-base font-medium text-[#1E1E24]">
                      {pillar.subtitle}
                    </h4>
                    <p className="text-xs font-sans-clean text-[#574048] mt-1 line-clamp-3 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F0EBE1] text-[11px] font-mono-code text-[#8B7079]">
                    {pillar.highlight}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
