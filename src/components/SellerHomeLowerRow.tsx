import React from 'react';
import { RESUME_DATA } from '../data/developerData';

interface SellerHomeLowerRowProps {
  onOpenModal: (type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact') => void;
}

export const SellerHomeLowerRow: React.FC<SellerHomeLowerRowProps> = ({ onOpenModal }) => {
  const { personal, experience } = RESUME_DATA;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-left">
      {/* ================= CARD 1: Career History & Milestones ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Career History &amp; Roles
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            Positions &amp; milestones at Salesforce
          </p>

          <div className="mt-4 space-y-3.5">
            {experience.map((exp, idx) => (
              <div 
                key={idx} 
                onClick={() => onOpenModal('experience')}
                className="flex items-center justify-between text-xs group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-semibold text-slate-900 group-hover:text-[#0176d3] truncate block text-[11px]">
                    {exp.role}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate block">
                    {exp.company} • {exp.period}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[#0176d3]">
                  <span className="material-symbols-outlined text-[18px] hover:bg-blue-100/60 rounded-full p-0.5">
                    add
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">
                    arrow_drop_down
                  </span>
                </div>
              </div>
            ))}

            {/* Extra Org Health milestone */}
            <div 
              onClick={() => onOpenModal('skills')}
              className="flex items-center justify-between text-xs group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
            >
              <div className="min-w-0 pr-2">
                <span className="font-semibold text-slate-900 group-hover:text-[#0176d3] truncate block text-[11px]">
                  Enterprise Org Health Reviews
                </span>
                <span className="text-[10px] text-slate-500 truncate block">
                  Security, Performance &amp; Governor Limits
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-[#0176d3]">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_drop_down</span>
              </div>
            </div>

            {/* Extra Education milestone */}
            <div 
              onClick={() => onOpenModal('experience')}
              className="flex items-center justify-between text-xs group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
            >
              <div className="min-w-0 pr-2">
                <span className="font-semibold text-slate-900 group-hover:text-[#0176d3] truncate block text-[11px]">
                  B.Tech Electrical Engineering
                </span>
                <span className="text-[10px] text-slate-500 truncate block">
                  LNCT Bhopal (2018 - 2022)
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-[#0176d3]">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_drop_down</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f0f0] text-center">
          <button
            onClick={() => onOpenModal('experience')}
            className="text-[11px] font-semibold text-[#0176d3] hover:underline cursor-pointer"
          >
            View Full Experience Details →
          </button>
        </div>
      </div>

      {/* ================= CARD 2: Core Focus Areas ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Core Focus Areas
            </h3>
            <button 
              onClick={() => onOpenModal('skills')}
              className="w-6 h-6 rounded-full border border-[#c9c9c9] hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              title="Skills Settings"
            >
              <span className="material-symbols-outlined text-[14px]">settings</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
            Agentforce AI Adoption, Org Health &amp; High-Scale Apex Architecture
          </p>

          {/* Authentic Salesforce Target Circles Illustration */}
          <div className="mt-6 flex items-center justify-center py-2">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer 4 Circular Targets */}
              <div className="absolute top-0 w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 shadow-2xs text-[10px] font-bold">
                LWC
              </div>
              <div className="absolute right-0 w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 shadow-2xs text-[10px] font-bold">
                Flow
              </div>
              {/* Bottom Left: Vibrant Star Target */}
              <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-gradient-to-tr from-[#1f2937] via-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white shadow-md ring-2 ring-white" title="Agentforce & AI">
                <span className="material-symbols-outlined text-[20px] text-white">smart_toy</span>
              </div>
              {/* Bottom Right: Apex Target */}
              <div className="absolute bottom-0 right-0 w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 shadow-2xs text-[10px] font-bold">
                Apex
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f0f0] text-center">
          <span 
            className="text-[11px] font-semibold text-[#0176d3] hover:underline cursor-pointer" 
            onClick={() => onOpenModal('skills')}
          >
            Explore Skills Matrix →
          </span>
        </div>
      </div>

      {/* ================= CARD 3: Hackathon 2023 Winner ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Hackathon 2023 Winner
          </h3>

          {/* Authentic Salesforce Mountains & Camping Vector Art */}
          <div className="mt-5 flex flex-col items-center justify-center text-center">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 80L50 45L80 80H20Z" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M60 80L95 30L130 80H60Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M110 80L140 50L170 80H110Z" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              
              <circle cx="150" cy="30" r="12" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="3 3"/>
              <circle cx="150" cy="30" r="6" stroke="#60a5fa" strokeWidth="1.5"/>

              <path d="M75 80L95 55L115 80H75Z" stroke="#3b82f6" strokeWidth="2" fill="white"/>
              <path d="M95 55V80" stroke="#3b82f6" strokeWidth="1.5"/>
              <path d="M50 78L55 80L60 78" stroke="#3b82f6" strokeWidth="1.5"/>
              
              <line x1="10" y1="80" x2="190" y2="80" stroke="#93c5fd" strokeWidth="1.5"/>
            </svg>

            <p className="text-xs text-slate-600 mt-2 font-medium">
              1st Place • Quick Action Recommendation Engine
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Einstein Next Best Action, Apex &amp; Flow Builder
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f0f0] text-center">
          <button
            onClick={() => onOpenModal('projects')}
            className="text-[11px] font-semibold text-[#0176d3] hover:underline cursor-pointer"
          >
            View Project Details →
          </button>
        </div>
      </div>

      {/* ================= CARD 4: Direct Contact & Connect ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Direct Contact &amp; Connect
            </h3>
            <button 
              onClick={() => onOpenModal('contact')}
              className="w-6 h-6 rounded-full border border-[#c9c9c9] hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              title="Options"
            >
              <span className="material-symbols-outlined text-[16px]">expand_circle_down</span>
            </button>
          </div>

          {/* Authentic Salesforce Chair & Desk Vector Art */}
          <div className="mt-5 flex flex-col items-center justify-center text-center">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="80" x2="180" y2="80" stroke="#93c5fd" strokeWidth="1.5"/>
              
              <path d="M50 80L65 55L90 60L100 80" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="60" y1="80" x2="80" y2="58" stroke="#93c5fd" strokeWidth="1.5"/>
              
              <circle cx="140" cy="40" r="14" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="3 3"/>
              <circle cx="140" cy="40" r="7" stroke="#60a5fa" strokeWidth="1.5"/>
              <line x1="140" y1="47" x2="140" y2="80" stroke="#3b82f6" strokeWidth="2"/>
              <line x1="130" y1="80" x2="140" y2="60" stroke="#60a5fa" strokeWidth="1.5"/>
              <line x1="150" y1="80" x2="140" y2="60" stroke="#60a5fa" strokeWidth="1.5"/>

              <path d="M30 40Q35 30 45 35Q55 25 65 35H30Z" stroke="#bfdbfe" strokeWidth="1.5"/>
            </svg>

            <p className="text-xs text-slate-600 mt-2 font-medium">
              Open for Architecture &amp; Technical Consulting
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {personal.location}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-center gap-2">
          <a
            href={`mailto:${personal.email}`}
            className="px-3.5 py-1 rounded-full bg-[#0176d3] text-white text-[11px] font-semibold hover:bg-[#005da9] transition-colors"
          >
            Email
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personal.trailheadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition-colors"
          >
            Trailhead
          </a>
        </div>
      </div>
    </div>
  );
};
