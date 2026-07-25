import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, ChevronDown } from "lucide-react";

const RESUME_OPTIONS = [
  { label: "UI/UX Designer", file: "/resumes/Bhagya B_Designer.docx" },
  { label: "GenAI & Full Stack", file: "/resumes/Bhagya_B_Resume.docx" },
];

export default function ResumeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[9px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-primary/90 transition-colors font-bold cursor-pointer"
      >
        <Download size={11} />
        Resumes
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 bottom-full mb-2 w-64 bg-card border border-border z-50 overflow-hidden shadow-2xl rounded-lg"
          >
            {RESUME_OPTIONS.map((opt, i) => (
              <a
                key={opt.label}
                href={opt.file}
                download
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-wider text-muted-foreground hover:text-primary hover:bg-secondary transition-colors ${
                  i < RESUME_OPTIONS.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span>{opt.label}</span>
                <Download size={11} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
