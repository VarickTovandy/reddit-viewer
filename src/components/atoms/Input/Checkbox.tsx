import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center gap-2">
        <div className="relative inline-flex">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded border border-border bg-background transition-colors',
              'checked:bg-primary checked:border-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
          <Check
            className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity"
            strokeWidth={3}
          />
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';