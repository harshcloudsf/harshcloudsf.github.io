import React, { useState } from 'react';
import { PORTFOLIO_DATA, CareerStage, CaseStudy, CodeSnippet } from '../data/portfolioData';
import { CareerMilestoneModal } from '../components/CareerMilestoneModal';
import { InspectCaseStudyModal } from '../components/InspectCaseStudyModal';
import { ConsultationModal } from '../components/ConsultationModal';

interface OverviewViewProps {
  onSelectTab: (tab: string) => void;
  onOpenSchemaModal: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectTab,
  onOpenSchemaModal,
}) => {
  // Center column tabs: 'code' | 'cases' | 'soql'
  const [centerTab, setCenterTab] = useState<'code' | 'cases' | 'soql'>('code');

  // Code snippet sub-tab selection
  const [activeSnippetId, setActiveSnippetId] = useState<string>('domain-handler');

  // Modals state
  const [selectedMilestone, setSelectedMilestone] = useState<CareerStage | null>(null);
  const [inspectCase, setInspectCase] = useState<CaseStudy | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);

  // Deployment & Test execution simulation states
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployToast, setDeployToast] = useState<string | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResultSummary, setTestResultSummary] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Chatter Likes state
  const [likesState, setLikesState] = useState<Record<string, { count: number; userLiked: boolean }>>({
    'chatter-1': { count: 34, userLiked: false },
    'chatter-2': { count: 56, userLiked: false },
  });
  const [newChatterText, setNewChatterText] = useState('');
  const [chatterPostsList, setChatterPostsList] = useState(PORTFOLIO_DATA.chatterPosts);

  // SOQL Terminal in Center Tab
  const [soqlPreset, setSoqlPreset] = useState<string>('skills');
  const [customQuery, setCustomQuery] = useState(PORTFOLIO_DATA.soqlDatasets.skills.query);
  const [activeDataset, setActiveDataset] = useState(PORTFOLIO_DATA.soqlDatasets.skills);

  const activeCodeSnippet =
    PORTFOLIO_DATA.codeSnippets.find((c) => c.id === activeSnippetId) ||
    PORTFOLIO_DATA.codeSnippets[0];

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployToast(null);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployToast(`Deployed ${activeCodeSnippet.filename} to Org ${PORTFOLIO_DATA.candidate.connectedOrg}: Status 200 OK (0 Compilation Warnings)`);
      setTimeout(() => setDeployToast(null), 5000);
    }, 1200);
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTestResultSummary(null);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestResultSummary(`Apex Test Suite: 42/42 Tests Passed (Coverage: 98.4% • 0 Failures • CPU: 14ms)`);
      setTimeout(() => setTestResultSummary(null), 6000);
    }, 1400);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeCodeSnippet.code);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleToggleLike = (postId: string) => {
    setLikesState((prev) => {
      const current = prev[postId] || { count: 0, userLiked: false };
      const nextLiked = !current.userLiked;
      return {
        ...prev,
        [postId]: {
          count: nextLiked ? current.count + 1 : current.count - 1,
          userLiked: nextLiked,
        },
      };
    });
  };

  const handlePostChatter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatterText.trim()) return;

    const newPost = {
      id: `chatter-${Date.now()}`,
      author: 'Trailblazer Colleague',
      role: 'Enterprise Architect @ Salesforce Ecosystem',
      initials: 'TC',
      avatarColor: 'bg-[#005da9]',
      content: `"${newChatterText.trim()}"`,
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
      comments: [],
    };

    setChatterPostsList([newPost, ...chatterPostsList]);
    setLikesState((prev) => ({
      ...prev,
      [newPost.id]: { count: 1, userLiked: true },
    }));
    setNewChatterText('');
  };

  const handleRunSoqlPreset = (key: string) => {
    setSoqlPreset(key);
    const ds = PORTFOLIO_DATA.soqlDatasets[key];
    if (ds) {
      setCustomQuery(ds.query);
      setActiveDataset(ds);
    }
  };

  const handleExecuteQuery = () => {
    const q = customQuery.toLowerCase();
    let matchedKey = 'skills';
    if (q.includes('impact') || q.includes('roi') || q.includes('customer')) {
      matchedKey = 'wins';
    } else if (q.includes('cert') || q.includes('architect')) {
      matchedKey = 'certs';
    } else if (q.includes('pattern') || q.includes('framework')) {
      matchedKey = 'architecture';
    }
    setActiveDataset(PORTFOLIO_DATA.soqlDatasets[matchedKey]);
  };

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-4 text-left">
      {/* 1. SLDS RECORD HIGHLIGHTS HEADER PANEL */}
      <section className="w-full bg-white rounded-lg shadow-sm p-4 sm:p-6 relative overflow-hidden border border-slate-200">
        {/* Subtle Ambient Accent */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
          {/* Object Entity Badge + Subject Title */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0176d3] to-[#3d4cce] flex items-center justify-center text-white shadow-md shrink-0">
              <span className="material-symbols-outlined text-[32px] sm:text-[36px]">cloud</span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold tracking-wider uppercase bg-blue-100 text-blue-900 px-2 py-0.5 rounded-sm">
                  Candidate / Senior Success Engineer
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">
                  <span className="material-symbols-outlined text-[14px] text-amber-500">verified</span>
                  Verified Salesforce CSG Record
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 truncate">
                {PORTFOLIO_DATA.candidate.name}
                <span className="text-sm sm:text-base font-normal text-slate-500 block sm:inline sm:ml-2">
                  {PORTFOLIO_DATA.candidate.title}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 mt-0.5">
                {PORTFOLIO_DATA.candidate.tagline}
              </p>
            </div>
          </div>

          {/* SLDS Action Button Bar */}
          <div className="flex items-center gap-2 flex-wrap self-start xl:self-center">
            <button
              onClick={() => onSelectTab('interactive-soql-terminal')}
              className="h-9 px-4 rounded bg-[#005da9] text-white font-semibold text-xs hover:bg-[#0176d3] active:scale-95 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>Execute SOQL Console</span>
            </button>

            <button
              onClick={() => setShowConsultation(true)}
              className="h-9 px-4 rounded bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 active:scale-95 transition-all flex items-center gap-1.5 border border-slate-200 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#0176d3]">calendar_add_on</span>
              <span>Schedule Architecture 1:1</span>
            </button>

            <a
              href="#cv-download"
              onClick={(e) => {
                e.preventDefault();
                alert(`Salesforce Technical Architect CV Download:\n\nPreparing certified candidate dossier for ${PORTFOLIO_DATA.candidate.name} (14x Salesforce Certified, 7x Trailhead Ranger, $42.8M Annualized Client Value).`);
              }}
              className="h-9 px-4 rounded bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 active:scale-95 transition-all flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download CV</span>
            </a>

            <button
              onClick={onOpenSchemaModal}
              className="w-9 h-9 rounded bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-all border border-slate-200 cursor-pointer"
              title="Inspect Record Schema"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">schema</span>
            </button>
          </div>
        </div>

        {/* Quick Compact Metrics Strip (SLDS Record Meta Strip) */}
        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Organization</span>
            <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>
              {PORTFOLIO_DATA.candidate.currentOrg}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trailhead Rank</span>
            <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-amber-500">military_tech</span>
              {PORTFOLIO_DATA.candidate.trailheadRank}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Salesforce Certifications</span>
            <span className="text-sm font-semibold text-[#3d4cce] flex items-center gap-1.5 mt-0.5">
              14x Certified (CTA Review)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Enterprise CSAT Score</span>
            <span className="text-sm font-semibold text-[#2e844a] flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">sentiment_very_satisfied</span>
              {PORTFOLIO_DATA.candidate.csatScore}
            </span>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Optimized Client Value</span>
            <span className="text-sm text-slate-900 mt-0.5 font-bold">
              {PORTFOLIO_DATA.candidate.clientValue}
            </span>
          </div>
        </div>
      </section>

      {/* 2. PATH COMPONENT (Salesforce Chevron Milestone Bar) */}
      <section className="w-full bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#0176d3]">timeline</span>
            Career Pathway Execution Stage
          </span>
          <span className="text-xs text-[#0176d3] font-semibold">Stage 4 of 5 (Active Milestone)</span>
        </div>

        {/* Chevrons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-1">
          {PORTFOLIO_DATA.careerStages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedMilestone(stage)}
                className={`relative p-2.5 rounded flex items-center justify-between text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0176d3] text-white shadow-md ring-2 ring-blue-300'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`material-symbols-outlined text-[16px] ${
                    isCurrent ? 'text-white animate-spin-slow' : isCompleted ? 'text-emerald-600' : 'text-[#3d4cce]'
                  }`}>
                    {isCurrent ? 'play_circle' : isCompleted ? 'check_circle' : 'workspace_premium'}
                  </span>
                  <span className="text-xs font-semibold truncate">{stage.role}</span>
                </div>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  isCurrent ? 'bg-white text-[#0176d3]' : isCompleted ? 'text-emerald-700' : 'text-[#3d4cce]'
                }`}>
                  {isCurrent ? 'CURRENT' : stage.period}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN LIGHTNING APP 3-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ==================== LEFT COLUMN (3 Cols) ==================== */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          {/* Trailhead & Credentials Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </span>
                <h2 className="text-sm font-bold text-slate-900">Trailhead &amp; Credentials</h2>
              </div>
              <button
                onClick={() => onSelectTab('trailhead-and-badges')}
                className="text-[#0176d3] hover:underline text-[11px] font-semibold"
              >
                Verify ID
              </button>
            </div>

            {/* Ranger Hero Pill */}
            <div className="mt-4 bg-gradient-to-r from-amber-50/70 via-slate-50 to-amber-50/70 p-3 rounded-lg flex items-center gap-3 border border-amber-200/50">
              <div className="relative shrink-0">
                <div className="w-13 h-13 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-700 shadow-inner">
                  <span className="material-symbols-outlined text-[30px]">military_tech</span>
                </div>
                <span className="absolute -bottom-1 -right-1 bg-[#3d4cce] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  7x
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Trailhead Ranger
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {PORTFOLIO_DATA.candidate.points.toLocaleString()} Points
                </span>
                <span className="text-xs text-slate-600">
                  {PORTFOLIO_DATA.candidate.badgesCount} Badges Completed
                </span>
              </div>
            </div>

            {/* Superbadges Accordion Grid */}
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected Superbadges
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {PORTFOLIO_DATA.superbadges.slice(0, 4).map((sb) => (
                  <span
                    key={sb.name}
                    className="inline-flex items-center gap-1 bg-[#fef3d6] text-[#8c5300] px-2 py-1 rounded text-[11px] font-semibold border border-amber-200/40"
                  >
                    <span className="material-symbols-outlined text-[13px]">stars</span>
                    {sb.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Certifications List */}
            <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                14 Official Certifications
              </span>
              <div className="space-y-2">
                {PORTFOLIO_DATA.certifications.slice(1, 7).map((c) => (
                  <div key={c.id} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-medium text-slate-800 truncate">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.badgeColor} shrink-0`}></span>
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onSelectTab('trailhead-and-badges')}
                className="mt-2 text-center text-xs font-semibold text-[#0176d3] hover:underline"
              >
                View all 14 Certifications & Pyramid →
              </button>
            </div>
          </div>

          {/* Architecture Mastery Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#0176d3] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">speed</span>
                </span>
                <h2 className="text-sm font-bold text-slate-900">Architecture Mastery</h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">Governor Safe</span>
            </div>

            {/* Stack Gauge Bars */}
            <div className="mt-4 flex flex-col gap-3.5">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Apex &amp; Enterprise Patterns</span>
                  <span className="font-mono text-xs text-[#0176d3] font-bold">98%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#005da9] h-full rounded-full" style={{ width: '98%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Trigger Framework, Selector, Service, Domain layer
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Lightning Web Components (LWC)</span>
                  <span className="font-mono text-xs text-[#0176d3] font-bold">95%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0176d3] h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  LMS, Wire Adapters, Custom DOM, Headless LWC
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Event-Driven Architecture</span>
                  <span className="font-mono text-xs text-[#3d4cce] font-bold">94%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3d4cce] h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Platform Events, CDC, EMP Connector, Pub/Sub
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800">Data Cloud &amp; Agentforce</span>
                  <span className="font-mono text-xs text-[#5867e8] font-bold">90%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#5867e8] h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Data Streams, Identity Resolution, Custom Agent Actions
                </span>
              </div>
            </div>
          </div>

          {/* System Attributes Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200 text-xs">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 mb-2.5">
              <span className="material-symbols-outlined text-[18px] text-slate-400">info</span>
              <span className="text-sm font-bold text-slate-900">System Attributes</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2.5 text-slate-600">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location:</div>
              <div className="text-slate-900 font-medium">{PORTFOLIO_DATA.candidate.location}</div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Availability:</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {PORTFOLIO_DATA.candidate.availability}
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security Clearance:</div>
              <div className="text-slate-900">{PORTFOLIO_DATA.candidate.securityClearance}</div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GitHub Handle:</div>
              <a
                className="text-[#0176d3] hover:underline font-mono text-xs"
                href={`https://github.com/${PORTFOLIO_DATA.candidate.github.replace('@', '')}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {PORTFOLIO_DATA.candidate.github}
              </a>
            </div>
          </div>
        </aside>

        {/* ==================== CENTER COLUMN (6 Cols: Dev Console Core) ==================== */}
        <main className="lg:col-span-6 flex flex-col gap-4 min-w-0">
          <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden border border-slate-200">
            {/* Tab Bar Navigation */}
            <div className="flex items-center bg-slate-50 px-4 pt-1 border-b border-slate-200 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setCenterTab('cases')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  centerTab === 'cases'
                    ? 'border-[#0176d3] text-[#0176d3]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">domain_verification</span>
                <span>Enterprise Case Studies (3)</span>
              </button>

              <button
                onClick={() => setCenterTab('soql')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  centerTab === 'soql'
                    ? 'border-[#0176d3] text-[#0176d3]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span>Live SOQL Console</span>
              </button>

              <button
                onClick={() => setCenterTab('code')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  centerTab === 'code'
                    ? 'border-[#0176d3] text-[#0176d3]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
                <span className="font-bold">Apex &amp; LWC Workbench</span>
                <span className="bg-[#2e844a] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  Enterprise Patterns
                </span>
              </button>
            </div>

            {/* TAB CONTENT: APEX & LWC WORKBENCH */}
            {centerTab === 'code' && (
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4">
                {/* Deployment Toast Notification if active */}
                {deployToast && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-2 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      {deployToast}
                    </span>
                    <button onClick={() => setDeployToast(null)} className="text-emerald-700">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}

                {/* Unit Test Run Notification if active */}
                {testResultSummary && (
                  <div className="bg-blue-50 border border-blue-300 text-blue-900 px-3 py-2 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      {testResultSummary}
                    </span>
                    <button onClick={() => setTestResultSummary(null)} className="text-blue-700">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}

                {/* Dev Workspace Meta Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#0176d3]">terminal</span>
                        SFDX Dev Workspace
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-mono text-slate-800 font-semibold">
                        Tooling API v61.0 (Summer '24)
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Governor Safe: 0 SOQL in Loops
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-medium">
                        Coverage: <strong className="text-emerald-700">98.4%</strong> (Target: 75%)
                      </span>
                      <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Production Ready
                      </span>
                    </div>
                  </div>

                  {/* File Sub-tabs */}
                  <div className="flex items-center justify-between border-b border-slate-200 pt-2">
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                      {PORTFOLIO_DATA.codeSnippets.map((file) => {
                        const isSelected = activeSnippetId === file.id;
                        return (
                          <button
                            key={file.id}
                            onClick={() => setActiveSnippetId(file.id)}
                            className={`px-3 py-1.5 rounded-t font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-[#0b132b] text-[#a4c9ff] border-t-2 border-[#0176d3] font-bold shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[15px] text-amber-500">
                              {file.fileType === 'trigger' ? 'bolt' : file.fileType.includes('lwc') ? 'javascript' : 'code'}
                            </span>
                            <span>{file.filename}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1"></span>}
                          </button>
                        );
                      })}
                    </div>

                    <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <span>{activeCodeSnippet.path}</span>
                    </div>
                  </div>
                </div>

                {/* Dark IDE Code Editor */}
                <div className="bg-[#0b132b] rounded-lg text-white font-mono shadow-inner flex flex-col border-l-4 border-[#0176d3] overflow-hidden">
                  {/* Editor Top Toolbar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#032d60]/40 text-slate-400 text-xs border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="ml-2 text-slate-300 font-medium">
                        Apex Enterprise Patterns (fflib_SObjectDomain)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[#a4c9ff] hidden sm:inline">{activeCodeSnippet.language}</span>
                      <span className="text-slate-400">UTF-8 • CRLF</span>
                    </div>
                  </div>

                  {/* Code lines container with line numbers */}
                  <div className="p-4 flex items-start gap-3 overflow-x-auto max-h-80">
                    <div className="select-none text-slate-500 text-right font-mono text-xs space-y-0.5 pt-0.5 leading-relaxed opacity-60">
                      {activeCodeSnippet.code.split('\n').map((_, idx) => (
                        <div key={idx}>{(idx + 1).toString().padStart(2, '0')}</div>
                      ))}
                    </div>
                    <pre className="font-mono text-xs leading-relaxed text-[#a3defe] m-0 overflow-visible">
                      <code>{activeCodeSnippet.code}</code>
                    </pre>
                  </div>

                  {/* Action Buttons Footer inside IDE */}
                  <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 bg-[#032d60]/40 border-t border-slate-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className="h-8 px-3.5 rounded bg-[#0176d3] text-white font-semibold text-xs hover:bg-[#005da9] active:scale-95 transition-all flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-50"
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isDeploying ? 'animate-spin' : ''}`}>
                          {isDeploying ? 'sync' : 'cloud_upload'}
                        </span>
                        <span>{isDeploying ? 'Deploying...' : 'Deploy to Org'}</span>
                      </button>

                      <button
                        onClick={handleRunTests}
                        disabled={isRunningTests}
                        className="h-8 px-3 rounded bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <span className={`material-symbols-outlined text-[16px] ${isRunningTests ? 'animate-spin' : ''}`}>
                          {isRunningTests ? 'sync' : 'play_arrow'}
                        </span>
                        <span>{isRunningTests ? 'Running...' : 'Run Apex Tests (Alt+T)'}</span>
                      </button>

                      <button
                        onClick={() => alert(`Code formatted with Prettier Salesforce Apex Plugin:\n✓ 4 spaces indentation\n✓ Clean imports\n✓ Javadoc annotations aligned`)}
                        className="h-8 px-3 rounded bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">reorder</span>
                        <span>Format (Prettier)</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyCode}
                        className="h-8 px-3 rounded bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedCode ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Architecture Compliance & Governor Limits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[#0176d3]">
                      <span className="material-symbols-outlined text-[18px]">speed</span>
                      <span className="font-bold text-xs text-slate-900">Governor Limit Impact</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">0 SOQL queries inside loops</span>
                    <span className="font-mono text-[11px] text-[#2e844a] font-bold mt-auto">
                      &lt; 18ms CPU execution time
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span className="font-bold text-xs text-slate-900">Unit Test Suite</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">42 tests passing (0 failures)</span>
                    <span className="font-mono text-[11px] text-[#2e844a] font-bold mt-auto">
                      98.4% assertion coverage
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[#3d4cce]">
                      <span className="material-symbols-outlined text-[18px]">architecture</span>
                      <span className="font-bold text-xs text-slate-900">Architecture Compliance</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">fflib Separation of Concerns</span>
                    <span className="font-mono text-[11px] text-[#3d4cce] font-bold mt-auto">
                      UnitOfWork • Domain • Selector
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ENTERPRISE CASE STUDIES (3) */}
            {centerTab === 'cases' && (
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Enterprise Architecture Case Studies</h3>
                    <p className="text-xs text-slate-500">Audited customer transformations delivered by Alex Rivera</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    Total ROI: $42.8M Annualized
                  </span>
                </div>

                <div className="space-y-4">
                  {PORTFOLIO_DATA.caseStudies.map((cs) => (
                    <div
                      key={cs.id}
                      className="p-4 rounded-lg border border-slate-200 hover:border-[#0176d3] bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col gap-2.5"
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {cs.industry} • {cs.year}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{cs.title}</h4>
                          <span className="text-xs text-[#0176d3] font-medium">{cs.client}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-emerald-700 block">{cs.annualRoi} ROI</span>
                          <span className="text-[10px] text-slate-500 font-mono">{cs.governorLimitGain}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {cs.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60">
                        {cs.metrics.map((m, i) => (
                          <div key={i} className="text-center p-1.5 bg-white rounded border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">{m.label}</span>
                            <span className="text-xs font-bold text-slate-800 font-mono">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1">
                          {cs.technologies.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-white text-slate-700 rounded text-[10px] font-medium border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setInspectCase(cs)}
                          className="px-3 py-1 bg-[#0176d3] text-white rounded text-xs font-semibold hover:bg-[#005da9] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Inspect Blueprint</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: LIVE SOQL CONSOLE */}
            {centerTab === 'soql' && (
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#0176d3]">terminal</span>
                    <h3 className="font-bold text-sm text-slate-900">Interactive SOQL Query Terminal</h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    SObject Execution Engine
                  </span>
                </div>

                {/* Preset buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Presets:</span>
                  {Object.entries(PORTFOLIO_DATA.soqlDatasets).map(([k, ds]) => (
                    <button
                      key={k}
                      onClick={() => handleRunSoqlPreset(k)}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        soqlPreset === k
                          ? 'bg-[#0176d3] text-white border-[#0176d3]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ds.name}
                    </button>
                  ))}
                </div>

                {/* Query Input Box */}
                <div className="flex flex-col gap-2">
                  <div className="bg-[#0b132b] rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-[#a4c9ff]">SOQL Query Editor:</span>
                    <textarea
                      rows={2}
                      className="w-full bg-transparent text-[#a3defe] font-mono text-xs outline-none resize-none leading-relaxed"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-mono">
                      Status: <strong className="text-emerald-700">Success</strong> • Time: {activeDataset.time} • Heap: {activeDataset.heap}
                    </div>
                    <button
                      onClick={handleExecuteQuery}
                      className="px-4 py-1.5 rounded bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#005da9] flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Execute Query</span>
                    </button>
                  </div>
                </div>

                {/* Query Results Table */}
                <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-72">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        {activeDataset.headers.map((h, i) => (
                          <th key={i} className="py-2 px-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-xs">
                      {activeDataset.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-2 px-3 text-slate-400">{row[0]}</td>
                          <td className="py-2 px-3 font-semibold text-[#0176d3]">{row[1]}</td>
                          <td className="py-2 px-3 text-emerald-700 font-medium">{row[2]}</td>
                          <td className="py-2 px-3 text-slate-700">{row[3]}</td>
                          {row[4] && (
                            <td className="py-2 px-3">
                              <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold text-[10px]">
                                {row[4]}
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bottom Console Status Footer */}
            <div className="bg-slate-100 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Apex Language Server: Ready
                </span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="hidden sm:inline text-slate-600">
                  Branch: feature/agentforce-core
                </span>
                <span className="hidden md:inline text-slate-400">•</span>
                <span className="hidden md:inline text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Apex PMD: 0 Violations (Clean Architecture)
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[#0176d3]">
                <span className="text-slate-600">
                  Heap: <strong className="text-slate-900">84KB / 6.0MB</strong>
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* ==================== RIGHT COLUMN (3 Cols) ==================== */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          {/* SLDS Activity Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#3d4cce] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                </span>
                <h2 className="text-sm font-bold text-slate-900">Activity Timeline</h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Q2 2024</span>
            </div>

            <div className="mt-4 relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Item 1 */}
              <div className="relative group text-left">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0176d3] ring-4 ring-white"></span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Yesterday • CSG Keynote</span>
                  <span className="text-xs text-slate-900 font-semibold">Delivered Agentforce Deep Dive</span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Presented autonomous action patterns to 400+ Enterprise Architects at Dreamforce warm-up.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group text-left">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-white"></span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">May 14, 2024 • Architecture Signoff</span>
                  <span className="text-xs text-slate-900 font-semibold">Tier-1 Core Banking Go-Live</span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Successfully migrated 40M+ ledger records with zero downtime and sub-200ms latency.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group text-left">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#3d4cce] ring-4 ring-white"></span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">April 22, 2024 • Trailhead Publication</span>
                  <span className="text-xs text-slate-900 font-semibold">Published "High-Volume Events"</span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Official Salesforce Developer Blog tutorial on EMP Connector best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Salesforce Chatter Endorsements */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-[#0176d3] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                </span>
                <h2 className="text-sm font-bold text-slate-900">Executive Chatter</h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Verified Colleagues</span>
            </div>

            {/* Chatter Posts List */}
            <div className="mt-4 space-y-3">
              {chatterPostsList.map((post) => {
                const likeData = likesState[post.id] || { count: post.likes, userLiked: false };

                return (
                  <div key={post.id} className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1.5 border border-slate-100 text-left">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${post.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {post.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-900 leading-tight truncate">
                          {post.author}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">{post.role}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 italic mt-0.5 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1.5 border-t border-slate-200/60">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                          likeData.userLiked ? 'text-[#0176d3]' : 'text-slate-600 hover:text-[#0176d3]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {likeData.userLiked ? 'thumb_up' : 'thumb_up'}
                        </span>
                        <span>Liked ({likeData.count})</span>
                      </button>
                      <span>{post.commentsCount} Comments</span>
                      <span className="ml-auto text-[10px] text-slate-400">{post.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Chatter input */}
            <form onSubmit={handlePostChatter} className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Post colleague endorsement..."
                value={newChatterText}
                onChange={(e) => setNewChatterText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0176d3]"
              />
              <button
                type="submit"
                disabled={!newChatterText.trim()}
                className="px-2.5 py-1.5 rounded bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#005da9] disabled:opacity-40 transition-colors"
              >
                Share
              </button>
            </form>
          </div>

          {/* Schedule Consultation Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 p-4 rounded-lg shadow-sm border border-slate-200 text-left">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 mb-2">
              <span className="material-symbols-outlined text-[20px] text-[#0176d3]">calendar_month</span>
              <h2 className="text-sm font-bold text-slate-900">Schedule Consultation</h2>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Book an architecture consultation, advisory session, or review board mock:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setShowConsultation(true)}
                className="w-full h-9 rounded bg-[#0176d3] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#005da9] transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                <span>Book Architecture 1:1</span>
              </button>

              <a
                className="w-full h-9 rounded bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-all border border-slate-200"
                href={`mailto:${PORTFOLIO_DATA.candidate.email}`}
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span className="truncate">{PORTFOLIO_DATA.candidate.email}</span>
              </a>

              <a
                className="w-full h-9 rounded bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-all border border-slate-200"
                href={PORTFOLIO_DATA.candidate.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>Connect on LinkedIn</span>
              </a>
            </div>

            <div className="mt-3 pt-2 text-center border-t border-slate-100">
              <span className="text-[10px] text-slate-500 font-medium">Response SLA: &lt; 4 Business Hours</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <CareerMilestoneModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />

      <InspectCaseStudyModal
        caseStudy={inspectCase}
        onClose={() => setInspectCase(null)}
        onOpenSchedule={() => setShowConsultation(true)}
      />

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </div>
  );
};
