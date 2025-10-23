import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditListing, RedditPost, SortOption, TimeFilter } from '@/types/reddit';

interface UseSubredditOptions {
    subreddit: string;
    sort?: SortOption;
    timeFilter?: TimeFilter;
    enabled?: boolean;
}

export function useSubreddit({
    subreddit,
    sort = 'hot',
    timeFilter,
    enabled = true
}: UseSubredditOptions) {
    return useInfiniteQuery({
        queryKey: ['subreddit', subreddit, sort, timeFilter],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({
                sort,
                limit: '25',
            });

            if (timeFilter) params.append('t', timeFilter);
            if (pageParam) params.append('after', pageParam);

            const { data } = await axios.get<RedditListing<RedditPost>>(
                `/api/reddit/subreddit/${subreddit}?${params.toString()}`
            );

            return data;
        },
        getNextPageParam: (lastPage) => lastPage.data.after,
        initialPageParam: undefined as string | undefined,
        staleTime: 1000 * 60 * 5,
        enabled,
    });
}

export function extractPosts(data: { pages: RedditListing<RedditPost>[] } | undefined): RedditPost[] {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) =>
        page.data.children
            .filter((child) => child.kind === 't3')
            .map((child) => child.data)
    );
}