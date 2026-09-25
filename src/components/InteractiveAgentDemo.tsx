import React, { useState } from 'react';
import { zenAudio } from '../utils/audio';
import { useMascot } from '../context/MascotContext';
import { Sparkles, Terminal, Play, CheckCircle, RefreshCw, Cpu, Layers, Moon } from 'lucide-react';

interface AgentDemoProps {
  onTriggerToast: (msg: string, icon?: string) => void;
}

export const InteractiveAgentDemo: React.FC<AgentDemoProps> = ({ onTriggerToast }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { triggerReaction, putToSleep, wakeUp } = useMascot();

  const samplePrompts = [
    {
      title: "ReAct Multi-Step Agent",
      query: "Research latest FAISS cosine similarity vector benchmarks and format a structured synthesis.",
      steps: [
        { type: "thought", text: "Thought 1: User requests recent FAISS cosine similarity vector benchmarks. Need to query DuckDuckGo search tool." },
        { type: "action", text: "Action: duckduckgo_search(query='FAISS cosine similarity vector search benchmarks p95 latency')" },
        { type: "observation", text: "Observation: Retrieved 3 verified sources: HNSW cosine index achieves <12ms p95 latency across 1M 1536-dim vectors with 98.4% recall." },
        { type: "thought", text: "Thought 2: Evidence is sufficient and grounded. Synthesizing final structured response via Pydantic schema." },
        { type: "output", text: "Final Answer: FAISS HNSW achieves sub-12ms p95 retrieval latency for 1M vectors with 98.4% recall, eliminating hallucination when paired with strict context grounding." }
      ]
    },
    {
      title: "PDF RAG Grounding System",
      query: "Analyze 120-page technical system manual: What is the maximum concurrent async worker ceiling?",
      steps: [
        { type: "thought", text: "Thought 1: Ingesting query into FAISS vector database. Generating 1536-dim query embedding." },
        { type: "action", text: "Action: faiss_similarity_search(query_vector, top_k=4, filter={'chapter': 'concurrency'})" },
        { type: "observation", text: "Observation: Retrieved Document Chunk #84 (p. 42): 'Default async worker pool max_workers=64 with Tokio runtime ceiling of 10,000 tasks/sec.'" },
        { type: "thought", text: "Thought 2: Context explicitly contains exact numeric parameter. Verifying citation integrity." },
        { type: "output", text: "Final Answer (Grounded in Manual p.42 §3.2): The maximum concurrent worker ceiling is 64 threads, sustaining up to 10,000 tasks/second without memory exhaustion." }
      ]
    }
  ];

  const handleRunSimulation = () => {
    if (isExecuting || isCompiling) return;
    setIsExecuting(true);
    setCurrentStep(0);
    zenAudio.playKotoNote(1);
    // Mascot starts typing rapidly!
    triggerReaction('typing', 6000, "Compiling & executing LangChain ReAct loops! 💻⚡");
    onTriggerToast("Autonomous ReAct agent reasoning initiated... 🌸", "sparkles");

    const stepsCount = samplePrompts[selectedPrompt].steps.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < stepsCount) {
        setCurrentStep(step);
        zenAudio.playKotoNote((step % 5) + 1);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        zenAudio.playTempleBell();
        // Mascot celebrates when reasoning finishes!
        triggerReaction('celebrating', 4000, "Agent reasoning complete! Zero hallucinations detected! 🌸🎉");
        onTriggerToast("Agent completed reasoning with verified grounding! 🌸", "check");
      }
    }, 900);
  };

  const handleCompileGraph = () => {
    if (isCompiling || isExecuting) return;
    setIsCompiling(true);
    zenAudio.playTempleBell();
    triggerReaction('sleeping', 4500, "Compiling LangGraph DAG nodes... taking a quick pause 💤");
    onTriggerToast("Compiling state graph... Disha is taking a quick zen pause 💤", "🌙");

    setTimeout(() => {
      setIsCompiling(false);
      triggerReaction('celebrating', 3500, "Compilation successful! 0 warnings, 0 errors! 🌸✨");
      onTriggerToast("Graph compilation finished! All tests verified! ✨", "🌸");
    }, 4000);
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="washi-panel rounded-3xl p-6 sm:p-10 border border-[#DEBEC8] shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#B10E6B] uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>LIVE INTERACTIVE AGENT LAB // リアクト推論</span>
            </div>
            <h3 className="font-serif-jp text-2xl sm:text-3xl text-[#1E1E24]">
              Interactive ReAct Reasoning Simulator
            </h3>
          </div>

          {/* Prompt Selector Pills */}
          <div className="flex items-center gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={p.title}
                onClick={() => {
                  setSelectedPrompt(idx);
                  setCurrentStep(0);
                  setIsExecuting(false);
                  zenAudio.playKotoNote(idx);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono-code transition-all ${
                  selectedPrompt === idx
                    ? 'bg-[#B10E6B] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F5F2FB] text-[#574048] border border-[#E2E8F0]'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Left: Query & Run Controls */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] flex flex-col gap-2">
              <span className="text-xs font-mono-code uppercase text-[#8B7079]">
                INPUT RESEARCH DIRECTIVE
              </span>
              <p className="text-sm font-sans-clean text-[#1E1E24] font-medium leading-relaxed">
                "{samplePrompts[selectedPrompt].query}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleRunSimulation}
                disabled={isExecuting || isCompiling}
                className={`flex-1 py-3.5 px-4 rounded-xl font-mono-code text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isExecuting
                    ? 'bg-[#3F665C] text-white animate-pulse'
                    : 'bg-[#1E1E24] hover:bg-[#B10E6B] text-white shadow-md hover:shadow-lg cursor-pointer'
                }`}
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Loop...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Agent Loop ⚡</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCompileGraph}
                disabled={isCompiling || isExecuting}
                className={`py-3.5 px-4 rounded-xl font-mono-code text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border ${
                  isCompiling
                    ? 'bg-[#A855F7] text-white border-[#A855F7] animate-pulse'
                    : 'bg-white hover:bg-[#F3E8FF] text-[#7E22CE] border-[#D8B4FE] shadow-sm hover:shadow cursor-pointer'
                }`}
                title="Triggers compilation & mascot sleeping state"
              >
                {isCompiling ? (
                  <>
                    <Moon className="w-4 h-4 animate-spin" />
                    <span>Compiling (Zzz...)</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" />
                    <span>Compile Graph 💤</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-mono-code text-[#8B7079] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>REASONING FRAMEWORK:</span>
                <span className="text-[#B10E6B] font-bold">LangChain ReAct</span>
              </div>
              <div className="flex items-center justify-between">
                <span>TOOL BINDING:</span>
                <span className="text-[#3F665C]">Dynamic Pydantic</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GROUNDING:</span>
                <span className="text-[#825100]">FAISS Cosine &lt; 12ms</span>
              </div>
            </div>
          </div>

          {/* Right: Live Step Execution Feed */}
          <div className="lg:col-span-7 rounded-xl bg-[#1E1E24] text-[#FAF7F2] p-5 border border-[#334155] shadow-lg flex flex-col gap-3 min-h-[300px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#334155] text-xs font-mono-code text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>agent_runtime.log</span>
              </div>
              <span>STEP {Math.min(currentStep + 1, samplePrompts[selectedPrompt].steps.length)} / {samplePrompts[selectedPrompt].steps.length}</span>
            </div>

            <div className="flex flex-col gap-3 text-xs font-mono-code overflow-y-auto max-h-[320px] pr-1">
              {samplePrompts[selectedPrompt].steps.slice(0, currentStep + 1).map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    s.type === 'thought'
                      ? 'bg-[#0F172A] border-[#38BDF8]/40 text-[#7DD3FC]'
                      : s.type === 'action'
                      ? 'bg-[#1E1B4B] border-[#818CF8]/40 text-[#A5B4FC]'
                      : s.type === 'observation'
                      ? 'bg-[#064E3B]/40 border-[#34D399]/40 text-[#6EE7B7]'
                      : 'bg-[#831843]/40 border-[#F472B6]/60 text-[#FBCFE8] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 uppercase tracking-wider text-[10px] opacity-75 mb-1">
                    {s.type === 'output' ? '🌸 VERIFIED OUTPUT' : `✦ ${s.type.toUpperCase()}`}
                  </div>
                  <div className="leading-relaxed">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
