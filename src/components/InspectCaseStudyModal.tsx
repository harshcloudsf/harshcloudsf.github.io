import React from 'react';
import { CaseStudy } from '../data/portfolioData';

interface InspectCaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenSchedule: () => void;
}

export const InspectCaseStudyModal: React.FC<InspectCaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenSchedule,
}) => {
  if (!caseStudy) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#032d60] to-[#0176d3] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">domain_verification</span>
            </span>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold block">
                Enterprise Solution Blueprint • {caseStudy.industry}
              </span>
              <h2 className="text-base font-bold text-white truncate max-w-lg">
                {caseStudy.title}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 rounded">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Client & ROI Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Client Enterprise</span>
            <span className="font-semibold text-slate-800">{caseStudy.client}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Architecture Focus</span>
            <span className="font-mono text-[#0176d3] font-semibold">{caseStudy.architectureFocus}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Governor Optimization</span>
            <span className="text-emerald-700 font-bold">{caseStudy.governorLimitGain}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Annualized Value</span>
            <span className="text-indigo-700 font-bold">{caseStudy.annualRoi}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-left">
          {/* Executive Summary */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Architectural Challenge & Solution Overview
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {caseStudy.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verified Production Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    {m.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Layers & Data Flow */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Multi-Tier Architecture & Data Flow
            </h4>
            <div className="space-y-2 bg-[#0b132b] p-3.5 rounded-lg text-white font-mono text-[11px] border border-slate-700">
              {caseStudy.architectureLayers.map((layer, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0">{`[Tier 0${idx + 1}]`}</span>
                  <span className="text-[#a4c9ff]">{layer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Salesforce Platform Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-semibold text-[11px] border border-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Executive Endorsement Quote */}
          <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-100 italic text-slate-700">
            <p className="text-xs">"{caseStudy.quote.text}"</p>
            <div className="mt-2 text-[11px] not-italic font-semibold text-slate-900">
              — {caseStudy.quote.author},{' '}
              <span className="text-slate-500 font-normal">{caseStudy.quote.role}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenSchedule();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#0176d3] font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
            Discuss this architecture in a 1:1 call
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#0176d3] text-white font-medium hover:bg-[#005da9] text-xs transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
