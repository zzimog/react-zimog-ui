import type { ComponentPropsWithRef } from 'react';
import { Check } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { cn } from '@ui/utils';

const classes = [
  'flex',
  'justify-center',
  'items-center',
  'size-6',
  // input default
  'border',
  'bg-input',
  'rounded-shape',
  'transition-colors',
  'shrink-0',
  'focusable',
  'focus:border-primary',
  'focus:outline-outline',
  'hover:not-disabled:border-primary',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'read-only:cursor-default',
  'aria-checked:bg-primary',
  'aria-checked:border-primary',
  'aria-invalid:border-danger!',
  'aria-invalid:outline-danger/25',
  'dark:aria-invalid:outline-danger/50',
];

type BaseProps = ComponentPropsWithRef<typeof Checkable>;
type CheckboxProps = BaseProps;

export const Checkbox = (inProps: CheckboxProps) => {
  const { className, ...props } = inProps;

  return (
    <Checkable {...props} className={cn(classes, className)}>
      <Checkable.Indicator
        asChild
        className="text-primary-contrast data-[checked=true]:animate-in data-[checked=false]:animate-out"
      >
        <Check className="size-3" />
      </Checkable.Indicator>
    </Checkable>
  );
};
