import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#efeded] py-4 mt-8 border-t border-slate-200">
      <div className="w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          <span className="bg-[#3d4cce] text-white px-2 py-0.5 rounded text-[11px] font-bold">
            Salesforce Ranger
          </span>
          <span>
            {PORTFOLIO_DATA.candidate.name} © 2025. Built with SLDS aesthetics for enterprise solution architecture showcases.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
            Instance: {PORTFOLIO_DATA.candidate.instance}
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-mono text-slate-600">Tooling API v61.0</span>
        </div>
      </div>
    </footer>
  );
};
