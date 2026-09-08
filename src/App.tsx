import { useState } from 'react';
import { DualAudienceFooter } from './components/DualAudienceFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractivePlayground } from './components/InteractivePlayground';
import { QuickstartDrawer } from './components/QuickstartDrawer';
import { ToolGrid } from './components/ToolGrid';
import './styles/theme.css';

const scrollToSection = (id: string) => {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickstartOpen, setIsQuickstartOpen] = useState(false);

  return (
    <div id="top" className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to catalog
      </a>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenQuickstart={() => setIsQuickstartOpen(true)}
        onOpenEvidence={() => scrollToSection('evidence-explorer')}
      />
      <main id="main-content">
        <HeroSection
          onExploreClick={() => scrollToSection('repositories')}
          onEvidenceClick={() => scrollToSection('evidence-explorer')}
          onQuickstartClick={() => setIsQuickstartOpen(true)}
        />
        <ToolGrid
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
        <InteractivePlayground />
      </main>
      <QuickstartDrawer
        isOpen={isQuickstartOpen}
        onClose={() => setIsQuickstartOpen(false)}
      />
      <DualAudienceFooter />
    </div>
  );
};

export default App;
