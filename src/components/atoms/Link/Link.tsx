import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

const linkVariants = cva('transition-colors inline-flex items-center gap-1', {
    variants: {
        variant: {
            default: 'text-foreground hover:text-primary',
            primary: 'text-primary hover:text-primary/80',
            muted: 'text-muted-foreground hover:text-foreground',
            underline: 'text-foreground hover:text-primary underline underline-offset-2',
            reddit: 'text-reddit-orange hover:text-reddit-orange/80',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
    href: string;
    external?: boolean;
    showExternalIcon?: boolean;
}

export function Link({
    href,
    external = false,
    showExternalIcon = false,
    variant,
    size,
    className,
    children,
    ...props
}: LinkProps) {
    // Auto-detect external links
    const isExternal = external || href.startsWith('http') || href.startsWith('//');

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(linkVariants({ variant, size }), className)}
                {...props}
            >
                {children}
                {showExternalIcon && (
                    <ExternalLinkIcon className="w-3 h-3 inline-block" />
                )}
            </a>
        );
    }

    return (
        <NextLink
            href={href}
            className={cn(linkVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </NextLink>
    );
}