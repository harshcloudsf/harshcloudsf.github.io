import React, { useState } from 'react';
import { RESUME_DATA } from '../data/developerData';

interface SalesforceGlobalHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAgentforce: () => void;
  onOpenModal: (type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact') => void;
}

export const SalesforceGlobalHeader: React.FC<SalesforceGlobalHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAgentforce,
  onOpenModal,
}) => {
  const { personal } = RESUME_DATA;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-12 border-b border-[#e5e5e5] px-3 sm:px-4 flex items-center justify-between shadow-2xs select-none">
      {/* 1. Left: Iconic Salesforce Cloud Logo */}
      <div className="flex items-center gap-3">
        <a 
          href="#home" 
          className="flex items-center focus:outline-none"
          title="Salesforce"
        >
          {/* Authentic Salesforce Multi-Bubble Blue Cloud Logo */}
          <svg className="w-10 h-7" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.8 13.5C45.2 6.2 52.8 1 61.6 1C72.2 1 81 8.8 82.5 19.1C88.2 20.9 92.5 26.2 92.5 32.7C92.5 39.8 87.4 45.6 80.6 46.8C80.2 55.4 73 62.3 64.2 62.3C60.6 62.3 57.3 61.1 54.6 59C51.6 65.4 45.1 70 37.6 70C28.2 70 20.3 63.4 18.2 54.4C14.7 54.1 11.5 52.6 9 50.1C4.4 45.5 1.5 39.1 1.5 32.1C1.5 20.1 10.6 10.3 22.4 9.5C26.7 3.9 33.5 0.3 41.2 0.3C41.4 0.3 41.6 0.3 41.8 0.3V13.5Z" fill="#00A1E0"/>
          </svg>
        </a>
      </div>

      {/* 2. Center: Rounded Search Pill + Ask (Agentforce) Button */}
      <div className="flex-1 max-w-xl mx-2 sm:mx-6 flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search skills, projects, certifications, tools..."
            className="w-full h-8 pl-9 pr-3 rounded-full bg-white border border-[#c9c9c9] hover:border-[#1b96ff] focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner"
          />
        </div>

        {/* ✨ Ask Button (Agentforce / Einstein) */}
        <button
          onClick={onOpenAgentforce}
          className="h-8 px-3 rounded-full border border-[#0176d3] bg-white hover:bg-blue-50/70 text-[#0176d3] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0"
          title="Ask Agentforce about Harsh's experience"
        >
          <span className="material-symbols-outlined text-[16px] text-[#0176d3]">
            auto_awesome
          </span>
          <span className="hidden sm:inline">Ask</span>
        </button>
      </div>

      {/* 3. Right: Utility Icons & Astro Mascot Profile */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Astro / Einstein Character Icon */}
        <button
          onClick={onOpenAgentforce}
          className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Agentforce Assistant"
        >
          <span className="material-symbols-outlined text-[19px] text-[#0176d3]">
            smart_toy
          </span>
        </button>

        {/* Favorites Star Icon with Dropdown */}
        <button 
          onClick={() => onOpenModal('projects')}
          className="hidden sm:flex items-center h-7 px-1.5 rounded border border-[#c9c9c9] hover:bg-slate-50 text-slate-600 text-xs gap-0.5 cursor-pointer"
          title="Favorites / Top Projects"
        >
          <span className="material-symbols-outlined text-[15px] text-amber-500">
            star
          </span>
          <span className="material-symbols-outlined text-[12px] text-slate-500">
            arrow_drop_down
          </span>
        </button>

        {/* Global Action + (Create / Contact) */}
        <button
          onClick={() => onOpenModal('contact')}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
          title="New Task / Connect with Harsh"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>

        {/* Salesforce Help ? */}
        <a
          href={personal.trailheadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg hover:bg-slate-100 hidden md:flex items-center justify-center text-slate-600 transition-colors"
          title="Trailhead Profile"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
        </a>

        {/* Setup Gear */}
        <button
          onClick={() => onOpenModal('skills')}
          className="w-7 h-7 rounded-lg hover:bg-slate-100 hidden md:flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Setup & Skills Matrix"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
          </button>

          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 text-xs text-left z-50 animate-in fade-in">
              <div className="px-3 py-1.5 font-bold text-slate-800 border-b border-slate-100 flex items-center justify-between">
                <span>Salesforce Notifications</span>
                <span className="text-[10px] text-[#0176d3] font-semibold">2 New</span>
              </div>
              <div className="p-3 hover:bg-slate-50 border-b border-slate-100">
                <span className="font-semibold text-slate-900 block">Senior Success Guide Role</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Active at Salesforce (Hyderabad) driving Agentforce &amp; Org Health.</p>
              </div>
              <div className="p-3 hover:bg-slate-50">
                <span className="font-semibold text-slate-900 block">Hackathon Winner 2023</span>
                <p className="text-[11px] text-slate-500 mt-0.5">1st Place for Quick Action Recommendation Engine.</p>
              </div>
            </div>
          )}
        </div>

        {/* Astro / Profile Mascot Avatar Button */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-[#002b66] border border-[#001f4d] flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-[#0176d3]/40 transition-all shadow-xs"
            title="Harsh Sahu Profile"
          >
            {/* Mascot Bear Icon or Initials */}
            <span className="text-xs font-bold tracking-tight text-white">HS</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-xs text-left z-50 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#002b66] text-white flex items-center justify-center font-bold text-sm">
                  HS
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{personal.name}</h4>
                  <span className="text-[11px] text-[#0176d3] font-medium block truncate">
                    Senior Success Guide @ Salesforce
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <strong className="text-slate-800">{personal.location}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Certifications:</span>
                  <strong className="text-emerald-700">7 Active + 1 In Progress</strong>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <strong className="text-[#0176d3]">4+ Years @ Salesforce</strong>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-1.5">
                <a
                  href={`mailto:${personal.email}`}
                  className="w-full text-center py-1.5 bg-[#0176d3] hover:bg-[#005da9] text-white font-semibold rounded text-[11px] transition-colors"
                >
                  Send Email
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-[11px] transition-colors"
                >
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
