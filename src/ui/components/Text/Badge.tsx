import { cva, type VariantProps } from 'class-variance-authority';
import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

const classes = cva(
  [
    'inline-flex',
    'items-center',
    'p-[0.25rem_0.4rem]',
    'rounded-full',
    'text-muted',
    'text-sm/none',
    'font-semibold',
    'bg-muted-background',
    'align-text-bottom',
    'tracking-wider',
    'transition',
    '[a]:not-hover:bg-muted-background/75',
  ],
  {
    variants: {
      color: {
        primary: [
          'text-primary-contrast',
          'bg-primary',
          '[a]:not-hover:bg-primary/75',
        ],
      },
      size: {
        sm: 'text-xs/none',
        lg: 'text-base/none',
      },
    },
  }
);

type BaseProps = NativeProps<'span'>;
type BadgeProps = BaseProps & {
  color: VariantProps<typeof classes>['color'];
  size: VariantProps<typeof classes>['size'];
};

export const Badge = (inProps: BadgeProps) => {
  const { color, size, className, ...props } = inProps;

  return (
    <Native.span
      {...props}
      className={cn(
        classes({
          color,
          size,
        }),
        className
      )}
    />
  );
};

Badge.displayName = 'Badge';
