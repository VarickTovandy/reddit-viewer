import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditListing, RedditPost, RedditComment, CommentSort } from '@/types/reddit';

interface UsePostOptions {
  subreddit: string;
  postId: string;
  sort?: CommentSort;
  enabled?: boolean;
}

export function usePost({ 
  subreddit, 
  postId, 
  sort = 'confidence',
  enabled = true 
}: UsePostOptions) {
  return useQuery({
    queryKey: ['post', subreddit, postId, sort],
    queryFn: async () => {
      const params = new URLSearchParams({
        subreddit,
        postId,
        sort,
      });

      const { data } = await axios.get<[RedditListing<RedditPost>, RedditListing<RedditComment>]>(
        `/api/reddit/comments?${params.toString()}`
      );

      return {
        post: data[0].data.children[0]?.data,
        comments: data[1],
      };
    },
    staleTime: 1000 * 60 * 5,
    enabled: enabled && !!subreddit && !!postId,
  });
}