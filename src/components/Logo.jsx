import { colors } from "../theme";

export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="92" rx="22" fill={colors.accent} />
      {/* Negative-space "B" built from three merged shapes */}
      <rect x="30" y="24" width="15" height="52" rx="7.5" fill={colors.bg} />
      <circle cx="53" cy="37" r="15" fill={colors.bg} />
      <circle cx="55" cy="64" r="17.5" fill={colors.bg} />
      <circle cx="60" cy="37" r="8.5" fill={colors.accent} />
      <circle cx="62" cy="64" r="10" fill={colors.accent} />
    </svg>
  );
}
