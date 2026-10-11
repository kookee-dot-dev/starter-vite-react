import { createFileRoute } from '@tanstack/react-router';
import { useHelpArticle, useHelpArticles } from '@kookee/react';
import { TrackedTableOfContents } from '@kookee/react/entry/client';
import { HelpArticle, HelpArticleNav, HelpBreadcrumbs } from '@kookee/react/help';
import { HelpfulVote } from '@kookee/react/help/client';
import { DetailSkeleton } from '../../../components/detail-skeleton';
import { renderLink } from '../../../components/link';
import { LoadError, NotFound } from '../../../components/not-found';
import { API_KEY } from '../../../lib/env';
import { hrefs } from '../../../lib/paths';
import { PageTitle } from '../../../lib/project';
import { isNotFound, validSlug } from '../../../lib/slug';

export const Route = createFileRoute('/help/$category/$slug')({
  // A new entry starts from its own loading state, not the previous entry's data.
  remountDeps: ({ params }) => params,
  component: HelpArticlePage,
});

function HelpArticlePage() {
  const params = Route.useParams();
  const category = validSlug(params.category);
  const slug = validSlug(params.slug);
  return category && slug ? <HelpArticleView category={category} slug={slug} /> : <NotFound />;
}

function HelpArticleView({ category, slug }: { category: string; slug: string }) {
  const { data: article, error } = useHelpArticle(slug);
  const siblings = useHelpArticles({ category, limit: 100 });

  // An article lives under its own category only; one without a category has no page.
  if (isNotFound(error) || (article && article.category?.slug !== category)) return <NotFound />;
  if (error) return <LoadError />;
  if (!article?.category) return <DetailSkeleton />;

  return (
    <div className="site-container site-article-layout">
      <PageTitle title={article.metaTitle || article.title} />
      <article className="site-article">
        <HelpBreadcrumbs
          homeHref="/help"
          category={article.category}
          categoryHref={hrefs.helpCategory}
          article={article}
          renderLink={renderLink}
        />
        <HelpArticle article={article} />
        <HelpfulVote entryId={article.id} reactions={article.reactions} config={API_KEY ? { apiKey: API_KEY } : null} />
      </article>
      <aside className="site-aside">
        <TrackedTableOfContents html={article.contentHtml} offset={88} resetKey={article.id} />
        {!siblings.isLoading && (
          <HelpArticleNav
            articles={siblings.data}
            activeSlug={article.slug ?? undefined}
            href={hrefs.helpArticle}
            title={article.category.name}
            renderLink={renderLink}
          />
        )}
      </aside>
    </div>
  );
}
