import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenEinstein: () => void;
  onOpenAppLauncher: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenEinstein,
  onOpenAppLauncher,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSetupMenu, setShowSetupMenu] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'apex-and-lwc-solutions', label: 'Apex & LWC Solutions' },
    { id: 'architecture-and-impact', label: 'Architecture & Impact' },
    { id: 'interactive-soql-terminal', label: 'Interactive SOQL Terminal' },
    { id: 'trailhead-and-badges', label: 'Trailhead & Badges' },
    { id: 'contact-and-schedule', label: 'Contact / Schedule Call' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* 1. Primary Lightning Blue Header */}
      <div className="bg-[#0176d3] text-white h-12 px-3 sm:px-4 flex items-center justify-between gap-3">
        {/* Left: App launcher + Logo + Console Name */}
        <div className="flex items-center gap-2.5 min-w-0 flex-shrink-0">
          <button
            onClick={onOpenAppLauncher}
            aria-label="App Launcher"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#005da9] text-white transition-colors cursor-pointer"
            type="button"
            title="App Launcher"
          >
            <span className="material-symbols-outlined text-[20px]">apps</span>
          </button>

          <img
            alt="Trailblazer Dev Console Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            src={PORTFOLIO_DATA.candidate.logoUrl}
            onClick={() => onSelectTab('overview')}
            referrerPolicy="no-referrer"
          />

          <div 
            className="flex flex-col min-w-0 hidden sm:flex cursor-pointer text-left"
            onClick={() => onSelectTab('overview')}
          >
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-85 leading-none">
              Salesforce Lightning Console
            </span>
            <span className="text-sm font-semibold leading-tight truncate text-white">
              {PORTFOLIO_DATA.candidate.name} - Senior Success Engineer
            </span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div 
            onClick={onOpenSearch}
            className="relative flex items-center w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined absolute left-2.5 text-slate-400 text-[18px] pointer-events-none group-hover:text-[#0176d3]">
              search
            </span>
            <input
              readOnly
              className="w-full h-8 pl-8 pr-12 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 text-xs focus:outline-none shadow-inner cursor-pointer"
              placeholder="Search Apex classes, LWC components, Certifications, Customer Case Studies... (Ctrl+K)"
              type="text"
            />
            <kbd className="absolute right-2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 rounded border border-slate-200">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 relative">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="w-8 h-8 rounded-lg flex md:hidden items-center justify-center hover:bg-[#005da9] text-white transition-colors"
            title="Search"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>

          {/* Einstein Copilot */}
          <button
            onClick={onOpenEinstein}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#005da9] text-white transition-colors"
            title="Einstein AI Assistant"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-300">auto_awesome</span>
          </button>

          {/* Setup button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSetupMenu(!showSetupMenu);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#005da9] text-white transition-colors"
              title="Setup"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>

            {showSetupMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1 text-slate-800 text-xs text-left z-50">
                <div className="px-3 py-2 border-b border-slate-100 font-semibold text-slate-500 uppercase text-[10px]">
                  Lightning Platform Setup
                </div>
                <button
                  onClick={() => {
                    onSelectTab('apex-and-lwc-solutions');
                    setShowSetupMenu(false);
                  }}
                  className="w-full px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0176d3]">developer_mode</span>
                  Developer Console & Apex
                </button>
                <button
                  onClick={() => {
                    onSelectTab('interactive-soql-terminal');
                    setShowSetupMenu(false);
                  }}
                  className="w-full px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0176d3]">terminal</span>
                  SOQL Query Inspector
                </button>
                <button
                  onClick={() => {
                    onSelectTab('architecture-and-impact');
                    setShowSetupMenu(false);
                  }}
                  className="w-full px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0176d3]">schema</span>
                  Object Manager & Schema
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSetupMenu(false);
                setShowProfileMenu(false);
              }}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#005da9] text-white transition-colors"
              title="Notifications"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-1 ring-[#0176d3]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-slate-800 text-xs text-left z-50">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700 flex items-center justify-between">
                  <span>Salesforce Notifications</span>
                  <span className="text-[10px] text-[#0176d3] font-bold">2 New</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px] mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Deployment Successful
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      AccountTriggerHandler.cls deployed to SFDC-PROD-CSG-0089 with 98.4% assertion coverage.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-[11px] mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
                      CTA Study Cohort Session
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Mock Review Board scenario #36 scheduled for this Thursday at 2:00 PM PST.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative ml-1">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowSetupMenu(false);
              }}
              className="relative w-8 h-8 rounded-full bg-[#005da9] flex items-center justify-center hover:ring-2 hover:ring-white/50 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2e844a] ring-2 ring-[#0176d3]"></span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-3 text-slate-800 text-xs text-left z-50">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-[#0176d3] text-white flex items-center justify-center font-bold">
                    {PORTFOLIO_DATA.candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs truncate">{PORTFOLIO_DATA.candidate.name}</h4>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {PORTFOLIO_DATA.candidate.email}
                    </span>
                  </div>
                </div>
                <div className="pt-2 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Org Role:</span>
                    <strong className="text-slate-800">Sr. Success Engineer</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Trailhead:</span>
                    <strong className="text-[#8c5300]">7x Ranger (528 Badges)</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Certifications:</span>
                    <strong className="text-[#0176d3]">14x Certified</strong>
                  </div>
                </div>
                <div className="pt-2.5 mt-2.5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectTab('contact-and-schedule');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-center py-1.5 bg-[#0176d3] text-white rounded text-[11px] font-semibold hover:bg-[#005da9]"
                  >
                    Schedule 1:1 Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Secondary White Navigation Bar */}
      <div className="bg-white h-10 px-3 sm:px-4 flex items-center justify-between border-b border-[#efeded]">
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

        <div className="hidden lg:flex items-center gap-2 text-slate-600">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-700">
            {PORTFOLIO_DATA.candidate.release}
          </span>
        </div>
      </div>
    </header>
  );
};
