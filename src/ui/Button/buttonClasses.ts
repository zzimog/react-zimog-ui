import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'w-fit',
    'gap-2',
    'rounded-md',
    'text-black',
    'cursor-pointer',
    'transition-all',
    'duration-100',
    'hover:[--bg-opacity:75%]',
    'not-disabled:active:scale-95',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',

    'outline-0',
    'outline-primary/30',
    'focus-visible:outline-4',

    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
    '[&_svg:not([class*="size-"])]:size-4',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      color: 'default',
    },
    variants: {
      size: {
        sm: 'px-2.5 py-1.5 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-2.5 text-lg [&_svg:not([class*="size-"])]:size-6',
      },
      variant: {
        solid: 'text-white',
        outlined: 'border',
        dashed: 'border border-dashed',
        ghost: null,
      },
      color: {
        default: [
          'text-black dark:text-white',
          'bg-var-neutral-300 border-neutral-300',
          'dark:bg-var-neutral-700 dark:border-neutral-500',
        ],
        primary: 'bg-var-primary border-primary',
        secondary: 'bg-var-secondary border-secondary',
        danger: 'bg-var-red-600 border-red-600',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        className: 'shadow-xs',
      },
      {
        variant: ['outlined', 'dashed', 'ghost'],
        className: [
          'dark:text-white',
          '[--bg-opacity:0%]',
          'hover:[--bg-opacity:10%]',
        ],
      },
      {
        variant: ['outlined', 'dashed', 'ghost'],
        color: 'default',
        className: ['hover:[--bg-opacity:30%]'],
      },
    ],
  }
);

export default buttonClasses;
