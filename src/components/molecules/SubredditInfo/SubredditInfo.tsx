import { Card } from '@/components/atoms/Card';
import { Heading } from '@/components/atoms/Text/Heading';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { formatSubscribers } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface SubredditInfoProps {
  name: string;
  title?: string;
  description?: string;
  subscribers?: number;
  activeUsers?: number;
  iconUrl?: string;
  bannerUrl?: string;
  over18?: boolean;
  className?: string;
}

export function SubredditInfo({
  name,
  title,
  description,
  subscribers,
  activeUsers,
  iconUrl,
  bannerUrl,
  over18 = false,
  className,
}: SubredditInfoProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      {bannerUrl && (
        <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/10 relative">
          <img
            src={bannerUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          {iconUrl && (
            <img
              src={iconUrl}
              alt={name}
              className="w-16 h-16 rounded-full border-2 border-background"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <Heading level="h3" className="text-xl">
              r/{name}
            </Heading>
            {title && (
              <Text variant="muted" size="sm" className="line-clamp-1">
                {title}
              </Text>
            )}
          </div>
        </div>

        {description && (
          <>
            <Divider />
            <Text size="sm" className="line-clamp-3">
              {description}
            </Text>
          </>
        )}

        {(subscribers !== undefined || activeUsers !== undefined) && (
          <>
            <Divider />
            <div className="flex gap-4">
              {subscribers !== undefined && (
                <div>
                  <Text weight="semibold" className="block">
                    {formatSubscribers(subscribers)}
                  </Text>
                  <Text variant="muted" size="xs">
                    Members
                  </Text>
                </div>
              )}
              
              {activeUsers !== undefined && (
                <div>
                  <Text weight="semibold" className="block">
                    {activeUsers.toLocaleString()}
                  </Text>
                  <Text variant="muted" size="xs">
                    Online
                  </Text>
                </div>
              )}
            </div>
          </>
        )}

        {over18 && (
          <>
            <Divider />
            <Text variant="destructive" size="sm" weight="semibold">
              NSFW - 18+ Community
            </Text>
          </>
        )}
      </div>
    </Card>
  );
}