export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "MA_Dev Marketplace",
    subtitle: "Steam for Developers",
    description: "Native Android m-commerce platform for developer assets. Built with Kotlin, Supabase, and Clean Architecture.",
    tech: ["Android", "Kotlin", "Supabase", "Firebase"],
    link: "/projects/marketplace",
    image: "/images/p1-hero.jpg",
    date: "2025-01-15"
  },
  {
    id: "p2",
    title: "Killer Quebes",
    subtitle: "3D Arcade Adventure",
    description: "C++ 3D arcade shooter using TL-Engine. Features wave-based state machine and AABB collisions.",
    tech: ["C++", "TL-Engine", "3D", "Game Dev"],
    link: "/projects/killer-quebes",
    image: "/images/p2-hero.jpg",
    date: "2024-11-20"
  },
  {
    id: "p3",
    title: "MATHIYA Portfolio",
    subtitle: "Next.js Engineering Showcase",
    description: "A premium portfolio showcasing advanced Next.js, R3F shaders, and custom mascot IK tracking.",
    tech: ["Next.js", "React", "TypeScript", "R3F"],
    link: "/projects/mathiya-portfolio",
    image: "/images/p3-hero.jpg",
    date: "2025-04-22"
  },
  {
    id: "p4",
    title: "Handheld Companion",
    subtitle: "JIAT HHDPII Coursework",
    description: "Android tool integrating device sensors, Room database, and Retrofit for remote data management.",
    tech: ["Android", "Kotlin", "Room", "Retrofit"],
    link: "/projects/android-companion",
    image: "/images/p4-hero.jpg",
    date: "2024-08-10"
  },
  {
    id: "p5",
    title: "AR Experience Engine",
    subtitle: "WebXR + ARCore",
    description: "Spatial computing platform built on WebXR and ARCore for browser-based 3D interactions.",
    tech: ["ARCore", "WebXR", "WebGL2", "Spatial"],
    link: "/projects/ar-engine",
    image: "/images/p5-hero.jpg",
    date: "2024-12-05"
  },
  {
    id: "p6",
    title: "Supabase Backend",
    subtitle: "Production Architecture",
    description: "Complex PostgreSQL schema with full RLS, real-time sync, and automated CI/CD pipelines.",
    tech: ["Supabase", "PostgreSQL", "Deno", "CI/CD"],
    link: "/projects/supabase-systems",
    image: "/images/p6-hero.jpg",
    date: "2025-02-10"
  }
];
