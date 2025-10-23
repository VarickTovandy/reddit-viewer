// components/templates/PostLayout/PostLayout.tsx
import { ReactNode } from 'react';
import { TopNav } from '@/components/organisms/Navigation/TopNav';
import { PageContainer } from '@/components/templates/PageContainer/PageContainer';
import { cn } from '@/lib/utils';

export interface PostLayoutProps {
  post: ReactNode;
  comments: ReactNode;
  sidebar?: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function PostLayout({
  post,
  comments,
  sidebar,
  showNav = true,
  className,
}: PostLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <TopNav />}

      <PageContainer maxWidth="2xl" className={className}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            <div>{post}</div>
            <div>{comments}</div>
          </main>

          {sidebar && (
            <aside className="lg:col-span-4">
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