# Project Context: MATHIYA NEXUS PRIME v12.0 (Ultra Advanced)

## Core Mandates

### Guardrails
- **BRANDING**: Always use 'MATHIYA' (all-caps). Never use 'MA_Dev Portfolio'.
- **FONTS**: Use Epilogue (via Clash/Syne) for Display/Headers. Use Space Grotesk (via Satoshi/Inter) for Body and Labels. Bebas Neue for Statistics.
- **RADII**: Cards 16px (`--radius-lg`). Buttons 12px (`--radius-md`). Badges 8px. Main containers never 0px.
- **PERFORMANCE**: Maintain Lighthouse 99+ scores. Performance-budget all new features against GPU overhead (16 shaders + heavy backdrop filters).

## Design System

### Aesthetic: Ultra Advanced Premium Dark × Stitch AI
- **Colors**: Base #0F131C. Cyan #00F0FF. Red #FF525C.
- **Utilities**: 
  - `.energy-mesh`: Atmospheric radial gradients for backgrounds.
  - `.glass-refraction`: 40px blur + inset refraction borders.
  - `.glass`, `.glass-light`, `.glass-nav`: Standardized glassmorphism levels.
- **Power Rails**: Gradient top-borders (`h-[2px]`) on active cards and bento blocks.
- **Interactive Core**: BYTE mascot present on every page acting as a Contextual AI Hub.
- **Technical Ticker**: Global system status indicator at viewport bottom.

## Technical Architecture

### Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **State**: Zustand (Cursor, Byte, Audio, Theme, Loader)
- **Animations**: Framer Motion 11 + GSAP 3 (IK Tracking)
- **3D/Graphics**: React Three Fiber + 16 custom GLSL shaders (Noise, Fractal, Warp).

### Key Patterns
- **Technical Navigation Shell**: Use `SYSTEM // CATEGORIZATION // [PROTOCOL]` mono-headers on every page.
- **Skeleton with Intent**: Directional shimmer variants (`right`, `left`, `up`, `down`) for context-aware loading.
- **Mascot-as-Context-Hub**: Centralized AI state in `byteStore` for site-wide guidance.
- **CVA-Locked Architecture**: Strict variant-driven UI components for total consistency.

## Known Traps
- **Performance-Fidelity Paradox**: Backdrop filters + 16 shaders create massive paint cost. Optimize uniforms and use SSR guards for all browser APIs.
- **Hydration Mismatches**: Ensure 3D components and dynamic UI elements (Ticker, Mascot) are behind Suspense or mounted-checks.

## Project Structure
- `app/`: 22 pages + API routes (Contact, GitHub, OG).
- `components/ui/`: CVA-standardized core components.
- `components/byte/`: BYTE mascot + AI Hub components.
- `components/three/`: 16 GLSL shader components + Scene wrappers.
- `components/games/`: 6 playable arcade modules.
- `lib/shaders/`: Raw GLSL logic.
- `store/`: Zustand global state.
