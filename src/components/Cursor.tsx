import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<'default' | 'button' | 'project' | 'flower'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only active on desktop (no touch)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="flower"]') || target.closest('.cursor-flower')) {
        setHoverState('flower');
      } else if (target.closest('[data-cursor="project"]') || target.closest('.cursor-project')) {
        setHoverState('project');
      } else if (target.closest('button') || target.closest('a') || target.closest('[role="button"]') || target.closest('.clickable')) {
        setHoverState('button');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden md:block"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      aria-hidden="true"
    >
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          hoverState === 'flower'
            ? 'w-12 h-12 bg-[#FCE7F3]/90 shadow-[0_0_24px_rgba(236,72,153,0.45)] border border-[#EC4899]/40'
            : hoverState === 'project'
            ? 'w-14 h-14 bg-[#1E1E24]/90 text-[#FAF7F2] shadow-[0_4px_20px_rgba(30,30,36,0.3)] border border-[#F472B6]/30'
            : hoverState === 'button'
            ? 'w-10 h-10 bg-[#EC4899]/85 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] scale-110'
            : 'w-6 h-6 bg-[#FBCFE8]/70 border border-[#F472B6]/40 shadow-[0_0_12px_rgba(244,114,182,0.3)]'
        }`}
      >
        {hoverState === 'flower' && (
          <span className="text-xs animate-spin" style={{ animationDuration: '8s' }}>
            🌸
          </span>
        )}
        {hoverState === 'project' && (
          <span className="text-[9px] font-mono-code tracking-wider uppercase text-[#FBCFE8]">
            VIEW 🌸
          </span>
        )}
        {hoverState === 'button' && (
          <span className="text-[8px] font-mono-code uppercase font-semibold">
            ✨
          </span>
        )}
        {hoverState === 'default' && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] opacity-80" />
        )}
      </div>
    </div>
  );
};
