export const REDDIT_OAUTH_URL = 'https://oauth.reddit.com';
export const REDDIT_AUTH_URL = 'https://www.reddit.com/api/v1/access_token';

export const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
export const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
export const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT || 'web:reddit-viewer:v1.0.0';

export const DEFAULT_POST_LIMIT = 25;
export const DEFAULT_COMMENT_LIMIT = 200;

export const SORT_OPTIONS = [
  { value: 'hot', label: 'Hot' },
  { value: 'new', label: 'New' },
  { value: 'top', label: 'Top' },
  { value: 'rising', label: 'Rising' },
  { value: 'controversial', label: 'Controversial' },
] as const;

export const TIME_FILTERS = [
  { value: 'hour', label: 'Past Hour' },
  { value: 'day', label: 'Past 24 Hours' },
  { value: 'week', label: 'Past Week' },
  { value: 'month', label: 'Past Month' },
  { value: 'year', label: 'Past Year' },
  { value: 'all', label: 'All Time' },
] as const;

export const COMMENT_SORT_OPTIONS = [
  { value: 'confidence', label: 'Best' },
  { value: 'top', label: 'Top' },
  { value: 'new', label: 'New' },
  { value: 'controversial', label: 'Controversial' },
  { value: 'old', label: 'Old' },
  { value: 'qa', label: 'Q&A' },
] as const;

export const DEFAULT_SUBREDDITS = [
  'programming',
  'webdev',
  'reactjs',
  'typescript',
  'nextjs',
  'technology',
  'science',
  'worldnews',
] as const;