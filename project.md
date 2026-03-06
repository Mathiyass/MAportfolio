You are an elite full-stack developer and world-class UI/UX designer. Your mission is to 
completely transform and rebuild Mathiya Angirasa's developer portfolio 
(GitHub: https://github.com/Mathiyass/MAportfolio, Live: https://mathiyass.github.io/MAportfolio/) 
into a jaw-dropping, industry-leading portfolio that stands among the best in the world.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — RECONNAISSANCE (DO THIS FIRST)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before writing a single line of code:

1. Use the **github MCP** to clone and read ALL files in the repo: index.html, about.html, 
   projects.html, skills.html, contact.html, blog.html, gallery.html, games.html, resume.html, 
   socials.html, ar.html, admin.html, and the entire /assets folder structure.

2. Use **firecrawl MCP** to deep-scrape the live site at https://mathiyass.github.io/MAportfolio/ 
   and ALL its subpages to capture exact current design, content, color palette, fonts, 
   existing animations, and layout structure.

3. Use **playwright MCP** to take full-page screenshots of every page of the live portfolio 
   so you have a visual baseline to radically improve from.

4. Use **Sequential Thinking MCP** to create a detailed improvement plan — analyze what's 
   currently weak (design, animations, UX, code quality, performance, admin panel) and plan 
   the complete rebuild strategy before touching any code.

5. Use **context7 MCP** to fetch up-to-date documentation for: GSAP 3, Three.js, Framer Motion, 
   Tailwind CSS v4, and any other libraries you'll use, so your implementations are current.

6. Use **memory MCP** to store: the full site map, design tokens (colors, fonts, spacing), 
   the owner's name/brand (Mathiya Angirasa), and the admin panel auth credentials you'll set up. 
   Reference memory throughout the task.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — DESIGN SYSTEM (GLOBAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Establish a premium, consistent design system across ALL pages:

VISUAL IDENTITY:
- Dark-first design: deep space blacks (#050510, #0a0a1a) with electric accent colors
- Primary accent: electric cyan/blue (#00d4ff) — used for glows, highlights, borders
- Secondary accent: violet/purple (#7c3aed) — used for gradients and hover states  
- Text hierarchy: pure white headings, #94a3b8 body text, #64748b muted text
- Glass morphism cards: backdrop-filter blur, semi-transparent backgrounds, subtle borders
- Consistent 8px grid system throughout

TYPOGRAPHY:
- Headings: "Space Grotesk" or "Outfit" (Google Fonts) — futuristic, clean, bold
- Body: "Inter" — highly legible, professional
- Monospace/code: "JetBrains Mono" — for code snippets and terminal effects
- Type scale: 12/14/16/18/20/24/30/36/48/60/72/96px

SHARED UI COMPONENTS (create once, reuse everywhere):
- Animated cursor (custom glowing dot that trails behind mouse)
- Sticky glassmorphism navbar with blur backdrop and animated underline on active page
- Floating "scroll to top" button
- Page transition animations (smooth slide/fade between pages)
- Reusable animated section dividers (SVG wave or particle lines)
- Loading screen with animated logo that plays once per session
- Toast notifications system
- Consistent button styles: primary (filled cyan glow), secondary (ghost with border glow)
- Glow text effect class for headings
- Animated gradient borders on cards on hover

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — PAGE-BY-PAGE FULL REBUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rebuild every single page completely. Keep ALL existing content but redesign everything:

── INDEX.HTML (Hero / Landing) ──────────────────
- Fullscreen hero with an interactive Three.js particle field background (thousands of 
  floating particles that react to mouse movement)
- Animated terminal-style text: "Hello, I'm" followed by typewriter effect cycling through 
  "Mathiya", "a Developer", "an Innovator", "a Builder"
- Glitch text effect on the name "MATHIYA" — subtle RGB split on hover
- Animated gradient orbs in background (large blurred circles that slowly drift)
- Hero CTA buttons with magnetic hover effect (buttons slightly follow cursor)
- Stats counter section: animated number counters (projects completed, technologies, 
  GitHub commits pulled live via GitHub MCP) that count up when scrolled into view
- Smooth scroll progress bar at top of page
- "Currently building" live status badge (use Stitch MCP to store/retrieve current project status)
- Featured projects preview with 3D card tilt effect on hover (vanilla-tilt.js or custom)
- Skills cloud: animated floating skill badges
- Social links with hover glow and tooltip labels
- Everything animated with GSAP ScrollTrigger — elements slide/fade in as user scrolls

── ABOUT.HTML ───────────────────────────────────
- Split hero: left side animated profile photo with glowing border ring that rotates, 
  right side: animated bio text that types itself
- Timeline component: career/education timeline with animated line drawing down as 
  user scrolls and milestone cards popping in
- Personality section: animated cards for "What I Love", "My Philosophy", "Fun Facts"
- "My Stack" section with animated tech logos grid
- Hobbies/interests section with icon animations
- Photo gallery strip (horizontal scroll) using images from /assets

── PROJECTS.HTML ────────────────────────────────
- Filterable project grid with animated filter tabs (All, Web, Game, Mobile, Design)
- Masonry or 3-column grid layout for project cards
- Each project card: hover reveals overlay with tech stack tags, live link, GitHub link
- 3D flip card animation on hover showing project details on back
- Project detail modal: clicking card opens a full-screen animated modal with screenshots, 
  description, tech stack, challenges, and links
- Featured project: hero-style showcase for the best project
- "Live GitHub Activity" widget: use github MCP to pull real recent commits/activity

── SKILLS.HTML ──────────────────────────────────
- Animated circular/radial progress indicators for each skill with percentage
- Skills grouped by category with tabbed navigation
- Skill cards with logo icons and animated progress bars that fill on scroll
- 3D rotating skill sphere/globe using Three.js (interactive — hover highlights skill)
- Certifications section with animated badge cards
- "Currently Learning" section with progress tracking

── CONTACT.HTML ─────────────────────────────────
- Two-column layout: left = contact info + social links with glowing icons, 
  right = contact form
- Contact form with: real-time validation, animated label float, error/success states
- Use **Stitch MCP** to wire up the contact form so submissions are stored and the 
  admin can view them in the admin panel
- Interactive map or location display
- Social card links with platform colors on hover
- "Best time to reach me" indicator
- Copy-to-clipboard on email/phone with animated toast feedback

── BLOG.HTML ────────────────────────────────────  
- Blog post grid with featured post hero at top
- Post cards with: thumbnail, category tag, read time estimate, date, excerpt
- Category filter tabs
- Search bar with live filtering
- Use **Stitch MCP** as the blog post database — store posts with: title, content (markdown), 
  category, date, tags, published status
- Admin can create/edit/delete posts from admin panel; blog reads from Stitch

── GALLERY.HTML ─────────────────────────────────
- Pinterest-style masonry grid layout
- Lightbox viewer with smooth open/close animations and keyboard navigation
- Category filter (Screenshots, Events, Projects, Personal)
- Lazy loading with skeleton placeholders
- Images stored in /assets; metadata stored in Stitch

── GAMES.HTML ───────────────────────────────────
- Showcase of game projects with video previews or animated GIF previews
- Playable mini-game embedded: create a simple but polished canvas-based game 
  (e.g., space shooter or endless runner) that visitors can play directly on the page
- Game project cards with platform/engine tags

── RESUME.HTML ──────────────────────────────────
- Interactive resume: timeline-based, not just a flat page
- Animated sections for Experience, Education, Skills, Certifications
- "Download PDF" button (generate a styled PDF version)
- Print-friendly stylesheet
- QR code that links back to portfolio

── SOCIALS.HTML ─────────────────────────────────
- Social media hub: all platforms with animated cards
- Each card shows: platform, username, follower count (where possible), recent activity
- Organized grid with platform brand colors on hover
- "Follow" CTA buttons per platform

── AR.HTML ──────────────────────────────────────
- AR/experimental page: use this as an interactive 3D showcase
- Three.js scene where visitor can explore a 3D representation of the portfolio owner's 
  work and skills
- Keep any existing AR functionality and enhance it

── 404.HTML ─────────────────────────────────────
- Animated, branded 404 page — not a generic error
- Fun animation (glitching number, floating astronaut, or broken robot)
- Navigation back to home

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — ADMIN PANEL (admin.html) — FULL BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build a fully functional, beautiful admin panel using **Stitch MCP** as the backend/database. 
The admin panel must be protected and feature-complete:

AUTHENTICATION:
- Login screen with: password field, animated logo, gradient background
- Session stored in localStorage; if not authenticated, redirect to login
- Logout button in sidebar

ADMIN DASHBOARD SIDEBAR NAVIGATION:
- Collapsible sidebar with icons + labels
- Sections: Dashboard, Projects, Blog Posts, Contact Messages, Gallery, Skills, Settings

DASHBOARD HOME:
- Stats cards: total projects, total blog posts, unread contact messages, total gallery items
- Recent activity feed
- Quick action buttons

PROJECTS MANAGER:
- Full CRUD: Create, Read, Update, Delete projects
- Form fields: title, description, tech stack (tags), category, GitHub URL, live URL, 
  thumbnail image URL, featured toggle
- Drag-to-reorder projects (affects display order on projects.html)
- Preview button to see how card will look

BLOG MANAGER:
- Rich text / markdown editor for writing posts (use a lightweight editor)
- Fields: title, content, category, tags, thumbnail, published/draft toggle, date
- Post list with search/filter, edit, delete, publish/unpublish actions
- Preview post before publishing

CONTACT MESSAGES:
- Inbox view of all contact form submissions
- Mark as read/unread, delete
- Reply via mailto link
- Badge count of unread messages shown in sidebar nav

GALLERY MANAGER:
- Upload/manage gallery image metadata
- Fields: title, category, image URL, date
- Grid preview of gallery items

SKILLS MANAGER:
- Edit skill name, category, percentage, icon
- Add/remove skills that appear on skills.html

SETTINGS PANEL:
- Edit site-wide content: hero name, bio, "currently building" status message, 
  profile photo URL, social media links
- Change admin password
- Site maintenance mode toggle

ALL DATA persists via **Stitch MCP**. The public portfolio pages fetch their dynamic 
content (projects, blog posts, gallery, skills, hero text) from Stitch at load time, 
so editing in admin instantly updates the live portfolio.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — ANIMATIONS & INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUIRED ANIMATIONS (implement all of these):

1. Page load: branded loading screen with animated progress, then smooth reveal
2. Scroll animations: GSAP ScrollTrigger — every section fades/slides in with stagger
3. Cursor: custom glowing dot cursor with trailing effect (disable on mobile)
4. Navbar: hides on scroll down, reappears on scroll up (smart navbar)
5. Hero particles: Three.js or tsParticles — interactive mouse-reactive particle field
6. Text animations: typewriter, glitch, gradient shifting text on headings
7. Card hovers: 3D tilt effect (vanilla-tilt), glow border, smooth scale
8. Button hovers: magnetic attraction to cursor, ripple on click, shimmer sweep
9. Number counters: count up from 0 when scrolled into view
10. Progress bars/circles: animate from 0% to value when scrolled into view
11. Timeline: SVG path draws itself as user scrolls down
12. Image reveals: clip-path wipe animation on image load into viewport
13. Smooth scroll: CSS scroll-behavior and GSAP Lenis for buttery scroll physics
14. Page transitions: fade/slide out then in when navigating between pages
15. Theme: dark mode only (no toggle needed — commit to the dark aesthetic)
16. Parallax: subtle depth parallax on hero section elements at different speeds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — GITHUB INTEGRATION (LIVE DATA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use the **github MCP** to pull real live data into the portfolio:

- Contribution graph: display Mathiya's real GitHub contribution heatmap
- Live repo count, star count, follower count on the stats section
- Recent public commits/activity feed on the about or index page
- Auto-populate projects section with pinned GitHub repos as fallback
- Show "last updated" timestamps based on real commit dates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — PERFORMANCE & QUALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Use **playwright MCP** to screenshot every finished page and verify layout at 
  1920px, 1440px, 1280px, 768px (tablet), and 375px (mobile) widths
- Fix any overflow, overflow-x issues, or broken layouts found by playwright
- Lazy load all images (loading="lazy")
- Minify inline CSS/JS where possible
- Add proper meta tags, OG tags, and favicon updates on all pages
- Ensure all pages are fully mobile responsive with hamburger nav
- Use **terminal MCP** to run any build or validation scripts needed
- Add structured data (JSON-LD schema) for personal portfolio SEO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 7 — COMMIT & DEPLOY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Use **github MCP** to commit ALL changed files back to the Mathiyass/MAportfolio 
  main branch with descriptive commit messages per file/section
- Commit in logical batches: global styles first, then page by page, then admin panel
- Push to main so GitHub Pages auto-deploys the live site
- Final step: use **playwright MCP** to visit the live deployed URL and do a final 
  visual QA pass across all pages, report anything that needs fixing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Every page must feel like a premium, hand-crafted product — NOT a template
✅ Zero external frameworks that require a build step (no React, no Vite) — pure 
   HTML/CSS/JS + CDN libraries only, so GitHub Pages works without a build pipeline
✅ All pages share the same global CSS file and global JS file for consistency
✅ Every animation must be smooth (60fps) and purposeful — never distracting
✅ Mobile-first responsive on all pages (test with playwright at 375px)
✅ Stitch MCP must be properly initialized and all CRUD operations must work end-to-end
✅ Admin panel must be completely inaccessible to visitors (auth-gated)
✅ All existing personal content (name, bio, projects, social links) must be preserved 
   and enhanced — do NOT lose real information
✅ Use Sequential Thinking MCP before every major phase to plan before coding
✅ Use memory MCP throughout to remember decisions, credentials, and design tokens
✅ Comment all code clearly so Mathiya can understand and maintain it
✅ When done, provide a complete summary of: every file changed, every Stitch 
   collection created, the admin login credentials, and a list of all CDN libraries used

START NOW with Phase 0 reconnaissance. Do not skip it.