import React, { useState } from 'react';
import { PORTFOLIO_DATA, SoqlDataset } from '../data/portfolioData';

export const SoqlTerminalView: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('skills');
  const [currentQuery, setCurrentQuery] = useState(PORTFOLIO_DATA.soqlDatasets.skills.query);
  const [activeDataset, setActiveDataset] = useState<SoqlDataset>(PORTFOLIO_DATA.soqlDatasets.skills);
  const [sortColIndex, setSortColIndex] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [filterText, setFilterText] = useState<string>('');
  const [queryHistory, setQueryHistory] = useState<string[]>([
    PORTFOLIO_DATA.soqlDatasets.skills.query,
    PORTFOLIO_DATA.soqlDatasets.wins.query,
  ]);
  const [showQueryPlan, setShowQueryPlan] = useState<boolean>(false);

  const handleSelectPreset = (key: string) => {
    setSelectedKey(key);
    const ds = PORTFOLIO_DATA.soqlDatasets[key];
    if (ds) {
      setCurrentQuery(ds.query);
      setActiveDataset(ds);
      setQueryHistory((prev) => [ds.query, ...prev.filter((q) => q !== ds.query)].slice(0, 10));
    }
  };

  const handleExecute = () => {
    const q = currentQuery.toLowerCase();
    let targetKey = 'skills';
    if (q.includes('impact') || q.includes('roi') || q.includes('customer')) {
      targetKey = 'wins';
    } else if (q.includes('cert') || q.includes('architect')) {
      targetKey = 'certs';
    } else if (q.includes('pattern') || q.includes('framework')) {
      targetKey = 'architecture';
    }

    const ds = PORTFOLIO_DATA.soqlDatasets[targetKey] || PORTFOLIO_DATA.soqlDatasets.skills;
    setActiveDataset(ds);
    setQueryHistory((prev) => [currentQuery, ...prev.filter((h) => h !== currentQuery)].slice(0, 10));
  };

  const handleSort = (colIndex: number) => {
    if (sortColIndex === colIndex) {
      setSortAsc(!sortAsc);
    } else {
      setSortColIndex(colIndex);
      setSortAsc(true);
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        activeDataset.headers.join(','),
        ...activeDataset.rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soql_export_${selectedKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered rows
  let displayedRows = activeDataset.rows.filter((r) =>
    r.some((val) => val.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (sortColIndex !== null) {
    displayedRows = [...displayedRows].sort((a, b) => {
      const valA = a[sortColIndex] || '';
      const valB = b[sortColIndex] || '';
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  return (
    <div className="w-full px-3 sm:px-6 max-w-[1720px] mx-auto py-4 flex flex-col gap-4 text-left">
      {/* Title bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#005da9] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[24px]">terminal</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">Interactive SOQL Query Terminal</h1>
              <span className="bg-blue-100 text-[#005da9] text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                API v61.0 Query Engine
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Execute live SOQL queries against candidate skills, enterprise architectures, certifications, and audited customer impact.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQueryPlan(!showQueryPlan)}
            className="h-8 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#0176d3]">analytics</span>
            <span>Query Plan Explain</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="h-8 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: SObject Schema Explorer & Query Presets (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Preset Queries */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Standard SObject Query Presets
            </span>
            <div className="space-y-1.5">
              {Object.entries(PORTFOLIO_DATA.soqlDatasets).map(([key, ds]) => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`w-full p-2.5 rounded-lg text-left transition-all text-xs cursor-pointer ${
                    selectedKey === key
                      ? 'bg-blue-50 text-[#0176d3] font-semibold border border-blue-200'
                      : 'hover:bg-slate-50 text-slate-700 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{ds.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {ds.totalRecords} records
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 block truncate mt-0.5">
                    {ds.query}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SObject Schema Explorer */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <span className="text-xs font-bold text-slate-800">SObject Schema Explorer</span>
              <span className="text-[10px] text-slate-400 font-mono">Custom Objects</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <span className="font-mono text-[#0176d3] font-bold block">Developer_Skill__c</span>
                <span className="text-[11px] text-slate-500">
                  Fields: Skill_Name__c, Proficiency_Level__c, Years_Exp__c, Production_Ready__c
                </span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <span className="font-mono text-[#0176d3] font-bold block">Customer_Impact__c</span>
                <span className="text-[11px] text-slate-500">
                  Fields: Client_Industry__c, Architecture_Focus__c, Governor_Limit_Gain__c, Annual_ROI__c
                </span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <span className="font-mono text-[#0176d3] font-bold block">Certification__c</span>
                <span className="text-[11px] text-slate-500">
                  Fields: Cert_Name__c, Domain_Pillar__c, Status__c, Verification_Code__c
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: SOQL Editor & Results Table (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Query Editor Box */}
          <div className="bg-[#0b132b] rounded-lg border border-slate-800 p-4 flex flex-col gap-3 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">code</span>
                SOQL Terminal (Tooling API)
              </span>
              <span className="text-[11px] font-mono text-slate-400">SELECT • FROM • WHERE • ORDER BY</span>
            </div>

            <textarea
              rows={3}
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              className="w-full bg-[#032d60]/30 p-2.5 rounded text-[#a3defe] font-mono text-xs outline-none border border-slate-700/60 leading-relaxed resize-none focus:border-[#0176d3]"
            />

            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">
                Status: <strong className="text-emerald-400">200 OK</strong> • Latency: <span className="text-white">{activeDataset.time}</span> • Heap: <span className="text-white">{activeDataset.heap}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentQuery("SELECT Id, Name FROM Candidate__c LIMIT 10")}
                  className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={handleExecute}
                  className="px-4 py-1.5 rounded bg-[#0176d3] hover:bg-[#005da9] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Execute Query</span>
                </button>
              </div>
            </div>
          </div>

          {/* Query Plan Diagnostics (if open) */}
          {showQueryPlan && (
            <div className="bg-slate-900 text-white p-3.5 rounded-lg text-xs font-mono border border-slate-700 space-y-1.5 animate-in fade-in">
              <div className="text-amber-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schema</span>
                Salesforce Query Plan Optimizer
              </div>
              <div className="text-slate-300 text-[11px]">
                Cardinality: {activeDataset.totalRecords} records • Leading Cost: 0.08 (Selective Index Found)
              </div>
              <div className="text-emerald-400 text-[11px]">
                Optimization: Table scan avoided. Custom Standard Index used on Primary ID Key.
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            {/* Table Header Filter Bar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <span className="material-symbols-outlined text-[16px] text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Filter query results..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs outline-none"
                />
              </div>

              <span className="text-slate-500 font-mono text-[11px]">
                Displaying {displayedRows.length} of {activeDataset.totalRecords} records
              </span>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    {activeDataset.headers.map((head, idx) => (
                      <th
                        key={idx}
                        onClick={() => handleSort(idx)}
                        className="py-2.5 px-3 cursor-pointer hover:bg-slate-200 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>{head}</span>
                          {sortColIndex === idx && (
                            <span className="material-symbols-outlined text-[12px]">
                              {sortAsc ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  {displayedRows.length > 0 ? (
                    displayedRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-2.5 px-3 text-slate-400">{row[0]}</td>
                        <td className="py-2.5 px-3 font-semibold text-[#0176d3]">{row[1]}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-medium">{row[2]}</td>
                        <td className="py-2.5 px-3 text-slate-700">{row[3]}</td>
                        {row[4] && (
                          <td className="py-2.5 px-3">
                            <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold text-[10px]">
                              {row[4]}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={activeDataset.headers.length} className="py-8 text-center text-slate-400 font-sans">
                        No rows matched filter "{filterText}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Limit: 2,000 | Offset: 0</span>
              <span className="text-emerald-700 font-semibold">SOQL Governor: 1 of 100 queries consumed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
