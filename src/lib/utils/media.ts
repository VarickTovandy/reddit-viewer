import { RedditPost, RedditImageSource } from '@/types/reddit';

/**
 * Media extraction utilities for Reddit posts
 */

/**
 * Get the best quality thumbnail URL from a Reddit post
 */
export function getThumbnailUrl(post: RedditPost): string | null {
  // Check if thumbnail is a valid URL
  if (post.thumbnail && post.thumbnail.startsWith('http')) {
    return post.thumbnail;
  }
  
  // Try to get from preview images (better quality)
  if (post.preview?.images?.[0]?.resolutions?.length) {
    const resolutions = post.preview.images[0].resolutions;
    // Get medium resolution (index 2-3 usually good balance)
    const mediumRes = resolutions[Math.min(2, resolutions.length - 1)];
    return mediumRes?.url.replace(/&amp;/g, '&') || null;
  }
  
  return null;
}

/**
 * Get the full size image URL from a Reddit post
 */
export function getFullImageUrl(post: RedditPost): string | null {
  if (!post.preview?.images?.[0]?.source) return null;
  
  const source = post.preview.images[0].source;
  return source.url.replace(/&amp;/g, '&');
}

/**
 * Get all images from a gallery post
 */
export function getGalleryImages(post: RedditPost): RedditImageSource[] {
  if (!post.gallery_data?.items || !post.media_metadata) {
    return [];
  }
  
  return post.gallery_data.items
    .map((item) => {
      const media = post.media_metadata?.[item.media_id];
      if (!media?.s?.url) return null;
      
      return {
        ...media.s,
        url: media.s.url.replace(/&amp;/g, '&'),
      };
    })
    .filter((img): img is RedditImageSource => img !== null);
}

/**
 * Check if post has an image
 */
export function hasImage(post: RedditPost): boolean {
  return (
    post.post_hint === 'image' ||
    (post.preview?.images?.length ?? 0) > 0
  );
}

/**
 * Check if post has a video
 */
export function hasVideo(post: RedditPost): boolean {
  return post.is_video === true && !!post.media?.reddit_video;
}

/**
 * Check if post has a gallery
 */
export function hasGallery(post: RedditPost): boolean {
  return !!post.gallery_data && !!post.media_metadata;
}

/**
 * Get video URL from post
 */
export function getVideoUrl(post: RedditPost): string | null {
  return post.media?.reddit_video?.fallback_url || null;
}

/**
 * Check if post is a GIF
 */
export function isGif(post: RedditPost): boolean {
  return post.media?.reddit_video?.is_gif === true;
}

/**
 * Get external link URL (for link posts)
 */
export function getExternalUrl(post: RedditPost): string | null {
  if (post.is_self) return null;
  if (post.post_hint === 'image' || post.post_hint === 'video') return null;
  
  return post.url;
}

/**
 * Determine the media type of a post
 */
export type MediaType = 'image' | 'video' | 'gif' | 'gallery' | 'link' | 'self' | 'embed';

export function getMediaType(post: RedditPost): MediaType {
  if (hasGallery(post)) return 'gallery';
  if (isGif(post)) return 'gif';
  if (hasVideo(post)) return 'video';
  if (hasImage(post)) return 'image';
  if (post.is_self) return 'self';
  if (post.media?.oembed) return 'embed';
  if (getExternalUrl(post)) return 'link';
  
  return 'self';
}