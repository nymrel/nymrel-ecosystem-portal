import { ArrowUpRight } from 'lucide-react';
import { buildPaths } from '../data/build-paths';
import { ECOSYSTEM_REPOSITORIES } from '../data/ecosystem';

const BUILD_PATHS = buildPaths(ECOSYSTEM_REPOSITORIES);

export const BuildPaths = () => (
  <section id="build-on-nymrel" className="build-section" aria-labelledby="build-heading">
    <div className="nym-container">
      <p className="section-kicker">For developers</p>
      <h2 id="build-heading">Build on Nymrel</h2>
      <p className="build-intro">
        Start with one component at a boundary in your existing stack. Each has its
        own contract and setup guide; you can use it independently of the others.
      </p>
      <div className="build-grid">
        {BUILD_PATHS.map((path) => (
          <article key={path.repositoryId} className="build-card">
            <p className="build-repository">{path.repository.name}</p>
            <h3>{path.title}</h3>
            <p>{path.useWhen}</p>
            <p className="build-contract">{path.contract}</p>
            <p className="build-availability">{path.availability}</p>
            <p className="build-boundary">{path.boundary}</p>
            <div className="build-links">
              <a className="nym-btn-secondary" href={path.guideUrl}>
                Open setup guide <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> for {path.repository.name}</span>
              </a>
              <a href={path.repository.githubUrl + '/issues'}>Discuss an integration<span className="sr-only"> for {path.repository.name}</span></a>
            </div>
          </article>
        ))}
      </div>
      <p className="build-feedback">
        Trying a component? Share your runtime, exact source or artifact version,
        expected behavior and the result in that repository’s issue tracker.
        Remove credentials and private data. Reproducible integration reports help
        us improve compatibility; the portal does not measure outside adoption.
      </p>
    </div>
  </section>
);
