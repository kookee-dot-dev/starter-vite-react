import { createFileRoute } from '@tanstack/react-router';
import { useChangelog } from '@kookee/react';
import { ChangelogList, ChangelogListSkeleton } from '@kookee/react/changelog';
import { renderLink } from '../../components/link';
import { LoadMore } from '../../components/load-more';
import { LoadError } from '../../components/not-found';
import { hrefs } from '../../lib/paths';
import { PageTitle } from '../../lib/project';

export const Route = createFileRoute('/changelog/')({ component: ChangelogPage });

function ChangelogPage() {
  const { data, error, isLoading, hasMore, isLoadingMore, loadMore } = useChangelog({ limit: 12 });

  return (
    <div className="site-container site-narrow">
      <PageTitle title="Changelog" />
      <h1 className="site-title">Changelog</h1>
      {error ? (
        <LoadError />
      ) : !isLoading ? (
        <>
          <ChangelogList entries={data} href={hrefs.changelogEntry} renderLink={renderLink} />
          <LoadMore hasMore={hasMore} isLoadingMore={isLoadingMore} onClick={loadMore} />
        </>
      ) : (
        <ChangelogListSkeleton />
      )}
    </div>
  );
}
