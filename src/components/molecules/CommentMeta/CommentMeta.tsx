'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/atoms/Text';
import { Timestamp } from '@/components/atoms/Text/Timestamp';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export interface CommentMetaProps {
  author: string;
  createdUtc: number;
  stickied?: boolean;
  scoreHidden?: boolean;
  flair?: string;
  flairColor?: string;
  edited?: boolean;
  className?: string;
}

export function CommentMeta({
  author,
  createdUtc,
  stickied = false,
  scoreHidden = false,
  flair,
  flairColor,
  edited = false,
  className,
}: CommentMetaProps) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <Avatar size="xs" fallback={author.charAt(0)} />

      <div className="flex items-center gap-1.5 text-sm flex-wrap">
        <Text weight="semibold" size="sm">
          u/{author}
        </Text>

        {flair && (
          <Badge 
            size="sm"
            variant="outline"
            style={flairColor ? { borderColor: flairColor, color: flairColor } : undefined}
          >
            {flair}
          </Badge>
        )}

        {stickied && <Badge size="sm" variant="stickied">Mod</Badge>}

        <Text variant="muted" size="sm">•</Text>

        <Timestamp date={createdUtc} className="text-muted-foreground" />

        {edited && (
          <>
            <Text variant="muted" size="sm">•</Text>
            <Text variant="muted" size="sm" className="italic">edited</Text>
          </>
        )}

        {scoreHidden && (
          <>
            <Text variant="muted" size="sm">•</Text>
            <Text variant="muted" size="sm">score hidden</Text>
          </>
        )}
      </div>
    </div>
  );
}