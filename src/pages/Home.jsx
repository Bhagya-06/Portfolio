import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../styles/motionVariants";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import ResumeDropdown from "../components/ResumeDropdown";
import TiltedCard from "../components/TiltedCard/TiltedCard";
import ElectricBorder from "../components/ElectricBorder/ElectricBorder";
import AuroraText from "../components/AuroraText";
import ShinyText from "../components/ShinyText";
import AnnotationText from "../components/AnnotationText";

import profileData from "../data/profile.json";
import journeyData from "../data/journey.json";
import projectsData from "../data/projects.json";
import profileImg from "../../public/profile.png";

const TICKER = profileData.skills || [
  "GenAI", "LangGraph", "FastAPI", "React", "Python", "ChromaDB",
  "Figma", "Framer", "RAG Pipelines", "UI/UX", "Vibe Coding"
];

export default function Home({ setPage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const flagships = (projectsData.projects || []).filter((p) => p.flagship);
  const testimonials = journeyData.recommendations || [];

  useEffect(() => {
    if (testimonials.length > 0) {
      const t = setInterval(() => setActiveTestimonial((n) => (n + 1) % testimonials.length), 6000);
      return () => clearInterval(t);
    }
  }, [testimonials.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-screen max-h-screen flex flex-col justify-between overflow-hidden bg-transparent pt-24 px-6 md:px-12 pb-0 select-none">

        {/* Background Profile Image - centered, behind the text overlay */}
        <div className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none">
          <div className="relative w-full max-w-2xl h-full flex items-end justify-center pb-0">
            <img
              src={profileImg}
              alt="Bhagya B"
              className="h-[95vh] md:h-[100vh] w-auto object-contain object-bottom scale-[1.35] origin-bottom md:scale-100 opacity-85 mix-blend-lighten"
            />
          </div>
        </div>

        {/* Content Layer - Spacer to push layout down */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 pt-6 pb-2" />

        {/* Hero Bottom Content (Hero Statement + CTA Buttons) */}
        <div className="relative z-20 w-full flex flex-col items-center gap-4 text-center pb-2 md:pb-4 px-4">

          {/* Giant Hero Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center font-display font-black text-foreground leading-none tracking-tighter w-full select-none"
            style={{ fontSize: "clamp(1.1rem, 4.2vw, 3.2rem)" }}
          >
            <AnnotationText
              text={profileData.profile.hero_statement}
              annotations={[
                { phrase: "experiences", type: "circle", color: "#ff6f3c" },
                { phrase: "your vision", type: "underline", color: "#ff6f3c" },
              ]}
              trigger="mount"
              stagger={250}
              strokeWidth={3}
            />
          </motion.div>

          {/* Sub-headline description highlighted below the hero statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs sm:text-sm text-foreground/90 bg-primary/10 border border-primary/20 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(255,111,60,0.1)] backdrop-blur-xs font-medium inline-flex items-center justify-center whitespace-normal sm:whitespace-nowrap max-w-[90vw] sm:max-w-none mx-auto"
          >
            {profileData.profile.sub_headline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-1 relative z-30"
          >
            <button
              onClick={() => setPage("Projects")}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors font-bold"
            >
              My works <ArrowRight size={11} />
            </button>
            <ResumeDropdown />
          </motion.div>
        </div>

        {/* Ticker Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-20 border-t border-b border-border/50 py-3 overflow-hidden -mx-6 md:-mx-12"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap w-max"
          >
            {[...TICKER, ...TICKER].map((tech, i) => (
              <span key={i} className="font-mono text-[8px] text-foreground/60 tracking-[0.25em] uppercase font-medium">
                {tech} <span className="text-primary/75 mx-1.5">·</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Recommendations & Testimonials (What People Say About Me) */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel number="01" label="What People Say About Me" />
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                >
                  <div className="md:col-span-8">
                    <p className="font-display font-light text-foreground leading-relaxed text-lg sm:text-xl">
                      "{testimonials[activeTestimonial].text}"
                    </p>
                  </div>
                   <div className="md:col-span-4 flex flex-col md:items-end items-start gap-4">
                    {testimonials[activeTestimonial].image && (
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].recommender}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-[0_0_15px_rgba(255,111,60,0.15)]"
                      />
                    )}
                    <div className="md:text-right text-left">
                      <p className="font-display font-bold text-foreground text-base">{testimonials[activeTestimonial].recommender}</p>
                      <p className="font-mono text-[10px] text-primary tracking-[0.15em] mt-1">{testimonials[activeTestimonial].title}</p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1">{testimonials[activeTestimonial].date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2.5 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-px transition-all duration-300 ${i === activeTestimonial ? "w-14 bg-primary" : "w-5 bg-border hover:bg-muted-foreground/40"}`}
                />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Featured Projects / Best Work (Tier 1 Showcase) */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-border/40">
        <Reveal>
          <SectionLabel number="02" label="Featured Projects" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flagships.map((project) => (
              <ElectricBorder
                key={project.id}
                color="#ff6f3c"
                speed={0.8}
                chaos={0.1}
                borderRadius={16}
                style={{ width: "100%", height: "100%" }}
              >
                <motion.div
                  variants={fadeUp}
                  onClick={() => setPage("Projects")}
                  className="bg-card p-6 group cursor-pointer h-full relative overflow-hidden flex flex-col justify-between"
                  style={{ borderRadius: 16 }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div>
                    {project.image && (
                      <div className="w-full h-40 rounded overflow-hidden mb-6 border border-border/40">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-[9px] text-primary tracking-wider uppercase border border-primary/20 px-2 py-0.5">
                        {project.category}
                      </span>
                      <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-light line-clamp-3">{project.description}</p>

                    <div className="p-3 bg-secondary/80 border border-border/40 text-[10px] font-mono text-primary mb-6 line-clamp-3">
                      ⚡ {project.bullets && project.bullets[0]}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((tag) => (
                      <span key={tag} className="font-mono text-[8px] text-muted-foreground/60 border border-border/60 px-1.5 py-0.5 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </ElectricBorder>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 text-right">
            <button
              onClick={() => setPage("Projects")}
              className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.2em] uppercase inline-flex items-center gap-2 font-bold"
            >
              All Projects ({(projectsData.projects || []).length}) <ArrowRight size={12} />
            </button>
          </motion.div>
        </Reveal>
      </section>

      {/* Expertise & Skills Teaser */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-border/40">
        <Reveal>
          <SectionLabel number="03" label="Expertise & Vibe Coding" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeUp}>
              <h2 className="font-display font-black text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
                AI-Assisted<br />
                <span className="text-primary">Vibe Coding</span> &amp;<br />
                UI/UX Craft.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                Computers fascinated me before I even knew what design was. I tried frontend, backend (hated it), then discovered UI/UX. When GenAI happened, everything changed: now I can design full experiences and build working prototypes using AI tools without touching backend code.
              </p>
              <button
                onClick={() => setPage("Skills")}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-bold"
              >
                View Full Skill Matrix <ArrowRight size={12} />
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {profileData.skills.slice(0, 8).map((skillName) => (
                <div key={skillName} className="p-3.5 bg-card border border-border/50 flex items-center justify-between font-mono text-xs text-foreground">
                  <span className="flex items-center gap-2">
                    <Sparkles size={12} className="text-primary" />
                    {skillName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Competency</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-border/40">
        <Reveal>
          <motion.div variants={fadeUp} className="text-center py-8">
            <p className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase mb-6">Let's collaborate</p>
            <h2
              className="font-display font-black text-foreground leading-none tracking-tighter mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Have an AI or UI/UX
              <br />
              project in mind?
            </h2>
            <button
              onClick={() => setPage("Contact")}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-[10px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-primary/90 transition-colors font-bold"
            >
              Get in Touch <ArrowRight size={12} />
            </button>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
