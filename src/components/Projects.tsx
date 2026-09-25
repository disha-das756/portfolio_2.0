import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { zenAudio } from '../utils/audio';
import { useMascot } from '../context/MascotContext';
import { ArrowRight, Github, Sparkles, Network, Search, Layers, Play } from 'lucide-react';

interface ProjectsProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onTriggerToast }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'agent' | 'rag' | 'creative'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { triggerReaction } = useMascot();

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleOpenProject = (project: Project) => {
    zenAudio.playKotoNote(3);
    setSelectedProject(project);
    triggerReaction('celebrating', 3500, `Opened case study: ${project.title}! 🌸✨`);
    onTriggerToast(`Opened case study: ${project.title} 🌸`, '🌸');
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
            <span>02. PORTFOLIO SHOWCASE</span>
            <span className="text-[#DEBEC8]">•</span>
            <span>作品集 (SAKUHIN)</span>
          </div>
          <h2 className="font-serif-jp text-3xl md:text-5xl text-[#1E1E24] font-medium tracking-tight">
            Things I've Built 🌸
          </h2>
        </div>

        {/* Filter Tabs (Interactive Filter Buttons adhering to frontend design guidelines) */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-[#E2E8F0] shadow-sm">
          <button
            onClick={() => {
              setActiveFilter('all');
              zenAudio.playKotoNote(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all ${
              activeFilter === 'all'
                ? 'bg-[#B10E6B] text-white shadow-sm'
                : 'text-[#57534E] hover:text-[#1E1E24]'
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => {
              setActiveFilter('agent');
              zenAudio.playKotoNote(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all ${
              activeFilter === 'agent'
                ? 'bg-[#B10E6B] text-white shadow-sm'
                : 'text-[#57534E] hover:text-[#1E1E24]'
            }`}
          >
            AI Agents
          </button>
          <button
            onClick={() => {
              setActiveFilter('rag');
              zenAudio.playKotoNote(2);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all ${
              activeFilter === 'rag'
                ? 'bg-[#B10E6B] text-white shadow-sm'
                : 'text-[#57534E] hover:text-[#1E1E24]'
            }`}
          >
            RAG & Vector
          </button>
          <button
            onClick={() => {
              setActiveFilter('creative');
              zenAudio.playKotoNote(3);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all ${
              activeFilter === 'creative'
                ? 'bg-[#B10E6B] text-white shadow-sm'
                : 'text-[#57534E] hover:text-[#1E1E24]'
            }`}
          >
            Creative Web
          </button>
        </div>
      </div>

      {/* Installations List */}
      <div className="flex flex-col gap-10">
        {filteredProjects.map((project, idx) => {
          return (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenProject(project);
                }
              }}
              className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_8px_30px_rgba(30,30,36,0.04)] hover:shadow-[0_16px_40px_rgba(177,14,107,0.08)] hover:border-[#F472B6]/60 transition-all duration-500 cursor-pointer"
              data-cursor="project"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Miniature Architectural Sandbox Diagram */}
                <div className="lg:col-span-5 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F5F2FB] p-5 border border-[#DEBEC8]/60 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                  {/* Sandbox Header */}
                  <div className="flex items-center justify-between text-xs font-mono-code text-[#8B7079]">
                    <span className="text-[#B10E6B] font-semibold">{project.stage}</span>
                    <span>installation_0{idx + 1}.graph</span>
                  </div>

                  {/* Stylized Visual Representation */}
                  <div className="my-6 flex flex-col items-center justify-center relative">
                    {project.category === 'agent' && (
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] shadow-sm text-xs font-mono-code text-[#B10E6B] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#B10E6B]" />
                            <span>ReAct Thought</span>
                          </div>
                          <span className="text-[#B10E6B]">➔</span>
                          <div className="px-3 py-1.5 rounded-lg bg-[#B10E6B] text-white shadow-sm text-xs font-mono-code flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            <span>Tool Call</span>
                          </div>
                          <span className="text-[#B10E6B]">➔</span>
                          <div className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] shadow-sm text-xs font-mono-code text-[#3F665C]">
                            Observation
                          </div>
                        </div>
                        <div className="text-[11px] font-mono-code text-[#8B7079] mt-2">
                          LangChain • Dynamic Pydantic schemas • Loop evaluation
                        </div>
                      </div>
                    )}

                    {project.category === 'rag' && (
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1.5 text-xs font-mono-code text-[#1E1E24]">
                            <Layers className="w-4 h-4 text-[#825100]" />
                            <span>PDF Chunks</span>
                          </div>
                          <span className="text-[#825100]">➔</span>
                          <div className="p-2.5 rounded-lg bg-[#FFDDB8] text-[#825100] font-semibold shadow-sm text-xs font-mono-code">
                            FAISS Vector Index
                          </div>
                          <span className="text-[#825100]">➔</span>
                          <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-mono-code text-[#10B981]">
                            Grounded Answer
                          </div>
                        </div>
                        <div className="text-[11px] font-mono-code text-[#8B7079] mt-2">
                          Sub-12ms Cosine Search • Zero Speculation
                        </div>
                      </div>
                    )}

                    {project.category === 'creative' && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-28 h-28 rounded-full bg-[#FCE7F3] border-2 border-dashed border-[#EC4899] flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }}>
                          <span className="text-3xl">🌸</span>
                        </div>
                        <div className="text-[11px] font-mono-code text-[#B10E6B] mt-1">
                          HTML5 Canvas • Web Audio • 60 FPS
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2.5 border border-[#E2E8F0]">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-[10px] font-mono-code uppercase text-[#8B7079]">
                          {m.label}
                        </span>
                        <span className="text-xs font-mono-code font-bold text-[#1E1E24]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Narrative, Badges, and Action Buttons */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8B7079]">
                    <span className="text-[#B10E6B] font-semibold">PROJECT // 0{idx + 1}</span>
                    <span>•</span>
                    <span className="uppercase">{project.subtitle}</span>
                  </div>

                  <h3 className="font-serif-jp text-2xl sm:text-3xl text-[#1E1E24] group-hover:text-[#B10E6B] transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans-clean text-sm sm:text-base text-[#574048] leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E2E8F0] text-xs font-mono-code text-[#1E1E24]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProject(project);
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#B10E6B] hover:bg-[#D23284] text-white font-sans-clean text-xs font-medium tracking-wide shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F5F2FB] text-[#1E1E24] font-mono-code text-xs border border-[#E2E8F0] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Study Full Drawer Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
