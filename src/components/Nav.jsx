import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = ["Home", "Skills", "Projects", "Journey", "Contact"];

export default function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p) => {
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => go("Home")}
              className="font-display text-base font-black tracking-tight text-foreground hover:text-primary transition-colors flex items-center gap-0.5"
            >
              Bhagya B<span className="text-primary">.</span>
            </button>

          <div className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 relative group ${
                  page === item ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
                {page === item && (
                  <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                )}
              </button>
            ))}
          </div>

          <button className="md:hidden text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[57px] inset-x-0 z-40 bg-background/98 backdrop-blur-xl border-b border-border"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`block w-full text-left font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-4 border-b border-border/50 transition-colors ${
                  page === item ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
