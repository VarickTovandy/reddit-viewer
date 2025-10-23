'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Good defaults for Reddit viewer
            staleTime: 60 * 1000, // Consider data stale after 1 minute
            gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (formerly cacheTime)
            retry: 1, // Only retry once on failure
            refetchOnWindowFocus: false, // Don't refetch on window focus
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}