import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface RecordSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecordSchemaModal: React.FC<RecordSchemaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const fields = [
    { name: 'Id', type: 'id(18)', value: 'a0B8c00000XyZ12EAA', desc: 'System Record Identifier' },
    { name: 'Candidate_Name__c', type: 'string(80)', value: PORTFOLIO_DATA.candidate.name, desc: 'Candidate Full Name' },
    { name: 'Target_Role__c', type: 'string(120)', value: PORTFOLIO_DATA.candidate.title, desc: 'Target Engagement Role' },
    { name: 'Trailhead_Points__c', type: 'number(18,0)', value: PORTFOLIO_DATA.candidate.points.toLocaleString(), desc: 'Verified Trailhead Points' },
    { name: 'Badges_Count__c', type: 'number(6,0)', value: PORTFOLIO_DATA.candidate.badgesCount.toString(), desc: 'Completed Trailhead Badges' },
    { name: 'Certifications_Active__c', type: 'number(3,0)', value: PORTFOLIO_DATA.candidate.certCount.toString(), desc: 'Active Salesforce Certifications' },
    { name: 'Enterprise_CSAT__c', type: 'percent(5,2)', value: PORTFOLIO_DATA.candidate.csatScore, desc: 'Fortune 50 Enterprise CSAT' },
    { name: 'Annualized_Client_Value__c', type: 'currency(18,2)', value: PORTFOLIO_DATA.candidate.clientValue, desc: 'Audited Customer Financial ROI' },
    { name: 'Security_Clearance__c', type: 'picklist', value: PORTFOLIO_DATA.candidate.securityClearance, desc: 'GovCloud & FedRAMP Status' },
    { name: 'CTA_Readiness_Stage__c', type: 'picklist', value: 'Stage 4 of 5 (Active Milestone)', desc: 'Architect Pyramid Milestones' },
    { name: 'Current_Org_Connected__c', type: 'string(50)', value: PORTFOLIO_DATA.candidate.connectedOrg, desc: 'Salesforce Production Instance' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0176d3]">schema</span>
            <div>
              <h2 className="font-semibold text-sm">Salesforce SObject Schema Inspector</h2>
              <span className="text-[11px] text-slate-400 font-mono">Entity Definition: Candidate__c (API v61.0)</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Schema Meta summary */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Object Label</span>
            <span className="font-semibold text-slate-800">Candidate</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">API Name</span>
            <span className="font-mono text-slate-700">Candidate__c</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Sharing Model</span>
            <span className="text-emerald-700 font-semibold">Public Read Only</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Deployment Status</span>
            <span className="text-blue-700 font-semibold">Deployed / In Production</span>
          </div>
        </div>

        {/* Fields Table */}
        <div className="overflow-y-auto flex-1 p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="pb-2 pl-2">Field Label / API Name</th>
                <th className="pb-2">Data Type</th>
                <th className="pb-2">Current Value</th>
                <th className="pb-2 pr-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {fields.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2.5 pl-2 font-semibold text-[#0176d3]">
                    {f.name}
                  </td>
                  <td className="py-2.5 text-slate-500 font-normal">
                    {f.type}
                  </td>
                  <td className="py-2.5 font-bold text-slate-800">
                    {f.value}
                  </td>
                  <td className="py-2.5 pr-2 font-sans text-slate-600 text-[11px]">
                    {f.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Record Type: <strong className="text-slate-700">Senior_Success_Engineer_Record</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#0176d3] text-white font-medium hover:bg-[#005da9] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
