import { motion } from "motion/react";
import { fadeUp } from "../styles/motionVariants";

export default function SectionLabel({ number, label }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
      <span className="font-mono text-[10px] text-primary tracking-[0.25em]">{number}</span>
      <div className="h-px w-8 bg-primary shrink-0" />
      <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">{label}</span>
    </motion.div>
  );
}
