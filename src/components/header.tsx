import { Link } from '@tanstack/react-router';
import type { AnnouncementListItem, ChangelogEntryListItem, PublicProject } from '@kookee/sdk';
import { WhatsNew } from '@kookee/react/changelog/client';
import { ROADMAP_ENABLED, STATUS_ENABLED } from '../lib/env';
import { hrefs } from '../lib/paths';
import { Announcements } from './announcements';
import { renderLink } from './link';

export function Header({
  project,
  changelog,
  announcements,
}: {
  project: PublicProject | null;
  changelog: ChangelogEntryListItem[];
  announcements: AnnouncementListItem[];
}) {
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link to="/" className="site-brand">
          {project?.name ?? ' '}
        </Link>
        <nav aria-label="Main" className="site-nav">
          <Link to="/blog">Blog</Link>
          <Link to="/changelog">Changelog</Link>
          <Link to="/help">Help</Link>
          {ROADMAP_ENABLED && <Link to="/roadmap">Roadmap</Link>}
          {STATUS_ENABLED && <Link to="/status">Status</Link>}
          {project?.portalUrl && <a href={project.portalUrl}>Portal ↗</a>}
        </nav>
        <WhatsNew entries={changelog} href={hrefs.changelogEntry} allHref="/changelog" renderLink={renderLink} />
      </div>
      <Announcements announcements={announcements} />
    </header>
  );
}
