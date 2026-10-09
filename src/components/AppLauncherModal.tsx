import React from 'react';

interface AppLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

export const AppLauncherModal: React.FC<AppLauncherModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const apps = [
    {
      name: 'Salesforce Lightning Console',
      sub: 'Developer & Solution Architect Hub',
      tab: 'overview',
      icon: 'terminal',
      color: 'bg-[#0176d3]',
    },
    {
      name: 'Apex & LWC Workbench',
      sub: 'fflib Domain, Triggers, & Test Runners',
      tab: 'apex-and-lwc-solutions',
      icon: 'code',
      color: 'bg-[#2e844a]',
    },
    {
      name: 'Architecture & Impact Center',
      sub: 'Enterprise Case Studies & Blueprints',
      tab: 'architecture-and-impact',
      icon: 'architecture',
      color: 'bg-[#3d4cce]',
    },
    {
      name: 'Interactive SOQL Terminal',
      sub: 'Live SObject Query Studio',
      tab: 'interactive-soql-terminal',
      icon: 'data_object',
      color: 'bg-[#005da9]',
    },
    {
      name: 'Trailhead Credentials Portal',
      sub: '7x Ranger & 14 Certifications',
      tab: 'trailhead-and-badges',
      icon: 'military_tech',
      color: 'bg-[#f2a900]',
    },
    {
      name: 'Consultation & Review Board',
      sub: 'Book 1:1 Architecture Advisory',
      tab: 'contact-and-schedule',
      icon: 'calendar_add_on',
      color: 'bg-[#5867e8]',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-start p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg mt-12 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0176d3]">apps</span>
            <h2 className="font-semibold text-slate-800 text-sm">App Launcher</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {apps.map((app) => (
            <button
              key={app.tab}
              onClick={() => {
                onSelectTab(app.tab);
                onClose();
              }}
              className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#0176d3] hover:bg-blue-50/50 text-left transition-all group"
            >
              <div className={`w-9 h-9 rounded-lg ${app.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                <span className="material-symbols-outlined text-[20px]">{app.icon}</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0176d3] block truncate">
                  {app.name}
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  {app.sub}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Connected Org: SFDC-PROD-CSG-0089</span>
          <span className="font-mono text-slate-400">Spring '25 v61.0</span>
        </div>
      </div>
    </div>
  );
};
