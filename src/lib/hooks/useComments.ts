import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RedditListing, RedditComment, CommentSort } from '@/types/reddit';

interface UseCommentsOptions {
  subreddit: string;
  postId: string;
  sort?: CommentSort;
  enabled?: boolean;
}

export function useComments({ 
  subreddit, 
  postId, 
  sort = 'confidence',
  enabled = true 
}: UseCommentsOptions) {
  return useQuery({
    queryKey: ['comments', subreddit, postId, sort],
    queryFn: async () => {
      const params = new URLSearchParams({
        subreddit,
        postId,
        sort,
      });

      const { data } = await axios.get<[any, RedditListing<RedditComment>]>(
        `/api/reddit/comments?${params.toString()}`
      );

      return data[1];
    },
    staleTime: 1000 * 60 * 5,
    enabled: enabled && !!subreddit && !!postId,
  });
}

export function flattenComments(listing: RedditListing<RedditComment>): RedditComment[] {
  const flattened: RedditComment[] = [];
  
  function traverse(children: RedditListing<RedditComment>['data']['children']) {
    children.forEach((child) => {
      if (child.kind === 't1') {
        flattened.push(child.data);

        if (child.data.replies && typeof child.data.replies !== 'string') {
          traverse(child.data.replies.data.children);
        }
      }
    });
  }
  
  traverse(listing.data.children);
  return flattened;
}