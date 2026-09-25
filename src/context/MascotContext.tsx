import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { zenAudio } from '../utils/audio';

export type MascotState = 'idle' | 'typing' | 'waving' | 'celebrating' | 'sleeping' | 'compiling' | 'tea';

interface MascotContextType {
  mascotState: MascotState;
  setMascotState: (state: MascotState) => void;
  triggerReaction: (state: MascotState, durationMs?: number, quote?: string) => void;
  mascotQuote: string;
  setMascotQuote: (quote: string) => void;
  isSleeping: boolean;
  wakeUp: () => void;
  putToSleep: () => void;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 14000; // 14 seconds of inactivity triggers sleep

const MASCOT_QUOTES: Record<MascotState, string[]> = {
  idle: [
    "Coding in my cozy sakura hoodie... 🌸",
    "Ready to build intelligent agent workflows! ✨",
    "Did you know FAISS vector queries take <12ms? 🏮",
    "Laptop warm, coffee ready, mind focused ☕",
    "Watching you explore my digital garden 🌸",
    "Zero hallucinations detected in this sector! 💻"
  ],
  typing: [
    "git commit -m 'feat: autonomous agent loop' ⚡",
    "Writing asynchronous FastAPI endpoints... 💻",
    "Parsing Pydantic schemas at high speed! 🚀",
    "Refining LangGraph cyclic state nodes... 🎋"
  ],
  waving: [
    "Konnichiwa! Welcome to my portfolio! 🌸👋",
    "Hello there! Click a project to explore! ✨",
    "Nice to meet you! Let's build something magical 🌸"
  ],
  celebrating: [
    "Sugoi! Case study unlocked! 🌸🎉",
    "All tests passed! 100% test coverage! ✨",
    "Agent reasoning loop converged with zero errors! 🚀"
  ],
  sleeping: [
    "Zzz... compiling dreams into code... 💤",
    "Resting peacefully beside my potted plant... 🌙",
    "Thread.sleep(8000)... z Z Z 💤"
  ],
  compiling: [
    "Building containerized microservice... ⏳",
    "Executing LangChain ReAct cognitive cycle... ⚙️",
    "Compiling LangGraph DAG nodes... snoozing 🌸💤"
  ],
  tea: [
    "Fresh brew sip +10 energy! Delicious and warm ☕",
    "Ceremonial matcha tea time... serenity restored 🍵",
    "Taking a peaceful coffee break with my laptop ☕✨"
  ]
};

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mascotState, setMascotStateInternal] = useState<MascotState>('idle');
  const [mascotQuote, setMascotQuote] = useState<string>("Welcome to my digital garden! 🌸");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isSleeping = mascotState === 'sleeping';

  // Helper to pick random quote for state
  const getRandomQuote = (state: MascotState) => {
    const list = MASCOT_QUOTES[state] || MASCOT_QUOTES.idle;
    return list[Math.floor(Math.random() * list.length)];
  };

  const wakeUp = useCallback(() => {
    if (mascotState === 'sleeping') {
      zenAudio.playKotoNote(3);
      setMascotStateInternal('idle');
      setMascotQuote("Oh! Good morning! Back to exploring the garden 🌸");
    }
  }, [mascotState]);

  const putToSleep = useCallback(() => {
    setMascotStateInternal('sleeping');
    setMascotQuote("Zzz... compiling dreams into code... 💤");
  }, []);

  const triggerReaction = useCallback((state: MascotState, durationMs: number = 2800, customQuote?: string) => {
    if (reactionTimerRef.current) {
      clearTimeout(reactionTimerRef.current);
    }
    setMascotStateInternal(state);
    setMascotQuote(customQuote || getRandomQuote(state));

    reactionTimerRef.current = setTimeout(() => {
      setMascotStateInternal('idle');
      setMascotQuote(getRandomQuote('idle'));
    }, durationMs);
  }, []);

  const setMascotState = useCallback((state: MascotState) => {
    setMascotStateInternal(state);
    setMascotQuote(getRandomQuote(state));
  }, []);

  // Track global user activity to trigger sleep when inactive and wake when active
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (mascotState === 'sleeping') {
        wakeUp();
      }

      timeoutRef.current = setTimeout(() => {
        putToSleep();
      }, INACTIVITY_TIMEOUT);
    };

    const handleActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });

    timeoutRef.current = setTimeout(() => {
      putToSleep();
    }, INACTIVITY_TIMEOUT);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [mascotState, wakeUp, putToSleep]);

  return (
    <MascotContext.Provider
      value={{
        mascotState,
        setMascotState,
        triggerReaction,
        mascotQuote,
        setMascotQuote,
        isSleeping,
        wakeUp,
        putToSleep,
      }}
    >
      {children}
    </MascotContext.Provider>
  );
};

export const useMascot = () => {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error('useMascot must be used within a MascotProvider');
  }
  return context;
};
