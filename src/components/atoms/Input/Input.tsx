import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full rounded-lg border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border focus-visible:border-primary',
        error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
      },
      inputSize: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-10 px-4 py-2 text-base',
        lg: 'h-11 px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';