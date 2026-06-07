<div align="center">

# PRANAV SANJAY OSWAL

### Full-Stack Engineer · AI/ML Builder · Competitive Programmer

[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

*A high-fidelity, interactive developer portfolio — built with futuristic aesthetics, motion-driven UX, and real engineering depth.*

</div>

---

## ✦ Interactive Features

This portfolio is not a static page. Every section is a live experience:

- **Blueprint Canvas & Compass HUD** — Mathematical coordinate grids with rotating vector overlays and azimuth indicators, rendered directly on canvas.
- **Floating Telemetry Dashboards** — Matrix-grid panels displaying live activity sparklines, pseudo-compiler output, and animated code streams.
- **Mobile Parallax / Sensor Sync** — `DeviceOrientationEvent` integration maps gyroscope tilt to parallax depth layers — the page moves with your phone.
- **Lenis Smooth Scroll + Topographic Parallax** — Lenis-powered inertia scrolling coupled with animated topographic background contours that shift at independent scroll rates.
- **Decrypted Text / Motion Hooks** — Hover any key text to trigger a cryptographic character-scramble decode animation.

---

## ⬡ Project Architecture

```
Portfolio/
├── public/
│   └── assets/                  # Static images and icons
├── src/
│   ├── App.tsx                  # Root layout, route structure, name branding
│   ├── constants.tsx            # ← All customizable data lives here
│   ├── components/
│   │   ├── Hero.tsx             # Landing section — canvas HUD, parallax, decrypt text
│   │   ├── Projects.tsx         # Project cards with live stack badges
│   │   ├── Skills.tsx           # Animated skill grid
│   │   ├── Journey.tsx          # Certification & milestone timeline
│   │   └── Connect.tsx          # Social links and contact module
│   ├── hooks/
│   │   ├── useDeviceOrientation.ts   # Gyroscope → parallax sync
│   │   ├── useDecryptText.ts         # Character-scramble animation hook
│   │   └── useLenis.ts               # Smooth scroll initializer
│   └── utils/
│       ├── canvas.ts            # Blueprint grid & compass HUD rendering
│       └── telemetry.ts         # Sparkline and matrix panel generators
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

> **Note:** The tree above reflects the intended structure. Actual file paths may vary slightly — use your IDE's file explorer to navigate.

---

## ▶ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- `npm` `v9+` (bundled with Node)

### Installation & Dev Server

```bash
# 1. Clone the repository
git clone https://github.com/PranavTechie23/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server (hot reload enabled)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

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

Edit this file to update your name, bio, projects, skills, certifications, and social links — no hunting through component files required.

### What you can change

| Key | What it controls |
|---|---|
| `HERO_NAME` | Name displayed in the Hero section and document title |
| `HERO_TAGLINE` | Subtitle / one-liner beneath your name |
| `PROJECTS` | Array of project objects — title, description, stack, links |
| `SKILLS` | Skill categories and individual entries |
| `JOURNEY` | Certification cards and learning milestones |
| `SOCIAL_LINKS` | GitHub, LinkedIn, LeetCode, and other platform URLs |

### Example — adding a project

```tsx
// src/constants.tsx

export const PROJECTS = [
  {
    title: "Your Project Name",
    description: "What it does and why it matters.",
    stack: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/PranavTechie23/your-repo",
    live: "https://pranav-portfolio-live.vercel.app",
  },
  // ...existing projects
];
```

---

## ⬢ Featured Projects

| Project | Description | Stack |
|---|---|---|
| **Campus Career & Placement Intelligence Platform** | Automated candidate–job matching with CGPA, branch, and skill constraints | System Architecture · REST APIs · Backend |
| **OncoAI — AI Cancer Treatment Planning** | ML-based clinical decision support with SHAP explainability for personalized oncology care | XGBoost · SHAP · Healthcare AI |
| **SkillConnect Job Board** | Full-stack hiring platform with role-based access, skill filtering, and real-time matching | React · TypeScript · Node.js · PostgreSQL |
| **CrediNova / ACIE** | AI-powered credit scoring platform with fairness monitoring and PSI drift detection | XGBoost · SHAP · MERN Stack |

---

## ∷ Tech Stack

**Languages:** C · C++ · Java · Python · TypeScript

**Frontend:** React · TailwindCSS · Framer Motion · Lenis · HTML/CSS

**Backend & DB:** Node.js · Express · PostgreSQL (NeonDB) · MongoDB

**AI / ML:** scikit-learn · XGBoost · SHAP · LangChain · Pandas · NumPy

**Dev Tools:** Git · GitHub · Vite · VS Code · Vercel

---

## ∫ Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PranavTechie23)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](#)
[![GeeksForGeeks](https://img.shields.io/badge/GeeksForGeeks-2F8D46?style=for-the-badge&logo=geeksforgeeks&logoColor=white)](#)

</div>

---

<div align="center">

*Engineered with intent. Designed to be remembered.*

**Pranav Sanjay Oswal** · PICT Pune · Computer Engineering · 2025

</div>