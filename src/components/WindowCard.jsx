import { colors, fonts } from "../theme";

export default function WindowCard({ title, children }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: colors.border, background: colors.panel }}>
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: colors.border, background: colors.panelAlt }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors.accentWarm }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors.accent }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors.border }} />
        {title && (
          <span className="ml-2 text-xs" style={{ color: colors.textMuted, fontFamily: fonts.mono }}>
            {title}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
