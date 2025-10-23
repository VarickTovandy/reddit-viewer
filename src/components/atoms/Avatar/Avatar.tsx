'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full bg-surface border border-border overflow-hidden flex-shrink-0',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const iconSizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

export function Avatar({
  src,
  alt = 'User avatar',
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  if (src && !imageError) {
    return (
      <div className={cn(avatarVariants({ size }), className)} {...props}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        avatarVariants({ size }),
        'bg-primary/10 text-primary',
        className
      )}
      {...props}
    >
      {fallback ? (
        <span className="text-sm font-semibold uppercase">
          {fallback.charAt(0)}
        </span>
      ) : (
        <User size={iconSizeMap[size || 'md']} />
      )}
    </div>
  );
}