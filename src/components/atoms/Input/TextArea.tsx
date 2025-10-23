import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'w-full rounded-lg border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
  {
    variants: {
      variant: {
        default: 'border-border focus-visible:border-primary',
        error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant }), 'min-h-[80px] px-4 py-3', className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';