import React from 'react';
import { RESUME_DATA } from '../data/developerData';

export const Footer: React.FC = () => {
  const { personal } = RESUME_DATA;

  return (
    <footer className="w-full bg-[#efeded] py-5 mt-10 border-t border-slate-200">
      <div className="w-full px-4 sm:px-8 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="bg-[#0176d3] text-white px-2 py-0.5 rounded text-[10px] font-bold">
            Salesforce
          </span>
          <span>
            {personal.name} © 2025 • Senior Success Guide @ Salesforce
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span>{personal.location}</span>
          <span>•</span>
          <a href={`mailto:${personal.email}`} className="text-[#0176d3] hover:underline">
            {personal.email}
          </a>
        </div>
      </div>
    </footer>
  );
};
