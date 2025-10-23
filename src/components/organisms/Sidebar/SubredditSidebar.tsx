// components/organisms/Sidebar/SubredditSidebar.tsx
'use client';

import { SubredditInfo } from '@/components/molecules/SubredditInfo/SubredditInfo';
import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { RedditSubreddit } from '@/types/reddit';
import { useSubredditRules } from '@/lib/hooks/useSubredditRules';
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
  const { data: rules = [], isLoading: isLoadingRules } = useSubredditRules({
    subreddit: subreddit?.display_name || '',
    enabled: !!subreddit,
  });

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

      {!isLoadingRules && rules.length > 0 && (
        <Card>
          <div className="space-y-3">
            <Heading level="h6">Rules</Heading>
            <Divider />
            <div className="space-y-2">
              {rules.map((rule, index) => (
                <details key={index} className="group">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start gap-2 p-2 rounded hover:bg-accent transition-colors">
                      <Text weight="semibold" size="sm" className="flex-1">
                        {index + 1}. {rule.short_name}
                      </Text>
                      <svg
                        className="w-4 h-4 transition-transform group-open:rotate-180 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  {rule.description && (
                    <div className="px-2 pb-2 pt-1 prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a 
                              {...props} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary underline hover:text-primary/80"
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p {...props} className="text-xs text-muted-foreground whitespace-pre-wrap break-words m-0" />
                          ),
                        }}
                      >
                        {rule.description}
                      </ReactMarkdown>
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        </Card>
      )}
    </aside>
  );
}