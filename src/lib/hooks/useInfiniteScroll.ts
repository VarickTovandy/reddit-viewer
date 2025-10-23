'use client';

import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 500,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
      }
    };
  }, [onLoadMore, hasMore, isLoading, threshold]);

  return sentinelRef;
}

export function useInfiniteScrollEvent({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 500,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < threshold) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, hasMore, isLoading, threshold]);
}