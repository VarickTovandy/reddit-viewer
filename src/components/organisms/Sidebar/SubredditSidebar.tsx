// components/organisms/Sidebar/SubredditSidebar.tsx
'use client';

import { SubredditInfo } from '@/components/molecules/SubredditInfo/SubredditInfo';
import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { RedditSubreddit } from '@/types/reddit';
import { htmlToText } from '@/lib/utils/markdown';
import { cn } from '@/lib/utils';

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

      {subreddit.description && (
        <Card>
          <div className="space-y-3">
            <Heading level="h6">Community Description</Heading>
            <Divider />
            <Text size="sm" variant="muted" className="line-clamp-6">
              {htmlToText(subreddit.description)}
            </Text>
          </div>
        </Card>
      )}
    </aside>
  );
}