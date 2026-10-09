import React from 'react';
import { CareerStage } from '../data/portfolioData';

interface CareerMilestoneModalProps {
  milestone: CareerStage | null;
  onClose: () => void;
}

export const CareerMilestoneModal: React.FC<CareerMilestoneModalProps> = ({
  milestone,
  onClose,
}) => {
  if (!milestone) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-amber-400">
              {milestone.status === 'completed' ? 'check_circle' : milestone.status === 'current' ? 'play_circle' : 'workspace_premium'}
            </span>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
                Career Pathway Milestone #{milestone.id}
              </span>
              <h2 className="text-base font-bold text-white">{milestone.role}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Status Badge & Org */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="material-symbols-outlined text-[16px] text-[#0176d3]">corporate_fare</span>
            <span className="font-semibold">{milestone.company}</span>
            <span>•</span>
            <span className="text-slate-500 font-mono">{milestone.period}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
            milestone.status === 'completed'
              ? 'bg-emerald-100 text-emerald-800'
              : milestone.status === 'current'
              ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-400'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {milestone.status === 'current' ? 'Active / Current' : milestone.status === 'completed' ? 'Completed' : 'In Pursuit'}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-left">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Role Scope & Mandate
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              {milestone.summary}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Architectural Achievements
            </h4>
            <ul className="space-y-2">
              {milestone.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                    check
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Competencies Mastered
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {milestone.skillsGained.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-[11px] font-medium border border-slate-200"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#0176d3] text-white font-medium hover:bg-[#005da9] text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
