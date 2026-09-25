import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { zenAudio } from '../utils/audio';
import { Terminal, Heart, Sparkles, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1E1E24] text-[#FAF7F2] pt-20 pb-12 px-6 md:px-12 border-t border-[#334155] relative overflow-hidden">
      {/* Background Soft Lantern Glows */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#EC4899]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#334155]">
          {/* Brand Identity & Mascot Sleep Silhouette */}
          <div className="flex items-center gap-5">
            <div
              className="w-14 h-14 rounded-2xl bg-[#2D2D35] border border-[#F472B6]/30 flex items-center justify-center text-2xl shadow-inner cursor-pointer hover:scale-105 transition-transform"
              onClick={() => zenAudio.playKotoNote(2)}
              title="Disha resting in the cherry garden: 'Compiling dreams... 💤'"
            >
              <span>👩‍💻🌸</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-jp text-2xl font-medium tracking-tight text-white">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-sm font-serif-jp text-[#F472B6]">ディシャ・ダス</span>
              </div>
              <span className="text-xs font-mono-code text-[#94A3B8]">
                {PERSONAL_INFO.role}
              </span>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="px-4 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center gap-3 font-mono-code text-xs text-[#38BDF8] shadow-md">
            <Terminal className="w-4 h-4 text-[#F472B6]" />
            <span>console.log(<span className="text-[#A7F3D0]">"see you soon 🌸"</span>);</span>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-mono-code text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[#F472B6] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-1 text-[#E2E8F0] font-sans-clean">
            <span>Built with code, curiosity & a little Sakura magic. 🌸</span>
          </div>

          <div className="text-[11px] text-[#64748B]">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
