// components/molecules/SearchBar/SearchBar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { Search, X, TrendingUp } from 'lucide-react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useSearchSubreddits } from '@/lib/hooks/useSearchSubrredits';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  className?: string;
}

export function SearchBar({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search Reddit...',
  showSuggestions = true,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [internalValue, setInternalValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const debouncedQuery = useDebounce(value, 300);

  const { data: suggestions = [], isLoading } = useSearchSubreddits({
    query: debouncedQuery,
    enabled: showSuggestions && debouncedQuery.length > 0,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (suggestions.length > 0 && value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [suggestions, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedIndex(-1);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    const newValue = '';
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      const cleanValue = value.replace(/^r\//, '').trim();
      router.push(`/r/${cleanValue}`);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
    onSearch?.(value);
  };

  const handleSelectSubreddit = (subredditName: string) => {
    router.push(`/r/${subredditName}`);
    handleClear();
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSubreddit(suggestions[selectedIndex].display_name);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Icon
            icon={Search}
            size="sm"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10 pr-10"
            autoComplete="off"
          />

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <Icon icon={X} size="sm" />
            </Button>
          )}
        </div>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <Card 
          className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto"
          padding="sm"
        >
          <div className="space-y-1">
            {suggestions.map((subreddit, index) => (
              <button
                key={subreddit.id}
                onClick={() => handleSelectSubreddit(subreddit.display_name)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md transition-colors',
                  'hover:bg-accent',
                  selectedIndex === index && 'bg-accent'
                )}
              >
                <div className="flex items-start gap-3">
                  {subreddit.community_icon || subreddit.icon_img ? (
                    <img
                      src={subreddit.community_icon || subreddit.icon_img}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon icon={TrendingUp} size="sm" variant="primary" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <Text weight="semibold" size="sm">
                      {subreddit.display_name_prefixed}
                    </Text>
                    {subreddit.public_description && (
                      <Text variant="muted" size="xs" className="line-clamp-1">
                        {subreddit.public_description}
                      </Text>
                    )}
                    <Text variant="muted" size="xs">
                      {subreddit.subscribers?.toLocaleString()} members
                    </Text>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}