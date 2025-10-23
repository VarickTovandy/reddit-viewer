'use client';

import { RedditImage } from '@/components/atoms/Image/RedditImage';
import { RedditVideo } from '@/components/atoms/Video/RedditVideo';
import { Link } from '@/components/atoms/Link';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { ExternalLink } from 'lucide-react';
import { RedditPost } from '@/types/reddit';
import {
    getMediaType,
    getThumbnailUrl,
    getFullImageUrl,
    getGalleryImages,
    getVideoUrl,
    isGif,
    getExternalUrl
} from '@/lib/utils/media';
import { formatDomain } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface MediaPreviewProps {
    post: RedditPost;
    showThumbnail?: boolean;
    className?: string;
}

export function MediaPreview({
    post,
    showThumbnail = false,
    className
}: MediaPreviewProps) {
    const mediaType = getMediaType(post);

    if (mediaType === 'self') {
        return null;
    }

    if (showThumbnail) {
        const thumbnailUrl = getThumbnailUrl(post);
        if (!thumbnailUrl) return null;

        return (
            <RedditImage
                src={thumbnailUrl}
                alt={post.title}
                aspectRatio="16/9"
                className={cn('w-24 h-24', className)}
            />
        );
    }

    if (mediaType === 'image') {
        const imageUrl = getFullImageUrl(post);
        if (!imageUrl) return null;

        return (
            <RedditImage
                src={imageUrl}
                alt={post.title}
                aspectRatio="16/9"
                className={className}
            />
        );
    }

    if (mediaType === 'video' || mediaType === 'gif') {
        const videoUrl = getVideoUrl(post);
        if (!videoUrl) return null;

        return (
            <RedditVideo
                url={videoUrl}
                isGif={isGif(post)}
                thumbnail={getThumbnailUrl(post) || undefined}
                width={post.media?.reddit_video?.width}
                height={post.media?.reddit_video?.height}
                className={className}
            />
        );
    }

    if (mediaType === 'gallery') {
        const images = getGalleryImages(post);
        if (images.length === 0) return null;

        return (
            <div className={cn('grid grid-cols-2 gap-2', className)}>
                {images.slice(0, 4).map((image, index) => (
                    <RedditImage
                        key={index}
                        src={image.url}
                        alt={`Gallery image ${index + 1}`}
                        aspectRatio="1/1"
                        className={cn(
                            images.length === 1 && 'col-span-2',
                            images.length === 3 && index === 0 && 'col-span-2'
                        )}
                    />
                ))}
                {images.length > 4 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        +{images.length - 4} more
                    </div>
                )}
            </div>
        );
    }

    if (mediaType === 'link') {
        const externalUrl = getExternalUrl(post);
        if (!externalUrl) return null;

        const domain = formatDomain(externalUrl);
        const thumbnailUrl = getThumbnailUrl(post);

        return (
            <Link href={externalUrl} external>
                <Card
                    variant="outline"
                    hover="highlight"
                    className={cn('flex items-center gap-3 p-3', className)}
                >
                    {thumbnailUrl && (
                        <RedditImage
                            src={thumbnailUrl}
                            alt=""
                            className="w-16 h-16 flex-shrink-0"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <Text size="sm" weight="medium" className="line-clamp-1">
                            {domain}
                        </Text>
                        <Text variant="muted" size="xs" className="line-clamp-1">
                            {externalUrl}
                        </Text>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </Card>
            </Link>
        );
    }

    if (mediaType === 'embed') {
        const thumbnailUrl = getThumbnailUrl(post);
        const embedHtml = post.media?.oembed?.html;

        if (embedHtml) {
            return (
                <div
                    className={cn('relative aspect-video bg-black rounded overflow-hidden', className)}
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                />
            );
        }

        if (thumbnailUrl) {
            return (
                <RedditImage
                    src={thumbnailUrl}
                    alt={post.title}
                    aspectRatio="16/9"
                    className={className}
                />
            );
        }
    }

    return null;
}