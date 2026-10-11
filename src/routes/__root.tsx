import { lazy, Suspense, useEffect } from 'react';
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { useChangelog, useKookee, useKookeeQuery, usePages } from '@kookee/react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { NotFound } from '../components/not-found';
import { ProjectContext } from '../lib/project';

// The widget carries a markdown renderer and a syntax highlighter, so it loads after the page.
const ChatWidget = lazy(() => import('../components/chat-widget'));

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  const router = useRouter();
  const kookee = useKookee();
  const { data: project } = useKookeeQuery((signal) => kookee.project.get(signal), 'project');
  const { data: changelog } = useChangelog({ limit: 12 });
  const { data: pages } = usePages({ limit: 20 });

  useEffect(() => {
    // index.html ships a fixed lang; the widget's language follows <html lang>.
    if (project) document.documentElement.lang = project.defaultLocale;
  }, [project]);

  useEffect(() => {
    // Links inside entry bodies are plain anchors. Route the ones to this site through the router,
    // so following one does not reload the app and read the project, changelog and pages again.
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest('.kookee-entry-content a[href^="/"]') : null;
      if (!link || link.getAttribute('target')) return;
      event.preventDefault();
      router.navigate({ href: link.getAttribute('href')! });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);

  return (
    <ProjectContext value={project}>
      <Header project={project} changelog={changelog} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer project={project} pages={pages} />
      {project?.widgetConfigured && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </ProjectContext>
  );
}
