import { createFileRoute } from '@tanstack/react-router';
import { useChangelogEntry } from '@kookee/react';
import { ChangelogArticle } from '@kookee/react/changelog';
import { Reactions } from '@kookee/react/entry/client';
import { DetailSkeleton } from '../../components/detail-skeleton';
import { LoadError, NotFound } from '../../components/not-found';
import { API_KEY } from '../../lib/env';
import { getPath } from '../../lib/paths';
import { PageTitle } from '../../lib/project';
import { isNotFound, validSlug } from '../../lib/slug';

export const Route = createFileRoute('/changelog/$slug')({
  // A new entry starts from its own loading state, not the previous entry's data.
  remountDeps: ({ params }) => params,
  component: ChangelogEntryPage,
});

function ChangelogEntryPage() {
  const slug = validSlug(Route.useParams().slug);
  const { data: entry, error } = useChangelogEntry(slug);

  if (!slug || isNotFound(error) || (entry && !getPath(entry))) return <NotFound />;
  if (error) return <LoadError />;
  if (!entry) return <DetailSkeleton />;

  return (
    <div className="site-container site-narrow">
      <PageTitle title={entry.metaTitle || entry.title} />
      <article className="site-article">
        <ChangelogArticle entry={entry} showLink />
        <Reactions entryId={entry.id} reactions={entry.reactions} config={API_KEY ? { apiKey: API_KEY } : null} />
      </article>
    </div>
  );
}
