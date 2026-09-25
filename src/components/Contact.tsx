import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { zenAudio } from '../utils/audio';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onTriggerToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    zenAudio.playKotoNote(3);
    onTriggerToast("Your letter is flying across the wooden bridge to Disha... 🌸", "💌");

    // Trigger petal storm
    if (typeof window !== 'undefined' && (window as unknown as { triggerPetalStorm?: () => void }).triggerPetalStorm) {
      (window as unknown as { triggerPetalStorm: () => void }).triggerPetalStorm();
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      zenAudio.playTempleBell();
      onTriggerToast("Your message reached the garden ✨", "🌸");
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSent(false);
      }, 6000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#FCE7F3]/40 to-[#F5F2FB] p-8 sm:p-12 lg:p-16 border border-[#DEBEC8] shadow-lg relative overflow-hidden">
        {/* Soft Ambient Halos */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FCE7F3]/60 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FFDDB8]/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Left Column: Invitation & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-widest">
                <span>05. INVITATION</span>
                <span className="text-[#DEBEC8]">•</span>
                <span>結び (MUSUBI)</span>
              </div>

              <h2 className="font-serif-jp text-3xl sm:text-4xl lg:text-5xl text-[#1E1E24] font-medium tracking-tight">
                Let's create something lovely. 💌
              </h2>

              <p className="font-sans-clean text-sm sm:text-base text-[#574048] leading-relaxed">
                Have an opportunity, an AI/LLM engineering role, or an interesting autonomous agent problem? I would love to connect and contribute to your team.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-col gap-4 pt-8">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-[#E2E8F0] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#B10E6B] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono-code uppercase text-[#8B7079]">Direct Email</span>
                  <span className="text-xs sm:text-sm font-mono-code font-semibold text-[#1E1E24]">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/80 hover:bg-white border border-[#E2E8F0] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#BEE8DC] flex items-center justify-center text-[#3F665C] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono-code uppercase text-[#8B7079]">Phone / WhatsApp</span>
                  <span className="text-xs sm:text-sm font-mono-code font-semibold text-[#1E1E24]">
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E2E8F0] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#FFDDB8] flex items-center justify-center text-[#825100]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono-code uppercase text-[#8B7079]">Location</span>
                  <span className="text-xs sm:text-sm font-sans-clean text-[#1E1E24]">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2E8F0] flex items-center justify-center gap-2 text-xs font-mono-code text-[#1E1E24] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center justify-center gap-2 text-xs font-mono-code transition-colors shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Washi Paper Letter Form */}
          <div className="lg:col-span-7 washi-panel rounded-2xl p-6 sm:p-10 border border-[#DEBEC8] shadow-sm flex flex-col justify-between">
            {isSent ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#BEE8DC] flex items-center justify-center text-[#3F665C] text-2xl shadow-sm">
                  🌸
                </div>
                <h3 className="font-serif-jp text-2xl text-[#1E1E24]">
                  Your message reached the garden ✨
                </h3>
                <p className="text-sm font-sans-clean text-[#574048] max-w-sm leading-relaxed">
                  Thank you for reaching out! Your letter has been delivered safely to Disha's inbox. Expect a warm reply soon.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-[#B10E6B] text-white text-xs font-mono-code uppercase tracking-wider"
                >
                  Send Another Letter 💌
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono-code uppercase text-[#8B7079]">
                      Name // お名前 <span className="text-[#EC4899]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Saki Tanaka"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E2E8F0] focus:bg-white focus:outline-none focus:border-[#EC4899] transition-all text-sm font-sans-clean"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono-code uppercase text-[#8B7079]">
                      Email // 連絡先 <span className="text-[#EC4899]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="saki@engineering.co"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E2E8F0] focus:bg-white focus:outline-none focus:border-[#EC4899] transition-all text-sm font-sans-clean"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono-code uppercase text-[#8B7079]">
                    Subject // 用件
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="AI Agent Opportunity, Project Inquiry, or Tea"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E2E8F0] focus:bg-white focus:outline-none focus:border-[#EC4899] transition-all text-sm font-sans-clean"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono-code uppercase text-[#8B7079]">
                    Message // メッセージ <span className="text-[#EC4899]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your team, challenge, or ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E2E8F0] focus:bg-white focus:outline-none focus:border-[#EC4899] transition-all text-sm font-sans-clean resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-full font-sans-clean text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                    isSubmitting
                      ? 'bg-[#3F665C] text-white animate-pulse'
                      : 'bg-[#B10E6B] hover:bg-[#D23284] text-white shadow-[0_8px_20px_rgba(177,14,107,0.25)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span>Dispatching Letter...</span>
                      <span>🌸</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <span>🌸</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
