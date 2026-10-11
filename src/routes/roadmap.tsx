import { createFileRoute } from '@tanstack/react-router';
import { useFeedbackColumns, useFeedbackPosts } from '@kookee/react';
import { Roadmap, RoadmapSkeleton } from '@kookee/react/roadmap';
import { LoadError, NotFound } from '../components/not-found';
import { ROADMAP_ENABLED } from '../lib/env';
import { PageTitle, useProject } from '../lib/project';

export const Route = createFileRoute('/roadmap')({
  component: () => (ROADMAP_ENABLED ? <RoadmapPage /> : <NotFound />),
});

function RoadmapPage() {
  const project = useProject();
  const columns = useFeedbackColumns();
  const posts = useFeedbackPosts({ sort: 'top', limit: 100, columnType: 'open' });
  // Only open posts are read, so closed columns (Done, Declined) would render empty.
  const openColumns = columns.data.filter((column) => column.type === 'open');

  return (
    <div className="site-container">
      <PageTitle title="Roadmap" />
      <h1 className="site-title">Roadmap</h1>
      <p className="site-lead">
        What we are working on and what is under consideration.
        {project?.portalUrl && (
          <>
            {' '}
            Vote and share ideas on <a href={project.portalUrl}>our portal</a>.
          </>
        )}
      </p>
      {columns.error || posts.error ? (
        <LoadError />
      ) : columns.isLoading || posts.isLoading ? (
        <RoadmapSkeleton columns={openColumns} />
      ) : (
        <Roadmap columns={openColumns} posts={posts.data} />
      )}
    </div>
  );
}
