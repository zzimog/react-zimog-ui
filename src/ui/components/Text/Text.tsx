import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

export const Text = (props: NativeProps<'span'>) => <Native.span {...props} />;
Text.displayName = 'Text';

/*---------------------------------------------------------------------------*/

export const Code = ({ className, ...props }: NativeProps<'span'>) => (
  <Native.span
    {...props}
    className={cn(
      'p-[0.1rem_0.3rem]',
      'rounded-sm',
      'font-mono',
      'text-[0.8em]/none',
      'text-foreground',
      'bg-muted-contrast',
      'transition',
      className
    )}
  />
);

Code.displayName = 'Code';
Text.Code = Code;

/*---------------------------------------------------------------------------*/

export const Badge = ({ className, ...props }: NativeProps<'span'>) => (
  <Native.span
    {...props}
    className={cn(
      'inline-flex',
      'items-center',
      'px-2 py-1',
      'rounded-full',
      'bg-primary',
      'uppercase',
      'text-xs/none',
      'text-primary-contrast',
      'shrink-0',
      className
    )}
  />
);

Badge.displayName = 'Badge';
Text.Badge = Badge;
