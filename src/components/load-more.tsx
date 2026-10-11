export function LoadMore({
  hasMore,
  isLoadingMore,
  onClick,
}: {
  hasMore: boolean;
  isLoadingMore: boolean;
  onClick: () => void;
}) {
  if (!hasMore) return null;
  return (
    <div className="site-load-more">
      <button type="button" onClick={onClick} disabled={isLoadingMore}>
        {isLoadingMore ? 'Loading…' : 'Load more'}
      </button>
    </div>
  );
}
