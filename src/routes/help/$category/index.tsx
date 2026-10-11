import { createFileRoute } from '@tanstack/react-router';
import { useHelpArticles, useHelpCategories } from '@kookee/react';
import {
  HelpArticleList,
  HelpArticleListSkeleton,
  HelpBreadcrumbs,
  HelpCategoryHeader,
  HelpCategoryNav,
} from '@kookee/react/help';
import { DetailSkeleton } from '../../../components/detail-skeleton';
import { renderLink } from '../../../components/link';
import { LoadError, NotFound } from '../../../components/not-found';
import { hrefs } from '../../../lib/paths';
import { PageTitle } from '../../../lib/project';
import { validSlug } from '../../../lib/slug';

export const Route = createFileRoute('/help/$category/')({
  // A new entry starts from its own loading state, not the previous entry's data.
  remountDeps: ({ params }) => params,
  component: HelpCategoryPage,
});

function HelpCategoryPage() {
  const slug = validSlug(Route.useParams().category);
  return slug ? <HelpCategory slug={slug} /> : <NotFound />;
}

function HelpCategory({ slug }: { slug: string }) {
  const categories = useHelpCategories();
  const articles = useHelpArticles({ category: slug, limit: 100 });
  const category = categories.data.find((item) => item.slug === slug);

  if (categories.error) return <LoadError />;
  if (categories.isLoading) return <DetailSkeleton />;
  if (!category) return <NotFound />;

  return (
    <div className="site-container site-article-layout">
      <PageTitle title={category.name} />
      <div className="site-article">
        <HelpBreadcrumbs homeHref="/help" category={category} categoryHref={hrefs.helpCategory} renderLink={renderLink} />
        <HelpCategoryHeader category={category} />
        {!articles.isLoading ? (
          <HelpArticleList articles={articles.data} href={hrefs.helpArticle} renderLink={renderLink} />
        ) : (
          <HelpArticleListSkeleton />
        )}
      </div>
      <aside className="site-aside">
        <HelpCategoryNav
          categories={categories.data}
          activeCategorySlug={category.slug}
          href={hrefs.helpCategory}
          renderLink={renderLink}
          showCounts
        />
      </aside>
    </div>
  );
}
