'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

export interface RedditImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2' | 'auto';
    showLoading?: boolean;
}

export function RedditImage({
    src,
    alt = '',
    fallback,
    aspectRatio = 'auto',
    showLoading = true,
    className,
    onError,
    ...props
}: RedditImageProps) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setError(true);
        setLoading(false);
        onError?.(e);
    };

    const handleLoad = () => {
        setLoading(false);
    };

    const decodedSrc = typeof src === 'string' ? src.replace(/&amp;/g, '&') : src;

    if (error || !decodedSrc) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center bg-muted border border-border rounded',
                    aspectRatio !== 'auto' && `aspect-[${aspectRatio}]`,
                    className
                )}
            >
                {fallback || (
                    <ImageOff className="w-8 h-8 text-muted-foreground" />
                )}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded',
                aspectRatio !== 'auto' && `aspect-[${aspectRatio}]`
            )}
        >
            {loading && showLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted skeleton" />
            )}

            <img
                src={decodedSrc}
                alt={alt}
                className={cn(
                    'w-full h-full object-cover transition-opacity duration-300',
                    loading && 'opacity-0',
                    className
                )}
                onError={handleError}
                onLoad={handleLoad}
                loading="lazy"
                {...props}
            />
        </div>
    );
}