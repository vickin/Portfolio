# Portfolio — Technical Documentation

**Site:** [vigneshnagarajan.com](https://vigneshnagarajan.com)  
**Owner:** Vignesh Nagarajan — Smart Factory & Digital Manufacturing Leader

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | ^16 |
| UI Library | React | ^19 |
| Animations | Framer Motion | ^12 |
| Icons | Lucide React | ^1.28 |
| Styling | Tailwind CSS v4 | ^4.3 |
| CSS Processing | PostCSS + @tailwindcss/postcss | ^8.5 / ^4.3 |
| Fonts | Google Fonts via `next/font` | — |
| Email (contact form) | Web3Forms | — |
| Kudo counter (persistence) | Upstash Redis (REST API) | — |
| Hosting | Vercel | — |
| Domain | Custom (CNAME → Vercel) | — |

---

## Project Structure

```
Portfolio/
├── app/                        # Next.js App Router root
│   ├── layout.jsx              # Root layout: fonts, metadata, <html>/<body>
│   ├── page.jsx                # Single-page app — all sections assembled here
│   └── globals.css             # Global styles: CSS custom properties, utility classes
│
├── components/
│   ├── illustrations/
│   │   └── industrial-network.jsx   # Animated SVG diagram (hero section)
│   ├── sections/
│   │   ├── contact-section.jsx      # Contact form + social links + kudo button
│   │   └── metrics-grid.jsx         # Animated metrics cards (4-up grid)
│   └── ui/
│       └── reveal.jsx               # Scroll-triggered fade-in wrapper
│
├── api/                        # Vercel Serverless Functions
│   ├── contact.js              # Email handler (currently bypassed — see contact flow)
│   ├── thumbsup.js             # Kudo counter: GET count, POST increment
│   └── owner-mode.js           # Sets an HttpOnly owner cookie via secret token
│
├── public/
│   └── profile.png             # Profile photo used in hero section
│
├── assets/images/              # Static image assets (not currently used in app/)
├── css/styles.css              # Legacy CSS (not used by the Next.js build)
├── js/main.js                  # Legacy JS (not used by the Next.js build)
├── index.html                  # Legacy HTML (not used by the Next.js build)
│
├── next.config.mjs             # Next.js config (reactStrictMode: true)
├── postcss.config.mjs          # PostCSS config (@tailwindcss/postcss plugin)
├── package.json                # Dependencies and npm scripts
├── CNAME                       # Custom domain: vigneshnagarajan.com
└── .env.example                # Environment variable reference
```

> **Note:** The `css/`, `js/`, and `index.html` files at the root are legacy artifacts from an earlier static version of the site. They are not used by Vercel's Next.js build.

---

## Pages & Sections

The entire site is a **single page** (`app/page.jsx`) with anchor-linked sections:

| Section | ID | Content |
|---|---|---|
| Header | — | Sticky nav with smooth-scroll links |
| Hero | — | Name, title, CTA buttons, profile card, `IndustrialNetwork` illustration |
| Problem Statement | `#problem` | Narrative about the OT/IT gap |
| Metrics | `#metrics` | `MetricsGrid` — 4 animated KPI cards |
| Experience Timeline | `#journey` | Vertical timeline: 5 career entries |
| Capabilities | `#capabilities` | Dark-band 6-card grid of expertise areas |
| Right Now | `#now` | 4-card "current focus" grid |
| Projects | `#projects` | 3 strategic workstream teasers |
| Connect | `#connect` | `ContactSection` — form + social links + kudo |
| Footer | — | Name, location, availability |

---

## Components

### `app/layout.jsx`
Root layout wrapping the entire app. Loads two Google Fonts:
- **DM Sans** → `--font-body` (body text)
- **Space Grotesk** → `--font-display` (headings)

Also sets all SEO metadata (`<title>`, `<meta description>`, Open Graph) and the canonical URL.

---

### `components/ui/reveal.jsx`
A reusable scroll-reveal wrapper using Framer Motion.

- Animates `opacity: 0 → 1` and `y: 20 → 0` when an element scrolls into view.
- Accepts a `delay` prop for staggered entrance effects.
- Uses `viewport={{ once: true }}` so the animation only fires once.

---

### `components/sections/metrics-grid.jsx`
Displays four KPI cards in a responsive grid (1 → 2 → 4 columns).

| Metric | Value |
|---|---|
| Tracked EBIT Impact | $2.3M |
| Manufacturing Divisions | 100+ |
| Sites Scaled in 9 Months | 19 |
| Years in Industry 4.0 | 10+ |

Uses `useReducedMotion()` to disable hover animation for users with motion preferences.

---

### `components/illustrations/industrial-network.jsx`
An animated SVG diagram illustrating the OT/IT/AI data chain:

**Factory → Machines → Sensors → Edge → Cloud → AI → Business Insights**

- Animated dashed lines (looping `strokeDashoffset`) represent data flow.
- Nodes pulse using a scale + opacity animation.
- Fully accessible via `aria-label`.
- Respects `prefers-reduced-motion` via `useReducedMotion()`.

---

### `components/sections/contact-section.jsx`
The main interactive section. Contains:

1. **Contact form** — textarea (problem description) + email input + "Send it" button
2. **Email link** — direct mailto to `nvignesh20@gmail.com`
3. **Calendar link** — Calendly booking
4. **LinkedIn link**
5. **Kudo (thumbs up) button** — increments a shared counter

---

## API Routes

All three files in `api/` are Vercel Serverless Functions (Node.js, CommonJS).

### `api/contact.js`
Handles contact form submissions. Currently **only partially in use** — see Contact Form Flow below.

- Validates `problem` (min 10 chars) and `email` (regex check).
- Sanitises inputs (max 2000 / 200 chars).
- Checks for `WEB3FORMS_ACCESS_KEY` env var.
- POSTs to `https://api.web3forms.com/submit`.

### `api/thumbsup.js`
Kudo counter backed by **Upstash Redis**.

- `GET /api/thumbsup` — returns `{ count, isOwner }`.
- `POST /api/thumbsup` — increments the counter (ignored if the request has the owner cookie).
- Uses the `INCR` Redis command via Upstash's HTTP REST API.
- Reads an `HttpOnly` cookie (`portfolio_owner`) to skip incrementing for the site owner.

### `api/owner-mode.js`
Lets the site owner mark their browser as "owner" via a secret token.

- `POST /api/owner-mode` with `{ token }` — validates against `OWNER_KUDO_TOKEN` env var; if valid, sets an `HttpOnly`, `Secure`, 1-year `portfolio_owner` cookie.
- `DELETE /api/owner-mode` — clears the owner cookie.
- Usage: Visit `https://vigneshnagarajan.com?owner=<SECRET_TOKEN>` — the page reads the query param, calls this API, then strips the token from the URL.

---

## Contact Form Flow

The form submits **directly from the browser** to Web3Forms (not through the Vercel API):

```
Visitor fills form
       ↓
Browser POSTs to https://api.web3forms.com/submit
  { access_key, subject, from_name, email, message }
       ↓
Web3Forms sends email to nvignesh20@gmail.com
       ↓
Response: { success: true } → shows "Got it – I will be in touch."
```

The access key (`801f4608-...`) is embedded in the frontend — this is by design, Web3Forms keys are public and tied to the receiving email address.

> **Why not through the API?** Vercel serverless functions calling `api.web3forms.com` were blocked by Cloudflare's bot challenge. Browser-side requests pass because browsers handle Cloudflare JS challenges natively.

---

## Styling System

Tailwind CSS v4 is used as the utility layer, with a custom design system defined entirely via CSS custom properties in `app/globals.css`.

### Design Tokens

```css
--bg:            #f5f7fb   /* Page background */
--surface:       #ffffff   /* Card / component surface */
--surface-alt:   #eef3f8   /* Alternate band background */
--text:          #0f172a   /* Primary text */
--muted:         #516175   /* Secondary / body text */
--line:          #d8e1ec   /* Borders */
--accent:        #1f5ecf   /* Primary blue (links, CTAs, icons) */
--navy:          #0b1b36   /* Dark blue (hover states) */
```

### Key Utility Classes

| Class | Purpose |
|---|---|
| `.section-shell` | Max-width (1240px) centred container with responsive padding |
| `.executive-card` | White bordered card with soft shadow + hover lift transition |
| `.section-kicker` | Small uppercase blue label above section headings |
| `.section-title` | Fluid heading (`clamp(1.95rem, 4vw, 3.4rem)`) |
| `.section-body` | Constrained body copy (72ch max) |
| `.section-band-light/white/dark` | Section background variants |
| `.grid-blueprint` | Subtle engineering blueprint grid overlay (hero) |
| `.hero-network-glow` | Radial gradient glow for the network illustration card |

### Typography
- **Body:** DM Sans (variable font, loaded via `next/font/google`)
- **Headings/Display:** Space Grotesk (variable font, loaded via `next/font/google`)

### Motion
- `prefers-reduced-motion: reduce` is handled globally in CSS (disables all animations/transitions to 1ms) and in individual components via Framer Motion's `useReducedMotion()` hook.

---

## Environment Variables

| Variable | Used By | Purpose |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | `api/contact.js` | Web3Forms form key (also hardcoded in frontend as fallback) |
| `UPSTASH_REDIS_REST_URL` | `api/thumbsup.js` | Upstash Redis database URL |
| `UPSTASH_REDIS_REST_TOKEN` | `api/thumbsup.js` | Upstash Redis auth token |
| `OWNER_KUDO_TOKEN` | `api/owner-mode.js` | Secret token to identify the site owner |

All must be added to **Vercel → Project → Settings → Environment Variables**.

---

## Deployment

- **Platform:** Vercel (auto-deploy on push)
- **Branch:** `new-design` (primary working branch)
- **Build command:** `next build` (auto-detected by Vercel)
- **Output:** Static + serverless (Next.js hybrid)
- **Domain:** `vigneshnagarajan.com` — configured via the `CNAME` file at the repo root (standard Vercel custom domain setup)

### Local Development

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (validate before pushing)
npm run start      # Serve production build locally
```

---

## SEO & Metadata

Defined in `app/layout.jsx` using Next.js's `metadata` export:

- **Title:** "Vignesh Nagarajan — Smart Factory & Digital Manufacturing Leader"
- **Description:** Covers 10+ years, $2.3M EBIT impact, Magna International
- **Canonical URL:** `https://vigneshnagarajan.com`
- **Open Graph:** Title, description, URL, profile image (`/profile.png`), type `website`
- **Smooth scroll:** Enabled globally via `scroll-behavior: smooth` in CSS

---

## Key Dependencies

```json
"framer-motion":  "^12"   — scroll animations, hover effects, SVG animation
"lucide-react":   "^1.28" — all icons (Factory, Network, Cpu, Mail, ThumbsUp, etc.)
"next":           "^16"   — App Router, Image optimisation, font loading, API routes
"react":          "^19"   — UI rendering
"tailwindcss":    "^4"    — utility CSS (v4 — no tailwind.config.js needed)
"autoprefixer":   "^10"   — CSS vendor prefixing via PostCSS
```
