// components/organisms/PostList/PostList.tsx
'use client';

import { PostCard } from '../Postcard';
import { Skeleton } from '@/components/atoms/Loading/Skeleton';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { RedditPost } from '@/types/reddit';
import { cn } from '@/lib/utils';

export interface PostListProps {
  posts: RedditPost[];
  isLoading?: boolean;
  compact?: boolean;
  showMedia?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function PostList({
  posts,
  isLoading = false,
  compact = false,
  showMedia = true,
  emptyMessage = 'No posts found',
  className,
}: PostListProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} padding="md">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-10 h-10 rounded" />
                <Skeleton className="w-10 h-6 rounded" />
                <Skeleton className="w-10 h-10 rounded" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton variant="text" className="w-32" />
                <Skeleton variant="title" className="w-full" />
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton className="w-full h-48 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className={cn('p-12 text-center', className)}>
        <Text variant="muted" size="lg">
          {emptyMessage}
        </Text>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          compact={compact}
          showMedia={showMedia}
        />
      ))}
    </div>
  );
}