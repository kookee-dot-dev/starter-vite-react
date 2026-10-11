import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { KookeeProvider } from '@kookee/react';
import '@kookee/react/content.css';
import '@kookee/sdk/styles/content.css';
import './site.css';
import { Setup } from './components/setup';
import { API_KEY } from './lib/env';
import { getPath } from './lib/paths';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, scrollRestoration: true });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {API_KEY ? (
      <KookeeProvider config={{ apiKey: API_KEY, getPath }}>
        <RouterProvider router={router} />
      </KookeeProvider>
    ) : (
      <main className="site-main">
        <Setup />
      </main>
    )}
  </StrictMode>,
);
