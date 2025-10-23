import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const iconVariants = cva('inline-flex items-center justify-center', {
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
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface IconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  label?: string;
}

export function Icon({
  icon: IconComponent,
  variant,
  size,
  label,
  className,
  ...props
}: IconProps) {
  return (
    <div
      className={cn(iconVariants({ variant, size }), className)}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    >
      <IconComponent className="w-full h-full" />
    </div>
  );
}