import { cva } from 'class-variance-authority';

const headingClasses = cva(['font-bold'], {
  variants: {
    size: {
      1: 'text-3xl',
      2: 'text-2xl',
      3: 'text-lg',
      4: 'text-md',
      5: 'text-sm',
      6: 'text-xs',
    },
  },
});

export default headingClasses;
