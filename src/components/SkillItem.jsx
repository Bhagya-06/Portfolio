import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, ArrowUpRight } from "lucide-react";
import { fadeUp } from "../styles/motionVariants";
import projectsData from "../data/projects.json";

function getProjectsForSkill(skillName, projectsData) {
  const normSkill = (skillName || "").toLowerCase();
  const matched = [];

  (projectsData.projects || []).forEach((proj) => {
    const inSkills = (proj.skills || []).some((s) => s.toLowerCase().includes(normSkill) || normSkill.includes(s.toLowerCase()));
    const inTools = (proj.tools || "").toLowerCase().includes(normSkill);
    const inTitle = (proj.title || "").toLowerCase().includes(normSkill);

    if (inSkills || inTools || inTitle) {
      if (!matched.some(m => m.title === proj.title)) {
        matched.push({
          title: proj.title,
          category: proj.category || (proj.flagship ? "Featured Project" : "Project")
        });
      }
    }
  });

  // Fallback matching if empty
  if (matched.length === 0) {
    if (normSkill.includes("genai") || normSkill.includes("ai") || normSkill.includes("agent") || normSkill.includes("rag") || normSkill.includes("python") || normSkill.includes("langgraph") || normSkill.includes("chromadb") || normSkill.includes("fastapi")) {
      matched.push({ title: "DesiFinds AI Engine", category: "GenAI & AI Agents" });
      matched.push({ title: "12 AI Agents & RAG Apps Suite", category: "GenAI & AI Agents" });
    } else if (normSkill.includes("figma") || normSkill.includes("ui") || normSkill.includes("ux") || normSkill.includes("design") || normSkill.includes("mobile") || normSkill.includes("framer")) {
      matched.push({ title: "Planteur - Plant Care App UI & Community Platform", category: "UI/UX Design" });
      matched.push({ title: "NPTEL Swayam E-Learning Platform Redesign", category: "UI/UX Design" });
    } else {
      matched.push({ title: "DesiFinds – AI Product Discovery Platform", category: "GenAI & AI Agents" });
    }
  }

  return matched;
}

export default function SkillItem({ skill, setPage }) {
  const [isHovered, setIsHovered] = useState(false);
  const matchedProjects = getProjectsForSkill(skill, projectsData);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-card border border-border rounded-xl px-3.5 py-2 font-mono text-xs text-foreground hover:border-primary transition-all duration-300 shadow-md cursor-pointer select-none inline-block ${isHovered ? "z-50 border-primary" : "z-10"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
          <span className="font-bold text-foreground group-hover:text-primary transition-colors">{skill}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary">
          <ChevronDown size={13} className={`transition-transform duration-300 ${isHovered ? "rotate-180 text-primary" : ""}`} />
        </div>
      </div>

      {/* Hover Dropdown Menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full mt-2 w-full min-w-[260px] bg-slate-950/95 border border-primary/50 rounded-xl p-3 z-50 shadow-2xl backdrop-blur-xl"
          >
            <div className="font-mono text-[9px] text-primary tracking-[0.2em] uppercase mb-2 font-bold px-1 border-b border-white/10 pb-1.5 flex items-center justify-between">
              <span>Connected Projects ({matchedProjects.length})</span>
              <Sparkles size={10} className="text-primary" />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {matchedProjects.map((p, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPage("Projects");
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-between group/item"
                >
                  <div className="truncate pr-2">
                    <p className="text-[11px] font-bold text-gray-200 group-hover/item:text-primary truncate font-sans">
                      {p.title}
                    </p>
                    <p className="text-[9px] text-gray-400 font-mono">
                      {p.category}
                    </p>
                  </div>
                  <ArrowUpRight size={12} className="text-gray-400 group-hover/item:text-primary shrink-0 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
