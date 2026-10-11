import { createFileRoute } from '@tanstack/react-router';
import { useBlogPost } from '@kookee/react';
import { BlogPost } from '@kookee/react/blog';
import { Reactions, TrackedTableOfContents } from '@kookee/react/entry/client';
import { renderLink } from '../../components/link';
import { LoadError, NotFound } from '../../components/not-found';
import { DetailSkeleton } from '../../components/detail-skeleton';
import { API_KEY } from '../../lib/env';
import { getPath } from '../../lib/paths';
import { PageTitle } from '../../lib/project';
import { isNotFound, validSlug } from '../../lib/slug';

export const Route = createFileRoute('/blog/$slug')({
  // A new entry starts from its own loading state, not the previous entry's data.
  remountDeps: ({ params }) => params,
  component: BlogPostPage,
});

function BlogPostPage() {
  const slug = validSlug(Route.useParams().slug);
  const { data: post, error } = useBlogPost(slug);

  if (!slug || isNotFound(error) || (post && !getPath(post))) return <NotFound />;
  if (error) return <LoadError />;
  if (!post) return <DetailSkeleton />;

  return (
    <div className="site-container site-article-layout">
      <PageTitle title={post.metaTitle || post.title} />
      <article className="site-article">
        <BlogPost post={post} renderLink={renderLink} />
        <Reactions entryId={post.id} reactions={post.reactions} config={API_KEY ? { apiKey: API_KEY } : null} />
      </article>
      <aside className="site-aside">
        <TrackedTableOfContents html={post.contentHtml} offset={88} resetKey={post.id} />
      </aside>
    </div>
  );
}
