import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [sessionType, setSessionType] = useState('arch-review');
  const [selectedDate, setSelectedDate] = useState('2025-04-15');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM PST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const sessionTypes = [
    {
      id: 'arch-review',
      title: 'Enterprise Architecture & Governor Audit',
      duration: '60 mins',
      desc: 'Deep-dive review of your org’s Apex triggers, data model, LDV bottlenecks, and governor limit mitigation.',
    },
    {
      id: 'cta-mock',
      title: 'CTA Review Board Mock & Coaching',
      duration: '90 mins',
      desc: 'Simulated 3-hour CTA board scenario defense: System integration, single sign-on, data migration, and Q&A.',
    },
    {
      id: 'agentforce',
      title: 'Agentforce & Data Cloud Strategy Session',
      duration: '45 mins',
      desc: 'Autonomous agent design, custom invocable actions, Data Cloud identity resolution, and prompt grounding.',
    },
    {
      id: 'advisory',
      title: 'Interim Technical Advisory 1:1',
      duration: '30 mins',
      desc: 'High-level architectural guidance, GovCloud compliance readiness, and team leadership consulting.',
    },
  ];

  const timeSlots = [
    '09:00 AM PST',
    '10:00 AM PST',
    '11:30 AM PST',
    '02:00 PM PST',
    '03:30 PM PST',
    '04:30 PM PST',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0176d3] to-[#005da9] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
            <div>
              <h2 className="text-base font-bold">Schedule Architecture 1:1 Consultation</h2>
              <span className="text-[11px] text-blue-100">
                Direct advisory with {PORTFOLIO_DATA.candidate.name} (SLA: &lt; 4 business hours)
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">event_available</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Consultation Scheduled!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-800">{name || 'Trailblazer'}</strong>! A calendar invite (.ics) and confirmation email have been sent to <strong className="text-slate-800">{email || 'your email'}</strong> for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto text-xs text-slate-700 font-mono text-left">
              <div>Session: {sessionTypes.find(s => s.id === sessionType)?.title}</div>
              <div>Host: {PORTFOLIO_DATA.candidate.name} ({PORTFOLIO_DATA.candidate.email})</div>
              <div>Platform: Google Meet / Salesforce Video</div>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-[#0176d3] text-white text-xs font-semibold rounded-lg hover:bg-[#005da9] transition-colors"
              >
                Back to Console
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 text-xs">
            {/* Session Type Grid */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. Select Consultation Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      <span className="font-semibold text-slate-800 text-xs">
                        {type.title}
                      </span>
                      <span className="text-[10px] font-bold text-[#0176d3] bg-blue-100 px-1.5 py-0.5 rounded">
                        {type.duration}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {type.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  2. Choose Date
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
                  3. Select Time Slot
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

            {/* Contact Details */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                4. Your Contact & Organization Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                />
                <input
                  type="email"
                  required
                  placeholder="Corporate Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                />
                <input
                  type="text"
                  placeholder="Company / Org Name"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
                />
              </div>
            </div>

            {/* Topic Notes */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Architecture Focus or Scope (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="E.g., Reviewing our 50M record Account trigger refactor before Q3 peak..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
              />
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                🔒 GovCloud & NDA protected session
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0176d3] hover:bg-[#005da9] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
