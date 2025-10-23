// lib/hooks/useSearchSubreddits.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditListing, RedditSubreddit } from '@/types/reddit';

interface UseSearchSubredditsOptions {
  query: string;
  limit?: number;
  enabled?: boolean;
}

export function useSearchSubreddits({ 
  query, 
  limit = 5,
  enabled = true 
}: UseSearchSubredditsOptions) {
  return useQuery({
    queryKey: ['search-subreddits', query, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
      });

      const { data } = await axios.get<RedditListing<RedditSubreddit>>(
        `/api/reddit/search/subreddits?${params.toString()}`
      );

      return data.data.children.map((child) => child.data);
    },
    staleTime: 1000 * 60 * 5,
    enabled: enabled && query.trim().length > 0,
  });
}