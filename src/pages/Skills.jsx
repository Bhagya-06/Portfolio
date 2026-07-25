import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { fadeUp } from "../styles/motionVariants";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import SkillItem from "../components/SkillItem";
import Stack from "../components/Stack";

import profileData from "../data/profile.json";

export default function Skills({ setPage }) {
  const [zoomedCert, setZoomedCert] = useState(null);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const skills = profileData.skills || [];
  const certs = profileData.certifications || [];

  const certificateCards = useMemo(() => {
    return certs.map((cert, idx) => (
      <div 
        key={idx} 
        className="w-full h-full bg-slate-950 border-4 sm:border-8 border-card rounded-2xl flex items-center justify-center relative shadow-2xl overflow-hidden group"
        style={{ aspectRatio: "16/9" }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-lg pointer-events-none select-none"
            loading="eager"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="p-6 text-center text-muted-foreground font-sans">
            <h4 className="font-bold text-foreground mb-2">{cert.title}</h4>
            <p className="text-xs">{cert.authority}</p>
          </div>
        )}
      </div>
    ));
  }, [certs]);

  const bentoGroups = [
    {
      title: "GenAI & Prototyping",
      description: "Building autonomous systems and next-gen AI experiences.",
      icon: "✨",
      colSpan: "md:col-span-6",
      bgClass: "bg-gradient-to-br from-card to-emerald-950/20",
      skillNames: [
        "Generative AI",
        "Artificial Intelligence",
        "Vibe Coding",
        "Prompt Engineering",
        "Responsible AI",
        "Microsoft Copilot",
        "AI for Business",
        "LangChain",
        "LangGraph",
        "ChromaDB",
        "FastAPI"
      ]
    },
    {
      title: "UI/UX & Creative Design",
      description: "Visual design systems, high-fidelity prototypes, and motion.",
      icon: "🎨",
      colSpan: "md:col-span-6",
      bgClass: "bg-gradient-to-br from-card to-teal-950/20",
      skillNames: [
        "UI/UX Design",
        "User Interface Prototyping",
        "User Experience Design",
        "Figma",
        "Framer",
        "Canva",
        "Photopea",
        "Logo Design",
        "Image Editing",
        "Video Editing",
        "Inkscape",
        "CapCut"
      ]
    },
    {
      title: "Web & Front-End Engineering",
      description: "Responsive layouts, reactive frameworks, and dynamic code.",
      icon: "💻",
      colSpan: "md:col-span-5",
      bgClass: "bg-gradient-to-br from-card to-cyan-950/20",
      skillNames: [
        "React",
        "Front-End Development",
        "Web Design",
        "Responsive Web Design",
        "HTML",
        "CSS",
        "JavaScript",
        "JS",
        "WordPress Development",
        "WordPress",
        "Elementor"
      ]
    },
    {
      title: "Languages & Developer Tools",
      description: "Execution environments, databases, and workflow utilities.",
      icon: "🛠️",
      colSpan: "md:col-span-7",
      bgClass: "bg-gradient-to-br from-card to-neutral-950/20",
      skillNames: [
        "Python",
        "SQL",
        "C",
        "PHP",
        "MATLAB",
        "C#",
        ".NET",
        "IT Projects",
        "Start-up Projects",
        "Creative Problem Solving",
        "Blogging",
        "GitHub",
        "VSCode",
        "Notion"
      ]
    }
  ];

  // Match skills dynamically
  const getSkillsForGroup = (groupNames) => {
    return skills.filter((s) =>
      groupNames.some((gn) => gn.toLowerCase() === s.toLowerCase())
    );
  };

  const allGroupNames = bentoGroups.flatMap((g) => g.skillNames.map((n) => n.toLowerCase()));
  const unclassifiedSkills = skills.filter(
    (s) => !allGroupNames.includes(s.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-28 px-6 max-w-6xl mx-auto">
      <Reveal>
        <SectionLabel number="02" label="Skills & Certifications" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <motion.div variants={fadeUp} className="md:col-span-7">
            <h1 className="font-display font-black text-foreground leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Technical<br /><span className="text-primary">Competencies</span>
            </h1>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-5 md:self-end">
            <p className="text-muted-foreground font-light leading-relaxed">
              Full list of {skills.length} technical skills across Generative AI, UI/UX prototyping, front-end code, and official Microsoft/Databricks accreditations.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid layout with Hover Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {bentoGroups.map((group, idx) => {
            const groupSkills = getSkillsForGroup(group.skillNames);
            if (group.title.includes("Languages") && unclassifiedSkills.length > 0) {
              unclassifiedSkills.forEach(s => {
                if (!groupSkills.some(gs => gs.toLowerCase() === s.toLowerCase())) {
                  groupSkills.push(s);
                }
              });
            }

            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`${group.colSpan} p-6 border border-border rounded-2xl ${group.bgClass} flex flex-col justify-between`}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl">{group.icon}</span>
                    <h3 className="font-display font-bold text-lg text-foreground">{group.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{group.description}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {groupSkills.map((skill, sIdx) => (
                    <SkillItem key={sIdx} skill={skill} setPage={setPage} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Official Certifications & Awards */}
        <SectionLabel number="02.1" label="Official Certifications & Awards" />
        
        <div className="relative w-full mt-10 mb-20 py-8 px-4 overflow-visible">
          {/* Card Stack component container */}
          <div className="relative w-full max-w-lg h-56 sm:h-72 mx-auto overflow-visible select-none my-10">
            <Stack
              randomRotation={true}
              sensitivity={140}
              sendToBackOnClick={true}
              onCardChange={(idx) => setActiveCertIndex(idx)}
              cards={certificateCards}
            />
          </div>

          {/* Dynamic text details below the stack */}
          <div className="mt-16 text-center max-w-xl mx-auto border border-border/30 bg-card/40 backdrop-blur-sm p-6 rounded-2xl shadow-xl font-mono relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="text-[10px] text-primary mb-2 tracking-widest uppercase font-bold">
              Accredited by {certs[activeCertIndex]?.authority}
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-3 leading-snug">
              {certs[activeCertIndex]?.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-5">
              Earned on {certs[activeCertIndex]?.date} {certs[activeCertIndex]?.licenseNumber && `· ID: ${certs[activeCertIndex]?.licenseNumber}`}
            </p>
            {certs[activeCertIndex]?.url && (
              <a
                href={certs[activeCertIndex]?.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-foreground font-bold border border-primary/20 rounded-xl transition-all duration-300 text-xs shadow-md"
              >
                Verify Online Credential <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
