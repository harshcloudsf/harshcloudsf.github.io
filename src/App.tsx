import React, { useState } from 'react';
import { Header } from './components/Header';
import { GlobalBanner } from './components/GlobalBanner';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { EinsteinCopilotModal } from './components/EinsteinCopilotModal';
import { AppLauncherModal } from './components/AppLauncherModal';
import { RecordSchemaModal } from './components/RecordSchemaModal';
import { OverviewView } from './views/OverviewView';
import { ApexLwcView } from './views/ApexLwcView';
import { ArchitectureImpactView } from './views/ArchitectureImpactView';
import { SoqlTerminalView } from './views/SoqlTerminalView';
import { TrailheadBadgesView } from './views/TrailheadBadgesView';
import { ScheduleCallView } from './views/ScheduleCallView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEinsteinOpen, setIsEinsteinOpen] = useState(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);

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
      <main className="w-full pt-[88px] flex-1 flex flex-col">
        {/* Top Global System Banner / Lightning Toast */}
        <GlobalBanner onOpenEinstein={() => setIsEinsteinOpen(true)} />

        {/* Dynamic Views based on Selected Navigation Tab */}
        <div className="flex-1 w-full">
          {activeTab === 'overview' && (
            <OverviewView
              onSelectTab={handleSelectTab}
              onOpenSchemaModal={() => setIsSchemaOpen(true)}
            />
          )}

          {activeTab === 'apex-and-lwc-solutions' && (
            <ApexLwcView onOpenSchedule={() => handleSelectTab('contact-and-schedule')} />
          )}

          {activeTab === 'architecture-and-impact' && (
            <ArchitectureImpactView
              onOpenSchedule={() => handleSelectTab('contact-and-schedule')}
            />
          )}

          {activeTab === 'interactive-soql-terminal' && <SoqlTerminalView />}

          {activeTab === 'trailhead-and-badges' && <TrailheadBadgesView />}

          {activeTab === 'contact-and-schedule' && <ScheduleCallView />}
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

      <RecordSchemaModal
        isOpen={isSchemaOpen}
        onClose={() => setIsSchemaOpen(false)}
      />
    </div>
  );
}
