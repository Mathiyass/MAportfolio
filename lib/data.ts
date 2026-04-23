import {
  Brain, Code, Cpu, Database, Globe, Layers, Layout,
  Terminal, Zap, Server
} from 'lucide-react';

export const siteConfig = {
  name: 'MATHIYA Nexus Prime',
  description: 'Founder & CEO of SIVION — AI Systems Architect & Creative Engineer',
  url: 'https://mathiya.dev',
  ogImage: 'https://mathiya.dev/og.jpg',
  links: {
    github: 'https://github.com/Mathiyass',
    linkedin: 'https://www.linkedin.com/in/mathisha-angirasa-a955941a2/',
    twitter: 'https://x.com/__Mathiya__',
    facebook: 'https://www.facebook.com/mathisha.angirasa/',
    instagram: 'https://www.instagram.com/mathi_ya_/',
    steam: 'https://steamcommunity.com/profiles/76561199076879396/',
    epic: 'https://store.epicgames.com/u/4cf7fef90a78425f951ae11dcd24222b',
    spotify: 'https://open.spotify.com/user/6grrenymxnzrrvbp2dbe4ikxm',
    discord: 'https://discord.gg/z3k3NVxuqY',
    whatsapp: 'https://wa.me/94715921984',
    email: 'mathishaangirasass@gmail.com',
    eaid: 'M_MATHIYA_M'
  },
  nav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Games', href: '/games' },
    { name: 'Contact', href: '/contact' },
    { name: 'Lab', href: '/lab' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Resume', href: '/resume' },
    { name: 'Now', href: '/now' },
    { name: 'Timeline', href: '/timeline' },
  ],
};

export const skills = [
  { name: 'LLM Orchestration', icon: Brain, level: 96, category: 'AI' },
  { name: 'Agentic Swarms', icon: Cpu, level: 94, category: 'AI' },
  { name: 'Neural Architectures', icon: Database, level: 88, category: 'AI' },
  { name: 'RAG Pipeline Engineering', icon: Layers, level: 95, category: 'AI' },
  { name: 'Next.js 15 / React 19', icon: Code, level: 98, category: 'Engineering' },
  { name: 'Python / PyTorch', icon: Server, level: 90, category: 'Engineering' },
  { name: 'GLSL / WebGL2', icon: Zap, level: 92, category: 'Graphics' },
  { name: 'Enterprise Architecture', icon: Terminal, level: 93, category: 'Architecture' },
];

export const projects = [
  {
    id: 'sivion-nexus',
    title: 'SIVION Nexus',
    description: 'Autonomous AI orchestration swarm for enterprise automation.',
    longDescription: 'Nexus is the flagship SIVION product—a distributed intelligence layer that orchestrates hundreds of specialized agents to solve complex industrial problems in real-time.',
    tech: ['Next.js 15', 'TypeScript', 'FastAPI', 'VectorDB', 'GLSL'],
    link: '/projects/nexus',
    github: 'https://github.com/SIVION-AI-PVT/nexus',
    image: '/projects/nexus.jpg',
    featured: true,
  },
  {
    id: 'quantum-vanguard',
    title: 'Quantum Vanguard',
    description: 'High-performance WebGL2 engine for neural visualizations.',
    longDescription: 'A custom rendering engine designed for real-time visualization of high-dimensional vector spaces and neural network activations with extreme fidelity.',
    tech: ['WebGL2', 'GLSL', 'React Three Fiber', 'GPU Computation'],
    link: '/projects/vanguard',
    github: 'https://github.com/SIVION-AI-PVT/vanguard',
    image: '/projects/vanguard.jpg',
    featured: true,
  },
  {
    id: 'aether-core',
    title: 'Aether Core',
    description: 'Distributed state synchronization for agentic networks.',
    longDescription: 'A low-latency communication protocol built for high-frequency synchronization between distributed AI agents operating in shared environments.',
    tech: ['Rust', 'WebRTC', 'Protobuf', 'WASM'],
    link: '/projects/aether',
    github: 'https://github.com/SIVION-AI-PVT/aether',
    image: '/projects/aether.jpg',
    featured: true,
  }
];

export const timeline = [
  {
    year: '2024 - PRESENT',
    title: 'Founder & CEO',
    company: 'SIVION',
    description: 'Directing the strategic evolution of SIVION AI Solutions as CEO. Architecting enterprise-grade multi-agent frameworks and high-velocity digital ecosystems.',
  },
  {
    year: '2023 - 2024',
    title: 'Lead Systems Architect',
    company: 'NEXUS PRIME (Prototype)',
    description: 'Spearheaded the development of the initial Nexus protocol, integrating advanced WebGL rendering with early-stage LLM agents.',
  },
  {
    year: '2022 - 2023',
    title: 'AI Engineering Lead',
    company: 'TechFlow Systems',
    description: 'Designed and deployed distributed neural architectures for real-time data processing and visualization.',
  },
  {
    year: '2020 - 2022',
    title: 'Full-Stack Developer',
    company: 'Digital Canvas',
    description: 'Focused on high-performance interactive interfaces and cloud-native applications.',
  },
];

export const blogPosts = [
  {
    id: "multi-agent-orchestration",
    title: "The SIVION Methodology: Multi-Agent Orchestration at Scale",
    excerpt: "Architecting autonomous swarms that resolve complex industrial logic in sub-millisecond latencies.",
    date: "2025-04-12",
    readTime: "12 min",
    category: "AI Architecture",
    featured: true
  },
  {
    id: "webgl2-neural-viz",
    title: "Visualizing High-Dimensional Latent Spaces with WebGL2",
    excerpt: "How we render 1024-dimensional vector embeddings in real-time using custom GLSL shaders.",
    date: "2025-03-28",
    readTime: "15 min",
    category: "Graphics",
    featured: false
  },
  {
    id: "enterprise-rag-pipelines",
    title: "Hardening RAG Pipelines for Enterprise Compliance",
    excerpt: "Implementing advanced semantic search strategies with zero-trust AI protocols.",
    date: "2025-02-15",
    readTime: "10 min",
    category: "Data Engineering",
    featured: false
  }
];

export const marketplaceItems = [
  {
    id: "nexus-core-ui",
    title: "SIVION Nexus UI Kit",
    description: "The complete React/Next.js design system used in SIVION products.",
    price: "$299",
    category: "UI/UX",
    tech: ["React 19", "Tailwind 4", "Framer Motion"]
  },
  {
    id: "agentic-swarm-starter",
    title: "Agentic Swarm Starter",
    description: "A production-ready framework for orchestrating multiple LLM agents.",
    price: "$499",
    category: "AI",
    tech: ["Python", "FastAPI", "LangGraph"]
  },
  {
    id: "quantum-shader-pack",
    title: "Quantum Shader Pack",
    description: "16 premium GLSL shaders for high-fidelity web backgrounds.",
    price: "$149",
    category: "Graphics",
    tech: ["GLSL", "Three.js"]
  }
];

export const nowData = {
  focusingOn: [
    "Scaling SIVION Nexus for enterprise-level multi-agent orchestration.",
    "Refining the 'Aether Core' low-latency communication protocol for AI swarms.",
    "Designing spatial interfaces for high-fidelity 3D data visualization.",
    "Establishing strategic partnerships for SIVION's next expansion phase."
  ],
  learning: [
    "Advanced GPU computation for localized LLM inference.",
    "Rust-based high-performance systems engineering.",
    "Strategic leadership and enterprise scaling operations."
  ]
};

export const bytePhrases = [
  "Hello! I am BYTE, your SIVION interface.",
  "Neural link established with Nexus Core.",
  "Agent swarm orchestration active.",
  "System stability: Nominal.",
  "SIVION protocols engaged.",
  "Analyzing vector similarity across SIVION datasets...",
  "Running diagnostics on Agent Swarm 01...",
  "All systems green.",
  "Founder identity verified: MATHIYA.",
  "Awaiting command from Command Center.",
];

export const buzzwords = [
  "SIVION", "AI Swarms", "LLM Orchestration", "WebGL2", "React 19", "Next.js 15",
  "Vector Search", "GLSL", "Neural Nets", "RAG", "Multi-Agent Systems", "GPU Shaders"
];

export type SiteConfig = typeof siteConfig;
