'use client';

import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface TimestampProps extends React.HTMLAttributes<HTMLTimeElement> {
  date: Date | number;
  format?: 'relative' | 'absolute' | 'both';
  showTooltip?: boolean;
}

export function Timestamp({
  date,
  format: formatType = 'relative',
  showTooltip = true,
  className,
  ...props
}: TimestampProps) {
  const dateObj = typeof date === 'number' ? new Date(date * 1000) : date;
  const isoString = dateObj.toISOString();
  
  const relativeTime = formatDistanceToNow(dateObj, { addSuffix: true });
  const absoluteTime = format(dateObj, 'PPpp');

  const displayText = formatType === 'relative' 
    ? relativeTime 
    : formatType === 'absolute' 
    ? absoluteTime
    : `${relativeTime} (${absoluteTime})`;

  return (
    <time
      dateTime={isoString}
      title={showTooltip ? absoluteTime : undefined}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {displayText}
    </time>
  );
}