import { cva } from 'class-variance-authority';

const headingClasses = cva(['font-bold'], {
  variants: {
    size: {
      1: 'text-2xl',
      2: 'text-xl',
      3: 'text-lg',
      4: 'text-md',
      5: 'text-sm uppercase',
      6: 'text-xs uppercase',
    },
  },
});

export default headingClasses;
