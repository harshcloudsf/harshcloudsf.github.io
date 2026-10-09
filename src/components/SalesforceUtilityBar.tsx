import React, { useState } from 'react';
import { RESUME_DATA } from '../data/developerData';

interface SalesforceUtilityBarProps {
  onOpenAgentforce: () => void;
  onOpenModal: (type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact') => void;
}

export const SalesforceUtilityBar: React.FC<SalesforceUtilityBarProps> = ({
  onOpenAgentforce,
  onOpenModal,
}) => {
  const [showTodoList, setShowTodoList] = useState(false);
  const { personal } = RESUME_DATA;

  return (
    <>
      {/* Floating To-Do Popover if clicked */}
      {showTodoList && (
        <div className="fixed bottom-9 left-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-xs text-left animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0176d3]">format_list_bulleted</span>
              Salesforce To-Do List
            </span>
            <button 
              onClick={() => setShowTodoList(false)} 
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div className="py-2.5 space-y-2">
            <div 
              onClick={() => { onOpenModal('contact'); setShowTodoList(false); }}
              className="p-2 rounded bg-blue-50/60 border border-blue-100 hover:bg-blue-100/60 cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-800 block">Review Candidate Dossier</span>
                <span className="text-[10px] text-slate-500">Contact: {personal.email}</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#0176d3]">arrow_forward</span>
            </div>
            <div 
              onClick={() => { onOpenModal('skills'); setShowTodoList(false); }}
              className="p-2 rounded bg-slate-50 hover:bg-slate-100 cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-800 block">Agentforce &amp; Org Health Review</span>
                <span className="text-[10px] text-slate-500">Conduct technical assessment</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_forward</span>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Utility Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white h-8 border-t border-[#e5e5e5] px-3 sm:px-4 flex items-center justify-between text-xs text-slate-700 select-none shadow-xs">
        {/* Left Utility Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTodoList(!showTodoList)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#0176d3]">format_list_bulleted</span>
            <span>To Do List</span>
          </button>

          <span className="text-slate-300">|</span>

          <button
            onClick={onOpenAgentforce}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-amber-500">smart_toy</span>
            <span>Agentforce Copilot</span>
          </button>
        </div>

        {/* Right Status Indicator */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="hidden sm:inline font-mono">
            Connected: <strong className="text-slate-800">Salesforce (Hyderabad)</strong>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Spring '25 v61.0
          </span>
        </div>
      </footer>
    </>
  );
};
