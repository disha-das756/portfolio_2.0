export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'agent' | 'rag' | 'backend' | 'creative';
  stage: 'In Bloom 🌸' | 'Evergreen 🌲' | 'Harvested 🌾' | 'Seedling 🌱';
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  architecture: string;
  implementation: string[];
  challenges: string;
  outcomes: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureFlow: { step: string; desc: string; type: 'input' | 'reasoning' | 'tool' | 'output' }[];
}

export interface TechFlora {
  id: string;
  name: string;
  floraName: string;
  category: 'AI & LLM' | 'Languages' | 'Frameworks' | 'Search & Vector' | 'DevOps';
  level: number;
  iconEmoji: string;
  description: string;
  realUsage: string;
  codeSnippet: string;
}

export interface EducationMilestone {
  year: string;
  title: string;
  institution: string;
  degree?: string;
  score?: string;
  description: string;
  highlights: string[];
  icon: string;
}
