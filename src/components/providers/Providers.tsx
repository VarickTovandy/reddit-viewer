'use client';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="reddit-viewer-theme">
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}