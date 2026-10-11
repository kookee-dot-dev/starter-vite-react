import { createFileRoute } from '@tanstack/react-router';
import { usePage } from '@kookee/react';
import { EntryContent } from '@kookee/react/entry';
import { DetailSkeleton } from '../components/detail-skeleton';
import { LoadError, NotFound } from '../components/not-found';
import { getPath } from '../lib/paths';
import { PageTitle } from '../lib/project';
import { isNotFound, validSlug } from '../lib/slug';

export const Route = createFileRoute('/$slug')({
  // A new entry starts from its own loading state, not the previous entry's data.
  remountDeps: ({ params }) => params,
  component: KookeePage,
});

function KookeePage() {
  const slug = validSlug(Route.useParams().slug);
  const { data: page, error } = usePage(slug);

  if (!slug || isNotFound(error) || (page && !getPath(page))) return <NotFound />;
  if (error) return <LoadError />;
  if (!page) return <DetailSkeleton />;

  return (
    <div className="site-container site-narrow">
      <PageTitle title={page.metaTitle || page.title} />
      <article className="site-article">
        <h1 className="site-title">{page.title}</h1>
        <EntryContent entry={page} className="kookee-typography" />
      </article>
    </div>
  );
}
