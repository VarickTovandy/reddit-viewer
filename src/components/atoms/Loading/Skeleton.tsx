import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('skeleton rounded', {
  variants: {
    variant: {
      default: 'bg-muted',
      text: 'bg-muted h-4',
      title: 'bg-muted h-6',
      avatar: 'bg-muted rounded-full',
      thumbnail: 'bg-muted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({
  className,
  variant,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}