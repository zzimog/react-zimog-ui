import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-2',
    'min-w-8',
    'h-8',
    'rounded-shape',
    'whitespace-nowrap',
    'text-ellipsis',
    'overflow-hidden',
    'transition-all',
    // active
    'active:translate-y-px',
    // disabled
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    // focus
    'focusable',
    'focus:outline-outline',
    'focus:z-10',
    // icon
    '[&_svg]:-mx-1',
    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'px-1 text-xs [&_svg]:size-4',
        md: 'px-2 text-sm [&_svg]:size-4',
        lg: 'px-4 text-base [&_svg]:size-6',
      },
      variant: {
        solid: 'border',
        outlined: 'border',
        ghost: null,
      },
      color: {
        default: [
          '[--base:var(--color-zinc-500)]',
          'bg-zinc-200',
          'border-zinc-200',
          'text-zinc-700',
          'dark:bg-zinc-700',
          'dark:border-zinc-700',
          'dark:text-zinc-200',
        ],
        primary: [
          '[--base:var(--color-primary)]',
          'bg-primary',
          'border-primary',
          'text-primary-contrast',
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
        variant: ['outlined', 'ghost'],
        className: [
          'text-foreground',
          'bg-transparent!',
          'hover:bg-(--base)/10',
          'not-disabled:active:bg-(--base)/10',
          'dark:hover:bg-(--base)/30',
          'dark:not-disabled:active:bg-(--base)/30',
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
