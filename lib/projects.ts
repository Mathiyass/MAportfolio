export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  date: string;
  seoDescription?: string;
  category: 'Mobile' | 'Game' | 'Web' | 'Backend' | 'Spatial';
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "MATHIYA Marketplace",
    subtitle: "Steam for Developers",
    description: "Native Android m-commerce platform for developer assets. Built with Kotlin, Supabase, and Clean Architecture.",
    seoDescription: "A specialized native Android marketplace for high-fidelity developer assets and tools, utilizing Kotlin and Supabase.",
    tech: ["Android", "Kotlin", "Supabase", "Firebase"],
    link: "/projects/marketplace",
    image: "/images/p1-hero.jpg",
    date: "2025-01-15",
    category: "Mobile"
  },
  {
    id: "p2",
    title: "Killer Quebes",
    subtitle: "3D Arcade Adventure",
    description: "C++ 3D arcade shooter using TL-Engine. Features wave-based state machine and AABB collisions.",
    seoDescription: "A high-performance C++ 3D arcade experience built with TL-Engine, featuring advanced wave-based logic.",
    tech: ["C++", "TL-Engine", "3D", "Game Dev"],
    link: "/projects/killer-quebes",
    image: "/images/p2-hero.jpg",
    date: "2024-11-20",
    category: "Game"
  },
  {
    id: "p3",
    title: "MATHIYA Portfolio",
    subtitle: "Next.js Engineering Showcase",
    description: "A premium portfolio showcasing advanced Next.js, R3F shaders, and custom mascot IK tracking.",
    seoDescription: "An ultra-advanced Next.js portfolio leveraging R3F shaders, GSAP IK-tracking, and a custom mascot core.",
    tech: ["Next.js", "React", "TypeScript", "R3F"],
    link: "/projects/mathiya-portfolio",
    image: "/images/p3-hero.jpg",
    date: "2025-04-22",
    category: "Web"
  },
  {
    id: "p4",
    title: "Handheld Companion",
    subtitle: "JIAT HHDPII Coursework",
    description: "Android tool integrating device sensors, Room database, and Retrofit for remote data management.",
    seoDescription: "Advanced Android handheld utility for sensor integration and remote data synchronization.",
    tech: ["Android", "Kotlin", "Room", "Retrofit"],
    link: "/projects/android-companion",
    image: "/images/p4-hero.jpg",
    date: "2024-08-10",
    category: "Mobile"
  },
  {
    id: "p5",
    title: "AR Experience Engine",
    subtitle: "WebXR + ARCore",
    description: "Spatial computing platform built on WebXR and ARCore for browser-based 3D interactions.",
    seoDescription: "Next-gen spatial computing engine built on WebXR for immersive browser-based AR experiences.",
    tech: ["ARCore", "WebXR", "WebGL2", "Spatial"],
    link: "/projects/ar-engine",
    image: "/images/p5-hero.jpg",
    date: "2024-12-05",
    category: "Spatial"
  },
  {
    id: "p6",
    title: "Supabase Backend",
    subtitle: "Production Architecture",
    description: "Complex PostgreSQL schema with full RLS, real-time sync, and automated CI/CD pipelines.",
    seoDescription: "Industrial-grade Supabase backend architecture with automated deployment and RLS security.",
    tech: ["Supabase", "PostgreSQL", "Deno", "CI/CD"],
    link: "/projects/supabase-systems",
    image: "/images/p6-hero.jpg",
    date: "2025-02-10",
    category: "Backend"
  }
];
