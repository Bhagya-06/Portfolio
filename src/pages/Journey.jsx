import { motion } from "motion/react";
import { fadeUp } from "../styles/motionVariants";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import TimelineDemo from "../components/timeline-demo";

import journeyData from "../data/journey.json";

export default function Journey() {
  const testimonials = journeyData.recommendations || [];

  return (
    <div className="min-h-screen pt-32 pb-28 px-6 max-w-6xl mx-auto">
      <Reveal>
        <SectionLabel number="04" label="Work Experience & Education Timeline" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 mt-8">
          <motion.div variants={fadeUp} className="md:col-span-7">
            <h1 className="font-display font-black text-foreground leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Career<br /><span className="text-primary">Timeline</span>
            </h1>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-5 md:self-end">
            <p className="text-muted-foreground font-light leading-relaxed">
              Internships, freelance web design, and UI/UX project experience.
            </p>
          </motion.div>
        </div>
        
        <div className="mb-12">
          <TimelineDemo />
        </div>

        {/* Recommendations Section */}
        {testimonials.length > 0 && (
          <div className="mt-20">
            <SectionLabel number="04.1" label="Real Recommendations" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((rec, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-card border border-border p-6 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground italic mb-6 leading-relaxed font-light">"{rec.text}"</p>
                  <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">{rec.recommender}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{rec.title}</p>
                    </div>
                    <span className="font-mono text-[9px] text-primary">{rec.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Reveal>
    </div>
  );
}
