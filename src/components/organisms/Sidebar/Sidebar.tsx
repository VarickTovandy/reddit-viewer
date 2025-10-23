// components/organisms/Sidebar/Sidebar.tsx
'use client';

import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { Link } from '@/components/atoms/Link';
import { Icon } from '@/components/atoms/Icon';
import { Info, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('space-y-4', className)}>
      <Card>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Icon icon={Info} variant="primary" size="sm" />
            <Heading level="h6">About</Heading>
          </div>

          <Text size="sm" variant="muted">
            A modern Reddit viewer used to learn Next. 
            Browse your favorite subreddits freely with a clean, responsive interface.
          </Text>

          <Divider />

          <div className="space-y-2">
            <Link 
              href="https://github.com/VarickTovandy/reddit-viewer" 
              external
              className="flex items-center gap-2 text-sm"
            >
              <Icon icon={Github} size="sm" />
              <Text size="sm">View on GitHub</Text>
              <Icon icon={ExternalLink} size="xs" />
            </Link>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-3">
          <Heading level="h6">Features</Heading>
          
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Browse any subreddit</li>
            <li>• Dark/Light mode</li>
            <li>• Infinite scroll</li>
            <li>• View comments</li>
            <li>• Media preview</li>
            <li>• Mobile responsive</li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="space-y-2">
          <Text size="xs" variant="muted">
            This is an unofficial Reddit viewer. Not affiliated with Reddit, Inc.
          </Text>
          <Text size="xs" variant="muted">
            Built with Next.js, TanStack Query, and Tailwind CSS.
          </Text>
        </div>
      </Card>
    </aside>
  );
}