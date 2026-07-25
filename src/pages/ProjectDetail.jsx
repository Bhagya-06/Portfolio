import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import Github from "../components/GithubIcon";
import projectsData from "../data/projects.json";
import { colors, fonts } from "../theme";

export default function ProjectDetail() {
  const { fileIndex } = useParams();
  const navigate = useNavigate();

  const project = (projectsData.projects || []).find((p) => p.id === Number(fileIndex)) || (projectsData.projects || []).find((p) => p.id === fileIndex);

  if (!project) {
    return (
      <div className="flex-1 px-6 sm:px-10 py-12 max-w-3xl mx-auto w-full">
        <p style={{ color: colors.textSecondary, fontFamily: fonts.sans }}>Project not found.</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-xs mt-4 text-emerald-400 font-mono"
        >
          ← Back to projects
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 sm:px-10 py-12 max-w-4xl mx-auto w-full">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1.5 text-xs mb-8 text-gray-400 hover:text-emerald-400 transition-colors font-mono"
      >
        <ArrowLeft size={14} /> Back to Projects
      </button>

      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: fonts.mono }}>
        {project.title}
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: fonts.sans }}>
        {project.description}
      </p>

      {/* Image Preview */}
      {project.image && (
        <div className="rounded-2xl overflow-hidden border border-white/10 glass-card mb-10">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl glass-card mb-10 text-xs font-mono">
        <div>
          <span className="text-gray-400 block mb-1">Category</span>
          <span className="text-white font-bold">{project.category}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-1">Tools</span>
          <span className="text-emerald-400 font-bold">{project.tools}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-1">Flagship</span>
          <span className="text-white font-bold">{project.flagship ? "Yes" : "No"}</span>
        </div>
      </div>

      {/* Bullets Section */}
      {project.bullets && project.bullets.length > 0 && (
        <div className="mb-10 p-6 rounded-2xl glass-card border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-emerald-400 font-mono tracking-wide flex items-center gap-2">
            <CheckCircle2 size={18} /> PROJECT DETAILS & CRUCIAL DECISIONS
          </h2>
          <div className="space-y-3">
            {project.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200" style={{ fontFamily: fonts.sans }}>
                <span className="text-emerald-400 font-mono font-bold text-base">{i + 1}.</span>
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Links */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-glow px-6 py-3 rounded-xl text-xs font-bold font-mono bg-emerald-400 text-slate-950 flex items-center gap-2"
          >
            Open Project Link <ExternalLink size={14} />
          </a>
        )}
      </div>

    </div>
  );
}
