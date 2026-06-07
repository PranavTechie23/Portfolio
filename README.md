<div align="center">

# PRANAV SANJAY OSWAL

### Full-Stack Engineer · AI/ML Builder · Competitive Programmer

[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

*A high-fidelity, interactive developer portfolio — built with futuristic aesthetics, motion-driven UX, and real engineering depth.*

**[🌐 Live Demo](https://pranav-portfolio-live.vercel.app)**

</div>

---

## ✦ Interactive Features

This portfolio is not a static page. Every section is a live experience:

- **Blueprint Canvas & Compass HUD** — Mathematical coordinate grids with rotating vector overlays and azimuth indicators, rendered directly on canvas.
- **Floating Telemetry Dashboards** — Matrix-grid panels displaying live activity sparklines, pseudo-compiler output, and animated code streams.
- **Mobile Parallax / Sensor Sync** — `DeviceOrientationEvent` integration maps gyroscope tilt to parallax depth layers — the page moves with your phone.
- **Lenis Smooth Scroll** — Lenis-powered inertia scrolling coupled with animated topographic background contours that shift at independent scroll rates.
- **Scroll Progress Indicator** — Glowing top-bar progress line tracks reading position in real time.
- **Dark / Light Mode** — System-preference aware with instant toggle and zero flash on load.

---

## ⬡ Project Architecture

```
Portfolio/
├── public/
│   └── images/                  # Static assets
├── src/
│   ├── App.tsx                  # Root layout, scroll tracking, theme management
│   ├── constants.tsx            # ← All customizable content lives here
│   ├── index.css                # Global styles and design tokens
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── components/
│   │   ├── Hero.tsx             # Landing — canvas HUD, parallax, telemetry cards
│   │   ├── About.tsx            # About section
│   │   ├── Achievements.tsx     # Achievements & recognition
│   │   ├── Skills.tsx           # Animated skill grid
│   │   ├── Projects.tsx         # Project cards with stack badges
│   │   ├── BuildInPublic.tsx    # Build-in-public log
│   │   ├── Platforms.tsx        # Social platform links
│   │   ├── Journey.tsx          # Certifications & learning timeline
│   │   ├── Contact.tsx          # Contact / email CTA
│   │   ├── Navbar.tsx           # Sticky navigation with active section tracking
│   │   ├── BackgroundSystem.tsx # Topographic animated background
│   │   ├── BlueprintCanvas.tsx  # Canvas-rendered blueprint grid
│   │   ├── CustomCursor.tsx     # Custom cursor component
│   │   ├── AnimatedText.tsx     # Decrypt / reveal text animations
│   │   └── motion/              # Reusable motion components (Magnetic, TechMarquee)
│   └── utils/                   # Utility helpers
├── index.html
├── vite.config.ts
└── package.json
```

---

## ▶ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- `npm` `v9+` (bundled with Node)

### Installation & Dev Server

```bash
# 1. Clone the repository
git clone https://github.com/PranavTechie23/Portfolio_Website.git
cd Portfolio_Website

# 2. Install dependencies
npm install

# 3. Start the development server (hot reload enabled)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and minify for production
npm run build

# Preview the production build locally before deploying
npm run preview
```

Build output is written to `dist/`. Deploy this folder to any static host (Vercel, Netlify, GitHub Pages).

---

## ⚙ How to Customize

**All personalizable content is centralized in a single file:**

```
src/constants.tsx
```

Edit this file to update your projects, skills, platform links, and journey milestones — no hunting through component files required.

### What you can change

| Key | What it controls |
|---|---|
| `PROJECTS` | Array of project objects — name, description, stack, GitHub link |
| `SKILL_CATEGORIES` | Skill categories and individual skill entries |
| `PLATFORMS` | GitHub, LinkedIn, LeetCode, GeeksForGeeks URLs |
| `JOURNEY_ITEMS` | Certification cards and learning milestones |

### Example — adding a project

```tsx
// src/constants.tsx

export const PROJECTS: Project[] = [
  {
    id: '4',
    name: "Your Project Name",
    problem: "What problem it solves and why it matters.",
    stack: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/PranavTechie23/your-repo",
  },
  // ...existing projects
];
```

---

## ⬢ Featured Projects

| Project | Description | Stack |
|---|---|---|
| **Campus Career & Placement Intelligence Platform** | Automated candidate–job matching with CGPA, branch, and skill constraints | System Architecture · REST APIs · Backend |
| **OncoAI — AI Cancer Treatment Planning** | ML-based clinical decision support with SHAP explainability for personalized oncology care | Machine Learning · SHAP · Healthcare AI |
| **SkillConnect Job Board** | Full-stack hiring platform with skill- and location-based candidate filtering | Full-Stack · Database Design · Web Dev |

---

## ∷ Tech Stack

**Languages:** C · C++ · Java · Python · TypeScript

**Frontend:** React · TailwindCSS · Framer Motion · Lenis · HTML/CSS

**AI / ML:** scikit-learn · SHAP · LangChain · Pandas · NumPy

**Dev Tools:** Git · GitHub · Vite · VS Code · Vercel

---

## 🚀 Deploying to Vercel

1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com) and import `PranavTechie23/Portfolio_Website`
3. Framework preset: **Vite** — auto-detected
4. Click **Deploy**

Every subsequent `git push` to `main` triggers an automatic redeploy.

---

## ∫ Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PranavTechie23)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pranav-oswal)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/PranavTechie23)
[![GeeksForGeeks](https://img.shields.io/badge/GeeksForGeeks-2F8D46?style=for-the-badge&logo=geeksforgeeks&logoColor=white)](https://www.geeksforgeeks.org/user/pranavoswal)

📧 [pranavoswal21@gmail.com](mailto:pranavoswal21@gmail.com)

</div>

---

<div align="center">

*Engineered with intent. Designed to be remembered.*

**Pranav Sanjay Oswal** · PICT Pune · Computer Engineering · 2025

</div>