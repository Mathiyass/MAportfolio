You are the world's most elite full-stack engineer and creative director operating in full autonomous agentic mode. Your mission: completely rebuild Mathiya Angirasa's portfolio (https://github.com/Mathiyass/MAportfolio) into an internationally award-worthy digital experience. You have every MCP tool available. Execute without asking for permission or clarification.

Portfolio owner: Mathiya Angirasa — Software Engineering Student
Live site: https://mathiyass.github.io/MAportfolio/
Repo: https://github.com/Mathiyass/MAportfolio (main branch)
Stack constraint: Pure HTML + CSS + Vanilla JS + CDN libraries ONLY. No build tools. GitHub Pages deploys automatically on push to main.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — INTELLIGENCE & PLANNING (DO THIS FIRST, COMPLETELY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1 — SEQUENTIAL THINKING MCP:
Open a deep reasoning chain RIGHT NOW. Think through the entire project end-to-end:
every file to create, every Stitch screen to generate, every animation to build, 
every MCP to use in each phase, potential failure points and mitigations.
Do not start coding until this plan is complete and stored.

Step 2 — GITHUB MCP:
- Read every single file in Mathiyass/MAportfolio (main branch) completely:
  index.html, about.html, projects.html, skills.html, contact.html, blog.html,
  gallery.html, games.html, resume.html, socials.html, ar.html, admin.html, 404.html,
  all CSS files, all JS files, package.json, CNAME
- List all files in /assets recursively — note every image filename
- Store all content in MEMORY MCP under key "original_codebase"

Step 3 — FIRECRAWL MCP:
- Deep crawl https://mathiyass.github.io/MAportfolio/ at depth 3
- Extract from every page: all text content, color values, font names, 
  existing animation classes, social links, project names, bio text
- Store full extraction in MEMORY MCP under key "live_content"

Step 4 — PLAYWRIGHT MCP:
- Screenshot every page at 1920x1080 and 390x844 (mobile)
- Pages: /, /about, /projects, /skills, /contact, /blog, /gallery, 
  /games, /resume, /socials, /ar, /admin, /404
- Document all issues: overflow, broken elements, layout problems
- Store findings in MEMORY MCP under key "visual_audit"

Step 5 — CONTEXT7 MCP:
Fetch current docs and correct CDN URLs for ALL of these:
- GSAP 3 + ScrollTrigger + Lenis smooth scroll
- Three.js r160 (particles, WebGL)
- tsParticles v3
- Vanilla Tilt JS
- Swiper.js v11
- Marked.js (markdown rendering)
- Fuse.js (fuzzy search)
- Chart.js v4
- Sortable.js
- canvas-confetti
- Prism.js (syntax highlighting)
- Tippy.js (tooltips)
Store all verified CDN URLs in MEMORY under key "cdn_urls"

Step 6 — GITHUB MCP (live data):
- Fetch https://api.github.com/users/Mathiyass — store profile JSON
- Fetch https://api.github.com/users/Mathiyass/repos?sort=updated&per_page=20 — store repos
- Fetch https://api.github.com/users/Mathiyass/events/public?per_page=30 — store events
- Extract: avatar URL, bio, follower count, repo count, pinned repo data
- Store all under MEMORY key "github_data"

Step 7 — OLLAMA MCP:
Generate real content using the local model:
- 3 polished bio variations for Mathiya (based on scraped bio from step 3)
- Compelling descriptions for each GitHub repo (from step 6)
- 3 complete blog posts in markdown:
  "My Journey into Full-Stack Development" (1000 words)
  "Building My First Unity Game: Lessons Learned" (800 words)  
  "Why Clean Code Is a Superpower" (700 words)
- FAQ answers for the contact page (4 questions)
- "Currently Building" tagline (1 sentence, exciting)
Store everything in MEMORY under key "generated_content"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — STITCH UI GENERATION (THE CORE OF THIS PHASE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use STITCH MCP to generate professional, production-ready UI designs for every 
page. Stitch generates real HTML/CSS code — pull that code and use it as the 
visual foundation, then layer your animations and logic on top.

Create a new Stitch project: "Mathiya Angirasa Portfolio - 2025 Rebuild"
Store the project ID in MEMORY under key "stitch_project_id"

Design brief to use for ALL Stitch screens (include this context in every prompt):
"Dark premium developer portfolio. Color palette: deep space black backgrounds 
(#03030d, #07071a), electric cyan accent (#00d4ff), deep violet (#7c3aed). 
Typography: Space Grotesk for headings, Inter for body. Glassmorphism cards with 
subtle borders. Glowing elements. Professional, award-worthy, modern 2025 aesthetic. 
Owner: Mathiya Angirasa, Software Engineering Student, Sri Lanka."

Generate these screens via Stitch — use generate_screen_from_text for each:

SCREEN 1 — "Hero Homepage":
"Full viewport dark hero section for a software engineer portfolio. 
Large glowing name 'MATHIYA' in Space Grotesk with subtle cyan text glow. 
Tagline cycling text area below name. Short bio paragraph. Two CTA buttons: 
'View My Work' (filled cyan gradient) and 'Let's Talk' (ghost border). 
Row of social media icons below CTAs. Four stat counters at bottom: 
Repositories, Followers, Projects, Technologies — each with large number and label. 
Floating gradient orbs in background (cyan and violet). Dark glassmorphism navbar 
at top with logo 'MA' and nav links. Premium, minimal, futuristic."

SCREEN 2 — "Projects Grid Page":
"Dark portfolio projects page. Top: filter pill buttons (All, Web, Game, Mobile, Design). 
Below: 3-column masonry card grid. Each card: dark glass background, colored top border, 
project thumbnail area, category tag pill, project title, 2-line description, 
tech stack tag badges (React, Node.js, etc), GitHub and live link icon buttons. 
Cards have subtle gradient border glow on hover state. One hero featured project 
at top spanning full width. Search bar with icon. Premium dark aesthetic."

SCREEN 3 — "About Me Page":
"Dark about page for developer portfolio. Left column: circular profile photo with 
rotating gradient ring border, name, title, location badge. Right column: 
bio paragraphs with animated heading. Below: vertical timeline with alternating 
left/right milestone cards for Education and Experience — each card: year badge, 
title, institution, description. Glassmorphism card style. Bottom: 4 personality 
trait cards with icons (Problem Solver, Creative, Collaborative, Detail-Oriented). 
Dark space aesthetic."

SCREEN 4 — "Skills Page":
"Dark developer skills showcase page. Top: large 3D sphere placeholder area with 
label 'Interactive Skills Globe'. Below: 5 category tabs (Frontend, Backend, Game Dev, 
Design, Tools) with active tab highlighted in cyan. Tab content: grid of skill cards, 
each with: circular progress ring (SVG), skill icon/logo, skill name, percentage. 
Progress rings filled in cyan gradient. Bottom section: certifications grid with 
badge-style cards. Dark glassmorphism throughout."

SCREEN 5 — "Contact Page":
"Dark contact page split layout. Left column: contact information list with 
glowing icons for email, LinkedIn, GitHub, Discord — each with copy button. 
'Currently Available' status badge in green. Timezone display. Response time note. 
Right column: contact form with floating label inputs — Name, Email, Subject, 
Category dropdown, Message textarea with character counter, Send button with 
paper plane icon. Form inputs: dark glass style with cyan focus glow border. 
Send button: filled cyan gradient with hover animation."

SCREEN 6 — "Blog Page":
"Dark developer blog page. Top: featured post hero card spanning full width — 
large thumbnail, category badge, title, excerpt, read time, author. Below: 
category filter tabs. Grid of blog post cards: each with thumbnail, category pill 
(color coded), title, 2-line excerpt, author avatar, date, read time estimate, 
tag badges. Clean glassmorphism cards. Search bar at top right. Load more button."

SCREEN 7 — "Admin Dashboard":
"Professional dark admin dashboard for a developer portfolio CMS. 
Left: dark sidebar (slightly lighter than page bg) with logo 'MA Admin', 
navigation links with icons: Dashboard, Projects, Blog Posts, Messages (with red badge), 
Gallery, Skills, Settings, Analytics. Bottom of sidebar: user avatar and name. 
Main area: top stats row with 4 KPI cards (Total Projects, Blog Posts, Unread Messages, 
Gallery Items) each with icon, large number, trend arrow. Below: line chart for 
page views, recent messages inbox preview list, quick action buttons. 
Dashboard/CMS aesthetic, professional, not matching portfolio style — 
think Linear or Vercel dashboard."

SCREEN 8 — "Admin Projects Manager":
"Dark admin CMS projects table view. Top toolbar: search input, filter dropdowns, 
'Add Project' button in cyan. Table with columns: drag handle, thumbnail (small), 
project title, category badge, tech stack pills, status toggle (published/draft), 
featured star toggle, edit and delete action buttons. One row expanded showing 
slide-in edit form panel on right: input fields for title, description, category, 
tech stack tags, GitHub URL, Live URL, thumbnail URL, image preview, 
featured and published toggles, Save and Cancel buttons."

SCREEN 9 — "Admin Blog Editor":
"Dark admin markdown blog post editor. Split view: left half is a text editor area 
with markdown toolbar (bold, italic, heading, quote, code, link, image, list buttons), 
right half shows rendered markdown preview. Right sidebar panel: post metadata fields — 
Title input, Slug (auto-generated), Category select, Tags input, Thumbnail URL with preview, 
Published toggle, Read time (auto), Auto-save indicator 'Saved 12s ago'. 
Bottom toolbar: Save Draft and Publish buttons."

SCREEN 10 — "Admin Messages Inbox":
"Dark admin email-style messages inbox. Left panel: list of contact form messages — 
each row: sender initials avatar, sender name, subject preview, timestamp, 
unread blue dot. Selected row highlighted. Right panel: full message detail view — 
sender info, email, subject, full message body, timestamp. Action buttons: 
Reply (opens email), Mark as Read, Star, Delete. Top filter tabs: All, Unread, Starred. 
Unread count badge. Search bar."

SCREEN 11 — "Admin Settings":
"Dark admin settings panel. Tab navigation: General, Social Links, Security, Advanced. 
General tab active: form with labeled inputs — Hero Name, Bio textarea, 
Currently Building text + progress slider, Availability status radio buttons 
(Available / Busy / Closed), Profile Photo URL with preview image, Site Tagline. 
Clean sectioned form layout with save buttons per section. 
Professional dashboard aesthetic."

SCREEN 12 — "404 Page":
"Dark 404 error page for developer portfolio. Center: giant glitching '404' text 
with RGB split effect (cyan shadow left, violet shadow right). Below: 
'Lost in the void' heading. Short message: 'This page drifted into the cosmos.' 
Illustrated floating astronaut SVG with subtle animation. 'Return to Base' button 
in cyan with rocket icon. Background: dark with scattered star dots. 
Subtle animated gradient orbs."

SCREEN 13 — "Blog Post Reader":
"Dark blog post article page. Top: full-width hero with post thumbnail, category badge, 
post title in large font, author info, date, read time. Below: two column layout — 
main wide content column with rendered markdown (headings, paragraphs, code blocks 
with syntax highlighting, blockquotes in glass style, inline images) and narrow 
sticky sidebar with: table of contents (auto-generated), share buttons, 
related posts preview. Reading progress bar at very top of page. 
Bottom: related posts grid (3 cards)."

SCREEN 14 — "Gallery Page":
"Dark photography/gallery page. Top: category filter pills. 
Main: Pinterest-style masonry grid — 3 columns desktop, 2 tablet. 
Images in glass cards with: category badge corner tag, title overlay on hover, 
'View' icon on hover. Varied heights for masonry effect. 
Lightbox modal overlay in corner thumbnail: dark fullscreen modal with image centered, 
previous/next arrows, image counter '4 / 18', close button, download button."

After generating each screen:
- Use get_screen_code to retrieve the full HTML/CSS code
- Use get_screen_image to get the screenshot for visual verification
- Store the HTML code in MEMORY under key "stitch_[page_name]_html"
- Inspect the Stitch code for: color variables used, font classes, component patterns
- Note the design system Stitch established (colors, spacing, component patterns)
- Store the extracted design tokens in MEMORY under key "stitch_design_tokens"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — GLOBAL FOUNDATION FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now that Stitch has established the visual design system, build the shared 
infrastructure that every page will use.

── /assets/css/global.css ──────────────────────

Merge and unify design tokens from Stitch outputs into CSS custom properties:
:root {
  --bg-primary: #03030d;
  --bg-secondary: #07071a;
  --bg-card: rgba(255,255,255,0.03);
  --bg-card-hover: rgba(255,255,255,0.06);
  --accent-cyan: #00d4ff;
  --accent-violet: #7c3aed;
  --accent-amber: #f59e0b;
  --success: #10b981;
  --danger: #ef4444;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --border: rgba(255,255,255,0.08);
  --border-accent: rgba(0,212,255,0.25);
  --gradient-primary: linear-gradient(135deg, #00d4ff, #7c3aed);
  --glow-cyan: 0 0 20px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.1);
  --glow-violet: 0 0 20px rgba(124,58,237,0.35), 0 0 60px rgba(124,58,237,0.1);
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --nav-height: 72px;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-full: 9999px;
  --transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

Required CSS — write complete implementations for each:
- .glass (backdrop-filter: blur(12px), semi-transparent bg, border)
- .glass-strong (more opaque variant)
- .gradient-text (background-clip: text, gradient fill)
- .glow-text (text-shadow with cyan glow)
- .btn-primary (filled cyan gradient, box-shadow glow, shimmer sweep keyframe on hover)
- .btn-secondary (ghost border, border-color transition, glow on hover)
- .tag (small rounded badge with bg and text color variants)
- .section-label (uppercase, letter-spaced, small, accent color)
- .skeleton (loading shimmer animation)
- .animate-on-scroll (initial state: opacity 0, y offset)
- All keyframes: glitch-1, glitch-2, float-orb, status-pulse, shimmer, skeleton-wave,
  rotate-gradient-border, float-up, fade-in
- Custom scrollbar: thin, dark track, cyan thumb
- ::selection: cyan background
- Focus-visible: cyan outline
- Full mobile responsive navbar styles
- Toast notification component CSS
- Page loader overlay CSS
- Custom cursor CSS (cursor-dot + cursor-outline)
- Scroll progress bar CSS

── /assets/js/core.js ──────────────────────────

Build these complete systems (every one of these, fully implemented):

1. LENIS SMOOTH SCROLL
   Initialize Lenis, sync with GSAP ticker, expose window.lenis globally.
   Config: duration 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t))

2. CUSTOM CURSOR (desktop only, hidden on touch devices)
   - cursor-dot: 6px, follows mouse instantly via mousemove
   - cursor-outline: 40px circle, follows with lerp factor 0.12 in rAF loop
   - Hover states on all interactive elements: outline expands to 60px, 
     dot hides, outline fills semi-transparent
   - Text elements: cursor morphs to vertical bar
   - Images/cards: cursor shows "view" text label
   - Buttons: cursor shows magnet symbol

3. SMART NAVBAR
   - Hides on scroll down (threshold: 80px from top), reveals on scroll up
   - .scrolled class added past 50px → activates glass blur background
   - Active link detection via current URL pathname
   - Hamburger → X morph animation (CSS transform)
   - Mobile fullscreen menu with staggered link entrance (GSAP)
   - Animated underline slides in from left on hover

4. PAGE LOADER
   - Overlay with animated "MA" SVG monogram
   - SVG stroke-dashoffset draw animation (0 → full path length)
   - Percentage counter 0–100 tied to window load event
   - sessionStorage flag so it only plays once per session
   - On complete: GSAP timeline triggers hero entrance animations

5. PAGE TRANSITIONS
   - Full-screen gradient overlay (cyan→violet sweep, left to right)
   - Intercept all internal <a> clicks
   - Animate overlay in → navigate → animate overlay out
   - Each direction: 600ms with ease

6. SCROLL PROGRESS BAR
   - 3px fixed bar at very top
   - Gradient: cyan → violet  
   - Width tied to scroll percentage via scroll event

7. GSAP SCROLLTRIGGER BATCH REVEALS
   - Register all GSAP plugins
   - ScrollTrigger.batch('.animate-on-scroll', { ... })
   - Default: opacity 0→1, y 50→0, stagger 0.1, duration 0.8
   - Check prefers-reduced-motion — if set, skip all animations

8. MAGNETIC BUTTONS
   Apply to all .magnetic elements:
   mousemove → translate toward cursor (max 12px), ease: power2.out
   mouseleave → spring back, ease: elastic.out(1, 0.5)

9. TOAST SYSTEM
   window.Toast.success(msg), .error(msg), .info(msg), .warning(msg)
   Stack up to 3, bottom-right corner
   Auto-dismiss 4s with shrinking progress bar
   Slide in from right, slide out to right

10. GSAP COUNTER ANIMATION
    window.animateCounter(el, target, duration)
    Uses GSAP to count from 0 to target, updates el.textContent
    Fires when element enters viewport via ScrollTrigger

11. COPY TO CLIPBOARD HELPER
    window.copyText(text, feedbackEl) → copies, shows "Copied!" toast

12. GITHUB DATA LOADER
    On pages that need it: fetch data from localStorage cache (keyed by 
    "gh_cache_[endpoint]" with 1hr TTL), fallback to live GitHub API fetch
    Populates DOM elements with data-github-stat="[key]" attributes

── /assets/js/data.js ──────────────────────────

This file stores all portfolio content as JS objects — populated from MEMORY 
(which holds scraped live content + Ollama generated content). 
This is the single source of truth for all page content. Includes:
- PORTFOLIO.owner (name, bio, location, email, phone, status, currentlyBuilding)
- PORTFOLIO.social (all links)
- PORTFOLIO.projects (array from GitHub repos + any manual additions)
- PORTFOLIO.skills (array with name, category, percentage, icon)
- PORTFOLIO.blog (array of 3 seeded blog posts — full markdown content)
- PORTFOLIO.gallery (array of 8 placeholder items)
- PORTFOLIO.timeline (education + experience entries)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — PAGE ASSEMBLY (EVERY PAGE, COMPLETE CODE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each page:
1. Start with the HTML/CSS code pulled from Stitch (stored in memory)
2. Adapt it into a complete, valid HTML page structure
3. Link global.css and core.js
4. Add page-specific animations, interactivity, and dynamic data rendering
5. Ensure all content comes from data.js or live GitHub API (nothing hardcoded)
6. Write to disk with FILESYSTEM MCP
7. Commit with GITHUB MCP immediately

── INDEX.HTML ────────────────────────────────────

Take Stitch "Hero Homepage" screen code as base. Integrate:

HEAD: Full SEO meta, OG tags, Twitter card, canonical, Google Fonts preconnect,
JSON-LD Person schema with all social profile URLs, favicon.

BODY structure (in order):
- #page-loader: MA monogram SVG + percentage counter (from core.js)
- #cursor-dot + #cursor-outline
- #scroll-progress
- <nav>: glassmorphism, sticky, links to all pages, hamburger for mobile
- <section#hero>:
    - <canvas id="hero-canvas"> — Three.js particle field, fills entire hero
    - Three animated gradient orbs (CSS float-orb animation)
    - .hero-eyebrow: pulsing green dot + "Available for opportunities" 
      (from PORTFOLIO.owner.status)
    - <h1> MATHIYA — glitch effect via CSS ::before ::after + data-text attribute
    - .hero-typewriter: "I build " + cycling words (typewriter JS)
    - <p> bio from PORTFOLIO.owner.bio
    - Two .magnetic CTA buttons
    - Social icons row with Tippy.js tooltips
    - GitHub stats strip — 4 counters, animated via animateCounter()
    - Scroll indicator: chevron bounce animation

- <section#currently-building>: text from PORTFOLIO.owner.currentlyBuilding
- <section#featured-projects>: render top 3 from PORTFOLIO.projects where featured=true
  Each card: VanillaTilt 3D tilt, glass bg, gradient border hover, tech tags
- <section#skills-preview>: floating skill badges from PORTFOLIO.skills (featured)
- <section#github-activity>: render last 8 events from GitHub data, timeline format
- <section#latest-blog>: render 3 posts from PORTFOLIO.blog as cards
- <section#cta>: gradient bg, "Let's Build Something" + buttons
- <footer>: 3 columns + bottom bar

Three.js (index.js):
8000 particles, mouse repel force, line connections < 80px apart (cyan 0.15 opacity),
particles drift slowly, WebGL detection with CSS fallback

Glitch effect (JS): on hover of h1 — rapid character substitution then resolve
Typewriter: cycles "experiences", "games", "solutions", "the future", "with code"
Magnetic buttons: full implementation as specified in core.js
GitHub stats: populate from cached GitHub API data

── ABOUT.HTML ──────────────────────────────────────────

Stitch "About Me Page" as base. Integrate:
- Profile photo: /assets/images/Profile Picture.jpg with rotating gradient ring
- Bio: from PORTFOLIO.owner (use Ollama-generated version, best variant)
- GSAP SplitText on bio paragraphs (split by words, stagger 0.02 each)
- SVG timeline path that draws with stroke-dashoffset as user scrolls
- Education + experience from PORTFOLIO.timeline — alternating left/right cards
- Chart.js radar: Problem Solving, Creativity, Communication, 
  Technical Depth, Collaboration, Initiative — animated on scroll into view
- Hobbies icons with hover micro-animations

── PROJECTS.HTML ──────────────────────────────────────

Stitch "Projects Grid" as base. Integrate:
- Render all projects from PORTFOLIO.projects dynamically via JS template literals
- Filter buttons: wire up JS to filter by category with GSAP fade transitions
- VanillaTilt on every card (max 8deg, speed 400, glare true, max-glare 0.2)
- Fuse.js search across title + description + techStack
- Project modal: fullscreen overlay, Swiper carousel for screenshots,
  full description, tech stack, GitHub live stats fetch, live demo link,
  ESC to close, next/prev navigation
- "Load More" pagination (6 per page)
- Empty state: animated SVG when no filter results

── SKILLS.HTML ─────────────────────────────────────────

Stitch "Skills Page" as base. Integrate:
- Three.js skill sphere: PORTFOLIO.skills rendered as labels on sphere surface
  using fibonacci sphere point distribution, OrbitControls-style drag rotation,
  hover highlight with popup
- Category tab switching with GSAP stagger animations
- SVG circular progress rings animated via stroke-dashoffset on tab show + scroll
- Chart.js radar for skill categories (same as about page, different data)

── CONTACT.HTML ─────────────────────────────────────────

Stitch "Contact Page" as base. Integrate:
- All contact methods from PORTFOLIO.social with copy-to-clipboard
- Live Colombo time display (updating every second via setInterval)
- Form: floating labels (CSS), real-time validation on blur
- Character counter on textarea (live update)
- Submit: preventDefault, validate all fields, POST to 
  https://formsubmit.co/[mathiya's email] (free form backend, no server needed)
  OR store submission in localStorage as fallback
- On success: canvas-confetti burst + Toast.success() + reset form
- On error: Toast.error() + highlight invalid fields
- FAQ accordion: smooth height transition (max-height: 0 → scrollHeight)

── BLOG.HTML + BLOG-POST.HTML ──────────────────────────

BLOG.HTML — Stitch "Blog Page" as base:
- Render PORTFOLIO.blog posts dynamically
- Category filter tabs (extract unique categories)
- Fuse.js search on title + excerpt + tags
- Pagination (6 per page, load more)
- Each card links to blog-post.html?slug=[post.slug]

BLOG-POST.HTML (create new file):
- On load: read ?slug param from URL
- Find matching post in PORTFOLIO.blog
- Render markdown → HTML via Marked.js
- Prism.js for code block syntax highlighting
- Auto-generate table of contents from all h2/h3 in rendered content
- TOC: sticky sidebar on desktop, hidden on mobile
- Reading progress bar (specific to this page, separate from global one)
- Related posts: 3 from same category at bottom
- Share buttons: Twitter, LinkedIn, copy link → Toast.success()
- If slug not found: redirect to blog.html

── GALLERY.HTML ────────────────────────────────────────

Stitch "Gallery Page" as base:
- CSS masonry: column-count 3 desktop, 2 tablet, 1 mobile
- Render PORTFOLIO.gallery items
- Lazy loading: IntersectionObserver, blur-up placeholder (tiny inline SVG)
- Lightbox: fullscreen modal, keyboard nav (← → ESC), touch swipe support,
  image counter, download link, smooth scale-from-click-position animation

── GAMES.HTML ──────────────────────────────────────────

Game project showcase + embedded space shooter game:

Full canvas space shooter (complete implementation):
- Player ship (SVG path rendered on canvas, cyan engine glow)
- Mouse/touch move to position, click/tap to fire
- Enemy waves spawning with patterns (V formation, zigzag, etc.)
- Particle explosion system (15 particles, physics-based spread)
- Power-ups: rapid fire (yellow), shield (blue), triple shot (green)
- Score counter, high score (localStorage), 3 lives with icon display
- Parallax starfield background (3 layers at different scroll speeds)
- Pause on P key or blur event
- Start screen with instructions
- Game over screen: score, high score, restart button
- All at 60fps using requestAnimationFrame delta time
- Sound: Web Audio API — generate simple beep/explosion sounds procedurally
  (no external audio files needed)

── RESUME.HTML ─────────────────────────────────────────

Interactive timeline resume:
- Horizontal scrolling timeline on desktop, vertical on mobile
- Clickable year markers jump to that section
- Sections: Education, Experience, Projects, Skills, Certifications
- @media print stylesheet: converts to clean single-column PDF-ready layout
- Download resume button (links to PDF in /assets or prompts print dialog)
- Skill bars with GSAP fill animation on scroll

── SOCIALS.HTML ────────────────────────────────────────

Platform grid cards for all of Mathiya's profiles (from PORTFOLIO.social):
GitHub, LinkedIn, Twitter/X, Instagram, Discord, Facebook, Steam, Epic Games, 
Spotify, WhatsApp — each card: platform brand color on hover bg, 
username, follow/connect CTA, brief content description.
Card flip on hover: back shows QR code placeholder (canvas-generated QR pattern)

── AR.HTML — "Interactive 3D Universe" ─────────────────

Full Three.js interactive experience:
- Dark space scene with starfield background (10,000 stars)
- 6 floating 3D spheres orbiting a central glowing "MA" text (TextGeometry)
- Each sphere: labeled with project name, different color material
- Click sphere: smooth camera fly-in, side panel slides in with project details
- OrbitControls for free rotation
- Ambient + point lights
- Bloom-like glow effect via additive blending
- If WebGL unsupported: graceful fallback with CSS 3D transforms scene

── 404.HTML ────────────────────────────────────────────

Stitch "404 Page" as base:
- Giant "404" with CSS RGB glitch split (::before cyan left, ::after violet right)
- CSS floating astronaut SVG (create SVG inline)
- Random space fact on each load (array of 10 facts, Math.random pick)
- "Return to Base" button triggers page transition to index.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — ADMIN PANEL (admin.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The admin panel is a complete SPA inside admin.html. 
All data stored in localStorage (JSON). Exported as JSON when needed.
Use Stitch screens 7, 8, 9, 10, 11 as visual base for each view.

AUTHENTICATION:
- Login screen (centered card, gradient background) if not authed
- Password: "mathiya2025" hashed with SubtleCrypto SHA-256
- Compare hash on login submit — if match: store token in sessionStorage
- Token: base64(JSON.stringify({ user:"mathiya", ts: Date.now() }))
- Session expires 24 hours — check on every route render
- Rate limit: 5 failed attempts → 30 min lockout (localStorage flag + timestamp)
- Logout: clear sessionStorage, reload

ADMIN DATA LAYER (/assets/js/admin-data.js):
AdminDB object with methods:
- AdminDB.get(collection) → parse from localStorage key "admin_[collection]"
- AdminDB.save(collection, data) → JSON.stringify to localStorage
- AdminDB.create(collection, item) → add with generated UUID, save
- AdminDB.update(collection, id, changes) → find by id, merge, save
- AdminDB.delete(collection, id) → filter out by id, save
- AdminDB.getSettings() → parse "admin_settings" key
- AdminDB.setSetting(key, value) → update nested key in settings object

On first load (if localStorage empty): seed with all PORTFOLIO data from data.js

Collections: projects, blog_posts, messages (contact form submissions), 
gallery, skills, settings

HASH-BASED SPA ROUTER:
Routes: #dashboard, #projects, #projects/new, #projects/edit/[id],
#blog, #blog/new, #blog/edit/[id], #messages, #gallery, #settings, #analytics
window.location.hash → renders corresponding view into #admin-content
popstate event → re-render on back/forward
Loading spinner (300ms) between route changes

SIDEBAR (from Stitch screen 7):
- Logo "MA Admin" + collapse toggle (saves state to localStorage)
- Nav items with icons and badges (unread message count, draft post count)
- User info + logout at bottom
- Collapsed state: icon-only, tooltips on hover (Tippy.js)

DASHBOARD VIEW (Stitch screen 7 main content):
- 4 KPI cards with GSAP count-up animation on load
- Chart.js line chart: seeded 30-day page view data (random realistic values)
- Chart.js doughnut: projects by category from AdminDB.get('projects')
- Recent messages list: last 5 from AdminDB.get('messages')
- Quick action buttons that navigate to correct routes

PROJECTS VIEW (Stitch screen 8):
- Table rendered from AdminDB.get('projects')
- Sortable.js drag-to-reorder → AdminDB saves new order
- Filter/search (Fuse.js on title)
- Click "Add Project" or edit icon → slides in right panel form
- Form: all fields, tag input for tech stack (type + Enter), image URL preview
- Save → AdminDB.create or AdminDB.update → refresh table → Toast.success()
- Delete: confirm dialog → AdminDB.delete → refresh → Toast.success()

BLOG VIEW (Stitch screen 9):
- Post list with filter/search
- Full-width editor on new/edit:
  - Textarea with markdown toolbar (buttons insert markdown syntax at cursor)
  - Right panel: Marked.js live preview (updates on input with 300ms debounce)
  - Metadata sidebar: all fields
  - Auto-save every 30s → AdminDB.update → show "Auto-saved [time]" indicator
  - Publish vs Save Draft buttons

MESSAGES VIEW (Stitch screen 10):
- Two-panel email client layout
- List: click → mark as read in AdminDB → show full message in right panel
- Reply: window.open('mailto:'+message.email+'?subject=Re: '+message.subject)
- Delete: confirm → AdminDB.delete → refresh list
- Starred: toggle star icon → save to AdminDB
- Filter: All / Unread / Starred tabs
- Badge count on sidebar recalculates after every action

GALLERY VIEW:
- Grid from AdminDB.get('gallery') with thumbnails
- Add form: title, image URL, category, description
- Sortable.js drag-to-reorder
- Delete/edit per item

SETTINGS VIEW (Stitch screen 11):
- Tabs: General, Social Links, Security, Advanced
- General: live-edit site content → AdminDB.setSetting on save
- Social Links: input per platform → save
- Security: change password (validate current hash → save new hash)
- Advanced: 
  "Export All Data" → JSON.stringify all collections → download as file
  "Reset to Defaults" → confirm dialog → re-seed from PORTFOLIO data.js
  "Clear All Messages" → confirm → AdminDB.save('messages', [])

ANALYTICS VIEW:
- All Chart.js charts: page views (line), top pages (bar), 
  device breakdown (doughnut), visits this week vs last week (grouped bar)
- All use seeded realistic data from AdminDB or generate on first load
- GitHub activity chart: bar chart of commits per day (from MEMORY github_data)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — ANIMATIONS (IMPLEMENT EXACTLY AS SPECIFIED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every animation must run at 60fps. Never cause layout shift.

GSAP hero entrance (fires after loader completes):
gsap.timeline({ delay: 0.2 })
  .from('.hero-eyebrow', { opacity:0, y:20, duration:0.5, ease:'power2.out' })
  .from('.hero-name', { opacity:0, y:60, duration:0.9, ease:'power4.out' }, '-=0.2')
  .from('.hero-typewriter', { opacity:0, y:30, duration:0.6 }, '-=0.4')
  .from('.hero-bio', { opacity:0, y:20, duration:0.5 }, '-=0.3')
  .from('.hero-cta .btn-primary', { opacity:0, x:-20, duration:0.5 }, '-=0.2')
  .from('.hero-cta .btn-secondary', { opacity:0, x:20, duration:0.5 }, '-=0.5')
  .from('.hero-social-strip a', { opacity:0, y:10, stagger:0.06, duration:0.4 }, '-=0.2')
  .from('.github-stats-strip .stat-item', { opacity:0, y:20, stagger:0.1 }, '-=0.3')

GSAP ScrollTrigger counters:
gsap.utils.toArray('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count)
  gsap.to({ n:0 }, {
    n: target, duration: 2.5, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate() { el.textContent = Math.ceil(this.targets()[0].n) }
  })
})

GSAP timeline SVG path draw:
document.querySelectorAll('.timeline-path').forEach(path => {
  const length = path.getTotalLength()
  gsap.fromTo(path,
    { strokeDasharray: length, strokeDashoffset: length },
    { strokeDashoffset: 0,
      scrollTrigger: { trigger: path.closest('.timeline'), 
        start: 'top 70%', end: 'bottom 30%', scrub: 0.5 }
    })
})

GSAP stagger section reveals:
gsap.utils.toArray('.stagger-group').forEach(group => {
  gsap.from(group.children, {
    opacity:0, y:40, stagger:0.12, duration:0.8, ease:'power2.out',
    scrollTrigger: { trigger:group, start:'top 75%', once:true }
  })
})

GSAP parallax:
document.querySelectorAll('[data-parallax]').forEach(el => {
  const speed = parseFloat(el.dataset.parallax) || 0.3
  gsap.to(el, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: { trigger: el.parentElement, scrub: true }
  })
})

CSS glitch on .hero-name (use data-text attribute):
.hero-name { position: relative; }
.hero-name::before, .hero-name::after {
  content: attr(data-text); position: absolute; top:0; left:0; width:100%; height:100%;
}
.hero-name::before {
  color: #00d4ff; animation: glitch-1 5s infinite; clip-path: inset(0 0 85% 0);
}
.hero-name::after {
  color: #7c3aed; animation: glitch-2 5s infinite 0.08s; clip-path: inset(60% 0 0 0);
}
Glitch triggers more intensely on hover (JS adds .glitching class → faster animation)

Typewriter implementation:
const words = ['experiences', 'games', 'solutions', 'the future', 'with JavaScript']
let wi=0, ci=0, deleting=false
function type() {
  const word = words[wi]
  el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci)
  if(!deleting && ci === word.length) { deleting=true; return setTimeout(type, 1800) }
  if(deleting && ci === 0) { deleting=false; wi=(wi+1)%words.length }
  setTimeout(type, deleting ? 50 : 95)
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — MCP UTILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NANO-BANANA MCP: Use to generate:
- The animated "MA" SVG monogram for the loader (draw-in stroke animation)
- Astronaut SVG for 404 page (simple geometric style, dark theme appropriate)
- Wave/line SVG section dividers between sections
- Favicon SVG (stylized "MA" monogram)
Generate all as optimized, minimal SVG code. Store in /assets/svg/

OPENAPI MCP: Set up standardized API call definitions for:
- GitHub REST API endpoints used (user profile, repos, events)
- Define request/response schemas
- Create /assets/js/api.js with documented fetch wrappers for each endpoint
  with error handling and caching

BACKGROUND MCP: Use for:
- Seeding all localStorage data in background on first admin load
- Any long-running Stitch generation tasks that would otherwise block

PLAYWRIGHT MCP: After EVERY page commit:
- Navigate to live GitHub Pages URL for that page
- Wait 2500ms for deployment propagation
- Screenshot at 1920x1080, 1440x900, 768x1024, 390x844
- Check: document.documentElement.scrollWidth <= window.innerWidth (no overflow)
- Check: document.querySelectorAll('img').filter(img => !img.complete).length === 0
- Check: no console errors (intercept page.on('console'))  
- Report findings — fix any issues before moving to next page

TERMINAL MCP: After all pages complete:
- grep -rn "console.log" assets/js/ | grep -v "admin" (find debug logs)
- find . -name "*.html" | xargs grep -l "Lorem ipsum" (find placeholder content)
- Verify all CDN URLs are accessible (curl -I each one, check 200 status)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 7 — GITHUB COMMIT STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use GITHUB MCP for every commit. Commit immediately after each file is complete.
Never batch unrelated files. Descriptive messages only.

Commit order:
1. "feat(foundation): add global CSS design system with custom properties"
2. "feat(foundation): add core.js — cursor, navbar, loader, transitions, GSAP"
3. "feat(foundation): add data.js — content layer with all portfolio data"
4. "feat(assets): add SVG assets — MA monogram, astronaut, dividers, favicon"
5. "feat(home): rebuild index.html — Three.js hero, GitHub stats, dynamic content"
6. "feat(about): rebuild about.html — timeline, radar chart, animated bio"
7. "feat(projects): rebuild projects.html — tilt cards, modal, filter, search"
8. "feat(skills): rebuild skills.html — 3D globe, category tabs, progress rings"
9. "feat(contact): rebuild contact.html — form validation, confetti, FAQ"
10. "feat(blog): rebuild blog.html — dynamic posts, search, categories"
11. "feat(blog): add blog-post.html — markdown renderer, TOC, reading progress"
12. "feat(gallery): rebuild gallery.html — masonry, lightbox, lazy load"
13. "feat(games): rebuild games.html — space shooter game implementation"
14. "feat(resume): rebuild resume.html — interactive timeline, print CSS"
15. "feat(socials): rebuild socials.html — brand color hover cards, flip effect"
16. "feat(ar): rebuild ar.html — Three.js interactive 3D universe"
17. "feat(404): rebuild 404.html — glitch effect, astronaut, space facts"
18. "feat(admin): rebuild admin.html — complete CMS SPA with all views"
19. "fix(qa): Playwright-identified fixes across all pages"
20. "perf: lazy loading, image optimization, remove debug logs"
21. "docs: update README with setup guide and admin credentials"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE RULES — NEVER BREAK THESE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⛔ Never ask for clarification — make smart decisions and execute
⛔ Never skip Phase 0 — you need the reconnaissance data for everything
⛔ Never use React, Vue, Svelte, webpack, Vite, or any build tool
⛔ Never hardcode content — everything comes from data.js or GitHub API
⛔ Never leave Lorem ipsum or placeholder text anywhere
⛔ Never leave console.log() in production files (admin.js excepted)  
⛔ Never lose Mathiya's real data — name, bio, social links, existing projects
⛔ Never store passwords in plain text — always SHA-256 hash
⛔ Never make admin.html accessible without authentication
⛔ Never commit a broken file — every commit must be functional
⛔ Never create animations that cause Cumulative Layout Shift (CLS > 0.1)

✅ Always pull Stitch screen code as the visual starting point for each page
✅ Always store intermediate results in Memory MCP — treat it as working memory
✅ Always use Sequential Thinking before each phase
✅ Always verify with Playwright after committing each page
✅ Always respect prefers-reduced-motion media query
✅ Always add aria-label, role attributes for accessibility
✅ Always add loading/error states for every async operation
✅ Always test mobile (390px viewport) before committing
✅ Always write comments explaining complex animation logic
✅ Always use the design tokens from :root — no hardcoded hex values in CSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL DELIVERABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When complete, provide:
1. List of all 21 commits made with file names
2. All Stitch screen IDs generated and which page each maps to
3. Admin login: URL, password
4. Complete CDN library manifest with versions
5. Memory MCP keys used and what's stored in each
6. Playwright QA report: screenshot URLs per page, issues found and fixed
7. Final file count and total lines of code (HTML / CSS / JS)
8. Live site URL confirmation: https://mathiyass.github.io/MAportfolio/

START NOW. Use Sequential Thinking MCP immediately.
Execute Phase 0 completely before touching any code.