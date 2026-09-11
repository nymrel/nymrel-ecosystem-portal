import React, { useState, useMemo } from 'react';
import { 
  Github, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Shield, 
  Cpu, 
  CreditCard, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  ECOSYSTEM_REPOSITORIES, 
  CATEGORIES, 
  Category, 
  EcosystemRepo 
} from '../data/ecosystem';
import { ToolDetailModal } from './ToolDetailModal';

interface ToolGridProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ searchQuery, onClearSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalRepo, setActiveModalRepo] = useState<EcosystemRepo | null>(null);

  // Filtered repositories based on category and search query
  const filteredRepos = useMemo(() => {
    return ECOSYSTEM_REPOSITORIES.filter(repo => {
      const matchesCategory = selectedCategory === 'All' || repo.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      return (
        repo.name.toLowerCase().includes(query) ||
        repo.packageName.toLowerCase().includes(query) ||
        repo.shortDescription.toLowerCase().includes(query) ||
        repo.fullDescription.toLowerCase().includes(query) ||
        repo.tags.some(tag => tag.toLowerCase().includes(query)) ||
        repo.badges.some(b => b.toLowerCase().includes(query)) ||
        repo.features.some(f => f.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      'All': ECOSYSTEM_REPOSITORIES.length,
      'Agents & Swarms': 0,
      'Commerce & Micropayments': 0,
      'Security & Sandboxing': 0,
      'UI & Machine Trust': 0
    };
    ECOSYSTEM_REPOSITORIES.forEach(repo => {
      counts[repo.category] = (counts[repo.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCopyInstall = (repo: EcosystemRepo, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${repo.packageName}: npm package not published; no install command is available.`);
    setCopiedId(repo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Agents & Swarms':
        return <Cpu size={14} />;
      case 'Commerce & Micropayments':
        return <CreditCard size={14} />;
      case 'Security & Sandboxing':
        return <Shield size={14} />;
      case 'UI & Machine Trust':
        return <Sparkles size={14} />;
      default:
        return <Layers size={14} />;
    }
  };

  return (
    <section id="repositories" style={{ padding: '48px 0 64px 0' }}>
      <div className="nym-container">
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="nym-badge nym-badge-cedar">Official Repositories</span>
            <span style={{ fontSize: '13px', color: 'var(--nym-text-muted)' }}>
              Showing {filteredRepos.length} of {ECOSYSTEM_REPOSITORIES.length} projects
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            color: 'var(--nym-cedar)',
            fontFamily: 'var(--nym-font-serif)',
            marginBottom: '10px'
          }}>
            Explore the Nymrel Open-Source Suite
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--nym-text-secondary)', maxWidth: '720px' }}>
            Modular, composable, zero-dependency engines crafted for autonomous agents, swarms, and human-in-the-loop web applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px'
        }}>
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--nym-radius-full)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--nym-cedar)' : '1px solid var(--nym-border-default)',
                  backgroundColor: isSelected ? 'var(--nym-cedar)' : 'var(--nym-bg-elevated)',
                  color: isSelected ? 'var(--nym-bg-base)' : 'var(--nym-text-secondary)',
                  boxShadow: isSelected ? 'var(--nym-shadow-sm)' : 'none',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
                <span style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  backgroundColor: isSelected ? 'rgba(250, 248, 242, 0.2)' : 'var(--nym-bg-surface)',
                  color: isSelected ? '#FAF8F2' : 'var(--nym-text-muted)'
                }}>
                  {categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            backgroundColor: 'var(--nym-bg-surface)',
            border: '1px solid var(--nym-border-default)',
            borderRadius: 'var(--nym-radius-md)',
            marginBottom: '24px',
            fontSize: '13px',
            color: 'var(--nym-text-secondary)'
          }}>
            <div>
              Filtering by search query: <strong style={{ color: 'var(--nym-cedar)' }}>"{searchQuery}"</strong> ({filteredRepos.length} results)
            </div>
            <button
              onClick={onClearSearch}
              className="nym-btn-ghost"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Repositories Grid */}
        {filteredRepos.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: 'var(--nym-bg-elevated)',
            borderRadius: 'var(--nym-radius-lg)',
            border: '1px dashed var(--nym-border-strong)'
          }}>
            <h3 style={{ fontSize: '18px', color: 'var(--nym-cedar)', marginBottom: '8px' }}>
              No repositories match your criteria
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--nym-text-muted)', marginBottom: '16px' }}>
              Try searching for different keywords or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                onClearSearch();
              }}
              className="nym-btn-secondary"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredRepos.map(repo => (
              <div
                key={repo.id}
                className="nym-card"
                onClick={() => setActiveModalRepo(repo)}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span className="nym-badge nym-badge-terracotta" style={{ marginBottom: '6px' }}>
                      {repo.category}
                    </span>
                    <h3 style={{
                      fontSize: '20px',
                      color: 'var(--nym-cedar)',
                      fontFamily: 'var(--nym-font-serif)',
                      lineHeight: 1.25
                    }}>
                      {repo.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'var(--nym-font-mono)',
                      color: 'var(--nym-text-muted)',
                      backgroundColor: 'var(--nym-bg-surface)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid var(--nym-border-default)'
                    }}>
                      npm {repo.release.registry === 'published' ? 'published' : 'not published'}
                    </span>
                  </div>
                </div>

                {/* Package Name */}
                <div style={{
                  fontFamily: 'var(--nym-font-mono)',
                  fontSize: '12px',
                  color: 'var(--nym-text-muted)',
                  marginBottom: '12px'
                }}>
                  {repo.packageName}
                </div>

                {/* Short Description */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.55,
                  color: 'var(--nym-text-secondary)',
                  marginBottom: '16px',
                  flexGrow: 1
                }}>
                  {repo.shortDescription}
                </p>

                {/* Badges / Chips */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexWrap: 'wrap',
                  marginBottom: '16px'
                }}>
                  {repo.badges.slice(0, 3).map((badge, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--nym-bg-surface)',
                        color: 'var(--nym-text-secondary)',
                        border: '1px solid var(--nym-border-subtle)',
                        fontWeight: 500
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                  {repo.zeroDependency && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--nym-sage)',
                      color: 'var(--nym-sage-dark)',
                      fontWeight: 600
                    }}>
                      0 Deps
                    </span>
                  )}
                </div>

                {/* Quick Copy Snippet */}
                <div
                  onClick={(e) => handleCopyInstall(repo, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--nym-bg-subtle)',
                    borderRadius: 'var(--nym-radius-sm)',
                    padding: '6px 10px',
                    border: '1px solid var(--nym-border-default)',
                    marginBottom: '16px',
                    cursor: 'copy'
                  }}
                  title="Click to copy registry status"
                >
                  <code style={{
                    fontSize: '12px',
                    fontFamily: 'var(--nym-font-mono)',
                    color: 'var(--nym-cedar)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {repo.release.registry === 'published' ? 'Published release available' : 'npm package not published'}
                  </code>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--nym-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                    aria-label="Copy registry status"
                  >
                    {copiedId === repo.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Card Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--nym-border-subtle)',
                  marginTop: 'auto'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalRepo(repo);
                    }}
                    className="nym-btn-ghost"
                    style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--nym-terracotta)' }}
                  >
                    <Info size={14} />
                    <span>View Architecture</span>
                  </button>

                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="nym-btn-ghost"
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                    <ExternalLink size={12} color="var(--nym-text-muted)" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ToolDetailModal
        repo={activeModalRepo}
        onClose={() => setActiveModalRepo(null)}
      />
    </section>
  );
};
