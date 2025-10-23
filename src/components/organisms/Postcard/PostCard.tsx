'use client';

import { Card } from '@/components/atoms/Card';
import { Link } from '@/components/atoms/Link';
import { Text } from '@/components/atoms/Text';
import { Heading } from '@/components/atoms/Text/Heading';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { VoteCounter } from '@/components/molecules/VoteCounter';
import { PostMeta } from '@/components/molecules/PostMeta';
import { MediaPreview } from '@/components/molecules/MediaPreview';
import { MessageSquare, Share2, Bookmark } from 'lucide-react';
import { RedditPost } from '@/types/reddit';
import { formatCommentCount } from '@/lib/utils/formatters';
import { truncateText, cleanSelftext } from '@/lib/utils/markdown';
import { cn } from '@/lib/utils';

export interface PostCardProps {
  post: RedditPost;
  compact?: boolean;
  showMedia?: boolean;
  className?: string;
}

export function PostCard({ 
  post, 
  compact = false,
  showMedia = true,
  className 
}: PostCardProps) {
  const postUrl = `/r/${post.subreddit}/comments/${post.id}`;
  const hasText = post.selftext && post.selftext.trim().length > 0;

  return (
    <Card 
      variant="elevated" 
      hover="highlight"
      padding="none"
      className={cn('overflow-hidden', className)}
    >
      <div className="flex gap-3 p-4">
        <VoteCounter score={post.score} />

        <div className="flex-1 min-w-0 space-y-3">
          <PostMeta
            subreddit={post.subreddit}
            subredditPrefixed={post.subreddit_name_prefixed}
            author={post.author}
            createdUtc={post.created_utc}
            stickied={post.stickied}
            locked={post.locked}
            nsfw={post.over_18}
            spoiler={post.spoiler}
            flair={post.link_flair_text}
            flairColor={post.link_flair_background_color}
          />

          <Link href={postUrl}>
            <Heading
              level="h3"
              className="hover:text-primary transition-colors line-clamp-3"
            >
              {post.title}
            </Heading>
          </Link>

          {hasText && !compact && (
            <Text 
              variant="muted" 
              size="sm"
              className="line-clamp-3"
            >
              {truncateText(cleanSelftext(post.selftext || ''), 300)}
            </Text>
          )}

          {showMedia && !compact && (
            <MediaPreview post={post} />
          )}

          {showMedia && compact && (
            <MediaPreview post={post} showThumbnail />
          )}

          <div className="flex items-center gap-2">
            <Link href={postUrl}>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Icon icon={MessageSquare} size="sm" />
                <Text size="sm">{formatCommentCount(post.num_comments)}</Text>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="gap-1.5">
              <Icon icon={Share2} size="sm" />
              <Text size="sm">Share</Text>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1.5">
              <Icon icon={Bookmark} size="sm" />
              <Text size="sm">Save</Text>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}