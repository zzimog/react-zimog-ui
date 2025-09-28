import { cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-1',
    'p-2',
    'rounded-md',
    'text-black',
    'whitespace-nowrap',
    'cursor-pointer',
    'transition-all',
    'duration-100',
    'hover:[--bg-opacity:75%]',
    'not-disabled:active:scale-95',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'outline-0',
    'outline-offset-1',
    'outline-primary/30',
    'focus-visible:outline-4',
    '[&_svg]:shrink-0',
    '[&_svg]:pointer-events-none',
    '[&_svg:not([class*="size-"])]:size-6',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      color: 'default',
    },
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
          'text-black dark:text-white',
          'bg-var-gray-300 border-gray-300',
          'dark:bg-var-gray-700 dark:border-gray-500',
        ],
        primary: 'bg-var-primary border-primary',
        secondary: 'bg-var-secondary border-secondary',
        danger: 'bg-var-red-600 border-red-600',
      },
      loading: {
        true: 'cursor-progress!',
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
        className: ['hover:[--bg-opacity:40%]'],
      },
    ],
  }
);

export default buttonClasses;
