// lib/hooks/useSubredditInfo.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditSubreddit } from '@/types/reddit';

interface UseSubredditInfoOptions {
  subreddit: string;
  enabled?: boolean;
}

export function useSubredditInfo({ subreddit, enabled = true }: UseSubredditInfoOptions) {
  return useQuery({
    queryKey: ['subreddit-info', subreddit],
    queryFn: async () => {
      const { data } = await axios.get<{ data: RedditSubreddit }>(
        `/api/reddit/subreddit/${subreddit}/about`
      );

      return data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: enabled && !!subreddit,
  });
}