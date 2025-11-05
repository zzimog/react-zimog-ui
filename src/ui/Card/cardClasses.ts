import { cva } from 'class-variance-authority';

const cardClasses = cva(
  [
    'p-8',
    'rounded-shape',
    'border',
    'transition',
    'border-border',
    'text-foreground',
    'bg-background',
    'dark:text-background',
    'dark:bg-foreground',
  ],
  {
    variants: {
      opticalCorrection: {
        top: 'pt-6',
        both: 'py-6',
      },
      isFocusable: {
        true: 'focusable focus:focus',
      },
    },
  }
);

export default cardClasses;
