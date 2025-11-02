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

import { cva } from 'class-variance-authority';
import { cn } from '../utils';

const common = [
  'border',
  'border-border',
  'bg-foreground/5',
  'dark:bg-background/5',
];

const textboxCommon = ['h-10', 'px-2.5', 'text-sm', 'rounded-shape'];

export const textboxClasses = {
  group: {
    root: cn([
      'group',
      'flex',
      'w-full',
      '[&_input]:shadow-none',
      'has-disabled:text-gray-500',
      'has-disabled:cursor-not-allowed',
      '*:not-first:rounded-l-none',
      '*:not-last:rounded-r-none',
      '*:has-[~input]:border-r-0',
      '*:[input~&]:border-l-0',
    ]),
    addon: cn([
      ...common,
      ...textboxCommon,
      'flex',
      'items-center',
      'transition-colors',
      'bg-foreground/10',
      'dark:bg-background/10',
      'whitespace-nowrap',
      'group-has-[input:read-only]:border-dashed',
    ]),
  },
  input: cn([
    ...common,
    ...textboxCommon,
    'peer',
    'block',
    'w-full',
    'min-w-0',
    'transition-all',
    'focusable',
    'focus-visible:focus',
    'focus-visible:border-primary',
    'hover:not-disabled:border-primary',
    'invalid:border-red-500',
    'invalid:outline-4',
    'invalid:outline-red-500/20',
    'disabled:text-border',
    'disabled:bg-transparent',
    'disabled:cursor-not-allowed',
    'read-only:bg-transparent',
    'read-only:border-dashed',
    'read-only:cursor-default',
    'placeholder:text-muted-foreground',
    'dark:placeholder:text-muted-background',
  ]),
};

export const checkClasses = {
  root: cva(
    [
      ...common,
      'relative',
      'size-6',
      'm-2',
      'transition-all',
      'hover:not-disabled:border-primary',
      'focusable',
      'has-focus:focus',
      'has-focus:border-primary',
      'has-invalid:focus',
      'has-invalid:border-danger',
      'has-invalid:outline-danger/25',
      'has-disabled:opacity-50',
      'has-disabled:border-dashed',
    ],
    {
      variants: {
        type: {
          checkbox: 'rounded-shape',
          radio: 'rounded-full',
        },
      },
    }
  ),
  input: cn([
    'absolute',
    'inset-0',
    'opacity-0',
    'cursor-pointer',
    'disabled:cursor-not-allowed',
  ]),
  mark: cn([
    'absolute top-1 left-2',
    'w-1.5 h-3',
    'rotate-45',
    'border-r-2 border-b-2',
    'border-foreground',
    'dark:border-background',
    'transition-[border,opacity]',
    'opacity-0',
    'has-[+:checked]:opacity-100',
  ]),
};
