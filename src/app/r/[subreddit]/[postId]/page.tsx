// components/organisms/Sidebar/SubredditSidebar.tsx
'use client';

import { SubredditInfo } from '@/components/molecules/SubredditInfo/SubredditInfo';
import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Divider } from '@/components/atoms/Divider';
import { RedditSubreddit } from '@/types/reddit';
import { htmlToText } from '@/lib/utils/markdown';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export interface SubredditSidebarProps {
  subreddit?: RedditSubreddit;
  isLoading?: boolean;
  className?: string;
}

export function SubredditSidebar({ 
  subreddit, 
  isLoading = false,
  className 
}: SubredditSidebarProps) {
  if (isLoading) {
    return (
      <aside className={cn('space-y-4', className)}>
        <Card padding="md">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </Card>
      </aside>
    );
  }

  if (!subreddit) {
    return null;
  }

  const cleanDescription = subreddit.description 
    ? subreddit.description.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    : '';

  return (
    <aside className={cn('space-y-4', className)}>
      <SubredditInfo
        name={subreddit.display_name}
        title={subreddit.title}
        description={htmlToText(subreddit.public_description || subreddit.description)}
        subscribers={subreddit.subscribers}
        activeUsers={subreddit.active_user_count}
        iconUrl={subreddit.community_icon || subreddit.icon_img}
        bannerUrl={subreddit.banner_img}
        over18={subreddit.over18}
      />

      {cleanDescription && (
        <Card>
          <div className="space-y-3">
            <Heading level="h6">Rules</Heading>
            <Divider />
            <div className="max-h-96 overflow-y-auto prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc list-inside space-y-1" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal list-inside space-y-1" />
                  ),
                  h1: ({ node, ...props }) => (
                    <h3 {...props} className="text-lg font-semibold mt-4 mb-2" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h4 {...props} className="text-base font-semibold mt-3 mb-2" />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-2" />
                  ),
                }}
              >
                {cleanDescription}
              </ReactMarkdown>
            </div>
          </div>
        </Card>
      )}
    </aside>
  );
}