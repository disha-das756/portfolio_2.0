import React, { useState } from 'react';
import { EDUCATION_MILESTONES, CAREER_GROWTH_STAGES } from '../data/portfolioData';
import { zenAudio } from '../utils/audio';
import { GraduationCap, Award, BookOpen, Sparkles, CheckCircle } from 'lucide-react';

interface EducationProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const Education: React.FC<EducationProps> = ({ onTriggerToast }) => {
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [selectedGrowthStage, setSelectedGrowthStage] = useState<number>(4);

  const handleMilestoneClick = (idx: number) => {
    setActiveMilestone(idx);
    zenAudio.playKotoNote(idx + 1);
    onTriggerToast(`Pathway reached: ${EDUCATION_MILESTONES[idx].title} 🌸`, '🌸');
  };

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
            <span>04. EVOLUTION & ROOTS</span>
            <span className="text-[#DEBEC8]">•</span>
            <span>軌跡 (KISEKI)</span>
          </div>
          <h2 className="font-serif-jp text-3xl md:text-5xl text-[#1E1E24] font-medium tracking-tight">
            Where I Grew 🌱
          </h2>
        </div>
        <p className="font-mono-code text-xs sm:text-sm text-[#8B7079]">
          GROWING ONE COMMIT AT A TIME: LEARN ➔ BUILD ➔ REASON ➔ GROUND ➔ BLOOM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Stepping-Stone Garden Pathway */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079]">
              ACADEMIC PATHWAY & LABORATORY MILESTONES
            </span>
            <span className="text-xs text-[#52796F] font-mono-code">MAKAUT ➔ AI AGENTS</span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DEBEC8]/60 flex flex-col gap-8">
            {EDUCATION_MILESTONES.map((item, idx) => {
              const isSelected = activeMilestone === idx;
              return (
                <div
                  key={item.title}
                  onClick={() => handleMilestoneClick(idx)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#EC4899] shadow-[0_10px_30px_rgba(177,14,107,0.1)] scale-[1.01]'
                      : 'bg-white/70 hover:bg-white border-[#E2E8F0] shadow-sm'
                  }`}
                >
                  {/* Stepping Stone Node Indicator */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[43px] top-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all ${
                      isSelected
                        ? 'bg-[#B10E6B] text-white ring-4 ring-[#FCE7F3]'
                        : 'bg-white text-[#574048] border border-[#DEBEC8]'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono-code font-bold text-[#B10E6B]">
                        {item.year}
                      </span>
                      {item.score && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#BEE8DC]/60 text-[#3F665C] text-xs font-mono-code font-semibold">
                          {item.score}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-jp text-lg sm:text-xl font-medium text-[#1E1E24]">
                      {item.title}
                    </h3>

                    <div className="text-xs font-sans-clean font-medium text-[#52796F] flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>{item.institution}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans-clean text-[#574048] mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex flex-col gap-1.5">
                      {item.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs font-sans-clean text-[#574048]">
                          <span className="text-[#B10E6B] font-bold mt-0.5">•</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Career Journey Sakura Tree Growth Visualization */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="washi-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#DEBEC8] shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌸</span>
                  <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079]">
                    GROWTH METAPHOR
                  </span>
                </div>
                <span className="text-xs font-mono-code text-[#B10E6B] font-semibold">
                  Stage {selectedGrowthStage + 1} of 5
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif-jp text-2xl text-[#1E1E24]">
                  Growing One Commit at a Time
                </h3>
                <p className="text-xs font-sans-clean text-[#574048] leading-relaxed">
                  Like a cherry blossom tree weathering seasonal rains to produce vibrant blossoms, my engineering capabilities have evolved stage-by-stage through persistent practice and hands-on laboratory experimentation.
                </p>
              </div>

              {/* Dynamic Bonsai / Tree ASCII & Visual representation */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-[#FAF7F2] to-[#FCE7F3]/40 border border-[#DEBEC8] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="text-5xl transition-all duration-500 transform hover:scale-110">
                  {selectedGrowthStage === 0 && '🌱'}
                  {selectedGrowthStage === 1 && '🌿'}
                  {selectedGrowthStage === 2 && '🎋'}
                  {selectedGrowthStage === 3 && '🌷'}
                  {selectedGrowthStage === 4 && '🌸'}
                </div>

                <div className="font-serif-jp text-xl font-medium text-[#1E1E24] mt-3">
                  {CAREER_GROWTH_STAGES[selectedGrowthStage].stage} // {CAREER_GROWTH_STAGES[selectedGrowthStage].label}
                </div>
                <p className="text-xs font-sans-clean text-[#574048] mt-1 max-w-xs">
                  {CAREER_GROWTH_STAGES[selectedGrowthStage].desc}
                </p>
              </div>

              {/* Interactive Stage Selector Bar */}
              <div className="flex items-center justify-between gap-1 pt-2">
                {CAREER_GROWTH_STAGES.map((s, idx) => {
                  const isSelected = selectedGrowthStage === idx;
                  return (
                    <button
                      key={s.stage}
                      onClick={() => {
                        setSelectedGrowthStage(idx);
                        zenAudio.playKotoNote(idx);
                        onTriggerToast(`Growth stage: ${s.stage} (${s.label}) 🌸`, s.icon);
                      }}
                      className={`flex-1 py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'bg-[#B10E6B] text-white shadow-sm'
                          : 'bg-white hover:bg-[#F5F2FB] text-[#574048] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className="text-xs">{s.icon}</span>
                      <span className="text-[10px] font-mono-code uppercase font-semibold">
                        {s.stage}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Available for Roles Callout */}
              <div className="p-4 rounded-xl bg-[#BEE8DC]/50 border border-[#A6CFC3] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3F665C] animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-xs font-mono-code font-bold text-[#00201A]">
                      CAREER READINESS
                    </span>
                    <span className="text-[11px] font-sans-clean text-[#274E45]">
                      Actively preparing for AI/LLM & Agent Engineering roles
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono-code text-[#3F665C] font-semibold">
                  Graduating 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
