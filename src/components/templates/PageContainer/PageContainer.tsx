// components/templates/PageContainer/PageContainer.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps {
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    className?: string;
}

const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
};

export function PageContainer({
    children,
    maxWidth = 'xl',
    className
}: PageContainerProps) {
    return (
        <div className={cn('mx-auto px-4 py-6', maxWidthClasses[maxWidth], className)}>
            {children}
        </div>
    );
}