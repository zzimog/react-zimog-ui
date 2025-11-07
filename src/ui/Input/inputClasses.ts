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

import { cn } from '../utils';

const common = [
  'h-10 px-2.5 text-sm',
  'rounded-shape',
  'border',
  'border-border',
  'transition',
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
    'transition-colors',
    'bg-white/5',
    'dark:bg-white/10',
    'group-has-[input:read-only]:border-dashed',
  ]),
  input: cn([
    ...common,
    'block',
    'w-full',
    'min-w-0',
    'bg-white/95',
    'dark:bg-white/5',
    'focus-visible:focus',
    'focus-visible:border-primary',
    'hover:not-disabled:border-primary',
    'invalid:ring-red-500',
    'invalid:border-red-500',
    'invalid:outline-red-500/20',
    'disabled:text-border',
    'disabled:bg-transparent',
    'disabled:border-dashed',
    'disabled:cursor-not-allowed',
    'read-only:bg-transparent',
    'read-only:cursor-default',
    'placeholder:transition-colors',
    'placeholder:text-muted-foreground',
    'dark:placeholder:text-muted-background',
    'selection:bg-primary/50',
    'selection:text-primary-contrast',
  ]),
};

export default classes;
