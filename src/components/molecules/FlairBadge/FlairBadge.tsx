import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export interface FlairBadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: 'light' | 'dark';
  type?: 'post' | 'user';
  className?: string;
}

export function FlairBadge({
  text,
  backgroundColor,
  textColor = 'dark',
  type = 'post',
  className,
}: FlairBadgeProps) {
  const customStyles = backgroundColor
    ? {
        backgroundColor,
        color: textColor === 'light' ? '#ffffff' : '#000000',
        borderColor: backgroundColor,
      }
    : undefined;

  return (
    <Badge
      variant={backgroundColor ? undefined : 'outline'}
      size="sm"
      style={customStyles}
      className={cn(
        type === 'user' && 'text-xs',
        className
      )}
    >
      {text}
    </Badge>
  );
}