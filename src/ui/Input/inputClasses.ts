import { cva } from 'class-variance-authority';

/**
 * @todo Refactor
 *
 */ /*

'bg-white dark:bg-gray-800',
'placeholder:text-muted-foreground',
'dark:bg-input/30',
'bg-transparent',
'shadow-xs',

'selection:bg-primary',
'selection:text-primary-foreground',

'file:text-foreground',
'file:inline-flex',
'file:h-7',
'file:border-0',
'file:bg-transparent',
'file:text-sm',
'file:font-medium',

*/

const root = [
  'h-8',
  'min-w-0',
  'px-2',
  'py-1',
  'border',
  'border-gray-500/50',
  'rounded-md',
  'text-sm',
];

export const inputGroupClasses = cva(
  [
    'group',
    'flex',
    'items-center',
    'w-full',
    'shadow-xs',
    '[&_input]:shadow-none',
    'has-disabled:opacity-50',
    'has-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      prefix: {
        true: '[&>input]:rounded-l-none',
      },
      suffix: {
        true: '[&>input]:rounded-r-none',
      },
    },
  }
);

export const addonClasses = cva(
  [
    ...root,
    'flex',
    'items-center',
    'bg-neutral-400/20',
    'dark:bg-neutral-700/20',
    'group-has-[input:read-only]:border-dashed',
  ],
  {
    variants: {
      type: {
        prefix: 'border-r-0 rounded-r-none',
        suffix: 'border-l-0 rounded-l-none',
      },
    },
  }
);

export const inputClasses = cva([
  ...root,
  'peer',
  'block',
  'w-full',
  'bg-neutral-200/20',
  'dark:bg-neutral-500/20',
  'shadow-xs',
  'outline-0',
  'outline-primary/30',
  'transition-all',
  'duration-100',
  'focus-visible:outline-4',
  'invalid:outline-red-500/30',
  'disabled:opacity-75',
  'disabled:cursor-not-allowed',
  'read-only:border-dashed',
]);
