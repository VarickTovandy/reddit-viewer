'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { VoteCounter } from '@/components/molecules/VoteCounter';
import { CommentMeta } from '@/components/molecules/CommentMeta';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { RedditComment } from '@/types/reddit';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export interface CommentProps {
  comment: RedditComment;
  depth?: number;
  className?: string;
}

export function Comment({ 
  comment, 
  depth = 0,
  className 
}: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hasReplies = comment.replies && typeof comment.replies !== 'string';

  return (
    <div 
      className={cn('flex gap-2', className)}
      style={{ marginLeft: depth > 0 ? '1rem' : '0' }}
    >
      <div className="flex flex-col items-center gap-1 pt-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 flex items-center justify-center hover:bg-accent rounded transition-colors"
          aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
        >
          {isCollapsed ? (
            <Icon icon={ChevronDown} size="xs" />
          ) : (
            <div className="w-0.5 h-full bg-border hover:bg-primary transition-colors" />
          )}
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="space-y-2">
          <CommentMeta
            author={comment.author}
            createdUtc={comment.created_utc}
            stickied={comment.stickied}
            scoreHidden={comment.score_hidden}
            flair={comment.author_flair_text}
          />

          {!isCollapsed && (
            <>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{comment.body}</ReactMarkdown>
              </div>

              <div className="flex items-center gap-2">
                <VoteCounter score={comment.score} vertical={false} />

                <Button variant="ghost" size="sm" className="gap-1">
                  <Icon icon={MessageSquare} size="sm" />
                  <Text size="sm">Reply</Text>
                </Button>
              </div>

              {hasReplies && comment.replies && typeof comment.replies === 'object' && (
                <div className="space-y-2 mt-2">
                  {comment.replies.data.children.map((reply) => {
                    if (reply.kind === 't1') {
                      return (
                        <Comment
                          key={reply.data.id}
                          comment={reply.data}
                          depth={depth + 1}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </>
          )}

          {isCollapsed && (
            <Text variant="muted" size="sm">
              [+] {comment.author} collapsed
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}