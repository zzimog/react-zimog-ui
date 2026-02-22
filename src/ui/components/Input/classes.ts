import { cva } from 'class-variance-authority';

/**
 * @todo Refactor
 */
/*
'file:text-foreground',
'file:inline-flex',
'file:h-7',
'file:border-0',
'file:bg-transparent',
'file:text-sm',
'file:font-medium',
*/

const common = [
  'h-8',
  'px-2',
  'text-sm',
  'border',
  'border-border',
  'rounded-shape',
  'transition-colors',
];

const classes = {
  group: [
    'group/input',
    'flex',
    'w-full',
    'data-disabled:text-gray-500',
    'data-disabled:cursor-not-allowed',
    '*:not-first:rounded-l-none',
    '*:not-last:rounded-r-none',
    '*:not-last:border-r-0',
    '[&_svg]:size-4',
  ],
  addon: [
    ...common,
    'flex',
    'items-center',
    'bg-input',
    'whitespace-nowrap',
    'group-data-readonly/input:border-dashed',
    'group-data-invalid/input:border-danger',
  ],
  input: cva(
    [
      ...common,
      'block',
      'w-full',
      'bg-input',
      'focusable',
      'focus-visible:border-primary',
      'focus-visible:outline-outline',
      'hover:not-disabled:border-primary',
      'disabled:opacity-75',
      'disabled:cursor-not-allowed',
      'read-only:cursor-default',
      'placeholder:text-muted',
      'placeholder:transition-colors',
      'selection:bg-primary/50',
      'selection:text-primary-contrast',
      'aria-invalid:border-danger',
      'aria-invalid:focus-visible:outline-danger/25',
    ],
    {
      variants: {
        checkable: {
          true: [
            'appearance-none',
            'size-5',
            'p-0',
            'shrink-0',
            'rounded-sm!',
            'checked:border-primary',
            'checked:bg-primary',
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
