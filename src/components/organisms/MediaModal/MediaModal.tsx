// components/organisms/MediaModal/MediaModal.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { RedditImage } from '@/components/atoms/Image/RedditImage';
import { RedditVideo } from '@/components/atoms/Video/RedditVideo';
import { X, Download, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaUrl: string;
    mediaType: 'image' | 'video' | 'gif';
    title?: string;
    isGif?: boolean;
    videoWidth?: number;
    videoHeight?: number;
    className?: string;
}

export function MediaModal({
    isOpen,
    onClose,
    mediaUrl,
    mediaType,
    title,
    isGif = false,
    videoWidth,
    videoHeight,
    className,
}: MediaModalProps) {
    const handleDownload = () => {
        window.open(mediaUrl, '_blank');
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm" />

                <Dialog.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
                        'max-w-[95vw] max-h-[95vh] w-auto h-auto',
                        'focus:outline-none',
                        className
                    )}
                >
                    <div className="relative">
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={handleDownload}
                                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                            >
                                <Icon icon={Download} className="text-white" />
                            </Button>

                            <Dialog.Close asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                                >
                                    <Icon icon={X} className="text-white" />
                                </Button>
                            </Dialog.Close>
                        </div>

                        <div className="max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg">
                            {mediaType === 'image' && (
                                <RedditImage
                                    src={mediaUrl}
                                    alt={title || 'Media'}
                                    aspectRatio="auto"
                                    className="max-h-[90vh] w-auto"
                                />
                            )}

                            {(mediaType === 'video' || mediaType === 'gif') && (
                                <RedditVideo
                                    url={mediaUrl}
                                    isGif={isGif}
                                    width={videoWidth}
                                    height={videoHeight}
                                    className="max-h-[90vh]"
                                />
                            )}
                        </div>

                        {title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <p className="text-white text-sm line-clamp-2">{title}</p>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}