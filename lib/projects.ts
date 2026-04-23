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
  gallery?: string[];
  github?: string;
}

export const projects: Project[] = [
  {
    id: "MA-Optimizer",
    title: "MA-Optimizer",
    subtitle: "OS Kernel & Latency Optimization Suite",
    description: "The ultimate Windows performance suite. MA Optimizer fuses deep-level OS tuning, telemetry lockdown, and input latency reduction into a buttery-smooth React & Electron interface. Built for competitive gaming and professional workstations.",
    seoDescription: "An advanced Windows optimization suite featuring deep-level kernel tuning, telemetry suppression, and input latency reduction protocols.",
    tech: ['TypeScript', 'React', 'Electron', 'Rust'],
    link: "/projects/MA-Optimizer",
    image: "/MAportfolio/assets/img/projects/MA-Optimizer1.png",
    gallery: [
      "/MAportfolio/assets/img/projects/MA-Optimizer1.png",
      "/MAportfolio/assets/img/projects/MA-Optimizer2.png"
    ],
    date: "2026-04-20",
    category: "Web",
    github: "https://github.com/Mathiyass/MA-Optimizer"
  },
  {
    id: "p1",
    title: "MATHIYA Marketplace",
    subtitle: "Asset Nexus for Developers",
    description: "A centralized commerce node for high-fidelity developer assets. Featuring real-time licensing, automated deployment pipelines, and a native Android architecture optimized for mobile scale.",
    seoDescription: "A specialized native Android marketplace for high-fidelity developer assets, featuring Kotlin-based clean architecture and real-time Supabase synchronization.",
    tech: ["Android", "Kotlin", "Supabase", "Firebase"],
    link: "/projects/marketplace",
    image: "/MAportfolio/assets/img/projects/p1-hero.png",
    date: "2025-01-15",
    category: "Mobile",
    github: "https://github.com/Mathiyass/MADevMarketplace"
  },
  {
    id: "p2",
    title: "Killer Quebes",
    subtitle: "High-Performance 3D Arcade Core",
    description: "A high-octane 3D arcade experience built on the custom TL-Engine. Implements complex state machines, AABB collision detection, and procedural wave generation for an immersive tactical shooter experience.",
    seoDescription: "A high-performance C++ 3D arcade experience featuring advanced wave-based logic, custom physics, and optimized rendering on the TL-Engine.",
    tech: ["C++", "TL-Engine", "3D", "Game Dev"],
    link: "/projects/killer-quebes",
    image: "/MAportfolio/assets/img/projects/p2-hero.png",
    date: "2024-11-20",
    category: "Game",
    github: "https://github.com/Mathiyass/killer-quebes-co1301"
  },
  {
    id: "p3",
    title: "MATHIYA Nexus Prime",
    subtitle: "Ultra-Advanced Portfolio Protocol",
    description: "The definitive engineering showcase. Leveraging Next.js 15, Framer Motion, and complex GLSL shaders to deliver a cybernetic, high-performance interface with custom mascot integration and system-wide state management.",
    seoDescription: "The official MATHIYA Nexus Prime portfolio. An ultra-advanced Next.js engineering showcase featuring R3F shaders, GSAP IK-tracking, and a cybernetic interface.",
    tech: ["Next.js", "React", "TypeScript", "R3F"],
    link: "/projects/mathiya-portfolio",
    image: "/MAportfolio/assets/img/projects/p3-hero.png",
    date: "2025-04-22",
    category: "Web",
    github: "https://github.com/Mathiyass/MAportfolio"
  },
  {
    id: "p4",
    title: "Handheld Companion",
    subtitle: "Hardware Diagnostic & Telemetry Node",
    description: "A comprehensive diagnostic utility for mobile hardware. Integrates low-level sensor telemetry, persistent Room databases, and Retrofit-driven remote synchronization for cross-device performance monitoring.",
    seoDescription: "Advanced Android handheld utility featuring hardware sensor integration, real-time telemetry, and persistent data synchronization protocols.",
    tech: ["Android", "Kotlin", "Room", "Retrofit"],
    link: "/projects/android-companion",
    image: "/MAportfolio/assets/img/projects/p4-hero.png",
    date: "2024-08-10",
    category: "Mobile"
  },
  {
    id: "p5",
    title: "AR Experience Engine",
    subtitle: "Spatial Computing & WebXR Framework",
    description: "A spatial intelligence platform bridging physical and digital domains. Built on WebXR and ARCore, it delivers low-latency 3D interactions and environment-aware overlays directly through the browser.",
    seoDescription: "A next-generation spatial computing framework built on WebXR for immersive, browser-based augmented reality experiences.",
    tech: ["ARCore", "WebXR", "WebGL2", "Spatial"],
    link: "/projects/ar-engine",
    image: "/MAportfolio/assets/img/projects/p5-hero.png",
    date: "2024-12-05",
    category: "Spatial"
  },
  {
    id: "p6",
    title: "Supabase Backend Node",
    subtitle: "Distributed Production Architecture",
    description: "An industrial-grade backend infrastructure utilizing PostgreSQL with Row-Level Security, automated CI/CD deployment logic, and real-time data propagation nodes for high-availability applications.",
    seoDescription: "Industrial-grade Supabase backend architecture featuring complex PostgreSQL schemas, automated CI/CD, and RLS-secured data nodes.",
    tech: ["Supabase", "PostgreSQL", "Deno", "CI/CD"],
    link: "/projects/supabase-systems",
    image: "/MAportfolio/assets/img/projects/p6-hero.png",
    date: "2025-02-10",
    category: "Backend",
    github: "https://github.com/Mathiyass/SupabaseBackend"
  },
  {
    id: "-VELORA-Paint-Factory-POS",
    title: "VELORA Paint Protocol",
    subtitle: "Industrial POS & Inventory System",
    description: "A mission-critical management system for the VELORA Paint Factory. Optimized for inventory precision, real-time sales tracking, and industrial-scale operational logic.",
    seoDescription: "A comprehensive industrial POS and management system for the VELORA Paint Factory, optimized for supply chain precision.",
    tech: ['JavaScript', 'HTML', 'CSS'],
    link: "/projects/-VELORA-Paint-Factory-POS",
    image: "/MAportfolio/assets/img/projects/velora-hero.png",
    date: "2026-04-03",
    category: "Web",
    github: "https://github.com/Mathiyass/-VELORA-Paint-Factory-POS"
  },
  {
    id: "EduCentral",
    title: "EduCentral",
    subtitle: "Academic Logistics Platform",
    description: "A robust management suite for academic organizations. Streamlining administrative tasks, student telemetry, and resource allocation through a centralized digital hub.",
    seoDescription: "A centralized academic logistics and management platform designed to streamline institutional operations and student data tracking.",
    tech: ['Java', 'Swing', 'SQL'],
    link: "/projects/EduCentral",
    image: "/MAportfolio/assets/img/projects/educentral-hero.png",
    date: "2025-11-24",
    category: "Web",
    github: "https://github.com/Mathiyass/EduCentral"
  },
  {
    id: "gamers-edge-pos",
    title: "GamersEdge POS",
    subtitle: "Retail Operations Interface",
    description: "A specialized retail management system for gaming hardware vendors. Featuring automated stock alerts, transactional integrity, and a hardware-focused product schema.",
    seoDescription: "A specialized retail management system optimized for gaming hardware and peripheral inventory management.",
    tech: ['JavaScript', 'HTML', 'CSS'],
    link: "/projects/gamers-edge-pos",
    image: "/MAportfolio/assets/img/projects/gamersedge-pos-hero.png",
    date: "2026-02-19",
    category: "Web",
    github: "https://github.com/Mathiyass/gamers-edge-pos"
  },
  {
    id: "Gamersedge",
    title: "GamersEdge Portal",
    subtitle: "E-Commerce Core",
    description: "A high-bandwidth computer hardware storefront. Designed for high conversion with a focus on technical specifications and hardware compatibility visualization.",
    seoDescription: "A high-performance computer hardware e-commerce portal focused on technical specifications and user-centric retail experiences.",
    tech: ['HTML', 'CSS', 'JS'],
    link: "/projects/Gamersedge",
    image: "/MAportfolio/assets/img/projects/gamersedge-portal-hero.png",
    date: "2025-11-23",
    category: "Web",
    github: "https://github.com/Mathiyass/Gamersedge"
  },
  {
    id: "killer-quebes-co1301",
    title: "KillerQuebes TLX",
    subtitle: "Experimental Physics Game",
    description: "A marble-physics based bowling and tactical destruction game. Built with TL-Engine TLX to explore advanced rigidbody mechanics and procedural level logic.",
    seoDescription: "An experimental physics-based game exploring marble mechanics and procedural destruction using TL-Engine TLX.",
    tech: ['C++'],
    link: "/projects/killer-quebes-co1301",
    image: "/MAportfolio/assets/img/projects/killerquebes-hero.png",
    date: "2026-03-08",
    category: "Game",
    github: "https://github.com/Mathiyass/killer-quebes-co1301"
  },
  {
    id: "MADevMarketplace",
    title: "MA_Dev Marketplace V1",
    subtitle: "Kotlin Android Prototype",
    description: "The initial mobile architecture for the MA_Dev asset network. Focused on native performance and clean UI design patterns on the Android platform.",
    seoDescription: "A foundational Android marketplace prototype showcasing clean architecture and native Kotlin performance.",
    tech: ['Kotlin'],
    link: "/projects/MADevMarketplace",
    image: "/MAportfolio/assets/img/projects/madev-marketplace-hero.png",
    date: "2026-04-01",
    category: "Mobile",
    github: "https://github.com/Mathiyass/MADevMarketplace"
  },
  {
    id: "MAportfolio",
    title: "MATHIYA Nexus Portfolio",
    subtitle: "Legacy Web Archive",
    description: "The preceding iteration of the MATHIYA portfolio system. Exploring minimalist aesthetics and foundational web protocols prior to the Nexus Prime upgrade.",
    seoDescription: "A legacy version of the MATHIYA portfolio showcasing minimalist design and foundational web development techniques.",
    tech: ['HTML', 'CSS', 'JS'],
    link: "/projects/MAportfolio",
    image: "/MAportfolio/assets/img/projects/legacy-portfolio-hero.png",
    date: "2026-04-23",
    category: "Web",
    github: "https://github.com/Mathiyass/MAportfolio"
  },
  {
    id: "MA_Chat",
    title: "MA_Chat Protocol",
    subtitle: "Real-time Communication Hub",
    description: "A decentralized chat application enabling low-latency communication nodes. Built with a focus on real-time data synchronization and secure messaging channels.",
    seoDescription: "A real-time communication platform focused on low-latency data synchronization and secure messaging protocols.",
    tech: ['JavaScript', 'Firebase'],
    link: "/projects/MA_Chat",
    image: "/MAportfolio/assets/img/projects/machat-hero.png",
    date: "2025-10-14",
    category: "Web",
    github: "https://github.com/Mathiyass/MA_Chat"
  },
  {
    id: "NIRO-NOTES",
    title: "NIRO-NOTES",
    subtitle: "TypeScript Information Node",
    description: "A sophisticated note-taking and information organization system. Leveraging TypeScript for type-safe data handling and a focus on clean, focused writing environments.",
    seoDescription: "A type-safe information management system and note-taking application built with TypeScript.",
    tech: ['TypeScript', 'Next.js'],
    link: "/projects/NIRO-NOTES",
    image: "/MAportfolio/assets/img/projects/nironotes-hero.png",
    date: "2025-11-08",
    category: "Web",
    github: "https://github.com/Mathiyass/NIRO-NOTES"
  },
  {
    id: "preimum-portfolio-v3-mathiya",
    title: "Monochrome V3",
    subtitle: "Legacy Design Concept",
    description: "An elite premium portfolio iteration focused on monochrome design languages and minimalist layout structures. A precursor to the current high-fidelity architecture.",
    seoDescription: "An elite premium monochrome portfolio concept focusing on minimalist design and minimalist layout structures.",
    tech: ['HTML', 'CSS'],
    link: "/projects/preimum-portfolio-v3-mathiya",
    image: "/MAportfolio/assets/img/projects/monochrome-v3-hero.png",
    date: "2026-03-24",
    category: "Web",
    github: "https://github.com/Mathiyass/preimum-portfolio-v3-mathiya"
  }
];
