import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Cpu, GitBranch } from 'lucide-react';
import { zenAudio } from '../utils/audio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Slide-over Drawer */}
      <div
        className="w-full max-w-2xl h-full bg-[#FAF7F2] p-6 sm:p-10 overflow-y-auto flex flex-col justify-between shadow-2xl border-l border-[#DEBEC8] animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-labelledby="case-study-title"
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
              <span className="text-xs font-mono-code uppercase tracking-wider text-[#8B7079] mt-15">
                PROJECT DOSSIER // ARCHITECTURE CASE STUDY
              </span>
            </div>
            <button
              onClick={() => {
                zenAudio.playKotoNote(1);
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#FCE7F3] text-[#1E1E24] border border-[#E2E8F0] flex items-center justify-center transition-colors"
              aria-label="Close dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Stage */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B]">
              <span>{project.stage}</span>
              <span>•</span>
              <span className="text-[#574048]">{project.subtitle}</span>
            </div>
            <h2 id="case-study-title" className="font-serif-jp text-3xl sm:text-4xl text-[#1E1E24] font-medium">
              {project.title}
            </h2>
            <p className="text-sm font-sans-clean text-[#574048] leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Tech Stack Strip */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono-code text-[#1E1E24]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Architecture Pipeline Flow Diagram */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#8B7079] uppercase">
              <GitBranch className="w-3.5 h-3.5 text-[#B10E6B]" />
              <span>COGNITIVE EXECUTION PIPELINE</span>
            </div>
            <div className="flex flex-col gap-2 relative pl-4 border-l-2 border-[#F472B6]">
              {project.architectureFlow.map((step, idx) => (
                <div key={step.step} className="relative flex flex-col text-xs font-sans-clean">
                  <span className="font-mono-code font-semibold text-[#1E1E24] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                    <span>0{idx + 1}. {step.step}</span>
                  </span>
                  <span className="text-[#574048] pl-3 text-[11px]">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Statement */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-jp text-lg text-[#1E1E24] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#825100]" />
              <span>The Problem</span>
            </h3>
            <p className="text-sm font-sans-clean text-[#574048] leading-relaxed bg-[#FFFBEB] p-3.5 rounded-lg border border-[#FDE68A]">
              {project.problem}
            </p>
          </div>

          {/* System Architecture */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-jp text-lg text-[#1E1E24] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#3F665C]" />
              <span>Architectural Solution</span>
            </h3>
            <p className="text-sm font-sans-clean text-[#574048] leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Implementation Highlights */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-jp text-lg text-[#1E1E24]">Implementation Highlights</h3>
            <ul className="flex flex-col gap-2 text-sm font-sans-clean text-[#574048]">
              {project.implementation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#B10E6B] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurable Outcomes */}
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-jp text-lg text-[#1E1E24] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Measurable Outcomes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-white border border-[#E2E8F0] shadow-sm">
                  <div className="text-[11px] font-mono-code uppercase text-[#8B7079]">{m.label}</div>
                  <div className="text-sm font-mono-code font-bold text-[#B10E6B] mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
            <ul className="flex flex-col gap-1.5 text-xs font-sans-clean text-[#574048]">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-8 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F5F2FB] text-[#1E1E24] border border-[#E2E8F0] text-xs font-mono-code transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          </div>

          <button
            onClick={() => {
              zenAudio.playKotoNote(2);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#B10E6B] hover:bg-[#D23284] text-white text-xs font-mono-code uppercase tracking-wider transition-colors"
          >
            Close Dossier 🌸
          </button>
        </div>
      </div>
    </div>
  );
};
