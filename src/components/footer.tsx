import { Link } from '@tanstack/react-router';
import type { PageEntryListItem, PublicProject } from '@kookee/sdk';
import { getPath } from '../lib/paths';

export function Footer({ project, pages }: { project: PublicProject | null; pages: PageEntryListItem[] }) {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <nav aria-label="Pages" className="site-footer-links">
          {pages.map((page) => {
            const path = getPath(page);
            return path ? (
              <Link key={page.id} to={path}>
                {page.title}
              </Link>
            ) : null;
          })}
        </nav>
        {project && (
          <p>
            © {project.name}. Content from <a href="https://kookee.dev">Kookee</a>.
          </p>
        )}
      </div>
    </footer>
  );
}
