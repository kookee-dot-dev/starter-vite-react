/** A quiet placeholder while an entry loads, so the footer does not jump up and down. */
export function DetailSkeleton() {
  return <div className="site-container site-detail-skeleton" aria-busy="true" />;
}
