import { useEffect } from "react";
import { Briefcase, GraduationCap, Quote, Star, Calendar, MapPin, Award } from "lucide-react";
import journeyData from "../data/journey.json";
import { colors, fonts } from "../theme";

export default function MyJourney() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 px-6 sm:px-10 py-12 max-w-4xl mx-auto w-full min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight" style={{ fontFamily: fonts.mono }}>
          My Journey & Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed" style={{ fontFamily: fonts.sans }}>
          Work experience timeline, engineering education, and real recommendations from project managers and co-founders.
        </p>
      </div>

      {/* WORK EXPERIENCE */}
      <div className="mb-16 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-6 text-emerald-400 font-mono font-bold text-lg">
          <Briefcase size={20} /> Work Experience
        </div>

        <div className="relative pl-6 border-l-2 border-emerald-500/30 space-y-8 ml-3">
          {journeyData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:scale-125 transition-transform" />
              
              <div className="glass-card p-6 rounded-2xl border hover:border-emerald-400/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: fonts.mono }}>
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                <div className="text-xs font-mono text-gray-300 mb-3 flex items-center gap-3">
                  <span className="text-emerald-300 font-bold">{exp.company}</span>
                  {exp.location && (
                    <span className="text-gray-400 flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed" style={{ fontFamily: fonts.sans }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mb-16 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-6 text-cyan-400 font-mono font-bold text-lg">
          <GraduationCap size={20} /> Education History
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {journeyData.education.map((edu, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-2">
                  {edu.startDate} - {edu.endDate}
                </div>
                <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: fonts.mono }}>
                  {edu.degree}
                </h3>
                <div className="text-xs text-gray-300 mb-2" style={{ fontFamily: fonts.sans }}>
                  {edu.institution}
                </div>
                {edu.fieldOfStudy && (
                  <div className="text-xs text-emerald-400 font-mono mb-2">
                    Field: {edu.fieldOfStudy}
                  </div>
                )}
              </div>

              {edu.cgpa && (
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Cumulative GPA</span>
                  <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {edu.cgpa} / 10.0
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      {journeyData.recommendations && journeyData.recommendations.length > 0 && (
        <div className="mb-12 reveal-on-scroll">
          <div className="flex items-center gap-2 mb-6 text-primary font-mono font-bold text-lg">
            <Quote size={20} /> Client & Manager Recommendations
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {journeyData.recommendations.map((rec, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between border hover:border-primary/40">
                <div>
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-200 italic leading-relaxed mb-6" style={{ fontFamily: fonts.sans }}>
                    "{rec.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white" style={{ fontFamily: fonts.mono }}>
                      {rec.recommender}
                    </div>
                    <div className="text-[11px] text-gray-400" style={{ fontFamily: fonts.sans }}>
                      {rec.title}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">{rec.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
