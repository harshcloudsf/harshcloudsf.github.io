import React from 'react';

interface SellerHomeDonutCardsProps {
  onOpenModal: (type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact') => void;
}

export const SellerHomeDonutCards: React.FC<SellerHomeDonutCardsProps> = ({ onOpenModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* ================= CARD 1: Professional Experience ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight text-left">
            Professional Experience
          </h3>
          <p className="text-xs text-slate-500 text-left mt-0.5 line-clamp-1">
            4+ Years of Technical Roles &amp; Engineering @ Salesforce
          </p>

          {/* Donut & Legend Container */}
          <div className="flex items-center justify-between gap-3 mt-5">
            {/* Donut Chart SVG */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" stroke="#e0e0e0" strokeWidth="10" fill="transparent" />
                {/* Active Colored Arc */}
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#00a1e0" 
                  strokeWidth="10" 
                  strokeDasharray="238" 
                  strokeDashoffset="140" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-800 leading-none">4+</span>
                <span className="text-[10px] text-slate-500 mt-1">Years Exp</span>
              </div>
            </div>

            {/* Legend Pills */}
            <div className="flex-1 space-y-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#c7f1d4] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Sr. Success Guide
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#d8ecfe] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Tech Support Eng
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea001e]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#feded8] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex justify-center">
          <button
            onClick={() => onOpenModal('experience')}
            className="px-5 py-1.5 rounded-full border border-[#c9c9c9] hover:border-[#0176d3] text-[#0176d3] text-xs font-semibold hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            View Experience
          </button>
        </div>
      </div>

      {/* ================= CARD 2: Technical Skills Matrix ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight text-left">
            Technical Skills Matrix
          </h3>
          <p className="text-xs text-slate-500 text-left mt-0.5 line-clamp-1">
            Core expertise across Apex, LWC, Agentforce &amp; Data Cloud
          </p>

          {/* Donut & Legend Container */}
          <div className="flex items-center justify-between gap-3 mt-5">
            {/* Donut Chart SVG with Multiple Arcs */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: Blue */}
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#00a1e0" 
                  strokeWidth="11" 
                  strokeDasharray="238" 
                  strokeDashoffset="70" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
                {/* Segment 2: Coral / Red */}
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#ea001e" 
                  strokeWidth="11" 
                  strokeDasharray="238" 
                  strokeDashoffset="190" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-800 leading-none">24+</span>
                <span className="text-[10px] text-slate-500 mt-1">Skills &amp; AI</span>
              </div>
            </div>

            {/* Legend Pills */}
            <div className="flex-1 space-y-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#c7f1d4] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Apex, LWC, SOQL
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#d8ecfe] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Agentforce &amp; AI
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea001e]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#feded8] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Flows &amp; Security
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex justify-center">
          <button
            onClick={() => onOpenModal('skills')}
            className="px-5 py-1.5 rounded-full border border-[#c9c9c9] hover:border-[#0176d3] text-[#0176d3] text-xs font-semibold hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            View All Skills
          </button>
        </div>
      </div>

      {/* ================= CARD 3: Key Technical Projects ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight text-left">
            Key Technical Projects
          </h3>
          <p className="text-xs text-slate-500 text-left mt-0.5 line-clamp-1">
            Hackathon-winning utilities and custom automation tools
          </p>

          {/* Donut & Legend Container */}
          <div className="flex items-center justify-between gap-3 mt-5">
            {/* Donut Chart SVG with Multiple Arcs */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: Coral */}
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#ea001e" 
                  strokeWidth="11" 
                  strokeDasharray="238" 
                  strokeDashoffset="110" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
                {/* Segment 2: Blue */}
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#00a1e0" 
                  strokeWidth="11" 
                  strokeDasharray="238" 
                  strokeDashoffset="180" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-800 leading-none">1st</span>
                <span className="text-[10px] text-slate-500 mt-1">Hackathon Winner</span>
              </div>
            </div>

            {/* Legend Pills */}
            <div className="flex-1 space-y-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#c7f1d4] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Diagnostic Tool (40%)
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#d8ecfe] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Action Engine (1st Pl)
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea001e]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#feded8] px-2.5 py-1 rounded-full whitespace-nowrap">
                  LWC Portal (30% Cut)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex justify-center">
          <button
            onClick={() => onOpenModal('projects')}
            className="px-5 py-1.5 rounded-full border border-[#c9c9c9] hover:border-[#0176d3] text-[#0176d3] text-xs font-semibold hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            View Projects
          </button>
        </div>
      </div>

      {/* ================= CARD 4: Salesforce Certifications ================= */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight text-left">
            Salesforce Certifications
          </h3>
          <p className="text-xs text-slate-500 text-left mt-0.5 line-clamp-1">
            Verified credentials across Developer, AI &amp; Admin domains
          </p>

          {/* Donut & Legend Container */}
          <div className="flex items-center justify-between gap-3 mt-5">
            {/* Donut Chart SVG */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#e0e0e0" strokeWidth="10" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="38" 
                  stroke="#00a1e0" 
                  strokeWidth="10" 
                  strokeDasharray="238" 
                  strokeDashoffset="120" 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-800 leading-none">8</span>
                <span className="text-[10px] text-slate-500 mt-1">Credentials</span>
              </div>
            </div>

            {/* Legend Pills */}
            <div className="flex-1 space-y-2 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#c7f1d4] px-2.5 py-1 rounded-full whitespace-nowrap">
                  PDII, PDI &amp; AI Spec
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#d8ecfe] px-2.5 py-1 rounded-full whitespace-nowrap">
                  App Builder, Admin
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ea001e]"></span>
                <span className="text-[11px] font-semibold text-slate-700 bg-[#feded8] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Sharing &amp; Visibility
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex justify-center">
          <button
            onClick={() => onOpenModal('certifications')}
            className="px-5 py-1.5 rounded-full border border-[#c9c9c9] hover:border-[#0176d3] text-[#0176d3] text-xs font-semibold hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            View Certifications
          </button>
        </div>
      </div>
    </div>
  );
};
