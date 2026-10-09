import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface GlobalBannerProps {
  onOpenEinstein: () => void;
}

export const GlobalBanner: React.FC<GlobalBannerProps> = ({ onOpenEinstein }) => {
  return (
    <div className="w-full bg-[#efeded] px-3 sm:px-6 py-1.5 text-slate-700 flex items-center justify-between text-xs shadow-xs border-b border-slate-200">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0176d3] text-white text-[12px] shrink-0">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
        </span>
        <span className="font-semibold text-slate-800 text-xs">
          Lightning Experience 254.2
        </span>
        <span className="hidden md:inline text-slate-400">•</span>
        <span className="hidden md:inline font-mono text-xs text-[#0176d3]">
          Connected to Org: {PORTFOLIO_DATA.candidate.connectedOrg}
        </span>
        <span className="hidden lg:inline bg-slate-200 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-slate-800">
          {PORTFOLIO_DATA.candidate.apiVersion}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px]">
        <button
          onClick={onOpenEinstein}
          className="flex items-center gap-1.5 text-slate-800 hover:text-[#0176d3] transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#2e844a] animate-pulse"></span>
          <span>Einstein Copilot Agent: <strong className="text-emerald-700 font-semibold">Online</strong></span>
        </button>
        <span className="hidden sm:inline text-slate-300">|</span>
        <span className="hidden sm:inline text-slate-500 font-mono">Session Heap: 1.2MB / 6.0MB</span>
      </div>
    </div>
  );
};
