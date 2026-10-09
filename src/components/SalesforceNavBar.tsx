import React from 'react';

interface SalesforceNavBarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenModal: (type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact') => void;
}

export const SalesforceNavBar: React.FC<SalesforceNavBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenModal,
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', isModal: false },
    { id: 'experience', label: 'Experience', isModal: true, modalType: 'experience' as const, hasDropdown: true },
    { id: 'projects', label: 'Key Projects', isModal: true, modalType: 'projects' as const, hasDropdown: true },
    { id: 'skills', label: 'Technical Skills & AI', isModal: true, modalType: 'skills' as const, hasDropdown: true },
    { id: 'certifications', label: 'Certifications', isModal: true, modalType: 'certifications' as const, hasDropdown: true },
    { id: 'orghealth', label: 'Org Health & Consulting', isModal: true, modalType: 'experience' as const, hasDropdown: true },
    { id: 'contact', label: 'Contact Harsh', isModal: true, modalType: 'contact' as const, hasDropdown: false },
  ];

  const handleTabClick = (t: typeof tabs[0]) => {
    onSelectTab(t.id);
    if (t.isModal && t.modalType) {
      onOpenModal(t.modalType);
    }
  };

  return (
    <nav className="fixed top-12 left-0 right-0 z-40 bg-white h-11 border-b border-[#e5e5e5] px-3 sm:px-4 flex items-center justify-between shadow-2xs select-none">
      <div className="flex items-center h-full min-w-0 overflow-x-auto scrollbar-none">
        {/* 9-dot App Launcher Icon */}
        <button
          onClick={() => onOpenModal('projects')}
          className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer mr-2 shrink-0"
          title="Portfolio App Launcher"
        >
          {/* Authentic 9-dot Waffle Icon */}
          <div className="grid grid-cols-3 gap-0.5 p-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          </div>
        </button>

        {/* App Title: Developer Portfolio (NOT Sales) */}
        <span className="text-base font-bold text-slate-900 mr-5 shrink-0 tracking-tight">
          Developer Portfolio
        </span>

        {/* Tabs Bar */}
        <div className="flex items-center h-full gap-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`h-full flex items-center px-3 text-xs whitespace-nowrap transition-colors cursor-pointer relative ${
                  isActive
                    ? 'text-[#0176d3] font-bold'
                    : 'text-slate-700 hover:text-slate-900 font-medium hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.hasDropdown && (
                  <span className="material-symbols-outlined text-[14px] text-slate-400 ml-1">
                    keyboard_arrow_down
                  </span>
                )}
                {/* Active Indicator Blue Line at Bottom */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0176d3] rounded-t-sm"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
