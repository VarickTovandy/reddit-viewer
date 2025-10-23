// components/organisms/Navigation/SubredditNav.tsx
'use client';

import { Card } from '@/components/atoms/Card';
import { Link } from '@/components/atoms/Link';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Home, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SubredditNavProps {
  currentSubreddit?: string;
  popularSubreddits?: string[];
  className?: string;
}

const DEFAULT_SUBREDDITS = [
  'programming',
  'webdev',
  'reactjs',
  'nextjs',
  'typescript',
  'technology',
  'news',
  'worldnews',
];

export function SubredditNav({
  currentSubreddit,
  popularSubreddits = DEFAULT_SUBREDDITS,
  className,
}: SubredditNavProps) {
  return (
    <Card className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <Link href="/">
          <Button
            variant={!currentSubreddit ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Icon icon={Home} size="sm" />
            <Text>Home</Text>
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 px-3">
          <Icon icon={TrendingUp} size="sm" variant="muted" />
          <Heading level="h6" variant="muted">
            Popular
          </Heading>
        </div>

        <div className="space-y-1">
          {popularSubreddits.map((subreddit) => (
            <Link key={subreddit} href={`/r/${subreddit}`}>
              <Button
                variant={currentSubreddit === subreddit ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Text size="sm">r/{subreddit}</Text>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}