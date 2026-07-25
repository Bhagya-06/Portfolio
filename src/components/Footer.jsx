const NAV_ITEMS = ["Home", "Skills", "Projects", "Journey", "Contact"];

export default function Footer({ setPage }) {
  return (
    <footer className="border-t border-border/40 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-mono text-[9px] text-muted-foreground/40 tracking-wider">
          © 2026 Bhagya B. Crafted with GenAI &amp; Vibe Coding.
        </p>
        <div className="flex gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => {
                setPage(item);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-mono text-[9px] text-muted-foreground/40 hover:text-primary transition-colors tracking-[0.2em] uppercase"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
