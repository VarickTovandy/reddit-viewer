// app/r/[subreddit]/[postId]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PostLayout } from '@/components/templates/PostLayout/PostLayout';
import { PostCard } from '@/components/organisms/Postcard';
import { CommentThread } from '@/components/organisms/CommentThread/CommentThread';
import { SubredditSidebar } from '@/components/organisms/Sidebar/SubredditSidebar';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { Spinner } from '@/components/atoms/Loading/Spinner';
import { usePost } from '@/lib/hooks/usePost';

export default function PostDetailPage() {
  const params = useParams();
  const subreddit = params.subreddit as string;
  const postId = params.postId as string;

  const { data, isLoading, isError, error } = usePost({
    subreddit,
    postId,
    sort: 'confidence',
  });

  if (isLoading) {
    return (
      <PostLayout
        post={
          <Card padding="lg" className="flex justify-center">
            <Spinner size="lg" />
          </Card>
        }
        comments={
          <Card padding="lg" className="flex justify-center">
            <Spinner size="lg" />
          </Card>
        }
      />
    );
  }

  if (isError || !data?.post) {
    return (
      <PostLayout
        post={
          <Card padding="lg" className="text-center">
            <Text variant="destructive" size="lg">
              Error loading post
            </Text>
            <Text variant="muted" size="sm" className="mt-2">
              {error instanceof Error ? error.message : 'Failed to load post'}
            </Text>
          </Card>
        }
        comments={<div />}
      />
    );
  }

  return (
    <PostLayout
      post={<PostCard post={data.post} showMedia={true} />}
      comments={<CommentThread comments={data.comments} />}
      sidebar={<SubredditSidebar subreddit={undefined} />}
    />
  );
}