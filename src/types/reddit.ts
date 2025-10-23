export interface RedditPost {
  id: string;
  name: string; 
  title: string;
  author: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  score: number;
  upvote_ratio: number;
  num_comments: number;
  created: number;
  created_utc: number;
  permalink: string;
  url: string;
  domain: string;
  selftext?: string;
  selftext_html?: string;

  thumbnail?: string;
  preview?: RedditPreview;
  post_hint?: 'image' | 'link' | 'self' | 'video' | 'rich:video';
  is_video?: boolean;
  is_self?: boolean;
  media?: RedditMedia;
  media_metadata?: Record<string, RedditMediaItem>;
  gallery_data?: RedditGallery;

  over_18: boolean;
  spoiler: boolean;
  stickied: boolean;
  locked: boolean;
  archived: boolean;

  link_flair_text?: string;
  link_flair_background_color?: string;
  link_flair_text_color?: 'dark' | 'light';
  author_flair_text?: string;
}

export interface RedditComment {
  id: string;
  name: string;
  author: string;
  body: string;
  body_html: string;
  score: number;
  created: number;
  created_utc: number;
  parent_id: string;
  depth: number;

  replies?: RedditListing<RedditComment> | '';

  stickied: boolean;
  score_hidden: boolean;
  archived: boolean;
  
  author_flair_text?: string;
}

export interface RedditListing<T = any> {
  kind: 'Listing';
  data: {
    children: Array<{
      kind: string;
      data: T;
    }>;
    after: string | null;
    before: string | null;
    dist: number;
    modhash: string;
  };
}

export interface RedditPreview {
  images: Array<{
    source: RedditImageSource;
    resolutions: RedditImageSource[];
    variants?: {
      gif?: { source: RedditImageSource; resolutions: RedditImageSource[] };
      mp4?: { source: RedditImageSource; resolutions: RedditImageSource[] };
    };
    id: string;
  }>;
  enabled: boolean;
}

export interface RedditImageSource {
  url: string;
  width: number;
  height: number;
}

export interface RedditMedia {
  reddit_video?: {
    fallback_url: string;
    height: number;
    width: number;
    duration: number;
    is_gif: boolean;
  };
  oembed?: {
    provider_name: string;
    title: string;
    thumbnail_url: string;
    html: string;
  };
}

export interface RedditMediaItem {
  status: string;
  e: 'Image' | 'AnimatedImage';
  m: string;
  p: RedditImageSource[];
  s: RedditImageSource;
  id: string;
}

export interface RedditGallery {
  items: Array<{
    media_id: string;
    id: number;
    caption?: string;
    outbound_url?: string;
  }>;
}

export interface RedditSubreddit {
  id: string;
  name: string;
  display_name: string;
  display_name_prefixed: string;
  title: string;
  public_description: string;
  description: string;
  description_html: string;
  subscribers: number;
  active_user_count: number;
  created: number;
  created_utc: number;
  icon_img?: string;
  banner_img?: string;
  header_img?: string;
  over18: boolean;
  community_icon?: string;
}

export type SortOption = 'hot' | 'new' | 'top' | 'rising' | 'controversial';
export type TimeFilter = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export type CommentSort = 'confidence' | 'top' | 'new' | 'controversial' | 'old' | 'qa';