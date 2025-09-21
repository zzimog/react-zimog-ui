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

const common = [
  'rounded-md',
  'border',
  'border-gray-500/50',
  'bg-white/50',
  'dark:bg-black/50',
];

const textboxCommon = ['h-10', 'md:h-8', 'px-2.5', 'text-sm', ...common];

export const textboxClasses = {
  group: [
    'group',
    'flex',
    'items-center',
    'w-full',
    '[&_input]:shadow-none',
    'has-disabled:text-gray-500',
    'has-disabled:cursor-not-allowed',
  ],
  addon: {
    root: [
      ...textboxCommon,
      'flex',
      'items-center',
      'bg-gray-300/20',
      'dark:bg-gray-700/20',
      'group-has-[input:read-only]:border-dashed',
      '[&_svg]:stroke-1',
    ],
    prefix: 'border-r-0 rounded-r-none',
    suffix: 'border-l-0 rounded-l-none',
  },
  input: {
    root: [
      ...textboxCommon,
      'peer',
      'block',
      'w-full',
      'min-w-0',
      'outline-0',
      'outline-primary/30',
      'transition-all',
      'duration-100',
      'focus-visible:border-primary',
      'focus-visible:outline-4',
      'invalid:border-red-500',
      'invalid:outline-4',
      'invalid:outline-red-500/20',
      'disabled:text-gray-500',
      'disabled:cursor-not-allowed',
      'read-only:text-gray-700',
      'read-only:border-dashed',
    ],
    prefix: 'rounded-l-none',
    suffix: 'rounded-r-none',
  },
};

export const checkboxClasses = {
  box: [
    ...common,
    'relative',
    'size-6',
    'outline-0',
    'outline-primary/30',
    'transition-all',
    'duration-100',
    'has-focus-visible:border-primary',
    'has-focus-visible:outline-4',
    'has-checked:border-primary',
    'has-invalid:border-red-500',
    'has-invalid:outline-4',
    'has-invalid:outline-red-500/20',
    'has-disabled:opacity-50',
    'has-disabled:border-dashed',
  ],
  input: [
    'size-full',
    'absolute',
    'opacity-0',
    'cursor-pointer',
    'disabled:cursor-not-allowed',
  ],
  mark: [
    'absolute',
    'top-1',
    'left-2',
    'w-1.5',
    'h-3',
    'rotate-45',
    'border-r-2',
    'border-b-2',
    'border-transparent',
    'transition-all',
    'duration-100',
    'has-[+:checked]:border-primary',
  ],
};

export const radioClasses = {
  box: [checkboxClasses.box, 'rounded-full'],
  input: checkboxClasses.input,
  mark: checkboxClasses.mark,
};
