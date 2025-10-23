import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold text-foreground', {
  variants: {
    level: {
      h1: 'text-4xl md:text-5xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-2xl md:text-3xl',
      h4: 'text-xl md:text-2xl',
      h5: 'text-lg md:text-xl',
      h6: 'text-base md:text-lg',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    level: 'h2',
    variant: 'default',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({
  className,
  level,
  variant,
  as,
  ...props
}: HeadingProps) {
  const Component = as || level || 'h2';

  return (
    <Component
      className={cn(headingVariants({ level: level || as, variant }), className)}
      {...props}
    />
  );
}