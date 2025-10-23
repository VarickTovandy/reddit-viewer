// components/templates/FeedLayout/FeedLayout.tsx
import { ReactNode } from 'react';
import { TopNav } from '@/components/organisms/Navigation/TopNav';
import { PageContainer } from '@/components/templates/PageContainer/PageContainer';
import { cn } from '@/lib/utils';

export interface FeedLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  filterBar?: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function FeedLayout({
  children,
  sidebar,
  filterBar,
  showNav = true,
  className,
}: FeedLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <TopNav />}

      <PageContainer maxWidth="2xl" className={className}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-4">
            {filterBar && <div>{filterBar}</div>}
            {children}
          </main>

          {sidebar && (
            <aside className="lg:col-span-4 space-y-4">
              <div className={cn('sticky top-20', sidebar && 'space-y-4')}>
                {sidebar}
              </div>
            </aside>
          )}
        </div>
      </PageContainer>
    </div>
  );
}