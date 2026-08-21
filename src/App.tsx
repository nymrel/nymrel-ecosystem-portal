import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ToolGrid } from './components/ToolGrid';
import { InteractivePlayground } from './components/InteractivePlayground';
import { QuickstartDrawer } from './components/QuickstartDrawer';
import { DualAudienceFooter } from './components/DualAudienceFooter';
import './styles/theme.css';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuickstartOpen, setIsQuickstartOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--nym-bg-base)' }}>
      {/* Top Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenQuickstart={() => setIsQuickstartOpen(true)}
        onOpenPlayground={() => scrollToSection('playground')}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        <HeroSection
          onExploreClick={() => scrollToSection('repositories')}
          onPlaygroundClick={() => scrollToSection('playground')}
          onQuickstartClick={() => setIsQuickstartOpen(true)}
        />

        <ToolGrid
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        <InteractivePlayground />
      </main>

      {/* 1-Click Quickstart Drawer */}
      <QuickstartDrawer
        isOpen={isQuickstartOpen}
        onClose={() => setIsQuickstartOpen(false)}
      />

      {/* Dual Audience Machine Trust & Human Footer */}
      <DualAudienceFooter />
    </div>
  );
};

export default App;
