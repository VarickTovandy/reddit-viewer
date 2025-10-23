// lib/hooks/useSubredditRules.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SubredditRule {
  kind: string;
  short_name: string;
  description: string;
  description_html: string;
  violation_reason: string;
  created_utc: number;
  priority: number;
}

interface SubredditRulesResponse {
  rules: SubredditRule[];
  site_rules: string[];
}

interface UseSubredditRulesOptions {
  subreddit: string;
  enabled?: boolean;
}

export function useSubredditRules({ subreddit, enabled = true }: UseSubredditRulesOptions) {
  return useQuery({
    queryKey: ['subreddit-rules', subreddit],
    queryFn: async () => {
      const { data } = await axios.get<SubredditRulesResponse>(
        `/api/reddit/subreddit/${subreddit}/rules`
      );

      return data.rules || [];
    },
    staleTime: 1000 * 60 * 15,
    enabled: enabled && !!subreddit,
  });
}