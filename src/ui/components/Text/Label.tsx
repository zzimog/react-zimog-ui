import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

export const Label = ({ className, ...props }: NativeProps<'label'>) => (
  <Native.label
    {...props}
    className={cn('flex items-center gap-2 text-sm font-semibold', className)}
  />
);

Label.displayName = 'Label';
