import React, { useState } from 'react';
import { PORTFOLIO_DATA, CodeSnippet } from '../data/portfolioData';

interface ApexLwcViewProps {
  onOpenSchedule: () => void;
}

export const ApexLwcView: React.FC<ApexLwcViewProps> = ({ onOpenSchedule }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('domain-handler');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployOutput, setDeployOutput] = useState<string[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeTestResults, setActiveTestResults] = useState<typeof PORTFOLIO_DATA.apexTests | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'files' | 'tests' | 'limits'>('files');
  const [copiedCode, setCopiedCode] = useState(false);

  const activeSnippet: CodeSnippet =
    PORTFOLIO_DATA.codeSnippets.find((s) => s.id === selectedFileId) ||
    PORTFOLIO_DATA.codeSnippets[0];

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployOutput(['[SFDX] Initiating deploy source to org SFDC-PROD-CSG-0089...']);

    setTimeout(() => {
      setDeployOutput((prev) => [...prev, `[SFDX] Resolving metadata: ${activeSnippet.filename}`]);
    }, 400);

    setTimeout(() => {
      setDeployOutput((prev) => [
        ...prev,
        `[SFDX] Running Apex Compilation & Syntax Invariants...`,
        `[SFDX] Apex PMD Rule Engine: 0 violations detected`,
      ]);
    }, 800);

    setTimeout(() => {
      setIsDeploying(false);
      setDeployOutput((prev) => [
        ...prev,
        `[SFDX] Successfully deployed 1 component.`,
        `[SFDX] Status: 200 OK • ComponentId: 01p8c00000Zyx12 • Time: 1,240ms`,
      ]);
    }, 1300);
  };

  const handleRunAllTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      setActiveTestResults(PORTFOLIO_DATA.apexTests);
    }, 1100);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeSnippet.code);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-4 text-left">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0176d3] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[24px]">code</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">Apex &amp; LWC Engineering Workbench</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Enterprise fflib Architecture
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Clean Separation of Concerns (fflib), UnitOfWork, Selector Layer, and Real-time EMP Connector subscriptions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAllTests}
            disabled={isRunningTests}
            className="h-9 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[16px] text-[#0176d3] ${isRunningTests ? 'animate-spin' : ''}`}>
              {isRunningTests ? 'sync' : 'play_arrow'}
            </span>
            <span>{isRunningTests ? 'Running Tests...' : 'Run Test Suite (Alt+T)'}</span>
          </button>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="h-9 px-4 rounded bg-[#0176d3] hover:bg-[#005da9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[16px] ${isDeploying ? 'animate-spin' : ''}`}>
              {isDeploying ? 'sync' : 'cloud_upload'}
            </span>
            <span>{isDeploying ? 'Deploying...' : 'Deploy to Org'}</span>
          </button>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {/* Sidebar Tab Selector */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveSidebarTab('files')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer ${
                activeSidebarTab === 'files' ? 'border-[#0176d3] text-[#0176d3] bg-white' : 'border-transparent'
              }`}
            >
              Explorer
            </button>
            <button
              onClick={() => setActiveSidebarTab('tests')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer ${
                activeSidebarTab === 'tests' ? 'border-[#0176d3] text-[#0176d3] bg-white' : 'border-transparent'
              }`}
            >
              Test Suites ({PORTFOLIO_DATA.apexTests.length})
            </button>
            <button
              onClick={() => setActiveSidebarTab('limits')}
              className={`flex-1 py-2.5 text-center border-b-2 cursor-pointer ${
                activeSidebarTab === 'limits' ? 'border-[#0176d3] text-[#0176d3] bg-white' : 'border-transparent'
              }`}
            >
              Governor Limits
            </button>
          </div>

          {/* Files Explorer Tab */}
          {activeSidebarTab === 'files' && (
            <div className="p-3 space-y-1 overflow-y-auto max-h-[580px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1">
                SFDX Project Source Tree
              </span>
              {PORTFOLIO_DATA.codeSnippets.map((file) => {
                const isSelected = selectedFileId === file.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-[#0176d3] font-semibold border border-blue-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-amber-500">
                        {file.fileType === 'trigger' ? 'bolt' : file.fileType.includes('lwc') ? 'javascript' : 'code'}
                      </span>
                      <div className="truncate">
                        <span className="font-mono text-xs block truncate">{file.filename}</span>
                        <span className="text-[10px] text-slate-500 block truncate">{file.language}</span>
                      </div>
                    </div>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#0176d3]"></span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Test Suites Tab */}
          {activeSidebarTab === 'tests' && (
            <div className="p-3 space-y-2 overflow-y-auto max-h-[580px]">
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="font-bold text-slate-700">Assertion Pass Rate:</span>
                <span className="font-bold text-emerald-700 font-mono">100% (42/42)</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {PORTFOLIO_DATA.apexTests.map((t, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-slate-800 truncate">
                        {t.name}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {t.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      Execution: {t.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governor Limits Tab */}
          {activeSidebarTab === 'limits' && (
            <div className="p-4 space-y-4 overflow-y-auto max-h-[580px] text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Synchronous Transaction Profiler
              </span>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">SOQL Queries (Max: 100)</span>
                  <span className="font-mono font-bold text-emerald-700">1 / 100 (1%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[1%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">SOQL Rows (Max: 50,000)</span>
                  <span className="font-mono font-bold text-emerald-700">200 / 50,000 (0.4%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[1%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">DML Statements (Max: 150)</span>
                  <span className="font-mono font-bold text-emerald-700">2 / 150 (1.3%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[2%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">CPU Execution Time (Max: 10,000ms)</span>
                  <span className="font-mono font-bold text-emerald-700">14ms / 10,000ms</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[1%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Heap Size (Max: 6,000,000 B)</span>
                  <span className="font-mono font-bold text-emerald-700">84 KB / 6.0 MB</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[2%]"></div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                ✓ <strong>Zero SOQL In Loops</strong> verified via Static Code Analysis (Apex PMD).
              </div>
            </div>
          )}
        </div>

        {/* Center/Right: Full IDE Code Display (9 Cols) */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="bg-[#0b132b] rounded-lg text-white font-mono shadow-md flex flex-col border border-slate-800 overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#032d60]/50 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-mono text-slate-200 font-semibold">{activeSnippet.filename}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-mono text-[11px]">{activeSnippet.language}</span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedCode ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Path Sub-strip */}
            <div className="px-4 py-1.5 bg-[#051838] border-b border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>{activeSnippet.path}</span>
              <span className="text-emerald-400">Lines: {activeSnippet.code.split('\n').length}</span>
            </div>

            {/* Code Body */}
            <div className="p-4 flex items-start gap-4 overflow-x-auto min-h-[380px] max-h-[480px]">
              <div className="select-none text-slate-500 text-right font-mono text-xs space-y-0.5 pt-0.5 leading-relaxed opacity-60">
                {activeSnippet.code.split('\n').map((_, idx) => (
                  <div key={idx}>{(idx + 1).toString().padStart(2, '0')}</div>
                ))}
              </div>
              <pre className="font-mono text-xs leading-relaxed text-[#a3defe] m-0 overflow-visible flex-1">
                <code>{activeSnippet.code}</code>
              </pre>
            </div>

            {/* Description Banner */}
            <div className="p-3 bg-[#032d60]/40 border-t border-slate-800 text-xs text-slate-300 font-sans flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#0176d3]">info</span>
              <span>{activeSnippet.description}</span>
            </div>
          </div>

          {/* Deployment Logs Console */}
          {deployOutput.length > 0 && (
            <div className="bg-[#0b132b] rounded-lg p-3 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">SFDX Deployment Console Log</div>
              {deployOutput.map((line, i) => (
                <div key={i} className="text-emerald-400">
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Test results quick panel */}
          {activeTestResults && (
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800">Executed Apex Test Results</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  42/42 Assertions Passed
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {activeTestResults.map((t, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center font-mono text-[11px]">
                    <span className="truncate text-slate-700">{t.name}</span>
                    <span className="text-emerald-700 font-bold ml-2">{t.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
