import {
  Brain, Code, Cpu, Database, Globe, Layers, Layout,
  Terminal, Zap, Server
} from 'lucide-react';

export const siteConfig = {
  name: 'MATHIYA Nexus Prime',
  description: 'Creative Developer & AI Engineer Portfolio',
  url: 'https://mathiya.dev',
  ogImage: 'https://mathiya.dev/og.jpg',
  links: {
    twitter: 'https://twitter.com/mathiya',
    github: 'https://github.com/mathiya',
    linkedin: 'https://linkedin.com/in/mathiya',
  },
  nav: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Games', href: '/games' },
    { name: 'Contact', href: '/contact' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Lab', href: '/lab' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'AR', href: '/ar' },
    { name: 'Resume', href: '/resume' },
    { name: 'Now', href: '/now' },
    { name: 'Uses', href: '/uses' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Open Source', href: '/open-source' },
    { name: 'Sri Lanka', href: '/sri-lanka' },
    { name: 'Colophon', href: '/colophon' },
    { name: 'Secret', href: '/secret' },
    { name: 'Admin', href: '/admin' },
  ],
};

export const skills = [
  { name: 'React / Next.js', icon: Globe, level: 95, category: 'Frontend' },
  { name: 'TypeScript', icon: Code, level: 90, category: 'Languages' },
  { name: 'Tailwind CSS', icon: Layout, level: 98, category: 'Styling' },
  { name: 'Framer Motion', icon: Layers, level: 85, category: 'Animation' },
  { name: 'WebGL / Three.js', icon: Cpu, level: 75, category: 'Graphics' },
  { name: 'Node.js', icon: Server, level: 85, category: 'Backend' },
  { name: 'PostgreSQL', icon: Database, level: 80, category: 'Database' },
  { name: 'AI Integration', icon: Brain, level: 90, category: 'AI' },
  { name: 'System Architecture', icon: Terminal, level: 85, category: 'Architecture' },
  { name: 'Performance Opt', icon: Zap, level: 80, category: 'Optimization' },
];

export const projects = [
  {
    id: 'nexus',
    title: 'Project Nexus',
    description: 'An advanced AI orchestration platform for autonomous agents.',
    longDescription: 'Nexus is a state-of-the-art AI orchestration platform that allows users to deploy, monitor, and manage swarms of autonomous agents. Built with a high-performance Rust backend and a Next.js front-end.',
    tech: ['Next.js', 'WebGL', 'Zustand', 'Rust', 'WebSockets'],
    link: '/projects/nexus',
    github: 'https://github.com/mathiya/nexus',
    image: '/projects/nexus.jpg',
    featured: true,
  },
  {
    id: 'aether',
    title: 'Aether Engine',
    description: 'Real-time volumetric rendering engine for the web.',
    longDescription: 'A custom WebGL rendering engine focused on volumetric effects, cloud simulation, and real-time path tracing directly in the browser.',
    tech: ['Three.js', 'GLSL', 'React Three Fiber', 'WebWorker'],
    link: '/projects/aether',
    github: 'https://github.com/mathiya/aether',
    image: '/projects/aether.jpg',
    featured: true,
  },
  {
    id: 'quantum',
    title: 'Quantum State',
    description: 'State management library for highly concurrent React applications.',
    longDescription: 'An experimental state management library that uses atomic principles to ensure zero-conflict concurrent state updates in complex React trees.',
    tech: ['TypeScript', 'React', 'Jotai concepts'],
    link: '/projects/quantum',
    github: 'https://github.com/mathiya/quantum',
    image: '/projects/quantum.jpg',
    featured: false,
  }
];

export const timeline = [
  {
    year: '2024',
    title: 'Senior Creative Developer',
    company: 'Nexus Innovations',
    description: 'Leading a team of developers building next-gen web experiences with AI integrations.',
  },
  {
    year: '2022',
    title: 'Full Stack Engineer',
    company: 'TechFlow',
    description: 'Architected and built scalable enterprise applications using Next.js and Node.',
  },
  {
    year: '2020',
    title: 'Frontend Developer',
    company: 'Digital Canvas',
    description: 'Focused on high-performance interactive websites and web applications.',
  },
];

export const bytePhrases = [
  "Hello! I am BYTE.",
  "Exploring the digital frontier.",
  "Processing...",
  "Let's build something amazing.",
  "System optimal.",
  "Ready for input.",
  "Analyzing user interaction...",
  "Running diagnostics...",
  "All systems green.",
  "Awaiting command.",
];

export const buzzwords = [
  "Web3", "AI", "Machine Learning", "WebGL", "React", "Next.js", "TypeScript",
  "GLSL", "Shaders", "Framer Motion", "GSAP", "Microservices", "Serverless"
];

export type SiteConfig = typeof siteConfig;
