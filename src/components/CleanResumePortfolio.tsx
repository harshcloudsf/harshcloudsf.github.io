import React, { useState } from 'react';
import { RESUME_DATA } from '../data/developerData';

export const CleanResumePortfolio: React.FC = () => {
  const { personal, experience, projects, skills, certifications, education } = RESUME_DATA;
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 text-left">
      {/* 1. HERO / HEADER PROFILE */}
      <section id="about" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0176d3] text-xs font-bold border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                Salesforce Employee
              </span>
              <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
                {personal.location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {personal.name}
            </h1>

            <p className="text-base font-semibold text-[#0176d3]">
              {personal.currentTitle}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl pt-1">
              {personal.summary}
            </p>

            {/* Quick Contact & Links Strip */}
            <div className="flex items-center gap-3 pt-3 flex-wrap text-xs">
              <a
                href={`mailto:${personal.email}`}
                className="px-3.5 py-2 rounded-lg bg-[#0176d3] hover:bg-[#005da9] text-white font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>{personal.email}</span>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-[#0176d3]">badge</span>
                <span>{personal.linkedinHandle}</span>
              </a>

              <a
                href={personal.trailheadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-amber-500">military_tech</span>
                <span>Trailhead Profile</span>
              </a>

              <button
                onClick={() => handleCopy(personal.phone, 'phone')}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>{copied === 'phone' ? 'Copied!' : personal.phone}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFESSIONAL EXPERIENCE */}
      <section id="experience" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Career Timeline
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-8 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative space-y-2 text-xs sm:text-sm">
              <span className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                exp.isCurrent ? 'bg-[#0176d3]' : 'bg-slate-400'
              }`}></span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base text-slate-900">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-[#0176d3] font-semibold">
                    • {exp.company}
                  </span>
                  {exp.isCurrent && (
                    <span className="text-[10px] uppercase font-bold bg-blue-100 text-[#0176d3] px-2 py-0.5 rounded">
                      Current Role
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {exp.period} • {exp.location}
                </span>
              </div>

              <ul className="space-y-2 pt-1 text-slate-600">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-[#0176d3] font-bold mt-1 text-sm leading-none">•</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KEY TECHNICAL PROJECTS */}
      <section id="projects" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Impact &amp; Innovation
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Key Technical Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#0176d3] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0176d3] bg-blue-50 px-2 py-0.5 rounded">
                    {proj.badge}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {proj.highlight}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Technologies:
                </span>
                <span className="font-mono text-[11px] text-slate-700 font-semibold block">
                  {proj.tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL SKILLS */}
      <section id="skills" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Core Competencies
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((sk, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
              <div className="flex items-center gap-2 text-slate-900">
                <span className="material-symbols-outlined text-[20px] text-[#0176d3]">
                  {sk.icon}
                </span>
                <h3 className="font-bold text-sm">{sk.category}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {sk.items.map((item, iIdx) => (
                  <span
                    key={iIdx}
                    className="px-2.5 py-1 bg-white text-slate-700 border border-slate-200 rounded-md text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CERTIFICATIONS */}
      <section id="certifications" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Verified Credentials
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Salesforce Certifications (7 Active + 1 In Progress)
            </h2>
          </div>
          <span className="text-xs font-bold text-[#0176d3] bg-blue-50 px-2.5 py-1 rounded">
            Webassessor Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {certifications.map((c, idx) => {
            const isInProgress = c.status === 'In Progress';
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isInProgress
                    ? 'border-dashed border-amber-300 bg-amber-50/30'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0176d3]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    {c.badge}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isInProgress ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {c.name}
                </h4>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {c.group}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. EDUCATION & CONTACT FOOTER CARD */}
      <section id="contact" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Academic Background &amp; Contact
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Education &amp; Direct Connection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Education */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Graduation
            </span>
            <h3 className="font-bold text-slate-900 text-sm">{education.degree}</h3>
            <p className="text-slate-600 text-xs">{education.institution}</p>
            <span className="text-[11px] font-mono text-slate-400 block pt-1">{education.period}</span>
          </div>

          {/* Contact Actions */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0176d3] block">
              Connect Directly
            </span>
            <p className="text-xs text-slate-700">
              Feel free to reach out for architectural consulting, functional workshops, or Salesforce engineering roles:
            </p>
            <div className="space-y-1 pt-1 font-medium text-xs">
              <div>Email: <a href={`mailto:${personal.email}`} className="text-[#0176d3] hover:underline font-bold">{personal.email}</a></div>
              <div>Phone: <span className="text-slate-900 font-bold">{personal.phone}</span></div>
              <div>LinkedIn: <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0176d3] hover:underline font-bold">linkedin.com/{personal.linkedinHandle}</a></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
