import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      'reddit-orange': 'text-reddit-orange',
      'reddit-blue': 'text-reddit-blue',
      'reddit-gray': 'text-reddit-gray',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'span' | 'p' | 'div' | 'label';
}

export function Text({
  className,
  variant,
  size,
  weight,
  as: Component = 'span',
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, size, weight }), className)}
      {...props}
    />
  );
}