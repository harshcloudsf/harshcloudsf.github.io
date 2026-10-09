import React, { useState } from 'react';
import { RESUME_DATA } from '../data/developerData';

interface DetailModalsProps {
  modalType: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact' | 'agentforce' | null;
  onClose: () => void;
}

export const DetailModals: React.FC<DetailModalsProps> = ({ modalType, onClose }) => {
  const { personal, experience, projects, skills, certifications, education } = RESUME_DATA;
  const [copied, setCopied] = useState(false);

  // Agentforce Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agentforce'; text: string }>>([
    {
      sender: 'agentforce',
      text: `Hello! I am Agentforce Copilot, grounded in Harsh Sahu's verified Salesforce employee profile and resume. How can I help you today?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!modalType) return null;

  const handleCopyPhone = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personal.phone);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickQuestion = (q: string, a: string) => {
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: q },
      { sender: 'agentforce', text: a },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const lower = userText.toLowerCase();
    let reply = `Harsh Sahu is a Senior Success Guide at Salesforce (Hyderabad) with 4+ years of experience across Apex, LWC, Agentforce, Data Cloud, and Flow automation. He holds 7 active Salesforce certifications and is preparing for Sharing & Visibility Architect.`;

    if (lower.includes('project') || lower.includes('hackathon')) {
      reply = `Harsh won 1st Place in the 2023 Hackathon for developing a context-aware Quick Action Recommendation Engine using Einstein Next Best Action, Apex, and Flow. He also built an automated Custom Diagnostic Tool that reduced analysis time by 40%.`;
    } else if (lower.includes('skill') || lower.includes('apex') || lower.includes('lwc')) {
      reply = `Harsh specializes in Async/Batch Apex, Lightning Web Components (LWC), Flow Builder, REST/SOAP integrations, and enterprise AI configurations in Data Cloud and Agentforce.`;
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
      reply = `You can reach Harsh directly via email at ${personal.email} or call at ${personal.phone}. He is based in Hyderabad, India.`;
    }

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'agentforce', text: reply },
    ]);
    setChatInput('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] text-left animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-[#0176d3] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              {modalType === 'agentforce' ? 'smart_toy' : modalType === 'experience' ? 'work' : modalType === 'projects' ? 'stars' : modalType === 'skills' ? 'code' : modalType === 'certifications' ? 'verified' : 'contact_mail'}
            </span>
            <h2 className="font-semibold text-sm">
              {modalType === 'agentforce' && 'Agentforce Copilot Assistant'}
              {modalType === 'experience' && 'Professional Experience & Career History'}
              {modalType === 'projects' && 'Key Technical Projects & Hackathon Highlights'}
              {modalType === 'skills' && 'Technical Skills & Platform Architecture'}
              {modalType === 'certifications' && 'Salesforce Certifications (7 Active)'}
              {modalType === 'contact' && 'Connect & Direct Contact Information'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-7 h-7 rounded hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {/* 1. EXPERIENCE MODAL */}
          {modalType === 'experience' && (
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{exp.role}</h3>
                      <span className="text-xs text-[#0176d3] font-semibold">{exp.company} • {exp.location}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 w-fit mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pt-2 text-slate-600 text-xs">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#0176d3] font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-slate-700">
                <strong>Education:</strong> {education.degree} — {education.institution} ({education.period})
              </div>
            </div>
          )}

          {/* 2. SKILLS MODAL */}
          {modalType === 'skills' && (
            <div className="space-y-4">
              {skills.map((sk, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#0176d3]">{sk.icon}</span>
                    <h3>{sk.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sk.items.map((item, iIdx) => (
                      <span key={iIdx} className="px-2.5 py-1 bg-white text-slate-800 border border-slate-200 rounded-md text-xs font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. PROJECTS MODAL */}
          {modalType === 'projects' && (
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0176d3] bg-blue-50 px-2 py-0.5 rounded">
                      {proj.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {proj.highlight}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="pt-2 text-[11px] font-mono text-slate-700">
                    <strong className="text-slate-500 font-sans">Tech:</strong> {proj.tech}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. CERTIFICATIONS MODAL */}
          {modalType === 'certifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500">{c.badge}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                  <span className="text-[10px] text-slate-400 block mt-1">{c.group}</span>
                </div>
              ))}
            </div>
          )}

          {/* 5. CONTACT MODAL */}
          {modalType === 'contact' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Direct Contact Channels</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-600">Email:</span>
                    <a href={`mailto:${personal.email}`} className="font-semibold text-[#0176d3] hover:underline">
                      {personal.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-600">Phone:</span>
                    <button onClick={handleCopyPhone} className="font-semibold text-slate-900 hover:text-[#0176d3] cursor-pointer">
                      {copied ? 'Copied to Clipboard!' : personal.phone}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-600">LinkedIn:</span>
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0176d3] hover:underline">
                      linkedin.com/{personal.linkedinHandle}
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                    <span className="text-slate-600">Trailhead Profile:</span>
                    <a href={personal.trailheadUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-600 hover:underline">
                      View Trailhead Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. AGENTFORCE CHAT DRAWER */}
          {modalType === 'agentforce' && (
            <div className="flex flex-col h-[65vh]">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-xl border border-slate-200 mb-3">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-3 rounded-xl text-xs max-w-[85%] ${
                      msg.sender === 'user' 
                        ? 'bg-[#0176d3] text-white rounded-br-xs' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}>
                      {msg.sender === 'agentforce' && (
                        <div className="flex items-center gap-1 font-bold text-[#0176d3] text-[10px] mb-1">
                          <span className="material-symbols-outlined text-[13px]">smart_toy</span>
                          Agentforce
                        </div>
                      )}
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompts */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickQuestion(
                    "Tell me about Harsh's role at Salesforce",
                    "Harsh is a Senior Success Guide and Techno-Functional Specialist at Salesforce (Hyderabad), leading technical workshops, Org Health assessments, and Agentforce implementations."
                  )}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full border border-slate-200 whitespace-nowrap cursor-pointer"
                >
                  Role @ Salesforce
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion(
                    "Tell me about the 2023 Hackathon project",
                    "Harsh won 1st Place in the 2023 internal Hackathon by creating a context-aware Quick Action Recommendation Engine using Einstein Next Best Action, Apex, and Flow."
                  )}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full border border-slate-200 whitespace-nowrap cursor-pointer"
                >
                  Hackathon 1st Place
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion(
                    "What certifications does Harsh hold?",
                    "Harsh holds 7 active certifications including Platform Developer II (PDII), Platform Developer I (PDI), AI Specialist, App Builder, and Sales Cloud Consultant."
                  )}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full border border-slate-200 whitespace-nowrap cursor-pointer"
                >
                  Certifications List
                </button>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Agentforce about Harsh's experience, projects, or certifications..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0176d3]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0176d3] text-white rounded-lg text-xs font-semibold hover:bg-[#005da9] transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#005da9] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
