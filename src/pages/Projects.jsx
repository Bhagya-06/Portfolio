import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "../styles/motionVariants";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { FocusRail } from "../components/ui/focus-rail";

import projectsData from "../data/projects.json";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allProjects = projectsData.projects || [];
  const flagships = allProjects.filter((p) => p.flagship);

  const categoryLabels = [
    "UI/UX & Mobile Design",
    "GenAI & AI Agents",
    "Web & Dashboard Design",
    "Front-End & Full Stack",
    "Machine Learning & Data Science",
    "Graphic Design & Branding"
  ];
  
  const categoryIds = {
    "GenAI & AI Agents": "genai",
    "Machine Learning & Data Science": "ml-ds",
    "UI/UX & Mobile Design": "uiux-mobile",
    "Web & Dashboard Design": "web-dashboard",
    "Front-End & Full Stack": "frontend-fullstack",
    "Graphic Design & Branding": "graphic-branding"
  };

  const categories = categoryLabels.map(label => ({
    id: categoryIds[label],
    label: label,
    files: allProjects.filter(p => p.category === label)
  })).filter(cat => cat.files.length > 0);

  const linkedinPosts = allProjects.filter(p => 
    p.link && (p.link.includes("linkedin.com") || p.link.includes("lnkd.in"))
  );

  return (
    <div className="min-h-screen pt-32 pb-28 px-6 max-w-6xl mx-auto">
      <Reveal>
        <SectionLabel number="03" label="Categorized Projects Portfolio" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div variants={fadeUp} className="md:col-span-7">
            <h1 className="font-display font-black text-foreground leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Selected<br /><span className="text-primary">Work</span>
            </h1>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-5 md:self-end">
            <p className="text-muted-foreground font-light leading-relaxed">
              Curated case studies organized category-wise: GenAI &amp; AI Agents, UI/UX &amp; Mobile Design, Web &amp; Dashboards, Front-End Code, and all 96 LinkedIn Activity Logs.
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-border/40">
          <button
            onClick={() => setActiveCategory("All")}
            className={`font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all ${activeCategory === "All" ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            All Work
          </button>

          <button
            onClick={() => setActiveCategory("Flagships")}
            className={`font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all ${activeCategory === "Flagships" ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            Featured ({flagships.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all ${activeCategory === cat.id ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              {cat.label} ({cat.files.length})
            </button>
          ))}

          <button
            onClick={() => setActiveCategory("LinkedIn")}
            className={`font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all ${activeCategory === "LinkedIn" ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            LinkedIn Logs ({linkedinPosts.length})
          </button>
        </motion.div>
      </Reveal>

      {/* Render Featured Flagships Section */}
      {(activeCategory === "All" || activeCategory === "Flagships") && flagships.length > 0 && (
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
            <span className="text-primary font-mono text-xs">★</span> Featured Projects
          </h2>
          <FocusRail
            items={flagships.map((file, idx) => ({
              id: `flagship-${idx}`,
              title: file.title,
              description: file.description,
              imageSrc: file.image || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
              href: file.link.includes("github.com") ? "" : file.link,
              githubUrl: file.link.includes("github.com") ? file.link : "",
              meta: file.tools,
            }))}
            autoPlay={false}
            loop={true}
          />
        </div>
      )}

      {/* Render Category Wise Sections */}
      {categories
        .filter((cat) => activeCategory === "All" || activeCategory === cat.id)
        .map((cat) => {
          const railItems = cat.files.map((file, idx) => ({
            id: `${cat.id}-${idx}`,
            title: file.title,
            description: file.description,
            imageSrc: file.image || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
            href: file.link.includes("github.com") ? "" : file.link,
            githubUrl: file.link.includes("github.com") ? file.link : "",
            meta: file.tools,
          }));

          return (
            <div key={cat.id} className="mb-16">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
                <span className="text-primary font-mono text-xs">#</span> {cat.label}
              </h2>

              <FocusRail items={railItems} autoPlay={false} loop={true} />
            </div>
          );
        })}

      {/* Render LinkedIn Logs if selected */}
      {(activeCategory === "All" || activeCategory === "LinkedIn") && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <h2 className="font-display font-bold text-2xl text-foreground">
              LinkedIn Logs
            </h2>
            <input
              type="text"
              placeholder={`Search ${linkedinPosts.length} logs...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-border px-3 py-1.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkedinPosts
              .filter((p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .slice(0, activeCategory === "All" ? 6 : linkedinPosts.length)
              .map((post) => (
                <div key={post.id} className="bg-card border border-border p-5 flex flex-col justify-between font-mono">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-primary mb-2">
                      <span className="font-bold">PROJECT #{post.id}</span>
                      <span className="text-muted-foreground">{post.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground mb-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground font-sans line-clamp-3 leading-relaxed mb-4">{post.description}</p>
                  </div>
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">{post.tools}</span>
                    {post.link && (
                      <a href={post.link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        LinkedIn Post →
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
