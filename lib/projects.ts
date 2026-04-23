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
  },
  {
    id: "-VELORA-Paint-Factory-POS",
    title: "-VELORA-Paint-Factory-POS",
    subtitle: "JavaScript Project",
    description: "VELORA Paint Factory & Shop POS Management System.",
    seoDescription: "VELORA Paint Factory & Shop POS Management System.",
    tech: ['JavaScript'],
    link: "/projects/-VELORA-Paint-Factory-POS",
    image: "https://opengraph.githubassets.com/1/Mathiyass/-VELORA-Paint-Factory-POS",
    date: "2026-04-03",
    category: "Web"
  },
  {
    id: "EduCentral",
    title: "EduCentral",
    subtitle: "JavaScript Project",
    description: "java ant managment sowtware",
    seoDescription: "java ant managment sowtware",
    tech: ['JavaScript'],
    link: "/projects/EduCentral",
    image: "https://opengraph.githubassets.com/1/Mathiyass/EduCentral",
    date: "2025-11-24",
    category: "Web"
  },
  {
    id: "gamers-edge-pos",
    title: "gamers-edge-pos",
    subtitle: "JavaScript Project",
    description: "gamers-edge-pos",
    seoDescription: "gamers-edge-pos",
    tech: ['JavaScript'],
    link: "/projects/gamers-edge-pos",
    image: "https://opengraph.githubassets.com/1/Mathiyass/gamers-edge-pos",
    date: "2026-02-19",
    category: "Web"
  },
  {
    id: "Gamersedge",
    title: "Gamersedge",
    subtitle: "HTML Project",
    description: "computer site",
    seoDescription: "computer site",
    tech: ['HTML'],
    link: "/projects/Gamersedge",
    image: "https://opengraph.githubassets.com/1/Mathiyass/Gamersedge",
    date: "2025-11-23",
    category: "Web"
  },
  {
    id: "killer-quebes-co1301",
    title: "killer-quebes-co1301",
    subtitle: "C++ Project",
    description: "KillerQuebes - A marble-and-block bowling game built with TL-Engine TLX for CO1301 Games Concepts",
    seoDescription: "KillerQuebes - A marble-and-block bowling game built with TL-Engine TLX for CO1301 Games Concepts",
    tech: ['C++'],
    link: "/projects/killer-quebes-co1301",
    image: "https://opengraph.githubassets.com/1/Mathiyass/killer-quebes-co1301",
    date: "2026-03-08",
    category: "Game"
  },
  {
    id: "MA-Optimizer",
    title: "MA-Optimizer",
    subtitle: "TypeScript Project",
    description: "The ultimate Windows performance suite. MA Optimizer fuses deep-level OS tuning, telemettry lockdown, and input latency reduction into a buttery-smooth React & Electron interface. Unleash maximum FPS and privacy. Built for gamers, loved by power users.",
    seoDescription: "The ultimate Windows performance suite. MA Optimizer fuses deep-level OS tuning, telemettry lockdown, and input latency reduction into a buttery-smooth React & Electron interface. Unleash maximum FPS and privacy. Built for gamers, loved by power users.",
    tech: ['TypeScript'],
    link: "/projects/MA-Optimizer",
    image: "/MAportfolio/assets/img/projects/MA-Optimizer1.png",
    date: "2026-04-20",
    category: "Web"
  },
  {
    id: "MADevMarketplace",
    title: "MADevMarketplace",
    subtitle: "Kotlin Project",
    description: "Android marketplace platform",
    seoDescription: "Android marketplace platform",
    tech: ['Kotlin'],
    link: "/projects/MADevMarketplace",
    image: "https://opengraph.githubassets.com/1/Mathiyass/MADevMarketplace",
    date: "2026-04-01",
    category: "Mobile"
  },
  {
    id: "MAportfolio",
    title: "MAportfolio",
    subtitle: "HTML Project",
    description: "portfolio",
    seoDescription: "portfolio",
    tech: ['HTML'],
    link: "/projects/MAportfolio",
    image: "https://opengraph.githubassets.com/1/Mathiyass/MAportfolio",
    date: "2026-04-23",
    category: "Web"
  },
  {
    id: "MA_Chat",
    title: "MA_Chat",
    subtitle: "JavaScript Project",
    description: "Chat application",
    seoDescription: "Chat application",
    tech: ['JavaScript'],
    link: "/projects/MA_Chat",
    image: "https://opengraph.githubassets.com/1/Mathiyass/MA_Chat",
    date: "2025-10-14",
    category: "Web"
  },
  {
    id: "NIRO-NOTES",
    title: "NIRO-NOTES",
    subtitle: "TypeScript Project",
    description: "note",
    seoDescription: "note",
    tech: ['TypeScript'],
    link: "/projects/NIRO-NOTES",
    image: "https://opengraph.githubassets.com/1/Mathiyass/NIRO-NOTES",
    date: "2025-11-08",
    category: "Web"
  },
  {
    id: "preimum-portfolio-v3-mathiya",
    title: "preimum-portfolio-v3-mathiya",
    subtitle: "HTML Project",
    description: "Elite Premium Portfolio - Monochrome Design v3",
    seoDescription: "Elite Premium Portfolio - Monochrome Design v3",
    tech: ['HTML'],
    link: "/projects/preimum-portfolio-v3-mathiya",
    image: "https://opengraph.githubassets.com/1/Mathiyass/preimum-portfolio-v3-mathiya",
    date: "2026-03-24",
    category: "Web"
  }
];
