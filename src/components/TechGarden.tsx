import React, { useState } from 'react';
import { TECH_FLORA } from '../data/portfolioData';
import { TechFlora } from '../types';
import { zenAudio } from '../utils/audio';
import { Sparkles, Code2, Check, Copy } from 'lucide-react';

interface TechGardenProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const TechGarden: React.FC<TechGardenProps> = ({ onTriggerToast }) => {
  const [selectedFlora, setSelectedFlora] = useState<TechFlora>(TECH_FLORA[0]);
  const [copied, setCopied] = useState(false);

  const handleFloraClick = (flora: TechFlora, idx: number) => {
    setSelectedFlora(flora);
    zenAudio.playKotoNote(idx);
    onTriggerToast(`Inspected plant: ${flora.name} (${flora.floraName})`, flora.iconEmoji);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(selectedFlora.codeSnippet);
    setCopied(true);
    zenAudio.playKotoNote(4);
    setTimeout(() => setCopied(false), 2000);
    onTriggerToast("Code snippet copied to clipboard! 📋", "🌸");
  };

  return (
    <section id="tech-garden" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
            <span>03. LIVING ECOSYSTEM</span>
            <span className="text-[#DEBEC8]">•</span>
            <span>技術の庭 (TECH GARDEN)</span>
          </div>
          <h2 className="font-serif-jp text-3xl md:text-5xl text-[#1E1E24] font-medium tracking-tight">
            My Tech Garden 🌱
          </h2>
        </div>
        <p className="font-sans-clean text-sm sm:text-base text-[#574048] max-w-md leading-relaxed">
          Tools, frameworks, and architectures cultivated through hands-on development and real-world experiments.
        </p>
      </div>

      {/* Grid of Flora Tiles + Detailed Inspect Tray */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 8 Botanical Tech Tiles */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TECH_FLORA.map((flora, idx) => {
            const isSelected = selectedFlora.id === flora.id;
            return (
              <div
                key={flora.id}
                onClick={() => handleFloraClick(flora, idx)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[160px] group ${
                  isSelected
                    ? 'bg-white border-[#EC4899] shadow-[0_10px_25px_rgba(177,14,107,0.12)] scale-[1.03]'
                    : 'bg-white/70 hover:bg-white border-[#E2E8F0] shadow-sm hover:border-[#F472B6]/40'
                }`}
                data-cursor="flower"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                    {flora.iconEmoji}
                  </span>
                  <span className="text-[10px] font-mono-code uppercase text-[#8B7079]">
                    {flora.category.split(' ')[0]}
                  </span>
                </div>

                <div className="mt-4 flex flex-col">
                  <h4 className="font-serif-jp text-sm sm:text-base font-semibold text-[#1E1E24]">
                    {flora.name}
                  </h4>
                  <span className="text-[11px] font-sans-clean text-[#8B7079] truncate">
                    {flora.floraName}
                  </span>

                  {/* Cultivation Bar */}
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${flora.level}%`,
                        backgroundColor: isSelected ? '#EC4899' : '#3F665C'
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono-code text-[#8B7079] text-right mt-1">
                    {flora.level}% Cultivated
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed Living Flora Dossier & Code Sandbox */}
        <div className="lg:col-span-5 washi-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-[#DEBEC8]">
          <div className="flex flex-col gap-5">
            {/* Flora Banner Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedFlora.iconEmoji}</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-[#B10E6B] font-bold">
                      {selectedFlora.category}
                    </span>
                    <span className="text-xs text-[#CBD5E1]">•</span>
                    <span className="text-xs font-mono-code text-[#8B7079]">
                      {selectedFlora.level}% Mastery
                    </span>
                  </div>
                  <h3 className="font-serif-jp text-2xl text-[#1E1E24] font-medium mt-0.5">
                    {selectedFlora.name}
                  </h3>
                  <span className="text-xs font-serif-jp text-[#8B7079] italic">
                    {selectedFlora.floraName}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079]">
                BOTANICAL ESSENCE
              </span>
              <p className="text-sm font-sans-clean text-[#574048] leading-relaxed">
                {selectedFlora.description}
              </p>
            </div>

            {/* Production Usage */}
            <div className="flex flex-col gap-1.5 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#3F665C] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>IN PRODUCTION PRACTICE</span>
              </span>
              <p className="text-xs font-sans-clean text-[#574048] leading-relaxed">
                {selectedFlora.realUsage}
              </p>
            </div>

            {/* Code Snippet Box */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#8B7079]">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-[#B10E6B]" />
                  <span>IDELOG // EXCERPT</span>
                </span>
                <button
                  onClick={handleCopySnippet}
                  className="hover:text-[#1E1E24] transition-colors flex items-center gap-1 text-[11px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-lg bg-[#1E1E24] text-[#E2E8F0] font-mono-code text-xs overflow-x-auto border border-[#334155] leading-relaxed">
                <code>{selectedFlora.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
