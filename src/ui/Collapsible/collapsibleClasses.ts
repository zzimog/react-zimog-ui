import { cva } from 'class-variance-authority';

const collapsibleClasses = cva('overflow-hidden', {
  variants: {
    dir: {
      vertical: [
        'data-[state="open"]:animate-height-grow',
        'data-[state="closed"]:animate-height-shrink',
      ],
      horizontal: [
        'data-[state="open"]:animate-width-grow',
        'data-[state="closed"]:animate-width-shrink',
      ],
    },
  },
  defaultVariants: {
    dir: 'vertical',
  },
});

export default collapsibleClasses;
