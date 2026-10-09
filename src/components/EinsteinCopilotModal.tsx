import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface EinsteinCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

export const EinsteinCopilotModal: React.FC<EinsteinCopilotModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'einstein'; text: string; tabAction?: string }>>([
    {
      sender: 'einstein',
      text: `Hello! I am Einstein Copilot, grounded in ${PORTFOLIO_DATA.candidate.name}'s verified Salesforce CSG records, CTA portfolio, and system architecture blueprints. How can I assist your review?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    {
      label: "40M Banking Migration Strategy",
      prompt: `How did ${PORTFOLIO_DATA.candidate.name} migrate 40M+ banking records with zero downtime?`,
      reply: `${PORTFOLIO_DATA.candidate.name} designed a dual BigObjects and Skinny Tables archival pattern with Async SOQL. Active transactional records (<2 years) reside in sObjects with selective indexing, while historical data streams to BigObjects. This eliminated 74% of SOQL Governor Limit pressure and unlocked $14.2M annualized savings.`,
      tabAction: "architecture-and-impact",
    },
    {
      label: "Apex Enterprise Patterns (fflib)",
      prompt: `Explain ${PORTFOLIO_DATA.candidate.name}'s fflib SObjectDomain implementation.`,
      reply: `${PORTFOLIO_DATA.candidate.name} implements full Separation of Concerns (fflib): Triggers delegate 100% of execution to AccountTriggerHandler extends fflib_SObjectDomain. UnitOfWork encapsulates transactional boundaries, avoiding fragmented DML and guaranteeing 0 SOQL inside iterative loops with <18ms execution times.`,
      tabAction: "apex-and-lwc-solutions",
    },
    {
      label: "CTA Review Board Readiness",
      prompt: `What is ${PORTFOLIO_DATA.candidate.name}'s timeline and preparation for the CTA Review Board?`,
      reply: `${PORTFOLIO_DATA.candidate.name} has passed both System Architect and Application Architect pyramids (14x certified total) and is currently preparing for the CTA Review Board (Stage 5 of 5). He has completed 35+ timed board scenario simulations covering Large Data Volumes, Identity Management (SAML/OAuth), and multi-cloud integration.`,
      tabAction: "trailhead-and-badges",
    },
    {
      label: "GovCloud & Security Clearance",
      prompt: `Is ${PORTFOLIO_DATA.candidate.name} cleared for Salesforce GovCloud and FedRAMP architectures?`,
      reply: `Yes! ${PORTFOLIO_DATA.candidate.name} is Salesforce GovCloud Ready with extensive experience delivering FedRAMP High and HIPAA compliant architectures using Salesforce Shield Platform Encryption, HSM key management, and event-driven microsegmentation.`,
      tabAction: "contact-and-schedule",
    },
  ];

  const handleAsk = (q: { prompt: string; reply: string; tabAction?: string }) => {
    setMessages((prev) => [...prev, { sender: 'user', text: q.prompt }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'einstein',
          text: q.reply,
          tabAction: q.tabAction,
        },
      ]);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = userText.toLowerCase();
      let answer = `Based on ${PORTFOLIO_DATA.candidate.name}'s Salesforce CSG profile (Connected Org: ${PORTFOLIO_DATA.candidate.connectedOrg}), ${PORTFOLIO_DATA.candidate.name} holds 14 Salesforce certifications, 7x Ranger status with 384,100 points, and an annualized client value of $42.8M.`;
      let tabAction = 'overview';

      if (lower.includes('soql') || lower.includes('terminal') || lower.includes('query')) {
        answer = `${PORTFOLIO_DATA.candidate.name} has engineered high-performance SOQL execution architectures. You can test live SOQL queries in the Interactive SOQL Terminal tab.`;
        tabAction = 'interactive-soql-terminal';
      } else if (lower.includes('code') || lower.includes('apex') || lower.includes('lwc')) {
        answer = `In the Apex & LWC Workbench, you can inspect ${PORTFOLIO_DATA.candidate.name}'s fflib_SObjectDomain domain handler, trigger dispatchers, and Agentforce autonomous LWC handlers with 98.4% test assertion coverage.`;
        tabAction = 'apex-and-lwc-solutions';
      } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('call') || lower.includes('schedule')) {
        answer = `You can schedule an architecture consultation or CTA review mock with ${PORTFOLIO_DATA.candidate.name} directly through the Consultation scheduler. Typical response SLA is under 4 business hours.`;
        tabAction = 'contact-and-schedule';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'einstein',
          text: answer,
          tabAction,
        },
      ]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md h-[90vh] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#0176d3] to-[#3d4cce] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-amber-300">
              auto_awesome
            </span>
            <div>
              <h3 className="font-semibold text-sm leading-tight">Einstein Copilot</h3>
              <span className="text-[11px] text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Grounded in Alex Rivera's CSG Data
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0176d3] text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-xs'
                }`}
              >
                {m.sender === 'einstein' && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#0176d3] uppercase tracking-wider mb-1">
                    <span className="material-symbols-outlined text-[13px]">smart_toy</span>
                    Einstein Copilot
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
                {m.tabAction && (
                  <button
                    onClick={() => {
                      onSelectTab(m.tabAction!);
                      onClose();
                    }}
                    className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0176d3]/10 text-[#0176d3] font-semibold text-[11px] hover:bg-[#0176d3]/20 transition-colors"
                  >
                    <span>View in {m.tabAction.replace(/-/g, ' ')}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-500 w-fit">
              <span className="material-symbols-outlined text-[16px] text-[#0176d3] animate-spin">
                sync
              </span>
              <span>Einstein is reasoning...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 border-t border-slate-200 bg-white">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2 block mb-1">
            Grounded Prompts:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0176d3] border border-slate-200 text-slate-600 text-[11px] font-medium transition-colors shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <form onSubmit={handleCustomSubmit} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
            placeholder="Ask Einstein about architectures, Apex, or certifications..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-lg bg-[#0176d3] hover:bg-[#005da9] text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
            disabled={!inputValue.trim()}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
