import { cva } from 'class-variance-authority';

const cardClasses = cva(
  [
    'p-8',
    'rounded-shape',
    'border',
    'border-border',
    'bg-neutral-100',
    'dark:bg-neutral-900',
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
