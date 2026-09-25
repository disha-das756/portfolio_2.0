import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PetalCanvas } from './components/PetalCanvas';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { InteractiveAgentDemo } from './components/InteractiveAgentDemo';
import { TechGarden } from './components/TechGarden';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MascotProvider } from './context/MascotContext';
import { zenAudio } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    icon: '🌸',
    visible: false
  });

  const showToast = (message: string, icon = '🌸') => {
    setToast({ message, icon, visible: true });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleExploreClick = () => {
    zenAudio.playTempleBell();
    if (typeof window !== 'undefined' && (window as unknown as { triggerPetalStorm?: () => void }).triggerPetalStorm) {
      (window as unknown as { triggerPetalStorm: () => void }).triggerPetalStorm();
    }
    showToast("Traveling deeper into the Sakura garden... 🌸", "🌸");
    handleNavigate('projects');
  };

  const handleChimeClick = () => {
    zenAudio.playTempleBell();
    showToast("Zen temple bell sounded (528 Hz tranquil frequency) 🎐", "bell");
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'tech-garden', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MascotProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#1E1E24] relative overflow-x-hidden selection:bg-[#FCE7F3] selection:text-[#B10E6B]">
        {/* Global Interactive Procedural Sakura Petals Overlay */}
        <PetalCanvas density={38} interactive={true} />

        {/* Custom Desktop Petal Cursor */}
        <Cursor />

        {/* Floating Navigation Header */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onChime={handleChimeClick}
        />

        {/* Main Flow of Continuous Japanese Garden Universe */}
        <main className="relative z-20">
          {/* Scene 1: Cherry Blossom Entrance & Interactive Hero Sanctuary */}
          <Hero
            onExploreClick={handleExploreClick}
            onContactClick={() => handleNavigate('contact')}
            onTriggerToast={showToast}
          />

          {/* Scene 2: Quiet Garden & Philosophy */}
          <About onTriggerToast={showToast} />

          {/* Scene 3: Projects & Miniature Garden Installations */}
          <Projects onTriggerToast={showToast} />

          {/* Interactive Lab: Live ReAct Agent & RAG Reasoning Simulator */}
          <InteractiveAgentDemo onTriggerToast={showToast} />

          {/* Scene 4: Digital Tech Garden & Botanical Living Flora */}
          <TechGarden onTriggerToast={showToast} />

          {/* Scene 5: Growth Path, Academic Journey & Sakura Career Tree */}
          <Education onTriggerToast={showToast} />

          {/* Scene 6: Evening Garden & Letter Dispatch Contact */}
          <Contact onTriggerToast={showToast} />
        </main>

        {/* Night Garden Footer */}
        <Footer />

        {/* Ambient Toast Message for Easter Eggs and Interactions */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#1E1E24]/95 text-white font-mono-code text-xs shadow-2xl backdrop-blur-xl border border-[#F472B6]/30 transition-all duration-300 flex items-center gap-2.5 pointer-events-none ${
            toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-base">{toast.icon || '🌸'}</span>
          <span>{toast.message}</span>
        </div>
      </div>
    </MascotProvider>
  );
}
