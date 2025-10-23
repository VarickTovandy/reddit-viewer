import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export function Spinner({
  variant,
  size,
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      <Loader2 className={cn(spinnerVariants({ variant, size }))} />
      <span className="sr-only">{label}</span>
    </div>
  );
}