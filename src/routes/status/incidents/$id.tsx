import { createFileRoute, Link } from '@tanstack/react-router';
import { useStatusIncident } from '@kookee/react';
import { StatusIncidentArticle } from '@kookee/react/status';
import { DetailSkeleton } from '../../../components/detail-skeleton';
import { LoadError, NotFound } from '../../../components/not-found';
import { STATUS_ENABLED } from '../../../lib/env';
import { PageTitle } from '../../../lib/project';
import { isNotFound, validIncidentId } from '../../../lib/slug';

export const Route = createFileRoute('/status/incidents/$id')({
  // A new incident starts from its own loading state, not the previous incident's data.
  remountDeps: ({ params }) => params,
  component: () => (STATUS_ENABLED ? <StatusIncidentPage /> : <NotFound />),
});

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function StatusIncidentPage() {
  const id = validIncidentId(Route.useParams().id);
  const { data: incident, error } = useStatusIncident(id, { refreshSeconds: 60 });

  if (!id || isNotFound(error)) return <NotFound />;
  if (!incident) return error ? <LoadError /> : <DetailSkeleton />;

  return (
    <div className="site-container site-narrow">
      <PageTitle title={incident.title} />
      <Link to="/status" className="site-back">
        ← Status
      </Link>
      <StatusIncidentArticle incident={incident} timeZone={timeZone} />
    </div>
  );
}
