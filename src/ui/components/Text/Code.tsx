import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

export const Code = ({ className, ...props }: NativeProps<'span'>) => (
  <Native.span
    {...props}
    className={cn(
      'p-[0.1rem_0.3rem]',
      'rounded-sm',
      'font-mono',
      'text-[0.8em]/none',
      'text-foreground',
      'bg-muted-background',
      'transition',
      className
    )}
  />
);

Code.displayName = 'Code';
