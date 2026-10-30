import { createFileRoute, Link } from '@tanstack/react-router';
import { useBlogPosts, useChangelog, useFaq, useHelpCategories } from '@kookee/react';
import { BlogPostList, BlogPostListSkeleton } from '@kookee/react/blog';
import { ChangelogList, ChangelogListSkeleton } from '@kookee/react/changelog';
import { FaqList } from '@kookee/react/faq';
import { HelpCategoryGrid, HelpCategoryGridSkeleton } from '@kookee/react/help';
import { renderLink } from '../components/link';
import { LoadError } from '../components/not-found';
import { hrefs } from '../lib/paths';
import { PageTitle, useProject } from '../lib/project';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  const project = useProject();
  const posts = useBlogPosts({ limit: 3 });
  const changelog = useChangelog({ limit: 3 });
  const categories = useHelpCategories();
  const faq = useFaq({ category: 'home', limit: 50 });

  if (posts.error && changelog.error && categories.error) return <LoadError />;

  return (
    <div className="site-container site-stack">
      <PageTitle />
      <section className="site-hero">
        <h1>{project?.name ?? ' '}</h1>
        <p>News, product updates and answers, in one place.</p>
      </section>

      {(posts.isLoading || posts.data.length > 0) && (
        <section className="site-section">
          <SectionHeading title="Latest posts" to="/blog" />
          {!posts.isLoading ? (
            <BlogPostList posts={posts.data} href={hrefs.blogPost} renderLink={renderLink} />
          ) : (
            <BlogPostListSkeleton />
          )}
        </section>
      )}

      {(changelog.isLoading || changelog.data.length > 0) && (
        <section className="site-section">
          <SectionHeading title="Recent updates" to="/changelog" />
          {!changelog.isLoading ? (
            <ChangelogList entries={changelog.data} href={hrefs.changelogEntry} renderLink={renderLink} />
          ) : (
            <ChangelogListSkeleton />
          )}
        </section>
      )}

      {(categories.isLoading || categories.data.length > 0) && (
        <section className="site-section">
          <SectionHeading title="Help center" to="/help" />
          {categories.isLoading ? (
            <HelpCategoryGridSkeleton />
          ) : (
            <HelpCategoryGrid categories={categories.data} href={hrefs.helpCategory} renderLink={renderLink} />
          )}
        </section>
      )}

      {faq.data.length > 0 && (
        <section className="site-section">
          <SectionHeading title="Frequently asked questions" />
          <FaqList items={faq.data} />
        </section>
      )}
    </div>
  );
}

function SectionHeading({ title, to }: { title: string; to?: '/blog' | '/changelog' | '/help' }) {
  return (
    <div className="site-section-heading">
      <h2>{title}</h2>
      {to && <Link to={to}>View all</Link>}
    </div>
  );
}
