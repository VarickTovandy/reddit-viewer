import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dividerVariants = cva('', {
    variants: {
        orientation: {
            horizontal: 'w-full h-px',
            vertical: 'h-full w-px',
        },
        variant: {
            default: 'bg-border',
            muted: 'bg-muted',
            primary: 'bg-primary',
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
        variant: 'default',
    },
});

export interface DividerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
    label?: string;
}

export function Divider({
    className,
    orientation = 'horizontal',
    variant,
    label,
    ...props
}: DividerProps) {
    if (label && orientation === 'horizontal') {
        return (
            <div className={cn('flex items-center gap-4', className)} {...props}>
                <div className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
                <span className="text-sm text-muted-foreground">{label}</span>
                <div className={cn(dividerVariants({ orientation, variant }), 'flex-1')} />
            </div>
        );
    }

    return (
        <div
            className={cn(dividerVariants({ orientation, variant }), className)}
            role="separator"
            aria-orientation={orientation || 'horizontal'}
            {...props}
        />
    );
}