// components/organisms/CommentThread/CommentThread.tsx
'use client';

import { Comment } from './Comment';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { Spinner } from '@/components/atoms/Loading/Spinner';
import { RedditListing, RedditComment } from '@/types/reddit';
import { cn } from '@/lib/utils';

export interface CommentThreadProps {
  comments: RedditListing<RedditComment>;
  isLoading?: boolean;
  className?: string;
}

export function CommentThread({ 
  comments, 
  isLoading = false,
  className 
}: CommentThreadProps) {
  if (isLoading) {
    return (
      <Card className={cn('flex items-center justify-center p-8', className)}>
        <Spinner size="lg" />
      </Card>
    );
  }

  const topLevelComments = comments.data.children.filter(
    (child) => child.kind === 't1'
  );

  if (topLevelComments.length === 0) {
    return (
      <Card className={cn('p-8 text-center', className)}>
        <Text variant="muted">No comments yet. Be the first to comment!</Text>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {topLevelComments.map((child) => (
        <Card key={child.data.id} padding="md">
          <Comment comment={child.data} />
        </Card>
      ))}
    </div>
  );
}