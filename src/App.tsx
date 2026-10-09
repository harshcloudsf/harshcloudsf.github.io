import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { EinsteinCopilotModal } from './components/EinsteinCopilotModal';
import { AppLauncherModal } from './components/AppLauncherModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEinsteinOpen, setIsEinsteinOpen] = useState(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] flex flex-col font-sans antialiased">
      {/* 1. Fixed Top Lightning Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEinstein={() => setIsEinsteinOpen(true)}
        onOpenAppLauncher={() => setIsAppLauncherOpen(true)}
      />

      {/* 2. Main Content Body with fixed header offset */}
      <main className="w-full pt-[88px] flex-1 flex flex-col items-center justify-start p-4 sm:p-8">
        {/* Clean, simple container ready for user's content */}
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-xs border border-slate-200 p-8 sm:p-12 text-center my-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0176d3] to-[#005da9] flex items-center justify-center text-white mx-auto shadow-md mb-4">
            <span className="material-symbols-outlined text-[36px]">cloud</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Salesforce Lightning Console
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            Top header aur navigation bar set hai. Neeche ka area bilkul clean kar diya hai.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Active Tab: <strong className="text-[#0176d3]">{activeTab}</strong></span>
          </div>

          <p className="text-xs text-slate-400 mt-6">
            Bataiye ab iske neeche kaun kaun se specific sections ya cards add karne hain?
          </p>
        </div>
      </main>

      {/* 3. SLDS Console Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={handleSelectTab}
      />

      <EinsteinCopilotModal
        isOpen={isEinsteinOpen}
        onClose={() => setIsEinsteinOpen(false)}
        onSelectTab={handleSelectTab}
      />

      <AppLauncherModal
        isOpen={isAppLauncherOpen}
        onClose={() => setIsAppLauncherOpen(false)}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
