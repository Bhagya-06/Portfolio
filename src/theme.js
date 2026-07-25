// Shared design tokens — import these instead of hardcoding hex values
// so the whole site stays visually consistent if you ever tweak the palette.

export const colors = {
  bg: "#0c0103",
  panel: "#0c0103",
  panelAlt: "#0c0103",
  border: "rgba(245, 235, 235, 0.1)",
  textPrimary: "#f5ebeb",
  textSecondary: "rgba(245, 235, 235, 0.7)",
  textMuted: "rgba(245, 235, 235, 0.5)",
  accent: "#ff6f3c", // Accent color: coral orange
  accentWarm: "#ff6f3c", // keep same to respect 3-color palette
};

export const fonts = {
  mono: "'Space Mono', monospace", // system/heading labels
  sans: "Geomini, sans-serif", // body copy
  secondary: "Geomini, sans-serif",
};
