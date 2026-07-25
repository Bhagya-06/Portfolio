import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/*  utils: seeded random + smooth path builder                        */
/* ------------------------------------------------------------------ */

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

// Catmull-Rom -> smooth cubic bezier path string
function smoothPath(points, closed = false) {
  if (points.length < 2) return "";
  const p = closed ? [points[points.length - 1], ...points, points[0], points[1]] : points;
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} `;
  const n = closed ? p.length - 2 : p.length;
  for (let i = closed ? 1 : 0; i < n - (closed ? 0 : 1); i++) {
    const p0 = p[Math.max(i - 1, 0)];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[Math.min(i + 2, p.length - 1)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(
      2
    )} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return d;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ------------------------------------------------------------------ */
/*  path generators per annotation type                               */
/* ------------------------------------------------------------------ */

function circlePath(w, h, rand) {
  const pad = Math.max(6, h * 0.22);
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 + pad;
  const ry = h / 2 + pad * 1.15;
  const startAngle = -20;
  const totalDeg = 372;
  const steps = 14;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = ((startAngle + totalDeg * t) * Math.PI) / 180;
    const jr = 1 + (rand() - 0.5) * 0.09;
    pts.push({
      x: cx + Math.cos(angle) * rx * jr,
      y: cy + Math.sin(angle) * ry * jr,
    });
  }
  return smoothPath(pts);
}

function underlinePath(w, h, rand) {
  const y = h + Math.max(4, h * 0.14);
  const segs = Math.max(3, Math.round(w / 40));
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const x = -2 + t * (w + 4);
    const wob = Math.sin(t * Math.PI * 2.1 + rand() * 2) * (h * 0.05);
    const jitter = (rand() - 0.5) * (h * 0.06);
    pts.push({ x, y: y + wob + jitter });
  }
  return smoothPath(pts);
}

const BUILDERS = {
  circle: circlePath,
  underline: underlinePath,
};

const PAD = { circle: 24, underline: 24 };

/* ------------------------------------------------------------------ */
/*  single mark: measures its word span and draws its own <svg>       */
/* ------------------------------------------------------------------ */

function Mark({ box, type, color, seed, active, strokeWidth = 2.75, delay = 0 }) {
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [box, type]);

  useEffect(() => {
    if (len > 0) {
      setIsReady(false);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsReady(false);
    }
  }, [len]);

  if (!box) return null;
  const pad = PAD[type] ?? 10;
  const rand = mulberry32(seed);
  const d = BUILDERS[type](box.width, box.height, rand);

  const isDrawActive = active && isReady;

  return (
    <svg
      className="annot-mark"
      style={{
        position: "absolute",
        left: box.left - pad,
        top: box.top - pad,
        width: box.width + pad * 2,
        height: box.height + pad * 2,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      <g>
        <path
          ref={pathRef}
          d={d}
          transform={`translate(${pad}, ${pad})`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: len || 1,
            strokeDashoffset: isDrawActive ? 0 : len || 1,
            transition: len && isDrawActive
              ? `stroke-dashoffset ${0.55 + len / 900}s cubic-bezier(.65,.05,.36,1) ${delay}ms`
              : "none",
            opacity: len ? 1 : 0,
          }}
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  AnnotationText                                                     */
/* ------------------------------------------------------------------ */

export function AnnotationText({
  text,
  annotations,
  trigger = "view",
  stagger = 180,
  strokeWidth = 2.75,
  className = "",
  style = {},
  replayKey: externalReplayKey = 0,
}) {
  const containerRef = useRef(null);
  const wordRefs = useRef({});
  const [boxes, setBoxes] = useState({});
  const [activeSet, setActiveSet] = useState(() => new Set());
  const [hasEntered, setHasEntered] = useState(trigger === "mount");

  const [localReplayKey, setLocalReplayKey] = useState(0);
  const finalReplayKey = localReplayKey + externalReplayKey;

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalReplayKey((k) => k + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Assign stable occurrence identifiers for matching phrase nodes
  const plan = useMemo(() => {
    const seen = {};
    return annotations.map((a, i) => {
      const term = a.phrase || a.word;
      const occurrence = seen[term] ?? 0;
      seen[term] = occurrence + 1;
      return { ...a, id: `${term}__${occurrence}__${i}`, term, occurrence, index: i };
    });
  }, [annotations]);

  // Split text by matching phrases from annotations to preserve multi-word structures
  const chunks = useMemo(() => {
    const terms = plan.map((p) => escapeRegExp(p.term)).filter(Boolean);
    if (!terms.length) return [text];
    // Match exact phrases as capture groups
    const regex = new RegExp(`(${terms.join("|")})`, "g");
    return text.split(regex);
  }, [text, plan]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next = {};
    plan.forEach((a) => {
      const el = wordRefs.current[a.id];
      if (!el) return;
      const r = el.getBoundingClientRect();
      next[a.id] = {
        left: r.left - cRect.left,
        top: r.top - cRect.top,
        width: r.width,
        height: r.height,
      };
    });
    setBoxes(next);
  }, [plan]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    setActiveSet(new Set());
    if (trigger === "mount") setHasEntered(true);
    else setHasEntered(false);
  }, [finalReplayKey, trigger]);

  useEffect(() => {
    if (trigger !== "view" || hasEntered) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, hasEntered]);

  useEffect(() => {
    if ((trigger === "view" || trigger === "mount") && hasEntered) {
      plan.forEach((a, i) => {
        setTimeout(() => {
          setActiveSet((prev) => new Set(prev).add(a.id));
        }, i * stagger);
      });
    }
  }, [hasEntered, trigger, plan, stagger]);

  const handleHover = (id) => {
    if (trigger !== "hover") return;
    setActiveSet((prev) => new Set(prev).add(id));
  };
  const handleHoverOut = (id) => {
    if (trigger !== "hover") return;
    setActiveSet((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  let occurrenceCounters = {};

  return (
    <span
      ref={containerRef}
      className={`annot-container ${className}`}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <style>{`
        @keyframes annot-circle-pop {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.04) rotate(0.8deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
      {chunks.map((chunk, i) => {
        const match = plan.find((a) => {
          if (a.term !== chunk) return false;
          const occ = occurrenceCounters[a.term] ?? 0;
          return occ === a.occurrence;
        });

        if (chunk in occurrenceCounters) {
          occurrenceCounters[chunk] += 1;
        } else {
          occurrenceCounters[chunk] = 1;
        }

        if (!match) return <span key={i}>{chunk}</span>;

        return (
          <span
            key={i}
            ref={(el) => (wordRefs.current[match.id] = el)}
            onMouseEnter={() => handleHover(match.id)}
            onMouseLeave={() => handleHoverOut(match.id)}
            style={{
              position: "relative",
              display: "inline-block",
              cursor: trigger === "hover" ? "pointer" : "inherit",
              zIndex: 6,
            }}
          >
            {chunk}
          </span>
        );
      })}
      {plan.map((a) => (
        <Mark
          key={a.id + "-" + finalReplayKey}
          box={boxes[a.id]}
          type={a.type}
          color={a.color}
          seed={hashString(a.id) + finalReplayKey * 97}
          active={activeSet.has(a.id)}
          strokeWidth={strokeWidth}
          delay={0}
        />
      ))}
    </span>
  );
}

export default AnnotationText;
