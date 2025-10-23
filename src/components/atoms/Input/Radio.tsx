import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center gap-2">
        <div className="relative inline-flex">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-border bg-background transition-colors',
              'checked:border-primary checked:border-[5px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
        </div>
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';