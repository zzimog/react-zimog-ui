import { cn, type NativeProps } from '@ui';
import { createContext } from 'react';

type SelectOptionsGroupContextValue = {
  disabled?: boolean;
};

type SelectOptionsGroupProps = NativeProps<'div'> & {
  label?: string;
  disabled?: boolean;
};

export const SelectOptionsGroupContext = createContext<
  SelectOptionsGroupContextValue | undefined
>(undefined);

export const SelectOptionsGroup = (inProps: SelectOptionsGroupProps) => {
  const { label, disabled, className, children, ...props } = inProps;

  return (
    <div
      role="group"
      data-disabled={disabled ? '' : undefined}
      className={cn('pl-2', className)}
      {...props}
    >
      {label && (
        <div
          className={cn(
            'py-2',
            'text-xs',
            'font-light',
            'text-muted-foreground',
            'dark:text-muted-background'
          )}
        >
          {label}
        </div>
      )}
      <div
        className={cn(
          'border-l',
          'pl-2',
          'border-muted-foreground/25',
          'dark:border-muted-background/25'
        )}
      >
        <SelectOptionsGroupContext value={{ disabled }}>
          {children}
        </SelectOptionsGroupContext>
      </div>
    </div>
  );
};

SelectOptionsGroup.displayName = 'SelectOptionsGroup';
