/**
 * @todo Refactor
 *
 */ /*
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
  'h-8',
  'px-2',
  'text-sm',
  'rounded-shape',
  'border',
  'border-border',
  'transition-colors',
];

const classes = {
  group: cn([
    'group',
    'flex',
    'w-full',
    'has-disabled:text-gray-500',
    'has-disabled:cursor-not-allowed',
    '*:not-first:rounded-l-none',
    '*:not-last:rounded-r-none',
    '*:has-[~input]:border-r-0',
    '*:[input~&]:border-l-0',
  ]),
  addon: cn([
    ...common,
    'flex',
    'items-center',
    'whitespace-nowrap',
    'bg-white/5',
    'dark:bg-white/10',
    'group-has-[input:read-only]:border-dashed',
  ]),
  input: cva(
    [
      ...common,
      'block',
      'w-full',
      'min-w-0',
      'bg-white',
      'dark:bg-zinc-800',
      // basic states
      'focusable',
      'focus:outline-outline',
      'focus:border-primary',
      'not-disabled:hover:border-primary',
      // disabled
      'disabled:text-border',
      'disabled:bg-transparent',
      'disabled:border-dashed',
      'disabled:cursor-not-allowed',
      // read only
      'read-only:cursor-default',
      // placeholder
      'placeholder:transition-colors',
      'placeholder:text-muted-foreground',
      'dark:placeholder:text-muted-background',
      // selection
      'selection:bg-primary/50',
      'selection:text-primary-contrast',
      // invalid
      'data-[state="invalid"]:border-danger!',
    ],
    {
      variants: {
        check: {
          true: [
            'appearance-none',
            'size-5',
            'p-0',
            'rounded-sm!',
            'checked:bg-primary',
            'checked:border-primary',
            'disabled:checked:opacity-50',
          ],
        },
        radio: {
          true: 'rounded-full!',
        },
      },
    }
  ),
};

export default classes;
