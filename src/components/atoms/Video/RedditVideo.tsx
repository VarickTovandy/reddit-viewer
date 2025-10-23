'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, AlertCircle } from 'lucide-react';

export interface RedditVideoProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string;
    isGif?: boolean;
    thumbnail?: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
}

export function RedditVideo({
    url,
    isGif = false,
    thumbnail,
    width,
    height,
    aspectRatio,
    className,
    ...props
}: RedditVideoProps) {
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(isGif);

    const calculatedAspectRatio = aspectRatio ||
        (width && height ? `${width}/${height}` : '16/9');

    if (error) {
        return (
            <div
                className={cn(
                    'flex flex-col items-center justify-center bg-muted border border-border rounded p-8 gap-2',
                    `aspect-[${calculatedAspectRatio}]`,
                    className
                )}
                {...props}
            >
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Unable to load video</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded bg-black',
                `aspect-[${calculatedAspectRatio}]`,
                className
            )}
            {...props}
        >
            {!isPlaying && thumbnail && (
                <div className="absolute inset-0 z-10">
                    <img
                        src={thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                        aria-label="Play video"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                        </div>
                    </button>
                </div>
            )}

            <video
                src={url}
                controls={!isGif}
                autoPlay={isGif}
                loop={isGif}
                muted={isGif}
                playsInline
                preload={isGif ? 'auto' : 'metadata'}
                className="w-full h-full object-contain"
                onError={() => setError(true)}
                onPlay={() => setIsPlaying(true)}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}