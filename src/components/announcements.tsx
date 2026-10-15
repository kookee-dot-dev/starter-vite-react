import { useRef, useState, type MouseEvent } from 'react';
import type { AnnouncementListItem } from '@kookee/sdk';
import { useAnnouncement } from '@kookee/react';
import { AnnouncementArticle, AnnouncementList, AnnouncementPill } from '@kookee/react/announcements';
import { useDismissedAnnouncements } from '@kookee/react/announcements/client';

// Closes on the backdrop, where a click lands on the dialog element itself since it has no padding of its
// own, and on a link in an announcement, which opens its page behind the dialog.
function closeOnClick(event: MouseEvent<HTMLDialogElement>) {
  const { target, currentTarget } = event;
  if (target === currentTarget || (target instanceof Element && target.closest('a[href]:not([target])'))) {
    currentTarget.close();
  }
}

/** The newest announcement as a pill under the header. It opens a dialog with the list, and each one in full. */
export function Announcements({ announcements }: { announcements: AnnouncementListItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { visible, dismiss } = useDismissedAnnouncements({ announcements });
  const [selectedId, setSelectedId] = useState<string>();
  // Keeps the previous announcement while the next one loads, so it shows only once the ids match.
  const { data: selected } = useAnnouncement(selectedId);
  const article = selected && selected.id === selectedId ? selected : null;

  return (
    <>
      <div className="site-announcement">
        <AnnouncementPill announcement={visible[0]} onOpen={() => dialog.current?.showModal()} onDismiss={dismiss} />
      </div>
      <dialog
        ref={dialog}
        className="site-dialog"
        aria-label="Announcements"
        onClose={() => setSelectedId(undefined)}
        onClick={closeOnClick}
      >
        <div className="site-dialog-header">
          {article ? (
            <button type="button" onClick={() => setSelectedId(undefined)} autoFocus>
              ← Back
            </button>
          ) : (
            <h2>Announcements</h2>
          )}
          <button
            type="button"
            className="site-dialog-close"
            aria-label="Close"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        {/* A key per view starts each one scrolled to the top. */}
        <div key={article?.id ?? 'list'} className="site-dialog-body">
          {article ? (
            <AnnouncementArticle announcement={article} />
          ) : (
            <AnnouncementList
              announcements={visible}
              onSelect={(announcement) => setSelectedId(announcement.id)}
              onDismiss={dismiss}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
