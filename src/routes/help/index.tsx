import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useHelpCategories } from '@kookee/react';
import { HelpCategoryGrid, HelpCategoryGridSkeleton } from '@kookee/react/help';
import { HelpSearchBox } from '@kookee/react/help/client';
import { renderLink } from '../../components/link';
import { LoadError } from '../../components/not-found';
import { API_KEY } from '../../lib/env';
import { hrefs } from '../../lib/paths';
import { PageTitle } from '../../lib/project';

export const Route = createFileRoute('/help/')({ component: HelpPage });

function HelpPage() {
  const router = useRouter();
  const { data: categories, isLoading, error } = useHelpCategories();

  return (
    <div className="site-container">
      <PageTitle title="Help center" />
      <section className="site-help-hero">
        <h1 className="site-title">How can we help?</h1>
        <HelpSearchBox
          config={API_KEY ? { apiKey: API_KEY } : null}
          href={hrefs.helpArticle}
          navigate={(href) => router.navigate({ href })}
        />
      </section>
      {error ? (
        <LoadError />
      ) : isLoading ? (
        <HelpCategoryGridSkeleton />
      ) : (
        <HelpCategoryGrid categories={categories} href={hrefs.helpCategory} renderLink={renderLink} />
      )}
    </div>
  );
}
