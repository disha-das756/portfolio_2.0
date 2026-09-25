import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Bell } from 'lucide-react';
import { zenAudio } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onChime: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onChime }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech-garden', label: 'Tech Garden' },
    { id: 'education', label: 'Journey' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    zenAudio.playKotoNote(2);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const unmuted = zenAudio.toggleMute();
    setIsAudioMuted(!unmuted);
    if (unmuted) {
      zenAudio.playTempleBell();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E2E8F0]/70 py-3 shadow-[0_4px_20px_rgba(30,30,36,0.03)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-serif-jp text-xl md:text-2xl font-medium tracking-tight text-[#1E1E24] hover:text-[#B10E6B] transition-colors flex items-center gap-1.5"
        >
          <span>Disha Das</span>
          <span className="text-base text-[#EC4899]">🌸</span>
        </a>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans-clean font-medium text-[#57534E]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#B10E6B] font-semibold' : 'hover:text-[#1E1E24]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EC4899] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onChime}
            aria-label="Ring Temple Bell"
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#52796F] border border-[#E2E8F0] shadow-sm flex items-center justify-center transition-all hover:scale-105"
            title="Ring 528Hz Zen Temple Bell 🎐"
          >
            <Bell className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            aria-label={isAudioMuted ? 'Unmute Zen Sounds' : 'Mute Zen Sounds'}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#B10E6B] border border-[#FCE7F3] shadow-sm flex items-center justify-center transition-all hover:scale-105"
            title={isAudioMuted ? 'Unmute Koto Chimes' : 'Mute Sound'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E1E24] hover:bg-[#B10E6B] text-[#FAF7F2] font-sans-clean text-xs font-medium tracking-wide shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <span>Say Hello</span>
            <span>💌</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/80 border border-[#E2E8F0] flex items-center justify-center text-[#1E1E24]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Shoji Screen Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#FAF7F2]/98 backdrop-blur-xl border-b border-[#E2E8F0] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between py-2 text-left font-serif-jp text-lg text-[#1E1E24] hover:text-[#B10E6B] border-b border-[#F0EBE1]"
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="text-sm">🌸</span>}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-2 w-full py-3 rounded-xl bg-[#B10E6B] text-white font-sans-clean text-sm font-medium shadow-md flex items-center justify-center gap-2"
            >
              <span>Say Hello 💌</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
