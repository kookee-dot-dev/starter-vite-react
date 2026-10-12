import { createFileRoute } from '@tanstack/react-router';
import { useStatus } from '@kookee/react';
import { StatusHeadline, StatusOverview } from '@kookee/react/status';
import { DetailSkeleton } from '../../components/detail-skeleton';
import { renderLink } from '../../components/link';
import { LoadError, NotFound } from '../../components/not-found';
import { STATUS_ENABLED } from '../../lib/env';
import { PageTitle } from '../../lib/project';

export const Route = createFileRoute('/status/')({
  component: () => (STATUS_ENABLED ? <StatusPage /> : <NotFound />),
});

// Rendered in the browser only, so times can show in the visitor's own zone.
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function StatusPage() {
  // Refreshed every minute while the tab is visible: a status page is read during an incident.
  const { data: status, error } = useStatus({ refreshSeconds: 60 });

  if (!status) return error ? <LoadError /> : <DetailSkeleton />;

  return (
    <div className="site-container site-narrow">
      <PageTitle title="Status" />
      <StatusHeadline status={status} className="site-status-headline" />
      <p className="site-lead">Incidents, maintenance and the uptime of the last 90 days.</p>
      <StatusOverview status={status} incidentHref="/status/incidents/{id}" renderLink={renderLink} timeZone={timeZone} />
    </div>
  );
}
