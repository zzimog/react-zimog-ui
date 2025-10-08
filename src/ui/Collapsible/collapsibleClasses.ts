import { cva } from 'class-variance-authority';

const collapsibleClasses = cva('overflow-hidden', {
  defaultVariants: {
    dir: 'vertical',
  },
  variants: {
    dir: {
      vertical: [
        'data-[state="closed"]:animate-height-shrink',
        'data-[state="open"]:animate-height-grow',
      ],
      horizontal: [
        'data-[state="closed"]:animate-width-shrink',
        'data-[state="open"]:animate-width-grow',
      ],
    },
  },
});

export default collapsibleClasses;
