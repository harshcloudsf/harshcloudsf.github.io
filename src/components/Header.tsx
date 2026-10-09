import React from 'react';
import { RESUME_DATA } from '../data/developerData';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { personal } = RESUME_DATA;

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* 1. Primary Salesforce Blue Header Bar */}
      <div className="bg-[#0176d3] text-white h-12 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Salesforce Cloud Icon & Name */}
        <div 
          onClick={() => onSelectTab('about')}
          className="flex items-center gap-3 min-w-0 cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[20px]">cloud</span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-85 leading-none">
              Salesforce Developer Portfolio
            </span>
            <span className="text-sm font-semibold leading-tight truncate text-white">
              {personal.name} <span className="opacity-80 font-normal hidden sm:inline">• Senior Success Guide @ Salesforce</span>
            </span>
          </div>
        </div>

        {/* Right: Direct Useful Links (Zero Clutter) */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <a
            href={personal.trailheadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[15px] text-amber-300">military_tech</span>
            <span>Trailhead</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            <span>LinkedIn</span>
            <span className="material-symbols-outlined text-[13px] opacity-70">open_in_new</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            <span>GitHub</span>
            <span className="material-symbols-outlined text-[13px] opacity-70">open_in_new</span>
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="px-3.5 py-1.5 rounded-lg bg-white text-[#0176d3] font-bold hover:bg-blue-50 transition-colors shadow-2xs text-xs"
          >
            Email Me
          </a>
        </div>
      </div>

      {/* 2. Secondary Navigation Bar */}
      <div className="bg-white h-10 px-4 sm:px-6 flex items-center justify-between border-b border-[#efeded]">
        <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto h-full scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`h-full flex items-center px-1 transition-colors whitespace-nowrap text-xs cursor-pointer ${
                  isActive
                    ? 'text-[#0176d3] font-bold border-b-2 border-[#0176d3]'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#2e844a]"></span>
            Salesforce (Hyderabad, India)
          </span>
        </div>
      </div>
    </header>
  );
};
