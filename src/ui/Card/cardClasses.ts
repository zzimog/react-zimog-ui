import { cva } from 'class-variance-authority';

const cardClasses = cva(
  [
    'relative',
    'p-8',
    'rounded-shape',
    'border',
    'transition-colors',
    'border-border',
    // light
    'text-foreground',
    'bg-background',
    // dark
    'dark:text-background',
    'dark:bg-foreground',
  ],
  {
    variants: {
      opticalCorrection: {
        top: 'pt-6',
        both: 'py-6',
      },
    },
  }
);

export default cardClasses;
