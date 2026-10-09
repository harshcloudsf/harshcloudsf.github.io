import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ScheduleCallView: React.FC = () => {
  const [sessionType, setSessionType] = useState('arch-review');
  const [selectedDate, setSelectedDate] = useState('2025-04-16');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM PST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [recordsScale, setRecordsScale] = useState('10M - 50M');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const sessionTypes = [
    {
      id: 'arch-review',
      title: 'Enterprise Architecture & Governor Audit',
      duration: '60 mins',
      desc: 'In-depth review of existing Apex trigger frameworks, large data volume indexing, skinny table strategy, and multi-org boundaries.',
      icon: 'speed',
    },
    {
      id: 'cta-mock',
      title: 'CTA Review Board Mock & Coaching',
      duration: '90 mins',
      desc: 'Simulated 3-hour CTA board scenario review with high-pressure Q&A on SSO, integration patterns, and data governance.',
      icon: 'workspace_premium',
    },
    {
      id: 'agentforce',
      title: 'Agentforce & Data Cloud Strategy Session',
      duration: '45 mins',
      desc: 'Architecting autonomous agents, prompt grounding with Data Cloud calculated insights, and safe transactional Apex invocables.',
      icon: 'smart_toy',
    },
    {
      id: 'advisory',
      title: 'Interim Technical Advisory 1:1',
      duration: '30 mins',
      desc: 'Executive advisory for CIOs, VPs of Engineering, and Platform Owners on roadmap planning and GovCloud compliance.',
      icon: 'support_agent',
    },
  ];

  const timeSlots = [
    '09:00 AM PST',
    '10:30 AM PST',
    '01:00 PM PST',
    '02:30 PM PST',
    '04:00 PM PST',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-6 text-left">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Salesforce Lightning Scheduler Service
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Schedule Architecture Consultation / 1:1 Advisory
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Connect directly with Alex Rivera for technical advisory, CTA review board coaching, or large data volume audits.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-3.5 py-2 rounded-lg border border-blue-200">
          <span className="material-symbols-outlined text-[18px] text-[#0176d3]">schedule</span>
          <span className="text-xs text-slate-700">
            Guaranteed Response SLA: <strong className="text-[#0176d3]">&lt; 4 Business Hours</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Scheduler Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          {isBooked ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[36px]">event_available</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Architecture Session Confirmed!</h2>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{name || 'Colleague'}</strong>! We have reserved your session for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>. A calendar invite (.ics) and video link have been dispatched to <strong className="text-slate-800">{email}</strong>.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto text-xs text-slate-700 font-mono text-left space-y-1">
                <div>Format: {sessionTypes.find((s) => s.id === sessionType)?.title}</div>
                <div>Scale Tier: {recordsScale}</div>
                <div>Host: Alex Rivera (alex.rivera.sfdc@gmail.com)</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsBooked(false)}
                  className="px-5 py-2 rounded bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#005da9]"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* 1. Format Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  1. Select Consultation Focus Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSessionType(type.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        sessionType === type.id
                          ? 'border-[#0176d3] bg-blue-50/50 ring-1 ring-[#0176d3]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#0176d3]">
                            {type.icon}
                          </span>
                          {type.title}
                        </span>
                        <span className="text-[10px] font-bold text-[#0176d3] bg-blue-100 px-1.5 py-0.5 rounded">
                          {type.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {type.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    2. Select Consultation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    3. Select Preferred Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Client details */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  4. Your Details & Enterprise Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enterprise Work Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                  />
                  <input
                    type="text"
                    placeholder="Organization / Enterprise"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-1">
                      Target SObject Record Volume:
                    </label>
                    <select
                      value={recordsScale}
                      onChange={(e) => setRecordsScale(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="< 1M">&lt; 1 Million records</option>
                      <option value="1M - 10M">1 Million - 10 Million records</option>
                      <option value="10M - 50M">10 Million - 50 Million records (Large Data Volume)</option>
                      <option value="50M+">50 Million+ (Very Large Data Volume / BigObjects)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block mb-1">
                      Environment Classification:
                    </label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">
                      <option>Commercial Multi-Tenant Core</option>
                      <option>Salesforce GovCloud (FedRAMP High)</option>
                      <option>Financial Services Cloud (FSC)</option>
                      <option>Health Cloud (HIPAA Compliant)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Notes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  5. Architectural Scope & Agenda (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your current architectural challenge, governor limits pressure, or CTA mock objectives..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
                  Confidential &amp; GovCloud NDA protected
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0176d3] hover:bg-[#005da9] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Confirm &amp; Send Calendar Invite
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Direct Contact & Attributes (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Direct channels card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Direct Contact Channels
            </h3>

            <a
              href={`mailto:${PORTFOLIO_DATA.candidate.email}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#0176d3] hover:bg-blue-50/40 transition-all text-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0176d3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 block truncate">
                  {PORTFOLIO_DATA.candidate.email}
                </span>
                <span className="text-[10px] text-slate-500">Official CSG Correspondence</span>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.candidate.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#0176d3] hover:bg-blue-50/40 transition-all text-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0176d3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 block">LinkedIn Profile</span>
                <span className="text-[10px] text-slate-500">CTA Network &amp; Endorsements</span>
              </div>
            </a>

            <a
              href={`https://github.com/${PORTFOLIO_DATA.candidate.github.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#0176d3] hover:bg-blue-50/40 transition-all text-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                GH
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 block">
                  {PORTFOLIO_DATA.candidate.github}
                </span>
                <span className="text-[10px] text-slate-500">Public Apex &amp; LWC Repositories</span>
              </div>
            </a>
          </div>

          {/* Clearance & Security */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 text-xs space-y-2.5">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Clearance &amp; Compliance
            </h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex items-center justify-between">
                <span>Security Clearance:</span>
                <strong className="text-slate-800">GovCloud Ready</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>FedRAMP Classification:</span>
                <strong className="text-emerald-700">FedRAMP High</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>HIPAA / HITECH:</span>
                <strong className="text-emerald-700">Certified Compliant</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Location Base:</span>
                <span className="text-slate-800">{PORTFOLIO_DATA.candidate.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
