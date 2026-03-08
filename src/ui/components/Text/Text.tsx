import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

export const Text = (props: NativeProps<'span'>) => <Native.span {...props} />;
Text.displayName = 'Text';

/*---------------------------------------------------------------------------*/

export const TextCode = ({ className, ...props }: NativeProps<'span'>) => (
  <Native.span
    {...props}
    className={cn(
      'p-0.5',
      'font-mono',
      'text-[0.8em]/none',
      'text-foreground',
      'border',
      'rounded-shape',
      'bg-muted/25',
      'border-foreground/10',
      'transition-colors',
      className
    )}
  />
);

TextCode.displayName = 'TextCode';
Text.Code = TextCode;
