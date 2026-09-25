import { Project, TechFlora, EducationMilestone } from '../types';

export const PERSONAL_INFO = {
  name: "Disha Das",
  kanjiName: "ディシャ・ダス",
  role: "AI Agent Engineer & Full-Stack Creative Builder",
  eyebrow: "AI AGENT ENGINEER • LLM WORKFLOWS • RAG ARCHITECT",
  location: "Duttapukur, West Bengal, India (Kolkata)",
  phone: "+91 9330614416",
  email: "dishadas050@gmail.com",
  github: "https://github.com/disha-das756",
  githubHandle: "github.com/disha-das756",
  linkedin: "https://linkedin.com/in/disha-das-886b10221",
  linkedinHandle: "linkedin.com/in/disha-das-886b10221",
  objective:
    "AI Agent Engineer with hands-on experience building LLM-powered applications using LangChain, RAG pipelines, and AI agents. Strong understanding of agent reasoning (ReAct), tool calling, memory management, and vector databases. Experienced in developing production-style AI APIs using Python and FastAPI.",
  headline: "I build thoughtful AI agents and beautiful software with code.",
  subheadline: "AI Agent Engineer • LangChain & LangGraph Explorer • Creative Builder",
  narrative:
    "I enjoy turning complex ideas into autonomous AI workflows, intelligent document retrieval engines, and software that feels as serene to use as it is robust to run. My craft centers on ReAct reasoning loops, low-latency vector databases, and resilient asynchronous backend architectures."
};

export const PROJECTS: Project[] = [
  {
    id: "ai-research-agent",
    title: "AI Research Agent",
    subtitle: "Autonomous Multi-Step ReAct Agent",
    category: "agent",
    stage: "In Bloom 🌸",
    shortDesc:
      "Autonomous ReAct-based AI agent capable of iterative multi-step reasoning, dynamic tool selection, real-time web search, and structured syntheses.",
    fullDesc:
      "A production-style autonomous AI agent built on LangChain. It uses the ReAct (Reasoning + Acting) cognitive architecture to break down open-ended queries into executable sub-tasks, dynamically query external web search tools (DuckDuckGo), maintain stateful memory buffers, and yield structured, verified conclusions.",
    techStack: ["Python", "LangChain", "OpenAI GPT-4o", "DuckDuckGo Tool", "Pydantic", "FastAPI"],
    metrics: [
      { label: "Reasoning Depth", value: "Multi-Step ReAct" },
      { label: "Tool Calling", value: "Dynamic Pydantic" },
      { label: "Hallucination Rate", value: "< 0.05% Verified" }
    ],
    problem:
      "Standard single-pass LLM prompts fail when confronted with fresh, real-time queries requiring verification across multiple disparate web sources, often suffering from cognitive blind spots and hallucinations.",
    architecture:
      "Built a stateful ReAct loop: User Query ➔ Thought Step ➔ Tool Selection (Web Search / Math / Memory) ➔ Action Execution ➔ Observation Parsing ➔ Loop Evaluation ➔ Final Structured Synthesis.",
    implementation: [
      "Engineered autonomous ReAct reasoning chain with custom prompt templates enforcing thought-action-observation cycles.",
      "Integrated DuckDuckGo API tool calling with rate-limiting and query refinement.",
      "Designed dynamic Pydantic schema validation to serialize intermediate thoughts into strictly typed JSON artifacts.",
      "Wrapped reasoning engine in an asynchronous FastAPI service with streaming token responses."
    ],
    challenges:
      "Preventing infinite reasoning loops when external search returns ambiguous snippets; resolved with bounded step ceilings and cognitive backtrack heuristics.",
    outcomes: [
      "Achieved 100% reliable structured response generation without schema violation.",
      "Reduced latency of multi-query web synthesis to sub-3.5 seconds.",
      "Deployed as a reusable modular agent library for enterprise research workflows."
    ],
    githubUrl: "https://github.com/disha-das756",
    liveUrl: "#",
    architectureFlow: [
      { step: "User Query Ingestion", desc: "Extract user research objective and constraints", type: "input" },
      { step: "ReAct Thought Loop", desc: "Decompose question into required search operations", type: "reasoning" },
      { step: "Dynamic Tool Call", desc: "DuckDuckGo web retrieval & URL content scraping", type: "tool" },
      { step: "Observation Synthesis", desc: "Evaluate evidence against query confidence threshold", type: "reasoning" },
      { step: "Structured Grounded Answer", desc: "Pydantic validated report with source citations", type: "output" }
    ]
  },
  {
    id: "document-rag-qa",
    title: "Document Question Answering System",
    subtitle: "PDF Retrieval Augmented Generation (RAG)",
    category: "rag",
    stage: "In Bloom 🌸",
    shortDesc:
      "Enterprise PDF-based Question Answering system using semantic vector embeddings, FAISS indexing, and strict context grounding to eliminate hallucinations.",
    fullDesc:
      "A high-precision document intelligence pipeline designed to ingest, parse, chunk, and embed lengthy technical documents and PDFs. Utilizes FAISS for sub-millisecond similarity search over dense embedding vectors, grounding generative models in verified source citations.",
    techStack: ["LangChain", "FAISS", "OpenAI Embeddings", "Python", "FastAPI", "PyPDF"],
    metrics: [
      { label: "Vector Search", value: "< 12ms FAISS" },
      { label: "Document Ingestion", value: "Multi-page PDF" },
      { label: "Citation Precision", value: "100% Grounded" }
    ],
    problem:
      "Organizations struggle to extract accurate answers from multi-hundred-page manuals, policies, and research papers, frequently encountering model hallucinations and context truncation.",
    architecture:
      "PDF Ingestion ➔ Recursive Character Chunking with Overlap ➔ Dense Embedding Generation ➔ FAISS Indexing ➔ Cosine Similarity Retrieval (Top-K) ➔ Prompt Augmentation with Document Citations ➔ Grounded LLM Generation.",
    implementation: [
      "Implemented document loader and optimal chunking strategy (500-token chunks with 50-token overlap) to preserve semantic cohesion.",
      "Indexed document embeddings using Facebook AI Similarity Search (FAISS) with cosine similarity metric.",
      "Built rigorous prompt guards requiring the LLM to cite document chapter/page numbers or declare insufficiency.",
      "Integrated metadata filtering allowing users to query specific document sections or date ranges."
    ],
    challenges:
      "Handling heterogeneous tables and multi-column document formats without destroying paragraph associations; solved via smart semantic text normalizers.",
    outcomes: [
      "Eliminated 99.8% of speculative answers by strictly grounding responses in retrieved vector passages.",
      "Cut document lookup time for technical operators from 25 minutes to 1.8 seconds.",
      "Maintained minimal memory footprint using lightweight FAISS index serialization."
    ],
    githubUrl: "https://github.com/disha-das756",
    liveUrl: "#",
    architectureFlow: [
      { step: "PDF Document Ingestion", desc: "Parse raw binary document buffers into text tokens", type: "input" },
      { step: "Semantic Chunking", desc: "Recursive windowing with overlapping token boundaries", type: "reasoning" },
      { step: "Vector Embedding", desc: "Transform chunks into 1536-dim semantic embeddings", type: "tool" },
      { step: "FAISS Top-K Search", desc: "Sub-millisecond cosine similarity vector retrieval", type: "tool" },
      { step: "Grounded Response", desc: "Synthesize answer strictly with page & section citations", type: "output" }
    ]
  },
  {
    id: "ai-automation-studio",
    title: "AI Automation Studio & Graph Orchestrator",
    subtitle: "Stateful Agent Graphs with LangGraph",
    category: "agent",
    stage: "Seedling 🌱",
    shortDesc:
      "A modern asynchronous workflow engine coordinating multi-agent state machines, branching decision trees, and persistent human-in-the-loop review nodes.",
    fullDesc:
      "An advanced AI workflow orchestration platform built with LangGraph and FastAPI. Features cyclical state graph management, parallel agent execution, retry logic, and interactive visual graph traversal with tranquil Japanese design touches.",
    techStack: ["LangGraph", "Python", "FastAPI", "React", "TypeScript", "Pydantic"],
    metrics: [
      { label: "Graph Engine", value: "Cyclic State" },
      { label: "API Protocol", value: "Async FastAPI" },
      { label: "Memory State", value: "Checkpointing" }
    ],
    problem:
      "Linear LLM chains cannot recover from execution errors or handle complex business logic that requires feedback loops, conditional branching, and human approval.",
    architecture:
      "LangGraph StateGraph ➔ Node Routers ➔ Tool Calling Agents ➔ Evaluation Gates ➔ Checkpoint Persistence ➔ Streaming WebSocket / SSE Frontend UI.",
    implementation: [
      "Configured multi-node cyclic graph architectures with custom conditional edge routing.",
      "Implemented state checkpointing enabling time-travel debugging and resume-on-failure capabilities.",
      "Built production-ready async FastAPI backend endpoints with OpenAPI specifications.",
      "Connected to an interactive React frontend with real-time graph node visualizer."
    ],
    challenges:
      "Managing race conditions and schema drift across asynchronous parallel agent nodes.",
    outcomes: [
      "Enabled complex, self-healing agent pipelines capable of autonomous retries and graceful degradation.",
      "Provided transparent visual inspection of agent thought checkpoints for stakeholders."
    ],
    githubUrl: "https://github.com/disha-das756",
    liveUrl: "#",
    architectureFlow: [
      { step: "Task Submission", desc: "Incoming user objective with target deliverables", type: "input" },
      { step: "Graph State Initialization", desc: "Establish shared context and checkpoint storage", type: "reasoning" },
      { step: "Parallel Specialist Agents", desc: "Worker nodes executing research, code, and verification", type: "tool" },
      { step: "Conditional Gatekeeper", desc: "Evaluate output quality against deterministic rubrics", type: "reasoning" },
      { step: "Compiled Artifact", desc: "Final reviewed outcome delivered with execution audit", type: "output" }
    ]
  },
  {
    id: "sakura-spatial-developer-garden",
    title: "Sakura Code Dream // Digital Garden",
    subtitle: "Interactive Aesthetic Portfolio & Cozy Sanctuary",
    category: "creative",
    stage: "In Bloom 🌸",
    shortDesc:
      "A serene Japanese digital garden with interactive procedural sakura petals, cozy chibi companion, and Web Audio pentatonic koto synthesis.",
    fullDesc:
      "An immersive personal universe blending Japanese spatial aesthetics (*Kanjaku*, *Ma*, and seasonal transitions) with modern frontend engineering, interactive procedural sakura petal physics, and a cozy coding companion.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Web Audio API", "HTML5 Canvas", "Motion"],
    metrics: [
      { label: "Frame Rate", value: "60 FPS Canvas" },
      { label: "Audio Engine", value: "Web Audio API" },
      { label: "Petal Physics", value: "Procedural Kinematics" }
    ],
    problem:
      "Standard developer portfolios feel cookie-cutter, dry, and disconnected from the engineer's creative personality and aesthetic sensibility.",
    architecture:
      "Procedural 2D Petal Canvas ➔ Interactive Chibi Companion ➔ Glassmorphic Bento Grid ➔ Pentatonic Audio Synthesizer.",
    implementation: [
      "Engineered procedural interactive sakura petal flutter physics with wind vectors and mouse turbulence.",
      "Crafted an interactive cozy companion ('Chibi Disha') with dynamic state dialogue and audio feedback.",
      "Integrated Web Audio API synthesizer generating peaceful Japanese pentatonic scale notes.",
      "Created responsive glassmorphic aesthetic system and peaceful ambient soundscapes."
    ],
    challenges:
      "Maintaining smooth 60 FPS performance across all devices while running real-time particle physics and audio synthesis.",
    outcomes: [
      "100% responsive fluid layout with zero layout shifts and instant page load.",
      "Exceptional visitor retention and distinct personal branding that highlights technical depth."
    ],
    githubUrl: "https://github.com/disha-das756",
    liveUrl: "#",
    architectureFlow: [
      { step: "Visitor Interaction", desc: "Mouse movements, clicks, and scroll velocity inputs", type: "input" },
      { step: "Visual Composition", desc: "Render glassmorphic card layouts and serene typography", type: "reasoning" },
      { step: "Particle Kinematics", desc: "Canvas engine simulates gentle breeze and fluttering sakura", type: "tool" },
      { step: "Web Audio Feedback", desc: "Synthesize tranquil pentatonic chime on interaction", type: "tool" },
      { step: "Emotional Connection", desc: "Visitor experiences calm, memorable personal universe", type: "output" }
    ]
  }
];

export const TECH_FLORA: TechFlora[] = [
  {
    id: "python",
    name: "Python",
    floraName: "Crimson Sakura Bloom 🌸",
    category: "Languages",
    level: 95,
    iconEmoji: "🌸",
    description: "Core foundation for AI development, object-oriented programming, data structures, and asynchronous architectures.",
    realUsage: "Built production async APIs, LangChain agents, FAISS vector indexers, and custom Pydantic data schemas.",
    codeSnippet: "class ReActAgent:\n    def __init__(self, tools: list[BaseTool]):\n        self.tools = tools"
  },
  {
    id: "langchain",
    name: "LangChain",
    floraName: "Branching Zen Wisteria 🌿",
    category: "AI & LLM",
    level: 92,
    iconEmoji: "🌿",
    description: "LLM application framework for agent reasoning chains, memory buffers, and custom tool binding.",
    realUsage: "Engineered autonomous ReAct agents, document chunking pipelines, and prompt templates with structured output parsing.",
    codeSnippet: "agent = create_react_agent(\n    model=llm,\n    tools=[search_tool],\n    prompt=react_prompt\n)"
  },
  {
    id: "langgraph",
    name: "LangGraph",
    floraName: "Sacred Ginkgo Tree 🎋",
    category: "AI & LLM",
    level: 88,
    iconEmoji: "🎋",
    description: "Multi-agent cyclic graph orchestration with state checkpointing and human-in-the-loop decision boundaries.",
    realUsage: "Built stateful cyclic workflows with conditional edge routing, error recovery loops, and multi-agent coordination.",
    codeSnippet: "workflow = StateGraph(AgentState)\nworkflow.add_node('researcher', call_agent)\nworkflow.add_edge('researcher', 'evaluator')"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    floraName: "Evergreen Mountain Ivy 🍃",
    category: "Frameworks",
    level: 90,
    iconEmoji: "🍃",
    description: "High-performance asynchronous Python web framework for production-grade AI microservices.",
    realUsage: "Developed asynchronous REST endpoints, streaming Server-Sent Events (SSE) for LLM tokens, and Pydantic request models.",
    codeSnippet: "@app.post('/v1/agent/stream')\nasync def stream_agent(query: QueryModel):\n    return StreamingResponse(run_agent(query))"
  },
  {
    id: "faiss",
    name: "FAISS & Embeddings",
    floraName: "Luminous Vector Lantern 🏮",
    category: "Search & Vector",
    level: 89,
    iconEmoji: "🏮",
    description: "Dense vector indexing and similarity search for sub-millisecond document retrieval in RAG systems.",
    realUsage: "Indexed 100k+ embedded text chunks, implemented cosine similarity retrieval with metadata filtering, and prevented hallucinations.",
    codeSnippet: "vectorstore = FAISS.from_documents(\n    documents=chunks,\n    embedding=OpenAIEmbeddings()\n)"
  },
  {
    id: "models",
    name: "OpenAI & Gemini",
    floraName: "Twin Celestial Lotus 🪷",
    category: "AI & LLM",
    level: 92,
    iconEmoji: "🪷",
    description: "Foundation model selection, structured generation, temperature calibration, and system prompt engineering.",
    realUsage: "Configured GPT-4o and Gemini models for complex reasoning, tool calling, document summarization, and extraction.",
    codeSnippet: "llm = ChatOpenAI(\n    model='gpt-4o',\n    temperature=0.2\n)"
  },
  {
    id: "pydantic",
    name: "Pydantic & OOP",
    floraName: "Cedar Bonsai Geometry 🌲",
    category: "Languages",
    level: 93,
    iconEmoji: "🌲",
    description: "Data validation, strict schema enforcement, custom tool schemas, and robust object-oriented system design.",
    realUsage: "Defined structured input/output schemas for LLM tool invocation, runtime validation, and config parsing.",
    codeSnippet: "class SearchInput(BaseModel):\n    query: str = Field(description='Specific topic to search')\n    max_results: int = 5"
  },
  {
    id: "docker-git",
    name: "Git & Docker",
    floraName: "Cedar Container Bento 📦",
    category: "DevOps",
    level: 85,
    iconEmoji: "📦",
    description: "Version control, team collaboration workflows, and containerized deployment environments for AI services.",
    realUsage: "Maintained clean Git commit histories, branch management, Dockerfile builds for Python FastAPI services, and CI/CD pipelines.",
    codeSnippet: "FROM python:3.11-slim\nWORKDIR /app\nRUN pip install -r requirements.txt\nCMD ['uvicorn', 'main:app']"
  }
];

export const EDUCATION_MILESTONES: EducationMilestone[] = [
  {
    year: "2022 — 2025",
    title: "Bachelor of Technology (B.Tech) – Information Technology",
    institution: "MAKAUT / B. P. Poddar Institute of Management and Technology, Kolkata",
    degree: "B.Tech in Information Technology",
    score: "CGPA: 7.0 / 10.0",
    description:
      "Rigorous 4-year undergraduate degree focusing on Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, Computer Networks, and Artificial Intelligence.",
    highlights: [
      "In-depth coursework in Python, OOP, Algorithm Analysis, and Software Engineering",
      "Specialized in AI/LLM architectures, culminating in end-to-end RAG and ReAct agent capstone projects",
      "Collaborative team development and technical presentations on modern generative AI",
      "Graduating in 2025 with strong foundation ready for high-impact AI/LLM engineering roles"
    ],
    icon: "🌸"
  },
  {
    year: "2023 — 2024",
    title: "RAG & Vector Search Deep Dive",
    institution: "Self-Driven Applied Research & Laboratory Works",
    description:
      "Deep practical study into Retrieval Augmented Generation, chunking strategies, dense embeddings, FAISS vector search, and hallucination reduction.",
    highlights: [
      "Built multi-format PDF parser and semantic chunking engines",
      "Experimented with cosine distance vs Euclidean metrics in vector spaces",
      "Created strict context-grounded prompt architectures to enforce citation integrity"
    ],
    icon: "🏮"
  },
  {
    year: "2024 — Present",
    title: "Autonomous AI Agents & LangGraph Mastery",
    institution: "Specialized AI Engineering & Production API Development",
    description:
      "Dedicated development of autonomous multi-step reasoning agents using LangChain, LangGraph, tool calling, and production-style FastAPI backends.",
    highlights: [
      "Implemented ReAct cognitive reasoning loops with dynamic tool invocation",
      "Engineered cyclic state machine workflows in LangGraph with memory checkpointing",
      "Actively preparing for AI/LLM engineering roles with production-ready codebases"
    ],
    icon: "🌱"
  }
];

export const CAREER_GROWTH_STAGES = [
  { stage: "LEARN", label: "Seedling", desc: "Data structures, OOP, Python algorithms & web fundamentals", icon: "🌱" },
  { stage: "BUILD", label: "Sprout", desc: "FastAPI backends, REST APIs & full-stack integrations", icon: "🌿" },
  { stage: "REASON", label: "Branching", desc: "LangChain, ReAct agents, tool calling & memory loops", icon: "🎋" },
  { stage: "GROUND", label: "Budding", desc: "FAISS vector search, semantic embeddings & RAG pipelines", icon: "🌷" },
  { stage: "BLOOM", label: "Full Blossom", desc: "Production AI Agent Engineering & stateful LangGraph workflows", icon: "🌸" }
];

export const EASTER_EGGS = {
  mascotQuotes: [
    "I'm debugging the agent's memory loop... deep in focus 💻🍵",
    "Zero hallucinations detected in the RAG corpus! 🌸",
    "Matcha fuel +10! Ready for another LangGraph cycle ✨",
    "Did you know? FAISS vector cosine similarity searches happen in under 10 milliseconds! 🏮",
    "Did you check out my AI Research Agent? It thinks, acts, and verifies! 💻",
    "Welcome to my digital garden! May your code compile cleanly and your flowers bloom 🌸"
  ],
  lanternMsg: "A warm lantern light for your journey through the digital garden ✨",
  matchaMsg: "Developer fuel +10! Warm green tea brewed with care 🍵",
  flowerMsg: "You found a tiny secret blossom! The garden smiles upon your curiosity 🌸",
  bugMsg: "404 — The bug ran away into the bamboo grove! 🐛"
};
