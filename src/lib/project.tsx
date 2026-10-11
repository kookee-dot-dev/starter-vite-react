import { createContext, useContext } from 'react';
import type { PublicProject } from '@kookee/sdk';

export const ProjectContext = createContext<PublicProject | null>(null);

export function useProject(): PublicProject | null {
  return useContext(ProjectContext);
}

/** `Blog · Ledgerly`. React 19 moves a `<title>` rendered anywhere into the document head. */
export function PageTitle({ title }: { title?: string }) {
  const project = useProject();
  const text = [title, project?.name].filter(Boolean).join(' · ');
  return text ? <title>{text}</title> : null;
}
