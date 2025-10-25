import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-1',
    'p-2',
    'rounded-shape',
    'text-black',
    'whitespace-nowrap',
    'cursor-pointer',
    'transition-all',
    'duration-200',
    'not-disabled:active:scale-95',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    // outline
    'outline-0',
    'outline-offset-2',
    'outline-(--base)/50',
    'focus-visible:outline-4',
    // icon
    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
    '[&_svg:not([class*="size-"])]:size-6',
  ],
  {
    variants: {
      size: {
        sm: 'p-1 text-sm leading-6',
        md: null,
        lg: 'p-3 text-lg leading-6',
      },
      variant: {
        solid: 'text-white',
        outlined: 'border',
        dashed: 'border border-dashed',
        ghost: null,
      },
      color: {
        default: [
          '[--base:var(--color-gray-500)]',
          'bg-gray-500',
          'border-gray-500',
          'text-white',
        ],
        primary: [
          '[--base:var(--color-primary)]',
          'bg-primary',
          'border-primary',
          'text-primary-contrast',
        ],
        secondary: [
          '[--base:var(--color-secondary)]',
          'bg-secondary',
          'border-secondary',
          'text-secondary-contrast',
        ],
        danger: [
          '[--base:var(--color-danger)]',
          'bg-danger',
          'border-danger',
          'text-danger-contrast',
        ],
      },
      loading: {
        true: 'cursor-progress!',
      },
      joined: {
        col: 'not-first:rounded-t-none not-last:rounded-b-none',
        row: 'not-first:rounded-l-none not-last:rounded-r-none',
      },
    },
    compoundVariants: [
      {
        variant: ['outlined', 'dashed', 'ghost'],
        className: [
          'text-black',
          'dark:text-white',
          'bg-transparent',
          'dark:bg-transparent',
          'hover:bg-(--base)/25',
          'not-disabled:active:bg-(--base)/25',
        ],
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      color: 'default',
    },
  }
);

const buttonGroupClasses = cva('group inline-flex items-center', {
  variants: {
    column: {
      true: 'flex-col items-stretch',
    },
    joined: {
      true: 'gap-px',
      false: 'gap-1',
    },
  },
});

export default {
  button: buttonClasses,
  group: buttonGroupClasses,
};
