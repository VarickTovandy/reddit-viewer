'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ChevronDown, Check } from 'lucide-react';
import { SortOption } from '@/types/reddit';
import { SORT_OPTIONS } from '@/lib/reddit/constants';
import { cn } from '@/lib/utils';

export interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
    className?: string;
}

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
    const currentLabel = SORT_OPTIONS.find((opt) => opt.value === value)?.label || 'Hot';

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="outline" className={cn('gap-2', className)}>
                    {currentLabel}
                    <Icon icon={ChevronDown} size="sm" />
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[160px] bg-popover border border-border rounded-lg p-1 shadow-lg z-50"
                    sideOffset={5}
                >
                    {SORT_OPTIONS.map((option) => (
                        <DropdownMenu.Item
                            key={option.value}
                            className={cn(
                                'flex items-center justify-between px-3 py-2 text-sm rounded cursor-pointer outline-none transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground'
                            )}
                            onSelect={() => onChange(option.value as SortOption)}
                        >
                            <span>{option.label}</span>
                            {value === option.value && (
                                <Icon icon={Check} size="sm" className="text-primary" />
                            )}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}