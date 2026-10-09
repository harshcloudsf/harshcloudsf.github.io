import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onSelectCodeSnippet?: (snippetId: string) => void;
  onSelectCaseStudy?: (caseId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectCodeSnippet,
  onSelectCaseStudy,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase();

  const matchedCode = PORTFOLIO_DATA.codeSnippets.filter(
    (c) =>
      c.filename.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.language.toLowerCase().includes(term)
  );

  const matchedCerts = PORTFOLIO_DATA.certifications.filter(
    (c) =>
      c.name.toLowerCase().includes(term) ||
      c.verificationCode.toLowerCase().includes(term) ||
      c.pillar.toLowerCase().includes(term)
  );

  const matchedCases = PORTFOLIO_DATA.caseStudies.filter(
    (c) =>
      c.title.toLowerCase().includes(term) ||
      c.client.toLowerCase().includes(term) ||
      c.architectureFocus.toLowerCase().includes(term)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 bg-slate-50 gap-3">
          <span className="material-symbols-outlined text-[#0176d3] text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium"
            placeholder="Search Apex classes, LWC components, Certifications, Case Studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-slate-200 rounded">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-3 space-y-4 text-left divide-y divide-slate-100">
          {/* Quick Nav Suggestions */}
          {!searchTerm && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Interactive SOQL Terminal', tab: 'interactive-soql-terminal', icon: 'terminal' },
                  { label: 'Apex & LWC Solutions', tab: 'apex-and-lwc-solutions', icon: 'code' },
                  { label: 'Architecture & Impact', tab: 'architecture-and-impact', icon: 'architecture' },
                  { label: 'Trailhead & Badges', tab: 'trailhead-and-badges', icon: 'military_tech' },
                  { label: 'Schedule Architecture 1:1', tab: 'contact-and-schedule', icon: 'calendar_add_on' },
                  { label: 'Console Overview', tab: 'overview', icon: 'dashboard' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => {
                      onSelectTab(item.tab);
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-[#0176d3]/10 hover:text-[#0176d3] text-slate-700 text-xs font-medium text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#0176d3]">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Apex & LWC Matches */}
          {matchedCode.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Apex & LWC Workbench ({matchedCode.length})
              </span>
              <div className="space-y-1">
                {matchedCode.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectTab('apex-and-lwc-solutions');
                      if (onSelectCodeSnippet) onSelectCodeSnippet(c.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-[#0176d3]">
                        {c.fileType === 'trigger' ? 'bolt' : c.fileType.includes('lwc') ? 'javascript' : 'code'}
                      </span>
                      <div className="truncate">
                        <span className="font-mono text-xs font-semibold text-slate-800 group-hover:text-[#0176d3]">
                          {c.filename}
                        </span>
                        <p className="text-[11px] text-slate-500 truncate">{c.description}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {c.language}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies Matches */}
          {matchedCases.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Architecture Case Studies ({matchedCases.length})
              </span>
              <div className="space-y-1">
                {matchedCases.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => {
                      onSelectTab('architecture-and-impact');
                      if (onSelectCaseStudy) onSelectCaseStudy(cs.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-[#2e844a]">
                        domain_verification
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0176d3]">
                          {cs.title}
                        </span>
                        <p className="text-[11px] text-slate-500 truncate">{cs.client} • {cs.architectureFocus}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#2e844a] bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      ROI: {cs.annualRoi}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Matches */}
          {matchedCerts.length > 0 && (
            <div className="pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Official Certifications ({matchedCerts.length})
              </span>
              <div className="space-y-1">
                {matchedCerts.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => {
                      onSelectTab('trailhead-and-badges');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-[#f2a900]">
                        verified
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-slate-800">
                          {cert.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          ID: {cert.verificationCode}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      {cert.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {term && matchedCode.length === 0 && matchedCases.length === 0 && matchedCerts.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching Salesforce metadata found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
