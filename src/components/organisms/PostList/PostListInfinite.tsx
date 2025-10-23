// components/organisms/PostList/PostListInfinite.tsx
'use client';

import { PostList } from './PostList';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Loading/Spinner';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { RedditPost } from '@/types/reddit';
import { cn } from '@/lib/utils';

export interface PostListInfiniteProps {
  posts: RedditPost[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore: () => void;
  compact?: boolean;
  showMedia?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function PostListInfinite({
  posts,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  onLoadMore,
  compact = false,
  showMedia = true,
  emptyMessage,
  className,
}: PostListInfiniteProps) {
  const sentinelRef = useInfiniteScroll({
    onLoadMore,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
    threshold: 500,
  });

  return (
    <div className={cn('space-y-6', className)}>
      <PostList
        posts={posts}
        isLoading={isLoading}
        compact={compact}
        showMedia={showMedia}
        emptyMessage={emptyMessage}
      />

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            variant="outline"
            size="lg"
          >
            {isFetchingNextPage ? (
              <>
                <Spinner size="sm" />
                Loading more...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />

      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            You've reached the end!
          </p>
        </div>
      )}
    </div>
  );
}