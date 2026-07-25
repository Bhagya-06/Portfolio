# 🌐 Live Site: [https://bhagya-06.github.io/Portfolio/](https://bhagya-06.github.io/Portfolio/)

# ✨ Bhagya B — UI/UX Designer & GenAI Developer Portfolio

> *"Designing experiences that speak for your vision"*

Welcome to the official portfolio codebase of **Bhagya B** — sitting right at the intersection of **UI/UX Design, Vibe Coding, and Generative AI**. Built with high-performance React 19, Vite 8, Tailwind CSS v4, dynamic Motion animations, and custom UI components.

---

## 🚀 Live Demo

### 🔗 **[https://bhagya-06.github.io/Portfolio/](https://bhagya-06.github.io/Portfolio/)**

---

## ✨ Key Features

- 🎨 **Modern Dark Aesthetics**: Custom HSL color design token system (`#0c0103` dark burgundy & `#ff6f3c` brand coral accents).
- 📜 **Official Certifications Stack**: Interactive 3D card stack showing accredited credentials from Microsoft, LinkedIn Learning, Databricks, and Hexaware Technologies with full-resolution certificate image viewer modals.
- ⚡ **GenAI & Technical Skills Bento Grid**: Dynamic categorization of 50+ technical competencies spanning Generative AI (LangChain, LangGraph, FastAPI, ChromaDB), UI/UX Prototyping (Figma, Framer), and Web Development (React, JS, Python, SQL).
- 💼 **Dual-Category Resumes**: Direct download dropdown for tailored resumes:
  - **UI/UX Designer** (`Bhagya B_Designer.docx`)
  - **GenAI & Full Stack** (`Bhagya_B_Resume.docx`)
- 🏆 **Flagship & Mobile Projects Showcase**: In-depth project breakdown cards complete with live links, tags, and detailed design rationale.
- 💬 **Interactive Recommendations Carousel**: Verified testimonials from mentors and project collaborators.
- 📱 **Fully Responsive Layout**: Smooth desktop & mobile drawer navigation with animated transitions.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design System
- **Animations**: [Motion / Framer Motion](https://motion.dev/) & GSAP
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: GitHub Pages (`gh-pages`) & Vercel ready

---

## 📁 Project Structure

```text
bhagya-portfolio/
├── public/
│   ├── favicon.svg               # Brand 'B' SVG icon
│   ├── profile.png               # Hero section background profile image
│   ├── resumes/                  # Tailored .docx resume files
│   └── _redirects                # SPA redirect configuration for Netlify
├── src/
│   ├── components/               # Reusable UI components (Nav, Footer, ResumeDropdown, Stack, etc.)
│   ├── data/
│   │   ├── profile.json          # Main profile info, skills, and certifications data
│   │   ├── projects.json         # Project showcase items and flagship tags
│   │   └── journey.json          # Experience milestones and recommendations
│   ├── pages/
│   │   ├── Home.jsx              # Hero section & flagship highlights
│   │   ├── Skills.jsx            # Skills Bento Grid & Accredited Certifications Stack
│   │   ├── Projects.jsx          # Complete project directory & filterable views
│   │   ├── Journey.jsx           # Career timeline & recommendations
│   │   └── Contact.jsx          # Contact information & message form
│   ├── styles/                   # Animation variants & tokens
│   ├── App.jsx                   # Main application layout & page switcher
│   └── index.css                 # Custom Tailwind CSS rules & theme tokens
├── vercel.json                   # Vercel SPA rewrite rules
├── vite.config.js                # Vite build config with base: '/Portfolio/'
└── package.json                  # Dependencies & deployment scripts
```

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bhagya-06/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 📦 Build & Deployment

### Deploying to GitHub Pages
To publish updates directly to GitHub Pages (`gh-pages` branch):

```bash
npm run deploy
```

This automatically builds the production bundle in `dist/` and pushes it to the `gh-pages` branch.

---

## 📬 Contact & Connect

- **Portfolio**: [https://bhagya-06.github.io/Portfolio/](https://bhagya-06.github.io/Portfolio/)
- **LinkedIn**: [https://www.linkedin.com/in/bhagya-b-designer](https://www.linkedin.com/in/bhagya-b-designer)
- **GitHub**: [https://github.com/Bhagya-06](https://github.com/Bhagya-06)
