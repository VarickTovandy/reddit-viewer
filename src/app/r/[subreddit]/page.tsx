// app/r/[subreddit]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FeedLayout } from '@/components/templates/FeedLayout/FeedLayout';
import { PostListInfinite } from '@/components/organisms/PostList/PostListInfinite';
import { FilterBar } from '@/components/organisms/FilterBar/FilterBar';
import { SubredditSidebar } from '@/components/organisms/Sidebar/SubredditSidebar';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { useSubreddit, extractPosts } from '@/lib/hooks/useSubreddit';
import { useSubredditInfo } from '@/lib/hooks/useSubredditInfo';
import { SortOption, TimeFilter } from '@/types/reddit';

export default function SubredditPage() {
  const params = useParams();
  const subreddit = params.subreddit as string;
  
  const [sort, setSort] = useState<SortOption>('hot');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useSubreddit({
    subreddit,
    sort,
    timeFilter: sort === 'top' || sort === 'controversial' ? timeFilter : undefined,
  });

  const { data: subredditInfo, isLoading: isLoadingInfo } = useSubredditInfo({
    subreddit,
  });

  const posts = extractPosts(data);

  if (isError) {
    return (
      <FeedLayout>
        <Card padding="lg" className="text-center">
          <Text variant="destructive" size="lg">
            Error loading r/{subreddit}
          </Text>
          <Text variant="muted" size="sm" className="mt-2">
            {error instanceof Error ? error.message : 'Failed to load posts'}
          </Text>
        </Card>
      </FeedLayout>
    );
  }

  return (
    <FeedLayout
      filterBar={
        <FilterBar
          sort={sort}
          onSortChange={setSort}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          showTimeFilter={sort === 'top' || sort === 'controversial'}
        />
      }
      sidebar={<SubredditSidebar subreddit={subredditInfo} isLoading={isLoadingInfo} />}
    >
      <PostListInfinite
        posts={posts}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        emptyMessage={`No posts found in r/${subreddit}`}
      />
    </FeedLayout>
  );
}