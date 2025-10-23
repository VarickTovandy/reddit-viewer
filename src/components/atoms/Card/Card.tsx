import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border',
        outline: 'border-border',
        elevated: 'border-border shadow-sm',
        ghost: 'border-transparent',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-md',
        highlight: 'hover:border-primary/40',
        scale: 'hover:scale-[1.02] active:scale-[0.98]',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export function Card({
  className,
  variant,
  padding,
  hover,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, hover }), className)}
      {...props}
    />
  );
}