// components/organisms/FilterBar/FilterBar.tsx
'use client';

import { Card } from '@/components/atoms/Card';
import { SortDropdown } from '@/components/molecules/Dropdown/SortDropdown';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { SortOption, TimeFilter } from '@/types/reddit';
import { TIME_FILTERS } from '@/lib/reddit/constants';
import { cn } from '@/lib/utils';

export interface FilterBarProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  timeFilter?: TimeFilter;
  onTimeFilterChange?: (timeFilter: TimeFilter) => void;
  showTimeFilter?: boolean;
  className?: string;
}

export function FilterBar({
  sort,
  onSortChange,
  timeFilter,
  onTimeFilterChange,
  showTimeFilter = false,
  className,
}: FilterBarProps) {
  const shouldShowTimeFilter = showTimeFilter && (sort === 'top' || sort === 'controversial');

  return (
    <Card 
      padding="sm"
      className={cn('flex items-center gap-3 flex-wrap', className)}
    >
      <Text variant="muted" size="sm" weight="medium">
        Sort by:
      </Text>
      
      <SortDropdown value={sort} onChange={onSortChange} />

      {shouldShowTimeFilter && onTimeFilterChange && (
        <>
          <Text variant="muted" size="sm">
            •
          </Text>
          
          <div className="flex items-center gap-2 flex-wrap">
            {TIME_FILTERS.map((filter) => (
              <Button
                key={filter.value}
                variant={timeFilter === filter.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTimeFilterChange(filter.value as TimeFilter)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}