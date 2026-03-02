# CRAFTSYNK V2 — WEBSITE DOCUMENTATION

## Overview
A complete, production-ready multi-page portfolio website for Craftsynk — the brand identity studio of Chandan B. Jal. Built with a refined glassmorphism aesthetic, dark/light mode, cursor effects, and premium interactions.

---

## File Structure

```
craftsynk/
├── index.html              ← Homepage
├── about.html              ← About / Studio philosophy
├── work.html               ← Portfolio gallery with filter tabs
├── services.html           ← Services (pricing removed)
├── blog.html               ← Blog / articles grid
├── blog-post.html          ← Blog article template
├── contact.html            ← Project inquiry form (glassmorphism redesign)
│
├── craftsynk-v2.css        ← Shared design system (linked in all pages)
├── craftsynk-v2.js         ← Shared JS (cursor, theme, reveal, counters)
│
├── robots.txt              ← Search engine crawl rules
├── sitemap.xml             ← XML sitemap for SEO
├── README.md               ← This file
│
├── .claude/
│   └── launch.json         ← Dev server configuration
│
└── images/
    └── logo.png            ← CraftSynk logo
```

---

## Design System

### Colors
- **Background dark:** `#090909`
- **Background light:** `#eeede9`
- **Accent (lime):** `#b8f73a`
- **Lime glow:** `rgba(184,247,58,0.45)`
- **Glass bg dark:** `rgba(255,255,255,0.048)`
- **Glass bg light:** `rgba(255,255,255,0.58)`

### Typography
- **Display / Headlines:** Syne (Google Fonts) — weights 400–800
- **Body:** DM Sans (Google Fonts) — weights 300–600

### Radius System
- `--r-sm: 10px` — small elements, tags
- `--r-md: 16px` — icon containers, small cards
- `--r-lg: 24px` — cards, panels
- `--r-xl: 32px` — large cards, containers, nav
- `--r-pill: 100px` — buttons, badges, nav links

---

## Interactive Effects

### Button Shine Animation
- **Lime buttons (`.btn-primary`):** Subtle white sweep animation across the entire button (3s loop)
- **Ghost buttons (`.btn-ghost`):** Lighter text shine sweep (4s loop)
- Both use `@keyframes btn-shine` with `overflow: hidden` containment

### Glow Effects
- **`.glow-text`:** Text glows lime on hover via `text-shadow`
- **`.glow-icon`:** Icons glow lime on hover via `text-shadow` + `filter: drop-shadow`
- **Nav links:** Glow on hover instead of background tab highlight
- **Step numbers, service icons, bento icons:** All glow lime on hover

### Glass Tab Edge Glow
- **`.glass-tab`:** Border glows lime subtly on hover with `box-shadow`
- Applied to bento cards, process steps, filter tabs, category tabs

### Interactive Stats
- **`.stat-interactive`:** Cards lift + scale on hover with lime glow shadow
- Applied to work.html stats bar and about.html stat cards

---

## Setup Instructions

### 1. Link the shared files
Every HTML page already links:
```html
<link rel="stylesheet" href="craftsynk-v2.css" />
```
and at the bottom:
```html
<script src="craftsynk-v2.js"></script>
<script>initPage('page-name.html');</script>
```

### 2. Add your logo
Replace `images/logo.png` with your CraftSynk logo file.

### 3. Add your photo (About page)
In `about.html`, replace the placeholder `div.photo-placeholder` with:
```html
<img src="images/chandan.jpg" alt="Chandan B. Jal" />
```

### 4. Update social media links
In the footer of each page, update the 4 `.social-btn` anchor `href` attributes:
- Behance
- Dribbble
- Instagram
- Fiverr

SVG icons are already embedded inline for each social platform.

### 5. Set up the contact form
The contact form supports Google Form integration. Update the `action` URL and `entry.XXXXXXX` field names in `contact.html` to match your Google Form.

### 6. Blog posts
The `blog-post.html` template includes:
- Reading progress bar (scroll-based)
- Share buttons (Twitter/X, LinkedIn, Facebook, Copy link)
- Author bio card
- Comments section (Google Form iframe placeholder)
- Related posts grid

Duplicate `blog-post.html` for each new article and update the content.

---

## Features

### Dark / Light Mode
- Default: dark
- Toggle persists via `localStorage` (key: `cs-theme`)
- Smooth 350ms transition between modes
- Lime accent works in both modes

### Custom Cursor
- Small dot that tracks instantly
- Larger ring that follows with slight lag
- Background glow that follows slowly
- Expands on hover over interactive elements

### Animated Mesh Background
- Two soft radial gradients (lime + blue)
- Drifts slowly with CSS keyframe animation
- Fixed position, z-index 0

### Scroll Reveal
- All `.reveal` elements animate in on scroll
- Uses IntersectionObserver (performant)
- `transition-delay` used for staggered group reveals

### Glassmorphism
- `backdrop-filter: blur(24px)` on all glass elements
- Semi-transparent backgrounds
- Subtle border + shadow
- Glass hover includes lime border-color accent
- Consistent border-radius system

### Portfolio Filter (work.html)
- Click tabs to filter by category (with glow hover effect)
- `data-category` attribute on each `.pb-card`
- Instant show/hide
- Interactive stats bar with hover animations

### Services Accordion (services.html)
- Click to expand/collapse
- Only one open at a time
- Smooth max-height transition
- Supports hash links: `services.html#identity`
- Pricing details removed; tiers focus on deliverables

### Blog Category Filter (blog.html)
- Same filter pattern as portfolio
- Includes featured post in filter scope
- Category tabs with lime glow hover

### Contact Form (contact.html)
- Glassmorphism redesign matching site theme
- Two-column layout: sticky info panel + form card
- Service chip toggles (multi-select)
- Budget chip toggles (single-select)
- Form validation with per-field error states
- Success animation on submit
- Pre-fill support from URL params (?brand=X&concept=Y)

### Blog Post Template (blog-post.html)
- Reading progress bar (fixed, lime, scroll-based)
- Article hero with back link, category badge, metadata
- Blockquote styling with lime left border
- Social share buttons (Twitter/X, LinkedIn, Facebook, clipboard)
- Author bio card (glassmorphism)
- Comments section placeholder
- Related posts grid

---

## Navigation
- **Logo click** → Home page (`index.html`)
- **"Start Project" CTA** → Contact page (`contact.html`)
- **Header "Home"** → Home page (`index.html`)

---

## Footer Social Icons
All pages use inline SVG icons for social links:
- Behance
- Dribbble
- Instagram
- Fiverr

---

## Placeholder Markers

These need to be replaced with real content:

| Location | Placeholder | Action needed |
|---|---|---|
| `about.html` | `div.photo-placeholder` | Add real headshot |
| `work.html` | 3 placeholder cards | Add real project images |
| `blog.html` | Post image placeholders | Add real article cover images |
| All pages | Footer social `href="#"` | Add real social URLs |
| `contact.html` | Google Form action | Add real Google Form URL + entry IDs |
| `blog-post.html` | Sample article content | Replace with real blog articles |

---

## Performance Notes
- All images use `loading="lazy"` — no layout shift
- Google Fonts loaded via preconnect for fastest loading
- CSS custom properties allow instant theme switching without repaints
- Cursor uses `requestAnimationFrame` — smooth 60fps
- Backdrop filter is GPU-accelerated on modern browsers
- Button shine animations use GPU-composited transforms

---

## Dev Server
Run locally with Python:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

*Craftsynk V2 — Built for Chandan B. Jal · 2026*
