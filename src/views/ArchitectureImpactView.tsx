import React, { useState } from 'react';
import { PORTFOLIO_DATA, CaseStudy } from '../data/portfolioData';
import { InspectCaseStudyModal } from '../components/InspectCaseStudyModal';

interface ArchitectureImpactViewProps {
  onOpenSchedule: () => void;
}

export const ArchitectureImpactView: React.FC<ArchitectureImpactViewProps> = ({
  onOpenSchedule,
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Governor Limit interactive simulator
  const [recordCount, setRecordCount] = useState<number>(5000);
  const [patternType, setPatternType] = useState<'standard' | 'fflib'>('fflib');

  const adrs = [
    {
      id: 'ADR-001',
      title: 'Adoption of fflib Separation of Concerns (SoC) for Apex Framework',
      status: 'Accepted',
      context: 'Legacy monolithic triggers accumulated 1,800+ lines of code causing recursive execution, non-deterministic DML sequencing, and CPU timeouts in batch executions.',
      decision: 'Implement fflib_SObjectDomain, fflib_SObjectSelector, and fflib_SObjectUnitOfWork across all core financial entities.',
      consequences: 'Eliminated recursive triggers entirely; dropped unit test runtime by 78%; guaranteed 0 SOQL in loops.',
    },
    {
      id: 'ADR-002',
      title: 'BigObjects and Async SOQL Archival Strategy for 40M+ Core Banking Ledgers',
      status: 'Accepted',
      context: 'Storage limits reached 92% capacity under standard Custom Object tier; regulatory compliance required 7-year audit retention.',
      decision: 'Partition records by fiscal quarter into Salesforce BigObjects with custom composite index; execute nightly delta extract via MuleSoft.',
      consequences: 'Saved $1.8M in annual storage add-on costs; reduced standard SOQL query latency to <180ms.',
    },
    {
      id: 'ADR-003',
      title: 'CometD / EMP Connector Pub-Sub Messaging for Clinical Patient Triage',
      status: 'Accepted',
      context: 'REST polling from bedside IoT monitors generated 45,000 requests/hour, triggering 24-hour API limit exhaustion.',
      decision: 'Migrate to Platform Events with high-volume bus and headless LWC EMP Connector listener.',
      consequences: 'API call count decreased by 94%; event ingestion latency dropped from 2.4s to 95ms.',
    },
    {
      id: 'ADR-004',
      title: 'Agentforce Autonomous Action Orchestration with Einstein Trust Layer',
      status: 'Accepted',
      context: 'Customer support teams faced 12,000 monthly tier-1 inquiries with 48-hour response SLA.',
      decision: 'Deploy autonomous Agentforce agents grounded on Data Cloud unified profiles with Guardrails and Apex Invocable actions.',
      consequences: '62.4% tickets resolved autonomously without human dispatch; zero data retention guaranteed.',
    },
  ];

  // Calculated simulator values
  const estimatedSoqlStandard = Math.ceil(recordCount / 200) * 4;
  const estimatedSoqlFflib = 2; // Fixed single bulk selector
  const estimatedCpuStandard = Math.round(recordCount * 1.8);
  const estimatedCpuFflib = Math.round(recordCount * 0.12);

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-6 text-left">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Enterprise Architecture Portfolio
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Architecture &amp; Business Impact
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Proven multi-cloud architectures delivering audited ROI, governor limit headroom, and sub-second performance.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Cumulative Client Value
            </span>
            <span className="text-xl font-bold text-emerald-700 font-mono">
              $42.8M Annualized
            </span>
          </div>
          <button
            onClick={onOpenSchedule}
            className="px-3.5 py-2 bg-[#0176d3] text-white rounded text-xs font-semibold hover:bg-[#005da9] transition-colors cursor-pointer shrink-0"
          >
            Request Architecture Review
          </button>
        </div>
      </div>

      {/* Case Studies Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Enterprise Transformation Case Studies
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PORTFOLIO_DATA.caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:border-[#0176d3] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0176d3] bg-blue-50 px-2 py-0.5 rounded">
                    {cs.industry}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-mono">
                    {cs.annualRoi} ROI
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                  {cs.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium block mb-3">
                  {cs.client}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cs.highlight}
                </p>

                {/* Metrics 2x2 */}
                <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-2.5 rounded border border-slate-100">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">{m.label}</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {cs.architectureFocus}
                </span>
                <button
                  onClick={() => setSelectedCase(cs)}
                  className="px-3 py-1.5 rounded bg-[#0176d3] text-white text-xs font-semibold hover:bg-[#005da9] transition-colors cursor-pointer"
                >
                  Inspect Blueprint
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governor Limit Optimization Simulator */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0176d3]">speed</span>
              Interactive Governor Limit Efficiency Simulator
            </h3>
            <p className="text-xs text-slate-600">
              Compare standard unbulkified Salesforce logic vs Alex Rivera’s fflib selector bulkification model.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Scope Records:</span>
              <input
                type="range"
                min="200"
                max="20000"
                step="200"
                value={recordCount}
                onChange={(e) => setRecordCount(Number(e.target.value))}
                className="w-32 cursor-pointer"
              />
              <span className="font-mono font-bold text-[#0176d3]">
                {recordCount.toLocaleString()} records
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          {/* Legacy / Standard Card */}
          <div className="p-4 rounded-lg bg-red-50/50 border border-red-200 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-1">
              Standard / Legacy Monolithic Pattern
            </span>
            <h4 className="text-xs font-bold text-slate-900 mb-3">Iterative SOQL & Fragmented DML</h4>

            <div className="space-y-2.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-600">SOQL Queries Consumed:</span>
                <span className="font-bold text-red-700">
                  {estimatedSoqlStandard > 100 ? `${estimatedSoqlStandard} (LIMIT EXCEEDED!)` : `${estimatedSoqlStandard} / 100`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">CPU Execution Time:</span>
                <span className="font-bold text-red-700">
                  {estimatedCpuStandard > 10000 ? `${estimatedCpuStandard}ms (TIMEOUT!)` : `${estimatedCpuStandard}ms / 10,000ms`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Transaction Status:</span>
                <span className="font-bold text-red-700">
                  {estimatedSoqlStandard > 100 || estimatedCpuStandard > 10000 ? 'System.LimitException' : 'Degraded Performance'}
                </span>
              </div>
            </div>
          </div>

          {/* Optimized fflib Card */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Alex Rivera fflib Domain Architecture
            </span>
            <h4 className="text-xs font-bold text-slate-900 mb-3">Single-Pass Bulk Selector & UnitOfWork</h4>

            <div className="space-y-2.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-600">SOQL Queries Consumed:</span>
                <span className="font-bold text-emerald-700">
                  {estimatedSoqlFflib} / 100 (Safe 98% Headroom)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">CPU Execution Time:</span>
                <span className="font-bold text-emerald-700">
                  {estimatedCpuFflib}ms / 10,000ms (Lightning Fast)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Transaction Status:</span>
                <span className="font-bold text-emerald-700">
                  ✓ Governor Safe (Production Grade)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Decision Records (ADRs) */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Architectural Decision Records (ADRs)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adrs.map((adr) => (
            <div key={adr.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#0176d3]">{adr.id}</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {adr.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-2">{adr.title}</h4>
              <p className="text-slate-600 text-[11px] mb-2 leading-relaxed">
                <strong className="text-slate-800">Context:</strong> {adr.context}
              </p>
              <p className="text-slate-600 text-[11px] mb-2 leading-relaxed">
                <strong className="text-slate-800">Decision:</strong> {adr.decision}
              </p>
              <div className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-100 text-[11px] font-medium">
                <strong>Result:</strong> {adr.consequences}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Inspection Modal */}
      <InspectCaseStudyModal
        caseStudy={selectedCase}
        onClose={() => setSelectedCase(null)}
        onOpenSchedule={onOpenSchedule}
      />
    </div>
  );
};
