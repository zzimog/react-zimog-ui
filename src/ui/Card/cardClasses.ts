import { cva } from 'class-variance-authority';

const cardClasses = cva(
  [
    'p-8',
    'rounded-md',
    'border',
    'border-neutral-500/20',
    'bg-neutral-100',
    'dark:bg-neutral-900',
  ],
  {
    variants: {
      opticalCorrection: {
        top: 'pt-6',
        both: 'py-6',
        none: null,
      },
    },
  }
);

export default cardClasses;
