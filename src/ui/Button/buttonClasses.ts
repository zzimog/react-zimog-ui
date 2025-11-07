import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-1',
    'rounded-shape',
    'whitespace-nowrap',
    'cursor-pointer',
    'transition',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'not-disabled:active:scale-95',
    // outline
    'focusable',
    'focus-visible:focus',
    'focus-visible:outline-(--base)/50',
    // icon
    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'p-1 text-sm/5 [&_svg]:size-5',
        md: 'p-2 text-base/6 [&_svg]:size-6',
        lg: 'p-3 text-lg/7 [&_svg]:size-7',
      },
      variant: {
        solid: null,
        outlined: 'border',
        dashed: 'border border-dashed',
        ghost: null,
      },
      color: {
        default: [
          '[--base:var(--color-zinc-500)]',
          'bg-zinc-300',
          'border-zinc-300',
          'text-foreground',
          'dark:bg-zinc-700',
          'dark:border-zinc-700',
          'dark:text-background',
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
        true: 'opacity-75! cursor-progress!',
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
          'text-foreground',
          'dark:text-background',
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
