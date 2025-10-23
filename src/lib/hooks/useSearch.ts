import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditListing, RedditPost, TimeFilter } from '@/types/reddit';

interface UseSearchOptions {
  query: string;
  subreddit?: string;
  sort?: 'relevance' | 'hot' | 'top' | 'new' | 'comments';
  timeFilter?: TimeFilter;
  enabled?: boolean;
}

export function useSearch({ 
  query,
  subreddit,
  sort = 'relevance',
  timeFilter,
  enabled = true 
}: UseSearchOptions) {
  return useInfiniteQuery({
    queryKey: ['search', query, subreddit, sort, timeFilter],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        q: query,
        sort,
        limit: '25',
      });

      if (subreddit) params.append('subreddit', subreddit);
      if (timeFilter) params.append('t', timeFilter);
      if (pageParam) params.append('after', pageParam);

      const { data } = await axios.get<RedditListing<RedditPost>>(
        `/api/reddit/search?${params.toString()}`
      );

      return data;
    },
    getNextPageParam: (lastPage) => lastPage.data.after,
    initialPageParam: undefined as string | undefined,
    staleTime: 1000 * 60 * 5,
    enabled: enabled && query.trim().length > 0,
  });
}

export function extractSearchResults(data: { pages: RedditListing<RedditPost>[] } | undefined): RedditPost[] {
  if (!data?.pages) return [];
  
  return data.pages.flatMap((page) =>
    page.data.children
      .filter((child) => child.kind === 't3')
      .map((child) => child.data)
  );
}