// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FeedLayout } from '@/components/templates/FeedLayout/FeedLayout';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Input } from '@/components/atoms/Input/Input';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { TrendingUp, Code, Globe, Newspaper, Search } from 'lucide-react';

const POPULAR_SUBREDDITS = [
  { name: 'programming', icon: Code, description: 'Computer programming' },
  { name: 'webdev', icon: Globe, description: 'Web development' },
  { name: 'technology', icon: TrendingUp, description: 'Latest tech news' },
  { name: 'worldnews', icon: Newspaper, description: 'World news' },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const cleanQuery = searchQuery.replace(/^r\//, '').trim();
      router.push(`/r/${cleanQuery}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <FeedLayout sidebar={<Sidebar />}>
      <div className="space-y-8">
        <Card padding="lg" className="text-center space-y-6">
          <div className="space-y-2">
            <Heading level="h1">Welcome to Reddit Viewer</Heading>
            <Text variant="muted" size="lg">
              Browse Reddit freely ad free
            </Text>
          </div>

          <div className="max-w-xl mx-auto flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter subreddit name (e.g., programming)"
              inputSize="lg"
            />
            <Button onClick={handleSearch} size="lg" className="gap-2">
              <Search className="w-4 h-4" />
              Go
            </Button>
          </div>

          <Text size="sm" variant="muted">
            Tip: You can type with or without r/ prefix
          </Text>
        </Card>

        <div className="space-y-4">
          <Heading level="h2">Popular Subreddits</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POPULAR_SUBREDDITS.map((subreddit) => (
              <Card
                key={subreddit.name}
                hover="lift"
                className="cursor-pointer"
                onClick={() => router.push(`/r/${subreddit.name}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon icon={subreddit.icon} variant="primary" size="lg" />
                  </div>
                  <div className="flex-1">
                    <Heading level="h4">r/{subreddit.name}</Heading>
                    <Text variant="muted" size="sm">
                      {subreddit.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </FeedLayout>
  );
}