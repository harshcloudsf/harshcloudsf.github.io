import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';

export const TrailheadBadgesView: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [searchCert, setSearchCert] = useState<string>('');

  const pillars = ['All', 'Architect', 'Developer', 'Specialist', 'Consultant'];

  const filteredCerts = PORTFOLIO_DATA.certifications.filter((c) => {
    const matchesPillar = selectedPillar === 'All' || c.pillar === selectedPillar;
    const matchesSearch =
      c.name.toLowerCase().includes(searchCert.toLowerCase()) ||
      c.verificationCode.toLowerCase().includes(searchCert.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-6 text-left">
      {/* 1. Ranger Hero Badge Banner */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5 z-10">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-200 flex items-center justify-center text-amber-800 shadow-inner">
              <span className="material-symbols-outlined text-[48px]">military_tech</span>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#3d4cce] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
              7x Ranger
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Official Salesforce Trailhead Profile
              </span>
              <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Verified Credentials
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Alex Rivera • 7x Trailhead Ranger
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              528 Badges Completed • 384,100 Points • 14 Official Certifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10">
          <a
            href="https://trailhead.salesforce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0176d3] text-white rounded text-xs font-semibold hover:bg-[#005da9] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Verify on Trailhead</span>
          </a>
        </div>
      </div>

      {/* 2. The Salesforce Certified Technical Architect (CTA) Pyramid */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Salesforce Certified Architect Pyramid
            </h2>
            <p className="text-xs text-slate-500">
              Progression roadmap towards the Certified Technical Architect (CTA) Review Board
            </p>
          </div>
          <span className="text-xs font-bold text-[#3d4cce] bg-purple-50 px-2.5 py-1 rounded">
            Stage 5: Review Board In Pursuit
          </span>
        </div>

        {/* Visual Pyramid Representation */}
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-2.5 py-4">
          {/* Apex: CTA */}
          <div className="w-64 p-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center shadow-md border-2 border-amber-300">
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Pinnacle Credential</span>
            <span className="text-sm font-extrabold block">Certified Technical Architect (CTA)</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold">
              Review Board Pending (2025)
            </span>
          </div>

          {/* Tier 2: System Architect & Application Architect */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
            <div className="p-3 rounded-lg bg-[#0176d3] text-white text-center shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Pyramid Level 2</span>
              <span className="text-xs font-bold block">System Architect</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-100 px-2 py-0.2 rounded inline-block mt-1">
                ✓ Certified Active
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#0176d3] text-white text-center shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Pyramid Level 2</span>
              <span className="text-xs font-bold block">Application Architect</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-100 px-2 py-0.2 rounded inline-block mt-1">
                ✓ Certified Active
              </span>
            </div>
          </div>

          {/* Tier 3: Domain Specializations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-2xl text-[11px] text-center">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-700">
              Integration Architect
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-700">
              Identity &amp; Access Architect
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-700">
              Data Architect
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-700">
              Sharing &amp; Visibility Architect
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official Certifications Filter & Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          {/* Pillar Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {pillars.map((pil) => (
              <button
                key={pil}
                onClick={() => setSelectedPillar(pil)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedPillar === pil
                    ? 'bg-[#0176d3] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {pil}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-2.5">
              search
            </span>
            <input
              type="text"
              placeholder="Filter certifications..."
              value={searchCert}
              onChange={(e) => setSearchCert(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none"
            />
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
          {filteredCerts.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-lg border border-slate-200 hover:border-[#0176d3] bg-slate-50/40 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {c.pillar}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                  {c.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  Verification ID: {c.verificationCode}
                </span>

                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                  {c.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>Issued: {c.issueDate}</span>
                <span className="text-[#0176d3] font-semibold">Webassessor Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Superbadges Showcase */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Completed Trailhead Superbadges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PORTFOLIO_DATA.superbadges.map((sb) => (
            <div key={sb.name} className="p-3.5 bg-amber-50/40 rounded-lg border border-amber-200/60 flex items-start gap-3">
              <span className="material-symbols-outlined text-[24px] text-amber-600 shrink-0">
                stars
              </span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{sb.name}</span>
                <span className="text-[10px] text-amber-800 font-semibold uppercase">{sb.domain} • {sb.points} pts</span>
                <p className="text-[11px] text-slate-600 mt-1">{sb.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
