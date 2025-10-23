import axios, { AxiosInstance } from 'axios';
import { 
  RedditListing, 
  RedditPost, 
  RedditComment,
  RedditSubreddit,
  SortOption, 
  TimeFilter,
  CommentSort 
} from '@/types/reddit';
import { 
  REDDIT_OAUTH_URL, 
  REDDIT_AUTH_URL,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USER_AGENT,
  DEFAULT_POST_LIMIT 
} from './constants';

class RedditClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.client = axios.create({
      baseURL: REDDIT_OAUTH_URL,
      headers: {
        'User-Agent': REDDIT_USER_AGENT,
      },
    });
  }

  /**
   * Get OAuth access token
   * Caches token and refreshes when expired
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid (with 5 min buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
      throw new Error('Reddit credentials not configured in environment variables');
    }

    const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');

    try {
      const response = await axios.post(
        REDDIT_AUTH_URL,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': REDDIT_USER_AGENT,
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

      if (!this.accessToken) {
        throw new Error('No access token received from Reddit');
      }

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Reddit access token:', error);
      throw new Error('Failed to authenticate with Reddit API');
    }
  }

  /**
   * Make authenticated request to Reddit API
   */
  private async makeRequest<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const token = await this.getAccessToken();

    try {
      const response = await this.client.get<T>(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          raw_json: 1, // Prevent HTML encoding
          ...params,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Resource not found');
      }
      if (error.response?.status === 403) {
        throw new Error('Access forbidden - subreddit may be private or banned');
      }
      throw error;
    }
  }

  /**
   * Get posts from a subreddit
   */
  async getSubredditPosts(
    subreddit: string,
    sort: SortOption = 'hot',
    options?: {
      timeFilter?: TimeFilter;
      after?: string;
      limit?: number;
    }
  ): Promise<RedditListing<RedditPost>> {
    const params: Record<string, any> = {
      limit: options?.limit || DEFAULT_POST_LIMIT,
    };

    if (options?.after) params.after = options.after;
    if (options?.timeFilter && (sort === 'top' || sort === 'controversial')) {
      params.t = options.timeFilter;
    }

    return this.makeRequest<RedditListing<RedditPost>>(
      `/r/${subreddit}/${sort}`,
      params
    );
  }

  /**
   * Get a single post with comments
   */
  async getPost(
    subreddit: string,
    postId: string,
    sort: CommentSort = 'confidence'
  ): Promise<[RedditListing<RedditPost>, RedditListing<RedditComment>]> {
    const params = {
      sort,
      limit: 500, // Get more comments
    };

    return this.makeRequest<[RedditListing<RedditPost>, RedditListing<RedditComment>]>(
      `/r/${subreddit}/comments/${postId}`,
      params
    );
  }

  /**
   * Get subreddit information
   */
  async getSubredditInfo(subreddit: string): Promise<{ data: RedditSubreddit }> {
    return this.makeRequest<{ data: RedditSubreddit }>(
      `/r/${subreddit}/about`
    );
  }

  /**
   * Get subreddit rules
   */
  async getSubredditRules(subreddit: string): Promise<any> {
    return this.makeRequest<any>(
      `/r/${subreddit}/about/rules`
    );
  }

  /**
   * Search posts across Reddit or within a subreddit
   */
  async searchPosts(
    query: string,
    options?: {
      subreddit?: string;
      sort?: 'relevance' | 'hot' | 'top' | 'new' | 'comments';
      timeFilter?: TimeFilter;
      after?: string;
      limit?: number;
    }
  ): Promise<RedditListing<RedditPost>> {
    const endpoint = options?.subreddit 
      ? `/r/${options.subreddit}/search`
      : '/search';

    const params: Record<string, any> = {
      q: query,
      limit: options?.limit || DEFAULT_POST_LIMIT,
      sort: options?.sort || 'relevance',
      restrict_sr: options?.subreddit ? 'true' : 'false',
      type: 'link',
    };

    if (options?.after) params.after = options.after;
    if (options?.timeFilter) params.t = options.timeFilter;

    return this.makeRequest<RedditListing<RedditPost>>(endpoint, params);
  }

  /**
   * Search for subreddits by name
   */
  async searchSubreddits(
    query: string,
    limit: number = 10
  ): Promise<RedditListing<RedditSubreddit>> {
    const params = {
      q: query,
      limit,
      type: 'sr',
    };

    return this.makeRequest<RedditListing<RedditSubreddit>>('/subreddits/search', params);
  }
}

// Export singleton instance
export const redditClient = new RedditClient();