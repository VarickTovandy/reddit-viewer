'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatScore } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface VoteCounterProps {
  score: number;
  className?: string;
  vertical?: boolean;
}

type VoteState = 'upvoted' | 'downvoted' | null;

export function VoteCounter({ 
  score, 
  className,
  vertical = true 
}: VoteCounterProps) {
  const [voteState, setVoteState] = useState<VoteState>(null);
  const [localScore, setLocalScore] = useState(score);

  const handleUpvote = () => {
    if (voteState === 'upvoted') {
      setVoteState(null);
      setLocalScore(score);
    } else if (voteState === 'downvoted') {
      setVoteState('upvoted');
      setLocalScore(score + 2);
    } else {
      setVoteState('upvoted');
      setLocalScore(score + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'downvoted') {
      setVoteState(null);
      setLocalScore(score);
    } else if (voteState === 'upvoted') {
      setVoteState('downvoted');
      setLocalScore(score - 2);
    } else {
      setVoteState('downvoted');
      setLocalScore(score - 1);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleUpvote}
        className={cn(
          'h-8 w-8 hover:bg-reddit-orange/10',
          voteState === 'upvoted' && 'text-reddit-orange'
        )}
        aria-label="Upvote"
      >
        <Icon 
          icon={ArrowUp} 
          size="md"
          className={cn(
            'transition-colors',
            voteState === 'upvoted' ? 'text-reddit-orange' : 'text-muted-foreground'
          )}
        />
      </Button>

      <Text
        weight="semibold"
        size="sm"
        className={cn(
          'min-w-[2.5rem] text-center transition-colors',
          voteState === 'upvoted' && 'text-reddit-orange',
          voteState === 'downvoted' && 'text-reddit-blue'
        )}
      >
        {formatScore(localScore)}
      </Text>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDownvote}
        className={cn(
          'h-8 w-8 hover:bg-reddit-blue/10',
          voteState === 'downvoted' && 'text-reddit-blue'
        )}
        aria-label="Downvote"
      >
        <Icon 
          icon={ArrowDown} 
          size="md"
          className={cn(
            'transition-colors',
            voteState === 'downvoted' ? 'text-reddit-blue' : 'text-muted-foreground'
          )}
        />
      </Button>
    </div>
  );
}