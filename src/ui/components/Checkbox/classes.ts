import { clsx } from '@ui/utils';

const classes = clsx({
  root: [
    'flex',
    'justify-center',
    'items-center',
    'size-6',
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
    'aria-checked:text-primary-contrast',
    'aria-checked:bg-primary',
    'aria-checked:border-primary',
    'aria-invalid:border-danger!',
    'aria-invalid:outline-danger/25',
    'dark:aria-invalid:outline-danger/50',
  ],
  indicator: [
    'size-3',
    'data-[checked=true]:animate-in',
    'data-[checked=false]:animate-out',
  ],
});

export default classes;
