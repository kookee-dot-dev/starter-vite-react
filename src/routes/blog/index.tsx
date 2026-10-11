import { createFileRoute } from '@tanstack/react-router';
import { useBlogPosts } from '@kookee/react';
import { BlogPostList, BlogPostListSkeleton } from '@kookee/react/blog';
import { renderLink } from '../../components/link';
import { LoadMore } from '../../components/load-more';
import { LoadError } from '../../components/not-found';
import { hrefs } from '../../lib/paths';
import { PageTitle } from '../../lib/project';

export const Route = createFileRoute('/blog/')({ component: BlogPage });

function BlogPage() {
  const { data, error, isLoading, hasMore, isLoadingMore, loadMore } = useBlogPosts({ limit: 12 });

  return (
    <div className="site-container">
      <PageTitle title="Blog" />
      <h1 className="site-title">Blog</h1>
      {error ? (
        <LoadError />
      ) : !isLoading ? (
        <>
          <BlogPostList posts={data} href={hrefs.blogPost} renderLink={renderLink} />
          <LoadMore hasMore={hasMore} isLoadingMore={isLoadingMore} onClick={loadMore} />
        </>
      ) : (
        <BlogPostListSkeleton />
      )}
    </div>
  );
}
