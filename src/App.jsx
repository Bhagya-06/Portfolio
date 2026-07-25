import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Journey from "./pages/Journey";
import Contact from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("Home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden w-full relative">
      <Nav page={page} setPage={navigate} />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {page === "Home" && <Home setPage={navigate} />}
          {page === "Skills" && <Skills setPage={navigate} />}
          {page === "Projects" && <Projects setPage={navigate} />}
          {page === "Journey" && <Journey setPage={navigate} />}
          {page === "Contact" && <Contact setPage={navigate} />}
        </motion.main>
      </AnimatePresence>
      <Footer setPage={navigate} />
    </div>
  );
}
