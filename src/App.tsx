import React, { useState } from 'react';
import { SalesforceGlobalHeader } from './components/SalesforceGlobalHeader';
import { SalesforceNavBar } from './components/SalesforceNavBar';
import { SellerHomeDonutCards } from './components/SellerHomeDonutCards';
import { SellerHomeLowerRow } from './components/SellerHomeLowerRow';
import { SalesforceUtilityBar } from './components/SalesforceUtilityBar';
import { DetailModals } from './components/DetailModals';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModal, setActiveModal] = useState<
    'experience' | 'skills' | 'projects' | 'certifications' | 'contact' | 'agentforce' | null
  >(null);

  const handleOpenModal = (
    type: 'experience' | 'skills' | 'projects' | 'certifications' | 'contact'
  ) => {
    setActiveModal(type);
  };

  const handleOpenAgentforce = () => {
    setActiveModal('agentforce');
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#181818] flex flex-col font-sans antialiased selection:bg-[#00a1e0]/20 selection:text-[#0176d3]">
      {/* 1. Global Salesforce Top Header (Search, ✨ Ask, Icons, Profile) */}
      <SalesforceGlobalHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAgentforce={handleOpenAgentforce}
        onOpenModal={handleOpenModal}
      />

      {/* 2. App Navigation Bar (9-dot Waffle Launcher, Sales, Tabs with Blue Underline Indicator) */}
      <SalesforceNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenModal={handleOpenModal}
      />

      {/* 3. Main Seller Home Dashboard Canvas */}
      <main className="w-full pt-[96px] pb-14 px-3 sm:px-5 flex-1 flex flex-col max-w-[1920px] mx-auto">
        {/* Page Banner Title (Developer Portfolio Home) */}
        <div className="py-3 px-1 flex items-center justify-between">
          <div className="flex items-baseline gap-3 flex-wrap text-left">
            <h1 className="text-2xl sm:text-3xl font-light text-slate-800 tracking-tight">
              Developer Home
            </h1>
            <span className="text-xs sm:text-sm text-slate-500 font-normal">
              Harsh Sahu • Senior Success Guide | Techno-Functional Specialist @ Salesforce
            </span>
          </div>

          {/* Right Sidebar Collapse Toggle Pill */}
          <button
            onClick={() => setActiveModal('contact')}
            className="w-7 h-7 rounded-full bg-white border border-[#c9c9c9] hover:bg-slate-50 flex items-center justify-center text-[#0176d3] shadow-2xs transition-colors cursor-pointer"
            title="Expand Candidate Overview"
          >
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>
        </div>

        {/* Dashboard Cards Content */}
        <div className="space-y-4 mt-1">
          {/* Row 1: 4 Donut Metric Cards */}
          <SellerHomeDonutCards onOpenModal={handleOpenModal} />

          {/* Row 2: 4 Lower Cards (Contact Suggestions, My Goals, Today's Events, Today's Tasks) */}
          <SellerHomeLowerRow onOpenModal={handleOpenModal} />
        </div>
      </main>

      {/* 4. Fixed Bottom Salesforce Utility Bar (To Do List, Tableau Pulse, Org Status) */}
      <SalesforceUtilityBar
        onOpenAgentforce={handleOpenAgentforce}
        onOpenModal={handleOpenModal}
      />

      {/* 5. Detail Modals & Agentforce Assistant Drawer */}
      <DetailModals
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
