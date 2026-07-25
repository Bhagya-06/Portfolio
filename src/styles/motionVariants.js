// Shared Framer Motion Variants for page and component animations

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};
