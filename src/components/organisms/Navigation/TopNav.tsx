// components/organisms/Navigation/TopNav.tsx
'use client';

import { Link } from '@/components/atoms/Link';
import { SearchBar } from '@/components/molecules/SearchBar/SearchBar';
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Home, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TopNavProps {
  onMenuClick?: () => void;
  className?: string;
}

export function TopNav({ onMenuClick, className }: TopNavProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const cleanQuery = query.replace(/^r\//, '').trim();
      router.push(`/r/${cleanQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className={cn('sticky top-0 z-50 bg-background border-b border-border', className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden"
              >
                <Icon icon={Menu} />
              </Button>
            )}

            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Icon icon={Home} variant="primary" />
              <span className="hidden sm:inline">Reddit Viewer</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search or enter subreddit..."
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}