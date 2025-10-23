import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground border border-border',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-border text-foreground bg-background',
        nsfw: 'bg-red-500 text-white font-bold',
        spoiler: 'bg-yellow-500 text-black font-bold',
        stickied: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
        locked: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20',
        archived: 'bg-muted text-muted-foreground border border-border',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  size,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}