import type { ComponentPropsWithRef } from 'react';
import { Check, X } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { cn } from '@ui/utils';

type CheckableProps = ComponentPropsWithRef<typeof Checkable>;
interface SwitchProps extends CheckableProps {}

export const Switch = (inProps: SwitchProps) => {
  const { className, ...props } = inProps;

  return (
    <Checkable
      role="switch"
      {...props}
      className={cn(
        'inline-flex',
        'items-center',
        'w-12',
        'h-6',
        'p-0.75',
        'border',
        'bg-background',
        'rounded-full',
        'transition-colors',
        'overflow-hidden',
        'focusable',
        'focus:border-primary',
        'focus:outline-outline',
        'hover:not-disabled:border-primary',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'read-only:cursor-default',
        'aria-invalid:border-danger',
        'aria-invalid:focus:outline-danger/25',
        'aria-checked:bg-input',
        '[&_svg]:size-3',
        '[&_svg]:m-1.5',
        className
      )}
    >
      <Checkable.Indicator
        forceMount
        className={[
          'group/indicator',
          'flex',
          'items-center',
          '-ml-6',
          'font-mono',
          'text-xs/none',
          'pointer-events-none',
          'transition-[margin]',
          'data-[checked=true]:ml-0',
        ].join(' ')}
      >
        <span className="w-6">
          <Check />
        </span>
        <span
          className={[
            'size-4',
            'bg-muted',
            'rounded-full',
            'transition-colors',
            'group-data-[checked=true]/indicator:bg-primary',
          ].join(' ')}
        />
        <span className="text-muted w-6">
          <X />
        </span>
      </Checkable.Indicator>
    </Checkable>
  );
};
