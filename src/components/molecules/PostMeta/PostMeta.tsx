'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { Link } from '@/components/atoms/Link';
import { Text } from '@/components/atoms/Text';
import { Timestamp } from '@/components/atoms/Text/Timestamp';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export interface PostMetaProps {
  subreddit: string;
  subredditPrefixed?: string;
  author: string;
  createdUtc: number;
  stickied?: boolean;
  locked?: boolean;
  nsfw?: boolean;
  spoiler?: boolean;
  flair?: string;
  flairColor?: string;
  className?: string;
}

export function PostMeta({
  subreddit,
  subredditPrefixed,
  author,
  createdUtc,
  stickied = false,
  locked = false,
  nsfw = false,
  spoiler = false,
  flair,
  flairColor,
  className,
}: PostMetaProps) {
  const subredditDisplay = subredditPrefixed || `r/${subreddit}`;

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <Avatar size="xs" fallback={subreddit.charAt(0)} />

      <div className="flex items-center gap-1.5 text-sm flex-wrap">
        <Link 
          href={`/r/${subreddit}`}
          variant="default"
          className="font-semibold hover:underline"
        >
          {subredditDisplay}
        </Link>

        <Text variant="muted" size="sm">•</Text>

        <Text variant="muted" size="sm">
          Posted by{' '}
          <span className="hover:underline cursor-pointer">
            u/{author}
          </span>
        </Text>

        <Text variant="muted" size="sm">•</Text>

        <Timestamp date={createdUtc} className="text-muted-foreground" />
      </div>

      {(nsfw || spoiler || stickied || locked || flair) && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {nsfw && <Badge variant="nsfw">NSFW</Badge>}
          {spoiler && <Badge variant="spoiler">SPOILER</Badge>}
          {stickied && <Badge variant="stickied">Pinned</Badge>}
          {locked && <Badge variant="locked">Locked</Badge>}
          {flair && (
            <Badge 
              variant="outline"
              style={flairColor ? { borderColor: flairColor, color: flairColor } : undefined}
            >
              {flair}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}